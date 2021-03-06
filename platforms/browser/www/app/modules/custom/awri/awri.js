var AWRI = {
	version : "1.0",
	transition : "flip",
	mode : drupalgap.settings.mode,
	user : null,
	theme_path : null,
	endpoint : Drupal.settings.endpoint,
	site_path : Drupal.settings.site_path,
	qu_page : 0,
	logo : null,
	stats : {},
	getInfo : function() {
		return this.mode + ':' + this.version;
	},
	getStats : function() {
		return this.stats;
	},

	getUser : function() {
		return this.user;
	}
};

function awri_install() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),
				'DEBUG');
	try {
		AWRI.mode = drupalgap.settings.mode;
		AWRI.logo = drupalgap.settings.logo;
		if(variable_get('home')=='1')drupalgap.settings.front='awri_questions';
		if(variable_get('home')=='2')drupalgap.settings.front='awri_search';
		if(variable_get('home')=='3')drupalgap.settings.front='awri_post';
		if(variable_get('animation')=='1')awri.transition='flip';
		if(variable_get('animation')=='2')awri.transition='slide';
		if(variable_get('animation')=='3')awri.transition='pop';
		if(variable_get('animation')=='4')awri.transition='fade';
		if(variable_get('animation')=='5')awri.transition='flow';
		if(variable_get('animation')=='6')awri.transition='slideup';
		if(variable_get('animation')=='7')awri.transition='slidedown';
	//	alert(awri.transition);
			/*
		0: 'Keine',
	    1: 'Umdrehen',
	    2: 'Schieben',
	    3: 'Zoomen',
	    4: 'Einblenden'
	    	*/
		drupalgap_add_css(drupalgap_get_path('module','awri')+'/css/icons.css');
	} catch (error) {
		console.log('awri_install - ' + error);
	}
}

function awri_services_postprocess(options, result) {
	if (Drupal.settings.debug) {
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
		console.log(options.service);
		console.log(options.resource);
		console.log(result);
	}

	try {
		if (options.service == 'system' && options.resource == 'connect') {
			AWRI.user = result.user;
			if (AWRI.user.uid > 0 && $('#uid').val() < 1) {
				_setUser();
				// $('#uid').val(result.user.uid).trigger('onchange').one('onchange');
				// _setUser();
				// alert(result.user.name);
				// $('.ui-content').html(drupalgap_render(awri_start()));
				// drupalgap_goto('awri_start');
				// $('.ui-content').html('<h2>'+AWRI.user.name+'</h2>'+theme_user(AWRI.user));
			}
		}
		if (options.service == 'user' && options.resource == 'login') {
			AWRI.user = result.user;

			// $('#uid').val(result.user.uid).trigger('onchange').one('onchange');
			// if(AWRI.user.uid>0)drupalgap_goto('awri_start');
			// $('.ui-content').html(drupalgap_render(awri_start()));
			_setUser();
		}
	} catch (error) {
		console.log('awri_services_postprocess - ' + error);
	}
}

function awri_deviceready() {
	if (Drupal.settings.debug) {
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),
				'DEBUG');
		console.log(drupalgap, "DRUPALGAP");
		console.log(drupalgap.menu_links, "MENU_LINKS");
		console.log(drupalgap.blocks, "BLOCKS");
	}

	try {
		//Scheiss Hack!!!
		//drupalgap.menu_links['404']='awri_dashboard';
			AWRI.theme_path = path_to_theme();
			drupalgap.menu_links['offline'].page_callback='awri_offline_page';
			// _setAWRIStats();
	} catch (error) {
		console.log('awri_deviceready - ' + error);
	}
}

