
//takes sting parameter that wish to show the popup
function popup(page){
    
    var pathArray = window.location.pathname.split( '/' );
    var slug = pathArray[pathArray.length-1];
    
    if (slug.match(/^\/?popup_test/)){
        
   
        var visited = $.cookie("popup");
        
        console.log(visited);
        var winwidth = $(window).width();
        var popupObj = getPopup();
        console.log("this is popup : " + popupObj);
        var setTime= popupObj[0].cookie_timer;
        var day = setTime /60/24;
        if(visited == null || isNaN(visited)){ 

            visited = 1;
            console.log('day: ' + day);
            $.cookie("popup", visited, { expires: day }); 
        }
        if (visited <= 1000) {
            
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || winwidth <= 600) {
                $(".hidden-popup-bg").show();
            }else{
                 $(".hidden-popup-bg").show();
            }
            visited++;
            $.cookie('popup', visited, { expires: day });
        } else {
            visited++;
            $.cookie('popup', visited, { expires: day });
            return false;
        } 
            
        $(".hidden-popup-bg").click(function(event){
            if( !$( event.target).is('.hidden-popup-form') ) {
                close_popup();
            } else {
                event.stopPropagation();
            }
        });
        $(".hidden-popup-bg .hidden-popup-form").click(function(event){
            event.stopPropagation();
        });     
     }
}
function popupSubmit(){
    var ajaxUrl = "http://halifaxcentre.mallmaverickstaging.com/create_popup_contest_entry/";
	var contest = {};
	contest['contest_id'] = 5;
	contest['first_name'] = 'Dragon';
	var raj ={};
	raj['contest'] = contest; 
	$.ajax({
        url: ajaxUrl,
        type: "POST",
        
        data:raj,
    	success: function(response){                        
		    alert('success');
		},
        error: function(xhr, ajaxOptions, thrownError){
            
            alert("Please try again later.");
		}
    });
}