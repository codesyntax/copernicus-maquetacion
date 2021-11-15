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

  document.querySelectorAll('.ccl-banner-top-bar-right').forEach(item => {
    item.addEventListener('click', e => {
      if (!document.querySelector('.ccl-banner-info')) {
        let string = '<div class="ccl-banner-info">'+
        '<div class="ccl-banner-info-title">Lorem ipsum dui a is, lorem ipsum dui a turpis finibus</div>'+
          '<div class="ccl-banner-info-content">'+
            '<p>Location: Lorem ipsum dui a is</p>'+
            '<p>Credit: Lorem ipsum dui a turpis finibus</p>'+
          '</div>'+
          '<a class="ccl-banner-info-link" href="#">More info</a>'+
        '</div>';
        document.querySelector('.slick-dots').insertAdjacentHTML('beforebegin', string);
        document.querySelector('.ccl-banner-info').style.display = 'block';
      }
      else {
        if (document.querySelector('.ccl-banner-info').style.display == 'block') {
          document.querySelector('.ccl-banner-info').style.display = 'none';
        }
        else {
          document.querySelector('.ccl-banner-info').style.display = 'block';
        }
      }
    })
  })
});
