<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php 

$view = views_get_current_view(); 
	$course = "core";
	if(isset($view->args[2])){
		$course = $view->args[2];
	}
	
	//output the nojs link for ajax as subject/grade/course/nojs
	
    $output_print = "<a class='continuous-view-btn bi' href='/curriculum/" . $view->args[0] . "/"  . $view->args[1] . "/" . $course . "/bi/nojs'>o-o-o</a><div id='continuous-view-bi' class='bi cv_container modal_lightbox' style='display:none'>
	<div class=" . $classes . "style='width:inherit'>" . $output_print . "</div></div>";
	print $output_print;
    ?>
    <div id="big_ideas">
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>
<?php foreach ($rows as $id => $row): ?>
  <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .'"';  } ?>>
    <?php print $row; ?>
  </div>
<?php endforeach; ?>
</div>