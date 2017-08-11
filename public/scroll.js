//To use: add "scroll" class to any item you want to have smooth scroll
//this function is in a seperate file for reuse
//Made by L.J. Yockey http://ljyockey.com

function smoothScroll() {
  $('.scroll').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $(this.hash).offset().top-50}, 800);
  });
}

$(function() {
  smoothScroll();
});