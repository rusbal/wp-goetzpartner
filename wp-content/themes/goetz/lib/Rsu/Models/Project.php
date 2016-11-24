<?php

namespace Rsu\Models;


class Project
{
    public static function allForThisPage($termId = null)
    {
        $type = 'projekt';

        $args = [
            'post_type' => $type,
            'post_status' => 'publish',
        ];

        if (! $termId) {
            $urlParts = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
            if ($urlParts[0] == 'category' && isset($urlParts[1])) {
                $idObj = get_category_by_slug($urlParts[1]);
                $termId = $idObj->term_id;
            }
        }

        if ($termId) {
            $args['tax_query'] = [[
                'taxonomy' => 'project_category',
                'field' => 'term_id',
                'terms' => $termId
            ]];
        }

        return new \WP_Query($args);
    }

    public static function firstImage()
    {
        if ( have_rows('projekt_images') ) : the_row();
            return get_sub_field('projekt_image');
        endif;
    }
}