function dump_page() {
	try {
		var content={};
		
		content['svg2']={
				markup:"<button data-icon'awri32' class='ui-link ui-btn ui-icon-awri32 ui-btn-icon-left ui-shadow ui-corner-all' >SVG white</button>",
		};
		
		content['stats_block']={
				markup:module_invoke(
				         'awri',
				          'block_view',
				          'awri_stats',
				          'footer'
				        ),
		};
		//return content;
		/*
		content['myform'] = {
				markup:"<h2>Dump Form</h2>"+drupalgap_get_form('dump_form'),
		};
		
		content['my_textarea'] = {
				  theme: 'textarea',
				  value:'Hello'
				};
		*/
		content['svg']={
				markup:'<a href="#" class="ui-btn ui-icon-paragraph ui-btn-icon-left ui-btn-inline ui-mini ui-btn-b" data-theme="b">Home</a>',
		};
		
		
		content['svg3']={
				markup:"<button data-icon='link' class='ui-link ui-btn ui-icon-link ui-btn-icon-left ui-shadow ui-corner-all' >SVG white</button>",
		};


		
		content['my_button1'] = {
				  theme: 'button',
				  text: 'FB LOGIN',
				  attributes: {
					  'data-icon':'question',				
				    onclick: "facebooklogin();"
				  }
				};
		
		content['my_button3'] = {
				  theme: 'button',
				  text: 'FB LOGIN',
				  attributes: {
					  'data-theme':'b',	
					  'data-icon':'answer',				
				    onclick: "facebooklogin();"
				  }
				};
		
		content['my_button4'] = {
				  theme: 'button',
				  text: 'FB Paragraph',
				  attributes: {
					  'data-icon':'paragraph',				
				    onclick: "facebooklogin();"
				  }
				};
		
		content['my_button9'] = {
				  theme: 'button',
				  text: 'Notify Büchi',
				  attributes: {
					  'data-icon':'star',				
				    onclick: "FBNotification();"
				  }
				};
		
		content['my_button0'] = {
				  theme: 'button',
				  text: 'GROUP FEED',
				  attributes: {
					  'data-icon':'star',				
				    onclick: "openFBTest();"
				  }
				};
		
		content['br'] = {
				markup:"<br/></br>",
		};
		
		return content;
	  }
	  catch (error) { console.log('dump_page - ' + error); }	
	}


function dump_form(form,form_state){
	form.elements['YOURNAME'] = {
		      type: 'textfield',
		      title: 'Your name',
		      required: true,
		      attributes:{
		    	  value:'1',
		    		  id:'NR'
		      }
		    };
	
	form.elements['doit'] = {
		      type: 'button',
		      text: 'Run',
		      attributes:{
		    	  onclick:'run();'
		      }
		    };
  return form;
	
	return system_settings_form(form);
	/*   Oder Eigener Submit Button
	form.elements['submit'] = {
		      type: 'submit',
		      value: 'Say Hello'
		    };
    return form;
	*/		    
}

function removeit(){
	localStorage.RemoveBookmark($('#NR').val());
};

function dump_form_submit(form,form_state){
console.log('SUBMIT');
console.log(form_state);
}

function dump_form_validate(form,form_state){
	try {	
	if (form_state.values.YOURNAME.length < 1) {
	      drupalgap_form_set_error('YOURNAME', 'Sorry, aber der Text ist zu kurz (min.3 Zeichen)!');
	    }
	 }catch (error) { console.log('dump_form_validate - ' + error); }	

	}

function openFBTest(){

	 openFB.api({
         path: '/353664054816742/feed',
         success: function(data) {
             console.log(JSON.stringify(data));
          //   document.getElementById("userName").innerHTML = data.name;
         },
         error: errorHandler});
}

//Büchi 106084916662721

function FBNotification(){

	 openFB.api({
        path: '/353664054816742/feed',
        method: 'POST',
        path: '/106084916662721/notifications',
        params: {
            message: 'Testing the Facebook Graph API',
            template:'You have people waiting to play with you, play now!'
        },
        success: function(data) {
            console.log(JSON.stringify(data));
         //   document.getElementById("userName").innerHTML = data.name;
        },
        error: errorHandler});
}


function errorHandler(error) {
    alert(error.message);
}

