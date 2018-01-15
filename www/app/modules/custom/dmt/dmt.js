function dmt_get_menu(options, name) {
	var arg = {
		'name' : name
	};
	try {
		options.method = 'POST';
		options.path = 'dmt_menu/get_menu.json';
		options.service = 'd7menu';
		options.resource = 'get_menu';
		options.data = JSON.stringify(arg);
		Drupal.services.call(options);
	} catch (error) {
		console.log('d7m_get_menu - ' + error);
	}
}

function _getMenu(name) {
	dmt_get_menu({
		success : function(result) {
			console.log(result);
		}
	}, name);
}

/**
 * Implements hook_menu(),
 */
function dmt_menu() {
	var items = {};
	items['hello'] = {
		title : 'Hello',
		page_callback : 'dmt_page'
	};
	items['dmt_dashboard'] = {
		title : 'DMT Start',
		page_callback : 'dmt_dashboard'
	};

	items['dmt_footer'] = {
		page_callback : 'dmt_footer'
	};

	items['settings'] = {
		title : 'Settings',
		page_callback : 'd7m_settings'
	};
	return items;
}

/**
 * 
 */
function dmt_dashboard() {
	try {
		var content = {};

		content['logo2'] = {
			theme : 'image',
			path : drupalgap_get_path('module', 'dmt')
					+ '/images/dmt_logo_black.png',
			alt : 'Drupal Mobile Tools',
			title : 'Drupal Mobile Tools',
			attributes : {
				'data-role' : "none",
				'style' : "min-width:228px;"
			},
		options : {
			
		}
		};

		content['line2'] = {
				markup : '<h3>Glückwunsch!</h3><div id="welcome">'
						+ '<p>Die Drupal Mobile Tools wurden erfolgreich installiert.</p>Erste Schritte findet ihr hier: <a href="#" onclick="javascript:window.open(\'http://demo.awri.ch/installed\', \'_blank\', \'location=yes\');">Drupal Mobile Tools</a></p></div>',
			};

		content['line1'] = {
			markup : '<div id="welcome" data-role="content"> <h2>Als nächstes</h2>'
					+ '<p>Die Verbindung mit <strong><a href="#" onclick="javascript:window.open(\''+Drupal.settings.site_path+'\', \'_blank\', \'location=yes\');">'+Drupal.settings.site_path+'</a> wurde hergestellt</strong></p>'+
					'<p>Inhalte und Men&uuml;punkte können auf der Drupalseite für die App dynamisch erstellt werden.<p></div>',
		};
/*
		content['logo2'] = {
			theme : 'image',
			path : drupalgap_get_path('module', 'dmt')
					+ '/images/dmt_logo_black.png',
			alt : 'Drupal Mobile Tools',
			title : 'Drupal Mobile Tools',

		};
*/
		
/*
		
		content['mobile_site'] = {
				theme : 'button_link',
				text : 'Zur Mobilen Website',
				path : Drupal.settings.site_path+'/mobile',
				options : {
					InAppBrowser : true
				}

			};
	*/	
		content['demo2'] = {
			theme : 'button_link',
			text : 'Zur DMT Demo Website',
			path : 'https://demo.awri.ch',
			options : {
				InAppBrowser : true
			}

		};
/*
		content['my_button3'] = {
			theme : 'button',
			text : 'Menu4',
			attributes : {
				onclick : "drupalgap_goto('menu/dmt-menu');"
			}
		};
		*/
		return content;
	} catch (error) {
		console.log('d7m_page - ' + error);
	}
}

function dmt_block_info() {
	try {
		var blocks = {};
		blocks['dmt_footer'] = {
			delta : 'dmt_footer',
			module : 'dmt'
		};
		return blocks;
	} catch (error) {
		console.log('dmt_block_info - ' + error);
	}
}

function dmt_block_view(delta, region) {
	try {
		var content = {};
		switch (delta) {
		case 'dmt_footer':
			content['dmt_footer'] = {
				markup : '<a href="#" onclick="javascript:window.open(\'http://demo.awri.ch\', \'_blank\', \'location=yes\');">Drupal Mobile Tools</a>',
			};

			break;
		default:
		}
		return drupalgap_render(content);
	} catch (error) {
		console.log('dmt_menu_block_view - ' + error);
	}
}

/**
 * 
 */