/*
function awri_services_postprocess(options, result){
    try {
    if (options.service == 'user') {
      if (options.resource == 'login') {
    	  drupalgap_goto('awri_dashboard');
    	drupalgap.settings.front='awri_dashboard';
      }
      else if (options.resource == 'logout') {
        drupalgap.settings.front = 'user/login';
      }
    }
  }
  catch (error) {
    console('mymodule_services_postprocess - ' + error);
  }
}
*/
function awri_menu() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),
				'DEBUG');
	try {
		var items = {};
		// Transitionen für Buttons, Menu Links in settings.js!
		items['awri_dashboard'] = {
			title : "Dashboard",
			page_callback : "awri_dashboard",
			options : {
				transition : awri.transition
			}
		};

		items['awri_questions'] = {
			title : "Rechtsfragen",
			page_callback : "awri_questions",
			options: {
				transition : awri.transition,
			}
				};

		items['awri_search'] = {
			title : "Suchen",			
			page_callback : "awri_search",
			options: {
				transition : awri.transition,
			}
		};

		items['awri_post'] = {
				title : "Rechtsfrage stellen",			
				page_callback : "awri_post",
				options: {
					transition : awri.transition,
				}
			};
		
		items['question_view'] = {
				title : "Rechtsfrage stellen",			
				page_callback : "question_view",
				pageshow : "question_viewshow",
				options: {
					transition : awri.transition,
				}
			};
		
		items['awri_help'] = {
				title : "Informationen",			
				page_callback : "awri_help",
				options: {
					transition : awri.transition,
				}
			};
		
		return items;
	} catch (error) {
		console.log('awri_menu - ' + error);
	}
}

function awri_help() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),
				'DEBUG');
	try {
		var content = {};
		
		content['rechtsfragen'] = {
				  theme: 'item_list',
				  title: 'Rechtsfragen',
				  items: [
				          '<p>Über 2500 beantwortete Rechtsfragen</p>', 
				          '<p>Nach Links oder Rechts blättern durch wischen auf dem Touchscreen oder mit der Maus</p>', 
				          ]
				};
		
		content['suche'] = {
				  theme: 'item_list',
				  title: 'Rechtsfrage suchen',
				  items: [
				          '<p>Zeigt automatisch die letzten 5 Einträge auf https://awri.ch an</p>', 
				          '<p>Suche mit verknüpften Wörtern. zB: zeigt eine Suche nach "Auto Parkplatz" nur die Einträge an, in denen diese beiden Wörter vorkommen</p></p>', 
				          ]
				};
		
		content['stellen'] = {
				  theme: 'item_list',
				  title: 'Rechtsfrage stellen',
				  items: [
				          '<p>ACHTUNG! Diese funktion steht nur Benutzern zur Verfügung, die auf https://awri.ch angemeldet sind</p>',
				          '<p>Die Frage wird anonym gepostet, die Admins bekommen eine Email und schalten die anonyme Frage frei</p>', 
				          '<p>Hängt den Kanton des Fragesellers an die Frage</p>', 
				          ]
				};
		
		
		content['zufall'] = {
				  theme: 'item_list',
				  title: 'Zufallsgenarator',
				  items: [
				          '<p>Zeigt zufällig eine der über 2500 Rechsfragen an</p>', 
				          '<p>Nach Links oder Rechts wischen auf dem Touchscreen oder mit der Maus um eine zufällige Frage zu holen</p>', 
				          ]

		};
		
		content['einstellungen'] = {
				  theme: 'item_list',
				  title: 'Einstellungen',
				  items: [
				          '<p><strong>Startseite</strong> Legt fest mit welcher Seite die App starten soll</p>', 				  						          
				          '<p><strong>Animation</strong> Seitenanimation festlegen</p>', 				  						          					      
				          //  '<p><strong>Benachrichtigungen</strong> Schaltet Benachrichtigungen ein/aus</p>', 
				          '<p><strong>Audio</strong> Schaltet Ton-Benachrichtigungen ein/aus</p>', 
				       //   '<p><strong>Vibration</strong> Schaltet Vibration ein/aus (Nur in Android App)</p>', 
				          '<p><strong>Neu laden</strong> Lädt die App erneut(refresh/restart)</p>',
				          '<p><strong>Daten löschen</strong> Löscht die Daten der App (Einstellungen und Cookies) und setzt die zurück in die Standardeinstellungen</p>',				          

				          ]
		};


		var image = {
				  path:awri.qrcode,
				  alt:'Android App QR Code',
				  title:'Android App QR Code',
						width:"50",
						height:"50",
				};
		content['download'] = {
				  theme: 'item_list',
				  title: 'Download',
				  items: [
				          '<p>Laden Sie sich die Android App für schnelleren Zgriff herunter !<br/> Download '+l('awri.apk',awri.apk,{ InAppBrowser:true })+' Android App oder verwenden Sie folgenden QR Code:<br/></p>',
				          "<p><span  class='awri_red'>Hinweis!</span> Da diese App noch nicht im App Store erhältlich ist, müssen Sie in den Sicherheitseinstellungen Apps von 'Unbekannten Quellen' zulassen.<p>", 
				          ""+theme('image',image,{"attributes":{'data-role':'none','class':'ui-btn'}})+"</br/>",
				          ]

		};
		
		options={'transition':awri.transition,'attributes':{'data-icon':'mail'}};
		content['contact'] = {
				markup : bl('Für weitere Fragen oder Anregungen','contact',{'transition':awri.transition,'attributes':{'data-icon':'mail'}}),
				
		};
		
		content['break'] = {
				markup : '<br/><br/>',
		};
		
		
		return content;
	} catch (error) {
		console.log('awri_help_page - ' + error);
	}
}

