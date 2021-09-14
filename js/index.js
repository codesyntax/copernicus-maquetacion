// Tabs
$(document).on("click",".tab:not(.tab-selected)", function() {
  $(".tab").toggleClass("tab-selected","tab");
  $(".panel").toggleClass("panel-selected","panel");
  
  $('.tab').attr('aria-selected', function(index, attr){
    return attr == "true" ? false : true;
  });
  $('.panel').attr('aria-hidden', function(index, attr){
    return attr == "true" ? false : true;
  });
});

$(document).ready(function() {
  $('.home-carousel').slick({
    dots: true,
    infinite: true,
    speed: 1500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 3000,
  });
});