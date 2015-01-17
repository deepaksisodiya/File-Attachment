/**
 * Created by Deepak Sisodiya on 17/01/15.
 */


var FileUpload = function (myFile, info, progress) {
  this.$myFile = document.getElementById(myFile);
  this.$info = document.getElementById(info);
  this.$progress = document.getElementById(progress);
};

FileUpload.prototype = {

  setFileInfo : function(e) {
    var file = e.files[0];
    var name = file.name;
    var size = file.size;
    var type = file.type;
    var innerHtml = "<p> File Name : " + name + "</p><p>File Size : " + size + "K</p>File Type : " + type + "</p>";
    this.$info.innerHTML = innerHtml;
    this.resetProgressBar();
  },

  resetProgressBar : function () {
    this.$progress.style.width = 0;
    this.uploadFile();
  },

  uploadFile : function() {
    var _file = this.$myFile;
    if(_file.files.length === 0){
      return;
    }
    var data = new FormData();
    data.append('SelectedFile', _file.files[0]);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if(request.readyState == 4){
        try {
          var resp = JSON.parse(request.response);
        } catch (e){
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
      var megabytes = Math.ceil((e.loaded / 1024) / 1024);
      var progressPercentage = Math.ceil((e.loaded / e.total) * 100) + "%";
      self.$progress.style.width = progressPercentage;
      self.$progress.innerHTML = progressPercentage + "(" + megabytes + " MB)";
      if(e.loaded === e.total) {
        self.$progress.innerHTML = "Completed";
      }
    }, false);
    request.open('POST', 'http://lorempixel.com/g/100/100/');
    request.send(data);
  }
};


var fileUploadObj = new FileUpload("myFile", "info", "progress");


$(document).ready(function () {

  $("#myFile").change(function () {
    fileUploadObj.setFileInfo(this);
  });

});