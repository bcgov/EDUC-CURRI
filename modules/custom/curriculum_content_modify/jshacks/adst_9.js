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

    addElaboration('modifier', 'changer la longueur ou la largeur d’un patron, ajouter des embellissements, changer la fermeture');
    addElaboration('éléments de conception', 'couleur, ligne, forme, espace, texture');
    addElaboration('facteurs sociaux', 'financiers, éthiques, familiaux, culturels, spirituels, raciaux');

    // jQuery('.view-display-id-attachment_2 .views-row-1.curric-comp').after('<h3 class="curric_content_modify">Conception appliquée</h3>');
    // jQuery('.view-display-id-attachment_2 .views-row-9.curric-comp').before('<h3 class="curric_content_modify">Compétences pratiques</h3>');
    // jQuery('.view-display-id-attachment_2 .views-row-12.curric-comp').before('<h3 class="curric_content_modify">Technologies appliquées</h3>');

    // jQuery('.view-display-id-attachment_2 .views-row-13.curric-comp').after('<div class="curric_content_modify views-row curric-comp"><div class="cc">Décrire l\'incidence, y compris les conséquences négatives involontaires, de ses choix technologiques</div></div><div class="curric_content_modify views-row curric-comp"><div class="cc">Expliquer comment des considérations relatives à la terre et aux ressources naturelles influent sur la logique de conception et les choix technologiques des peuples autochtones</div></div><div class="curric_content_modify views-row curric-comp"><div class="cc">Indiquer en quoi l\'utilisation de la technologie peut varier selon la culture, la situation économique, l\'accès aux ressources et les attentes de la société</div></div><div class="curric_content_modify views-row curric-comp"><div class="cc">Répertorier les effets de l\'utilisation de la technologie sur les plans personnel, social et environnemental </div></div><div class="curric_content_modify views-row curric-comp"><div class="cc">Faire des choix éclairés en tant que consommateur de technologies</div></div>');

  }

}; // window.onload
