<?php

use Rsu\Helper\View;
use Rsu\Models\Category;

?>
<body class="page page-id-15032 page-template page-template-template-portfolio-jgrid page-template-template-portfolio-jgrid-php portfolio layout-grid grid-text-hovers description-on-hover fancy-header-on large-hover-icons boxed-layout justified-grid overlay-cursor-on srcset-enabled btn-flat custom-btn-color custom-btn-hover-color shadow-element-decoration filter-style-material contact-form-minimal large-fancy-datas blur-page outlines-bullets light-icons phantom-sticky phantom-shadow-decoration phantom-custom-logo-on sticky-mobile-header top-header first-switch-logo-center first-switch-menu-right second-switch-logo-left second-switch-menu-right right-mobile-menu layzr-loading-on wpb-js-composer js-comp-ver-4.11.2.1 vc_responsive accent-portfolio-icons album-minuatures-style-2">
<div id="load" class="ring-loader">
    <div class="load-wrap"></div>
</div>
<div id="page" class="boxed">

    <?php get_template_part('templates/header'); ?>

    <div id="main" class="sidebar-none">
        <div class="main-gradient"></div>
        <div class="wf-wrap">
            <div class="wf-container-main">
                <div id="content" class="content" role="main">

                    <?= View::projectAjaxLinks() ?>

                    <div class="wf-container jg-container with-ajax loading-effect-fade-in lazy-loading-mode iso-grid description-on-hover hover-style-two hover-fade content-align-centre" data-padding="6px" data-cur-page="1" data-target-height="280px">

                        <?= View::portfolioArchive() ?>

                    </div>

<!--                    <div class="paginator paginator-more-button with-ajax">-->
<!--                        <a class="button-load-more button-lazy-loading" href="javascript:void(0);" data-dt-page="1" >-->
<!--                            <span class="stick"></span>-->
<!--                            <span class="stick"></span>-->
<!--                            <span class="stick"></span>-->
<!--                            <span class="h5-size button-caption">Lade...</span>-->
<!--                        </a>-->
<!--                    </div>-->

                </div>
            </div>
        </div>
    </div>

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
<div style="display:none"></div>
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/themes/dt-the7/js/main.min.js?ver=1.0.0'></script>-->
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/contact-form-7/includes/js/jquery.form.min.js?ver=3.51.0-2014.06.20'></script>-->
<!--<script type='text/javascript'>/*  */-->
<!--    var _wpcf7 = {"loaderUrl":"https:\/\/www.fachwerk4.de\/wp-content\/plugins\/contact-form-7\/images\/ajax-loader.gif","recaptcha":{"messages":{"empty":"Bitte best\u00e4tige, dass du nicht eine Maschine bist."}},"sending":"Senden ...","cached":"1"};-->
<!--    /*  */-->
<!--</script>-->
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/contact-form-7/includes/js/scripts.js?ver=4.5.1'></script>-->
<!--<script type='text/javascript' src='https://s0.wp.com/wp-content/js/devicepx-jetpack.js?ver=201647'></script>-->
<!--<script type='text/javascript' src='https://secure.gravatar.com/js/gprofiles.js?ver=2016Novaa'></script>-->
<!--<script type='text/javascript'>/*  */-->
<!--    var WPGroHo = {"my_hash":""};-->
<!--    /*  */-->
<!--</script>-->
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/jetpack/modules/wpgroho.js?ver=4.6.1'></script>-->
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/themes/dt-the7/js/post-type.js?ver=1.0.0'></script>-->
<!--<script type='text/javascript' src='https://www.fachwerk4.de/wp-includes/js/wp-embed.min.js?ver=4.6.1'></script>-->
<script type='text/javascript'>
//    _stq = window._stq || [];
//    _stq.push([ 'view', {v:'ext',j:'1:4.3.2',blog:'103843918',post:'15032',tz:'1',srv:'www.fachwerk4.de'} ]);
//    _stq.push([ 'clickTrackerInit', '103843918', '15032' ]);
</script>
</body>
