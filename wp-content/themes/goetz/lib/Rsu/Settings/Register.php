<?php

namespace Rsu\Settings;


/**
 * Class Register
 * @package Rsu\Settings
 *
 * http://www.wp-load.com/register-settings-api/usage/field-types/
Field types

Standard html form field types.

Checkbox
Multiselect
Radio
Select
Text, email, password etc
Textarea
Button

javascript - Non standard types made width javascript.

Colorpicker
Datepicker
Image
File
Tinymce

not - Not field types but solutions.

oEmbed
Post object / url
Shortcode
 */
class Register
{
    public function __construct() {
        add_filter('register_settings_api', array( $this, 'settings_array' ) );
    }

    function settings_array( $options_page ) {
        $options_page['goetz-partners-settings'] = [
            'menu_title' => 'Goetz Partners',
            'page_title' => 'Goetz Partners Settings',
            'option_name' => 'goetz_settings',
            'tabs' => [
                [
                    'tab_title' => 'General',
                    'fields' => [
                        'footer_logo' => [
                            'type' => 'image',
                            'title' => 'Footer Logo',
                            'description' => 'This logo shows on the footer'
                        ],
                        'company_name' => [
                            'type' => 'text',
                            'title' => 'Company Name'
                        ],
                        'description' => [
                            'type' => 'tinymce',
                            'title' => 'Description'
                        ],
                    ],
                ],
            ]
        ];
        return $options_page;
    }
}