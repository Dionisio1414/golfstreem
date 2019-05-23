$(function() {
    
    var $rangeSlider = $('main .feedback .range-slider');
    var $homeTopSlider = $('.home-top-slider'),
        $fbSlider = $('.feedback__slider'),
        $gallerySlider = $('.gallery__slider');
    
    var svgcCircle = `                        <svg height="19" width="19">
                            <circle class="circle" cx="9" cy="9" r="7" stroke="#0093c1" stroke-width="4" fill-opacity="0"></circle>
                        </svg>`;
    
    var crSlide;
    
    $homeTopSlider.slick({
        autoplay: true,
        speed: 1000,
        dots: true,
        customPaging: function(slide, index) {
            return '<div class="bg">'+ svgcCircle +'</div>';
        } 
    })
    .on('beforeChange', function(e, slick, currentSlide) {
        crSlide = currentSlide;
        $('main .custom-dots li').eq(currentSlide).addClass('slick-active').siblings().removeClass('slick-active');
        console.log(crSlide);
    });   
    
    
    $('main .custom-dots li').click(function() {
        $(this).eq(currentSlide).addClass('slick-active').siblings().removeClass('slick-active');
    });
    
    var amount;
    $fbSlider.on('init', function(event, slick) {
        amount = slick.slideCount;
    });

    
    $fbSlider.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2
          }
        },        
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
    
    
    $gallerySlider.slick({
        slidesToShow: 4,
        arrows: true, 
        prevArrow: $('.gallery__arows li.prev a'),
        nextArrow: $('.gallery__arows li.next a'),
        responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3
          }
        },        
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    })
    
    var $hamburgerIcon = $('.header .toggle-mnu a'),
        $blr = $('.blur-container'),
        $popupMenu = $('.popup-menu');
    $hamburgerIcon.click(function(e) {
        e.preventDefault();
        if(!$(this).hasClass('open')) {
            $(this).addClass('open');
            $blr.addClass('bluring');
            $popupMenu.show().animate({
                opacity: 1,
                top: 95 + "px"
            }, 250);
            $('.lines-bg').animate({
                opacity: 0
            }, 300);
        } else {
            $(this).removeClass('open');
            $blr.removeClass('bluring');
            $popupMenu.animate({
                opacity: 0,
                top: 0 + "px"
            }, 250, function() {
                $(this).hide();
            });
            $('.lines-bg').animate({
                opacity: 1
            }, 300);
        }
    });
    
    $('form .form-row div > div input, form .form-row div > div textarea').focus(function() {
        $(this).parent().parent().addClass('focusing'); 
    });
    
    $('form .form-row div > div input, form .form-row div > div textarea').blur(function() {
        $(this).parent().parent().removeClass('focusing'); 
    });
    
    var $dotsClone = $homeTopSlider.find('.slick-dots').clone(true),
        $customDots = $('main .custom-dots');
    $homeTopSlider.find('.slick-dots').remove();
    $customDots.html($dotsClone);
    
    $(window).on('orientationchange', function(e) {
        $homeTopSlider.find('.slick-dots').remove();
        $customDots.html($dotsClone);
    });
    
    var $articlesSlider = $('.articles__slider');
    $articlesSlider.slick({
        arrows: true,
        prevArrow: $('.articles-arrows li:first-child a'),
        nextArrow: $('.articles-arrows li:last-child a')
    });
    
    var $h2 = $('.homepage .dots-caption h2, .about-company .dots-caption h2');
    $h2.each(function() {
        var $valueCaption = $(this).text();
        if($valueCaption.length > 11) $(this).css('max-width', '200px').addClass('wrap');    
    });
    
    
    var $workDescText = $('main .working__description p').text();
    var $anotherText, $res;
    if($workDescText.length > 500) {
        $res = $workDescText.slice(0, 497);
        $anotherText = $workDescText.slice(497);
        $res.toString();
        $('main .working__description p')
            .text($res)
            .addClass('closing');
    }
    
    var $workDesc = $('main .working__description p');
    $('main .working__description a').click(function(e) {
        e.preventDefault();
        if($workDesc.hasClass('closing')) {
            $workDesc.removeClass('closing')
            $(this).siblings('p').text($res + $anotherText); 
            $(this).css('bottom', '-36px');
        } else {
            $workDesc.addClass('closing');
            $(this).siblings('p').text($res);
            $(this).css('bottom', '-84px');
        }
    });
    
    var cStars = function(newPos) {
        $('.modal-form.review .modal-bottom form .rating ul li').removeClass('selected');
        for(var i = 0; newPos + 1 > i; i++) {
            $('.modal-form.review .modal-bottom form .rating ul li').eq(i).toggleClass('selected');
        }
    }
    
    var starsCount = $('.modal-form.review .modal-bottom form .rating ul li.selected').length;
    $('.modal-form.review .modal-bottom form .rating ul li').click(function() {
        cStars($(this).index());
        starsCount = $('.modal-form.review .modal-bottom form .rating ul li.selected').length;
        $('.modal-form.review .modal-bottom form .rating input').val(starsCount);
    });
    
    $('.modal-form.review .modal-bottom form .rating ul li').hover(function() {
         cStars($(this).index());
    }, function() {
        cStars(+starsCount - 1);
    });
    
    if($('.feedback .range-slider').length) {
        $('.feedback .range-slider').slider({
            range: "min",
            min: 0,
            max: amount - 1, 
            slide: function(e, ui) {
                $fbSlider.slick('slickGoTo', ui.value);
                $fbSlider.on('afterChange', function(e, slick, currentSlide, nextSlide) {
                    $rangeSlider.attr('data-count', currentSlide);
                });
            }
        });
    }

    
    var $tabContent = $('main .clients .tab-content');
    $('main .clients .tab-brands.left .tab-item').click(function() {
        $('main .clients .tab-brands.right .tab-item').removeClass('active');
        $(this).addClass('active').siblings().removeClass('active'); 
        $tabContent.removeClass('active').eq($(this).index()).addClass('active');
    });
    
    $('main .clients .tab-brands.right .tab-item').click(function() {
        $('main .clients .tab-brands.left .tab-item').removeClass('active');
        $(this).addClass('active').siblings().removeClass('active'); 
        $tabContent.removeClass('active').eq($(this).index()).addClass('active');
    });
    
    var $headerNumbers = $('.header__links > li:first-child');
    $headerNumbers.hover(function() {
        $(this).addClass('rotate');
        $(this).find('ul').slideDown(); 
    }, function() {
        $(this).removeClass('rotate');
        $(this).find('ul').slideUp();
    });
    
    var $attendanceTabs = $('.attendance__tabs .tab a'),
        $tabContents = $('.attendance .tabs-content .tab');
    $attendanceTabs.click(function(e) {
        e.preventDefault();
        $(this).parent().addClass('active').siblings().removeClass('active');
        $tabContents.removeClass('active').eq($(this).parent().index()).addClass('active');
    });
    
    var $accordionItem = $('.prices .container:last-child .accordion__item');
    $accordionItem.click(function(e) {
        $(this).toggleClass('open').find('.desc').slideToggle();
    });
    
    var $priceTab = $('.prices__tab-content .tab'),
        $tabLinks = $('.prices__tabs ul li');
    $tabLinks.on('click', 'a', function(e) {
        e.preventDefault();
    });
    $tabLinks.click(function() {
        $(this).addClass('active').siblings().removeClass('active');
        $priceTab.removeClass('active').eq($(this).index()).addClass('active');
    });
    
    var $companyTabItems = $('.company__tabs .tab-item'),
        $companyTabAreas = $('.company__tab-content .tab');
    $companyTabItems.click(function() {
        $(this).addClass('active').siblings().removeClass('active'); 
        $companyTabAreas.removeClass('active').eq($(this).index()).addClass('active');
    });
    
    
    var $makeOrder = $('.header__links li').last().find('a'),
        $srvcLinks = $('.attendance__navigation .order-service a, .languages__navigation .order-service a');
    $makeOrder.click(function(e) {
        e.preventDefault();
        $('.modal-form.orders')
            .css('display', 'block')
            .animate({
                opacity: 1
            }, 350); 
    });
    
    $srvcLinks.click(function(e) {
        e.preventDefault();
        $('.modal-form.orders').css('display', 'block').animate({
            opacity: 1
        }, 350);
    });
    
    $('.modal-form.orders .modal-bottom .col-radio input[type=radio]').eq(0).attr('id', 'client');
    $('.modal-form.orders .modal-bottom .col-radio input[type=radio]').eq(1).attr('id', 'business');
    
    $('.modal-form .modal-bottom form .col-radio .wpcf7-form-control-wrap+label').click(function() {
        console.log($(this).siblings('span').find('input'));
        if(!$(this).siblings('span').find('input').is(':checked')) {
            $(this).siblings('span').find('input').attr('checked', true);
            $(this).addClass('checked');
        } 
        
        if($(this).parent().siblings().find('label').hasClass('checked')) {
            $(this).parent().siblings().find('label').removeClass('checked');
            $(this).parent().siblings().find('span').find('input').attr('checked', false);
        }
    });
    
    $('.modal-form.calculating .modal-close').click(function() {
        $(this)
            .parent()
            .animate({
                opacity: 0
            }, 250, function() {
                $(this).css('display', 'none');
            });
        $blr.removeClass('bluring');
    });
    
    $('.feedback-socials .hidden-socials li:first-child a').click(function(e) {
        e.preventDefault();
    });
    
    $('.feedback-socials .hidden-socials li:first-child').click(function(e) {
        $('.modal-form.call')
            .css('display', 'block')
            .animate({
                opacity: 1
            }, 350);
        $blr.addClass('bluring');
        $('.lines-bg').animate({
            opacity: 0
        }, 300);
    });
    
    $('.modal-form.call .modal-bottom form').submit(function(e) {
        if(!$(this).hasClass('invalid') && $(this).hasClass('sent')) {
            return true;
        } 
            return false;
    });
    
    $('.modal-form.calculating > .modal-bottom > div form').submit(function(e) {
        var self = $(this);
        if(!$(this).hasClass('invalid') && $(this).hasClass('sent')) {
            return true;
        }
        
        return false;
     });
    
    $('.modal-form.call .modal-close').click(function() {
        $(this).parent().animate({
            opacity: 0
        }, 250, function() {
           $(this).css('display', 'none'); 
        });
        $('.lines-bg').animate({
            opacity: 1
        }, 300);
        $blr.removeClass('bluring');
    });
    
    $('.modal-form.review .modal-close').click(function() {
        $(this).parent().animate({
            opacity: 0
        }, 250, function() {
           $(this).css('display', 'none'); 
        });
        $blr.removeClass('bluring');
    });
    
    var $calculatePriceBtn = $('.prices__calculate a');
    var $hdr = $('header');
    var $dotsSection = $('main .caption-bg');
    $calculatePriceBtn.click(function(e) {
        e.preventDefault();
        $('.modal-form.calculating')
            .css('display', 'block')
            .animate({
                opacity: 1
            }, 350);
        $('.lines-bg').animate({
            opacity: 0
        }, 300);
        $blr.addClass('bluring');
    });
    
    var $gsLinesHeight = $('.lines-bg').height();
    var $gsLines = $('.lines-bg .gs-lines img').eq(0);
    var $topPosLine = parseInt($gsLines.css('top'));
    
    $(window).scroll(function(e) {   
        if($(this).scrollTop() >= 150) {
            $hdr.addClass('sticky');  
            $('.popup-menu').addClass('sticky');
        } else {
            $hdr.removeClass('sticky');
            $('.popup-menu').removeClass('sticky');
        }
    });
    
    var $languagesLinks = $('.languages__navigation .anchors ul li a'),
        $subServiceLinks = $('.attendance__navigation .anchors ul li a');
    $languagesLinks.click(function(e) {
        e.preventDefault();
        var $href = $(this).attr('href'), $top = $($href).offset().top;
        $('html, body').animate({
            scrollTop: $top
        }, 800);
    });
    
    $subServiceLinks.click(function(e) {
        e.preventDefault();
        var $href = $(this).attr('href'), $top = $($href).offset().top;
        $('html, body').animate({
            scrollTop: $top
        }, 800);
    });
    
    var $fbSocialBtn = $('.feedback-socials > a'),
        $fbSocialLi = $('.feedback-socials .hidden-socials li');
    $fbSocialBtn.click(function(e) {
        e.preventDefault();
        if(!$(this).hasClass('opened')) {
            $('.feedback-socials ul').css('display', 'block');
            $(this).addClass('opened');
            $fbSocialLi.eq(0).delay(300).animate({
                opacity: 1
            }, 'fast');
            $fbSocialLi.eq(1).delay(200).animate({
                opacity: 1
            }, 'fast');
            $fbSocialLi.eq(2).delay(100).animate({
                opacity: 1
            }, 'fast');
        } else {
            $(this).removeClass('opened');
            $fbSocialLi.eq(0).delay(300).animate({
                opacity: 0
            }, 'fast');
            $fbSocialLi.eq(1).delay(200).animate({
                opacity: 0
            }, 'fast');
            $fbSocialLi.eq(2).delay(100).animate({
                opacity: 0
            }, 'fast', function() {
                $('.feedback-socials ul').css('display', 'none'); 
            });
        }
    });
    
    var $hdrLnks = $('.header__links');
    var $hdrLnksClone = $hdrLnks.clone(true);
    var $popupMenuContainer = $('.popup-menu .numbers');
    if($(window).width() < 992) {
        $hdrLnks.remove();
        $popupMenuContainer.html($hdrLnksClone);
    }
    
    $(window).resize(function() {
        if($(this).width() < 992) {
            $hdrLnks.remove();
            $popupMenuContainer.html($hdrLnksClone);
        }
    });
    
    
    var $selectLanguageList = $('.modal-form.calculating .select-language ul li a');
    $('.modal-form.calculating .select-language span select').click(function(e) {
        $(this).parent().parent().toggleClass('open');
    });
    
    $selectLanguageList.click(function(e) {
        var valLi = $(this).text();
        $(this).closest('ul').siblings('input').val(valLi);
        $(this).closest('ul').slideUp().parent().removeClass('open');
    });
    
    
    $(window).on('scroll', function () {
        $('.dots-caption').each(function(i, el) {
            var $tp = $(window).scrollTop();
            var postion = $(el).offset().top - $hdr.height() * 5.5;
            if($tp > postion ) {
                $('.dots-caption').eq(i).addClass('fill');
            } else {
                $('.dots-caption').eq(i).removeClass('fill');
            }   
        });
    });
    
    $('.prices .container:last-child .accordion__item a').click(function(e) {
        e.preventDefault();
    });
    
    $('.modal-form.success-send .modal-close').click(function() {
        $(this).parent().removeClass('opened');
        $blr.removeClass('bluring');
    });
    
    $('.jobs__tabs ul li a').click(function(e) {
        e.preventDefault();
        $(this).parent().addClass('active').siblings().removeClass('active');
        $('.jobs__tab-content .tab').removeClass('active').eq($(this).parent().index()).addClass('active');
    });
    
    $('.modal-form.orders .modal-close').click(function() {
        $(this)
            .parent()
            .animate({
                opacity: 0
            }, 350, function() {
                $(this).css('display', 'none')
            }); 
    });
    
    $('.attendance__navigation .anchors ul li a, .languages__navigation .anchors ul li a').click(function() {
        $(this).parent().addClass('active').siblings().removeClass('active');
    });
    
    $('main .relationship form').submit(function() {
        if($(this).find('input').hasClass('wpcf7-not-valid')) {
            console.log(true);
        }
    });
    
    var $win = $(window);
    var $sidebar = $('.attendance__navigation .anchors, .languages__navigation .anchors');
    if($sidebar.length) {
    var $sidebarTop = $sidebar.offset().top;
    
    $win.scroll(function(e) {
        if($(this).scrollTop() > $sidebarTop && $(this).width() > 992) {
            $sidebar.css('position', 'fixed').stop().animate({
                marginTop: $(window).scrollTop() - 380
            }, 1000);
        } else {
            $sidebar.css('position', 'static').stop().animate({
                marginTop: 0
            }, 1000);
        }
    });    
    }

    
});


