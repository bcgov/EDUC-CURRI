(function ($) {
  Drupal.behaviors.curriculum_continuous_view = {
    attach: function (context, settings) {
		

		  // Use context to ensure the link is only ever activated if it's regenerated.
		var contentWidth = $(".view-curriculum-one-pager").width();
		$('.bi.modal_lightbox').css({
			"left": "-" + (($(window).width()-contentWidth)/2) + "px",
		
		});
		$('.ccg.modal_lightbox').css({
			"left": "-" + (($(window).width()-contentWidth)/2)-30 + "px",
		
		});		
	
		$('.modal_content').css("width",$(window).width());


	//continuous view button initial
		$('.continuous-view-btn.bi', context).once('ctn-btn', function () {
		  $(this).each(function(){
			//$(this).next().css("left",offset); 
			$(this).next('.modal_lightbox').css("width",$(window).width());
			 new Drupal.ajax('.continuous-view-btn.bi', this, {
			  url: $(this).attr('href')+"#cv_default_grade",
			  settings: {},
			  event: 'click tap'
			})
		  });		
		  
		});
		$('.continuous-view-btn', context).once('ctn-btn', function () {
		  $(this).each(function(){
			//$(this).next().css("left",offset); 
			$(this).next('.modal_lightbox').css("width",$(window).width());
			 new Drupal.ajax('.continuous-view-btn', this, {
			  url: $(this).attr('href')+"#cv_default_grade",
			  settings: {},
			  event: 'click tap'
			})
		  });		
		  
		});

		
		$('.continuous-view-btn').click(function(){
			
			$(this).css("display","none");
			$(this).prev().css("display","block");
			//$(this).next().next().next().next().css("margin-top","500px");
		});
		$('.continuous-view-btn-toggle').click(function(){
			
			$(this).next().next().hide();
			$(this).next().next().next().show();
			
		});
		
		//$(".continuous-view-bi .continuous-view-button-loaded").click(function(){
			//$(this).parent().parent().show();
			
		//});
		
		
		//continuous-view button after its been loaded
 		$("#continuous-view-bi .continuous-view-button-loaded").click(function(){

				console.log("bi");
				$(this).parent().parent().hide();
				$(this).parent().parent().next().show();	


		});	
		//continuous-view button after its been loaded
 		$(".continuous-view-button-loaded").click(function(){


				$(this).parent().parent().hide();
				$(this).parent().parent().prev().show();	


		});	
		$(".modal_lightbox").click(function(){
			//$(this).toggle();
		});	
    }
  };

}(jQuery));