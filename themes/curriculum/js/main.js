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



            /** Code to reorder **/
            $(".page-curriculum-career-education-all .view-grouping-content .course-row").last().insertBefore($(".page-curriculum-career-education-all .view-grouping-content .course-row"));


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
			
			/*Illustrations images add alt text caption */
		
			
			 //$( "#accordion" ).accordion({collapsible: true, active: false });
			
			$(window).on('load', function() {
				$(".group-media.field-group-div .field-item").unwrap().unwrap();
				$.each($(".colorbox-insert-image"), function(){
					$(this).wrap("<div class='illustration-image' style='" + $("img", this).attr("style") + "'></div>").after("<blockquote>" + $("img", this).attr("alt") + "</blockquote>");
				});
				//$(".image-illustration-square-image").parent().append($("<p></p>").text("hello"));
			});
        })(jQuery); // alias function wrapper
    }
};