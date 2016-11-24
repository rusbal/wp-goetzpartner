<?php

namespace Rsu\Helper;

/**
 * Struct: AdjacentPostsPermalink
 * @package Rsu\Helper
 */
class AdjacentPostsPermalink {
    public $prev_disabled;
    public $next_disabled;
    public $prev_permalink;
    public $next_permalink;

    public function __construct( $prev_disabled, $next_disabled, $prev_permalink, $next_permalink )
    {
        $this->prev_disabled = $prev_disabled;
        $this->next_disabled = $next_disabled;
        $this->prev_permalink = $prev_permalink;
        $this->next_permalink = $next_permalink;
    }
}

class WordPress
{
    public static function adjacentPostsPermalink()
    {
        $prevId = get_adjacent_post(false,'',true)->ID;
        $nextId = get_adjacent_post(false,'',false)->ID;

        return new AdjacentPostsPermalink(
            is_null($prevId) ? 'disabled' : '',
            is_null($nextId) ? 'disabled' : '',
            get_permalink( $prevId ),
            get_permalink( $nextId )
        );
    }
}