(function($) {
  $(function() {
  
    $('a.project').click(function(event) {
      event.preventDefault();
      $('.work-belt').css('left','-100%');
      $('.work-container').show();
    });

    $('.work-return').click(function() {
      $('.work-belt').css('left','0%');
      $('.work-container').hide(125);
    });

  });
}) ( jQuery );