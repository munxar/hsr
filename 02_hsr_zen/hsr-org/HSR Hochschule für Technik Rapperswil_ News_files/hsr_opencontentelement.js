    // *** Inhalt: Aktuell Boxen ***
function changeBoxOnSelect(id)
{
    var el = jQuery('#cont' + id);
    var obj = jQuery('#actContainer'+id);
    var pic = jQuery('#actTitlePix'+id);
    var isOpen = jQuery(obj).hasClass('actContainerblock');
                        
    jQuery(el).toggle('slow', function() {
    // Animation complete.
    });
    
                        
    if(isOpen){
        jQuery(obj).removeClass("actContainerblock");
        jQuery(pic).removeClass("actTitlePixblock");
        jQuery(obj).addClass("actContainer");
        jQuery(pic).addClass("actTitlePix");
    }else{
        jQuery(obj).removeClass("actContainer");
        jQuery(pic).removeClass("actTitlePix");
        jQuery(obj).addClass("actContainerblock");
        jQuery(pic).addClass("actTitlePixblock");
    }
    
} 
