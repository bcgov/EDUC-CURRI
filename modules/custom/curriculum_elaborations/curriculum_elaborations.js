(function ($) {

  Drupal.behaviors.curriculum_elaborations = {
    attach: function (context, settings) {

		$('.open_elaboration', context).once('curriculum_elaborations', function () {
			$(".elaboration_content").each(function(){
				if($(this).html().length > 850){
					$(this).prev().css("display","block");
				}
				$(".open_elaboration").click(function(){
					var elaboration = $(this).parent().next().html();
					//console.log(elaboration)
					$.colorbox({html:"<p>" +  $(this).parent().next().html() + "</p>length: " + $(this).parent().next().html().length, width: "900px" });
		});
			
				
	
			});
		})
		$('.show_all_keyword_elaborations', context).once('curriculum_elaborations', function () {
			$(this).click(function(){
					if(	$(this).hasClass("hide_elaborations")){
						$(this).removeClass("hide_elaborations");
						$(this).addClass("show_elaborations");
						$(".view-display-id-attachment_2 .elaboration, .view-display-id-attachment_3 .elaboration").css({"display":"block", "margin-top":"6px"});
						$(".view-display-id-attachment_2 .elaboration, .view-display-id-attachment_3 .elaboration").prev().css({"padding-bottom":"10px", "background":"url('/sites/curriculum.gov.bc.ca/themes/curriculum/images/elaboration_arrow.png') no-repeat bottom center", "padding-bottom":"10px"});	
						$(".view-display-id-attachment_2 .elaboration , .view-display-id-attachment_3 .elaboration").show();
					}else{
						$(this).removeClass("show_elaborations");
						$(this).addClass("hide_elaborations");						
						$(".view-display-id-attachment_2 .elaboration, .view-display-id-attachment_3 .elaboration").css({"display":"none", "margin-top":"6px"});
						$(".view-display-id-attachment_2 .elaboration, .view-display-id-attachment_3 .elaboration").prev().css({"padding-bottom":"0px", "background":"none", "margin-top":"0px"});
						$(".view-display-id-attachment_2 .elaboration, .view-display-id-attachment_3 .elaboration").hide();
						//$(this).html("expand");
						//alert("2");

				}
			});
		})	
	
		$('.keyword_w_elaboration', context).once('curriculum_elaborations', function () {
			/*Disable the mouseover if not expanded*/
			$(this).mouseover(function(){
				var state = $(this).next(".elaboration").css('display');			
					if(state != "none"){
						$(".bt-wrapper").hide();
					}
			});
			/* JS for expanding elaboration within text*/
			$(this).click(function(){
				var state = $(this).next(".elaboration").css('display');
				if(!$(this).parent().parent().hasClass("bi")){
					$(this).next(".elaboration").slideToggle(function(){
						if(state == "none"){
							/*Show Elaboration and add arrow image*/
							$(this).css({"display":"block", "margin-top":"6px"});
							$(this).prev().css({"padding-bottom":"10px", "background":"url('/sites/curriculum.gov.bc.ca/themes/curriculum/images/elaboration_arrow.png') no-repeat bottom center", "padding-bottom":"10px"}).addClass("show_elaboration");	
						}else{
							/*Hide Elaboration and remove arrow image*/
							$(this).css({"display":"none"});
							$(this).prev().css({"padding-bottom":"0px", "background":"none", "margin-top":"0px", "padding-bottom":"10px"}).removeClass("show_elaboration");
						}
						
					});
				}
				
		
			});

		})

			
		$('.view-display-id-attachment_2 , .view-display-id-attachment_3', context).once('curriculum_elaborations', function () {
			$('.view-display-id-attachment_2 , .view-display-id-attachment_3').wrapAll("<div class='curriculum_content'></div>");
		});
		    //JS to add elaborations to curricular competency groups
		//alert($(".page-curriculum .view-display-id-attachment_2 .view-content h3").html());
		$("h3 span").each(function(){
			if($(this).html() == $(this).parent().next().find(".keyword_w_elaboration").html() ){
				$(this).parent().next().find(".cc").wrapInner("<h3></h3>").closest(".curric-comp").css("background", "none");	
				$(this).css("display","none");
				
			}
			
		});

    }
  };
  


}(jQuery));