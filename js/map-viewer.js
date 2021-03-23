$(document).ready(function(){

});

var view;
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/ScaleBar",
  "esri/widgets/BasemapGallery",
  "esri/widgets/Zoom",
], function(Map, MapView, ScaleBar, BasemapGallery, Zoom) {
  var map = new Map({
    basemap: "topo-vector",
    slider: false
  });
  view = new MapView({
    container: "map_viewer",
    map: map,
    center: [15,50],
    zoom: 3,
    ui: {
      components: ["attribution"] // removes default widgets except for attribution
   }
  });
  this.view.constraints = {
    minZoom: 3
  };
  var zoom = new Zoom({
    view: view
  });
  view.ui.add(zoom, {
    position: "top-right"
  });

  // Basemap gallery
  var basemap_container = document.createElement('div');
  basemap_container.className = "basemap-gallery-container";
  var basemap_button = document.createElement('div');
  basemap_button.className = "esri-icon-basemap esri-widget--button esri-widget esri-interactive";
  basemap_button.id = "map_basemap_button";
  basemap_button.setAttribute("role","button");
  basemap_button.setAttribute("title","Basemap gallery");
  basemap_button.addEventListener('click', function(evt){
    if (this.classList.contains("esri-icon-basemap")) {
      $(".esri-basemap-gallery").appendTo(".basemap-gallery-container").show();
      $(this).removeClass("esri-icon-basemap").addClass("esri-icon-right-arrow")
    }
    else if (this.classList.contains("esri-icon-right-arrow")) {
      $(".esri-basemap-gallery").hide();
      $(this).removeClass("esri-icon-right-arrow").addClass("esri-icon-basemap")
    }
  });
  basemap_container.appendChild(basemap_button);
  view.ui.add(basemap_container, "top-right");

  const basemapGallery = new BasemapGallery({
    view: view,
  });
  view.ui.add(basemapGallery, "top-right");

  // Print
  var print_button = document.createElement('div');
  print_button.className = "esri-icon-printer esri-widget--button esri-widget esri-interactive";
  print_button.setAttribute("role","button");
  print_button.setAttribute("title","Print");
  print_button.addEventListener('click', function(evt){
    // action
  });
  view.ui.add(print_button, "top-right");
  
  // Area selection
  var area_button = document.createElement('div');
  area_button.className = "esri-icon-cursor-marquee esri-widget--button esri-widget esri-interactive";
  area_button.setAttribute("role","button");
  area_button.setAttribute("title","Select area");
  area_button.addEventListener('click', function(evt){
    // action
  });
  view.ui.add(area_button, "top-right");

  // Legend
  var legend_button = document.createElement('div');
  legend_button.className = "esri-icon-legend esri-widget--button esri-widget esri-interactive";
  legend_button.setAttribute("role","button");
  legend_button.setAttribute("title","Legend");
  legend_button.addEventListener('click', function(evt){
    // action
  });
  view.ui.add(legend_button, "top-right");
  
  // Menu
  var menu_container = document.createElement('div');
  menu_container.className = "map-left-menu-container"
  var menu_button = document.createElement('div');
  menu_button.className = "esri-icon-drag-horizontal esri-widget--button esri-widget esri-interactive";
  menu_container.innerHTML =
    '<div class="map-menu tab-container">'+
      '<div class="tabs" role="tablist">'+
        '<span class="tab tab-selected" id="products_label" role= "tab" aria-controls="products_panel" aria-selected="true">Products and datasets</span>'+
        '<span class="tab" id="active_label" role= "tab" aria-controls="active_panel" aria-selected="false">Active on map</span>'+
      '</div>'+
      '<div class="panels">'+
        '<div class="panel panel-selected" id="products_panel" role="tabpanel" aria-hidden="false"></div>'+
        '<div class="panel" id="active_panel" role="tabpanel" aria-hidden="true"><div class="no-active-datasets">No datasets selected</div></div>'+
      '</div>'+
    '</div>';
  menu_button.addEventListener('click', function(evt){
    if (this.classList.contains("esri-icon-drag-horizontal")) {
      
      $(".map-menu").show();
      $(this).removeClass("esri-icon-drag-horizontal").addClass("esri-icon-left-arrow")
    }
    else if (this.classList.contains("esri-icon-left-arrow")) {
      $(".map-menu").hide();
      $(this).removeClass("esri-icon-left-arrow").addClass("esri-icon-drag-horizontal")
    }
  });
  menu_container.appendChild(menu_button);
  view.ui.add(menu_container, "top-left");
  loadTestProducts();
  
  // Scalebar
  var scaleBar = new ScaleBar({
    view: view,
    unit: "dual"
  });
  view.ui.add(scaleBar, "bottom-left");

  // Loading icon
  view.watch('updating', function(evt){
    if(evt === true){
      document.querySelector(".loading").style.display = 'flex';
    }else{
      document.querySelector(".loading").style.display = 'none';
    }
  })
});



