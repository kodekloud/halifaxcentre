
//takes sting parameter that wish to show the popup

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