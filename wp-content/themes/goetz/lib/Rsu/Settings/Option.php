<?php

namespace Rsu\Settings;


class Option
{
    protected static $settings;

    public static function get_fields()
    {
        if (! isset(self::$settings)) {
            self::$settings = get_option('goetz_settings');
        }
        return self::$settings;
    }

    public static function get($key)
    {
        if (! isset(self::$settings)) {
            self::$settings = get_option('goetz_settings');
        }
        return self::$settings[$key];
    }

    public static function implode($glue, $keys)
    {
        return implode(
            $glue,
            array_map(function($key){
                return self::get($key);
            }, $keys)
        );
    }
}