<?php

namespace Rsu\Ajax;


use Rsu\Helper\View;

class Post
{
    public function __construct()
    {
        add_action( 'wp_ajax_vc_get_vc_grid_data', [$this, 'route'] );
    }

    public function route()
    {
        $this->$_POST['data']['action']();
    }

    public function get_post_images() {

        $id = $_POST['vc_post_id'];

        if (have_rows('home_slider_images', $id)):
            $imagesDiv = '';

            while (have_rows('home_slider_images', $id)) : the_row();
                $image = get_sub_field('image');
                $imagesDiv .= View::imageForPost($image['url']);
            endwhile;

            echo '
                <div class="vc_grid vc_row vc_grid-gutter-5px vc_pageable-wrapper vc_hook_hover" data-vc-pageable-content ="true">
                    <div class="vc_pageable-slide-wrapper vc_clearfix" data-vc-grid-content="true">
                        ' . $imagesDiv . '
                    </div>
                </div>';
        endif;

        wp_die();
    }
}