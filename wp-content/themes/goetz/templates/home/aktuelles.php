<?php

use Rsu\Helper\View;
use Rsu\Helper\Widget;

?>
<div id="Aktuelles" data-anchor="#Aktuelles" class="vc_row wpb_row vc_row-fluid dt-default" style="margin-top: 0px;margin-bottom: 0px">
    <div class="wpb_column vc_column_container vc_col-sm-12 vc_col-lg-12 vc_col-md-12 vc_col-xs-12">
        <div class="vc_column-inner ">
            <div class="wpb_wrapper">
                <div class="vc_empty_space"  style="height: 18px" ><span class="vc_empty_space_inner"></span></div>
                <div id="ultimate-heading-49955829113b84adb" class="uvc-heading ult-adjust-bottom-margin ultimate-heading-49955829113b84adb uvc-3154 " data-hspacer="line_with_icon" data-hline_width="auto" data-hicon_type="selector" data-hborder_style="solid" data-hborder_height="1" data-hborder_color="#ccc" data-icon_width="32" data-hfixer="10"  data-halign="center" style="text-align:center">
                    <div class="uvc-heading-spacer line_with_icon" style="topheight:32px;">
                        <div class="ult-just-icon-wrapper  ">
                            <div class="align-icon" style="text-align:center;">
                                <div class="aio-icon none "  style="color:#d20a11;font-size:32px;display:inline-block;"> <i class="Defaults-home"></i> </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="vc_empty_space"  style="height: 24px" ><span class="vc_empty_space_inner"></span></div>
                <div class="vc_row wpb_row vc_inner vc_row-fluid">
                    <div class="wpb_column vc_column_container vc_col-sm-8">
                        <div class="vc_column-inner ">
                            <div class="wpb_wrapper">
                                <div class="vc_empty_space"  style="height: 12px" ><span class="vc_empty_space_inner"></span></div>
                                <div class="wpb_single_image wpb_content_element vc_align_left">
                                    <figure class="wpb_wrapper vc_figure">
                                        <div class="vc_single_image-wrapper   vc_box_border_grey">
                                            <?= View::aktuellesImage() ?>
                                        </div>
                                    </figure>
                                </div>
                                <div class="vc_empty_space"  style="height: 32px" ><span class="vc_empty_space_inner"></span></div>
                                <div class="wpb_text_column wpb_content_element ">
                                    <div class="wpb_wrapper">
                                        <?= get_field('news_text') ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="wpb_column vc_column_container vc_col-sm-4">
                        <div class="vc_column-inner ">
                            <div class="wpb_wrapper">
                                <div class="ult-spacer spacer-5829113b8617f" data-id="5829113b8617f" data-height="0" data-height-mobile="32" data-height-tab="" data-height-tab-portrait="" data-height-mobile-landscape="32" style="clear:both;display:block;"></div>
                                <div class="wpb_text_column wpb_content_element ">
                                    <div class="wpb_wrapper">
                                        <h3><a href="/blog">Aktuelle Nachrichten</a></h3>
                                    </div>
                                </div>
                                <div class="vc_empty_space"  style="height: 20px" ><span class="vc_empty_space_inner"></span></div>

                                <?= Widget::aktuelles() ?>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="vc_empty_space"  style="height: 32px" ><span class="vc_empty_space_inner"></span></div>
            </div>
        </div>
    </div>
</div>