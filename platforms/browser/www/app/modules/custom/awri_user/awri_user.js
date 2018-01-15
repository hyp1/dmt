

function awri_user_menu(){
	if (Drupal.settings.debug)console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	var items={};
items['user_form'] = {
	      title: t('user Form'),
	      page_callback: 'drupalgap_get_form',
	      page_arguments: ['user_form'],
	      attributes:{
	    	  id:"user_form"
	      }
	    };
	return items;
}

function awri_user_block_info() {
if (Drupal.settings.debug)console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');

	  var blocks = {};
	 
	  blocks['user_block'] = {
	    delta: 'user_block',
	    module: 'awri_user'
	  };
	  
	  blocks['static_block'] = {
			    delta: 'static_block',
		    module: 'awri_user'
			  };
	  return blocks;
	}

/**
 * Implements hook_block_view().
 */
function awri_user_block_view(delta, region) {
	if (Drupal.settings.debug){
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
		console.log(delta,'DELTA');
		console.log(region,'REGION');
	}

  var content={};
  if (delta == 'user_block') {
    content['date'] = {
      markup: '<div id="user_block">USERBLOCK'+drupalgap_get_form('user_form')+'</div>',
  };

  };   
  if (delta == 'static_block') {
	    var script= drupalgap_jqm_page_event_script_code({
	          page_id: 'static_block-'+drupalgap_get_page_id()+'-'+region.name,
	          jqm_page_event: 'pageshow',
	          jqm_page_event_callback: 'static_block_callback',
	          jqm_page_event_args: JSON.stringify({
	              menu_name: 'static_block',
	              container_id: 'static_block-'+drupalgap_get_page_id()+'-'+region.name,
	              'arg': 'myarg'
	          })
	      }, 'static_block-'+drupalgap_get_page_id()+'-'+region.name);
	    content['date'] = {
	      markup: script+'<div id="static_block-'+drupalgap_get_page_id()+'-'+region.name+'" style="width:100px;height:40px;"></div>',
	  };	
	  };   
	    return drupalgap_render(content);
}

function static_block_callback(args){
if (Drupal.settings.debug)console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	var html='<span id="name-'+drupalgap_get_page_id()+'"></span><img id="img" src="'+variable_get('aw_img')+'" width="32" height="32"></img>'+AWRI.user.name;
	$('#'+args.container_id).html(html);
//	console.log(args);	
}

function theme_user(user){
	if (Drupal.settings.debug)console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	var html='USER BLOCK<a data-role="button" href="#" data-shadow="false" data-theme="none"><img src="'+AWRI.logo+'" border="0"/></a>'+AWRI.user.name;
	return html;
}

function user_form(form,form_state){
	if (Drupal.settings.debug){
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
		console.log(form,'DEBUG');
		console.log(form_state,'DEBUG');
	}

	 try {
//		 form.options.attributes['class'] += 'bar ';
		form.id="user_form-"+drupalgap_get_page_id(),
	
		    form.elements['uid'] = {
				      type: 'textfield',
				      title: t('ID'),
				      default_value: variable_get('aw_uid'),
				    	  attributes:{
				    		id:'uid',  
				    		 onchange:"_setUser();",
				      }
				    };

		 form.elements['name'] = {
		      type: 'textfield',
		      title: t('Name'),
		      default_value: variable_get('aw_name'),
		      attributes:{
		    		id:'name-'+drupalgap_get_page_id(),  
		      }
		    };
		 
		 form.elements['picture'] = {
			      type: 'textfield',
			      title: t('Picture'),
			      default_value: variable_get('aw_picture'),
			      attributes:{
			    		id:'picture'+drupalgap_get_page_id(),  
			      }
		    };		 
		 form.elements['img'] = {
			      'markup':'<img id="img-'+drupalgap_get_page_id()+'" src="'+variable_get('aw_img')+'" class="ui-btn" data-role="none">image</img>'
		 };
return form;
	 }
catch (error) { console.log('user_form - ' + error); }
}

function _setUser(){
if (Drupal.settings.debug){
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	console.log(AWRI.user,"USER");
}
alert(AWRI.user);
if(!AWRI.user)return;
alert("KEIN RETURN!");
var picpath=AWRI.site_path+'/'+AWRI.endpoint+'/file/'+AWRI.user.picture;
var jqxhr = $.getJSON(picpath, function(data) {	
	console.log( "success" );
    console.log(data);
	  variable_set('aw_uid',AWRI.user.uid);
	  variable_set('aw_name',AWRI.user.name);
	  variable_set('aw_picture',data.uri);
	  variable_set('aw_img',data.uri_full);
	  
	//$('#uid-'+drupalgap_get_page_id()).html(AWRI.user.uid);
	$('#img-'+drupalgap_get_page_id()).attr('src',data.uri_full);
	//$('#name-'+drupalgap_get_page_id()).html(AWRI.user.name);
	$('#user_form-'+drupalgap_get_page_id()+"#name").val(AWRI.user.name);


	})
	.fail(function() {
	    console.log( "error" );
	  })
	  .always(function() {
	    console.log( "complete" );
	  });
	 
	// Perform other work here ...
	 /*
//Set another completion function for the request above
jqxhr.complete(function() {
  console.log( "second complete" );
});
	*/
}
