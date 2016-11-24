<?php
/**
 * Homepage
 */

use Rsu\Helper\View;

?>
<body class="home page page-id-8 page-template page-template-template-microsite page-template-template-microsite-php one-page-row transparent light-preset-color slideshow-on large-hover-icons boxed-layout overlay-cursor-on srcset-enabled btn-flat custom-btn-color custom-btn-hover-color shadow-element-decoration filter-style-material contact-form-minimal large-fancy-datas blur-page outlines-bullets light-icons phantom-sticky phantom-shadow-decoration phantom-custom-logo-on sticky-mobile-header top-header first-switch-logo-center first-switch-menu-right second-switch-logo-left second-switch-menu-right right-mobile-menu layzr-loading-on wpb-js-composer js-comp-ver-4.11.2.1 vc_responsive accent-portfolio-icons album-minuatures-style-2">
<div id="load" class="ring-loader">
    <div class="load-wrap"></div>
</div>
<div id="page" class="boxed">
    <?php get_template_part('templates/header'); ?>
    <div id="main-slideshow" data-width="1250" data-height="690" data-autoslide="4800" data-scale="fill" data-paused="false"></div>
    <div id="main" class="sidebar-none">
        <div class="main-gradient"></div>
        <div class="wf-wrap">
            <div class="wf-container-main">
                <div id="content" class="content" role="main">

                    <?php get_template_part('templates/home/aktuelles'); ?>

                    <?= View::largeButtonSeparatorBlog() ?>

                    <div class="upb_color" data-bg-override="full" data-bg-color="#d20a11" data-fadeout="" data-fadeout-percentage="30" data-parallax-content="" data-parallax-content-sense="30" data-row-effect-mobile-disable="true" data-img-parallax-mobile-disable="true" data-rtl="false"  data-custom-vc-row=""  data-vc="4.11.2.1"  data-is_old_vc=""  data-theme-support=""   data-overlay="false" data-overlay-color="" data-overlay-pattern="" data-overlay-pattern-opacity="" data-overlay-pattern-size=""    ></div>
                    <div id="Leistungen" data-anchor="#Leistungen" class="vc_row wpb_row vc_row-fluid dt-default" style="margin-top: 0px;margin-bottom: 0px">
                        <div class="wpb_column vc_column_container vc_col-sm-12">
                            <div class="vc_column-inner ">
                                <div class="wpb_wrapper"></div>
                            </div>
                        </div>
                    </div>

                    <?php get_template_part('templates/home/leistungen'); ?>

                    <div
                        id="Portfolio" data-anchor="#Portfolio" class="vc_row wpb_row vc_row-fluid dt-default" style="margin-top: 0px;margin-bottom: 0px">
                        <div
                            class="wpb_column vc_column_container vc_col-sm-12">
                            <div
                                class="vc_column-inner ">
                                <div
                                    class="wpb_wrapper"></div>
                            </div>
                        </div>
                    </div>

                    <?php get_template_part('templates/home/projekt'); ?>

                    <div
                        id="Team" data-anchor="#Team" class="vc_row wpb_row vc_row-fluid dt-default" style="margin-top: 0px;margin-bottom: 0px">
                        <div
                            class="wpb_column vc_column_container vc_col-sm-12">
                            <div
                                class="vc_column-inner ">
                                <div
                                    class="wpb_wrapper"></div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="vc_row wpb_row vc_row-fluid dt-default" style="margin-top: 0px;margin-bottom: 0px">
                        <div
                            class="wpb_column vc_column_container vc_col-sm-12">
                            <div
                                class="vc_column-inner ">
                                <div
                                    class="wpb_wrapper">
                                    <div
                                        class="vc_empty_space"  style="height: 42px" ><span
                                            class="vc_empty_space_inner"></span></div>
                                    <div
                                        id="ultimate-heading-16205829113b97280" class="uvc-heading ult-adjust-bottom-margin ultimate-heading-16205829113b97280 uvc-8602 " data-hspacer="line_with_icon" data-hline_width="auto" data-hicon_type="selector" data-hborder_style="solid" data-hborder_height="1" data-hborder_color="#ccc" data-icon_width="32" data-hfixer="10"  data-halign="center" style="text-align:center">
                                        <div
                                            class="uvc-main-heading ult-responsive"  data-ultimate-target='.uvc-heading.ultimate-heading-16205829113b97280 h3'  data-responsive-json-new='{"font-size":"","line-height":""}' >
                                            <h3 style="font-weight:normal;">Team</h3>
                                        </div>
                                        <div
                                            class="uvc-heading-spacer line_with_icon" style="topheight:32px;">
                                            <div
                                                class="ult-just-icon-wrapper  ">
                                                <div
                                                    class="align-icon" style="text-align:center;">
                                                    <div
                                                        class="aio-icon none "  style="color:#d20a11;font-size:32px;display:inline-block;">
                                                        <i
                                                            class="Defaults-user"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="vc_empty_space"  style="height: 24px" ><span class="vc_empty_space_inner"></span></div>
                                    <div class="vc_row wpb_row vc_inner vc_row-fluid">
                                        <div class="wpb_column vc_column_container vc_col-sm-12">
                                            <div class="vc_column-inner vc_custom_1428505413448">
                                                <div class="wpb_wrapper">
                                                    <div class="wf-container loading-effect-fade-in iso-grid bg-under-post description-under-image content-align-centre" data-padding="7px" data-cur-page="1" data-width="120px" data-columns="4">
                                                        <?= View::teamMembers() ?>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="vc_empty_space"  style="height: 32px" ><span class="vc_empty_space_inner"></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php get_template_part('templates/home/publication'); ?>
                    <div
                        id="Kontakt" data-anchor="#Kontakt" class="vc_row wpb_row vc_row-fluid dt-default" style="margin-top: 0px;margin-bottom: 0px">
                        <div
                            class="wpb_column vc_column_container vc_col-sm-12">
                            <div
                                class="vc_column-inner ">
                                <div
                                    class="wpb_wrapper"></div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="vc_row wpb_row vc_row-fluid dt-default" style="margin-top: 0px;margin-bottom: -10px">
                        <div
                            class="wpb_column vc_column_container vc_col-sm-12">
                            <div
                                class="vc_column-inner ">
                                <div
                                    class="wpb_wrapper">
                                    <div
                                        class="vc_empty_space"  style="height: 42px" ><span
                                            class="vc_empty_space_inner"></span></div>
                                    <div
                                        id="ultimate-heading-285829113ba6a70" class="uvc-heading ult-adjust-bottom-margin ultimate-heading-285829113ba6a70 uvc-7642 " data-hspacer="line_with_icon" data-hline_width="auto" data-hicon_type="selector" data-hborder_style="solid" data-hborder_height="1" data-hborder_color="#ccc" data-icon_width="32" data-hfixer="10"  data-halign="center" style="text-align:center">
                                        <div
                                            class="uvc-main-heading ult-responsive"  data-ultimate-target='.uvc-heading.ultimate-heading-285829113ba6a70 h3'  data-responsive-json-new='{"font-size":"","line-height":""}' >
                                            <h3 style="font-weight:normal;">Kontakt</h3>
                                        </div>
                                        <div
                                            class="uvc-heading-spacer line_with_icon" style="topheight:32px;">
                                            <div
                                                class="ult-just-icon-wrapper  ">
                                                <div
                                                    class="align-icon" style="text-align:center;">
                                                    <div
                                                        class="aio-icon none "  style="color:#d20a11;font-size:32px;display:inline-block;">
                                                        <i
                                                            class="Defaults-map-marker"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="vc_empty_space"  style="height: 24px" ><span class="vc_empty_space_inner"></span></div>
                                    <div class="vc_row wpb_row vc_inner vc_row-fluid">
                                        <div class="wpb_column vc_column_container vc_col-sm-4">
                                            <div class="vc_column-inner ">
                                                <div class="wpb_wrapper">
                                                    <div class="wpb_text_column wpb_content_element ">
                                                        <div class="wpb_wrapper">
                                                            <h4>Senden Sie uns eine Nachricht:</h4>
                                                        </div>
                                                    </div>
                                                    <div class="vc_empty_space"  style="height: 24px" ><span class="vc_empty_space_inner"></span></div>

                                                    <?= do_shortcode('[contact-form-7 id="7" title="Contact form 1"]') ?>

                                                </div>
                                            </div>
                                        </div>

                                        <?php get_template_part('templates/home/map'); ?>

                                        <div class="wpb_column vc_column_container vc_col-sm-4">
                                            <div class="vc_column-inner ">
                                                <?php get_template_part('templates/kontaktdaten'); ?>
                                                <div class="ult-spacer spacer-5829113ba8912" data-id="5829113ba8912" data-height="0" data-height-mobile="32" data-height-tab="" data-height-tab-portrait="" data-height-mobile-landscape="32" style="clear:both;display:block;"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php get_template_part('templates/footer'); ?>
    <a href="#" class="scroll-top"></a>
