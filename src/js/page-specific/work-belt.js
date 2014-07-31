(function($) {
  $(function() {
    workBelt();
    workLoad();
  });
  
  function workBelt() {
    $('a.block-panel').click(function(event) {
      event.preventDefault();
      $('.work-belt').css('left','-100%');
      $('.work-container').show(200);
      $('footer').fadeOut(100).fadeIn(500);
    });

    $('.work-return').click(function(event) {
      event.preventDefault();
      $('.work-belt').css('left','0%');
      $('.work-container').hide(200);
      $('footer').fadeOut(100).fadeIn(500);
    });
  }
  
  function workLoad() {
    
    $.ajaxSetup ({ cache: true });
    
    $('a.block-panel').click(function() {
      
      var $this = $(this),
          newTitle = $this.find('p.info span.title').text(),
          newFolder = $this.data('folder'),
          spinner = '<div class="loader">Loading...</div>',
          newHTML = '/work/'+ newFolder +'/index.html';
      
      $('.project-load').html(spinner).load(newHTML);
      $('.project-title').text(newTitle);
      
    });
    
  }

}) ( jQuery );