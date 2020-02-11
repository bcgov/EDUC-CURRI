Drupal.behaviors.everyPage = {
    attach: function(context, settings) {
        (function($) {
			 
			
            var windowWidth = $(window).width();

            var offset = $("#menu-3057-1").offset();
            $('.megamenu').css("width", windowWidth);
            $('.megamenu').css("left", "-" + (offset.left + 50) + "px");

            $(".close_megamenu").click(function() {
                $("#menu-3057-1 ul.sf-megamenu").addClass("sf-hidden");
                $(".sf-clicked").removeClass("sf-clicked");

            });
            $("#applied-design-skills-technology").click(function() {
                $(".subject-courses").removeClass("selected");
                $("#applied-design-skills-technology-list").addClass("selected");

                $(".subject-select-option").removeClass("selected");
                $(this).addClass("selected");

            });
            $(".applied-skills .10-12").click(function() {
                $(".subject-courses").removeClass("selected");
                $("#applied-design-skills-technology-list").addClass("selected");
                $(".subject-select-option").removeClass("selected");
                $("#applied-design-skills-technology").addClass("selected");

            });
            $("#all").click(function() {
                $(".subject-courses").removeClass("selected");
                $("#all-list").addClass("selected");

                $(".subject-select-option").removeClass("selected");
                $(this).addClass("selected");
            });


            $(window).resize(function() {
                var windowWidth = $(window).width();
                var offset = $("#menu-3057-1").offset();
                $('.megamenu').css("width", windowWidth);
                $('.megamenu').css("left", "-" + (offset.left + 50) + "px");
            });

            $("#prev_grades").html($(".prev_grade.prev").html());

            $("#next_grades").html($(".next_grade.next").html());

            /*$("#prev_grades").html("<p><< PREV</p>" + $( 
            	".prev_grade.prev")
              	.map(function() {
            		return $(this).html();
              	})
              	.get()
              	.join(" "));
            $("#next_grades").html("<p>NEXT >></p>" + $( 
            	".next_grade.next" )
              	.map(function() {
            		return $(this).html();
              	})
              	.get()
              	.join(" "));
            	*/
            $(".next, .prev").css("display:block");

            /*
            $( ".view-header" ).hover(
              function() {
                $("#prev_grades, #next_grades").fadeIn('fast');
              }, function() {
                $("#prev_grades, #next_grades").fadeOut('fast');
              }
            );
            */
			$(".feed-icon a").attr("rel","nofollow");

            /* Side Drawer*/
            $(".drawer_toggle").click(function() {

                if ($("body").hasClass("side_drawer")) {
                    $("body").removeClass("side_drawer");
                    $(".drawer_toggle").html(">>");
                } else {
                    $("body").addClass("side_drawer");
                    $(".drawer_toggle").html("<<");
                }
            });

			$('[class^=profile-]').click(function(){
			 	if($(this).parent().parent().hasClass("illustrations-loaded")){
					$(this).parent().parent().next().slideToggle(); 
				}else{
					$(this).parent().parent().after("<tr><td colspan='6'><table> " + $("tr." + $(this).attr("class")).parent().parent().html() + "</table></td></tr>").addClass("illustrations-loaded");
				}
				
			});
			
			$(".fr-illustrations").click(function(){
				$(".view-content tbody tr").show();
				$(".view-content tbody tr").hide();
				$(".view-content tbody tr.French").show();
			});
			$(".en-illustrations").click(function(){
				$(".view-content tbody tr").show();
				$(".view-content tbody tr.French").hide();
			});	
			$(".all-illustrations").click(function(){
				$(".view-content tbody tr").show();
			});
			
			$("tbody").each(function( index ) {
				$(this).prev().prev().html($("tr td.views-field-field-description",this).html());
				
			});			
            /*$('#edit-field-subject-range-value').select2();*/

            /* Curriculum finder select2 */
            function displayCurrentValue(selectedObject, currentSearchTerm) {
                return currentSearchTerm;
            }
            $("#edit-jump").select2({
                nextSearchTerm: displayCurrentValue
            });
            $("#edit-jump").change(function() {
                var action = $(this).val();
                $("#curriculum-list").attr("action", "/curriculum/compare/" + action);
            });

			
				

            $('.click-nav > ul').toggleClass('no-js js');
            $('.click-nav .js ul').hide();
            $('.click-nav .js .clicker').click(function(e) {
                if ($('.click-nav .js ul').is(':visible') && !$(this).hasClass('active')) {
                    $('.click-nav .js ul').slideUp();
                    $('.clicker').removeClass('active');
                }
                $(this).next("ul").slideToggleeft(200);
                $(this).toggleClass('active');
                e.stopPropagation();
            });

            $(document).click(function() {
                if ($('.click-nav .js ul').is(':visible')) {
                    $('.click-nav .js ul').slideUp();
                    $('.clicker').removeClass('active');
                }
            });
            //curriculum filter
            // Debounce function for our resize and scroll events.
            // https://davidwalsh.name/javascript-debounce-function
            function debounce(func, wait, immediate) {
                var timeout;
                return function() {
                    var context = this,
                        args = arguments;
                    var later = function() {
                        timeout = null;
                        if (!immediate) func.apply(context, args);
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) func.apply(context, args);
                };
            }
			var illustration_search_input = debounce(function(){
					console.log("debouncing");
				}, 3000,1500);
			
			$('.page-competencies-search input').change(illustration_search_input);
			
            function resetSearch() {
                $('.course-row, .view-grouping').show();
                $(".search_results_msg").html("");
                $(".curriculum-directory").removeClass("search-active");
            }

            // Click handler for the "clear" button.
            $('#clear-search').click(function() {
                $('#myInput').val('');
                resetSearch();
            });

            var searchForCourse = debounce(function() {

                if ($('#myInput').val() != '') {
                    $(".curriculum-directory").addClass("search-active");
                    hasResults = false;
                    $(".search_results_msg").html("");
                    var thisVal = $(this).val().toLowerCase();

                    $('.course-row .course-grade-title').each(function() {

                        var searchTerm = $(this).text().toLowerCase();

                        if (searchTerm.indexOf(thisVal) !== -1) {
                            $(this).closest('.course-row').show();
                            hasResults = true;
                        } else {
                            $(this).closest('.course-row').hide();
                        }

                    });
                    if (hasResults) {
                        $('.view-grouping-content').each(function() {

                            var hasSomethingToSay = false;

                            $(this).children('.course-row').each(function() {
                                if ($(this).is(':visible')) {
                                    hasSomethingToSay = true;
                                    // https://forum.jquery.com/topic/breaking-the-each-loop
                                    return false;
                                }
                            });

                            if (hasSomethingToSay) {
                                $(this).closest(".view-grouping").show(); // Travels UP the DOM. https://api.jquery.com/closest/
                            } else {
                                $(this).closest(".view-grouping").hide();
                            }

                        });
                    } else {
                        resetSearch();
                        $(".search_results_msg").html("Curriculum not found.");
                    }

                } else {

                    // Glossary search value is empty.
                    resetSearch();

                }

            }, 250); // END debounce() definition

			
            // Call debounce'd function on keyup
            $('#myInput').keyup(searchForCourse);
			

													  
            // Call debounce'd function on keyup

            var items = $('.curriculum-directory .view-content > .view-grouping').get();
            items.sort(function(a, b) {
                var keyA = $(a).text();
                var keyB = $(b).text();
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;


                return 0;
            });
            var ul = $('.curriculum-directory  > .view-content');
            $.each(items, function(i, li) {
                ul.append(li); /* This removes li from the old spot and moves it */
            });

            /* Sort the courses */


            $(".view-grouping-content").each(function() {
                var items = $("> .course-row", this).get();

                items.sort(function(a, b) {
                    var keyA = $(a).text();
                    var keyB = $(b).text();
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                });
                var ul = $(this);
                $.each(items, function(i, li) {
                    ul.append(li); /* This removes li from the old spot and moves it */
                });
            });

            $(".view-content > .view-grouping .view-grouping-content").each(function() {
                var items = $("> .row", this).get();

                items.sort(function(a, b) {
                    var keyA = $(a).text();
                    var keyB = $(b).text();
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                });
                var ul = $(this);
                $.each(items, function(i, li) {
                    ul.append(li); /* This removes li from the old spot and moves it */
                });
            });

			/* Show and Hide Elaborations*/
			$(".hide-elaborations-button").click(function(){
				$(this).parent().next().toggle();
				$(this).toggle();
				$(this).prev().toggle();
			});
			$(".show-elaborations-button").click(function(){
				$(this).parent().next().toggle();
				$(this).toggle();
				$(this).next().toggle();
			});			

            /** Code to reorder **/
            $(".page-curriculum-career-education-all .view-grouping-content .course-row").last().insertBefore($(".page-curriculum-career-education-all .view-grouping-content .course-row:first-child"));
			
			
			/* Reorder French Languages*/
			$(".i18n-fr.page-curriculum-second-languages-all-courses .view-grouping-content .course-row a:contains(Introduction)").each(function() {
				var $node_to_insert = $(this).parent().parent().parent().parent().next();
				$(this).parent().parent().parent().parent().insertAfter($node_to_insert);
			});
			
			


            /** Code to temporarilty hide the whats new front matter. Display none and azdd rel nofollow can be deleted after new front matter for K-10 is added*/

            $(".whatsnew").attr('rel', 'nofollow').css("display", "none");

            /***Code to temp fix the core french headers translation mismatch**/

            $(".i18n-fr.page-curriculum-second-languages-core-french span.68643").html("Réflexion et communication");
            $(".i18n-fr.page-curriculum-second-languages-core-french span.68644").html("Conscience personnelle et sociale");



            /* Fix French title that does not follow the */
            $(".i18n-fr.page-curriculum-second-languages-spanish-entry #page-title").html("Espagnol — Tremplin vers la 9e année <span class='gradepicker_hr'></span>");

            /** QA Mode
            $(".qa-mode").click(function(index, value) {
                if ($(this).hasClass("qa-on")) {

                    $(this).removeClass("qa-on");
                    $(".qa-view").css("display", "none");
                    $(".view-display-id-attachment_2 .view-content").show();
                    $(".view-display-id-attachment_3 .view-content").show();
                } else {

                    $(this).addClass("qa-on");

                    var cc = "";
                    $(".cc a.keyword_w_elaboration").each(function() {
                        cc = cc + "<strong>" + $(this).html() + ":</strong> " + $(this).next().html() + "<br>";
                    });
                    $(".view-display-id-attachment_2").append('<div class="qa-view">' + cc);
                    $(".view-display-id-attachment_2").css("width", "100%");
                    $("#curricular-competencies-head").css("color", "black");
                    $(".view-display-id-attachment_2 .view-content").hide();
                    $(".qa-view").css("display", "block");


                    var content = "";
                    $(".concept a.keyword_w_elaboration").each(function() {
                        content = content + "<strong>" + $(this).html() + ":</strong> " + $(this).next().html() + "<br>";
                    });
                    $(".view-display-id-attachment_3").append('<div class="qa-view">' + content);
                    $(".view-display-id-attachment_3").css("width", "100%").css("padding", "25px");
                    $(".view-display-id-attachment_3 .view-header h3").css("color", "black");
                    $(".view-display-id-attachment_3 .view-content").hide();
                    $(".qa-view .elaboration_content ul").css("padding-left", "20px !important");
                }
            });
			 **/
			/*Illustrations Search*/
			
			$("#edit-field-illustration-competencies-tid-2").click(function(){
				if($(this).is(":checked")){
					$("#edit-field-illustration-competencies-tid-105").prop("checked", true);	
					$("#edit-field-illustration-competencies-tid-106").prop("checked", true);	
				}else{
					$("#edit-field-illustration-competencies-tid-105").prop("checked", false);	
					$("#edit-field-illustration-competencies-tid-106").prop("checked", false);	
					
				}
			});
			$("#edit-field-illustration-competencies-tid-3").click(function(){
				if($(this).is(":checked")){
					$("#edit-field-illustration-competencies-tid-107").prop("checked", true);	
					$("#edit-field-illustration-competencies-tid-108").prop("checked", true);	
				}else{
					$("#edit-field-illustration-competencies-tid-107").prop("checked", false);	
					$("#edit-field-illustration-competencies-tid-108").prop("checked", false);	
					
				}
			});	
			$("#edit-field-illustration-competencies-tid-4").click(function(){
				if($(this).is(":checked")){
					$("#edit-field-illustration-competencies-tid-109").prop("checked", true);	
					$("#edit-field-illustration-competencies-tid-110").prop("checked", true);	
					$("#edit-field-illustration-competencies-tid-111").prop("checked", true);	
				}else{
					$("#edit-field-illustration-competencies-tid-109").prop("checked", false);	
					$("#edit-field-illustration-competencies-tid-110").prop("checked", false);	
					$("#edit-field-illustration-competencies-tid-111").prop("checked", false);					
					
				}
			});		
			
			/* check to turn off parent*/
			
			$("[id^=edit-field-illustration-competencies-tid-]").click(function(){

				if(!$("#edit-field-illustration-competencies-tid-105").is(":checked") && !$("#edit-field-illustration-competencies-tid-106").is(":checked")){
					$("#edit-field-illustration-competencies-tid-2").prop("checked", false);	
				}
				if(!$("#edit-field-illustration-competencies-tid-107").is(":checked") && !$("#edit-field-illustration-competencies-tid-108").is(":checked")){
					$("#edit-field-illustration-competencies-tid-3").prop("checked", false);	
				}
				if(!$("#edit-field-illustration-competencies-tid-109").is(":checked") && !$("#edit-field-illustration-competencies-tid-110").is(":checked") && !$("#edit-field-illustration-competencies-tid-111").is(":checked")){
					$("#edit-field-illustration-competencies-tid-4").prop("checked", false);	
				}	
				
				if($("#edit-field-illustration-competencies-tid-105").is(":checked") || $("#edit-field-illustration-competencies-tid-106").is(":checked")){
					$("#edit-field-illustration-competencies-tid-2").prop("checked", true);	
				}
				if($("#edit-field-illustration-competencies-tid-107").is(":checked") || $("#edit-field-illustration-competencies-tid-108").is(":checked")){
					$("#edit-field-illustration-competencies-tid-3").prop("checked", true);	
				}
				if($("#edit-field-illustration-competencies-tid-109").is(":checked") || $("#edit-field-illustration-competencies-tid-110").is(":checked") && !$("#edit-field-illustration-competencies-tid-111").is(":checked")){
					$("#edit-field-illustration-competencies-tid-4").prop("checked", true);	
				}

			});
			/* add a class to determine the  number of profiles in the profile analyis section of an illustration */
			$(".profiles").addClass("count-"+$(".profiles > div").length);
 			/*Illustrations*/
			
			$(".field-name-field-illustration-video .field-item a").append('<span class="play-button"></span>');
			$(".field-name-field-illustration-video .field-item").addClass("illustration-video");
			$(".field-name-field-audio-illustration .field-item").addClass("illustration-audio");
			$(".field-name-field-files .field-item").addClass("illustration-file");
			/*Competency Introduction Accordians*/
			   var acc = document.getElementsByClassName("accordion");
				var i;

				for (i = 0; i < acc.length; i++) {
				  acc[i].addEventListener("click", function() {
					this.classList.toggle("active");
					var panel = this.nextElementSibling;
					if (panel.style.maxHeight){
					  panel.style.maxHeight = null;
					} else {
					  panel.style.maxHeight = panel.scrollHeight + "px";
					} 
				  });
				}
		
			
			 //$( "#accordion" ).accordion({collapsible: true, active: false });
			/*
			$(window).on('load', function() {
				$(".group-media.field-group-div .field-item").unwrap().unwrap();
				$.each($(".colorbox-insert-image"), function(){
					$(this).wrap("<div class='illustration-image' style='" + $("img", this).attr("style") + "'></div>").after("<blockquote>" + $("img", this).attr("alt") + "</blockquote>");
				});
				
			});*/
			

$(function(){
	if($(".competency-diagram").hasClass("communication")){
		  $(".communication #pieChart").drawPieChart([

				{ title: "Personal and Social", value:  120,   color: "rgba(105,182,118,0)" },
				{ title: "Communicating",         value : 60,  color: "rgba(245,136,85,1)"},
			  	{ title: "Collaborating",         value : 60,  color: "rgba(245,136,85,1)"},
			  	{ title: "Thinking",        value : 120,   color:"rgba(56,152,211,0)"}
		  ]);		
	}else if($(".competency-diagram").hasClass("thinking")){	
		$(".thinking #pieChart").drawPieChart([
				{ title: "Personal and Social", value:  120,   color: "rgba(105,182,118,0)" },
				{ title: "Communication",         value : 120,  color: "rgba(245,136,85,0)"},
			  	{ title: "Critical and Reflective Thinking",        value : 60,   color:"rgba(56,152,211,1)"},
				{ title: "Creative Thinking",        value : 60,   color:"rgba(56,152,211,1)"}
	  	]);
	}else if($(".competency-diagram").hasClass("ppci")){	
		$(".ppci #pieChart").drawPieChart([
				{ title: "Personal and Social", value:  120,   color: "rgba(105,182,118,0)" },
				{ title: "Communication",         value : 120,  color: "rgba(245,136,85,0)"},
			  	{ title: "Critical and Reflective Thinking",        value : 60,   color:"rgba(56,152,211,1)"},
				{ title: "Creative Thinking",        value : 60,   color:"rgba(56,152,211,1)"}
	  	]);		
	}else{
		$(".personal-and-social #pieChart").drawPieChart([
				{ title: "Personal Awareness and Responsibility", value:  40,   color: "rgba(105,182,118,1)" },
				{ title: "Positive Personal and Cultural Identity", value:  40,   color: "rgba(105,182,118,1)" },
				{ title: "Social Awareness and Responsibility", value:  40,   color: "rgba(105,182,118,1)" },
				{ title: "Communication",         value : 120,  color: "rgba(245,136,85,0)"},
			  	{ title: "Thinking",        value : 120,   color:"rgba(56,152,211,0)"}
	  	]);
	}
});

/*!
 * jquery.drawPieChart.js
 * Version: 0.3(Beta)
 * Inspired by Chart.js(http://www.chartjs.org/)
 *
 * Copyright 2013 hiro
 * https://github.com/githiro/drawPieChart
 * Released under the MIT license.
 */

			
			
			
        })(jQuery); // alias function wrapper
		
		;(function($, undefined) {
  $.fn.drawPieChart = function(data, options) {
    var $this = this,
      W = $this.width(),
      H = $this.height(),
      centerX = W/2,
      centerY = H/2,
      cos = Math.cos,
      sin = Math.sin,
      PI = Math.PI,
      settings = $.extend({
        segmentShowStroke : true,
        segmentStrokeColor : "#fff",
        segmentStrokeWidth : 1,
        baseColor: "#fff",
        baseOffset: 15,
        edgeOffset: 30,//offset from edge of $this
        pieSegmentGroupClass: "pieSegmentGroup",
        pieSegmentClass: "pieSegment",
        lightPiesOffset: 12,//lighten pie's width
        lightPiesOpacity: .3,//lighten pie's default opacity
        lightPieClass: "lightPie",
        animation : true,
        animationSteps : 90,
        animationEasing : "easeInOutExpo",
        tipOffsetX: -15,
        tipOffsetY: -45,
        tipClass: "pieTip",
        beforeDraw: function(){  },
        afterDrawed : function(){  },
        onPieMouseenter : function(e,data){  },
        onPieMouseleave : function(e,data){  },
        onPieClick : function(e,data){  }
      }, options),
      animationOptions = {
        linear : function (t){
          return t;
        },
        easeInOutExpo: function (t) {
          var v = t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;
          return (v>1) ? 1 : v;
        }
      },
      requestAnimFrame = function(){
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          };
      }();

    var $wrapper = $('<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>').appendTo($this);
    var $groups = [],
        $pies = [],
        $lightPies = [],
        easingFunction = animationOptions[settings.animationEasing],
        pieRadius = Min([H/2,W/2]) - settings.edgeOffset,
        segmentTotal = 0;

    //Draw base circle
    var drawBasePie = function(){
      var base = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      var $base = $(base).appendTo($wrapper);
      base.setAttribute("cx", centerX);
      base.setAttribute("cy", centerY);
      base.setAttribute("r", pieRadius+settings.baseOffset);
      base.setAttribute("fill", settings.baseColor);
    }();

    //Set up pie segments wrapper
    var pathGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    var $pathGroup = $(pathGroup).appendTo($wrapper);
    $pathGroup[0].setAttribute("opacity",0);

    //Set up tooltip
    var $tip = $('<div class="' + settings.tipClass + '" />').appendTo('body').hide(),
      tipW = $tip.width(),
      tipH = $tip.height();

    for (var i = 0, len = data.length; i < len; i++){
      segmentTotal += data[i].value;
      var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute("data-order", i);
      g.setAttribute("class", settings.pieSegmentGroupClass);
      $groups[i] = $(g).appendTo($pathGroup);
      $groups[i]
        .on("mouseenter", pathMouseEnter)
        .on("mouseleave", pathMouseLeave)
        .on("mousemove", pathMouseMove)
        .on("click", pathClick);

      var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute("stroke-width", settings.segmentStrokeWidth);
      p.setAttribute("stroke", settings.segmentStrokeColor);
      p.setAttribute("stroke-miterlimit", 2);
      p.setAttribute("fill", data[i].color);
      p.setAttribute("class", settings.pieSegmentClass);
      $pies[i] = $(p).appendTo($groups[i]);

      var lp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      lp.setAttribute("stroke-width", settings.segmentStrokeWidth);
      lp.setAttribute("stroke", settings.segmentStrokeColor);
      lp.setAttribute("stroke-miterlimit", 2);
      lp.setAttribute("fill", data[i].color);
      lp.setAttribute("opacity", settings.lightPiesOpacity);
      lp.setAttribute("class", settings.lightPieClass);
      $lightPies[i] = $(lp).appendTo($groups[i]);
    }

    settings.beforeDraw.call($this);
    //Animation start
    triggerAnimation();

    function pathMouseEnter(e){
      var index = $(this).data().order;
      $tip.text(data[index].title).fadeIn(200);
      if ($groups[index][0].getAttribute("data-active") !== "active"){
        $lightPies[index].animate({opacity: .8}, 180);
      }
      settings.onPieMouseenter.apply($(this),[e,data]);
    }
    function pathMouseLeave(e){
      var index = $(this).data().order;
      $tip.hide();
      if ($groups[index][0].getAttribute("data-active") !== "active"){
        $lightPies[index].animate({opacity: settings.lightPiesOpacity}, 100);
      }
      settings.onPieMouseleave.apply($(this),[e,data]);
    }
    function pathMouseMove(e){
      $tip.css({
        top: e.pageY + settings.tipOffsetY,
        left: e.pageX - $tip.width() / 2 + settings.tipOffsetX
      });
    }
    function pathClick(e){
      var index = $(this).data().order;
      var targetGroup = $groups[index][0];
      for (var i = 0, len = data.length; i < len; i++){
        if (i === index) continue;
        $groups[i][0].setAttribute("data-active","");
        $lightPies[i].css({opacity: settings.lightPiesOpacity});
      }
      if (targetGroup.getAttribute("data-active") === "active"){
        targetGroup.setAttribute("data-active","");
        $lightPies[index].css({opacity: .8});
      } else {
        targetGroup.setAttribute("data-active","active");
        $lightPies[index].css({opacity: 1});
      }
      settings.onPieClick.apply($(this),[e,data]);
		var choice = data[index].title;
		switch(choice) {
		  case "Communicating":
			window.open("/competencies/communication/communicating","_self");
			break;
		  case "Collaborating":
			window.open("/competencies/communication/collaborating","_self");
			break;
		  case "Creative Thinking":
			window.open("/competencies/thinking/creative-thinking","_self");
			break;
		  case "Critical and Reflective Thinking":
			window.open("/competencies/thinking/critical-and-reflective-thinking","_self");
			break;				
		  case "Personal Awareness and Responsibility":
			window.open("/competencies/personal-and-social/personal-awareness-and-responsibility","_self");
			break;
		  case "Positive Personal and Cultural Identity":
			window.open("/competencies/personal-and-social/positive-personal-and-cultural-identity","_self");
			break;
		  case "Social Awareness and Responsibility":
			window.open("/competencies/personal-and-social/social-awareness-and-responsibility","_self");
			break;
		  case "Communication":
			window.open("/competencies/communication","_self");
			break;
		  case "Thinking":
			window.open("/competencies/thinking","_self");
			break;
		  case "Personal and Social":
			window.open("/competencies/personal-and-social","_self");
			break;				
		  default:
			// code block
		}
		
		
    }
    function drawPieSegments (animationDecimal){
      var startRadius = -PI/2,//-90 degree
          rotateAnimation = 1;
      if (settings.animation) {
        rotateAnimation = animationDecimal;//count up between0~1
      }

      $pathGroup[0].setAttribute("opacity",animationDecimal);

      //draw each path
      for (var i = 0, len = data.length; i < len; i++){
        var segmentAngle = rotateAnimation * ((data[i].value/segmentTotal) * (PI*2)),//start radian
            endRadius = startRadius + segmentAngle,
            largeArc = ((endRadius - startRadius) % (PI * 2)) > PI ? 1 : 0,
            startX = centerX + cos(startRadius) * pieRadius,
            startY = centerY + sin(startRadius) * pieRadius,
            endX = centerX + cos(endRadius) * pieRadius,
            endY = centerY + sin(endRadius) * pieRadius,
            startX2 = centerX + cos(startRadius) * (pieRadius + settings.lightPiesOffset),
            startY2 = centerY + sin(startRadius) * (pieRadius + settings.lightPiesOffset),
            endX2 = centerX + cos(endRadius) * (pieRadius + settings.lightPiesOffset),
            endY2 = centerY + sin(endRadius) * (pieRadius + settings.lightPiesOffset);
        var cmd = [
          'M', startX, startY,//Move pointer
          'A', pieRadius, pieRadius, 0, largeArc, 1, endX, endY,//Draw outer arc path
          'L', centerX, centerY,//Draw line to the center.
          'Z'//Cloth path
        ];
        var cmd2 = [
          'M', startX2, startY2,
          'A', pieRadius + settings.lightPiesOffset, pieRadius + settings.lightPiesOffset, 0, largeArc, 1, endX2, endY2,//Draw outer arc path
          'L', centerX, centerY,
          'Z'
        ];
        $pies[i][0].setAttribute("d",cmd.join(' '));
        $lightPies[i][0].setAttribute("d", cmd2.join(' '));
        startRadius += segmentAngle;
      }
    }

    var animFrameAmount = (settings.animation)? 1/settings.animationSteps : 1,//if settings.animationSteps is 10, animFrameAmount is 0.1
        animCount =(settings.animation)? 0 : 1;
    function triggerAnimation(){
      if (settings.animation) {
        requestAnimFrame(animationLoop);
      } else {
        drawPieSegments(1);
      }
    }
    function animationLoop(){
      animCount += animFrameAmount;//animCount start from 0, after "settings.animationSteps"-times executed, animCount reaches 1.
      drawPieSegments(easingFunction(animCount));
      if (animCount < 1){
        requestAnimFrame(arguments.callee);
      } else {
        settings.afterDrawed.call($this);
      }
    }
    function Max(arr){
      return Math.max.apply(null, arr);
    }
    function Min(arr){
      return Math.min.apply(null, arr);
    }
    return $this;
  };
})(jQuery);
    }
};