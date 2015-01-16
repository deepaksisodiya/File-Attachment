/**
 * Created by Deepak Sisodiya on 15/01/15.
 */


$(document).ready(function () {
  $("#myFile").change(function(){
    change(this);
  });
  $("#submit").click(function () {
    upload();
  });
});

function change(e) {
  var file = e.files[0];
  var name = file.name;
  var size = file.size;
  var type = file.type;
  var innerHtml = "<p> File Name : " + name + "</p><p>File Size : " + size + "K</p>File Type : " + type + "</p>";
  $("#info").html(innerHtml);
}

function upload(){
  var _submit = document.getElementById('submit'),
  _file = document.getElementById('myFile'),
  _progress = document.getElementById('progress');

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

  request.upload.addEventListener('progress', function(e) {

    console.log(e.loaded);
    var megabytes = Math.ceil((e.loaded / 1024) / 1024);
    var progerssPercentage = Math.ceil((e.loaded / e.total) * 100) + "%";
    _progress.style.width = progerssPercentage;
    $("#progress").text(progerssPercentage + "(" + megabytes + " MB)");

    if(e.loaded === e.total) {
      $("#progress").text("Completed");
    }

  }, false);

  request.open('POST', 'http://lorempixel.com/g/100/100/');
  request.send(data);
}