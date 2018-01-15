
function test_menu() {
  var items = {};
  items['test'] = {
      title: 'My page',
      page_callback: 'd7mobilemenu_page',
      pageshow: 'd7mobilemenu_pageshow',
      page_arguments: [1],
  //    options:{
  //        reloadPage:true
  //    },
    };
  return items;
}



function test_field_info_instance(options,entity_type,bundle_name) {
//	var arg={'entity_type':entity_type,'bundle_name':bundle_name};  
	var param='entity_type='+entity_type+'&bundle_name='+bundle_name;
	
	var my_args = {
			  'entity_type' : entity_type,
			  'bundle_name' : bundle_name,
			};
//	alert(entity_type);
	try {
		options.contentType = 'application/json';
	    options.method = 'POST';
	    options.path = 'drupalgap_field/field_info_instances.json';
	    options.service = 'd7menu';
	    options.resource = 'field_info_instance';
	    options.data = JSON.stringify(my_args);
	    Drupal.services.call(options);
	  }
	  catch (error) {
	    console.log('test_field_info_instance - ' + error);
	  }
	}

function _getFieldInfoInstance(entity_type,bundle_name){
	alert(entity_type);
	test_field_info_instance({
	    success: function(result) {
	    console.log(result);	    	
	    }
	},entity_type,bundle_name);	
}