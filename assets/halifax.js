 function renderBanner(banner_template, home_banner, repo){
    var item_list = [];
    var banner_template_html = $(banner_template).html();
    Mustache.parse(banner_template_html);   // optional, speeds up future uses
    var count = 0;
    $.each( repo , function( key, val ) {
        if( val.name == "banner"){
            $.each( val.images , function( key, val ) {
                var repo_rendered = Mustache.render(banner_template_html,val);
                item_list.push(repo_rendered);
                count += 1;
            });
         
        }
    });
    
    $(home_banner).show();
    $(home_banner).html(item_list.join(''));
    $('.item').first().addClass('active');
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

function sortByDate(a, b){
       
    var aDate = a.publish_date;
    var bDate = b.publish_date;

    return ((aDate > bDate) ? -1 : ((aDate < bDate) ? 1 : 0));
}

function changeStoreImgUrl(storeObj){
    //   alert(storeObj.store_front_url);
    if(storeObj.store_front_url.indexOf("/store_fronts/original/missing.png") > -1 ){
     
       return "http://kodekloud.s3.amazonaws.com/sites/5438407c6e6f64462d020000/bc66d880720f58f49b267ae6fb920f74/default.jpg";
    } else {
         return "http://cdn.mallmaverick.com" + storeObj.store_front_url;
    }
}