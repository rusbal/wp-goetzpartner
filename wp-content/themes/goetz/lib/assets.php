<?php

namespace Roots\Sage\Assets;

use Rsu\Helper\Request;

/**
 * Get paths for assets
 */
class JsonManifest {
  private $manifest;

  public function __construct($manifest_path) {
    if (file_exists($manifest_path)) {
      $this->manifest = json_decode(file_get_contents($manifest_path), true);
    } else {
      $this->manifest = [];
    }
  }

  public function get() {
    return $this->manifest;
  }

  public function getPath($key = '', $default = null) {
    $collection = $this->manifest;
    if (is_null($key)) {
      return $collection;
    }
    if (isset($collection[$key])) {
      return $collection[$key];
    }
    foreach (explode('.', $key) as $segment) {
      if (!isset($collection[$segment])) {
        return $default;
      } else {
        $collection = $collection[$segment];
      }
    }
    return $collection;
  }
}

function asset_path($filename) {
  $dist_path = get_template_directory_uri() . '/dist/';
  $directory = dirname($filename) . '/';
  $file = basename($filename);
  static $manifest;

  if (empty($manifest)) {
    $manifest_path = get_template_directory() . '/dist/' . 'assets.json';
    $manifest = new JsonManifest($manifest_path);
  }

  if (array_key_exists($file, $manifest->get())) {
    return $dist_path . $directory . $manifest->get()[$file];
  } else {
    return $dist_path . $directory . $file;
  }
}

wp_enqueue_style('pretty_photo', asset_path('styles/prettyPhoto.css'));
wp_enqueue_script('foot_main', get_template_directory_uri() . '/assets/scripts/foot/main.js', ['jquery'], '1.1', true);
wp_enqueue_script('foot_main_onload', get_template_directory_uri() . '/assets/scripts/foot/main.onload.js', ['foot_main'], '1.1', true);
wp_enqueue_script('foot', asset_path('scripts/foot.js'), ['foot_main_onload'], null, true);

wp_localize_script('jquery', 'dtLocal', [
    "postID" => get_the_ID(),
    "ajaxurl" => "/wp-admin/admin-ajax.php",
    "themeUrl" => "/wp-content/themes/goetz/",
    "pageData" => [
//        "type" => "page",
        "template" => Request::object(),
//        "layout" => "masonry"
    ],
    "themeSettings" => [
        "smoothScroll" => "on",
        "lazyLoading" => true,
        "accentColor" => [
            "mode" => "solid",
            "color" => "#d20a11"
        ],
        "floatingHeader" => [
            "showAfter" => 150,
            "showMenu" => true,
            "height" => 100,
            "logo" => [
                "showLogo" => true,
                "html" => ""
            ]
        ],
        "mobileHeader" => [
            "firstSwitchPoint" => 1020,
            "secondSwitchPoint" => 400
        ],
        "content" => [
            "responsivenessTreshold" => 970,
            "textColor" => "#4c4c4c",
            "headerColor" => "#3a3a3a"
        ],
        "stripes" => [
            "stripe1" => [
                "textColor" => "#888888",
                "headerColor" => "#3a3a3a"
            ],
            "stripe2" => [
                "textColor" => "#f4f4f4",
                "headerColor" => "#f4f4f4"
            ],
            "stripe3" => [
                "textColor" => "#f4f4f4",
                "headerColor" => "#f4f4f4"
            ]
        ]
    ],
    "VCMobileScreenWidth" => "768"
]);
