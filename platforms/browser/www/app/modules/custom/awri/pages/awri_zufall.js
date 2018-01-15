function awri_zufall_page() {
	try {
		var content = {};

		content['header'] = {
				theme :'header',
				text:"<div id='nodeid'>ID</div>",
				attributes : {
					'style' : 'text-align:center;',
				}
		};
		
		
		content['neu'] = {
				theme : 'button',
				text : 'Nächste Frage',
				attributes : {
					onclick : "awri_zufall_pageshow('test_custom_list');",

				}
			};
		
		content['bookmark'] = {
				theme : 'button',
				text : t('Lesezeichen'),
				attributes : {
					onclick : "localStorage.SetBookmark();",
				}
			};
	
		/*
		content['load'] = {
				theme : 'button',
				text : 'Laden ',
				attributes : {
					onclick : "_showNode('"+variable_get('nid')+"');",

				}
			};
			*/
		content['test_custom_list'] = {
			markup : '<dib id="test_custom_list"></div>',
			attributes : {
				'class' : 'class1'
			}
		};
		
		
		
		/*
		 * content['view1'] = { theme : 'button', text : 'Ansehen', attributes : {
		 * onclick : "drupalgap_goto('node/"+variable_get('nid')+"');",
		 *  } };
		 */
/*
	
*/
		return content;
	} catch (error) {
		console.log('awri_zufall_page - ' + error);
	}
}

function awri_zufall_pageshow(id) {
	var path_to_view = 'awrimobile/zufall';
	views_datasource_get_view_result(path_to_view, {
		success : function(data) {
			if (data.nodes.length > 0) {
				var items = [];
				$.each(data.nodes, function(index, object) {
					var node = object.node;
					variable_set('nid',node.nid);
$('#nodeid').html('ID['+node.nid+']');
					var button_link = bl('Auf ' + Drupal.settings.site_path
							+ ' anzeigen', Drupal.settings.site_path + "/node/"
							+ node.nid + "/", {
						InAppBrowser : true
					});

					var button_link1 = bl('Auf Facebook anzeigen',
							'https://facebook.com/' + node.fbmid + '/', {
								InAppBrowser : true
							});
					var html = '<h2>' + node.body
							+ '</h2><p id="commentlabel">' + node.comment_count
							+ ' Kommentar(e)</p>';
					html +=button_link+button_link1+'<br/><br/><br/>';
					items.push(html);
				});

				// drupalgap_item_list_populate('#custom_list', items);
				/*
				 * var html=theme_jqm_grid({type:'small', title: 'Custom
				 * Rendered Grid', items: items, attributes:{ id:"custom_grid" }
				 * });
				 */
				var html = theme_custom({
					type : 'small',
					title : 'Zufallsgenerator',
					items : items,
					attributes : {
						id : "custom_grid"
					}
				});

			//	console.log("HTML");
			//	console.log(html);
				$('#'+id).html(html).trigger('create');

			}
		}
	});
}