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

    <?php endif; ?>
    <div class="col-12 row course-group-list">
		<?php foreach ($rows as $id => $row): ?>
          <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .' available-grade"';  } ?>>
            <?php print $row; ?>
          </div>
        <?php endforeach; ?>
    </div>
</div>
