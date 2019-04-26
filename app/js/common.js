$(function() {
    
    new WOW().init();
    
    var $rangeSlider = $('main .feedback .range-slider');
    var $homeTopSlider = $('.home-top-slider'),
        $fbSlider = $('.feedback__slider'),
        $gallerySlider = $('.gallery__slider');
    $homeTopSlider.slick({
        dots: true,
        customPaging: function(slide, index) {
            return `<div class="bg"></div>`;
        } 
    });
    
    $homeTopSlider.on('afterChange', function(e, slick, currentSlide, nextSlide) {
        var $crSlide = currentSlide; 
        $('main .custom-dots li').eq($crSlide).addClass('slick-active').siblings().removeClass('slick-active');
    });
    
    var amount;
    $fbSlider.on('init', function(event, slick) {
        amount = slick.slideCount;
    });
    
    $fbSlider.on('afterChange', function(e, slick, currentSlide, nextSlide) {
        $rangeSlider.attr('data-count', currentSlide + 1);
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
        nextArrow: $('.gallery__arows li.next a')
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
            }, 600);
        } else {
            $(this).removeClass('open');
            $blr.removeClass('bluring');
            $popupMenu.animate({
                opacity: 0,
                top: 0 + "px"
            }, 600, function() {
                $(this).hide();
            });
        }
    });
    
    $('form .form-row div > div input, form .form-row div > div textarea').focus(function() {
        $(this).parent().addClass('focusing'); 
    });
    
    $('form .form-row div > div input, form .form-row div > div textarea').blur(function() {
        $(this).parent().removeClass('focusing'); 
    });
    
    var $dotsClone = $homeTopSlider.find('.slick-dots').clone(true),
        $customDots = $('main .custom-dots');
    $homeTopSlider.find('.slick-dots').remove();
    $customDots.html($dotsClone);
    
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
    
    $('main .feedback__slider .user-info .rating-stars ul li').hover(function() {
        var onStar = parseInt($(this).data('value'), 10); 
        $(this).parent().children('li.star').each(function(e) {
            if (e < onStar) {
                $(this).addClass('hover');
            } else {
                $(this).removeClass('hover');
            }
        });
     }, function() {
        $(this).parent().children('li.star').each(function(e) {
            $(this).removeClass('hover');
        }); 
     });
    
    
    $('main .feedback__slider .user-info .rating-stars ul li').click(function() {
        var onStar = parseInt($(this).data('value'), 10), stars = $(this).parent().children('li.star');
    
        for (var i = 0; i < stars.length; i++) {
          $(stars[i]).removeClass('selected');
        }

        for (var i = 0; i < onStar; i++) {
          $(stars[i]).addClass('selected');
        }
    });
    
    $('.feedback .range-slider').slider({
        range: "min",
        min: 0,
        max: amount, 
        slide: function(e, ui) {
            $fbSlider.slick('slickGoTo', ui.value);
        }
    });
    
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
    
    var $companyContentArea = $('.company__tab-content .tab .scroll-box');
    $companyContentArea.niceScroll({
        cursoropacitymin: 1,
        cursorborderradius: "0px",
        background: "#e8e8e8",
        cursorwidth: "10px"
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
    
    $('.modal-form .modal-close').click(function() {
        $('.modal-form')
            .animate({
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
        $blr.addClass('bluring');
    });
    
    var $gsLinesHeight = $('.lines-bg').height();
    var $gsLines = $('.lines-bg .gs-lines img').eq(0);
    console.log($gsLinesHeight);
    var $topPosLine = parseInt($gsLines.css('top'));
    console.log($('footer').position().top);
    
    $(window).scroll(function() {
        if($(this).scrollTop() >= 100) {
            $hdr.addClass('sticky');  
            $('.popup-menu').addClass('sticky');
        } else {
            $hdr.removeClass('sticky');
            $('.popup-menu').removeClass('sticky');
        }
        
//        if($(this).scrollTop() < $gsLinesHeight) {
//            $gsLines.animate({
//                top: '+=35px'
//            }, 200);   
//        } else {
//            
//        }
        
        //console.log($(this).scrollTop());
    });
    
//    console.log($('.lines-bg .gs-lines .col:first-child').width());
    
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
            }, 'fast');
        }
    });
    
    var $hdrLnks = $('.header__links');
    var $hdrLnksClone = $hdrLnks.clone(true);
    var $popupMenuContainer = $('.popup-menu .numbers');
    if($(window).width() < 992) {
        $hdrLnks.remove();
        $popupMenuContainer.html($hdrLnksClone);
    }
    
    
    
    
    
//    $(document).on('scroll', function (){
//        $('.caption-bg').each(function(i, el) {
//            var postion = $(el).offset().top,
//                height = $(el).height(),
//                scroll = $(document).scrollTop(),
//                elem = $(el)
//            if(scroll  > postion && scroll < (postion + height) ) {
//                $('.caption-bg').eq(i).addClass('dots-fill');
//            } else {
//                $('.caption-bg').eq(i).removeClass('dots-fill');
//            }   
//        })
//    });
    
});
  
