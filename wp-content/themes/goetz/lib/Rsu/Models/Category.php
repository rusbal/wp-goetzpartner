<?php

namespace Rsu\Models;


class Category
{
    public static function implodeLinks($glue)
    {
        return implode($glue,
            array_map(function($cat){
                return '<a href="' . get_term_link($cat->cat_ID) . '">' . $cat->cat_name . '</a>';
            }, get_the_category())
        );
    }
}