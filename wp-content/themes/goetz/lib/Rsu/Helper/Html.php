<?php

namespace Rsu\Helper;


class Html
{
    public static function addPxToWidthHeight($styles)
    {
        array_walk($styles, function(&$value, $key) {
            if (in_array($key, ['width', 'height'])) {
                if (is_numeric($value)) {
                    $value .= 'px';
                }
            }
        });

        return $styles;
    }

    public static function stylesToStr($styles, $insideAttribute = true)
    {
        $style = implode(';',
            array_map(function($value, $key) {
                return "$key: $value";
            }, $styles, array_keys($styles))
        );

        return $insideAttribute ? 'style="' . $style . '"' : $style;
    }

    public static function attributesToStr($attributes)
    {
        return implode(' ',
            array_map(function($value, $key) {
                return $key . '="' . $value . '"';
            }, $attributes, array_keys($attributes))
        );
    }

    public static function tag($tag, $attributes = [], $styles = [], $insideHtml = null)
    {
        $style = self::stylesToStr(
            self::addPxToWidthHeight($styles)
        );
        $attribute = self::attributesToStr($attributes);

        if ($insideHtml) {
            return "<$tag $attribute $style>$insideHtml</$tag>";
        } else {
            return "<$tag $attribute $style>";
        }
    }
}