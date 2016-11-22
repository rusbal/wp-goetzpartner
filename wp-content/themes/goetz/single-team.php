<?php
/**
 * Team: Single
 */

use Rsu\Helper\View;

?>
<body class="single single-dt_team postid-28 no-comments title-off large-hover-icons boxed-layout overlay-cursor-on srcset-enabled btn-flat custom-btn-color custom-btn-hover-color shadow-element-decoration filter-style-material contact-form-minimal large-fancy-datas blur-page outlines-bullets light-icons phantom-sticky phantom-shadow-decoration phantom-custom-logo-on sticky-mobile-header top-header first-switch-logo-center first-switch-menu-right second-switch-logo-left second-switch-menu-right right-mobile-menu layzr-loading-on wpb-js-composer js-comp-ver-4.11.2.1 vc_responsive accent-portfolio-icons album-minuatures-style-2">
<div id="load" class="ring-loader"> <div class="load-wrap"></div> </div>
<div id="page" class="boxed">

    <?php get_template_part('templates/header'); ?>

    <div id="main" class="sidebar-none">
        <div class="main-gradient"></div>
        <div class="wf-wrap">
            <div class="wf-container-main">
                <div id="content" class="content" role="main">
                    <article id="post-28" class="post-28 dt_team type-dt_team status-publish has-post-thumbnail dt_team_category-inhaber description-off">
                        <div class="vc_row wpb_row vc_row-fluid dt-default" style="margin-top: 0px;margin-bottom: 0px">
                            <div class="wpb_column vc_column_container vc_col-sm-4">
                                <div class="vc_column-inner ">
                                    <div class="wpb_wrapper">
                                        <div class="wpb_single_image wpb_content_element vc_align_center">
                                            <figure class="wpb_wrapper vc_figure">
                                                <div class="vc_single_image-wrapper vc_box_circle  vc_box_border_grey">

                                                    <?php $image = get_field('picture'); $size = "medium"; ?>
                                                    <?= wp_get_attachment_image($image['id'], $size, false, ['class' => 'vc_single_image-img attachment-medium']) ?>

                                                </div>
                                            </figure>
                                        </div>
                                        <div
                                            class="vc_empty_space"  style="height: 32px" ><span
                                                class="vc_empty_space_inner"></span></div>
                                        <div
                                            class="wpb_text_column wpb_content_element ">
                                            <div
                                                class="wpb_wrapper">
                                                <h2 style="text-align: center;"><?= get_the_title() ?></h2>
                                                <h3 style="text-align: center;"><?= get_field('title_line_1') ?></h3>
                                                <h3 style="text-align: center;"><?= get_field('title_line_2') ?></h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="wpb_column vc_column_container vc_col-sm-8">
                                <div
                                    class="vc_column-inner ">
                                    <div
                                        class="wpb_wrapper">
                                        <div
                                            class="ult-spacer spacer-582bb12e3b7ec" data-id="582bb12e3b7ec" data-height="0" data-height-mobile="30" data-height-tab="" data-height-tab-portrait="" data-height-mobile-landscape="30" style="clear:both;display:block;"></div>
                                        <div
                                            class="wpb_text_column wpb_content_element ">
                                            <div
                                                class="wpb_wrapper">
                                                <h3>Vita</h3>
                                            </div>
                                        </div>
                                        <div class="image-arrow">
                                            <?= View::vita() ?>
                                        </div>
                                        <div
                                            class="vc_empty_space"  style="height: 32px" ><span
                                                class="vc_empty_space_inner"></span></div>
                                        <div
                                            class="wpb_text_column wpb_content_element ">
                                            <div
                                                class="wpb_wrapper">
                                                <h3>Kontakt</h3>
                                            </div>
                                        </div>
                                        <div class="wpb_text_column wpb_content_element ">
                                            <?= View::kontakt() ?>
                                        </div>
                                    </div>
                                    <div class="vc_empty_space"  style="height: 32px" ><span class="vc_empty_space_inner"></span></div>
                                </div>
                            </div>
                        </div>
                </div>
                </article>
            </div>
        </div>
    </div>
<!--</div>-->
<?php get_template_part('templates/footer'); ?>
<a href="#" class="scroll-top"></a>
</div>
<div
    id="cookie-law-info-bar"><span>Diese Website verwendet Cookies. Indem Sie weiter auf dieser Website navigieren, stimmen Sie unserer Verwendung von Cookies zu. <a
            href="#" id="cookie_action_close_header"  class="medium cli-plugin-button cli-plugin-main-button" >Ok</a> <a
            href="http://www.fachwerk4.de/datenschutz" id="CONSTANT_OPEN_URL" target="_blank"  class="cli-plugin-main-link"  >Weitere Informationen</a></span></div>
<script type="text/javascript">jQuery(document).ready(function() {
        cli_show_cookiebar({
            settings: '{"animate_speed_hide":"500","animate_speed_show":"500","background":"#fff","border":"#444","border_on":true,"button_1_button_colour":"#000","button_1_button_hover":"#000000","button_1_link_colour":"#fff","button_1_as_button":true,"button_2_button_colour":"#333","button_2_button_hover":"#292929","button_2_link_colour":"#444","button_2_as_button":false,"font_family":"inherit","header_fix":false,"notify_animate_hide":true,"notify_animate_show":false,"notify_div_id":"#cookie-law-info-bar","notify_position_horizontal":"right","notify_position_vertical":"bottom","scroll_close":false,"scroll_close_reload":false,"showagain_tab":false,"showagain_background":"#fff","showagain_border":"#000","showagain_div_id":"#cookie-law-info-again","showagain_x_position":"100px","text":"#000","show_once_yn":false,"show_once":"10000"}'
        });
    });
</script>
<div
    style="display:none"></div>
<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/themes/dt-the7/js/main.min.js?ver=1.0.0'></script> <script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/contact-form-7/includes/js/jquery.form.min.js?ver=3.51.0-2014.06.20'></script> <script type='text/javascript'>/*  */
    var _wpcf7 = {"loaderUrl":"https:\/\/www.fachwerk4.de\/wp-content\/plugins\/contact-form-7\/images\/ajax-loader.gif","recaptcha":{"messages":{"empty":"Bitte best\u00e4tige, dass du nicht eine Maschine bist."}},"sending":"Senden ...","cached":"1"};
    /*  */
</script> <script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/contact-form-7/includes/js/scripts.js?ver=4.5.1'></script> <script type='text/javascript' src='https://s0.wp.com/wp-content/js/devicepx-jetpack.js?ver=201646'></script> <script type='text/javascript' src='https://secure.gravatar.com/js/gprofiles.js?ver=2016Novaa'></script> <script type='text/javascript'>/*  */
    var WPGroHo = {"my_hash":""};
    /*  */
</script> <script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/jetpack/modules/wpgroho.js?ver=4.6.1'></script> <script type='text/javascript' src='https://www.fachwerk4.de/wp-content/themes/dt-the7/js/post-type.js?ver=1.0.0'></script> <script type='text/javascript' src='https://www.fachwerk4.de/wp-includes/js/wp-embed.min.js?ver=4.6.1'></script> <script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/js_composer/assets/js/dist/js_composer_front.min.js?ver=4.11.2.1'></script> <script type='text/javascript' src='https://stats.wp.com/e-201646.js' async defer></script> <script type='text/javascript'>_stq = window._stq || [];
    _stq.push([ 'view', {v:'ext',j:'1:4.3.2',blog:'103843918',post:'28',tz:'1',srv:'www.fachwerk4.de'} ]);
    _stq.push([ 'clickTrackerInit', '103843918', '28' ]);
</script>
</body>