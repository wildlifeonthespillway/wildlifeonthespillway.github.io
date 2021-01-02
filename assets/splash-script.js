var interval1;
var timer1;
// var interval2;
// var timer2;
// var interval3;
// var timer3;

 $(document).ready(function () {
   // var overlay = document.getElementById("overlay");
   // $(overlay).delay(800).fadeOut(1500);


   $('#bg-img-div .carousel-img:gt(0)').hide(); // to hide all but the first image when page loads

   timer1 = function(){
   interval1=setInterval(function () {
       if ( document.visibilityState=="visible" ) {
         $('#bg-img-div .carousel-img:first-child').fadeOut(1000)
             .next().fadeIn(1000).end().appendTo('#bg-img-div');
     }}, 5000);
   };

   timer1();

 });
