(function($) {
  Drupal.behaviors.curriculum_subject_landing_pages = {
    attach: function(context, settings) {
      if (Drupal.settings.curriculum_subject_landing_pages.language == "en") {
        var searchStr = "Search";
        var submitStr = "Submit";
        var langUrlComponent = "";
      } else {
        var langUrlComponent =
          "/" + Drupal.settings.curriculum_subject_landing_pages.language;
        var searchStr = "Rechercher"; // put french here
        var submitStr = "Valider"; // put french here
      }

      // Append the search element to the DOM
      $(".subject_landing_page_search").html(
        '<input style="width: 350px;" type="text" id="slp_search_curric" placeholder="' +
          searchStr +
          ": " +
          Drupal.settings.curriculum_subject_landing_pages.subject +
          '"><input type="submit" value="' +
          submitStr +
          '" id="submit_slp_search_curric">'
      );

      $("#submit_slp_search_curric").click(function(e) {
        e.preventDefault();

        pathArray = location.href.split("/");
        protocol = pathArray[0];
        host = pathArray[2];
        url = protocol + "//" + host;
        if (
          Drupal.settings.curriculum_subject_landing_pages
            .subject_notranslation == "Applied Design, Skills, and Technologies"
        ) {
          subject_search_str = "Applied+Design%2C+Skills+and+Technologies";
        } else {
          subject_search_str = Drupal.settings.curriculum_subject_landing_pages.subject_notranslation.replace(
            /\s+/g,
            "+"
          );
        }

        location.assign(
          url +
            langUrlComponent +
            "/curriculum/search?field_subject_range_value%5B%5D=" +
            subject_search_str +
            "&keys=" +
            $("#slp_search_curric")
              .val()
              .replace(/\s+/g, "+")
        );
      });
    }
  };
  $(".curriculum-courses").append($(".view-display-id-curriculum_directory_block").html());
  
})(jQuery);
