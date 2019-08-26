(function($) {
  Drupal.behaviors.curriculum_correct_urls= {
    attach: function(context, settings) {
		if(window.location.hostname == "qa.curriculum.gov.bc.ca"){

			/* Correct URLS*/
			$(".content a").each(function(){
				var attr = $(this).attr('href');
				if (typeof attr !== typeof undefined && attr !== false) {
					var str = attr.replace("\/curriculum.gov.bc.ca","/qa.curriculum.gov.bc.ca");
					$(this).attr("href",str);
				}	
			});
			/*Correct image URLS*/
			$(".content img").each(function(){
				var attr = $(this).attr('src');
				if (typeof attr !== typeof undefined && attr !== false) {
					var str = attr.replace("\/curriculum.gov.bc.ca","/qa.curriculum.gov.bc.ca");
					$(this).attr("src",str);
				}	
			});			
		}	
	 }
  };
})(jQuery);