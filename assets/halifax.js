    function sortByDate(a, b){
       
        var aDate = a.publish_date;
        var bDate = b.publish_date;
 
        return ((aDate > bDate) ? -1 : ((aDate < bDate) ? 1 : 0));
    }
    
function renderEventsWithImgTemplate(template_id,html_id,not_empty_section_id,empty_section_id,events){
    var item_list = [];
    var template_html = $(template_id).html();
    Mustache.parse(template_html);   // optional, speeds up future uses

    
    $.each( events , function( key, val ) {
        localizeObject(val);
        if(hasImage(val.event_image_url)){
            val.event_image_url = getImageURL(val.event_image_url);
            val.event_image_url_abs = getAbsoluteImageURL(val.event_image_url_abs);
    
        }else{
            val.event_image_url =  "http://kodekloud.s3.amazonaws.com/sites/5438407c6e6f64462d020000/bc66d880720f58f49b267ae6fb920f74/default.jpg";
        }
        var rendered = Mustache.render(template_html,val);
        item_list.push(rendered);
    });
    if(events.length > 0){
        $(not_empty_section_id).show();
        $(empty_section_id).hide();
        $(html_id).html(item_list.join(''));
    }else{
        $(not_empty_section_id).hide();
        $(empty_section_id).show();
    }
}