function awri_start_page() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),
				'DEBUG');
	try {
		var content = {};
		content['start_page'] = {
			markup : '<h2>Start Page</h2>',
		};

		content['transition-1'] = {
			theme : 'button_link',
			text : 'Suchen',
			path : 'awri_search',
			options : {
				transition : awri.transition,
			},
		};

		content['transition0'] = {
			theme : 'button_link',
			text : 'Rechtsfragen',
			path : 'awri_rechtsfragen',
			options : {
				transition : awri.transition,
			},
		};

		content['transition1'] = {
			theme : 'button_link',
			text : 'Page1',
			path : 'awri_page1',
			options : {
				transition : awri.transition,
			},
		};

		content['transition2'] = {
			theme : 'button_link',
			text : 'Start',
			path : 'awri_start',
			options : {
				transition : awri.transition,
			},
		};

		content['transition3'] = {
			theme : 'button_link',
			text : 'User',
			path : 'User',
			options : {
				transition : awri.transition,
			},
		};

		content['transition4'] = {
			theme : 'button',
			text : 'Transition Change',
			path : 'User',
			attributes : {
				onclick : "variable_set('transition','slide')",
			},
		};
		drupalgap.menu_links['awri_page1']['options']['attributes'] = {
			transition : 'flip'
		};

		return content;
	} catch (error) {
		console.log('awri_start_page - ' + error);
	}
}

function awri_start_pageshow() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),
				'DEBUG');
	try {

		// _setUser();
	} catch (error) {
		console.log('awri_start_pageshow - ' + error);
	}
}

function awri_page1_pageshow() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),
				'DEBUG');
	try {
	} catch (error) {
		console.log('awri_start_pageshow - ' + error);
	}
}

function awri_offline_page() {
	  try {
	    var content = {
	      'message': {
	        'markup': '<h2>' + t('Failed Connection') + '</h2>' +
	          '<p>' + t("Oops! We couldn't connect to") + ':</p>' +
	          '<p>' + Drupal.settings.site_path + '</p>'
	      },
	      'try_again': {
	        'theme': 'button',
	        'text': t('Try Again'),
	        'attributes': {
	          'onclick': 'javascript:offline_try_again();'
	        }
	      },
	      'bookmarks': {
		        'theme': 'button',
		        'text': t('Or browse your saved bookmarks'),
		        'attributes': {
		         'data-icon':"bookmarks",
		          'onclick': 'drupalgap_goto(\'bookmarks\');'
		        }
		      },
	      'footer': {
	        'markup': '<p>' +
	          t("Check your device's network settings and try again.") +
	        '</p>'
	      }
	    };
	    return content;
	  }
	  catch (error) { console.log('system_offline_page - ' + error); }
	}