function dmt_page() {
	try {
		var content = {};
		content['my_button'] = {
			theme : 'button',
			text : 'GetFieldInfo',
			attributes : {
				onclick : "_getFieldInfoInstance('comment','article');"
			}
		};

		content['my_button2'] = {
			theme : 'button',
			text : 'Menu',
			attributes : {
				onclick : "_getMenu('d7mobile');"
			}
		};

		content['my_button3'] = {
			theme : 'button',
			text : 'Menu4',
			attributes : {
				onclick : "drupalgap_goto('d7mobilemenu');"
			}
		};
		return content;
	} catch (error) {
		console.log('d7m_page - ' + error);
	}
}

function dmt_rechtsfrage_page() {
	try {
		var content = {};
		content['my_button'] = {
			theme : 'button',
			text : 'Rechtsfrage',
			attributes : {
				onclick : "drupalgap_goto('settings')"
			}
		};
		return content;
	} catch (error) {
		console.log('d7m_page - ' + error);
	}
}

function d7m_settings() {
	try {
		file = drupalgap_file_get_contents('app/settings.js');

		var content = {};
		content['file'] = {
			markup : '<pre>' + file + '</pre>',
			attributes : {
				onclick : "drupalgap_alert(t('Hi!'))"
			}
		};
		return content;
	} catch (error) {
		console.log('d7m_page - ' + error);
	}
}
/*
 * function d7m_node_page_view_alter_article(node, options) {
 * console.log("ARTICLE"); console.log(node); }
 */

function dmt_form_alter(form, form_state, form_id) {
	console.log('muffel_form_alter');

	console.log(form.arguments);
	// alert(form_id);
	console.log(form.bundle);
	if (form_id == 'node_edit' && form.bundle == 'rechtsfrage') {
		alert("OK");
		console.log(form.elements);
		// form.elements.subject.type= 'textfield';
		// form.elements.field_file['access']=false;
		// form.elements.field_video['access']=false;
		form.elements.field_fbmid['access'] = false;
		form.elements.field_fbmid['required'] = 0;

		form.elements.field_fbid['access'] = false;
		form.elements.field_fbid['required'] = 0;
		form.elements.field_fbcreated['access'] = false;
		form.elements.field_fbcreated['required'] = 0;

		form.elements.field_fbname['access'] = false;
		form.elements.field_fbname['required'] = 0;
		form.elements.field_fburl['access'] = false;
		form.elements.field_fburl['required'] = 0;
		form.elements.field_fblikes['access'] = false;
		form.elements.field_fblikes['required'] = 0;
		form.elements.field_fbshares['access'] = false;
		form.elements.field_fbshares['required'] = 0;
		form.elements.field_fbcomments['access'] = false;
		form.elements.field_fbcomments['required'] = 0;

	}

	if (form.bundle == 'comment_node_rechtsfrage') {

		// form.elements.field_file['access']=false;
		// form.elements.field_video['access']=false;
		form.elements.subject.type = 'textfield';
		form.elements.field_image[Drupal.settings.language_default][1] = {};
		form.elements.field_image[Drupal.settings.language_default][2] = {};
		form.elements.field_image[Drupal.settings.language_default][3] = {};
		form.elements.field_image[Drupal.settings.language_default][4] = {};
		form.elements.field_image[Drupal.settings.language_default][5] = {};
		form.elements.field_image[Drupal.settings.language_default][6] = {};
		form.elements.field_image[Drupal.settings.language_default][7] = {};
		form.elements.field_image[Drupal.settings.language_default][8] = {};
		form.elements.field_image[Drupal.settings.language_default][9] = {};

		form.elements.field_video[Drupal.settings.language_default][0]['access'] = false;
		form.elements.field_video[Drupal.settings.language_default][0]['title'] = '';
		form.elements.field_video[Drupal.settings.language_default] = {};

		form.elements.field_file[Drupal.settings.language_default][0]['title'] = '';
		form.elements.field_file[Drupal.settings.language_default][0]['access'] = false;
		form.elements.field_file[Drupal.settings.language_default][1]['access'] = false;
		form.elements.field_file[Drupal.settings.language_default][2]['access'] = false;
		form.elements.field_file[Drupal.settings.language_default][3]['access'] = false;
		form.elements.field_file[Drupal.settings.language_default][4]['access'] = false;
		form.elements.field_file[Drupal.settings.language_default] = {};

		console.log("COMMENTNODEFORM");
		console.log(form.elements);

	}

	if (form_id == 'user_profile_form') {
		form.elements.field_adresses['access'] = false;
		form.elements.field_adresses['required'] = 0;

		// form.elements.field_reference_kontakt['access'] = false;
		// form.elements.field_reference_kontakt['required'] = 0;
	}
	if (form_id == 'search_form') {
		form.options.attributes.method = "POST";
		console.log(form);
	}
	console.log(form);
}
