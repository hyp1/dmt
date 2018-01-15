function awri_rechtsfragen_page() {
	try {
		var content = {};

		content['awri_header'] = {
				  theme: 'header',
				  text: 'Frage 1 von 0',
				  attributes: {
				    id: 'counter_header',				
				  },
		};
		

		
		content['rechtsfragenlist'] = {
			      theme: 'view',
			      format: 'jqm_item_list',
			      path: 'awrimobile/fragen', /* the path to the view in Drupal */
			      row_callback: 'rechtsfragen_list_row',
			      empty_callback: 'rechtsfragen_list_empty',
			      item_attributes:{id:"rechtsfrage_view"},
			      attributes: {
			    	  'data-inset':'true',
			        //id: 'rechtsfragen_list_view'
			      }
			    };
		

		content['save'] = {
				theme : 'button',
				text : 'Lesezeichen hinzufügen',
				attributes : {
					onclick : "saveCurrent();",
						
				}
			};

		content['load'] = {
				theme : 'button',
				text : 'LOAD',
				attributes : {
					onclick : "loadCurrent();",
						
				}
			};

		
		content['break'] = {
				markup : '<br/></br></br>',
				};
		
		drupalgap_toast('<h2 class="awri_green">Tipp:</h2><p>Man kann auch durch wischen umblättern!</p>',8000);
		
		return content;
	} catch (error) {
		console.log('awri_rechtsfragen_page - ' + error);
	}
}

function saveCurrent(){
	localStorage.SetBookmark(variable_get('nid'));
};



function rechtsfragen_list_row(view, row, variables) {
	  try {
		  console.log(view);
		variable_set('page',(1+view.page),1);
		variable_set('pages',view.pages,1);
		variable_set('nid',row.nid,0);
		//_saveNode(row.nid);
		$('#counter_header').html('<h2 class="ui-title" role="heading">Frage '+variable_get('page')+' von '+variable_get('pages')+'<span>&nbsp;&nbsp;&nbsp;<small id="nid">ID['+row.nid+']</small></span></h2>');
		  html='<div id="rechtsfragen_list_view"><h2>'+row.body+'</h2></div>';
	 //but=bl("'Auf Facebook anzeigen', 'https://facebook.com/'+row.fbmid,{inAppBrowser:true}");						
			
		  var button_link = bl('Auf '+Drupal.settings.site_path+' anzeigen', Drupal.settings.site_path+'/node/'+row.nid, { InAppBrowser: true });
			
		  var button_link1 = bl('Auf Facebook anzeigen', 'https://facebook.com/'+row.fbmid, { InAppBrowser: true });
		  
		  var button_link3=	bl('Zufall','#',{
					attributes : {
						  'data-icon': 'heart',
						onclick : "awri_zufall_pageshow('rechtsfragen_list_view');",
					}
				});
   return html+'<small>'+row.comment_count+' Kommentar(e)</small>'+button_link+button_link1+button_link3;
	  }
	  catch (error) { console.log('my_module_articles_list_row - ' + error); }
	}

	function rechtsfragen_list_empty(view, variables) {

	  return t('Sorry, no articles were found.');
	}

function awri_rechtsfragen_pageshow() {
	try {
		
	} catch (error) {
		console.log('awri_dashboard_page - ' + error);
	}
}