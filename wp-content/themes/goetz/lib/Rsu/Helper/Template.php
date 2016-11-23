<?php

namespace Rsu\Helper;


class Template
{
    public static $type;

    public static function part($type, $slug, $name = null)
    {
        self::$type = $type;
        get_template_part($slug, $name);
    }

    public static function include_part($slug, $passedVariables = [])
    {
        extract($passedVariables);
        include(locate_template('templates/blog/index' . '.php'));
    }
}