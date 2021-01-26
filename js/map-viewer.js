$(document).ready(function(){

});

var view;
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/ScaleBar",
  "esri/widgets/BasemapGallery",
  "esri/widgets/Zoom"
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
  print_button.addEventListener('click', function(evt){
    // action
  });
  view.ui.add(print_button, "top-right");
  
  // Area selection
  var area_button = document.createElement('div');
  area_button.className = "esri-icon-cursor-marquee esri-widget--button esri-widget esri-interactive";
  area_button.addEventListener('click', function(evt){
    // action
  });
  view.ui.add(area_button, "top-right");

  // Legend
  var legend_button = document.createElement('div');
  legend_button.className = "esri-icon-legend esri-widget--button esri-widget esri-interactive";
  legend_button.addEventListener('click', function(evt){
    // action
  });
  view.ui.add(legend_button, "top-right");
  
  // Menu
  var menu_container = document.createElement('div');
  menu_container.className = "map-menu-container"
  var menu_button = document.createElement('div');
  menu_button.className = "esri-icon-drag-horizontal esri-widget--button esri-widget esri-interactive";
  menu_container.innerHTML =
    '<div class="map-menu tab-container">'+
      '<input class="radio" id="products_tab" name="group" type="radio" checked>'+
      '<input class="radio" id="active_tab" name="group" type="radio">'+
      '<div class="tabs">'+
        '<label class="tab" id="products_label" for="products_tab">Products and datasets</label>'+
        '<label class="tab" id="active_label" for="active_tab">Active on map</label>'+
      '</div>'+
      '<div class="panels">'+
        '<div class="panel" id="products_panel"></div>'+
        '<div class="panel" id="active_panel"><div class="no-active-datasets">No datasets selected</div></div>'+
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
});

function loadTestProducts () {
  $("#products_panel").empty().append(
    '<div class="map-menu-component dropdown">'+
      '<div class="ccl-dropdown__link  ccl-expandable__button" aria-expanded="false">Product component</div>'+
      '<div class="map-menu-component-container">'+
        '<div class="map-menu-product dropdown">'+
          '<div class="ccl-dropdown__link  ccl-expandable__button" aria-expanded="false">'+
            '<div class="ccl-form map-product-checkbox">'+
              '<div class="ccl-form-group">'+
                '<input type="checkbox" id="map_product_1" name="" value="" class="ccl-checkbox ccl-required ccl-form-check-input" aria-required="true">'+
                '<label class="ccl-form-check-label" for="map_product_1"></label>'+
              '</div>'+
            '</div>'+
          'Product 1</div>'+
          '<div class="ccl-form map-menu-products-container">'+
            '<div class="ccl-form-group map-menu-dataset">'+
              '<input type="checkbox" id="map_dataset_1-1" name="" value="name" class="ccl-checkbox ccl-required ccl-form-check-input" aria-required="true">'+
              '<label class="ccl-form-check-label" for="map_dataset_1-1">'+
                '<span>Dataset 1.1</span>'+
              '</label>'+
              '<a href="./dataset-catalogue/dataset-info.html"><i class="fas fa-info-circle"></i></a><a href="./dataset-catalogue/dataset-download.html"><i class="fas fa-download"></i></a>'+
            '</div>'+
            '<div class="ccl-form-group map-menu-dataset">'+
              '<input type="checkbox" id="map_dataset_1-2" name="" value="date" class="ccl-checkbox ccl-required ccl-form-check-input" aria-required="true">'+
              '<label class="ccl-form-check-label" for="map_dataset_1-2">'+
                '<span>Dataset 1.2</span>'+
              '</label>'+
              '<i class="fas fa-info-circle"></i><i class="fas fa-download"></i>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<div class="map-menu-product dropdown">'+
          '<div class="ccl-dropdown__link  ccl-expandable__button" aria-expanded="false">'+
            '<div class="ccl-form map-product-checkbox">'+
              '<div class="ccl-form-group">'+
                '<input type="checkbox" id="map_product_2" name="" value="" class="ccl-checkbox ccl-required ccl-form-check-input" aria-required="true">'+
                '<label class="ccl-form-check-label" for="map_product_2"></label>'+
              '</div>'+
            '</div>'+
          'Product 2</div>'+
          '<div class="ccl-form map-menu-products-container">'+
            '<div class="ccl-form-group map-menu-dataset">'+
              '<input type="checkbox" id="map_dataset_2-1" name="" value="name" class="ccl-checkbox ccl-required ccl-form-check-input" aria-required="true">'+
              '<label class="ccl-form-check-label" for="map_dataset_2-1">'+
                '<span>Dataset 2.1</span>'+
              '</label>'+
              '<i class="fas fa-info-circle"></i><i class="fas fa-download"></i>'+
            '</div>'+
            '<div class="ccl-form-group map-menu-dataset">'+
              '<input type="checkbox" id="map_dataset_2-2" name="" value="date" class="ccl-checkbox ccl-required ccl-form-check-input" aria-required="true">'+
              '<label class="ccl-form-check-label" for="map_dataset_2-2">'+
                '<span>Dataset 2.2</span>'+
              '</label>'+
              '<i class="fas fa-info-circle"></i><i class="fas fa-download"></i>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>')
};

$(document).on ("click",'.ccl-expandable__button', function(){
  $(this).attr('aria-expanded', function(index, attr){
    return attr == 'true' ? 'false' : 'true';
  });
})

$(document).on ("change",'.map-menu-dataset input', function(){
  var dataset_id = this.id;
  var product = $(this).parents(".map-menu-product").find(".map-product-checkbox input");
  if (product.prop("checked")) {
    product.prop("checked",false);
  }
  if (this.checked) {
    $("#active_panel").append('<div class="active-dataset" id="active_'+ dataset_id +'"></div>');
    $(this).parent().clone().appendTo("#active_"+dataset_id);
    $("#active_"+dataset_id).find(".map-menu-dataset").prepend($("#active_"+dataset_id).find(".map-menu-dataset label span"));
    $("#active_"+dataset_id+" input, #active_"+dataset_id+" label").remove();
  }
  else {
    $("#active_"+dataset_id).remove();
  }
});

$(document).on("change",".map-product-checkbox input", function(){
  var datasets = $(this).parents(".map-menu-product").find(".map-menu-dataset input");
  if (this.checked) {
    datasets.prop("checked",true);
    datasets.each(function( index, element ) {
      mapActiveDataset(element);
    });
  }
  else {
    datasets.prop("checked",false);
  }
});

function mapActiveDataset(dataset) {
  var dataset_id = dataset.id;
  if ($("#active_"+dataset_id)) {
    $("#active_"+dataset_id).remove();
  }
  $("#active_panel").append('<div class="active-dataset" id="active_'+ dataset_id +'"><div class="active-dataset-options"><span class="active-dataset-position"><i class="fas fa-long-arrow-alt-up"></i><i class="fas fa-long-arrow-alt-down"></i></span><span class="active-dataset-hide"><i class="fas fa-eye"></i></span><span class="active-dataset-delete"><i class="fas fa-times"></i></span></div></div>');
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
    $(".map-menu-component .map-menu-dataset #"+dataset_id).prop("checked",false);
    dataset.remove();
  }
});


