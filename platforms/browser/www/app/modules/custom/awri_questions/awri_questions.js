function awri_questions_menu() {
	try {
		if (Drupal.settings.debug)
			console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
		var items = {};
		items['awri_questions'] = {
			title : "Rechtsfragen",
			page_callback : "awri_questions_page",
			options: {reloadPage:true}
		};
		
		items['question'] = {		
		'page_callback': 'awri_question_view',
        'page_arguments': [1],
        'pageshow': 'awri_question_view_pageshow',
        'title_callback': 'awri_question_page_title',
        'title_arguments': [1]
	};
		return items;
	} catch (error) {
		console.log('awri_questions_menu- ' + error);
	}
}

function awri_questions_page() {
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
			id:'questions_header',
				}
			};
		
		content['questions_list'] = {
			theme : 'view',
			format : 'jqm_grid',
			columns : 1,
			path : 'awrimobile/fragen', /* the path to the view in Drupal */
			row_callback : 'questions_list_row',
			empty_callback : 'questions_list_empty',
			attributes : {
				id : 'questions_list',
				'data-role' : 'none'
			},
		};

		return content;
	} catch (error) {
		console.log('awri_questions_page - ' + error);
	}
}

function awri_questions_pageshow() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
		try {
		//	  $( "body" ).on( "swipeleft", swipeLeftHandler );
	    //   	  $( "body" ).on( "swiperight", swipeRightHandler );
			//  $( "#questions_list" ).on( "swipeleft", swipeLeftHandler );
		 	 // $( "#questions_list" ).on( "swiperight", swipeRightHandler ); 
	} catch (error) {
		console.log('awri_questions_pageshow - ' + error);
	}
}

function questions_empty() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		return "<h3>Sorry, leider nichts gefunden!</h3>";
	} catch (error) {
		console.log('awri_questions_empty - ' + error);
	}
}

function questions_list_row(view, row, variables) {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		variable_set('qu_pages', view.pages);
		$('input#qu_page').val((1 + view.page));
		$('#questions_header').html('<h2 class="ui-title">ID['+row.nid+']</h2>');
		$('#drupalgap_page_title_awri_questions').html(
				'Rechtsfragen ' + (1 + view.page) + '/' + view.pages).trigger(
				'create');

		return '<div id="questionview" class="questionview_'+drupalgap_get_page_id()+'" data-role="none"><h2>' + row.body
				+ '</h2><strong>' + theme_comment_count(row.comment_count) + '</strong></div><br/><div data-role="content">'+theme_pager(variables)+'</div><div data-role="content">'+theme_controls(row.nid,row.fbmid)+'</div><br><br>';
	} catch (error) {
		console.log('questions_list_row - ' + error);
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