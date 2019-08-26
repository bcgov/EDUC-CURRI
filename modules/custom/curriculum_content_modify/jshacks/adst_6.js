function addElaboration(itemText, elaboration) {
  jQuery('strong').each(function() {
    if (jQuery(this).text() == itemText) {
      jQuery(this).bt(elaboration, Drupal.settings.beautytips['.beautytips']).addClass('beautytips').addClass('curric_content_modify');
      console.log('Elaboration: "' + itemText + '" added via JS and the curriculum_content_modify module.');
    }
  });
} // addElaboration

window.onload = function() {

  /**
   * Add elaborations with JavaScript. Isn't that neat!?!?!?
   * Remeber to clear cache after add new elaborations. ;) 
   */

  // if French page
  if (jQuery('html').hasClass('fr')) {

    addElaboration('techniques', 'par exemple, couper, mélanger, faire chauffer, faire refroidir; entreposer des aliments; se laver les mains et nettoyer les surfaces de préparation des aliments');
    addElaboration('matériel', 'par exemple, mélangeur, ustensiles, couteaux, ciseaux, plaque chauffante, cuisinière, four solaire, bain d\'eau glacée, brochettes en bois, marguerite, four à micro-ondes, récipient en écorce de bouleau, tagine, wok');
    addElaboration('restrictions alimentaires', 'allergènes (p. ex. Produits laitiers, noix), sensibilités ou intolérances (p. ex. Au gluten)');
    //addElaboration('restrictions alimentaires', 'test');
    addElaboration('Concevoir des idées', 'formuler des idées ou des concepts');

    // jQuery('.view-display-id-attachment_2 .views-row-1.curric-comp').after('<h3 class="curric_content_modify">Conception appliquée</h3>');
    // jQuery('.view-display-id-attachment_2 .views-row-9.curric-comp').before('<h3 class="curric_content_modify">Compétences pratiques</h3>');
    // jQuery('.view-display-id-attachment_2 .views-row-12.curric-comp').before('<h3 class="curric_content_modify">Technologies appliquées</h3>');

    // jQuery('.views-row.views-row-13.curric-comp').after('<div class="curric_content_modify views-row curric-comp"><div class="cc">Indiquer en quoi l\'utilisation de la technologie peut varier selon la culture, la situation économique, l\'accès aux ressources et les attentes de la société</div></div><div class="curric_content_modify views-row curric-comp"><div class="cc">Répertorier les effets de l\'utilisation de la technologie sur les plans personnel, social et environnemental</div></div>');

  }

  // if English page
  // if (jQuery('html').hasClass('en')) {

  // }

}; // window.onload