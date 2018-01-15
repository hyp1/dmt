#!/bin/bash
echo "MAKING MOBILE READY..." 
echo "remove cordova.js from index.html..." 
sed -i '/<!-- Load PhoneGap (Cordova) <script type="text\/javascript" src="cordova.js"><\/script>-->/c\\ <!-- Load PhoneGap (Cordova) --><script type="text\/javascript" src="cordova.js"><\/script>' /media/robert/htdocs/awrimobile/www/index.html &&
echo "set drupalgap.settings.mode to 'web-app' in app/settings.js..." 
sed -i "/drupalgap.settings.mode = 'web-app';/c\\ drupalgap.settings.mode = 'phonegap';"  /media/robert/htdocs/awrimobile/www/app/settings.js
echo "set Drupal.settings.site_path to 'https://awri.ch' in app/settings.js..." 
sed -i "/Drupal.settings.site_path = 'http:\/\/kimo2007.dnshome.de\/rhfappd7';/c\\ Drupal.settings.site_path = 'https:\/\/awri.ch';"  /media/robert/htdocs/awrimobile/www/app/settings.js
echo "... DONE!"
cordova prepare
