$(document).ready(function(){
  $('.category-button').click(function(){
     var clickedItemID = $(this).attr('id');
     $('.category-button').removeClass('active');
     $(this).addClass('active');
     if(clickedItemID === 'all') {
       $('.portfolio-element').removeClass('active');
       $('.portfolio-element').addClass('active');
     } else {
       $('.portfolio-element').removeClass('active');
       $('.portfolio-element.'+clickedItemID).addClass('active');
     }
   });
});
