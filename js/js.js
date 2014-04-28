$(document).on('click','.header', function(e){
 	switch(this.id){
 		case 'btnMenu':
 		if($(".menu-close").length){ 			
 			
	 		$("#menu").removeClass("menu-close"); 
	 		$("#menu").addClass("menu-open");
	
	 		$("#B").removeClass("B-close"); 
	 		$("#B").addClass("B-open");
	 	}
	 	else{
	 	
	 		$("#menu").removeClass("menu-open"); 
	 		$("#menu").addClass("menu-close");
	 	
	 		$("#B").removeClass("B-open"); 
	 		$("#B").addClass("B-close");
	 		$("#mensaje").text("azar");
	
	 	}
 		break;
 	}
});