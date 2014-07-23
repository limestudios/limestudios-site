(function($) {
  $(function() {
  
    $('.thumb-unit').click(function() {
      $('.work-belt').css('left','-100%');
      $('.work-container').show();
    });

    $('.work-return').click(function() {
      $('.work-belt').css('left','0%');
      $('.work-container').hide(125);
    });

  });
}) ( jQuery );