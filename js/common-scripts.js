$(document).ready(function(){
  $("body").removeClass("loading-page");
  $(".header-login-link, .login-block-button").click(function() {
    $("#login_modal").fadeIn()
    return false;
  });
  $(".modal-close").click(function(){
    $(this).parents(".modal").fadeOut()
  });
  $(".ccl-header-search button").click(function(e){
    e.preventDefault();
    search_val = $(".ccl-header-search input").val();
    window.location.replace("./search.html" + "?" + search_val);
  });
});


