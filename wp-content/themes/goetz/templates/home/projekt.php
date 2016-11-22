<?php

use Rsu\Helper\View;

?>
<div class="stripe stripe-style-1 outline-element-decoration outline-stripe-decoration" style="background-position: top;background-repeat: no-repeat;background-attachment: scroll;background-size: auto;padding-top: 0px;padding-bottom: 0px;margin-top: 0px;margin-bottom: 0px">
    <div class="vc_row wpb_row vc_row-fluid" style="">
        <div class="wpb_column vc_column_container vc_col-sm-12">
            <div class="vc_column-inner ">
                <div class="wpb_wrapper">
                    <div class="vc_empty_space"  style="height: 42px" ><span class="vc_empty_space_inner"></span></div>
                    <div id="ultimate-heading-36645829113b8fa9c" class="uvc-heading ult-adjust-bottom-margin ultimate-heading-36645829113b8fa9c uvc-929 " data-hspacer="line_with_icon" data-hline_width="auto" data-hicon_type="selector" data-hborder_style="solid" data-hborder_height="1" data-hborder_color="#ccc" data-icon_width="32" data-hfixer="10"  data-halign="center" style="text-align:center">
                        <div class="uvc-main-heading ult-responsive"  data-ultimate-target='.uvc-heading.ultimate-heading-36645829113b8fa9c h3'  data-responsive-json-new='{"font-size":"","line-height":""}' >
                            <h3 style="font-weight:normal;"><?= get_field('projekt_home_title') ?></h3>
                        </div>
                        <div class="uvc-heading-spacer line_with_icon" style="topheight:32px;">
                            <div class="ult-just-icon-wrapper  ">
                                <div class="align-icon" style="text-align:center;">
                                    <div class="aio-icon none "  style="color:#d20a11;font-size:32px;display:inline-block;">
                                        <i class="Defaults-camera"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="vc_empty_space"  style="height: 24px" ><span class="vc_empty_space_inner"></span></div>
                    <div class="vc_row wpb_row vc_inner vc_row-fluid">
                        <div class="wpb_column vc_column_container vc_col-sm-12">
                            <div class="vc_column-inner ">
                                <div class="wpb_wrapper">
                                    <div class="wpb_text_column wpb_content_element ">
                                        <div class="wpb_wrapper">
                                            <p><span style="color: #2d2d2d;"><strong><?= get_field('project_home_subtitle') ?></strong></span></p>
                                        </div>
                                    </div>
                                    <div class="vc_empty_space"  style="height: 12px" ><span class="vc_empty_space_inner"></span></div>
                                    <div class="wpb_text_column wpb_content_element ">
                                        <div class="wpb_wrapper">
                                            <?= get_field('projekt_home_description') ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="vc_empty_space"  style="height: 42px" ><span class="vc_empty_space_inner"></span></div>

                    <?= View::projectSlider() ?>

                    <div class="vc_empty_space"  style="height: 32px" ><span class="vc_empty_space_inner"></span></div>
                </div>
            </div>
        </div>
    </div>
</div>
