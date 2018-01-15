$(document).on("keypress", "body", function(e) {

    if (e.which == 13) {
      alert('You pressed enter, good job dude!');
    }

});

$(document).on("pageinit", "#dashboard", function(e) {



});


$(function() {
	/*
	  $(document).on('pageshow',function(){
		  drupalgap_set_title(drupalgap_get_page_id());
	    //BACK when swiperight 
	    //Bind the swiperightHandler callback function to the swipe event on
	    $('div[data-role="page"]').on( "swiperight", drupalgap_swiperightHandler );
	    // Callback function references the event target and adds the 'swiperight' class to it
	    function drupalgap_swiperightHandler( event ){
	      var current_page_id = drupalgap_get_page_id();
	      $('div[data-role="page"]#' + current_page_id).on('swiperight', function(event) {
	    	  drupalgap_back();
	      });
	    }
	  }); //end of generic pageshow
*/
	}(jQuery));