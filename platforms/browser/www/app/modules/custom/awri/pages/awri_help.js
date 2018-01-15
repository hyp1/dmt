function awri_help_menu() {

}

function awri_help_page() {
	try {
		var content = {};
				
		content['rechtsfragen'] = {
				  theme: 'item_list',
				  title: 'Rechtsfragen',
				  items: [
				          '<p>Über 2500 beantwortete Rechtsfragen</p>', 
				          '<p>Nach links oder Rechts blättern durch wischen auf dem Touchscreen oder mit der Maus</p>', 
				          ]
				};
		
		content['suche'] = {
				  theme: 'item_list',
				  title: 'Rechtsfrage suchen',
				  items: [
				          '<p>Zeigt automatisch die letzten 5 Einträge auf https://awri.ch an</p>', 
				          '<p>Suche mit verknüpften Wörtern. zB: zeigt eine Suche nach "Auto Parkplatz" nur die Einträge an, in denen diese beiden Wörter vorkommen</p></p>', 
				          ]
				};
		
		content['stellen'] = {
				  theme: 'item_list',
				  title: 'Rechtsfrage stellen',
				  items: [
				          '<p>ACHTUNG! Diese funktion steht nur Benutzern zur Verfügung, die auf https://awri.ch angemeldet sind</p>',
				          '<p>Die Frage wird anonym gepostet, die Admins bekommen eine Email und schalten die anonyme Frage frei</p>', 
				          '<p>Hängt den Kanton des Fragesellers an die Frage</p>', 
				          ]
				};
		
		
		content['zufall'] = {
				  theme: 'item_list',
				  title: 'Zufallsgenarator',
				  items: [
				          '<p>Zeigt zufällig eine der über 2500 Rechsfragen an</p>', 
				          ]

		};
		
		content['einstellungen'] = {
				  theme: 'item_list',
				  title: 'Einstellungen',
				  items: [
				          '<p><strong>Startseite</strong> Legt fest mit welcher Seite die App starten soll</p>', 				  						          
				          '<p><strong>Benachrichtigungen</strong> Schaltet Benachrichtigungen ein/aus</p>', 
				          '<p><strong>Audio</strong> Schaltet Ton-Benachrichtigungen ein/aus</p>', 
				          '<p><strong>Vibration</strong> Schaltet Vibration ein/aus (Nur in Android App)</p>', 
				          '<p><strong>Neu laden</strong> Lädt die App erneut(refresh/restart)</p>',
				          '<p><strong>Neu laden</strong> Löscht die Daten der App (Einstellungen und Cookies) und setzt die zurück in die Standardeinstellungen</p>',				          

				          ]
		};


		var image = {
				  path:awri.qrcode,
				  alt:'Android App QR Code',
				  title:'Android App QR Code',
						width:"50",
						height:"50",
				};
		content['download'] = {
				  theme: 'item_list',
				  title: 'Download',
				  items: [
				          '<p>Laden Sie sich die Android App für schnelleren Zgriff herunter !<br/> Download '+l('awri.apk',awri.apk,{ InAppBrowser:true })+' Android App oder verwenden Sie folgenden QR Code:<br/></p>',
				          "<p><span  class='awri_red'>Hinweis!</span> Da diese App noch nicht im App Store erhältlich ist, müssen Sie in den Sicherheitseinstellungen Apps von 'Unbekannten Quellen' zulassen.<p>", 
				          ""+theme('image',image,{"attributes":{}})+"</br/>",
				          ]

		};
		

		
		/*
		content['download'] = {
				markup : '<p>Laden Sie sich die Android App für schnelleren Zgriff herunter !<br/> Download '+l('awri.apk',awri.apk,{ InAppBrowser:true })+' Android App oder verwenden Sie folgenden QR Code:<br/>'+theme('image',image,{"attributes":{
			
				}})+'<br/></p>',
				
		};
		*/
		/*
		content['dump'] = {
			theme : 'button',
			text : 'Debug',
			attributes : {
				onclick : "drupalgap_goto('dump');",

			}
		};
*/		
		
		return content;
	} catch (error) {
		console.log('awri_help_page - ' + error);
	}
}