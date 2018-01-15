function awri_setup_menu(){
	  if(Drupal.settings.debug)console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
var items=[];
	items['awri_setup'] = {
			title : 'Lesezeichen',
			page_callback : 'awri_setup_page',
			pageshow : 'awri_bookmarks_pageshow',
			options:{
		        transition:AWRI.transition
		      }
		};
return items;
};

function awri_setup_page() {
	try {
		var content = {};
	
		
				
		content['awri_setup'] = {
				markup : drupalgap_get_form('awri_setup_form'),
			};
		
		
		return content;
	} catch (error) {
		console.log('awri_setup_page - ' + error);
	}
}

function awri_setup_pageshow() {
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/));
}


function awri_setup_form(form, form_state) {
	  try {

		  
		  form.elements['anim'] = {
				  title: 'Animation',
				  type: 'select',
				  options: {
					0: 'Keine',
				    1: 'Umdrehen',
				    2: 'Schieben',
				    3: 'Zoomen',
				    4: 'Einblenden',
					5: 'Fliessen',
				    6: 'Hochfahren',
				    7: 'Runterfahren'
				  },
				  default_value: variable_get('animation')
				};
		  
		  form.elements['home'] = {
				  title: 'Startseite',
				  type: 'select',
				  options: {
					0: 'Dashboard',
				    1: 'Rechtsfragen',
				    2: 'Rechtsfragen suchen',
				    3: 'Rechtsfragen stellen',
				    4: 'Zufall'
				  },
				  default_value: variable_get('home')
				};
		  /*
		  form.elements['notifications'] = {
				  title: 'Benachrichtigungen',
				  type: 'checkbox',
				  description: 'Benachrichtigungen erhalten.',
				  default_value:variable_get('notifications','0') 
				};
	*/
		  form.elements['sound'] = {
				  title: 'Audio',
				  type: 'checkbox',
				  description: 'Ton Benachrichtigungen einschalten.',
				  default_value:variable_get('sound','0') /* a value of 1 checks the box */
				};
	/*
		  form.elements['vibration'] = {
				  title: 'Vibration',
				  type: 'checkbox',
				  description: 'Vibration einschalten. (Android)',
				  default_value:variable_get('vibration','0') 
				};
	*/
		  
	    if(variable_get('drupalconnected')=='0'){
	    	
	    	drupalgap_set_message('Sie sind nicht auf https://awri.ch registriert!', 'warning');

	    	form.elements['dlabel'] = {
	    		      markup: '<p style="background-color:#fef5f1;border: 1px solid #8C2E09;">Die App funktioniert mit einigen Einschränkungen, auch auf https://awri.ch angemeldet zu sein!<p>',
	    		    };
		    
	    	form.buttons['facebook'] = {
	    	        title: 'Auf <href="https://awri.ch">https://awri.ch</a> anmelden!',
	    	        attributes: {
	    	          'class': '.ui-nodisc-icon',	    	
	    	          'data-icon': 'info', // we place any icon here, then overwrite it with css
	    	              onclick: "FacebookLogin();",
	    	        }
	    	      };
	    	/*
	    	form.elements['drupalcon'] = {
		  	      type: 'button',
		  	      text: 'Mit https://awri.ch verbinden',
		  	      attributes:{
		  	    //	  onclick:"window.open('"+Drupal.settings.site_path+"/user/simple-fb-connect?redirect="+Drupal.settings.site_path+"', '_system', 'location=yes');"		 		  	 		  	      }
		  	    	  onclick:"facebook_onclick();"
		  	      }
		  	      };
		  	      */	    		    	
	    } else 	drupalgap_set_message('Sie sind auf https://awri.ch angemeldet!');
	    
   if(variable_get('fbconnected')=='0'){
	    	
	    	drupalgap_set_message('Sie sind nicht auf Facebook angemeldet!', 'error');

	    	form.elements['flabel'] = {
	    		      markup: '<p style="background-color:#fef5f1;border: 1px solid #8C2E09;">Die App funktioniert mit grösseren Einschränkungen, auch ohne auf Facebook angemeldet zu sein!<p>',
	    		    };
	    	/*
	    	form.elements['register'] = {
	    		      markup: drupalgap_get_form('user_register_form'),
	    		    };
	    	*/
	    	form.elements['fbcon'] = {
		  	      type: 'button',
		  	      text: 'Mit Fackebook verbinden...',
		  	      attributes:{
		  	    	  onclick:"facebook_onclick();"
		  	      }
		  	    };	    		    	
	    } else drupalgap_set_message('Die Facebook App wurde authorisiert!');

	    
   if(variable_get('drupalconnected')=='1'&&variable_get('fbconnected')=='1')
   	drupalgap_set_message('Die App wurde erfolgrich eingerichtet!');

   
	form.elements['reload'] = {
			type : 'button',
			text : 'Neu laden',
			attributes : {
				onclick : "Reload();"
			}
		};
	
	form.elements['reset'] = {
			type : 'button',
			text : 'Daten löschen',
			attributes : {
				onclick : "ResetData();"
			}
		};

   
		
   return system_settings_form(form); 
	 //  return form;
	  }
	  catch (error) { console.log('awri_setup_form - ' + error); }
	}

function awri_setup_form_submit(form, form_state){
	variable_set('notifications',form_state.values.notifications);
	variable_set('sound',form_state.values.sound);
	variable_set('vibrations',form_state.values.vibration);
	variable_set('animation',form_state.values.anim);
	variable_set('home',form_state.values.home);
	drupalgap_toast("Die Einstellingen wurden gespeichert!");
}
/*
function awri_setup_form_cancel(form, form_state){

}
*/
function ResetData(){
variable_del('drupalconnected','0');
variable_del('fbconnected','0');
variable_del('duid');
variable_del('dname');
variable_del('drupalgap_form_awri_setup_form');
variable_del('notifications');
variable_del('sound');
variable_del('vibrations');
variable_del('home');

//cookie=readCookie('DRUPAL_UID');
//alert(cookie);
//eraseCookie('DRUPAL_UID');
drupalgap_toast("<p>Die App wurde zurückgesetzt</p><p>Bitte melden Sie sich erneut an ...</p>",5000);
//document.cookie = 'DRUPAL_UID' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
Reload();
};

function Reload(){
	drupalgap_toast("Lade App ...",5000);
	path=drupalgap_router_path_get();
    drupalgap_goto('?'+time,{reloadPage:true});
	//javascript:offline_try_again();
	//document.location.href="http://kimo2007.dnshome.de/test/browser/www/index.html#"+path+"?"+time();
};


function FacebookLogin() {
    openFB.login(
            function(response) {
                if(response.status === 'connected') {
                    facebook_connected(response.authResponse.accessToken);
                	drupalgap_toast('Facebook login succeeded, got access token: ' + response.authResponse.accessToken,5000);
                } else {
                    drupalgap_toast('Facebook login failed: ' + response.error,5000);
                }
                drupalgap_goto('awri_setup', {reloadPage:true});
            }, {scope: 'email'});
}



function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}
