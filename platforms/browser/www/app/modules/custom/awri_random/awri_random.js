function awri_random_menu() {
	try {
		if (Drupal.settings.debug)
			console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
		var items = {};
		
		
		items['awri_random'] = {		
		'page_callback': 'awri_random_page',
        'page_arguments': [1],
        'pageshow': 'awri_random_pageshow',
        'title_callback': 'awri_question_page_title',
        'title_arguments': ['questions_list']
	};
		return items;
	} catch (error) {
		console.log('awri_questions_menu- ' + error);
	}
}

function awri_random_page() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');

	try {
		var content = {};

		content['qp'] = {
			theme : 'hidden',
			attributes : {
				id : 'qu_page',
			}
		};

		content['qu_js'] = {
			markup : '<div id="qu_js"></div>'
		};
		
		content['header'] = {
				theme:'header',
				text: 'Keine ID!',
				attributes:{
			id:'random_header',
				}
			};

		content['questions_list'] = {
			theme : 'view',
			format : 'jqm_grid',
			columns : 1,
			path : 'awrimobile/zufall', /* the path to the view in Drupal */
			row_callback : 'random_list_row',
			empty_callback : 'random_list_empty',
			attributes : {
				id : 'randomview_'+drupalgap_get_page_id(),
				'data-role' : 'none'
			},
		};

		content['random_next'] = {
				theme : 'button',
				text : 'Nächste Rechtsfrage',
				attributes: {
					'id':'random-next',
					'data-icon':'random',
					'onclick': "$('.pager_next').click();"
				}
			
			};
		

		content['break'] = {
			markup : '<br/><br/>'
		};
		return content;
	} catch (error) {
		console.log('awri_questions_page - ' + error);
	}
}

function awri_random_pageshow() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
		try {
		//	alert("PAGESHOW");
		//	  $( "body" ).on( "swipeleft", swipeLeftHandler );
	    //   	  $( "body" ).on( "swiperight", swipeRightHandler );
			//  $( "#questions_list" ).on( "swipeleft", swipeLeftHandler );
		 	 // $( "#questions_list" ).on( "swiperight", swipeRightHandler ); 
	} catch (error) {
		console.log('awri_questions_pageshow - ' + error);
	}
}

function random_empty() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		return "<h3>Sorry, leider nichts gefunden!</h3>";
	} catch (error) {
		console.log('awri_questions_empty - ' + error);
	}
}

function random_list_row(view, row, variables) {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		variable_set('qu_pages', view.pages);
		$('input#qu_page').val((1 + view.page));
		$('#random_header').html('<h2 class="ui-title">ID['+row.nid+']</h2>');
		$('#drupalgap_page_title_awri_questions').html(
				'Rechtsfragen ' + (1 + view.page) + '/' + view.pages).trigger(
				'create');

		return '<div id="questionview" class="randomview_'+drupalgap_get_page_id()+'" data-role="none"><h2>' + row.body
				+ '</h2><strong>' + theme_comment_count(row.comment_count) + '</strong></div><br/><div data-role="content">'+theme_controls(row.nid,row.fbmid)+'</div><br><br>';
	} catch (error) {
		console.log('random_list_row - ' + error);
	}
}



/*
$(function(){
 // Callback function references the event target and adds the 'swipe' class to it
 function swipeLeftHandler( event ){
  	console.log("Left:"+ $('#static_block'+drupalgap_get_page_id()+' p > span#pagecurr').text());
	$('.pager_next').click();
	_playAudio('swoosh.mp3');
  	$( event.target ).addClass( "swipe" );
 }

  function swipeRightHandler( event ){
  	console.log("Right:"+ $('#static_block'+drupalgap_get_page_id()+' p > span#pagecurr').text());
  	$('.pager_previous').click();
	_playAudio('swoosh.mp3');
  	$( event.target ).addClass( "swipe" );
	  }     
  alert("HAndlers loaded!");
});
*/