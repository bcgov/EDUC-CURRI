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
    addElaboration('Concevoir des idées', 'formuler des idées ou des concepts');
    addElaboration('Manifester de l’empathie', 'partager les sentiments d’autrui et comprendre ses besoins en appui à la conception appliquée');
    addElaboration('utilisateurs', 'peut comprendre l’élève, ses pairs, des enfants plus jeunes, des membres de sa famille ou de sa communauté, des clients, les besoins des plantes ou des animaux');
    addElaboration('versions successives', 'répétitions d\'un processus dans le but de se rapprocher du résultat souhaité');
    addElaboration('présenter', 'peut signifier, notamment, montrer ou donner; faire utiliser à d’autres; ou préparer la commercialisation et la vente');

    jQuery('li').each(function() {
      if (jQuery(this).text() == 'a') {
        jQuery(this).html('l’architecture de systèmes informatiques, y compris le matériel et les logiciels, l’infrastructure du réseau local, l’Intranet et l’Internet, de même que les appareils de communication personnels');
      }
    });

  }

  // if English page
  // if (jQuery('html').hasClass('en')) {

  // }

}; // window.onload