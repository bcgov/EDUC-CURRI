<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>

<?php 

$output_print = "";
$classes = "";
$ccg_id = "no-ccg"; //default to no-ccg. Will be set below if ccg exists
?>

<?php 
//Get the current view;
$view = views_get_current_view();



	foreach ($rows as $id => $row){
		preg_match("/ccg-id-\w+/" , $classes_array[$id], $matches);
		if(isset($matches[0])){
			$ccg_id = str_replace("ccg-id-", "", $matches[0]);
		}	
  		$output_print .= '<div';

		if ($classes_array[$id]){
		  	$output_print .= ' class="' . $classes_array[$id] .'"';  
		}
	    $output_print .= '>' . $row . '</div>';
		//wrap the output with two nested divs for continuous views
  		$classes = $classes_array[$id];

	}
	
	if (!empty($title)){
		
		$output_print = '<h3 class="continuous-view-header">' . $title . '</h3>' . $output_print;
	}	
	//set if core or course /subject/grade/course
	$course = "core";
	if(isset($view->args[2])){
		$course = $view->args[2];
	}
	
	//output the nojs link for ajax as subject/grade/course/nojs
	$output_print = "<a class='continuous-view-btn-toggle'>o-o-o</a><a class='continuous-view-btn ccg ccg-". $ccg_id . "' href='/curriculum/". $view->args[0] . "/"  . $view->args[1] . "/" . $course . "/ccg/" . $ccg_id . "/nojs'>o-o-o</a><div id='ccg-id-". $ccg_id ."'>
	<div class=" . $classes . "style='width:100%'>" . $output_print . "</div></div><div id='continuous-view-ccg-id-". $ccg_id ."' class='ccg cv_container modal_lightbox'></div>";
	print $output_print;
	
?>
  

  
  


