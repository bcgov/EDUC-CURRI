<?php

/**
 * Implements theme_field__field_type().
 */
function curriculum_field__taxonomy_term_reference($variables) {
  $output = '';

  // Render the label, if it's not hidden.
  if (!$variables['label_hidden']) {
    $output .= '<div class="field-label">' . $variables['label'] . ': </div>';
  }

  // Render the items.
  $output .= ($variables['element']['#label_display'] == 'inline') ? '<ul class="links inline">' : '<ul class="links">';
  foreach ($variables['items'] as $delta => $item) {
    $output .= '<li class="taxonomy-term-reference-' . $delta . '"' . $variables['item_attributes'][$delta] . '>' . drupal_render($item) . '</li>';
  }
  $output .= '</ul>';

  // Render the top-level DIV.
  $output = '<div class="' . $variables['classes'] . (!in_array('clearfix', $variables['classes_array']) ? ' clearfix' : '') . '"' . $variables['attributes'] .'>' . $output . '</div>';

  return $output;
}

/**
 * Function to help us deterimine if we should show the apple.com-like splash page.
 * Later, we will add logic, maybe..
 * @return boolval
 */
function _apple_splash_page() {
  return FALSE;
}

function curriculum_html_head_alter(&$head_elements) {
  // Force the latest IE rendering engine and Google Chrome Frame.
  $head_elements['ie_edge'] = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array('http-equiv' => 'X-UA-Compatible', 'content' => 'IE=edge,chrome=1'),
  );
}

function curriculum_preprocess_html(&$variables) {

  // add user role to classes
  global $user;
  if (isset($user->roles)) {
    if (count($user->roles) == 1) {
      $variables['classes_array'][] = 'no-roles';
    }
    foreach ($user->roles as $role) {
      array_push($variables['classes_array'], str_replace(' ', '-', $role));
    }
  }

  // Add meta viewport for responsive love.
  $viewport = array(
    '#tag' => 'meta', 
    '#attributes' => array(
      'name' => 'viewport', 
      'content' => 'width=device-width, initial-scale=1',
    ),
  );
  drupal_add_html_head($viewport, 'viewport');

  $url_components = explode('/', request_uri());
  if (($url_components[1] == 'competencies') || ($url_components[1] == 'fr' && $url_components[2] == 'competencies')) {
    array_push($variables['classes_array'], 'page-curriculm-competency');
    drupal_add_css(drupal_get_path('theme', 'curriculum').'/css/responsive-tables.css', array('group'=>CSS_THEME));
    drupal_add_js(drupal_get_path('theme', 'curriculum').'/js/stacktable.js', 'file');
    drupal_add_js(drupal_get_path('theme', 'curriculum').'/js/fitvids.js', 'file'); // for YouTube etc
    drupal_add_js(drupal_get_path('theme', 'curriculum').'/js/fit-illustraition-vids.js', 'file'); // for Flowplayer (old)
  }

} // preprocess_html()

function curriculum_preprocess_page(&$variables) {

  // add stylesheet + JS for front page
  if (drupal_is_front_page() && _apple_splash_page()) {
    drupal_add_css('https://fonts.googleapis.com/css?family=Raleway:400,300,200', array('group'=>CSS_THEME,'type'=>'external'));
    drupal_add_css(drupal_get_path('theme', 'curriculum').'/css/splash.css', array('group'=>CSS_THEME));
    drupal_add_js('https://code.jquery.com/ui/1.10.4/jquery-ui.min.js', 'external'); // not needed? not sure. jqueryUi is output from Drupal, but certain function calls don't work without including this up to date jquery-ui
    drupal_add_js(drupal_get_path('theme', 'curriculum').'/js/jquery.mousewheel.min.js', 'file');
    drupal_add_js(drupal_get_path('theme', 'curriculum').'/js/splash.js', 'file');
  }

  // modify the menu system (in code) if we are showing a splash page
  if (_apple_splash_page()) {
    if (isset($variables['main_menu']['menu-254'])) {
      $variables['main_menu']['menu-254']['href'] = 'home';
    }
  }

  // add JS for instructional samples
  $url_components = explode('/', request_uri());
  if ( (strpos($url_components[1], 'instructional-samples') !== false) || ($url_components[1] == 'fr' && strpos($url_components[2], 'instructional-samples') !== false) ) {
    drupal_add_js(drupal_get_path('theme', 'curriculum').'/js/instructional-samples.js', 'file');
    $new_page_title = '';
    if (isset($variables['page']['content']['system_main']['term_heading']['term']['#term']->name)) {
      $new_page_title .= $variables['page']['content']['system_main']['term_heading']['term']['#term']->name;
    }
    drupal_add_js(array('curriculum_misc' => array('intructionalSampleTermTitle' => $new_page_title)), array('type' => 'setting'));
  }
  
  // basic JS for the site
  drupal_add_js(drupal_get_path('theme', 'curriculum').'/js/main.js', 'file');

} // preprocess page



function responsive_curriculum_preprocess_html(&$variables)
{
  // Add variables for path to theme.
  $variables['base_path'] = base_path();
  $variables['path_to_resbartik'] = drupal_get_path('theme', 'responsive_bartik');

  // Add local.css stylesheet
  if (file_exists(drupal_get_path('theme', 'responsive_bartik') . '/css/local.css')) {
    drupal_add_css(drupal_get_path('theme', 'responsive_bartik') . '/css/local.css',
      array('group' => CSS_THEME, 'every_page' => TRUE));
  }

  // Add body classes if certain regions have content.
  if (!empty($variables['page']['featured'])) {
    $variables['classes_array'][] = 'featured';
  }

  if (!empty($variables['page']['triptych_first'])
    || !empty($variables['page']['triptych_middle'])
    || !empty($variables['page']['triptych_last'])
  ) {
    $variables['classes_array'][] = 'triptych';
  }

  if (!empty($variables['page']['footer_firstcolumn'])
    || !empty($variables['page']['footer_secondcolumn'])
    || !empty($variables['page']['footer_thirdcolumn'])
    || !empty($variables['page']['footer_fourthcolumn'])
  ) {
    $variables['classes_array'][] = 'footer-columns';
  }
}

