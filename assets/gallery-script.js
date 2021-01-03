$(document).ready(function(){

});

var activeGallery=0;

$.ajax({
  type: "GET",
  url: "assets/gallery-info.csv",
  // url: "https://raw.githubusercontent.com/wildlifeonthespillway/wildlifeonthespillway.github.io/master/assets/gallery-info.csv",
  async: false,
  dataType: "text",
  success: function(response)
  {
  data = $.csv.toObjects(response);
  processCSV(data);
  }
});

function processCSV(data) {
  var galleryDiv = document.getElementById("gallery-div");
  var gallerySubsecsDiv = document.getElementById("gallery-subsecs-div");
  var subsecList = [];

  for (var i = 0; i < data.length; i++) {
    if ($.inArray(data[i].subsec,subsecList) == -1) {
      subsecList.push(data[i].subsec);
    }
  }

  for (var i = 0; i < subsecList.length; i++) {
    gallerySubsecsDiv.innerHTML = gallerySubsecsDiv.innerHTML +"<div class='subsec-header-div' id='subsec-header-" + i + "'>" + subsecList[i] + "</div>";
    galleryDiv.innerHTML = galleryDiv.innerHTML + "<div class='subsec-div' id='subsec-div-" + i + "'></div>";
  }

  for (var i = 0; i < data.length; i++) {
    var imgName = data[i].filename;
    var subsecName = data[i].subsec;
    subsecIDNo = subsecList.findIndex(function(name){return name==subsecName});
    subsecID = "subsec-div-" + subsecIDNo;
    var subsecDiv = document.getElementById(subsecID)
    // subsecDiv.innerHTML = subsecDiv.innerHTML +data[i].subsec;
    var imgFilePath = "assets/gallery-images/"+data[i].subsec+"/"+data[i].filename;
    subsecDiv.innerHTML = subsecDiv.innerHTML + `<a href='`+imgFilePath+`' data-sub-html='<h4>`+data[i].title+`</h4><p>`+data[i].description+`</p>'><div class='thumb-container'><div class='light-img-div' style="background-image: url('`+imgFilePath+`')"></div></div></a>`
  }

  for (var i = 0; i < subsecList.length; i++) {
    $("body").append("<script>lightGallery(document.getElementById('subsec-div-"+i+"'));</script>");

    if (i>0) {
      var cell = document.getElementById('subsec-div-'+i);
      $(cell).hide();
    }

  }

  $("#subsec-header-0").addClass('subsec-header-div-active');

  $('[id^="subsec-header"]').each(function () {
    $(this).click(function () {
        var id = this.id.replace(/[^\d]/g, '');

        if (activeGallery!=-1) {
          if (activeGallery == id) {
            // $("#subsec-div-" + activeGallery).fadeOut(500);
            // $("#subsec-header-" + activeGallery).removeClass('subsec-header-div-active');
            // activeGallery = -1;
          } else {
            $("#subsec-div-" + activeGallery).fadeOut(500);
            $("#subsec-header-" + activeGallery).removeClass('subsec-header-div-active');
            $("#subsec-div-" + id).delay(500).fadeIn(500);
            $("#subsec-header-" + id).addClass('subsec-header-div-active');
            activeGallery = id;
          }
        } else{
          $("#subsec-div-" + id).fadeIn(500);
          $("#subsec-header-" + id).addClass('subsec-header-div-active');
          activeGallery = id;

        }

    });
});


}
