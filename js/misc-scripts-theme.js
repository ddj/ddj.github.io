;(function ($, window, document, undefined) {
    'use strict';

    $('body').fitVids({ignore: '.info-video iframe, .vimeo-video, .youtube-simple-wrap iframe, .iframe-video.for-btn iframe, .post-media.video-container iframe'});

    /*=================================*/
    /* 01 - VARIABLES */
    /*=================================*/
    var swipers = [],
        winW, winH, winScr, _isresponsive, smPoint = 768,
        mdPoint = 992,
        lgPoint = 1200,
        addPoint = 1600,
        _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i),
        pageCalculateHeight;

    /*=================================*/
    /* 02 - PAGE CALCULATIONS */
    /*=================================*/
    /**
     *
     * PageCalculations function
     * @since 1.0.0
     * @version 1.0.1
     * @var winW
     * @var winH
     * @var winS
     * @var pageCalculations
     * @var onEvent
     **/
    if (typeof pageCalculations !== 'function') {

        var winW, winH, winS, pageCalculations, onEvent = window.addEventListener;

        pageCalculations = function (func) {

            winW = window.innerWidth;
            winH = window.innerHeight;
            winS = document.body.scrollTop;

            if (!func) return;

            onEvent('load', func, true); // window onload
            onEvent('resize', func, true); // window resize
            onEvent("orientationchange", func, false); // window orientationchange

        }// end pageCalculations

        pageCalculations(function () {
            pageCalculations();
        });
    }

    /*Full height banner*/
    function topBannerHeight() {
        var headerH = $('.header_top_bg').not('.header_trans-fixed, .fixed-header').outerHeight() || 0;
        var footerH = $('#footer').outerHeight() || 0;
        var windowH = $('.fix-elem-height').height(); //it's fixed white space on mobile scroll and good works :)
        var offsetTop;
        var adminbarH;
        if ($('#wpadminbar').length) {
            offsetTop = headerH + $('#wpadminbar').outerHeight();
        } else {
            offsetTop = headerH;
        }

        if ($('#wpadminbar').length && $('.header_trans-fixed').length) {
            adminbarH = $('#wpadminbar').outerHeight();
        } else {
            adminbarH = 0;
        }

        $('.full-height-window').css('min-height', (windowH - offsetTop) + adminbarH + 'px');
        $('.full-height-window-hard').css('height', (windowH - offsetTop) + adminbarH + 'px');
        $('.full-height-window-head-foot').css('height', (windowH - offsetTop - footerH) + adminbarH + 'px');
        $('.middle-height-window-hard').css('height', (windowH - offsetTop) * 0.8 + adminbarH + 'px');

        $('body, .main-wrapper').css('min-height', $(window).height() - footerH);
    }

    /* IF TOUCH DEVICE */
    function isTouchDevice() {
        return 'ontouchstart' in document.documentElement;
    }


    $(window).on('load resize', function() {
        // make square images for inline team
        if($('.about-mob-section-wrap').length){
            about_gallery_images();
        }

    });

    function about_gallery_images() {
        var imagesWidth = $('.about-mob-section-wrap .mobile-about-section .about-gallery-list li').innerWidth();
        $('.about-mob-section-wrap .mobile-about-section .about-gallery-list li').each( function() {
            $(this).innerHeight( imagesWidth );
        });
    }


    /* ADD ZERO FUNCTION */
    var currentSwiper, totalSwiper;
    function ifZero(current,total) {
        if ( String(current).length === 1 ) {
            currentSwiper = '0' + (current + 1);
        } else {
            currentSwiper = total;
        }
        if ( String(total).length === 1 ) {
            totalSwiper = '0' + total;
        } else {
            totalSwiper = total;
        }
    }




    /*=================================*/
    /* SWIPER SLIDER */

    /*=================================*/
    function initSwiper() {
        var initIterator = 0;
        $('.swiper-container').each(function () {
            var $t = $(this);

            var index = 'swiper-unique-id-' + initIterator;
            $t.addClass('swiper-' + index + ' initialized').attr('id', index);
            $t.parent().find('.swiper-pagination').addClass('swiper-pagination-' + index);
            $t.parent().find('.swiper-button-next').addClass('swiper-button-next-' + index);
            $t.parent().find('.swiper-button-prev').addClass('swiper-button-prev-' + index);

            var setThumb = function (activeIndex, slidesNum) {
                var url_thumb,
                    leftClick = $t.find('.slider-click.left'),
                    rightClick = $t.find('.slider-click.right'),
                    customSliderCurrent = $t.find('.number-slides .current'),
                    customSliderTotal = $t.find('.number-slides .total'),
                    activeIndexLeft, activeIndexRight;
                if (loopVar === 1) {
                    if (activeIndex < 1) {
                        leftClick.removeClass('disabled').find('.left').text(slidesNum);
                        leftClick.find('.right').text(slidesNum);
                        // yuk slider
                        ifZero(activeIndex,slidesNum);
                        customSliderCurrent.text(currentSwiper);
                        customSliderTotal.text(totalSwiper);
                    }
                    else {
                        leftClick.removeClass('disabled').find('.left').text(activeIndex);
                        leftClick.find('.right').text(slidesNum);
                        // yuk slider
                        ifZero(activeIndex,slidesNum);
                        customSliderCurrent.text(currentSwiper);
                        customSliderTotal.text(totalSwiper);
                    }
                    if (activeIndex == slidesNum - 1) {
                        rightClick.removeClass('disabled').find('.left').text('1');
                        rightClick.find('.right').text(slidesNum);
                        // yuk slider
                        ifZero(activeIndex,slidesNum);
                        customSliderCurrent.text(currentSwiper);
                        customSliderTotal.text(totalSwiper);
                    }
                    else {
                        rightClick.removeClass('disabled').find('.left').text(activeIndex + 2);
                        rightClick.find('.right').text(slidesNum);
                        // yuk slider
                        ifZero(activeIndex,slidesNum);
                        customSliderCurrent.text(currentSwiper);
                        customSliderTotal.text(totalSwiper);
                    }
                } else {
                    if (activeIndex < 1) {
                        leftClick.addClass('disabled');
                    }
                    else {
                        leftClick.removeClass('disabled').find('.left').text(activeIndex);
                        leftClick.find('.right').text(slidesNum);
                        // yuk slider
                        ifZero(activeIndex,slidesNum);
                        customSliderCurrent.text(currentSwiper);
                        customSliderTotal.text(totalSwiper);
                    }
                    if (activeIndex == slidesNum - 1) {
                        rightClick.addClass('disabled');
                    }
                    else {
                        rightClick.removeClass('disabled').find('.left').text(activeIndex + 2);
                        rightClick.find('.right').text(slidesNum);
                        // yuk slider
                        ifZero(activeIndex,slidesNum);
                        customSliderCurrent.text(currentSwiper);
                        customSliderTotal.text(totalSwiper);
                    }
                }
            };

            if (isTouchDevice() && $t.data('mode') == 'vertical' && $t.hasClass('not-swipe')) {
                $t.attr('data-noswiping', 1);
                $(this).find('.swiper-slide').addClass('swiper-no-swiping');
            }

            var autoPlayVar = parseInt($t.attr('data-autoplay'), 10);
            var mode = $t.attr('data-mode');
            var effect = $t.attr('data-effect') ? $t.attr('data-effect') : 'slide';
            var paginationType = $t.attr('data-pagination-type');
            var loopVar = parseInt($t.attr('data-loop'), 10);
            var noSwipingVar = parseInt($t.attr('data-noSwiping'), 10);
            var mouse = parseInt($t.attr('data-mouse'), 10);
            var speedVar = parseInt($t.attr('data-speed'), 10);
            var centerVar = parseInt($t.attr('data-center'), 10);
            var spaceBetweenVar = parseInt($t.attr('data-space'), 10);
            var slidesPerView = parseInt($t.attr('data-slidesPerView'), 10) ? parseInt($t.attr('data-slidesPerView'), 10) : 'auto';
            var breakpoints = {};
            var responsive = $t.attr('data-responsive');
            if ($('.album_swiper').length && $(window).width() < 768) {
                loopVar = 1;
            } else {
                loopVar = parseInt($t.attr('data-loop'), 10);
            }
            if (responsive == 'responsive') {
                slidesPerView = $t.attr('data-add-slides');
                var lg = $t.attr('data-lg-slides') ? $t.attr('data-lg-slides') : $t.attr('data-add-slides');
                var md = $t.attr('data-md-slides') ? $t.attr('data-md-slides') : $t.attr('data-add-slides');
                var sm = $t.attr('data-sm-slides') ? $t.attr('data-sm-slides') : $t.attr('data-add-slides');
                var xs = $t.attr('data-xs-slides') ? $t.attr('data-xs-slides') : $t.attr('data-add-slides');

                breakpoints = {
                    768: {
                        slidesPerView: xs
                    },
                    992: {
                        slidesPerView: sm
                    },
                    1300: {
                        slidesPerView: md
                    },
                    1600: {
                        slidesPerView: lg
                    }
                };

            }

            var titles = [];
            $t.find('.swiper-slide').each(function () {
                titles.push($(this).data('title'));
            });

            if ($t.hasClass('swiper-album')) {
                breakpoints = {
                    480: {
                        slidesPerView: 1
                    },
                    767: {
                        slidesPerView: 3,
                        centeredSlides: false
                    },
                    991: {
                        slidesPerView: 4
                    },
                    1600: {
                        slidesPerView: 5
                    }
                };
            }

            swipers['swiper-' + index] = new Swiper('.swiper-' + index, {

                pagination: '.swiper-pagination-' + index,
                paginationType: paginationType,
                paginationBulletRender: function (swiper, index, className) {
                    if ($t.parent('.banner-slider-wrap.vertical_custom_elements').length || $t.parent('.banner-slider-wrap.vertical').length || $t.parent('.product-slider-wrapper').length || $t.parent('.banner-slider-wrap.modern_vertical').length || $t.parent('.banner-slider-wrap.classic_vertical').length) {
                        var title = titles[index];

                        if (index < 9) return '<span class="' + className + '"><i class="pagination-title">' + title + '</i><i>' + ('0' + (index + 1)) + '</i></span>';

                        return '<span class="' + className + '"><i class="pagination-title">' + title + '</i><i>' + (index + 1) + '</i></span>';
                    } else {
                        return '<span class="' + className + '"></span>';
                    }
                },
                direction: mode || 'horizontal',
                slidesPerView: slidesPerView,
                breakpoints: breakpoints,
                centeredSlides: centerVar,
                noSwiping: noSwipingVar,
                noSwipingClass: 'swiper-no-swiping',
                paginationClickable: true,
                spaceBetween: spaceBetweenVar,
                containerModifierClass: 'swiper-container-', // NEW
                slideClass: 'swiper-slide',
                slideActiveClass: 'swiper-slide-active',
                slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
                slideVisibleClass: 'swiper-slide-visible',
                slideDuplicateClass: 'swiper-slide-duplicate',
                slideNextClass: 'swiper-slide-next',
                slideDuplicateNextClass: 'swiper-slide-duplicate-next',
                slidePrevClass: 'swiper-slide-prev',
                slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
                wrapperClass: 'swiper-wrapper',
                bulletClass: 'swiper-pagination-bullet',
                bulletActiveClass: 'swiper-pagination-bullet-active',
                buttonDisabledClass: 'swiper-button-disabled',
                paginationCurrentClass: 'swiper-pagination-current',
                paginationTotalClass: 'swiper-pagination-total',
                paginationHiddenClass: 'swiper-pagination-hidden',
                paginationProgressbarClass: 'swiper-pagination-progressbar',
                paginationClickableClass: 'swiper-pagination-clickable', // NEW
                paginationModifierClass: 'swiper-pagination-', // NEW
                lazyLoadingClass: 'swiper-lazy',
                lazyStatusLoadingClass: 'swiper-lazy-loading',
                lazyStatusLoadedClass: 'swiper-lazy-loaded',
                lazyPreloaderClass: 'swiper-lazy-preloader',
                notificationClass: 'swiper-notification',
                preloaderClass: 'preloader',
                zoomContainerClass: 'swiper-zoom-container',
                loop: loopVar,
                speed: speedVar,
                autoplay: autoPlayVar,
                effect: effect,
                mousewheelControl: mouse,
                nextButton: '.swiper-button-next-' + index,
                prevButton: '.swiper-button-prev-' + index,
                iOSEdgeSwipeDetection: true,
                onInit: function (swiper) {
                    if ($t.closest('.product-slider-wrapper') && $(window).width() < 1024 ) {
                        $t.find('.swiper-slide').addClass('swiper-no-swiping');
                    } else {
                        $t.find('.swiper-slide').removeClass('swiper-no-swiping');
                    }

                    if (winW > 1024 && $t.find(".slider-click").length) {
                        $t.find(".slider-click").each(function () {
                            var arrow = $(this);
                            $(document).on("mousemove", function (event) {
                                var arrow_parent = arrow.parent(),
                                    parent_offset = arrow_parent.offset(),
                                    pos_left = Math.min(event.pageX - parent_offset.left, arrow_parent.width()),
                                    pos_top = event.pageY - parent_offset.top;

                                arrow.css({
                                    'left': pos_left,
                                    'top': pos_top
                                });
                            });
                        });
                    }
                    var totalSlides = $('.swiper-slide:not(.swiper-slide-duplicate)').length;
                    if ($('.full_screen_slider').length) {
                        setThumb(swiper.realIndex, totalSlides);
                    }


                },
                onSlideChangeEnd: function (swiper) {
                    var totalSlides =  $t.find($('.swiper-slide:not(.swiper-slide-duplicate)')).length;
                    var activeIndex = (loopVar === 1) ? swiper.realIndex : swiper.activeIndex;
                    if ($('.full_screen_slider').length || $('.banner-slider-wrap.urban').length || $('.banner-slider-wrap.vertical').length || $('.banner-slider-wrap.classic').length || $('.banner-slider-wrap.modern_vertical').length || $('.banner-slider-wrap.classic_vertical').length ) {
                        setThumb(swiper.realIndex, totalSlides);
                    }

                },
                onSlideChangeStart: function (swiper) {
                    var totalSlides = $t.find($('.swiper-slide:not(.swiper-slide-duplicate)')).length;
                    var activeIndex = (loopVar == 1) ? swiper.realIndex : swiper.activeIndex;

                    if($t.parent().find('.swiper-pagination-bullet').length){
                        $t.parent().find('.swiper-pagination-bullet').removeClass('swiper-pagination-bullet-active').eq(activeIndex).addClass('swiper-pagination-bullet-active');
                    }
                    if ($('.full_screen_slider').length || $('.banner-slider-wrap.urban').length || $('.banner-slider-wrap.vertical').length || $('.banner-slider-wrap.classic').length || $('.banner-slider-wrap.modern_vertical').length || $('.banner-slider-wrap.classic_vertical').length) {
                        setThumb(swiper.realIndex, totalSlides);
                    }

                    // CHANGE COLOR PAGINATION
                    if ( $('.banner-slider-wrap.urban').length || $('.banner-slider-wrap.classic').length || $('.banner-slider-wrap.modern_vertical').length ) {
                        var contentWrap = $('.banner-slider-wrap .swiper-slide');
                        var pagWrap     = $('.banner-slider-wrap .pag-wrapper');
                        var btnDown     = $('.banner-slider-wrap.classic .btn-scroll-down');
                        var socialCl    = $('.banner-slider-wrap.classic .social');
                        contentWrap.each(function(){
                            if ( $(this).hasClass('swiper-slide-active') ) {
                                var contentWrapItem = $(this).find('.content-wrap');
                                if ( $(contentWrapItem).hasClass('dark_color') ) {
                                    pagWrap.removeClass('dark_color light_color');
                                    pagWrap.addClass('dark_color');
                                    btnDown.removeClass('dark_color light_color');
                                    btnDown.addClass('dark_color');
                                    socialCl.removeClass('dark_color light_color');
                                    socialCl.addClass('dark_color');
                                }
                                if ( $(contentWrapItem).hasClass('light_color') ) {
                                    pagWrap.removeClass('dark_color light_color');
                                    pagWrap.addClass('light_color');
                                    btnDown.removeClass('dark_color light_color');
                                    btnDown.addClass('light_color');
                                    socialCl.removeClass('dark_color light_color');
                                    socialCl.addClass('light_color');
                                }
                            }
                        });
                    }


                    swiper.startAutoplay();
                }
            });
            initIterator++;
        });
    }


    $('.slider-click.left').on('click', function () {
        swipers['swiper-' + $(this).parent().parent().parent().find('.full_screen_slider').attr('id')].slidePrev();
        swipers['swiper-' + $(this).parent().parent().parent().find('.full_screen_slider').attr('id')].startAutoplay();
    });
    $('.slider-click.right').on('click', function () {
        swipers['swiper-' + $(this).parent().parent().parent().find('.full_screen_slider').attr('id')].slideNext();
        swipers['swiper-' + $(this).parent().parent().parent().find('.full_screen_slider').attr('id')].startAutoplay();
    });


    /*=================================*/
    /* CUSTOM SCROLL FOR ASIDE MENU */
    /*=================================*/

    function asideMenuScroll(){

        if($('.aside-menu:not(.static)').length && ($(window).width() > $('.main-wrapper').attr('data-top'))) {

            $(".aside-menu:not(.static) #topmenu > ul").mCustomScrollbar({
                theme: "light",
                preventDefault: true
            });
        }else if($('.aside-menu:not(.static)').length){
            $(".aside-menu:not(.static) #topmenu > ul").mCustomScrollbar("destroy");
        }else if($('.right-menu.full-screen').length && ($(window).width() > $('.main-wrapper').data('top'))){

            $('.right-menu.full-screen #topmenu ul ul').mCustomScrollbar({
                theme: "dark",
                preventDefault: false
            });

        }else if($('.right-menu.full-screen').length){
            $('.right-menu.full-screen #topmenu ul ul').mCustomScrollbar("destroy");
        }
    }

    $(window).on('resize', function () {
        asideMenuScroll();
    });

    $(window).on('load', function () {
        asideMenuScroll();
    });





    /*=================================*/
    /* MAIN WRAPPER */
    /*=================================*/

    function calcPaddingMainWrapper() {
        var footer = $('#footer');
        var paddValue = footer.outerHeight();

        footer.trigger('heightChange');
    }

    if ($(".animsition").length) {
        $(".animsition").animsition({
            inClass: 'fade-in',
            outClass: 'fade-out',
            inDuration: 2000,
            outDuration: 800,
            loading: true,
            loadingParentElement: 'body', //animsition wrapper element
            loadingClass: 'animsition-loading',
            unSupportCss: ['animation-duration',
                '-webkit-animation-duration',
                '-o-animation-duration'
            ],
            overlay: false,
            overlayClass: 'animsition-overlay-slide',
            overlayParentElement: 'body'
        });
    }

    /*=================================*/
    /* FOOTER WIDGETS HEIGHT */

    /*=================================*/

    function footerWidgetsHeight() {
        if ($('#footer .sidebar-item').length) {
            $('#footer .widg').each(function () {
                var layoutM = 'masonry';
                $(this).isotope({
                    itemSelector: '.sidebar-item',
                    layoutMode: layoutM,
                    masonry: {
                        columnWidth: '.sidebar-item'
                    }
                });
            });
        }
    }

    /*=================================*/
    /* PORTFOLIO ITEM */
    /*=================================*/

    function portfolioAlbum() {
        if ($('.portfolio .block_item_0').length) {
            $('.portfolio .wpb_wrapper').each(function () {
                var layoutM = 'masonry';
                $(this).isotope({
                    itemSelector: '.block_item_0',
                    layoutMode: layoutM,
                    masonry: {
                        columnWidth: '.block_item_0'
                    }
                });
            });
        }
    }

    /*=================================*/
    /* ADD IMAGE ON BACKGROUND */

    /*=================================*/

    function wpc_add_img_bg(img_sel, parent_sel) {
        if (!img_sel) {

            return false;
        }
        var $parent, $imgDataHidden, _this;
        $(img_sel).each(function () {
            _this = $(this);
            $imgDataHidden = _this.data('s-hidden');
            $parent = _this.closest(parent_sel);
            $parent = $parent.length ? $parent : _this.parent();
            $parent.css('background-image', 'url(' + this.src + ')').addClass('s-back-switch');
            if ($imgDataHidden) {
                _this.css('visibility', 'hidden');
                _this.show();
            }
            else {
                _this.hide();
            }
        });
    }

    // Canvas wrap
    function canvasWrap() {
        $('canvas:not(.scene--full)').wrap('<div class="canvas-wrap"></div>');
    }

    // SEARCH POPUP
    $('.open-search').on('click', function () {
        $('body').css('overflow', 'hidden');
        $('.site-search').addClass('open');
    });
    $('.close-search').on('click', function () {
        $('body').css('overflow', '');
        $('.site-search').removeClass('open');
    });

    /*=================================*/
    /* ASIDE MENU */

    /*=================================*/
    function toggleAsideMenu() {
        // ASIDE MENU NAVIGATION
        $('.aside-nav').on('click', function () {
            $('.aside-menu').toggleClass('active-menu');
            $('.topmenu').toggleClass('active-menu');
            return false;
        });
        // TOGGLE ASIDE SUBMENU
        $('.main-wrapper:not(.unit) .menu-item-has-children > a').on('click', function (e) {
            // e.preventDefault();
        });
        var dataTop = $('.main-wrapper').data('top');
        if ($(window).width() > 991 && !$('body').hasClass('mob-main-menu') || $(window).width() > 1024 && $('body').hasClass('mob-main-menu')) {

            $('.main-wrapper').on('click', function (e) {
                if (!e.target.closest('.aside-menu')) {
                    $('.sub-menu-open').slideUp(400);
                }
            });

            $('.aside-menu .menu-item-has-children a').addClass('hide-drop');

            $('.aside-menu .menu-item a').on('click', function () {
                if ($(this).parent().hasClass('menu-item-has-children')) {
                    if ($(this).hasClass('hide-drop')) {
                        if ($(this).closest('.sub-menu').length) {
                            $(this).removeClass('hide-drop').next('.sub-menu').slideDown(400).removeClass('sub-menu-open');
                            $(this).parent().siblings().find('.sub-menu').slideUp(400).addClass('sub-menu-open');
                        } else {
                            $('.menu-item-has-children a').addClass('hide-drop').next('.sub-menu').hide(100).removeClass('sub-menu-open');
                            $(this).removeClass('hide-drop').next('.sub-menu').slideToggle(400).toggleClass('sub-menu-open');
                        }
                    } else {
                        $(this).addClass('hide-drop').next('.sub-menu').hide(100).find('.menu-item-has-children a').addClass('hide-drop').next('.sub-menu').hide(100);
                        $(this).next('.sub-menu').removeClass('sub-menu-open');
                    }
                }
            });


        } else {
            $('.menu-item-has-children a').removeClass('hide-drop');
        }
        if ($('.aside-fix').length && $(window).width() > dataTop) {
            var logoWidth = $('.logo span, .logo img').outerWidth();
            $('.logo').css('top', logoWidth + 'px');
        }
    }


    /*=================================*/
    /* FULL MENU */
    /*=================================*/

    $('.full-nav').on('click', function () {
            $('body').toggleClass('overflow-hidden');
            $(this).toggleClass('active'); // if ( $(window).width() > winWidth) {
            if ($('#topmenu').hasClass('open')) {

                $('.full-screen li.menu-item-has-children a').parent().removeClass('overflow');
                $('.full-screen li.menu-item-has-children a').next('.sub-menu').hide();

                $('#topmenu').toggleClass('open');
                setTimeout(function(){
                    $('#topmenu').stop().animate({'width': 'toggle'}, 500);
                }, 800);
            } else {
                $('#topmenu').stop().animate({'width': 'toggle'}, 500);
                setTimeout(function(){
                    $('#topmenu').toggleClass('open');
                }, 400);
            }
            return false;
    });
    if(($(window).width() > $('.main-wrapper').data('top')) && $('.full-screen li.menu-item-has-children a').length) {
        $('.full-screen li.menu-item-has-children a').on('click', function () {

            $(this).parent().toggleClass('overflow');
            $(this).next('.sub-menu').slideToggle();
            $(this).parent().siblings().find('.sub-menu').slideUp();
            $(this).parent().siblings().removeClass('overflow');

            var maxH = $(window).height() - $(this).next('.sub-menu').offset().top;
            $(this).next('.sub-menu').css('max-height', maxH - 100 )
        });
    }

    /*=================================*/
    /* MOBILE MENU */
    /*=================================*/
    $('.mob-nav').on('click', function (e) {
        e.preventDefault();
        $('html').addClass('no-scroll sidebar-open').height(window.innerHeight + 'px');
    });
    function calcTopMenu() {
        var winWidth = $(window).width();
        var mobWidth = $('.main-wrapper').data('top');
        if (winWidth < mobWidth) {
            if ($('#wpadminbar').length) {
                $('#topmenu').css('top', '46px');
            } else {
                $('#topmenu').css('top', '0');
            }
        } else {
            $('#topmenu').css('top', '0');
        }
    }
    $('.mob-nav-close').on('click', function (e) {
        e.preventDefault();
        $('html').removeClass('no-scroll sidebar-open').height('auto');
    });


    function fixedMobileMenu() {
        var headerHeight = $('.header_top_bg').not('.header_trans-fixed').outerHeight();
        var offsetTop;
        var dataTop = $('.main-wrapper').data('top');
        var adminbarHeight = $('#wpadminbar').outerHeight();
        if ($('#wpadminbar').length) {
            offsetTop = adminbarHeight + headerHeight;
            $('.header_top_bg').css('margin-top', adminbarHeight);
        } else {
            offsetTop = headerHeight;
        }
        if ($(window).width() < dataTop) {
            $('.main-wrapper').css('padding-top', offsetTop + 'px');
            $('.parallax-mirror').css('margin-top', offsetTop + 'px');
        } else {
            if ($('#wpadminbar').length && $('.header_top_bg').hasClass('header_trans-fixed')) {
                $('.main-wrapper').css('padding-top', adminbarHeight + 'px');
                $('.parallax-mirror').css('margin-top', adminbarHeight + 'px');
            } else {
                $('.main-wrapper').css('padding-top', '0');
                $('.parallax-mirror').css('margin-top', '0');
            }
        }
        if ($('#wpadminbar').length && $(window).width() < 768) {
            $('#wpadminbar').css({
                'position': 'fixed',
                'top': '0'
            })
        }
    }

    function menuArrows() {
        var mobW = $('.main-wrapper').attr('data-top');
        if (($(window).width() < mobW)) {
            if (!$('.menu-item-has-children i').length) {
                $('header .menu-item-has-children').append('<i class="ion-ios-arrow-down"></i>');
                $('header .menu-item-has-children i').addClass('hide-drop');
            }
            $('header .menu-item i').on('click', function () {
                if ($(this).parent().hasClass('menu-item-has-children') && !$(this).hasClass('animation')) {
                    $(this).addClass('animation');
                    if ($(this).hasClass('hide-drop')) {
                        if ($(this).closest('.sub-menu').length) {
                            $(this).removeClass('hide-drop').prev('.sub-menu').slideToggle(400);
                        } else {
                            $('.menu-item-has-children i').addClass('hide-drop').next('.sub-menu').hide(100);
                            $(this).removeClass('hide-drop').prev('.sub-menu').slideToggle(400);
                        }
                    } else {
                        $(this).addClass('hide-drop').prev('.sub-menu').hide(100).find('.menu-item-has-children a').addClass('hide-drop').prev('.sub-menu').hide(100);
                    }
                }
                setTimeout(removeClass, 400);

                function removeClass() {
                    $('header .menu-item i').removeClass('animation');
                }
            });
        } else {
            $('header .menu-item-has-children i').remove();
        }
    }

    /*=================================*/
    /* ANIMATION */
    /*=================================*/

    $.fn.isInViewport = function (offsetB) {
        if (!($(this).length)) return false;
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height() - offsetB;

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    function addAnimation() {

        if ($('.headings-wrap').length && $('.headings-wrap').hasClass('load-fade')) {
            var headings =  $('.headings-wrap.load-fade').find('.headings');
            headings.each(function () {
                var animationClass = 'animation';
                var elements = $(this).children();
                var headingOffsetB;
                if ($(window).width() > 1024) {
                    headingOffsetB = 50;
                } else {
                    headingOffsetB = 0;
                }
                if (elements.isInViewport(headingOffsetB)) {
                    elements.addClass(animationClass);
                } else {
                    elements.removeClass(animationClass);
                }
            });
        }
        if ($('.portfolio-grid').length || $('.portfolio-masonry').length) {
            $('.portfolio-grid, .portfolio-masonry').each(function () {
                if ($(window).scrollTop() >= $(this).offset().top - $(window).height() * .8) {
                    $(this).addClass('animation');
                }
            });
        }
    }

    function addTransition() {
        if ($('.headings-wrap').length && $('.headings-wrap').hasClass('load-fade')) {
            var headings =  $('.headings-wrap.load-fade').find('.headings');
            headings.each(function () {
                var elements = $(this).children();
                for (var i = 0; i < $(this).children().length; i++) {
                    elements.eq(i).addClass('fade-up transition-' + i);
                }
            });
        }
    }

    /*=================================*/
    /* HEADER SCROLL */
    /*=================================*/

    $(window).on('scroll', function () {
        if ($(this).scrollTop() >= 150) {
            if ($('.header_top_bg.header_trans-fixed').length) {
                $('.header_top_bg.header_trans-fixed').not('.fixed-dark').addClass('bg-fixed-color');
                $('.fixed-dark').addClass('bg-fixed-dark');
                $('.logo-hover').show();
                $('.main-logo').hide();
            }
        } else {
            if ($('.header_top_bg.header_trans-fixed').length) {
                $('.header_top_bg.header_trans-fixed').not('.fixed-dark').removeClass('bg-fixed-color');
                $('.fixed-dark').removeClass('bg-fixed-dark');
                $('.logo-hover').hide();
                $('.main-logo').show();
            }
        }
    });

    /*=================================*/
    /* ABOUT SECTION */
    /*=================================*/

    $('.about-hamburger').on('click', function () {
        $('.about-mob-section-wrap').toggleClass('open');
        $('body').toggleClass('overflow-full');
        $(window).resize();
    });

    /*=================================*/
    /* BLOG */
    /*=================================*/

    /* MAGNIFIC POPUP VIDEO */
    function popupVideo() {
        if ($('.blog .video-content-blog').length || $('.single-post .video-content-blog').length) {
            $('.play').each(function () {
                $(this).magnificPopup({
                    disableOn: 700,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: true,
                    fixedBgPos: true
                });
            });
        }
    }

    // image slider
    // ---------------------------------
    if ($('.img-slider').length) {
        $('.img-slider .slides').each(function () {
            $(this).slick({
                fade: true,
                autoplay: true,
                autoplaySpeed: 5000,
                speed: 500,
                dots: false,
                prevArrow: "<div class='flex-prev'><i class='ion-android-arrow-back'></i></div>",
                nextArrow: "<div class='flex-next'><i class='ion-android-arrow-forward'></i></div>"
            });
        })
    }

    // Equal height for blog
    function equalHeight() {
        if ($('.metro').length && $(window).width() > 767) {
            $('.metro .post-wrap-item').css('height', 'auto').equalHeights();
        } else if ($('.metro').length) {
            $('.metro .post-wrap-item').css('height', 'auto');
        }

        if ($('.post-slider-wrapper.slider_progress').length) {
            $('.post-slider-wrapper.slider_progress .content-wrap').css('height', 'auto').equalHeights();
        }
    }

    // Load more for blog
    function load_more_blog_posts() {
        // Load More Portfolio
        if (window.load_more_blog_posts) {

            var pageNum = parseInt(window.load_more_blog_posts.startPage) + 1;

            // The maximum number of pages the current query can return.
            var max = parseInt(window.load_more_blog_posts.maxPage);

            // The link of the next page of posts.
            var nextLink = window.load_more_blog_posts.nextLink;

            // wrapper selector
            var wrap_selector = '.blog.metro .row, .blog.center, .blog.masonry';

            //button click
            $('.js-load-more').on('click', function (e) {

                var $btn = $(this),
                    $btnText = $btn.html();
                $btn.html('loading...');

                if (pageNum <= max) {

                    var $container = $(wrap_selector);
                    $.ajax({
                        url: nextLink,
                        type: "get",
                        success: function (data) {
                            var newElements = $(data).find('.blog.metro .post, .blog.center .post, .blog.masonry .post ');
                            var elems = [];

                            newElements.each(function (i) {
                                elems.push(this);
                            });

                            $container.append(elems);
                            $container.find('img[data-lazy-src]').foxlazy();

                            wpc_add_img_bg('.s-img-switch');
                            if ($(window).width() > 767) {
                                $('.metro .post-wrap-item').css('height', 'auto').equalHeights();
                            } else {
                                $('.metro .post-wrap-item').css('height', 'auto');
                            }

                            $('img[data-lazy-src]').foxlazy();
                            pageNum++;
                            nextLink = nextLink.replace(/\/page\/[0-9]?/, '/page/' + pageNum);

                            $btn.html($btnText);

                            if (pageNum == ( max + 1 )) {
                                $btn.hide('fast');
                            }
                        }
                    });
                }
                return false;
            });
        }
    }





// Likes for blog
    function toggleLikeFromCookies($element, postId) {
        if (document.cookie.search(postId) === -1) {
            $element.removeClass('post__likes--liked');
        } else {
            $element.addClass('post__likes--liked');
        }
    }

    var $likes = $('.post__likes');

    for (var i = 0; i < $likes.length; i++) {
        toggleLikeFromCookies($likes.eq(i), $likes.eq(i).attr('data-id'));
    }

    $likes.on('click', function (e) {
        var $this = $(this),
            post_id = $this.attr('data-id');
        $this.toggleClass('post__likes--liked');
        $this.addClass('post__likes--disable');

        $.ajax({
            type: "POST",
            url: get.ajaxurl,
            data: ({
                action: 'yuk_like_post',
                post_id: post_id
            }),
            success: function (msg) {
                $this.closest('.likes-wrap').find('.count').text(msg);
                toggleLikeFromCookies($this, post_id);
                $this.removeClass('post__likes--disable');
            }
        });
        return false;
    });

    // isotope
    function initBlogIsotope() {
        if ($('.izotope-blog').length) {
            var self = $('.izotope-blog');
            var layoutM = 'masonry';
            self.isotope({
                itemSelector: '.post',
                layoutMode: layoutM,
                masonry: {
                    columnWidth: '.post'
                }
            });

        }
    }

    // back to top
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });

    /*=================================*/
    /* PORTFOLIO DETAIL */
    /*=================================*/

    if ($('.light-gallery').length) {

        $('.light-gallery').each(function () {
            var thumb = (typeof $(this).attr('data-thumb') !== undefined) && (typeof $(this).attr('data-thumb') !== false) ? $(this).attr('data-thumb') : true;
            thumb = thumb === 'false' ? false : true;

            var selector = $(this).closest('.metro_3, .metro_4').length ? '.gallery-item-wrap' : '.gallery-item:not(.popup-details)';

            $(this).lightGallery({
                selector: selector,
                mode: 'lg-slide',
                closable: true,
                iframeMaxWidth: '80%',
                download: false,
                thumbnail: true,
                showThumbByDefault: thumb
            });
        });
    }

    function initIsotope() {
        if ($('.izotope-container').length) {
            $('.izotope-container').each(function () {
                var self = $(this);
                var layoutM = self.attr('data-layout') || 'masonry';
                self.isotope({
                    itemSelector: '.gallery-item',
                    layoutMode: layoutM,
                    masonry: {
                        columnWidth: '.gallery-item, .grid-sizer',
                        gutterWidth: 30
                    }
                });
            });
        }

        if ($('.masonry .light-gallery').length) {
            $('.masonry .light-gallery').each(function () {
                var self = $(this);
                var layoutM = self.attr('data-layout') || 'masonry';
                self.isotope({
                    itemSelector: '.gallery-item',
                    layoutMode: layoutM,
                    masonry: {
                        columnWidth: '.gallery-item',
                        'gutter': 30
                    }
                });
            });
        }

        if ($('.grid .light-gallery').length) {
            $('.grid .light-gallery').each(function () {
                var self = $(this);
                var layoutM = self.attr('data-layout') || 'masonry';
                self.isotope({
                    itemSelector: '.gallery-item-wrap',
                    layoutMode: layoutM,
                    masonry: {
                        columnWidth: '.gallery-item-wrap',
                        'gutter': 30
                    }
                });
            });
        }


    }

    function leftGalleryImages() {
        if ($('.portfolio-single-content.left_gallery img').length) {
            $("img[data-lazy-src]").foxlazy();
            $('.portfolio-single-content.left_gallery img').each(function () {
                var height = $(this).height();
                var width = $(this).width();
                if (height > width) {
                    $(this).addClass('vertical');
                } else {
                    $(this).addClass('horizontal');
                }
            });
        }
    }

    pageCalculations(function () {
        if (!window.enable_foxlazy) {
            wpc_add_img_bg('.s-img-switch');
        }

        /* fix for splited slider */
        wpc_add_img_bg('.ms-section .s-img-switch');
        wpc_add_img_bg('.woocommerce .s-img-switch');
    });

    function popup_image() {
        if ($('.popup-image').length) {
            $('.popup-image').each(function () {
                $(this).lightGallery({
                    selector: 'this',
                    mode: 'lg-slide',
                    closable: true,
                    iframeMaxWidth: '80%',
                    download: false,
                    thumbnail: true
                });
            });
        }
    }

    popup_image();


    $('.product button[type="submit"]').on('click', function () {
        $("img[data-lazy-src]").foxlazy();
    });

    /*product slider*/
    if ($('.yuk_images').length) {
        $('.product-gallery-wrap').each(function () {
            $(this).slick({
                dots: false,
                arrows: false,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                asNavFor: '.product-gallery-thumbnail-wrap',
                fade: true,
                draggable: false
            })
        });
        $('.product-gallery-thumbnail-wrap').each(function () {
            $(this).slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: false,
                arrows: false,
                asNavFor: '.product-gallery-wrap',
                vertical: false,
                focusOnSelect: true,
                responsive: [
                    {
                        breakpoint: 770,
                        settings: {
                            slidesToShow: 3,
                            vertical: false
                        }
                    }
                ]
            })
        })
    }

    /* ------------------------------------------- */
    /* EVENT ASIDE FIXED */

    /* ------------------------------------------- */
    function asideFixed() {
        $('.js-fixed-aside').each(function (index, el) {
            if ($(this).outerWidth() < 0.75 * $(window).outerWidth()) {
                // add animation
                $(this).css('transition', 'transform 500ms');

                var parent = $(this).closest('.js-fixed-parent');

                var parentHeight = parent.outerHeight();
                var itemHeight = $(this).outerHeight();
                var headerHeight = $('.header_trans-fixed').outerHeight() + $('#wpadminbar').outerHeight();

                var parentOffset = parent.offset().top;
                var scrollPosition = $(window).scrollTop();
                var positionAsideTop = scrollPosition - (parentOffset - headerHeight) + 30;
                var positionAsideBottom = positionAsideTop - (parentHeight - itemHeight);

                if (positionAsideTop > 0 && (positionAsideBottom < 0)) {
                    $(this).css('transform', 'translateY(' + positionAsideTop + 'px)');
                } else if (positionAsideBottom > 0) {
                    $(this).css('transform', 'translateY(' + (parentHeight - itemHeight) + 'px)');
                } else {
                    $(this).css('transform', 'translateY(0px)');
                }
            } else {
                $(this).css('transform', 'translateY(0px)');
            }
        });
    }

    /**********************************/
    /* VIDEO CONTROLS */

    /**********************************/

    function onYouTubeIframeAPIReady() {
        if (_ismobile) {
            $('.iframe-video').removeClass('play').find('.play-button').removeClass('start');
        }

        var player = [],
            $iframe_parent = [],
            $this;

        // each all iframe
        $('.iframe-video.youtube iframe').each(function (i) {
            // get parent element
            $this = $(this);
            $iframe_parent[i] = $this.closest('.iframe-video.youtube');
            // init video player

            player[i] = new YT.Player(this, {
                // callbacks
                events: {
                    'onReady': function (event) {
                    },
                    'onStateChange': function (event) {
                        switch (event.data) {
                            case 1:
                                // start play
                                if (($iframe_parent[i].data('mute')) && ($iframe_parent[i].find('.mute-button').hasClass('mute1'))) {
                                    player[i].mute();
                                } else {
                                    player[i].unMute();
                                }
                                break;
                            case 2:
                                // pause
                                $iframe_parent[i].removeClass('play').find('.play-button').removeClass('start');
                                break;
                            case 3:
                                // buffering
                                break;
                            case 0:
                                // end video
                                $iframe_parent[i].removeClass('play').find('.play-button').removeClass('start');
                                break;
                            default:
                                '-1'
                            // not play
                        }
                    }
                }
            });

            var muteButton = $iframe_parent[i].find('.mute-button');
            // mute video
            if (muteButton.length) {
                muteButton.on('click', function () {
                    if (muteButton.hasClass('mute1')) {
                        player[i].unMute();
                        muteButton.removeClass('mute1');
                    } else {
                        player[i].mute();
                        muteButton.addClass('mute1');
                    }
                });
            }

            // click play/pause video
            $iframe_parent[i].find('.play-button').on('click', function (event) {
                event.preventDefault();
                var $parent = $iframe_parent[i];
                if ($parent.hasClass('play')) {
                    player[i].pauseVideo();
                    $parent.removeClass('play').find('.play-button').removeClass('start');
                } else {
                    player[i].playVideo();
                    $parent.addClass('play').find('.play-button').addClass('start');
                }
            });

            // stop video
            $iframe_parent[i].find('.video-close-button').on('click', function () {
                player[i].stopVideo();
                $iframe_parent[i].removeClass('play').find('.play-button').removeClass('start');
            });
        });
    };

    var gridWrapper = $('.tg-grid-wrapper');
    if (gridWrapper.length) {
        window.addEventListener('load', function () {
            window.dispatchEvent(new Event('resize'));
        });
    }

    /* Copyright */
    if ($('.yuk_copyright_overlay').length) {
        $(document).on('contextmenu',function(event){
            if($('.yuk_copyright_overlay').hasClass('copy')){
                event.preventDefault();
            }else if(event.target.tagName != 'A'){
                event.preventDefault();
            }
            $('.yuk_copyright_overlay').addClass('active');
        }).on('click', function(){
            $('.yuk_copyright_overlay').removeClass('active').removeAttr('style');
        });
    }

