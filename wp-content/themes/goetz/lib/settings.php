<?php
use Rsu\Settings\ThemeSettings;
use Rsu\Settings\ThemeSettingsTab;

/**
 * Setting Form Assets
 */
function goe_admin_settings_enqueue() {
    $path = get_template_directory_uri() . '/lib/Rsu/Settings/assets';

    wp_enqueue_style('wp_theme_settings', $path . '/css/theme-settings.css');
    wp_register_script('wp_theme_settings', $path . '/js/theme-settings.js', array('jquery'));
    wp_enqueue_script('wp_theme_settings');
}
add_action( 'admin_enqueue_scripts', 'goe_admin_settings_enqueue' );

/**
 * Setting Fields
 */

$theme_settings_tabs = [
    'general' => ['text' => 'General', 'dashicon' => 'dashicons-admin-generic' ],
    'contact' => ['text' => 'Contact', 'dashicon' => 'dashicons-phone' ],
    'map'     => ['text' => 'Map', 'dashicon' => 'dashicons-pressthis' ],
    'apikeys' => ['text' => 'API Keys', 'dashicon' => 'dashicons-admin-generic' ],
//    'order'   => ['text' => 'Order', 'dashicon' => 'dashicons-clipboard' ],
];

$theme_settings = [
    'tabs' => $theme_settings_tabs,

    // 'general'       => array('description' => 'A custom WordPress class for creating theme settings page'),

    'settingsID'    => 'goe_settings',

    'settingFields' => [
        'general' => [
            ['name' => 'goe_settings_company_name'],
            ['name' => 'goe_settings_address_line_1'],
            ['name' => 'goe_settings_address_line_2'],
            ['name' => 'goe_settings_country'],
        ],
        'contact' => [
            ['name' => 'goe_settings_email'],
            ['name' => 'goe_settings_telephone'],
            ['name' => 'goe_settings_fax'],
        ],
        'map' => [
            ['name' => 'goe_settings_latitude'],
            ['name' => 'goe_settings_longitude'],
        ],
        'apikeys' => [
            ['name' => 'goe_settings_google_api_key'],
        ],
//        'order' => [
//            [
//                'name' => 'goe_settings_order_email_recipients',
//                'placeholder' => 'Comma-separated for multiple emails'
//            ],
//        ],
    ],
];

new ThemeSettingsTab(
    new ThemeSettings($theme_settings),
    array_keys($theme_settings_tabs)
);
