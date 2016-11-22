<?php

namespace Rsu\Models;


class Project
{
    public static function all()
    {
        $type = 'projekt';

        $args = array(
            'post_type' => $type,
            'post_status' => 'publish',
        );

        return new \WP_Query($args);
    }

    public static function firstImage()
    {
        if ( have_rows('projekt_images') ) : the_row();
            return get_sub_field('projekt_image');
        endif;
    }
}