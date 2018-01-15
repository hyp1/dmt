

function test_page() {
	try {
		var content = {};
		content['title'] = {
			markup : '<h1>Test Page!</h1>',
		};
		 
		
	
		
		content['test_list'] = {
			      theme: 'view',
			      format: 'jqm_item_list',
			      path: 'awrimobile/fragen', /* the path to the view in Drupal */
			      row_callback: 'test_list_row',
			      empty_callback: 'test_list_empty',
			      attributes: {
			        id: 'test_list_view'
			      }
			    };
		
		content['user_block'] = {
			markup : module_invoke('awri', 'block_view', 'user_login',
					'content', 'testarg')
		};

		content['test_block'] = {
			markup : module_invoke('awri', 'block_view', 'delta2', 'content',
					'testarg')
		};

		content['user_block2'] = {
			markup : module_invoke('awri', 'block_view', 'user_logout',
					'content', 'testarg')
		};

		content['test_form'] = {
			markup : drupalgap_get_form('test_form'),
		};

		content['dashboard'] = {
			theme : 'button',
			text : 'Dashboard',
			attributes : {
				onclick : "drupalgap_goto('dashboard');"
			}
		};
		page=test_custom_list_page();
console.log("LIST CONTENT");
console.log(page);

		return content;
	} catch (error) {
		console.log('test_page - ' + error);
	}
}

