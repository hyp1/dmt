#!/bin/bash
echo "MAKING WEB-APP READY..."
echo "adding cordova.js to index.html..." 
sed -i '/<!-- Load PhoneGap (Cordova) --><script type="text\/javascript" src="cordova.js"><\/script>/c\\ <!-- Load PhoneGap (Cordova) <script type="text\/javascript" src="cordova.js"><\/script>-->' /media/robert/htdocs/awrimobile/www/index.html &&
echo "set drupalgap.settings.mode to 'phonegap' in app/settings.js..." 
sed -i "/drupalgap.settings.mode = 'phonegap';/c\\ drupalgap.settings.mode = 'web-app';"  /media/robert/htdocs/awrimobile/www/app/settings.js
echo "set Drupal.settings.site_path to 'http://kimo2007.dnshome.de/rhfappd7' in app/settings.js..." 
sed -i "/Drupal.settings.site_path = 'https:\/\/awri.ch';/c\\ Drupal.settings.site_path = 'http:\/\/kimo2007.dnshome.de\/rhfappd7';"  /media/robert/htdocs/awrimobile/www/app/settings.js
echo "... DONE!"
cordova prepare
