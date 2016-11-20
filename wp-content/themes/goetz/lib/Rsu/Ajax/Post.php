<?php

namespace Rsu\Ajax;


use Rsu\Helper\View;
use Rsu\Settings\Option;

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

    public function load_image() {
        $imgUrl = wp_get_attachment_url($_POST['data']['page_id']);
        $company = Option::implode(' | ', ['company_name', 'company_description']);

        echo <<<HTML
            <div class="vc_grid vc_row vc_pageable-wrapper vc_hook_hover" data-vc-pageable-content="true">
                <div class="vc_pageable-slide-wrapper vc_clearfix" data-vc-grid-content="true">
                    <div class="vc_grid-item vc_clearfix vc_col-sm-12 vc_grid-term-112">
                        <div class="vc_grid-item-mini vc_clearfix">
                            <div class="vc_gitem-animated-block">
                                <div class="vc_gitem-zone vc_gitem-zone-a vc-gitem-zone-height-mode-auto vc-gitem-zone-height-mode-auto-1-1 vc_gitem-is-link" 
                                    style="background-image: url($imgUrl) !important;">
                                    <a href="$imgUrl" title="$company"  
                                        data-rel="prettyPhoto[rel--799078336]" data-vc-gitem-zone="prettyphotoLink" 
                                        class="vc_gitem-link prettyphoto vc-zone-link vc-prettyphoto-link"></a>	
                                        <img src="$imgUrl" class="vc_gitem-zone-img" alt="$company">	
                                    <div class="vc_gitem-zone-mini"></div>
                                </div>
                            </div>
                        </div>
                        <div class="vc_clearfix"></div>
                    </div>
                </div>
            </div>
HTML;
        wp_die();
    }

    public function get_post_images() {

        $id = $_POST['vc_post_id'];

        if (have_rows('images', $id)):
            $imagesDiv = '';

            while (have_rows('images', $id)) : the_row();
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