
(function($) {

    /**************************************
     * Loading BG Hide
    ***************************************/
    
    $( document ).ready(function() {
        setTimeout(function(){ 
            $(".load-bg").addClass("animated bounceOutUp");
            $(".load-wrapper").addClass("animated bounceOutUp");
        }, 2700);
        
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