function question_view() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),
				'DEBUG');
	try {
	
		var content = {};
		
		var full_question=JSON.parse(variable_get('qview'));
	//	console.log(full_question);
		
		var html="";
		var sub_comments=[];
		var comments=[];
		if(full_question.comment_count>0){
		for(var i=0;i<full_question.comments.length;i++){
			if(full_question.comments[i]!=null)
			if(full_question.comments[i].pid==0){
			html+=theme_awricomment(full_question.comments[i]);
				comments.push(full_question.comments[i]);
			}
				else sub_comments.push(full_question.comments[i]);
		}
	}
	//	console.log(comments,"comments");
	//	console.log(html,"html");
	//	console.log(sub_comments,"subcomments");
		variable_set('subcomments',sub_comments);
		 var created = new Date(full_question.created * 1000);
		    created = created.toLocaleDateString() + ' : ' +
		      created.toLocaleTimeString();
		    
		content['page1'] = {
			markup : '<div id="questionview" class="questionview_'+drupalgap_get_page_id()+'"><p><strong>'+created+'</strong></p><span><a href="#" onclick="javascript:drupalgap_goto(\'user/'+full_question.uid+'\');" class="" data-role="none"><img class="" src="https://graph.facebook.com/v2.5/'+full_question.field_fbid['und'][0].value+'/picture?width=50"> '+full_question.field_fbname['und'][0].value+'</a></span><h2>'+full_question.body['und'][0].value+'</h2><strong>'+full_question.comment_count+' Antworten</strong><div id="awricomments" data-role="content">'+html+'</div></div><br/></br>',
		};

		return content;
	} catch (error) {
		console.log('question_view - ' + error);
	}
}
function question_viewshow() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),
				'DEBUG');
try{
	
	//alert("show");
	var subs=JSON.parse(variable_get('subcomments'));
	//console.log(subs,"sowhsubs");
	for(var i=0;i<subs.length;i++){
	//	alert(subs[i].cid);
theme_awrisubcomment(subs[i]);
		}

} catch (error) { console.log('question_viewshow - ' + error); }
}

function awri_page_build(page) {
	if (Drupal.settings.debug) {
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),
				'DEBUG');
		console.log(page, "PAGE");
	}
	// if(drupalgap_get_page_id()=='dashboard'||drupalgap_get_page_id()=='awri_start'||drupalgap_get_page_id()=='awri_page1')
	 //page['brand']={markup:awri_user_block_view('static_block','static_block')+'<br><hr/>'};
	 //page['stats']={markup:awri_block_view('stats','stats')+'<br><hr/>'};
	 
	 // _setUser();
}

function awri_block_info() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),
				'DEBUG');

	var blocks = {};

	blocks['block1'] = {
		delta : 'block1',
		module : 'awri'
	};

	blocks['stats'] = {
		delta : 'stats',
		module : 'awri'
	};
	blocks['awri_footer'] = {
			delta : 'awri_footer',
			module : 'awri'
		};
	
	 blocks['awri_main_menu'] = {
		      delta: 'awri_main_menu',
		      module: 'awri'
		    };
	 
	return blocks;
}

/**
 * Implements hook_block_view().
 */
var cnt = 0;

