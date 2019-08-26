<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>





<?php if (!empty($title)): ?>
  <optgroup label="<?php print $title; ?>">
<?php endif; ?>

<?php foreach ($rows as $id => $row): ?>
  <option<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .'"';  } ?>>
    <?php print $row; ?>
  </option>
  
 <?php if (!empty($title)): ?>
  </optgroup> 
<?php endif; ?>

<?php endforeach; ?>

