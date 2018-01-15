function awri_bookmarks_page() {
	try {
		var content = {};
				
		content['svg']={
				markup:theme_icon('awri32')+theme_icon('printer'),
		};
		
		content['bookmarks'] = {
				  theme: 'jqm_item_list',
				  title: 'Lesezeichen',
				  items: [
				          '<p>Durch über 2500 Rechtsfragen</p>', 
				          '<p>Nach links oder Rechts blättern durch wischen oder mit der Maus</p>', 
				          ],
				          attributes:{
				        	  id:'bookmarks',
				          }
				};
		
		content['nid'] = {
				theme : 'textfield',
				
				attributes : {
					id : "nid",
					value: '11841',
				}
			};
		
		content['setobject'] = {
				theme : 'button',
				text : 'setObject',
				attributes : {
					onclick : "setit();",
						
				}
			};
		
		content['setobject'] = {
				theme : 'button',
				text : 'setObject',
				attributes : {
					onclick : "setBookmark();",
						
				}
			};
		
		content['getobject'] = {
				theme : 'button',
				text : 'getObject',
				attributes : {
					onclick : "getBookmarks();",
						
				}
			};
		
		return content;
	} catch (error) {
		console.log('awri_help_page - ' + error);
	}
}

function awri_bookmarks_pageshow() {
	bookmarks=getBookmarks();
	var items=[];
	for(var i=0;i<bookmarks.length;i++){
		items.push(l('ID['+bookmarks[i].nid+'] '+bookmarks[i].title,'bookmark/'+bookmarks[i].nid,{attributes:{'nid':bookmarks[i].nid}})).trigger('create');
	}
	   drupalgap_item_list_populate('#bookmarks', items);
}

function getBookmarks(){
var obj=localStorage.getObject('bookmarks');
if (!obj){
	obj=new Array();
	localStorage.setObject('bookmarks',[]);

}
return obj;
};

function removeBookmark(nr){
	bookmarks=getBookmarks();
	for(var i=0;i<bookmarks.length;i++){
		alert(i+' - '+nr);
		if(i==nr)bookmarks.splice(i,1);
	}
	variable_set('bookmarks',JSON.stringify(bookmarks));
alert("Bookmark removed: "+nr);	
};

function setBookmark(nid){
	//nid=$('#nid').val();
	 if(localStorage.BookmarkExists(nid)){
		 alert('Dieses Lesezeichen existiert bereits');
		 return 
	 }
	 
	node_load(nid, {
	    success: function(node) {	  
	    	 alert('Loaded ' + node.title);	 
	    	var bookmarks=getBookmarks();
   	
	    	
   		    		 drupalgap_toast("<h2 class='awri_green'>OK!</h2>Die Rechtsfrage ID["+nid+"] wurde in Lesezeichen gespeichert!" );	    			
   		
	    	 console.log(bookmarks.length);
	    	 console.log(localStorage.getObject('bookmarks'));
	    	 if(node.comment_count>0){
	    		 
	    		 console.log("getting comments");
	    		 var query = {
	    				  parameters:{
	    				    nid: nid,
	    				  }
	    				};
	    				comment_index(query, {
	    				    success: function(comments){
	    				    	node['comments']=comments;
	    				    	 bookmarks[bookmarks.length]=node;
	    				    	 localStorage.setObject('bookmarks',bookmarks);
	    				    	console.log(comments);
	    				    	alert('Found ' + comments.length + ' comment(s)!');
	    				    }
	    				});
	    				
	    	 }else{
	    		 bookmarks[bookmarks.length]=node;//comments
	    		 localStorage.setObject('bookmarks',bookmarks);
	    	 }
	    	 
	    	 
	    	 /*
	    	
	    	 for(var i=0;i<bookmarks.length;i++){
	    		 console.log(bookmarks[i].nid);
	    	 }
	    	 
	    	 if(!exists){
	    		 bookmarks[bookmarks.length]=node;
	localStorage.setObject('bookmarks',bookmarks);
	    		 drupalgap_toast("<h2 class='awri_green'>OK!</h2>Die Rechtsfrage ID["+nid+"] wurde in Lesezeichen gespeichert!" );	    			
	    	 }
	    */
	    	//var obj=[[nid,node]];	    	 	    	 
	//    	console.log("object");
//	    	console.log(obj);
//localStorage.nodeExists('bookmarks');
	    	 //
	    	//
	 //   console.log(localStorage.getObject('bookmarks'));
	     }

	});
};

Storage.prototype.SetBookmark = function(){
	var nid=variable_get('nid');
	 if(nid<1){
		 alert('Keine ID !');
		 return 
	 }
	 if(this.BookmarkExists(nid)){
		 alert('Dieses Lesezeichen existiert bereits');
		 return 
	 }
	 	
	 node_load(variable_get('nid'), {
	    success: function(node) {	  
	    	 alert('Loaded ' + node.title);	 
	    	var bookmarks=getBookmarks();
   		 bookmarks[bookmarks.length]=node;
   		localStorage.setObject('bookmarks',bookmarks);
   		    		 drupalgap_toast("<h2 class='awri_green'>OK!</h2>Die Rechtsfrage ID["+nid+"] wurde in Lesezeichen gespeichert!" );	    			   			    	 
	
	     }

	});
};


Storage.prototype.GetBookmark = function(nid){
	var value = this.getObject("bookmarks");

	 for(var i=0;i<value.length;i++){
		 if(value[i].nid==nid)return value[i];
	 }
};


Storage.prototype.BookmarkExists = function(nid) {
    var value = this.getObject("bookmarks");
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

function bookmark_page_view(nid){
	try {
		var content = {};
		var node=localStorage.GetBookmark(nid);
		var html="";
		if( node.comment_count>0)for(var i=0;i< node.comments.length;i++){
		html+= theme('comment', { comment: node.comments[i] });			
		}
		//console.log(node.body['und'][0].value);
		content['bookmarks'] = {
				  markup: '<h2>'+node.body['und'][0].value+'</h2><div id="bookmark_view">BOOKMARK'+nid+"</div>"+html+'<br/><br/>',
};
	
		return content;
	} catch (error) {console.log('bookmark_page_view - ' + error);};
	
};


function bookmark_page_view_pageshow(nid){
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
		callback.call(null,"Lesezeichen ["+nid+"]");
	} catch (error) {console.log('bookmark_page_title - ' + error);};
}