function awri_suche_page() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		var content = {};		
		
		content['searchform'] = {
				  markup: drupalgap_get_form('search_form'),
		}
		
		content['searchresult'] = {
				  markup: '<div id="searchresult"></div>',
		}
		return content;
	} catch (error) {
		console.log('awri_zufall_page - ' + error);
	}
}

function awri_suche_pageshow() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	
	  var path_to_view = 'awrimobile/suche?body_value='+$('#edit-search-form-search').val();
	  $('#searchresult').html("<div>Keine Ergebnisse !<div>");
	  views_datasource_get_view_result(path_to_view, {
	      success: function (data) {
	        if (data.nodes.length > 0) {
	          var items = [];
	          $.each(data.nodes, function(index, object){
	              var node = object.node;
	         				
				  var button_link = bl('Auf '+Drupal.settings.site_path+' anzeigen', Drupal.settings.site_path+"/node/"+node.nid+"/", { InAppBrowser: true });
					
				  var button_link1 = bl('Auf Facebook anzeigen', 'https://facebook.com/'+node.fbmid+'/', { InAppBrowser: true });
							  
	              items.push(
	                '<h2>'+node.body+'</h2><p id="commentlabel">'+node.comment_count+' Kommentar(e)</p>'+button_link+button_link1+'<br><br>' );	        		  
	          } );
	          
	         // drupalgap_item_list_populate('#searchresult', items);
	        /*
	          var  html=theme_jqm_grid({type:'small',
      		  title: 'Custom Rendered Grid',
      		  items: items,		        		 
      		  attributes:{
      			  id:"custom_grid"
      		  }
      		});
       */
	        
	        var html=theme_custom({type:'small',
	        		  title: 'Suchergebnisse',
	        		  items: items,		        		 
	        		  attributes:{
	        			  id:"custom_grid"
	        		  }
	        		});
	            
	        $('#searchresult').html(html).trigger('create');       
	        }
	      }
	  });
	}
function search_form_submit(form, form_state) {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');

try{
	
}catch (error) {
	console.log('search_form_submit - ' + error);
}
}


function search_form_validate(form, form_state) {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
	//	alert("Validate");
	
		if (form_state.values['search_field']) {
		      drupalgap_form_set_error('oops,', 'Der Suchbegriff ist zu kurz!');
		    }
	
	}catch (error) {
		console.log('search_form_validate - ' + error);
	}
}
function search_form(form, form_state) {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		form.elements['name'] = {
			markup : '<h2>Suchen</h2>',
		};
				
		
		form.elements['search'] = {
			type : 'textfield',
			title : 'Suchbegriffe',
			required :false,
		};

		form.elements['button1'] = {
			type : 'submit',
			value : 'Suchen',
			attributes : {
				onclick : "awri_suche_pageshow();"
			}
		};		
		return form;
	} catch (error) {
		console.log('search_form - ' + error);
	}
}

