function addElaboration(itemText, elaboration) {
  jQuery('strong').each(function() {
    if (jQuery(this).text() == itemText) {
      jQuery(this).bt(elaboration, Drupal.settings.beautytips['.beautytips']).addClass('beautytips');
      console.log('Elaboration: "' + itemText + '" added via JS and the curriculum_content_modify module.');
    }
  });
} // addElaboration

window.onload = function() { 

  // if French page
  if (jQuery('html').hasClass('fr')) {
    addElaboration('appropriation culturelle', 'Utilisation ou échange de motifs, thèmes, voix, images, connaissances, histoires, chansons, œuvres dramatiques ou autres manifestations de nature culturelle sans autorisation, dans un contexte inapproprié ou en dénaturant l\'expérience vécue par les personnes appartenant à la culture d\'origine.');
  }

}; // window.onload