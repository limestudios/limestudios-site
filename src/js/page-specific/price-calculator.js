(function($) {
  
  var currentCategory = "Web";
  
  $(function() {
    selectCategory();
  });
  
  function selectCategory() {
    $('.category-selection input').click(function(event) {
      event.preventDefault();
      var button = event.target;
      //var category = document.query('category-name');
      var categoryName = button.getAttribute('value');
      $('.category-selection label').removeClass('active');
      $(button).parent().addClass('active');
      currentCategory = categoryName;
      $('.category-name').animate({'opacity': 0}, 200, function () {
        $(this).text(categoryName);
      }).animate({'opacity': 1}, 200);
      
      var tempSection = 'section.' + currentCategory;
      //alert(tempSection);
      $('.category-sections').animate({'opacity': 0}, 200, function () {
        $('.category-sections section').removeClass('active');
        $('.category-sections section').hide();
        $(tempSection).addClass('active');
        $(tempSection).show();
      }).animate({'opacity': 1}, 200);
    });
  }
}) ( jQuery );