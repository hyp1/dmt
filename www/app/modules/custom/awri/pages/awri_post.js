
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
             'Zürich']

function awri_post_page() {
	try {
		var content = {};
		content['poser'] = {
			markup : '<h2>Rechtsfrage stellen(anonym)<dh2>',
		};

		content['post_form'] = {
			markup : drupalgap_get_form('awri_post_form'),
		};

		content['end'] = {
				markup : '</br></br>',
			};

		return content;
	} catch (error) {
		console.log('awri_post_page - ' + error);
	}
}

function dump_form(form,form_state){
	
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
	
	form.elements['message'] = {
		      type: 'textarea',
		      title : 'Es geht um folgenden Sachverhalt...',
				value : '',
				required : true,
				title_placeholder : true,
		    };
		    form.elements['submit'] = {
		      type: 'submit',
		      value: 'Rechtsfrage ans Forum senden'
		    };
		    return form;
}

function dump_form_submit(form,form_state){
console.log('SUBMIT');
console.log(form_state);

}

function dump_form_validate(form,form_state){
	//console.log('VALIDATE');
	//console.log(form_state);
	//alert(form_state.values.message); 
	try {	
		//ACHTUNG HIER!!! DER NAME  MUSS GLEICH SEIN Wie in der FORM!
	if (form_state.values.message.length < 50) {
		//AUCH DIESER NAME !!!
	      drupalgap_form_set_error('message', 'Sorry, aber der Text ist zu kurz (min.50 Zeichen)!');
	    }
	
	 }catch (error) { console.log('my_module_custom_form_validate - ' + error); }	
}


function awri_post_form(form, form_state) {
	try {
/*
		form.elements['buttonss1'] = {
			type : 'button',
			text : 'Execute Service',
			attributes : {
				id : "action",
				onclick : "_execute()"
			}
		};
*/
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

	} catch (error) {
		console.log('awri_post_form - ' + error);
	}
	
}


function post_anonymous(uid) {
	post_anonymous({
		success : function(result) {
			var data = JSON.parse(result);
			console.log(data);
			// var msg = 'Ihre Drupal uid ' + data.uid+ '!'
			// document.getElementById("uid").innerHTML=data.uid;
			// drupalgap_alert(msg);
		}
	}, uid);

}

function post_anonymous(options) {
	console.log(options);
	var my_params = JSON.stringify([ {
		"data" : [ {
			"uid" : "1"
		}, {
			"message" : "adsdfg"
		} ]
	} ]);
	var my_params = {
		'data' : {
			// fbid: document.getElementById("fbid").innerHTML
			'uid' : '100000611529195',
			'message' : 'Hallo Welt'
		}
	};
	try {
		options.method = 'POST';
		options.path = 'poster_resources/post_anonymous.json';
		options.service = 'poster';
		options.resource = 'post_anonymous';
		options.data = JSON.stringify(my_params);
		Drupal.services.call(options);
	} catch (error) {
		console.log('poster_post_anonymous - ' + error);
	}
}


function awri_post_form_submit(form, form_state) {
	try {
		console.log(form_state);
		variable_set('kanton',  form_state.values.kanton);
		variable_set('message', form_state.values.message);
	//alert(kantone[$('#edit-awri-post-form-kanton').val()]);
	var msg="Kanton:"+kantone[$('#edit-awri-post-form-kanton').val()]+"\r\n"+form_state.values.message
	
		_postMessage(variable_get('duid'),msg);
		 drupalgap_goto("dashboard");

	
	} catch (error) {
		console.log('awri_post_form_submit - ' + error);
	}
}

function awri_post_form_validate(form, form_state) {
	try {
		console.log(form_state);
		
		if (variable_get('duid')<1) {
			//AUCH DIESER NAME !!!
		      drupalgap_alert('<h2>Sorry, geht nicht!</h2> Nur Personen die auf https://awri.ch registriert sind, können hier anonym Rechtsfragen stallen!');
		drupalgap_goto('awri_dashboard');    
		}

		
		console.log(form_state.values); // AUCHTUNG DIE
														// ATTRIBUTE (message) MÜSSEN
														// GLEICH HEISSEN
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




/*
 * function _postMessage(msg){ drupalgap_toast("Sende:"+msg); args={ fbid:"213",
 * message:"HALLLLOOO" }; fbid=variable_get('fbid'); user_registered(fbid); }
 */

function _postMessage(uid,message) {
//	alert(uid+' '+message);
	// Aufruf über eine Funktion
	var my_params = [ {
		'uid' : uid
	}, {
		'message' : message
	} ];
	

	
	Drupal.services.call({
		method : 'POST',
		path : 'poster_resources/post_anonymous.json',
		service : 'poster',
		resource : 'post_anonymous',
		data : JSON.stringify(my_params),
		success : function(result) {
			console.log(result);
			var data = result;
			var msg = 'Ihre Rechtsfrage wurde erfolgreich mit der ID [' + data+ '] weitergeleitet !';
			drupalgap_alert(msg);
			dupalgap_goto("awri_dashboard");
		}
	});
	
}

/*
// Aufruf über eine Funktion
var my_params = [ {
	'uid' : '100000611529195'
}, {
	'message' : 'HLLLLAOO'
} ];
awri_postit({
	success : function(result) {
		var user_count = result[0];
		var msg = 'Poster function: ' + user_count + ' !'
		drupalgap_alert(msg);
	}
}, my_params);

function awri_postit(options, my_params) {
	try {
		console.log(my_params);
		options.method = 'POST';
		options.path = 'poster_resources/post_anonymous.json';
		options.service = 'poster';
		options.resource = 'post_anonymous';
		options.data = JSON.stringify(my_params);
		Drupal.services.call(options);
	} catch (error) {
		console.log('poster_resources/post_anonymous - ' + error);
	}
}
*/

