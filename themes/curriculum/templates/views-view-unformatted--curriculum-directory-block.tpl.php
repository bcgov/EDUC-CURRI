<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>

<div class="row">
<?php if (!empty($title)): ?>
  <div class="course-group-title">
	  <h3><?php print $title; ?></h3>
  </div>
<?php endif; ?>
<div class="view-grouping-content">
<?php foreach ($rows as $id => $row): ?>
  <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] . ' course-row"';  } ?>>
    <?php print $row; ?>
  </div>
<?php endforeach; ?>
</div>
</div>
