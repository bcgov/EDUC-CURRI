function addElaboration(itemText, elaboration) {
  jQuery('strong').each(function() {
    if (jQuery(this).text() == itemText) {
      jQuery(this).bt(elaboration, Drupal.settings.beautytips['.beautytips']).addClass('beautytips').addClass('curric_content_modify');
      console.log('Elaboration: "' + itemText + '" added via JS and the curriculum_content_modify module.');
    }
  });
} // addElaboration

window.onload = function() {

  if (jQuery('html').hasClass('fr')) {
    
    addElaboration('technologies', 'objets qui augmentent les capacités humaines (p. ex.  des ciseaux) ');

  } 

};