function awri_block_view(delta, region) {
	cnt++;
	if (Drupal.settings.debug) {
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),
				'DEBUG');
		console.log(delta, 'DELTA');
		console.log(region, 'REGION');
	}

	var content = {};
	switch (delta) {
	  case 'awri_main_menu':
	      
	        var html = theme('popup', {
	            content: theme('jqm_item_list', {
	                items: [
	                  l('Rechtsfragen', 'awri_questions',{transition:awri.transition,attributes:{'class':'ui-btn ui-btn-icon-left ui-icon-paragraph'}}),
	                  l('Suchen', 'awri_search',{transition:awri.transition,attributes:{'class':'ui-btn ui-btn-icon-left ui-icon-search'}}),
	                  l('Rechtsfrage stellen', 'awri_post',{transition:awri.transition,attributes:{'class':'ui-btn ui-btn-icon-left ui-icon-action'}}),
	                  l('Zufällige Rechtsfrage', 'awri_random',{transition:awri.transition,reloadPage:true,attributes:{'class':'ui-btn ui-btn-icon-left ui-icon-random'}}),
	                  l('Lesezeichen', 'bookmarks',{transition:awri.transition,attributes:{'class':'ui-btn ui-btn-icon-left ui-icon-bookmarks'}}),
	                  l('Informationen', 'awri_help',{transition:awri.transition,attributes:{'class':'ui-btn ui-btn-icon-left ui-icon-help'}})

	                ]
	            }),
	            attributes: {
	              id: drupalgap_get_page_id() + '_awri_main_menu'
	            },
	            button_attributes: {
	              'data-icon': 'bars',
	              'data-iconpos': 'notext',
	              'class': 'ui-btn-left'
	            }
	        });
	       content['awri_main_menu']={
	    	markup : html,	   
	       };
	        break;
	        
	case 'block1':

		content['block1'] = {

			markup : '<div id="user_block-' + drupalgap_get_page_id()
					+ '"><h2>' + cnt + '-BLOCK1-' + drupalgap_get_page_id()
					+ '</h2></div>',
		};

	break;
	case 'stats':
		   var script= drupalgap_jqm_page_event_script_code({
		          page_id: 'awri-'+drupalgap_get_page_id()+'-'+region.name,
		          jqm_page_event: 'pageshow',
		          jqm_page_event_callback: 'stats_callback',
		          jqm_page_event_args: JSON.stringify({
		              menu_name: 'stats',
		              container_id: 'stats-'+drupalgap_get_page_id(),
		              'arg': 'myarg'
		          })
		      }, 'stats-'+drupalgap_get_page_id());
		content['stats'] = {
			markup : '<div  style="display:none;" class="statboard" id="stats-' + drupalgap_get_page_id()
					+ '">stats' + drupalgap_get_page_id() + '</div>'+script,
		};
		// Wenn methoden in einem Block dynamisch aufgerufen werden.		
		
	break;
	
case 'awri_footer':
	var social='<div data-role="controlgroup" data-type="horizontal" class="social ui-btn-left ui-controlgroup ui-controlgroup-horizontal ui-group-theme-b ui-corner-all ui-mini" style="position:relative;" data-mini="true">';
	
	social+='';
	social+='<a data-iconpos="notext" href="https://awri.ch/rss.xml" class="ui-link ui-btn ui-icon-rss ui-btn-icon-notext ui-shadow ui-corner-all ui-first-child" target="_NEW">&nbsp;</a>';
	social+='<a data-iconpos="notext" href="https://www.facebook.com/sharer/sharer.php?u=https://awri.ch/mobile" class="ui-link ui-btn ui-icon-facebook ui-btn-icon-notext ui-shadow ui-corner-all" target="_NEW">&nbsp;</a>';
	social+='<a data-icon="googleplus" data-iconpos="notext" href="https://plus.google.com/share?url=https://awri.ch/mobile" class="ui-link ui-btn ui-icon-googleplus ui-btn-icon-notext ui-shadow ui-corner-all" target="_NEW">&nbsp;</a>';
	social+='<a data-iconpos="notext" href="https://twitter.com/intent/tweet?url=https://awri.ch/mobile" class="ui-link ui-btn ui-icon-twitter ui-btn-icon-notext ui-shadow ui-corner-all ui-last-child" target="_NEW">&nbsp;</a></div>';
	content['footer'] = {
		markup :'<div data-role="footer" data-theme="b" data-position="fixed" class="region_footer ui-footer ui-bar-b ui-footer-fixed slideup" data-add-back-btn="true" role="contentinfo">'+social+'<p style="text-align:center; width:30%; height:30px; margin-left:auto;margin-right:auto;" id="fbanner"><span><a href="https://www.facebook.com/groups/RechtsberatungSchweiz/" target="_blank"><img src="img/FB-f-Logo__blue_29.png" width="18" height="18"/>&nbsp;Rechtsforum Schweiz</a></span> <a data-icon="back" data-iconpos="notext" class="ui-btn-right ui-link ui-btn ui-icon-back ui-btn-icon-notext ui-shadow ui-corner-all" onclick="javascript:drupalgap_back();" data-role="button" href="#" role="button">&nbsp;</a></p></div>'
};
	break;

	default:
		content['default'] = {
			markup :'<h1>DEFAULT</h1>',
	};
}
	return drupalgap_render(content);	
}

function stats_callback(args){
	if (Drupal.settings.debug)console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
		
	$.get(Drupal.settings.site_path + '/stats.txt?'+time(), function(data) {
	var stats = JSON.parse(data);
	AWRI.stats=stats;
	//console.log(data);
	var html='<div id="statsbar">'+theme_icon('question',stats.nodes)+' '+theme_icon('answer',stats.comments)+'<br/><small>'
	+stats.updated+'</small></div>';
		$('#'+args.container_id).html(html);
		$('#drupalgap_page_title_'+drupalgap_get_page_id()).html(
				'<span id="aw_title">Rechtsforum Schweiz ' +theme_icon('question',stats.nodes)+' '+theme_icon('answer',stats.comments)+'<div>').trigger(
				'create');
	});

	}


