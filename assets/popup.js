
//takes sting parameter that wish to show the popup
function popup(page){
    
    var pathArray = window.location.pathname.split( '/' );
    var slug = pathArray[pathArray.length-1];
    
    if (slug.match(/^\/?popup_test/)){
        
   
        var visited = $.cookie("popup");
        var winwidth = $(window).width();
        if(visited === null){ visited = 1; $.cookie('popup', visited, { expires: 7 }); }
        if (visited <= 1000) {
            
            
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || winwidth <= 600) {
                $(".hidden-popup-bg").show();
            }else{
                 $(".hidden-popup-bg").show();
                 alert('hi');
            }
            visited++;
            $.cookie('popup', visited, { expires: 7 });
        } else {
            visited++;
            $.cookie('popup', visited, { expires: 7 });
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