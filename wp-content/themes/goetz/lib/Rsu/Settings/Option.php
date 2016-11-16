<?php

namespace Rsu\Settings;


class Option
{
    public static function get_fields()
    {
        return get_option('goetz_settings');
    }

    public static function get($key)
    {
        $options = get_option('goetz_settings');
        return $options[$key];
    }
}