function counter_form(form, form_state, args) {
	try {
		

		form.access = false;
		form.prefix = '<div style="display: none;">';
		form.suffix = '</div>';

		form.elements['page'] = {
			type : 'textfield',
			title : 'Page',
			default_value : 1,
			required : false,
			attributes : {
				id : 'page'
			}
		};

		form.elements['pages'] = {
			type : 'textfield',
			title : 'Pages',
			default_value : 1,
			required : false,
			attributes : {
				id : 'pages'
			}
		};

		form.elements['button1d'] = {
			type : 'button',
			text : 'Show Value',
			attributes : {
				onclick : "_showValue();"
			}
		};

		return form;
	} catch (error) {
		console.log('test_page - ' + error);
	}
}




