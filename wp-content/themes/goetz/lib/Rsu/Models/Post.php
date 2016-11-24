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
            // TODO: Change condition so that "recentPosts" will show posts that are the most recent
            // and "otherPosts" will show other posts that are not on "recentPosts" list.
            return $post['ID'] != $currentId;
        });
    }

    public static function allForThisPage($termId = null)
    {
        $type = 'post';

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
                'taxonomy' => 'category',
                'field' => 'term_id',
                'terms' => $termId
            ]];
        }

        return new \WP_Query($args);
    }
}