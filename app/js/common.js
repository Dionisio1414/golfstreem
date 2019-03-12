$(function() {
    var $homeTopSlider = $('.home-top-slider'),
        $fbSlider = $('.feedback__slider');
    $homeTopSlider.slick({
        dots: true,
        customPaging: function(slide, index) {
            return `<div class="bg"></div>`;
        } 
    });
    
    $fbSlider.slick({
        slidesToShow: 3
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
    
    var $h2 = $('h2');
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
    
    
//    $('main .clients .tab-brands.right .tab-item').click(function() {
//        $(this).addClass('active').siblings().removeClass('active'); 
//    });

});