function loadTestProducts () {
  $("#products_panel").empty().append(
    '<div class="map-menu-dropdown">'+
      '<div class="ccl-expandable__button" aria-expanded="false">Land Cover and Land Use Mapping</div>'+
      '<div class="">'+
        '<div class="map-menu-product-dropdown">'+
          '<fieldset class="ccl-fieldset">'+
            '<div class="ccl-expandable__button" aria-expanded="false">'+
              '<div class="ccl-form map-product-checkbox">'+
                '<div class="ccl-form-group">'+
                  '<input type="checkbox" id="map_product_1" name="" value="" class="ccl-checkbox ccl-required ccl-form-check-input">'+
                  '<label class="ccl-form-check-label" for="map_product_1"><legend class="ccl-form-legend">Product 1</legend></label>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="ccl-form map-menu-products-container">'+
              '<div class="ccl-form-group map-menu-dataset">'+
                '<input type="checkbox" id="map_dataset_1-1" name="" value="name" class="ccl-checkbox ccl-required ccl-form-check-input">'+
                '<label class="ccl-form-check-label" for="map_dataset_1-1">'+
                  '<span>Dataset 1.1</span>'+
                '</label>'+
                '<a href="./dataset-catalogue/dataset-info.html" class="map-menu-icon" aria-label="Dataset info"><i class="fas fa-info-circle"></i></a><a href="./dataset-catalogue/dataset-download.html" class="map-menu-icon" aria-label="Dataset download"><i class="fas fa-download"></i></a>'+
              '</div>'+
              '<div class="ccl-form-group map-menu-dataset">'+
                '<input type="checkbox" id="map_dataset_1-2" name="" value="date" class="ccl-checkbox ccl-required ccl-form-check-input">'+
                '<label class="ccl-form-check-label" for="map_dataset_1-2">'+
                  '<span>Dataset 1.2</span>'+
                '</label>'+
                '<a href="./dataset-catalogue/dataset-info.html" class="map-menu-icon" aria-label="Dataset info"><i class="fas fa-info-circle"></i></a><a href="./dataset-catalogue/dataset-download.html" class="map-menu-icon" aria-label="Dataset download"><i class="fas fa-download"></i></a>'+
              '</div>'+
            '</div>'+
          '</fieldset>'+
        '</div>'+
        '<div class="map-menu-product-dropdown">'+
          '<fieldset class="ccl-fieldset">'+
            '<div class="ccl-expandable__button" aria-expanded="false">'+
              '<div class="ccl-form map-product-checkbox">'+
                '<div class="ccl-form-group">'+
                  '<input type="checkbox" id="map_product_2" name="" value="" class="ccl-checkbox ccl-required ccl-form-check-input">'+
                  '<label class="ccl-form-check-label" for="map_product_2"><legend class="ccl-form-legend">Product 2</legend></label>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="ccl-form map-menu-products-container">'+
              '<div class="ccl-form-group map-menu-dataset">'+
                '<input type="checkbox" id="map_dataset_2-1" name="" value="name" class="ccl-checkbox ccl-required ccl-form-check-input">'+
                '<label class="ccl-form-check-label" for="map_dataset_2-1">'+
                  '<span>Dataset 2.1</span>'+
                '</label>'+
                '<a href="./dataset-catalogue/dataset-info.html" class="map-menu-icon" aria-label="Dataset info"><i class="fas fa-info-circle"></i></a><a href="./dataset-catalogue/dataset-download.html" class="map-menu-icon" aria-label="Dataset download"><i class="fas fa-download"></i></a>'+
              '</div>'+
              '<div class="ccl-form-group map-menu-dataset">'+
                '<input type="checkbox" id="map_dataset_2-2" name="" value="date" class="ccl-checkbox ccl-required ccl-form-check-input">'+
                '<label class="ccl-form-check-label" for="map_dataset_2-2">'+
                  '<span>Dataset 2.2</span>'+
                '</label>'+
                '<a href="./dataset-catalogue/dataset-info.html" class="map-menu-icon" aria-label="Dataset info"><i class="fas fa-info-circle"></i></a><a href="./dataset-catalogue/dataset-download.html" class="map-menu-icon" aria-label="Dataset download"><i class="fas fa-download"></i></a>'+
              '</div>'+
            '</div>'+
          '</fieldset>'+
        '</div>'+
      '</div>'+
      // '<div class="ccl-expandable__button" aria-expanded="false">Hot-spot Monitoring</div>'+
      // '<div class="">Lorem ipsum...</div>'+
      // '<div class="ccl-expandable__button" aria-expanded="false">Biophysical Parameters</div>'+
      // '<div class="">Lorem ipsum...</div>'+
      // '<div class="ccl-expandable__button" aria-expanded="false">Imagery, In Situ and Reference Data</div>'+
      // '<div class="">Lorem ipsum...</div>'+
      // '<div class="ccl-expandable__button" aria-expanded="false">European Ground Motion Service</div>'+
      // '<div class="">Lorem ipsum...</div>'+
    '</div>')
};

