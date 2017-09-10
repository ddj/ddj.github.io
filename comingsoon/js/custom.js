
(function($) {

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