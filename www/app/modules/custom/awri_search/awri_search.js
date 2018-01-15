function awri_search_menu() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		var items = {};
			items['awri_search'] = {
			title : 'Suchen',
			page_callback : 'awri_search_page',
			pageshow : 'awri_search_pageshow',
		};
	return items;
	} catch (error) {console.log('awri_search_menu - ' + error);}
}

function awri_search_page() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		var content = {};				
		content['searchform'] = {
				  markup: drupalgap_get_form('search_form'),
		};		
		content['searchresult'] = {
				  markup: '<div id="searchresult"></div>',
		};
		return content;
	} catch (error) {
		console.log('awri_search_page - ' + error);
	}
}

function awri_search_pageshow() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		if(empty($('#edit-search-form-search').val()))return;
	  var path_to_view = 'awrimobile/suche?body_value='+$('#edit-search-form-search').val();
	  $('#searchresult').html("<div>Keine Ergebnisse !<div>");
	  views_datasource_get_view_result(path_to_view, {
	      success: function (data) {
	        if (data.nodes.length > 0) {
	       //   var items = [];
	          var html='<div data-role="header" style="text-align:center"><b>'+data.view.count+' Resultate</b></div>';
	          $.each(data.nodes, function(index, object){
	              var node = object.node;
	         		//console.log(data.view);
	         			
			//	  var button_link ="";
			//	  if(node.nid)button_link=bl('Auf '+Drupal.settings.site_path+' anzeigen', Drupal.settings.site_path+"/node/"+node.nid+"/", { InAppBrowser: true });					
			//	  var button_link1 ="";
			//	    button_link1 = bl('Auf Facebook anzeigen', 'https://facebook.com/'+node.fbmid+'/', { InAppBrowser: true });
			//	    var button_link2 ="";
			//	    button_link2 = bl('Auf Facebook anzeigen', 'node/'+node.nid, { attributes:{ 'data-icon':'awri32'}});
			
				    html+=node.created+'<h2>'+node.body+'</h2><p id="commentlabel">'+node.comment_count+' Kommentar(e)</p><div data-role="content">'+theme_controls(node.nid,node.fbmid)+'</div><br/><br/>';	        		  
		        		  
	    //          items.push(
	    //        		  '<b>'+data.view.count+'</b>'+ '<h2>'+node.body+'</h2><p id="commentlabel">'+node.comment_count+' Kommentar(e)</p>'+button_link+'<br><br>' );	        		  
	          } );
	          
	  /*
	          drupalgap_item_list_populate('#my_article_list', items);
	          var html=theme_custom({type:'small',
        		  title: 'Suchergebnisse',
        		  items: items,		        		 
        		  attributes:{
        			  id:"custom_grid"
        		  }
        		});
            */
        $('#searchresult').html(html).trigger('create');	        
	        }
	      }
	  });
	} catch (error) {console.log('awri_search_pageshow - ' + error);}
}

function search_form_submit(form, form_state) {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
try{
	console.log(form_state);
} catch (error) {console.log('search_form_submit - ' + error);}
}

function search_form_validate(form, form_state) {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		if (form_state.values['search_field']) {
		      drupalgap_form_set_error('Oops,', 'Der Suchbegriff ist zu kurz!');
		    }
	
	}catch (error) {
		console.log('search_form_validate - ' + error);
	}
}

function search_form(form, form_state) {
	if (Drupal.settings.debug){
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
		console.log(form,'FORM');
		console.log(form_state,'FORMSTATE');		
}
		try {
		form.elements['name'] = {
			markup : '<h2>Suchen</h2>',
		};
						
		form.elements['search'] = {
			type : 'textfield',
			title : 'Suchbegriffe',
			required :true,
		};

		form.elements['button1'] = {
			type : 'submit',
			value : 'Suchen',
			attributes : {
				onclick : "awri_search_pageshow();"
			}
		};	
									
		return form;
	} catch (error) {
		console.log('search_form - ' + error);
	}
}