function _playAudio(audio){
	console.log("Try to play audio file:"+audio);
	//alert("playing:"+_getAppBasePath()+'/audio/'+audio);
	if(variable_get('sound')<1)return;
	var media=null;
		if(drupalgap.settings.mode=='phonegap'){
			//playAudio('/android_asset/www/audio/'+audio);
			media = new Media('/android_asset/www/audio/'+audio,
		            // success callback
		             function () { console.log("playAudio():Audio Success"); },
		            // error callback
		             function (err) { console.log("playAudio():Audio Error: " + err); }
		    );	
						// media.volume=10.5;
		}
		else{
		 media = new Audio(_getAppBasePath()+audio);
		 console.log(media);

		// media.volume=0.1;
		}		
		if(media)media.play();
		}


	function _getAppBasePath(){
		//alert(Drupal.settings.base_path);
	if(drupalgap.settings.mode=='phonegap')return '/android_asset/www/audio/';
	else return 'audio/';	

	}


function theme_controls(nid,fbmid){
	//drupalgap_add_js(drupalgap_get_path('module','awri')+'/localstorage.js');
	var content={};
var attrs = {
		  'data-role': 'controlgroup',
		  'data-type': 'horizontal',
		  'class': 'ui-btn-left',		    		  
		  'style':'position:relative;',
		  'data-theme':'a',				  		    		
		};
		
		 content['elem1'] = {markup:'<div ' + drupalgap_attributes(attrs) + '>' +				
				  /*
				 bl('Hier ansehen','node/'+nid, {
				      attributes: {
				        'data-icon': 'eye',
				        'data-iconpos': 'notext',
				  	  'data-theme':'a',
				  	  'data-mini': 'true',
				      },
				      transition: awri.transition
				  }) +
				  */
				   bl('Hier ansehen',"#", {reloadPage:true,
		      attributes: {
		        'data-icon': 'eye',
		        'data-iconpos': 'notext',
		  	  'data-theme':'a',
		  	  'data-mini': 'true',
		  	  onclick:"viewQuestion(\'"+nid+"\')"
		      },
		      transition: awri.transition
		  }) +
		  bl('Auf https://awri.ch ansehen', '#' + nid, {
		      attributes: {
		        'data-icon': 'awri32',
		        'data-iconpos': 'notext',
		  	  'data-theme':'a',
		  	  'data-mini': 'true',
			   'onclick': "window.open('"+ Drupal.settings.site_path+"/node/"+nid+"', '_system', 'location=yes')",			    
		      //inAppBrowser:true,
		      },		    		      
		      //transition: awri.transition
		  }) +
		  bl('Auf Facebook ansehen', '#' + nid, {
		      attributes: {
		        'data-icon': 'facebook',
		        'data-iconpos': 'notext',
		  	  'data-theme':'a',
		  	  'data-mini': 'true',
			   'onclick': "window.open('https://facebook.com/"+fbmid+"', '_system', 'location=yes')",			    
	    
		      //inAppBrowser:true,
		      },
		    	
		      //transition: awri.transition
		  }) +
		  bl('Lesezeichen setzen', '#', {
		      attributes: {
		        'data-icon': 'bookmark',
		        'data-iconpos': 'notext',
		      	  'data-theme':'a',
		      	  'data-mini': 'true',
		      	  'onclick':"module_invoke('awri_bookmarks','setbookmark','"+nid+"');",
		      },
		      transition: awri.transition
		  }) +
		'</div>'};
		 return drupalgap_render(content);
}

function viewQuestion(nid){
	 node_load(nid, {
		    success: function(node) {	  
		    //	 alert('Loaded ' + node.title);	 

	  		 if(node.comment_count>0){
	  			node['comments']=[];
	  			subs=[];
	  		 var query = {
	  				 pagesize:150,
					  parameters:{
					    nid: nid,					    
					  },
	  		options:{
						  orderby:{'created':'asc'}
					  }
					};
					comment_index(query, {
					    success: function(comments){
				
					    	for(var i=0;i<comments.length;i++){
					    	//console.log(comments[i],'COMMENT PID????');
					    	//if(comments[i].pid==0)
					    		node['comments'].push(comments[i]);
					    	//else subs.push(comments[i]);
				  			 //variable_set('subcomments',subs);
				  				
					    	}
				  				//		   	alert('Found ' + comments.length + ' comment(s)!');
				  		//				  alert('Found ' + subs.length + ' subcomment(s)!');
				  							 variable_set('qview',node);
				  				//			console.log(subs,'SUBCOMMENTS????');
				  						
				  				  			 drupalgap_goto('question_view',{reloadPage:true,transition: awri.transition});
				  				  			
					    }								
					});
	  		}else{
	  			 variable_set('qview',node);	
	  			 drupalgap_goto('question_view',{reloadPage:true,transition: awri.transition});
	  		 
	  	 }

	  		    //		 drupalgap_toast("<h2 class='awri_green'>OK!</h2>Die Rechtsfrage ID["+nid+"] wurde in Lesezeichen gespeichert!" );	    			   			    	 
		
		     }

		});
		
}

