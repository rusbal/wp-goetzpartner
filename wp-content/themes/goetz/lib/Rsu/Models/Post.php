<?php

namespace Rsu\Models;


class Post
{
    public static function recentPosts($limit = 0)
    {
        $currentId = get_the_ID();

        $args = [
            'numberposts' => $limit
        ];

        $recent_posts = wp_get_recent_posts( $args );

        return array_filter($recent_posts, function($post) use ($currentId) {
            return $post['ID'] > $currentId;
        });
    }
}