</div>
<script type="text/javascript">jQuery(document).ready(function() {
        cli_show_cookiebar({
            settings: '{"animate_speed_hide":"500","animate_speed_show":"500","background":"#fff","border":"#444","border_on":true,"button_1_button_colour":"#000","button_1_button_hover":"#000000","button_1_link_colour":"#fff","button_1_as_button":true,"button_2_button_colour":"#333","button_2_button_hover":"#292929","button_2_link_colour":"#444","button_2_as_button":false,"font_family":"inherit","header_fix":false,"notify_animate_hide":true,"notify_animate_show":false,"notify_div_id":"#cookie-law-info-bar","notify_position_horizontal":"right","notify_position_vertical":"bottom","scroll_close":false,"scroll_close_reload":false,"showagain_tab":false,"showagain_background":"#fff","showagain_border":"#000","showagain_div_id":"#cookie-law-info-again","showagain_x_position":"100px","text":"#000","show_once_yn":false,"show_once":"10000"}'
        });
    });
</script>
<script type="text/javascript">/*<![CDATA[*/var recaptchaWidgets = [];
    var recaptchaCallback = function() {
        var forms = document.getElementsByTagName('form');
        var pattern = /(^|\s)g-recaptcha(\s|$)/;

        for (var i = 0; i < forms.length; i++) {
            var divs = forms[i].getElementsByTagName('div');

            for (var j = 0; j < divs.length; j++) {
                var sitekey = divs[j].getAttribute('data-sitekey');

                if (divs[j].className && divs[j].className.match(pattern) && sitekey) {
                    var params = {
                        'sitekey': sitekey,
                        'theme': divs[j].getAttribute('data-theme'),
                        'type': divs[j].getAttribute('data-type'),
                        'size': divs[j].getAttribute('data-size'),
                        'tabindex': divs[j].getAttribute('data-tabindex')
                    };

                    var callback = divs[j].getAttribute('data-callback');

                    if (callback && 'function' == typeof window[callback]) {
                        params['callback'] = window[callback];
                    }

                    var expired_callback = divs[j].getAttribute('data-expired-callback');

                    if (expired_callback && 'function' == typeof window[expired_callback]) {
                        params['expired-callback'] = window[expired_callback];
                    }

                    var widget_id = grecaptcha.render(divs[j], params);
                    recaptchaWidgets.push(widget_id);
                    break;
                }
            }
        }
    }/*]]>*/
