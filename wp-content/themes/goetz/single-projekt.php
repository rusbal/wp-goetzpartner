<?php

use Rsu\Helper\Template;
use Rsu\Helper\View;

?>
<body class="single single-portfolio postid-16383 no-comments title-off large-hover-icons boxed-layout overlay-cursor-on srcset-enabled btn-flat custom-btn-color custom-btn-hover-color shadow-element-decoration filter-style-material contact-form-minimal large-fancy-datas blur-page outlines-bullets light-icons phantom-sticky phantom-shadow-decoration phantom-custom-logo-on sticky-mobile-header top-header first-switch-logo-center first-switch-menu-right second-switch-logo-left second-switch-menu-right right-mobile-menu layzr-loading-on wpb-js-composer js-comp-ver-4.11.2.1 vc_responsive accent-portfolio-icons album-minuatures-style-2">
<div id="load" class="ring-loader">
    <div class="load-wrap"></div>
</div>
<div id="page" class="boxed">

    <?php get_template_part('templates/header'); ?>

    <div id="main" class="sidebar-right">
        <div class="main-gradient"></div>
        <div class="wf-wrap">
            <div class="wf-container-main">
                <div class="article-top-bar disabled-bg post-meta-disabled">
                    <div class="wf-wrap">
                        <div class="wf-container-top">
                            <div class="navigation-inner">
                                <div class="single-navigation-wrap">
                                    <a class="prev-post disabled" href="javascript:void(0);"></a>
                                    <a class="back-to-list" href="https://www.fachwerk4.de/portfolio/"></a>
                                    <a class="next-post" href="https://www.fachwerk4.de/projekt/innenarchitektur-physiotherapiepraxis/" rel="prev"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="content" class="content" role="main">
                    <article id="post-16383" class="project-post post-16383 dt_portfolio type-dt_portfolio status-publish has-post-thumbnail dt_portfolio_category-ausgewaehlte-projekte dt_portfolio_category-einfamilienhaeuser-mehrfamilienhaeuser dt_portfolio_category-innenausbau-und-moebeldesign description-off">
                        <div class="wf-container">
                            <div class="wf-cell wf-1-3 project-content">
                                <div class="vc_row wpb_row vc_row-fluid dt-default" style="margin-top: 0px;margin-bottom: 0px">
                                    <div class="wpb_column vc_column_container vc_col-sm-12">
                                        <div class="vc_column-inner ">
                                            <div class="wpb_wrapper">
                                                <div class="wpb_text_column wpb_content_element ">
                                                    <div class="wpb_wrapper">
                                                        <h3> <strong><?= get_the_title() ?></strong> </h3>
                                                        <p>
                                                            <?= View::projectValuePairData() ?>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="vc_empty_space"  style="height: 24px" > <span class="vc_empty_space_inner"></span> </div>
                                                <div class="wpb_text_column wpb_content_element ">
                                                    <div class="wpb_wrapper">
                                                        <p> <strong><?= get_field('description_title') ?></strong> </p>
                                                        <?= get_field('description_text') ?>
                                                    </div>
                                                </div>

                                                <?= View::projectCredits() ?>

                                                <div class="vc_empty_space"  style="height: 24px" > <span class="vc_empty_space_inner"></span> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="project-content-btn">
                                    <div class="project-share-overlay allways-visible-icons">
                                        <a href="#" class="share-button entry-share h5-size">Teilen Sie dieses Projekt!</a>
                                        <div class="soc-ico">
                                            <?= View::facebookShareLink() ?>
                                            <?= View::twitterShareLink() ?>
                                            <?= View::googleShareLink() ?>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <?= View::projectImages() ?>

                        </div>
                    </article>
                </div>
                <aside id="sidebar" class="sidebar">
                    <?php Template::part('project', 'templates/aside/sidebar'); ?>
                </aside>
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
    });</script>
<div style="display:none"></div>
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/themes/dt-the7/js/main.min.js?ver=1.0.0'></script>-->
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/contact-form-7/includes/js/jquery.form.min.js?ver=3.51.0-2014.06.20'></script>-->
<!--<script type='text/javascript'>/*  */-->
<!--    var _wpcf7 = {"loaderUrl":"https:\/\/www.fachwerk4.de\/wp-content\/plugins\/contact-form-7\/images\/ajax-loader.gif","recaptcha":{"messages":{"empty":"Bitte best\u00e4tige, dass du nicht eine Maschine bist."}},"sending":"Senden ...","cached":"1"};-->
<!--    /*  */</script>-->
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/contact-form-7/includes/js/scripts.js?ver=4.5.1'></script>-->
<!--<script type='text/javascript' src='https://s0.wp.com/wp-content/js/devicepx-jetpack.js?ver=201647'></script>-->
<!--<script type='text/javascript' src='https://secure.gravatar.com/js/gprofiles.js?ver=2016Novaa'></script>-->
<!--<script type='text/javascript'>/*  */-->
<!--    var WPGroHo = {"my_hash":""};-->
<!--    /*  */</script>-->
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/jetpack/modules/wpgroho.js?ver=4.6.1'></script>-->
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/themes/dt-the7/js/post-type.js?ver=1.0.0'></script>-->
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-includes/js/wp-embed.min.js?ver=4.6.1'></script>-->
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/js_composer/assets/js/dist/js_composer_front.min.js?ver=4.11.2.1'></script>-->
<!--<script type='text/javascript' src='https://stats.wp.com/e-201647.js' async defer></script>-->
<!--<script type='text/javascript'>-->
<!--    _stq = window._stq || [];-->
<!--    _stq.push([ 'view', {v:'ext',j:'1:4.3.2',blog:'103843918',post:'16383',tz:'1',srv:'www.fachwerk4.de'} ]);-->
<!--    _stq.push([ 'clickTrackerInit', '103843918', '16383' ]);-->
<!--</script>-->
