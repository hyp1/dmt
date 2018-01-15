function awri_bookmarks_install(){
  if(Drupal.settings.debug)console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {		  
		  if(!variable_get('bookmarks'))variable_set('bookmarks',[]);
	  }
	  catch (error) { console.log('bookmarks_install - ' + error); }
	}

function awri_bookmarks_menu(){
	  if(Drupal.settings.debug)console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
var items=[];
	items['bookmarks'] = {
			title : 'Lesezeichen',
			page_callback : 'awri_bookmarks_page',
			pageshow : 'awri_bookmarks_pageshow',
			options:{
		        reloadPage:true
		      }
		};

	items['bookmark/%'] = {
	        'title': t('Lesezeichen ansehen'),
	        'page_callback': 'awri_bookmark_page_view',
	        'page_arguments': [1],
	        'pageshow': 'awri_bookmark_page_view_pageshow',
	        'title_callback': 'awri_bookmark_page_title',
	        'title_arguments': [1]
	      };


return items;
};

function awri_bookmarks_page() {
	try {
		var content = {};
		/*
		content['txt'] = {
				 theme: 'textfield',
				  attributes: {
					  id:'book',
				    value: '11859',
				  }
				};
		
		content['btn'] = {
				  theme: 'button',
				  text: 'nid',
				  attributes:{					
					  onclick:'setBookmark();',
				  }
		};
		*/
		content['bookmarks'] = {
				  theme: 'jqm_item_list',
				  title: 'Lesezeichen',
				  items: [
				          '<p>Durch über 2500 Rechtsfragen</p>', 
				          '<p>Nach links oder Rechts blättern durch wischen oder mit der Maus</p>', 
				          ],
				          attributes:{
				        	  id:'mybookmarks',
				          }
				};
	
		content['break1'] = {
				  markup: '<br/>',
				  };
		
		content['btn'] = {
				  theme: 'button',
				  text: 'Alle Lesezeichen löschen',
				  attributes:{
					  'data-icon':'trash',
					  onclick:'deleteAllBookmarks();',
				  }
		};
				
		
		content['break2'] = {
				  markup: '<br/></br>',
				  };
		
		return content;
	} catch (error) {
		console.log('bookmarks_page - ' + error);
	}
}

function viewBookmark(nid){
var bookmark=localStorage.GetBookmark(nid);

variable_set('qview',bookmark);
drupalgap_goto('question_view',{reloadPage:true,transition:awri.transition});

}

function deleteAllBookmarks(){
	drupalgap_confirm('Wirklich alle Lesezeichen löschen?', {
        confirmCallback: _deleteConfirm
    });	
}

function _deleteConfirm(button){
	if(button==1){
		variable_del('bookmarks');
    	$('#mybookmarks').html("").trigger('create');
	}
}


function setBookmark(){
	
	localStorage.SetBookmark($('#book').val());
}

function awri_bookmarks_pageshow() {
	try{
	//	$('#bookmarks:visible').listview('refresh');
	bookmarks=localStorage.GetBookmarks();
	var items=[];
	

	var html='<div class="questionview">';
	for(var i=0;i<bookmarks.length;i++){		
	html += bl('ID['+bookmarks[i].nid+'] '+bookmarks[i].title+' <small>'+bookmarks[i].comment_count+ ' Antworten</small>', null, {
	    attributes: {
	     	'data-role': 'none',
	     	'data-icon': 'bookmark',
	        onclick: "viewBookmark(\'"+bookmarks[i].nid+"\')",
	      }
	  });
	html+="<br/>";

	items.push(bl('ID['+bookmarks[i].nid+'] '+bookmarks[i].title, null, {
	    attributes: {
	   
	        onclick: "viewBookmark(\'"+bookmarks[i].nid+"\')",
	      }
	  }));
	//	l('ID['+bookmarks[i].nid+'] '+bookmarks[i].title,'#',{attributes:{'data-role':'none',onclick:'viewBookmark("'+bookmarks[i].nid+'")'}});
	//	items.push('<a data-role="none" href="#" onclick="viewBookmark("'+bookmarks[i].nid+'")">'+'ID['+bookmarks[i].nid+'] '+bookmarks[i].title+'</a>');
//		items.push(l('ID['+bookmarks[i].nid+'] '+bookmarks[i].title,'bookmark/'+bookmarks[i].nid,{attributes:{'nid':bookmarks[i].nid}}));

	}
	html+='</div>';
	$('#mybookmarks').html(html).trigger('create');
	
	//   drupalgap_item_list_populate('#mybookmarks', items);
		if(bookmarks.length<1)
			$('#mybookmarks').html('<h2>Noch keine Lesezeichen gesetzt!</h2><br/>');

	} catch (error) { console.log('bookmarks_pageshow - ' + error); }
};




