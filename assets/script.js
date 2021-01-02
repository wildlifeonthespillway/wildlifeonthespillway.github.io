// $(window).on('beforeunload', function() {
//     $(window).scrollTop(0);
// });

$(document).ready(function(){

  var footerDiv = document.getElementById("footer-div");
  footerDiv.innerHTML = footerDiv.innerHTML + "<p>Website by Dana Lansigan</p><p>Photo gallery made with <a href='https://sachinchoolur.github.io/lightgallery.js/' target='_blank'>lightgallery.js</a></p>"

  // $('body').addClass('stop-scrolling');

  var overlay = document.getElementById("overlay");
  $(overlay).delay(800).fadeOut(1500)

  // setTimeout(function() {
  //      $('body').removeClass('stop-scrolling');;
  //  }, 1600);;


});