</script>
<div style="display:none"></div>
<?= View::sliderImages('home_slider_images') ?>
<!--<link rel='stylesheet' id='ultimate-tooltip-css'  href='/wp-content/plugins/Ultimate_VC_Addons/assets/min-css/tooltip.min.css?ver=3.16.1' type='text/css' media='all' />-->
<!--<link rel='stylesheet' id='vc_pageable_owl-carousel-css-css'  href='/wp-content/plugins/js_composer/assets/lib/owl-carousel2-dist/assets/owl.min.css?ver=4.11.2.1' type='text/css' media='' />-->
<!--<link rel='stylesheet' id='animate-css-css'  href='/wp-content/plugins/js_composer/assets/lib/bower/animate-css/animate.min.css?ver=4.11.2.1' type='text/css' media='' />-->
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/themes/dt-the7/js/main.min.js?ver=1.0.0'></script>-->
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/contact-form-7/includes/js/jquery.form.min.js?ver=3.51.0-2014.06.20'></script>-->
<!--<script type='text/javascript'>/*  */-->
<!--    var _wpcf7 = {"loaderUrl":"https:\/\/www.fachwerk4.de\/wp-content\/plugins\/contact-form-7\/images\/ajax-loader.gif","recaptcha":{"messages":{"empty":"Bitte best\u00e4tige, dass du nicht eine Maschine bist."}},"sending":"Senden ...","cached":"1"};-->
<!--    /*  */-->
<!--</script>-->
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/contact-form-7/includes/js/scripts.js?ver=4.5.1'></script>-->
<!--<script type='text/javascript' src='https://s0.wp.com/wp-content/js/devicepx-jetpack.js?ver=201646'></script>-->
<!--<script type='text/javascript' src='https://secure.gravatar.com/js/gprofiles.js?ver=2016Novaa'></script>-->
<!--<script type='text/javascript'>/*  */-->
<!--    var WPGroHo = {"my_hash":""};-->
<!--    /*  */-->
<!--</script>-->
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/jetpack/modules/wpgroho.js?ver=4.6.1'></script>-->
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/themes/dt-the7/js/post-type.js?ver=1.0.0'></script>-->
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-includes/js/wp-embed.min.js?ver=4.6.1'></script>-->
<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/js_composer/assets/js/dist/js_composer_front.min.js?ver=4.11.2.1'></script>
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/Ultimate_VC_Addons/assets/min-js/tooltip.min.js?ver=3.16.1'></script>-->
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/js_composer/assets/lib/owl-carousel2-dist/owl.carousel.min.js?ver=4.11.2.1'></script>-->
<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/js_composer/assets/lib/bower/imagesloaded/imagesloaded.pkgd.min.js?ver=4.6.1'></script>
<script type='text/javascript' src='https://www.fachwerk4.de/wp-includes/js/underscore.min.js?ver=1.8.3'></script>
<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/js_composer/assets/lib/waypoints/waypoints.min.js?ver=4.11.2.1'></script>
<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/js_composer/assets/js/dist/vc_grid.min.js?ver=4.11.2.1'></script>
<!--<script type='text/javascript' src='https://www.google.com/recaptcha/api.js?onload=recaptchaCallback&#038;render=explicit&#038;ver=2.0'></script>-->
<!--<script type='text/javascript' src='https://stats.wp.com/e-201646.js' async defer></script>-->
<script type='text/javascript'>
//    _stq = window._stq || [];
//    _stq.push([ 'view', {v:'ext',j:'1:4.3.2',blog:'103843918',post:'8',tz:'1',srv:'www.fachwerk4.de'} ]);
//    _stq.push([ 'clickTrackerInit', '103843918', '8' ]);
</script>
