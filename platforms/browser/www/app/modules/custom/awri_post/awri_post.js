var kantone=['Aargau',
             'Appenzell Ausserrhoden',
             'Appenzell Innerrhoden',
             'Basel-Land',
             'Basel-Stadt',
             'Bern',
             'Fribourg/Freiburg',
             'Genève/Genf',
             'Glarus',
             'Graubünden/Grischuns/Grigioni',
             'Jura',
             'Luzern',
             'Neuchâtel/Neuenburg',
             'Nidwalden',
             'Obwalden',
             'St.Gallen',
             'Schaffhausen',
             'Schwyz',
             'Solothurn',
             'Thurgau',
             'Ticino/Tessin',
             'Uri',
             'Vaud/Waadt',
             'Valais/Wallis',
             'Zug',
             'Zürich'];

function awri_post_menu() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		var items = {};
		items['awri_post'] = {
		title : "Rechtsfrage stellen",
		page_callback : "awri_post_page",
		};
		return items;
	} catch (error) {
		console.log('awri_post_menu- ' + error);
	}
}

function awri_post_page() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	var content={};
	try {
		content['posthead'] = {
				markup : '<h2>Rechtsfrage stellen(anonym)<dh2>',
			};

			content['post_form'] = {
				markup : drupalgap_get_form('awri_post_form'),
			};

			content['postfoot'] = {
					markup : '</br></br>',
				};
	
	return content;
	} catch (error) {
		console.log('awri_post_page - ' + error);
	}
}


function awri_post_form(form, form_state) {
	if (Drupal.settings.debug){
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
		console.log(form,"FORM");
		console.log(form_state,"FORM");
	}

	try {
		
		form.elements['kanton'] = {
			title : 'Kanton',
			type : 'select',
			options : {
				0 : 'Aargau',
				1 : 'Appenzell Ausserrhoden',
				2 : 'Appenzell Innerrhoden',
				3 : 'Basel-Land',
				4 : 'Basel-Stadt',
				5 : 'Bern',
				6 : 'Fribourg/Freiburg',
				7 : 'Genève/Genf',
				8 : 'Glarus',
				9 : 'Graubünden/Grischuns/Grigioni',
				10 : 'Jura',
				11 : 'Luzern',
				12 : 'Neuchâtel/Neuenburg',
				13 : 'Nidwalden',
				14 : 'Obwalden',
				15 : 'St.Gallen',
				16 : 'Schaffhausen',
				17 : 'Schwyz',
				18 : 'Solothurn',
				19 : 'Thurgau',
				20 : 'Ticino/Tessin',
				21 : 'Uri',
				22 : 'Vaud/Waadt',
				13 : 'Valais/Wallis',
				24 : 'Zug',
				25 : 'Zürich',
			},
			default_value : variable_get('kanton')
		};
		// DARF KEINE VALUE HABEN??
		form.elements['message'] = {
			type : 'textarea',
			title : 'Es geht um folgenden Sachverhalt...',
			required : true,
			title_placeholder : true,

		};

		form.elements['messagel'] = {
			markup : '<p>Die Frage wird per Email an die Administratoren gesendet. Wir werden die Frage schnellstmöglich ins Rechtsforum stellen.</p>',
		};

		form.elements['button1'] = {
			type : 'submit',
			value : 'Senden',

		};
		

		return form;
	//return system_settings_form(form);

	} catch (error) { console.log('awri_post_form - ' + error);	}	
}

function awri_post_form_submit(form, form_state) {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');

	try {
		console.log(form_state);
		variable_set('kanton',  form_state.values.kanton);
		variable_set('message', form_state.values.message);
		var msg="Kanton:"+kantone[$('#edit-awri-post-form-kanton').val()]+"\r\n"+form_state.values.message;	
		_postMessage(variable_get('duid'),msg);
		 drupalgap_goto("dashboard");
	} catch (error) {
		console.log('awri_post_form_submit - ' + error);
	}
}

function awri_post_form_validate(form, form_state) {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');

	try {		
		if (variable_get('DRUPAL_UID')<1) {
		      drupalgap_alert('<h2>Sorry, geht nicht!</h2> Nur Personen die auf https://awri.ch registriert sind, können hier anonym Rechtsfragen stallen!');
		      drupalgap_goto('awri_dashboard');    
		}
		
		 if (form_state.values.message.length < 50)
		 drupalgap_form_set_error('message', 'Sorry, aber der Text ist zu kurz um ihn zu senden (min.50 Zeichen)!');
		 
		// else if (test.length < 13)
		// drupalgap_form_set_error('name', 'Hoppla, der Text ist immmer noch zu
		// kurz zum senden!');
		// else if (test.length < 23)
		// drupalgap_form_set_error('name', 'Fast da, nur noch ein paar Zeichen,
		// dann können wir senden.');

	} catch (error) {
		console.log('awri_post_form_validate - ' + error);
	}
}

function _postMessage(uid,message) {
	if (Drupal.settings.debug){
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
		console.log(uid,"UID");
		console.log(message,"MESSAGE");
	}
	var args = [ 
	             {'uid' : uid},
	             {'message' : message} 
	             ];
		
	Drupal.services.call({
		method : 'POST',
		path : 'poster_resources/post_anonymous.json',
		service : 'poster',
		resource : 'post_anonymous',
		data : JSON.stringify(args),
		success : function(result) {

			var data = result;
			var msg = 'Ihre Rechtsfrage mit der ID [' + data+ ']  wurde erfolgreich weitergeleitet !';
			drupalgap_alert(msg);
			dupalgap_goto("awri_dashboard");
		}
	});
	
}
