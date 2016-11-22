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
}