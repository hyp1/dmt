function dmt_debug_menu() {
	var items = {};
	items['dmt_debug'] = {
		title : 'DMT Service Debugger',
		page_callback : '_debug_page',
	};
	return items;
}

function _debug_page() {
	try {
		var content = {};
		
		content['service_label'] = {
				  theme: 'form_element_label',
				  element: {
				    title: 'Path',
				    attributes: {
				      'for': 'service'
				    }
				  }
		};
		
		content['service'] = {
			theme : 'textfield',
			attributes : {
				value : 'dmt_debug/field_info_instances',
				id : "service"
			// onclick: "_getFieldInfoInstance('comment','article');"
			}
		};
		
		content['args_label'] = {
				  theme: 'form_element_label',
				  element: {
				    title: 'Arguments',
				    attributes: {
				      'for': 'args'
				    }
				  }
		};
				
		content['args'] = {
			theme : 'textfield',
			attributes : {
				id : "args",
				value : "entity_type=node&bundle_name=page",
			}
		};
		
		content['execute'] = {
			theme : 'button',
			text : 'Execute',
			attributes : {
				onclick : "_execute();"
			}
		};

		content['result'] = {
			markup : '<div id="result">no results yet!</div>',
		};

		return content;
	} catch (error) {
		console.log('_debug_page - ' + error);
	}
}

function _execute() {
	Drupal.services.call({
		contentType : 'application/x-www-form-urlencoded',
		method : 'POST',
		path : $("#service").val(),
		data : $("#args").val(),
		success : function(result) {
			console.log(result);
			$("#result").html(
					'<div style="max-width:400px;" data-role="ui-content"><small>'
							+ JSON.stringify(result) + '<small></div>');
		}
	});

}
