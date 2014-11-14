 function renderBanner(banner_template, home_banner, repo){
    
    var item_list = [];
    var item_rendered = [];
    var banner_template_html = $(banner_template).html();
    Mustache.parse(banner_template_html);   // optional, speeds up future uses

    $.each( repo , function( key, val ) {
        if( val.name == "banner"){
            $.each( val.images , function( key, val ) {
               
                item_list.push(val);
               
            });
        }
    });
    item_list.sort(function(a, b){
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
    });
    $.each( item_list , function( key, val ) {
            var repo_rendered = Mustache.render(banner_template_html,val);
            item_rendered.push(repo_rendered);
           
    });
    
   
    $(home_banner).show();
    $(home_banner).html(item_rendered.join(''));
    $('.item').first().addClass('active');
}





function renderEventsWithImgTemplate(template_id,html_id,not_empty_section_id,empty_section_id,events){
    var item_list = [];
    var template_html = $(template_id).html();
    Mustache.parse(template_html);   // optional, speeds up future uses

    console.log('hi');
    $.each( events , function( key, val ) {
        localizeObject(val);
        alert(val.tags.length);
        if(val.tags.length === 0){
            if(hasImage(val.event_image_url)){
                val.event_image_url = getImageURL(val.event_image_url);
                val.event_image_url_abs = getAbsoluteImageURL(val.event_image_url_abs);
        
            }else{
                val.event_image_url =  "http://kodekloud.s3.amazonaws.com/sites/5438407c6e6f64462d020000/bc66d880720f58f49b267ae6fb920f74/default.jpg";
            }
            var rendered = Mustache.render(template_html,val);
            item_list.push(rendered);
        }
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
     
     
  function makeEventsPromotions(events, promotions){
        var item_list=[];
        $.each( events , function( key, val ) {
            val.type = 'event';
            item_list.push(val);
        });
        $.each( promotions , function( key, val ) {
            val.type = 'promotion';
            item_list.push(val);
        });
        item_list.sort(sortEventsPromotionsByDate);
        return item_list;
    }
    
    function sortEventsPromotionsByDate(a, b){
       
        var aDate = a.start_date;
        var bDate = b.start_date;
        
        return ((aDate > bDate) ? -1 : ((aDate < bDate) ? 1 : 0));
    }
    
    function renderEventsPromotions(event_template_id, promo_template_id, promo_template_id_no_image, property_template_id,html_id,not_empty_section_id,empty_section_id,events_promotions){
        var item_list = [];
        var event_template_html = $(event_template_id).html();
        Mustache.parse(event_template_html);   // optional, speeds up future uses
  
        
        var promo_template_html = $(promo_template_id).html();
         Mustache.parse(promo_template_html); 

         
         var property_template_html = $(property_template_id).html();
         Mustache.parse(property_template_html); 
         
         var promo_template_html_no_image = $(promo_template_id_no_image).html();
             Mustache.parse(promo_template_html_no_image); 
             
        $.each( events_promotions , function( key, val ) {
            if( val.type == "event"){
                if(hasImage(val.event_image_url)){
                    val.event_image_url = getImageURL(val.event_image_url);
         
               }else{
                    val.event_image_url =  "http://kodekloud.s3.amazonaws.com/sites/5438407c6e6f64462d020000/bc66d880720f58f49b267ae6fb920f74/default.jpg";
                }
                var rendered = Mustache.render(event_template_html,val);
                item_list.push(rendered);
            } else if(val.type == "promotion"){
               var promotionable_name = "";
                var promotionable_url = "";
                if(val['promotionable_type'] == 'Store'){
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
                        val.store_img = "http://kodekloud.s3.amazonaws.com/sites/5438407c6e6f64462d020000/bc66d880720f58f49b267ae6fb920f74/default.jpg";
          
                    }
                    var rendered = Mustache.render(promo_template_html,val);
                    item_list.push(rendered);
                } else if(val['promotionable_type'] == 'Property'){
                    if(hasImage(val.promo_image_url)){
                        val.promo_image_url = getImageURL(val.promo_image_url);
                        val.promo_image_url_abs = getAbsoluteImageURL(val.promo_image_url_abs);
                        var rendered = Mustache.render(property_template_html,val);
                        item_list.push(rendered);
                    }else{
                        var rendered_no_image = Mustache.render(promo_template_html_no_image,val);
                        item_list.push(rendered_no_image);
                    }     
                
                }
            }
        });
        if(events_promotions.length > 0){
            $(not_empty_section_id).show();
            $(empty_section_id).hide();
            $(html_id).html(item_list.join(''));
        }else{
            $(not_empty_section_id).hide();
            $(empty_section_id).show();
        }
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
function dateToString(dateString){
    var datePart = dateString.split('T');
    var dateItem = datePart[0].split('-');
    var dateFormat = new Date(dateItem[0], dateItem[1]-1, dateItem[2]);
   // var year = dateFormat.getFullYear();
    //var month = dateFormat.getMonth();
    //var dateNumber = dateFormat.getDate();
    //var newDate = month + '-' + dateNumber + '-' + year;
    return dateFormat.toDateString();
}