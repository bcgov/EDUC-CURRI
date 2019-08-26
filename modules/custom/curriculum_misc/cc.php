<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8">
    <title>BC&#039;s New Curriculum</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" media="all" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />

    <style>

      body { padding: 1rem; }

    </style>

  </head>
  <body>

    <?php if (!isset($_GET['s']) || empty($_GET['s']) || $_GET['s'] !== 'jfdksl21!'): ?>

      <?php header('HTTP/1.0 404 Not Found'); ?>
      <?php echo 'File not found.'; ?>

    <?php else: ?>
      
      <h1>I get by with a little help from my friends...</h1>
      <p>More info: </p>
      <ul>
        <li><a href="https://www.drupal.org/documentation/clearing-rebuilding-cache">Rebuilding Cache</a></li>
        <li><a href="https://www.drupal.org/project/registry_rebuild">Registry Rebuild</a></li>
      </ul>

    <?php

        error_reporting(E_ALL);
        ini_set('display_errors', 1);

        echo '<p>The current working directory is: '.getcwd().'</p>';

        echo '<h2>Actions</h2><ul>';
        echo '<li><a target="_blank" href="/update.php">Run update.php</a></li>';
        echo '<li><a class="alert-warning" title="Only do this if you have tried everything else!" href="registry_rebuild.php?s=jfdksl21!">Rebuild the Registry</a></li>';
        echo '</ul>';

        echo '<h2>Running Script</h2><p>Defining Drupal Root...</p>';
        // Define static var
        define('DRUPAL_ROOT', '/data/apps/drupal/htdocs');
        echo '<p>Done.</p>'; 

        echo '<p>Including Drupal bootstrap...</p>';
        // Include bootstrap
        include_once('/data/apps/drupal/htdocs/includes/bootstrap.inc');
        echo '<p>Done.</p>';

        echo '<p>Calling drupal_bootstrap()...</p>';
        // Initialize stuff
        drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);
        echo '<p>Done.</p>';

        // echo 'deleting cache tables...';
        // db_query("DELETE FROM {cache};");

        // module_disable(array('rules'));

        echo '<p>Attempting to clear the cache... </p>';
        // Clear cache
        drupal_flush_all_caches();
        echo '<p>Done.</p>'

    ?>

    <?php endif; ?>

  </body>
</html>

