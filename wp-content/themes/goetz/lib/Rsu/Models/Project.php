<?php

namespace Rsu\Models;


class Project
{
    public static function allForThisPage()
    {
        $type = 'projekt';

        $args = [
            'post_type' => $type,
            'post_status' => 'publish',
        ];

        $urlParts = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
        if ($urlParts[0] == 'category' && isset($urlParts[1])) {
            $idObj = get_category_by_slug($urlParts[1]);
            $args['cat'] = $idObj->term_id;
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