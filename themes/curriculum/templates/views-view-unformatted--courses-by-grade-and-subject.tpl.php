<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<div class="row course-row">
	<?php if (!empty($title)): ?>
      <!--div class="col-8"><?php print $title; ?></div-->
    <?php endif; ?>
   <div class="col-12 row">
	   <?php $is_language=false; ?>
		<?php foreach ($rows as $id => $row): ?>
          <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .' available-grade"';  } ?>>
            <?php print $row; ?>
			  
			 <?php 
			  	/* check if the $row string is a language courses and not an introductory */
			  	if (strpos($row, 'curriculum/second-languages' ) !== false && strpos($row, 'introductory' ) === false && strpos($row, 'entry' ) === false ) {
					$is_language = true; // set flag 
				}
			  ?>
			  
          </div>
        <?php endforeach; ?>
	   <?php 
	   /* Add Continuous views for languages  rows based on $is_language flag*/
	   		
	
			if($is_language){
				//Lower case title and convert whitespaces and underscore to dash
	   			$url_title =  preg_replace("/[\s_]/", "-", strtolower($title));
				//remove special case urls
				$url_str_remove_list = array("-(asl)");
				
				
				$url_title = str_replace($url_str_remove_list , "", $url_title);
				$url_title = str_replace("é" , "e", $url_title);
				$url_title = str_replace("ç" , "c", $url_title);
				global $language;
			   
				print '<div class="language-continuous-view"><div class="curriculum-course-title">' . ($language->language == "en" ? 'Continuous Views' : 'Grilles des cheminements') . ' '. $title .' 5-12:</div><div class="curriculum-download-links"><a href="/sites/curriculum.gov.bc.ca/files/curriculum/continuous-views/'.$language->language .'_second-languages_5-12_'. $url_title . '_big-ideas.pdf" target="_blank">' . ($language->language == "en" ? 'Big ideas' : 'Grandes idées') .'</a>' . ' | <a href="/sites/curriculum.gov.bc.ca/files/curriculum/continuous-views/'. $language->language .'_second-languages_5-12_'. $url_title . '_curricular-competencies.pdf" target="_blank">' . ($language->language == "en" ? 'Curricular Competencies' : 'Compétences disciplinaires') . '</a> | <a href="/sites/curriculum.gov.bc.ca/files/curriculum/continuous-views/'.$language->language.'_second-languages_5-12_'. $url_title . '_content.pdf" target="_blank">' . ($language->language == "en" ? 'Content' : 'Contenu') . '</a> </div></div>';
				
				
				
			}
	   ?>


	   
    </div>
</div>
