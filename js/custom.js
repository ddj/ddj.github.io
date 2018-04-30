(function($) {

    /**************************************
     * Loading BG Hide
    ***************************************/
    
    $( document ).ready(function() {
        setTimeout(function(){ 
            $(".load-bg").addClass("animated bounceOutUp");
        }, 3000);
        setTimeout(function(){ 
            $(".load-bar").addClass("animated fadeOut");
        }, 3300);
        
    });



    /**************************************
     * Header Background Change
    ***************************************/
    $(function(){
     var shrinkHeader = 625;
      $(window).scroll(function() {
        var scroll = getCurrentScroll();
            if ( scroll >= shrinkHeader ) {
                $('.home').addClass('body-scroll');
                $('#headerlogo').addClass('animated fadeOut');
            }
            else {
                $('.home').removeClass('body-scroll');
            }
      });
    function getCurrentScroll() {
        return window.pageYOffset || document.documentElement.scrollTop;
        }
    });


})(jQuery);