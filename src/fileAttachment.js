/**
 * Created by Deepak Sisodiya on 15/01/15.
 */




$(document).ready(function () {

  $("#myFile").change(function(){
    var file = this.files[0];
    var name = file.name;
    var size = file.size;
    var type = file.type;
    //Your validation
    var innerHtml = "<p> File Name : " + name + "</p><p>File Size : " + size + "</p>File Type : " + type + "</p>";
    $("#info").html(innerHtml);
  });

});