function theme_awrilogo(width,height){
	return '<img src="'+drupalgap.settings.logo+'" style="margin:auto;" width="'+width+'" height="'+height+'" data-role="none" class="ui-btn">';
}

function theme_awricomment(comment){
	//console.log(comment,'c');
	var created = new Date(comment.field_fbcreated['und'][0].value * 1000);
    created = created.toLocaleDateString() + '  ' +
      created.toLocaleTimeString();
	var html='';
	html+='';
	 html= '<div id="comment_container_'+drupalgap_get_page_id()+'_'+comment.cid+'" data-role="none"><div id="userblock" class="comment" data-role="none"><a data-icon="comment" class="ui-link ui-btn ui-btn-a ui-icon-comment ui-btn-icon-notext ui-shadow ui-corner-all" data-role="none" style="position:relative;"></a><p><strong>'+created+'</strong></p><span><a href="#" onclick="javascript:drupalgap_goto(\'user/'+comment.uid+'\');" class="" data-role="none" data-mini="true"><img class="" src="https://graph.facebook.com/v2.5/'+comment.field_fbid['und'][0].value+'/picture?width=50"> '+comment.name+'</a></span><h3>'+comment.comment_body['und'][0].value+'</h3></div>';
		html+='</div></br>';
return html;
}

function theme_awrisubcomment(comment){
	var created = new Date(comment.field_fbcreated['und'][0].value * 1000);
    created = created.toLocaleDateString() + '  ' +
      created.toLocaleTimeString();
	//console.log(comment,'s');
	var html='<div data-role="none" class="subcomment " id="sub_comment_container_'+comment.cid+'"<div class="ui-collapsible-content ui-body-inherit" aria-hidden="false">';
	html+='';
	 var html= '<div class="subcomment"><div id="userblock" data-role="none"><a data-icon="subcomment" class="ui-link ui-btn ui-btn-a ui-icon-subcomment ui-btn-icon-notext ui-shadow ui-corner-all" data-role="none" style="position:relative;"></a><p><strong>'+created+'</strong></p><span><a href="#" onclick="javascript:drupalgap_goto(\'user/'+comment.uid+'\');" class="" data-role="none"><img class="" src="https://graph.facebook.com/v2.5/'+comment.field_fbid['und'][0].value+'/picture?width=50"> '+comment.name+'</a></span><h4>'+comment.comment_body['und'][0].value+'</h4></div></div>';
	//html+='</div></div></div>';
	$('#comment_container_'+drupalgap_get_page_id()+'_'+comment.pid).append('<br/>'+html).trigger('create');
	//alert('#comment_container_'+comment.pid);
//return html;
}

function theme_comment_count(count) {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	var str = "Keine Antworten!";
	if (count == 1)
		str = count + " Antwort";
	if (count > 1)
		str = count + " Anworten";
	return '<div class="commentcount" data-role="content"><span><strong>' + str
			+ '</strong></span></div>';
}

function theme_icon(icon,txt) {
	if(txt==undefined)
	return '<a class="ui-btn-icon-notext ui-data-inset ui-btn ui-btn-icon-left ui-shadow  ui-data-mini ui-icon-'
			+ icon + ' aw-icon"></a>';
	else return '<a class="ui-ui-data-inset ui-btn ui-btn-icon-left ui-shadow  ui-data-mini ui-icon-'
	+ icon + ' aw-icon">&nbsp;'+txt+'</a>';

}

function theme_question(variables) {

	return '<a class="ui-btn-icon-notext ui-data-inset ui-btn ui-btn-icon-left ui-shadow  ui-data-mini ui-icon-'
			+ icon + ' aw-icon"></a>';
}
