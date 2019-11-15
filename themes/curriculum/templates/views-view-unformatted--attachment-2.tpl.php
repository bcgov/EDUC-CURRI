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

	print $output_print;
	
?>
  

  
  


