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

   
    
function renderStoreWithImgTemplate(template_id,html_id,not_empty_section_id,empty_section_id,promotions){
    var item_list = [];
    var template_html = $(template_id).html();
    Mustache.parse(template_html);

    
    $.each( promotions , function( key, val ) {
        localizeObject(val);
        var promotionable_name = "";
        var promotionable_url = "";
      if(val['promotionable_type'] == 'Store' ){
            var store_details = getStoreDetailsByID(val['promotionable_id']);
            if (store_details){
                localizeObject(store_details);
                val.store = store_details;
                val.promotionable_name = store_details.name;
                val.promotionable_url = "../stores/" + store_details.slug;
            }
            
            if(hasImage(store_details.store_front_url)){
                val.store_img = getImageURL(store_details.store_front_url);
            }else{
                val.store_img = changeStoreImgUrl(store_details);
  
            }
          var rendered = Mustache.render(template_html,val);
        item_list.push(rendered);
      }    
    });
    if(promotions.length > 0){
        $(not_empty_section_id).show();
        $(empty_section_id).hide();
        $(html_id).html(item_list.join(''));
    }else{
        $(not_empty_section_id).hide();
        $(empty_section_id).show();
    }
}

 function renderSpotted(spotted_template, not_empty_section_id, empty_section_id,repo){
    var item_list = [];
    var spotted_template_html = $(spotted_template).html();
    Mustache.parse(spotted_template_html);   // optional, speeds up future uses

    $.each( repo , function( key, val ) {
        if( val.name == "spotted"){
            $.each( val.images , function( key, val ) {
                var repo_rendered = Mustache.render(spotted_template_html,val);
                item_list.push(repo_rendered);
            });
        }
    });
    
    
   // var lightBox="<div id='lightbox' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='myLargeModalLabel' aria-hidden='true'><div class='modal-dialog'><button type='button' class='close hidden' data-dismiss='modal' aria-hidden='true'>×</button><div class='modal-content'><div class='modal-body'><img src='' alt='' /></div></div></div></div>";
    var a = item_list.join('') ;
    if(repo.length > 0){
        $(not_empty_section_id).show();
        $(empty_section_id).hide();
        $(not_empty_section_id).html(a);
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