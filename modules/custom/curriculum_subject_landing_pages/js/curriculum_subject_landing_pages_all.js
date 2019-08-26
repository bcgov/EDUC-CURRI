(function ($) {

  Drupal.behaviors.curriculum_subject_landing_pages_all = {
    attach: function (context, settings) {

      $('body').addClass('subject-landing-page');
      
      // https://gww.jira.educ.gov.bc.ca/browse/CURRIC-218
      $('#grade_picker').removeClass('grade_K');
      
    }
  };

}(jQuery));