// For programatically created dropdowns
$(document).on ("click",'.ccl-expandable__button', function(){
  $(this).attr('aria-expanded', function(index, attr){
    return attr == 'true' ? 'false' : 'true';
  });
})

// Tabs
$(document).on("click",".tab:not(.tab-selected)", function() {
  $(".tab").toggleClass("tab-selected","tab")
  $(".panel").toggleClass("panel-selected","panel")

  $('.tab').attr('aria-selected', function(index, attr){
    return attr == "true" ? false : true;
  });
  $('.panel').attr('aria-hidden', function(index, attr){
    return attr == "true" ? false : true;
  });
});

$(document).on ("change",'.map-menu-dataset input', function(){
  var dataset_id = this.id;
  var product = $(this).parents(".map-menu-product-dropdown").find(".map-product-checkbox input");
  if (product.prop("checked")) {
    product.prop("checked",false);
  }
  if ($(this).parents(".map-menu-products-container").find("input:checked").length == $(this).parents(".map-menu-products-container").find("input").length) {
    product.prop("checked",true);
  }
  if (this.checked) {
    $("#active_panel").append('<div class="active-dataset" id="active_'+ dataset_id +'"></div>');
    $(this).parent().clone().appendTo("#active_"+dataset_id);
    $("#active_"+dataset_id).find(".map-menu-dataset").prepend($("#active_"+dataset_id).find(".map-menu-dataset label span"));
    $("#active_"+dataset_id+" input, #active_"+dataset_id+" label").remove();
    mapActiveDataset(this);
  }
  else {
    $("#active_"+dataset_id).remove();
  }
});

$(document).on("change",".map-product-checkbox input", function(){
  var datasets = $(this).parents(".map-menu-product-dropdown").find(".map-menu-dataset input");
  if (this.checked) {
    datasets.prop("checked",true);
    datasets.each(function( index, element ) {
      mapActiveDataset(element);
    });
  }
  else {
    datasets.prop("checked",false);
    var datasets_id = $(this).parents(".map-menu-product-dropdown").find(".map-menu-dataset input");
    datasets_id.each(function( i, element ) {
      $("#active_"+element.id).remove();
    });
  }
});

function mapActiveDataset(dataset) {
  var dataset_id = dataset.id;
  if ($("#active_"+dataset_id)) {
    $("#active_"+dataset_id).remove();
  }
  $("#active_panel").append('<div class="active-dataset" id="active_'+ dataset_id +'"><div class="active-dataset-options"><span class="active-dataset-position"><span class="active-dataset-position-up"><i class="fas fa-long-arrow-alt-up"></i></span><span class="active-dataset-position-down"><i class="fas fa-long-arrow-alt-down"></i></span></span><span class="active-dataset-hide"><i class="fas fa-eye"></i></span><span class="active-dataset-delete"><i class="fas fa-times"></i></span></div></div>');
  $("#active_"+dataset_id).prepend($(dataset).parent().clone());
  $("#active_"+dataset_id).find(".map-menu-dataset").prepend($("#active_"+dataset_id).find(".map-menu-dataset label span"));
  $("#active_"+dataset_id+" input, #active_"+dataset_id+" label").remove();
};

$(document).on("click",".active-dataset-options i", function(){
  var dataset = $(this).parents(".active-dataset");
  if ($(this).hasClass("fa-long-arrow-alt-up")) {
    dataset.prev().before(dataset);
  }
  if ($(this).hasClass("fa-long-arrow-alt-down")) {
    dataset.next().after(dataset);
  }
  if ($(this).hasClass("fa-eye")) {
    if ($(this).hasClass("fa-eye-slash")) {
      $(this).removeClass("fa-eye-slash");
      // show dataset
    }
    else {
      $(this).addClass("fa-eye-slash");
      // hide dataset
    }
  }
  if ($(this).hasClass("fa-times")) {
    var dataset_id = dataset.attr("id").replace("active_","");
    $(".map-menu-dropdown .map-menu-dataset #"+dataset_id).prop("checked",false);
    dataset.remove();
    var product_checkbox = $(".map-menu-dropdown .map-menu-dataset #"+dataset_id).parents(".map-menu-product-dropdown").find(".map-product-checkbox input");
    if (product_checkbox.prop("checked")) {
      product_checkbox.prop("checked",false);
    }
  }
});


