// Create global variables to hold coordinates and the map.
var _my_module_user_latitude = null;
var _my_module_user_longitude = null;
var _my_module_map = null;

/**
 * Implements hook_menu().
 */
function my_module_menu() {
  try {
    var items = {};
    items['map'] = {
      title: 'Map',
      page_callback: 'my_module_map',
      pageshow: 'my_module_map_pageshow'
    };
    return items;
  }
  catch (error) { console.log('my_module_menu - ' + error); }
}

/**
 * The map page callback.
 */
function my_module_map() {
  try {
    var content = {};
    var map_attributes = {
      id: 'my_module_map',
      style: 'width: 100%; height: 320px;'
    };
    content['map'] = {
      markup: '<div ' + drupalgap_attributes(map_attributes) + '></div>'
    };
    return content;
  }
  catch (error) { console.log('my_module_map - ' + error); }
}

/**
 * The map pageshow callback.
 */
function my_module_map_pageshow() {
  try {
    navigator.geolocation.getCurrentPosition(
      
      // Success.
      function(position) {

        // Set aside the user's position.
        _my_module_user_latitude = position.coords.latitude;
        _my_module_user_longitude = position.coords.longitude;
        
        // Build the lat lng object from the user's position.
        var myLatlng = new google.maps.LatLng(
          _my_module_user_latitude,
          _my_module_user_longitude
        );
        
        // Set the map's options.
        var mapOptions = {
          center: myLatlng,
          zoom: 11,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
          },
          zoomControl: true,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
          }
        };
        
        // Initialize the map, and set a timeout to resize properly.
        _my_module_map = new google.maps.Map(
          document.getElementById("my_module_map"),
          mapOptions
        );
        setTimeout(function() {
            google.maps.event.trigger(_my_module_map, 'resize');
            _my_module_map.setCenter(myLatlng);
        }, 500);
        
        // Add a marker for the user's current position.
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: _my_module_map,
            icon: '//maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });
        
      },
      
      // Error
      function(error) {
        
        // Provide debug information to developer and user.
        console.log(error);
        drupalgap_alert(error.message);
        
        // Process error code.
        switch (error.code) {

          // PERMISSION_DENIED
          case 1:
            break;

          // POSITION_UNAVAILABLE
          case 2:
            break;

          // TIMEOUT
          case 3:
            break;

        }

      },
      
      // Options
      { enableHighAccuracy: true }
      
    );
  }
  catch (error) {
    console.log('my_module_map_pageshow - ' + error);
  }
}


/**
 * Implements hook_entity_post_render_content().
 */
function my_module_entity_post_render_content(entity, entity_type, bundle) {
  try {
    if (entity_type == 'node') {
      var flags = flag_get_entity_flags(entity_type, bundle);
      if (flags) {
        var entity_id = entity[entity_primary_key(entity_type)];
        var html = '';
        var page_id = drupalgap_get_page_id();
        $.each(flags, function(fid, flag) {
            var container_id = my_module_flag_count_container_id(flag.name, entity_id);
            html += '<div id="' + container_id + '"></div>' +
              drupalgap_jqm_page_event_script_code(
                {
                  page_id: page_id,
                  jqm_page_event: 'pageshow',
                  jqm_page_event_callback: '_my_module_flag_count_pageshow',
                  jqm_page_event_args: JSON.stringify({
                      fid: fid,
                      entity_id: entity_id,
                      entity_type: entity_type,
                      bundle: bundle
                  })
                },
                flag.fid
              );
        });
        entity.content = html + entity.content;
      }
    }
  }
  catch (error) {
    console.log('flag_entity_post_render_content - ' + error);
  }
}

/**
 *
 */
function my_module_flag_count_container_id(flag_name, entity_id) {
  try {
    return 'flag_count_' + flag_name + '_' + entity_id;
  }
  catch (error) { console.log('my_module_flag_count_container_id - ' + error); }
}

/**
 *
 */
function _my_module_flag_count_pageshow(options) {
  try {
    var flag = flag_load(options.fid);
    if (!flag) { return; }
    flag_countall(flag.name, options.entity_id, {
        success: function(result) {
          try {
            // Check options.entity_type and/or options.bundle here to customize
            // the message per content type.
            var container_id = my_module_flag_count_container_id(flag.name, options.entity_id);
            var html = '<p>Flagged ' + result.count + ' ' + drupalgap_format_plural(result.count, 'time', 'times') + '!</p>';
            $('#' + container_id).html(html).trigger('create');
          }
          catch (error) { console.log('_my_module_flag_count_pageshow - success - ' + error); }
        }
    });
  }
  catch (error) { console.log('my_module_flag_count_pageshow - ' + error); }
}

/**
 * Implements hook_services_postprocess().
 */
function my_module_services_postprocess(options, result) {
  try {
    if (options.service == 'flag' && options.resource == 'flag') {
      // An entity just got flagged, grab its new count and render it.
      var data = JSON.parse(options.data);
      flag_countall(data.flag_name, data.entity_id, {
          success: function(result) {
            try {
              // Check options.entity_type and/or options.bundle here to customize
              // the message per content type.
              var container_id = my_module_flag_count_container_id(data.flag_name, data.entity_id);
              var html = '<p>Flagged ' + result.count + ' ' + drupalgap_format_plural(result.count, 'time', 'times') + '!</p>';
              $('#' + container_id).html(html).trigger('create');
            }
            catch (error) { console.log('my_module_services_postprocess - success - ' + error); }
          },
          error: function(xhr, status, message) {
            try {
              // If there is no flag data with the node, then clear out the count html.
              if (message.indexOf('There is no flag with node') != -1) {
                var container_id = my_module_flag_count_container_id(data.flag_name, data.entity_id);
                $('#' + container_id).html('').trigger('create');
              }
            }
            catch (error) { console.log('_my_module_flag_count_pageshow - error - ' + error); }
          }
      });
    }
  }
  catch (error) { console.log('my_module_services_postprocess - ' + error); }
}
