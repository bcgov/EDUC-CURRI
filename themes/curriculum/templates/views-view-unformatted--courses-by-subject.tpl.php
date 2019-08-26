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
      <div class="col-8"><?php print $title; ?></div>
    <?php endif; ?>
    <div class="col-4 row">
		<?php foreach ($rows as $id => $row): ?>
          <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .' available-grade"';  } ?>>
            <?php print $row; ?>
          </div>
        <?php endforeach; ?>
    </div>
</div>
