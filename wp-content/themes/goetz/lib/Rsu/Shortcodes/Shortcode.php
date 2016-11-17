<?php

namespace Rsu\Shortcodes;


use Rsu\Helper\View;

class Shortcode {
    public function __construct()
    {
        $methods = get_class_methods($this);

        array_filter($methods, function($method){
            if (substr($method, 0, 1) != '_') {
                add_shortcode($method, array($this, $method));
            }
        });
    }

    /**
     * Insert images selected for the post.
     *
     * @param $atts
     * @return false|string
     */
    public function images($atts)
    {
        $id = get_the_ID();
        $action = 'get_post_images';

        $outHtml = '';
        $outHtml .= View::spacer();
        $outHtml .= '
            <div class="vc_grid-container-wrapper vc_clearfix">
                <div class="vc_grid-container vc_clearfix wpb_content_element vc_masonry_media_grid" data-initial-loading-animation="zoomIn"
                    data-vc-grid-settings="{&quot;page_id&quot;:' . $id . ',&quot;style&quot;:&quot;all-masonry&quot;,&quot;action&quot;:&quot;' . $action . '&quot;,&quot;shortcode_id&quot;:&quot;0&quot;,&quot;tag&quot;:&quot;vc_masonry_media_grid&quot;}"
                    data-vc-request="/wp-admin/admin-ajax.php"
                    data-vc-post-id="' . $id . '" data-vc-public-nonce="0">
                </div>
            </div>';
        $outHtml .= View::spacer();

        return $outHtml;
    }
}
