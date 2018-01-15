function awri_dashboard_menu() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		var items = {};
		items['awri_dashboard'] = {
			title : "Cockpit",
			page_callback : "awri_dashboard_page",
			pageshow : "awri_dashboard_pageshow",
//			title_callback : "awri_dashboard_pagetitle",
//			title_arguments : ['-Rechtsforum Schweiz'],
		};
		return items;
	} catch (error) {
		console.log('awri_dashboard_menu- ' + error);
	}
}

function awri_dashboard_page() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		var content = {};

		/*
	    
		content['my-picture'] = {
				  theme: 'avatar',
				  account: Drupal.user
				};
				
					var html = bl(t('Edit picture'), 'avatar', { reloadPage: true } );
		content['my-picture-edit-link'] = {
		  markup: html
		};
	*/	
		content['logo'] = {
				  theme: 'awrilogo',
				  width: 128,
				  height: 128,
				};
	
		
	
		
		content['rechtsfragen'] = {
			theme : 'button',
			text : 'Rechtsfragen',			
			attributes: {
				'data-icon':'paragraph',
				'onclick': "drupalgap_goto('awri_questions',{'transition':awri.transition})"
			}
		
		};

		content['suchen'] = {
			theme : 'button',
			text : 'Suchen',
			attributes: {
				'data-icon':'search',
				'onclick': "drupalgap_goto('awri_search',{'transition':awri.transition})"
			}
		
		};

		content['awri_post'] = {
				theme : 'button',
				text : 'Rechtsfrage stellen (anonym)',
				attributes: {
					'data-icon':'action',
					'onclick': "drupalgap_goto('awri_post',{'transition':awri.transition})"
				}
			
			};
			
		
		
		content['awri_random'] = {
				theme : 'button',
				text : 'Zufällige Rechtsfrage',
				attributes: {
					'data-icon':'random',
					'onclick': "drupalgap_goto('awri_random',{'transition':awri.transition})"
				}
			
			};
			
		content['bookmarks'] = {
				theme : 'button',
				text : 'Lesezeichen',
				attributes: {
					'data-icon':'bookmarks',
					'onclick': "drupalgap_goto('bookmarks',{reloadPage:true,'transition':awri.transition})"
				},
				options:{
			        reloadPage:true
			      }
			
			};
				
	/*
		content['setup'] = {
			theme : 'button',
			text : 'Einstellungen',
			attributes : {
				  'data-icon': 'gear',
				onclick : "drupalgap_goto('awri_setup');",
			}
		};
		*/
		content['help'] = {
				theme : 'button',
				text : 'Informationen',
				attributes: {
					'data-icon':'help',
					'onclick': "drupalgap_goto('awri_help',{'transition':awri.transition})",
				}

			};
		
		content['break'] = {
				markup: '<br/><br/>',
		};
/*
		content['test'] = {
			theme : 'button',
			text : 'Test',
			attributes : {
				onclick : "drupalgap_goto('test');"
			}
		};
		content['settings'] = {
			theme : 'button',
			text : 'Settings',
			attributes : {
				onclick : "drupalgap_goto('awri_settings_page');"
			}
		};

		content['test_custom_list'] = {
			theme : 'button',
			text : 'Test Custom List',
			attributes : {
				onclick : "drupalgap_goto('test_custom_list');"
			}
		};

		drupalgap_set_title('Fast Food Friday');
		*/
		return content;
	} catch (error) {
		console.log('awri_dashboard_page - ' + error);
	}
}
/*
function awri_dashboard_pagetitle(callback,title) {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		alert(title);
		callback.call(null,title);
	} catch (error) {
		console.log('awri_dashboard_pagetitle - ' + error);
	}
}

function awri_dashboard_pageshow() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		alert("ok");
drupalgap.menu_links['awri_dashboard']title="HAHAHAHA";
	} catch (error) {
		console.log('awri_dashboard_pageshow - ' + error);
	};
}
*/
/*
function awri_dashboard_pageshow() {
	try {
	
	} catch (error) {
		console.log('awri_dashboard_pageshow - ' + error);
	}
}

function awri_dashboard_page_title_callback(callback) {
	try {
		callback.call(null, "Awri Dashboard");
	} catch (error) {
		console.log('awri_dashboard_title - ' + error);
	}
}
*/

function awri_settings_page() {
	try {
		var content = {};
		content['awri_dashboard'] = {
			markup : '<p>Awri Settings!</p>'
		};
	} catch (error) {
		console.log('awri_dashboard_page - ' + error);
	}
}

function awri_dashboard_pageshow(){
	//alert((variable_get('home')=='1'));

}

function _drupalgap_image_path(uri) {
	  try {
	    var altered = false;
	    // If any modules want to alter the path, let them do it.
	    var modules = module_implements('image_path_alter');
	    if (modules) {
	      for (var index in modules) {
	          if (!modules.hasOwnProperty(index)) { continue; }
	          var module = modules[index];
	          var result = module_invoke(module, 'image_path_alter', uri);
	          if (result) {
	            altered = true;
	            uri = result;
	            break;
	          }
	      }
	    }
	    if (!altered) {
	      // No one modified the image path, we'll use the default approach to
	      // generating the image src path.
	      var src = Drupal.settings.site_path + '/' + uri;
	      if (src.indexOf('public://') != -1) {
	        src = src.replace('public://', Drupal.settings.file_public_path + '/');
	      }
	      else if (src.indexOf('private://') != -1) {
	        src = src.replace(
	          'private://',
	          Drupal.settings.file_private_path + '/'
	        );
	      }
	      return src;
	    }
	    else { return uri; }
	  }
	  catch (error) { console.log('drupalgap_image_path - ' + error); }
	}


function my_module_camera_click() {
	  try {
	    navigator.camera.getPicture(

	      // Success
	      function(imageURI) {
	        drupalgap_toast(t('Picture saved!'));
	        $('#photo').attr('src','data:image/jpeg;base64,'+imageURI).trigger('create');

	        Drupal.services.call({
	            method: 'POST',
	            path: 'file.json',
	            data: JSON.stringify({'file':{'file':imageURI,"filename":"14376_1472933862147.jpg","filepath":"public://14376_1472933862147.jpg"}}),
	            success: function(result) {
	              var user_count = result[0];
	              var msg = 'There are ' + user_count + ' registered user(s)!'
	              drupalgap_alert(msg);
	            }
	        });
	    
	        console.log(imageURI);
	      },

	      // Error
	      function(message) { console.log(message); },

	      // Settings
	      {
	        quality: drupalgap.settings.camera.quality,
	        destinationType: Camera.DestinationType.FILE_URI
	      }

	    );
	  }
	  catch (error) {
	    console.log('my_module_camera_click - ' + error);
	    }
	}