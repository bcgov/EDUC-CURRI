Drupal.behaviors.instructionalSamples = {
  attach: function (context, settings) {
    (function($) {

      // remove links from titles
      jQuery('.field-name-title .field-item h2').each(function() {
        t = jQuery(this).children('a').text();
        jQuery(this).html(t);
      });

      if (!$('html').hasClass('fr')) {
        jQuery('.page-taxonomy-term .node-contributed-resource .field-name-field-grade .field-items .field-item, .page-instructional-samples .field-name-field-grade .field-items .field-item').each (
          function() {
            var t = jQuery(this).text();
            if (!isNaN(t.split(' ')[1])) {
              grade = t.split(' ')[1];
            } else {
              grade = 'K';
            }
            // console.log(grade);
            jQuery(this).html('<a href="/instructional-samples?field_grade_range_value%5B%5D=' + grade + '">' + t + '</a>');
          }
        );
      }

      var frSlug = '';
      if ($('html').hasClass('fr')) {
        frSlug += '/fr';
      }

      // set title on Taxonomy pages
      jQuery('.term-listing-heading .taxonomy-term .content').html('Instructional Samples Tagged: <span class="instructional-sample-tax-title">' + Drupal.settings.curriculum_misc.intructionalSampleTermTitle.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) + '</span>').css({
          padding: '0 0 0 36px',
          fontSize: '30px'
        }).after('<a class="back-to-main" href="' + frSlug + '/instructional-samples">Return to Search</a>');

    })(jQuery); // alias function wrapper
  }
};