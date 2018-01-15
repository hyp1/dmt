Drupal Mobile Tools Phonegap/Cordova


DMT Herunterladen nach /www kopieren

cordova prepare 
cordova run

Handy an UND hängen und in Eclipse oder Cordova ausführen!


Project -> Build automaticly aus!

New -> Add Android Project
/platforms/android/CordovaLib
isLibrary

Add Android Project
d7mobileawri/platforms/android
PrBuild Path:
Project References -> CordovaLib
Add Library -> CordovaLib
Add Jar ->  /plugins/cordova-android-support-v4/android-support-v4.jar
Order and Export -> /plugins/cordova-android-support-v4/android-support-v4.jar


Project ->  clean


ECLIPSE Probleme MainActivity.xml $ nach cordova prepare

  <provider android:authorities="ch.awri.mobile.provider" android:exported="false" android:grantUriPermissions="true" android:name="android.support.v4.content.FileProvider">
            <meta-data android:name="android.support.FILE_PROVIDER_PATHS" android:resource="@xml/provider_paths" />
        </provider>


Project ->  clean

Project ->  build


Test GeoCoding

Android Emulator -> Location send

