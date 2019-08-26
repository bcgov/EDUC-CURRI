<?php

/**
 * @file
 * This template is used to print a single field in a view.
 *
 * It is not actually used in default Views, as this is registered as a theme
 * function which has better performance. For single overrides, the template is
 * perfectly okay.
 *
 * Variables available:
 * - $view: The view object
 * - $field: The field handler object that can process the input
 * - $row: The raw SQL result that can be used
 * - $output: The processed output that will normally be used.
 *
 * When fetching output from the $row, this construct should be used:
 * $data = $row->{$field->field_alias}
 *
 * The above will guarantee that you'll always get the correct data,
 * regardless of any changes in the aliasing that might happen if
 * the view is modified.
 */
?>
<?php 
$json_array = array();
$doc = new DOMDocument();
$doc->loadHTML($output);

$items = $doc->getElementsByTagName('li');
if(count($items) > 0) //Only if tag1 items are found 
{
	$sub_content_id = 1;
    foreach ($items as $li)
    {
         // Do something with $tag1->nodeValue and save your modifications
		array_push($json_array, array("sub-content" => array("content" => $li->nodeValue, "id" => $sub_content_id++)) );    
    }
}
else
{
     $content = $doc->saveHTML();
}
if($json_array){
	print json_encode($json_array);
}else{
	echo "output: " . $output;	
}



?>


