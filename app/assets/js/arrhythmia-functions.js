$(window).scroll(function() {
	var wScroll = $(this).scrollTop();
	
	if(wScroll > $('.arrhythmia-pics').offset().top - $(window).height()/1.2) {
		$('.arrhythmia-pics figure').each(function(i) {
			setTimeout(function(){
				$('.arrhythmia-pics figure').eq(i).addClass('is-showing');
			}, 100 * (i+1));
		});
	}
});

$(window).load(function() {
    var wScroll = $(this).scrollTop();
	
	if(wScroll > $('.arrhythmia-pics').offset().top - $(window).height()) {
		$('.arrhythmia-pics figure').each(function(i) {
			setTimeout(function(){
				$('.arrhythmia-pics figure').eq(i).addClass('is-showing');
			}, 100 * (i+1));
		});
	}
});