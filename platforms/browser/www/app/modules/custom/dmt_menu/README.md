
D7Mobile Menu
====
Dynamicly set a Menu in Drupalgap
Enable D7Mobile on you Drupal Site
admin/structure/menu
and add links to content to the Menu
The links are mapped to drupalgap system forms
and views

## settings.js


//Menu Icon setzen

drupalgap.settings.d7mobilemenu = {
		icon:'star'
};

//Block zur startpage hinzufügen

d7mobilemenu: {
  pages: {
        value: ['dashboard'],
        mode: 'include'
     }
 },
 
//CSS Layout in 
## d7mobilemenu.css