/**
 * Override or insert variables into the page template for HTML output.
 */
function responsive_curriculum_process_html(&$variables)
{
  // Hook into color.module.
  if (module_exists('color')) {
    _color_html_alter($variables);
  }
}

/**
 * Override or insert variables into the page template.
 */
function responsive_curriculum_process_page(&$variables)
{
  // Hook into color.module.
  if (module_exists('color')) {
    _color_page_alter($variables);
  }
  // Always print the site name and slogan, but if they are toggled off, we'll
  // just hide them visually.
  $variables['hide_site_name'] = theme_get_setting('toggle_name') ? FALSE : TRUE;
  $variables['hide_site_slogan'] = theme_get_setting('toggle_slogan') ? FALSE : TRUE;
  if ($variables['hide_site_name']) {
    // If toggle_name is FALSE, the site_name will be empty, so we rebuild it.
    $variables['site_name'] = filter_xss_admin(variable_get('site_name', 'Drupal'));
  }
  if ($variables['hide_site_slogan']) {
    // If toggle_site_slogan is FALSE, the site_slogan will be empty, so we rebuild it.
    $variables['site_slogan'] = filter_xss_admin(variable_get('site_slogan', ''));
  }
  // Since the title and the shortcut link are both block level elements,
  // positioning them next to each other is much simpler with a wrapper div.
  if (!empty($variables['title_suffix']['add_or_remove_shortcut']) && $variables['title']) {
    // Add a wrapper div using the title_prefix and title_suffix render elements.
    $variables['title_prefix']['shortcut_wrapper'] = array(
      '#markup' => '<div class="shortcut-wrapper clearfix">',
      '#weight' => 100,
    );
    $variables['title_suffix']['shortcut_wrapper'] = array(
      '#markup' => '</div>',
      '#weight' => -99,
    );
    // Make sure the shortcut link is the first item in title_suffix.
    $variables['title_suffix']['add_or_remove_shortcut']['#weight'] = -100;
  }
}

/**
 * Implements hook_preprocess_maintenance_page().
 */
function responsive_curriculum_preprocess_maintenance_page(&$variables)
{
  // By default, site_name is set to Drupal if no db connection is available
  // or during site installation. Setting site_name to an empty string makes
  // the site and update pages look cleaner.
  // @see template_preprocess_maintenance_page
  if (!$variables['db_is_active']) {
    $variables['site_name'] = '';
  }
  drupal_add_css(drupal_get_path('theme', 'responsive_bartik') . '/css/maintenance-page.css');
}

/**
 * Override or insert variables into the maintenance page template.
 */
function responsive_curriculum_process_maintenance_page(&$variables)
{
  // Always print the site name and slogan, but if they are toggled off, we'll
  // just hide them visually.
  $variables['hide_site_name'] = theme_get_setting('toggle_name') ? FALSE : TRUE;
  $variables['hide_site_slogan'] = theme_get_setting('toggle_slogan') ? FALSE : TRUE;
  if ($variables['hide_site_name']) {
    // If toggle_name is FALSE, the site_name will be empty, so we rebuild it.
    $variables['site_name'] = filter_xss_admin(variable_get('site_name', 'Drupal'));
  }
  if ($variables['hide_site_slogan']) {
    // If toggle_site_slogan is FALSE, the site_slogan will be empty, so we rebuild it.
    $variables['site_slogan'] = filter_xss_admin(variable_get('site_slogan', ''));
  }
}

/**
 * Override or insert variables into the node template.
 */
function responsive_curriculum_preprocess_node(&$variables)
{
  if ($variables['view_mode'] == 'full' && node_is_page($variables['node'])) {
    $variables['classes_array'][] = 'node-full';
  }
}

/**
 * Override or insert variables into the block template.
 */
function responsive_curriculum_preprocess_block(&$variables)
{
  // In the header region visually hide block titles.
  if ($variables['block']->region == 'header') {
    $variables['title_attributes_array']['class'][] = 'element-invisible';
  }
}

/**
 * Implements theme_menu_tree().
 */
function responsive_curriculum_menu_tree($variables)
{
  return '<ul class="menu clearfix">' . $variables['tree'] . '</ul>';
}

/**
 * Implements theme_field__field_type().
 */
function responsive_curriculum_field__taxonomy_term_reference($variables)
{
  $output = '';

  // Render the label, if it's not hidden.
  if (!$variables['label_hidden']) {
    $output .= '<h3 class="field-label">' . $variables['label'] . ': </h3>';
  }

  // Render the items.
  $output .= ($variables['element']['#label_display'] == 'inline') ? '<ul class="links inline">' : '<ul class="links">';
  foreach ($variables['items'] as $delta => $item) {
    $output .= '<li class="taxonomy-term-reference-' . $delta . '"' . $variables['item_attributes'][$delta] . '>' . drupal_render($item) . '</li>';
  }
  $output .= '</ul>';

  // Render the top-level DIV.
  $output = '<div class="' . $variables['classes'] . (!in_array('clearfix', $variables['classes_array']) ? ' clearfix' : '') . '"' . $variables['attributes'] . '>' . $output . '</div>';

  return $output;
}
