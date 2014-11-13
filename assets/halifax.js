    function sortByDate(a, b){
       
        var aDate = a.publish_date;
        var bDate = b.publish_date;
 
        return ((aDate > bDate) ? -1 : ((aDate < bDate) ? 1 : 0));
    }