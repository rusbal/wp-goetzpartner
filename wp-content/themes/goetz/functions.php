<?php
/**
 * Sage includes
 *
 * The $sage_includes array determines the code library included in your theme.
 * Add or remove files to the array as needed. Supports child theme overrides.
 *
 * Please note that missing files will produce a fatal error.
 *
 * @link https://github.com/roots/sage/pull/1042
 */

require 'vendor/autoload.php';

$sage_includes = [
  'lib/assets.php',    // Scripts and stylesheets
  'lib/extras.php',    // Custom functions
  'lib/setup.php',     // Theme setup
  'lib/titles.php',    // Page titles
  'lib/wrapper.php',   // Theme wrapper class
  'lib/customizer.php', // Theme customizer
];

foreach ($sage_includes as $file) {
  if (!$filepath = locate_template($file)) {
    trigger_error(sprintf(__('Error locating %s for inclusion', 'sage'), $file), E_USER_ERROR);
  }

  require_once $filepath;
}
unset($file, $filepath);

add_filter('show_admin_bar', '__return_false');

/**
 * Instantiate classes
 */
new Rsu\PostType\Team;
new Rsu\PostType\Publication;
new Rsu\PostType\Projekt;
new Rsu\Settings\Register;
new Rsu\Shortcodes\Shortcode;
new Rsu\Ajax\Post;

/**
 * Define image sizes
 */
add_image_size( 'height-300', 9999, 300); // height: 300 x autoWidth
add_image_size( 'height-364', 9999, 364); // height: 364 x autoWidth
add_image_size( 'height-203', 9999, 203); // height: 203 x autoWidth
add_image_size( '625x417', 625, 417, true);
add_image_size( '600x600', 600, 600, true);
add_image_size( '300x300', 300, 300, true);
