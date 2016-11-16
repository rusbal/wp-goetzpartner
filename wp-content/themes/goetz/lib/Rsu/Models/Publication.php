<?php

namespace Rsu\Models;


class Publication
{
    public function own()
    {
        return $this->typeOf('own');
    }

    public function newspaper()
    {
        return $this->typeOf('newspaper');
    }

    public function special()
    {
        return $this->typeOf('special');
    }

    public function typeOf($publicationType)
    {
        $type = 'publication';

        $args = array(
            'post_type' => $type,
            'post_status' => 'publish',
            'meta_query'  => [
                [ 'key' => 'type', 'value' => $publicationType, 'compare' => 'EQ' ]
            ],
        );

        return new \WP_Query($args);
    }
}