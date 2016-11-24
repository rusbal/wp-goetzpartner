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

    /**
     * @return array
     */
    public static function getProjectCategories($excludeUncategorized = true)
    {
        $categories = get_terms('project_category', array(
            'post_type' => ['produkt'],
            'fields' => 'all'
        ));

        return array_map(function($cat) use ($excludeUncategorized) {
            if ($excludeUncategorized && $cat->slug == 'uncategorized') {
                // Exclude
            } else {
                return $cat;
            }
        }, $categories);
    }

    public static function getBlogCategories($excludeUncategorized = true)
    {
        $categories = get_terms('category', array(
            'post_type' => ['post'],
            'fields' => 'all'
        ));

        return array_map(function($cat) use ($excludeUncategorized) {
            if ($excludeUncategorized && $cat->slug == 'uncategorized') {
                // Exclude
            } else {
                return $cat;
            }
        }, $categories);
    }
}