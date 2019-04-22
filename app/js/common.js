$(function() {
    var $homeTopSlider = $('.home-top-slider'),
        $fbSlider = $('.feedback__slider'),
        $gallerySlider = $('.gallery__slider');
    $homeTopSlider.slick({
        dots: true,
        customPaging: function(slide, index) {
            return `<div class="bg"></div>`;
        } 
    });
    
    $fbSlider.slick({
        slidesToShow: 3,
        slidesToScroll: 1
    });
    
    $gallerySlider.slick({
        slidesToShow: 4,
        arrows: true, 
        prevArrow: $('.gallery__arows li.prev a'),
        nextArrow: $('.gallery__arows li.next a')
    })
    
    var $hamburgerIcon = $('.header .toggle-mnu'),
        $blr = $('.blur-container'),
        $popupMenu = $('.popup-menu');
    $hamburgerIcon.click(function() {
        $blr.addClass('bluring');
        $popupMenu.show().animate({
            opacity: 1,
            top: 95 + "px"
        }, 600);
    });
    
    $blr.click(function() {
        $(this).removeClass('bluring');
        $popupMenu.animate({
            opacity: 0,
            top: 0
        }, 500, function() {
           $popupMenu.hide(); 
        });
    });
    
    $('main .relationship form .form-row div > div input, main .relationship form .form-row div > div textarea').focus(function() {
        $(this).parent().addClass('focusing'); 
    });
    
    $('main .relationship form .form-row div > div input, main .relationship form .form-row div > div textarea').blur(function() {
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
        } else {
            $workDesc.addClass('closing');
            $(this).siblings('p').text($res);
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
        range: "min"
    });
    
    var $tabContent = $('main .clients .tab-content');
    $('main .clients .tab-brands.left .tab-item').click(function() {
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
    

    
//    $('main .clients .tab-brands.right .tab-item').click(function() {
//        $(this).addClass('active').siblings().removeClass('active'); 
//    });

});

