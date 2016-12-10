jQuery(function($) {
    //caches a jQuery object containing the header element
    var scroll = $(window).scrollTop();
    var header = $(".header-position");
    var contentWrap = $(".content-wrap");

    $(document).ready(function() {
        header.height(64);
        if(scroll >= 64)
            header.removeClass("fade-in").addClass("fade-out");
        else
            header.removeClass("fade-out").addClass("fade-in");
    });

    $(window).scroll(function() {
        scroll = $(window).scrollTop();
        if(scroll >= 64)
            header.removeClass("fade-in").addClass("fade-out");
        else
            header.removeClass("fade-out").addClass("fade-in");
    });

  // handle links with @href started with '#' only
  $(document).on('click', 'a[href^="#"]', function(e) {
    // target element id
    var id = $(this).attr('href');

    // target element
    var $id = $(id);
    if ($id.length === 0) {
        return;
    }

    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();

    // top position relative to the document
    var pos = $(id).offset().top - 64;

    // animated top scrolling
    $('body, html').animate({scrollTop: pos});
  });
});
