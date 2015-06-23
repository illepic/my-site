"use strict";
$(document).ready(function() {

  $(".js-site__nav-toggle").click(function() {
    $("body").toggleClass("has-site__nav-open");
  });
  //$("#primary-clone > ul").tinyNav({
  //    active: 'active' // Set the "active" class
  //});
  //$('.no-touch .archive-header >.nav-pills >li >a:not(.current-cat)').tooltip();
  //var $masonryContainer2 = $(".masonry-list.col-2");
  //$masonryContainer2.imagesLoaded(function(){
  //  $masonryContainer2.masonry({
  //    itemSelector : '.masonry-list > li',
  //    isResizable : true,
  //    columnWidth : function( containerWidth ) {
  //      return containerWidth / 2;
  //    },
  //    isAnimated: !Modernizr.csstransitions,
  //    animationOptions: {
  //      duration: 750,
  //      easing: 'linear',
  //      queue: false
  //    }
  //  });
  //});
  //var $masonryContainer3 = $(".masonry-list.col-3");
  //$masonryContainer3.imagesLoaded(function(){
  //  $masonryContainer3.masonry({
  //    itemSelector : '.masonry-list > li',
  //    isResizable : true,
  //    columnWidth : function( containerWidth ) {
  //      return containerWidth / 3;
  //    },
  //    isAnimated: !Modernizr.csstransitions,
  //    animationOptions: {
  //      duration: 750,
  //      easing: 'linear',
  //      queue: false
  //    }
  //  });
  //});
    // $masonryContainer.masonry({
    //   itemSelector : '.masonry-list > li',
    //   // isResizable : true,
    //   // columnWidth : 300,
    // });
  //$('.no-touch .my-social-sites a[title]').tooltip({
  //  animation: true,
  //  placement: 'left'
  //});

  
  //$(".my-social-sites a[title*='Skype']").attr('href', 'skype:evanlovely?chat');
  $('a[href^="http"]:not([href*="mysite.local"]):not([href*="evanlovely.com"])').attr('target', '_blank'); //Opens all external links in new tabs
	$('body').addClass('js-ran');
});