// contact form focus
    if ($('.contacts-info-wrap.info_with_form').length || $('.call-to-action.classic_form').length) {
        $('.contacts-info-wrap.info_with_form, .call-to-action.classic_form').delegate( "*", "focus blur", function() {
            var elem = $( this );
            setTimeout(function() {
                elem.parent().toggleClass( "focused", elem.is( ":focus" ) );
            }, 0 );
        })
    }

    // remove frameborder for iframe
    $(window).on('load', function () {
       $('iframe').removeAttr('frameborder');
    });

    // remove () for filter in grid
    $(window).on('load', function () {
        if ($('.tg-filter-name').length) {
            $('.tg-filter-name').each(function () {
                var text = $(this).text().replace(/[0-9]|\(|\)/g, '');
                var number = $(this).find('.tg-filter-count').text();
                $(this).text(text + '');
                var element = $(this).append('<span class="tg-filter-count">' + number + '</span>');
            });
        }
    });




    $(window).on('load', function () {
        setTimeout(function () {
            $(window).resize();
        }, 600);
        if ($('.spinner-preloader-wrap').length) {
            $('.spinner-preloader-wrap').fadeOut(500);
        }
        if ($('.preloader-modern').length) {
            $('.preloader-modern').fadeOut(500);
        }
        wpc_add_img_bg('.s-img-switch');
        canvasWrap();
        toggleAsideMenu();
        addTransition();
        $("img[data-lazy-src]").foxlazy('', function (){
            initIsotope();
        });
        // fix
        setTimeout(function () {
            $(window).scroll();
        }, 300);
        setTimeout(function () {
          initIsotope();
        }, 500);
        popupVideo();
        load_more_blog_posts();
        onYouTubeIframeAPIReady();

    });
    $(window).on('scroll resize', function () {
        addAnimation();
        asideFixed();
    });
    $(window).on('load resize', function () {
        setTimeout(function () {
            initIsotope();
        }, 500);
    });
    $(window).on('load resize', function () {
        setTimeout(initSwiper, 100);
        footerWidgetsHeight();
        calcPaddingMainWrapper();
        topBannerHeight();
        calcTopMenu();
        fixedMobileMenu();
        menuArrows();
        initBlogIsotope();
        asideFixed();
        $("img[data-lazy-src]").foxlazy('', function () {
            setTimeout(initBlogIsotope, 500);
            setTimeout(initIsotope, 500);
        });
        setTimeout(equalHeight, 1);
        portfolioAlbum();
        leftGalleryImages();
    });
    window.addEventListener("orientationchange", function () {
        initSwiper();
        footerWidgetsHeight();
        calcPaddingMainWrapper();
        topBannerHeight();
        calcTopMenu();
        fixedMobileMenu();
        menuArrows();
        equalHeight();
        portfolioAlbum();
        initIsotope();
    });
})(jQuery, window, document);