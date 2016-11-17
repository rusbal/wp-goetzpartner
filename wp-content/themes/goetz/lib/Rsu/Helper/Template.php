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
}