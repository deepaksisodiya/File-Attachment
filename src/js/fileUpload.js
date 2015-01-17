/**
 * Created by Deepak Sisodiya on 17/01/15.
 */


var FileUpload = function(myFile, info, progress, fileDrag) {
  this.$myFile = document.getElementById(myFile);
  this.$info = document.getElementById(info);
  this.$progress = document.getElementById(progress);
  this.$fileDrag = document.getElementById(fileDrag);
  this.init();
};

FileUpload.prototype = {

  init: function() {
    var self = this;
    this.$fileDrag.addEventListener("drop", function(e) {
      self.drop(e);
    });
    this.$fileDrag.addEventListener("dragover", function(e) {
      self.allowDrop(e);
    });
  },

  getAndSetFileInfo: function(e) {
    var file = e.files[0];
    var name = file.name;
    var size = file.size;
    var type = file.type;
    var innerHtml = "<p> File Name : " + name + "</p><p>File Size : " + size + "K</p>File Type : " + type + "</p>";
    this.$info.innerHTML = innerHtml;
    this.setRange(size);
    this.uploadFile(e);
  },

  setRange: function(size) {
    if (size / 1024 <= 1024) {
      this.range = "KB";
    } else {
      this.range = "MB";
    }
  },

  resetProgressBar: function() {
    this.$progress.style.width = 0;
  },

  uploadFile: function(file) {
    this.resetProgressBar();
    if (file.files.length === 0) {
      return;
    }
    var data = new FormData();
    data.append('SelectedFile', file.files[0]);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        try {
          var resp = JSON.parse(request.response);
        } catch (e) {
          var resp = {
            status: 'error',
            data: 'Unknown error occurred: [' + request.responseText + ']'
          };
        }
        console.log(resp.status + ': ' + resp.data);
      }
    };
    var self = this;
    request.upload.addEventListener('progress', function(e) {
      var progressSize = "";
      if (self.range === "MB") {
        progressSize = Math.ceil((e.loaded / 1024) / 1024) + " MB";
      }
      if (self.range === "KB") {
        progressSize = Math.ceil(e.loaded / 1024) + " KB";
      }
      var progressPercentage = Math.ceil((e.loaded / e.total) * 100) + "%";
      self.$progress.style.width = progressPercentage;
      self.$progress.innerHTML = progressPercentage + "(" + progressSize + ")";
      if (e.loaded === e.total) {
        self.$progress.innerHTML = "Completed";
      }
    }, false);
    request.open('POST', 'http://lorempixel.com/g/100/100/');
    request.send(data);
  },

  drop: function(e) {
    e.preventDefault();
    this.getAndSetFileInfo(event.dataTransfer);
  },

  allowDrop: function(e) {
    e.preventDefault();
  }

};

FileUpload.prototype.constructor = FileUpload;

var fileUploadObj = new FileUpload("myFile", "info", "progress", "fileDrag");

$(document).ready(function() {
  fileUploadObj.$myFile.addEventListener("change", function() {
    fileUploadObj.getAndSetFileInfo(this);
  });
});
