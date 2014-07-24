(function($) {
  $(function() {
  
    $('a.project').click(function(event) {
      event.preventDefault();
      var class = $(this).attr('href');
      $('.work-belt').css('left','-100%');
      $('.thumb-container').css('opacity','0');
      $('.work-container div.' + class).show();
      $('.work-container article.' + class).show();
      $('.work-container').css('opacity','1');
      $('html, body').animate({
        screenTop: ($("article").first().offset().top)
      }, 1000);
    });

    $('.work-return').click(function(event) {
      event.preventDefault();
      var class = $(this).attr('back');
      $('.work-belt').css('left','0%');
      $('.thumb-container').css('opacity','1');
      $('.work-container div.' + class).hide(500);
      $('.work-container article.' + class).hide(500);
      $('.work-container').css('opacity','0');
      console.log('.work-container article.' + class);
    });

  });
}) ( jQuery );