function awri_bookmark_page_view(nid){
	try {
		var content = {};
		var node=localStorage.GetBookmark(nid);
		var html="";
		if( node.comment_count>0&&node.comments)for(var i=0;i< node.comments.length;i++){
		html+= theme('comment', { comment: node.comments[i] });			
		}
	
		//console.log(node.body['und'][0].value);
		content['bookmarks'] = {
				  markup: '<h2>'+node.body['und'][0].value+'</h2><div id="bookmark_view"></div>'+html+'<br/><br/>',
};
		
		return content;
	} catch (error) {console.log('bookmark_page_view - ' + error);};
	
};


function awri_bookmark_page_view_pageshow(nid){
	try{
	//	alert("bookmark_page_view_pageshow");
//		var node=localStorage.GetBookmark(nid);
	//	theme_comments({attributes:{"id":"bookmark_view",},"node":node,});
//console.log(node.nid);
//var html=theme_comments({attributes:{"id":"bookmark_view",},"node":node,});
//console.log(html);
} catch (error) {console.log('bookmark_page_view_pageshow - ' + error);};
}

function bookmark_page_title(callback,nid){
	try{
		callback.call(null,theme_icon('bookmark')+" Lesezeichen ["+nid+"]");
	} catch (error) {console.log('bookmark_page_title - ' + error);};
}




function awri_bookmarks_setbookmark(nid){
	localStorage.SetBookmark(nid);
}

Storage.prototype.SetBookmark = function(nid){
	 if(nid<1){
		 alert('Keine ID !');
		 return 
	 }
	 if(this.BookmarkExists(nid)){
		 alert('Dieses Lesezeichen existiert bereits');
		 return 
	 }
	 	
	 node_load(nid, {
	    success: function(node) {	  
	    	// alert('Loaded ' + node.title);	 
	    	var bookmarks=localStorage.GetBookmarks();
  		
   		
  		 if(node.comment_count>0){
  		 var query = {
  				 pagesize:150,
				  parameters:{
				    nid: nid,				   
				  }
				};
				comment_index(query, {
				    success: function(comments){
				    	node['comments']=comments;
				    	 bookmarks[bookmarks.length]=node;
				    	 localStorage.setObject('bookmarks',bookmarks);
				    	console.log(comments,"BOOKmark COMMENTS");
				 //   	alert('Found ' + comments.length + ' comment(s)!');
				    }
				});
  		}else{
  		 bookmarks[bookmarks.length]=node;//comments
  		 localStorage.setObject('bookmarks',bookmarks);
  	 }
  		    		 drupalgap_toast("<h2 class='awri_green'>OK!</h2>Die Rechtsfrage ID["+nid+"] wurde in Lesezeichen gespeichert!" );	    			   			    	 
	
	     }

	});
};

Storage.prototype.RemoveBookmark = function(nr){
	var bookmarks=this.GetBookmarks();
	for(var i=0;i<bookmarks.length;i++){
		if(i==nr)bookmarks.splice(i,1);
	}
	variable_set('bookmarks',JSON.stringify(bookmarks));
};


Storage.prototype.GetBookmarks=function(){
	var obj=localStorage.getObject('bookmarks');
	if (!obj){
		obj=new Array();
		localStorage.setObject('bookmarks',[]);
	}
	return obj;
};

Storage.prototype.GetBookmark = function(nid){
	var value = this.GetBookmarks();

	 for(var i=0;i<value.length;i++){
		 if(value[i].nid==nid)return value[i];
	 }
};


Storage.prototype.BookmarkExists = function(nid) {
   var value = this.GetBookmarks();
	 for(var i=0;i<value.length;i++){
		 if(value[i].nid==nid)return true;		 
	 }
return false;
};

Storage.prototype.setObject = function(key, value) {
   this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function(key) {
   var value = this.getItem(key);
   return value && JSON.parse(value);
};