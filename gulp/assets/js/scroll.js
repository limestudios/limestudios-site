$(function() {
    //caches a jQuery object containing the header element
    var header = $(".header-position");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        header.height(Math.max(64, Math.min(256-scroll, 256)));
        if(header.height() <= 64) {
          header.removeClass("normal").addClass("small");
        } else {
          header.removeClass("small").addClass("normal");
        }
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
