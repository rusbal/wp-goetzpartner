<!DOCTYPE html>
<!--[if lt IE 10 ]> <html lang="de-DE" prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#" class="old-ie no-js"> <![endif]-->
<!--[if !(IE 6) | !(IE 7) | !(IE 8)  ]><!--> <html lang="de-DE" prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#" class="no-js"> <!--<![endif]-->
<head>
    <?php
    //    get_template_part('templates/head_21');
    //    get_template_part('templates/head_22');
    //    get_template_part('templates/head_23');
    //    get_template_part('templates/head_54');

    wp_head();

    //    get_template_part('templates/head_24'); /* keeps division of columns */
    //    get_template_part('templates/head_25'); /* keeps the slender fonts */
    ?>
    <link rel='stylesheet' id='dt-web-fonts-css'  href='https://fonts.googleapis.com/css?family=Open+Sans%3A300%2C400%2C600%7CRoboto+Condensed%3A300%2C400%2C700&#038;ver=4.6.1' type='text/css' media='all' />
    <?php

    //    get_template_part('templates/head_3'); /* shows the red loading first screen */

    ?>
    <!--[if lt IE 10]> <link rel='stylesheet' id='dt-old-ie-css'  href='https://www.fachwerk4.de/wp-content/themes/dt-the7/css/old-ie.css?ver=1.0.0' type='text/css' media='all' /> <![endif]-->
    <!--<link rel='stylesheet' id='dt-awsome-fonts-css'  href='https://www.fachwerk4.de/wp-content/themes/dt-the7/fonts/FontAwesome/css/font-awesome.min.css?ver=1.0.0' type='text/css' media='all' />-->
    <?php
    //    get_template_part('templates/head_41'); /* keeps the circle play/pause images */
    //    get_template_part('templates/head_42'); /* keeps font */
    ?>
    <!--[if lt IE 10]> <link rel='stylesheet' id='dt-custom-old-ie.less-css'  href='https://www.fachwerk4.de/wp-content/uploads/wp-less/dt-the7/css/custom-old-ie-5a1d7534ce.css?ver=1.0.0' type='text/css' media='all' /> <![endif]-->
    <link rel='stylesheet' id='dt-custom.less-css'  href='<?= get_template_directory_uri() ?>/dist/styles/custom.css?ver=1.0.0' type='text/css' media='all' />
    <?php

    get_template_part('templates/head_51'); /* the red horizontal division */
    get_template_part('templates/head_52'); /* the loading of images */
    get_template_part('templates/head_53'); /* the loading of images also */
    ?>
    <style>
        body.home div.masthead {
            background-color: rgba(58,58,58,0.6) !important;
        }
    </style>
    <script>
        jQuery(function($){
            var pathname = window.location.pathname;
            if (pathname == '/') {
                $('#primary-menu').find('li:first').addClass('act');
                $('#mobile-menu').find('li:first').addClass('act');
            } else if (pathname == '/publication/') {
                $('#primary-menu').find('li:nth-child(5n)').addClass('act');
                $('#mobile-menu').find('li:nth-child(5n)').addClass('act');
            }
        });
    </script>
</head>
<?php

use Roots\Sage\Wrapper;

include Wrapper\template_path();

?>
</html>