function test_pageshow() {
	console.log('test_pageshow', arguments.callee.toString().match(
			/function\s+([^\s\(]+)/));
}

function test_list_row(view, row, variables) {

	  try {
	    return l(t(row.title), 'node/' + row.nid);
	  }
	  catch (error) { console.log('my_module_articles_list_row - ' + error); }
	}

	/**
	 *
	 */
	function test_list_empty(view, variables) {

	  // This...

	  return t('Sorry, no articles were found.');

	  // Or...

	  var content = {};
	  content['msg'] = { markup: t('Sorry, no articles were found.') }
	  // content['some-other-widget'] = { /* ... */ }
	  return content;
	}
	
	
	function test_custom_list_page() {
		  var content = {};		  
		  content['test_custom_label'] = {
				    markup: '<p>custom_list<p>',
		  };
		  /*
		  content['test_custom_grid'] = {
		    theme: 'jqm_item_list',
		    title: 'Test Custom List',
		    items: [],
		    attributes: { id: 'custom_list' }
		  };
			*/
			content['test_grid1'] = {
					  theme: 'jqm_grid',
					  columns: 3,
					  title: 'mygrid',
					  items: [
					    bl('Foo', 'foo'),
					    bl('Bar', 'bar'),
					    bl('Baz', 'baz'),
					    bl('Foo', 'foo'),
					    bl('Bar', 'bar'),
					    bl('Chop', 'chop'),
					    bl('Bar', 'bar'),
					    bl('Baz', 'baz'),
					    bl('Chop', 'chop')
					    ]
					};
		  content['test_custom_label1'] = {
				    markup: '<p>custom_grid<p>',
		  }
		  
		  content['test_custom_list'] = {
				    markup: '<snall id="custom_grid"></small>',
		  }
		  
		  return content;
		}
	
	function test_custom_list_pageshow() {
		  var path_to_view = 'awrimobile/zufall';
		  views_datasource_get_view_result(path_to_view, {
		      success: function (data) {
		        if (data.nodes.length > 0) {
		          var items = [];
		          $.each(data.nodes, function(index, object){
		              var node = object.node;

		              items.push(
		                l(node.title, 'node/' + node.nid,{ 
		                    attributes: {
		                        'data-icon': 'grid',
		                        'id':'custom_list_item',
		                        'class': 'ui-btn ui-btn-icon-right'		                      
		                    }
		                  })		        		  )
		        		  

		          });
		          
		          drupalgap_item_list_populate('#custom_list', items);
		        
		          var  html=theme_jqm_grid({type:'small',
	        		  title: 'Custom Rendered Grid',
	        		  items: items,		        		 
	        		  attributes:{
	        			  id:"custom_grid"
	        		  }
	        		});
	         /*
		          var  html=theme_custom({type:'small',
		        		  title: 'Custom Rendered Grid',
		        		  items: items,		        		 
		        		  attributes:{
		        			  id:"custom_grid"
		        		  }
		        		});
		       */  
		          
		          console.log("HTML");
		          console.log(html);		       
		        $('#custom_grid').html(html).trigger('create');
		        
		        
		        
		        
		        
		        }
		      }
		  });
		}
	
function test_form(form, form_state, args) {
	try {
		form.elements['name'] = {
			markup : '<h2>Test Form</h2>',
		};
		
		
		
		form.elements['name'] = {
			type : 'textfield',
			title : 'Your value',
			value : args,
			required : true,
			attributes:{
				id:'test_textfield'
			}
		};

		form.elements['button1'] = {
			type : 'button',
			text : 'Show Value',
			attributes : {
				onclick : "_showValue();"
			}
		};

		form.elements['submit'] = {
			type : 'submit',
			value : 'Test'
		};
		return form;
	} catch (error) {
		console.log('test_page - ' + error);
	}
}


/**   Item Grid erst in dev version :-(
 * Implementation of theme_item_list().
 * @param {Object} variables
 * @return {String}
 *    var  html=theme_item_grid({type:'div',
		        		  title: 'Custom Rendered Grid',
		        		  items: items,		        		 
		        		  attributes:{
		        			  id:"custom_grid"
		        		  }
 */

function theme_custom(variables) {
  try {
    // We'll theme an empty list unordered list by default, if there is a type
    // of list specified we'll use that, and if there are some items we'll
    // theme them too.
    var type = 'div';
    if (variables.type) { type = variables.type; }
    var html = '';
    if (variables.title) { html += '<h2>' + variables.title + '</h2>'; }
    html += '<' + type + ' ' +
      drupalgap_attributes(variables.attributes) + '>';
    if (variables.items && variables.items.length > 0) {
      var listview = typeof variables.attributes['data-role'] !== 'undefined' &&
        variables.attributes['data-role'] == 'listview';
      for (var index in variables.items) {
          if (!variables.items.hasOwnProperty(index)) { continue; }
          var item = variables.items[index];
          var icon = null;
          html += '<'+type;
          if (listview && (icon = $(item).attr('data-icon'))) {
            // If we're in a listview and the item specifies an icon,
            // add the icon attribute to the list item element.
            html += ' data-icon="' + icon + '"';
          }
          html += '>' + item + '</'+type+'>';
      }
    }
    html += '</' + type + '>';
    return html;
  } catch (error) { console.log('theme_item_list - ' + error); }
  }

/*
function theme_grid(variables) {
	  try {
	    // We'll theme an empty list unordered list by default, if there is a type
	    // of list specified we'll use that, and if there are some items we'll
	    // theme them too.
	    var type = 'div';
	    if (variables.type) { type = variables.type; }
	    var html = '';
	    if (variables.title) { html += '<h2>' + variables.title + '</h2>'; }
	    html += '<' + type + ' ' +
	      drupalgap_attributes(variables.attributes) + '>';
	    if (variables.items && variables.items.length > 0) {
	      var listview = typeof variables.attributes['data-role'] !== 'undefined' &&
	        variables.attributes['data-role'] == 'listview';
	      for (var index in variables.items) {
	          if (!variables.items.hasOwnProperty(index)) { continue; }
	          var item = variables.items[index];
	          var icon = null;
	          html += '<div';
	          if (listview && (icon = $(item).attr('data-icon'))) {
	            // If we're in a listview and the item specifies an icon,
	            // add the icon attribute to the list item element.
	            html += ' data-icon="' + icon + '"';
	          }
	          html += '>' + item + '</div>';
	      }
	    }
	    html += '</' + type + '>';
	    return html;
	  } catch (error) { console.log('theme_item_list - ' + error); }
	  }
*/

function _showValue(){
	drupalgap_toast(document.getElementById('test_textfield').value,3000);
}

function _loadContentFromPage() {
	alert("content");
	var html = $.mobile.loadPage('#setup');
	// $('.region_content').html(html).trigger('create');
	$(':mobile-pagecontainer').pagecontainer('change', "#setup");
	// $('.region_content').html(html).trigger('create');
	console.log(html);

}