/***********************************************|
 * Drupalgap Debug Module						|
 ***********************************************/
//Prints out all Hooks and Values

/*
 * entity_primary_key - unsupported entity type (uc_addresses) - to add support, declare uc_addresses_primary_key() and have it return the primary key column name as a string
 */
/*
function uc_addresses_primary_key() {
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'debug.js');
	//alert('views_uc_addresses_primary_key');
	return "aid";

}
*/

/*
 *  Field formatters for different custom field types
 */
/*
function pdf_field_formatter_view(entity_type, entity, field, instance,
		langcode, items, display) {
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'debug.js');
	console.log(entity_type);
	console.log(entity);
	console.log(field);
	console.log(instance);
	console.log(langcode);
	console.log(items);
	console.log(display);
	console
			.log("-------------------------------------------------------------");
}
*/

function debug_install(){
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),
	'debug.js');
	console
	.log("DEBUG MODULE INSTALLED");
	console
	.log("-------------------------------------------------------------");

}

//Debug File Field Formatter View
function file_field_formatter_view(entity_type, entity, field, instance,
		langcode, items, display) {
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'debug.js');
	console.log(entity_type);
	console.log(entity);
	console.log(field);
	console.log(instance);
	console.log(langcode);
	console.log(items);
	console.log(display);
	console
			.log("-------------------------------------------------------------");
}

//Debug the File Widget Form
function file_field_widget_form(form, form_state, field, instance, langcode,
		items, delta, element) {
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),
	'debug.js');
	console.log(form,'form');
	console.log(form_state,'form_state');
	console.log(field,'field');
	console.log(instance,'instance');
	console.log(langcode,'langcode');
	console.log(items,'items');
	console.log(delta,'delta');
	console.log(element,element);
	console
			.log("-------------------------------------------------------------");
}

function debug_assemble_form_state_into_field(entity_type, bundle,
		form_state_value, field, instance, langcode, delta, field_key, form) {
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'debug.js');
	console.log(entity_type,'entity_type');
	console.log(bundle,'bundle');
	console.log(form_state_value,'form_state_value');
	console.log(field,'field');
	console.log(instance,'instance');
	console.log(langcode,'langcode');
	console.log(delta,'delta');
	console.log(field_key,'field_key');
	console.log(form,'form');
	console
			.log("-------------------------------------------------------------");
}

function debug_form_alter(form, form_state) {
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'debug.js');
	console.log(form,"form");
	console.log(form,"form_State");
	console
			.log("-------------------------------------------------------------");
}

function debug_form_submit(form, form_state) {
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'debug.js');
	console.log(form,"form");
	console.log(form,"form_State");
	console
			.log("-------------------------------------------------------------");
}

function debug_node_page_view_alter_article(node, options) {
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'debug.js');
	console.log(node,'node');
	console.log(options,'options');
	console
			.log("-------------------------------------------------------------");
}

function debug_entity_view_alter(entity_type, entity_id, mode, build) {
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'debug.js');
	console.log(entity_type,'entity_type');
	console.log(entity_id,'entity_id');
	console.log(mode,'mode');
	console.log(build,'build');
	console
			.log("-------------------------------------------------------------");
}

function debug_block_info() {
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'debug.js');
	console
			.log("-------------------------------------------------------------");
}

function debug_block_view(delta,region) {
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'debug.js');
	console.log(delta,'delta');
	console.log(delta,'region');
	console
			.log("-------------------------------------------------------------");
}

function debug_page_build(page){
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'debug.js');
	console.log(page,'page');
	console
			.log("-------------------------------------------------------------");
}

function debug_services_postprocess(options, result){
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'debug.js');
	console.log(options,'options');
	console.log(result,'result');
	console
			.log("-------------------------------------------------------------");
}


// Alter the result data of a service call, after its success function.
function debug_services_request_postprocess_alter(options, result) {
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'debug.js');
	console.log(options,'options');
	console.log(result,'result');
	console
			.log("-------------------------------------------------------------");
}

function debug_services_request_pre_postprocess_alter(options, result) {
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'debug.js');
	console.log(options,'options');
	console.log(result,'result');
	console
			.log("-------------------------------------------------------------");
}

function debug_deviceready() {
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'debug.js');
	console.log(drupalgap.menu_links,"MENU_LINKS");	
	console.log(drupalgap.blocks,"BLOCKS");	
	console.log("No device, retruning true to continue Drupalgap !"
			+ drupalgap.online);	
	console
			.log("-------------------------------------------------------------");
	return true;
}

function debug_device_offline() {
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'debug.js');
	console.log("Device offline, retruning true to continue Drupalgap !"
			+ drupalgap.online);
	console
			.log("-------------------------------------------------------------");
	return true;
}

function debug_device_connection() {
	console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'debug.js');
	console.log("No connection, retruning true to continue Drupalgap !"
			+ drupalgap.online);
	console
			.log("-------------------------------------------------------------");
	return true;
}
