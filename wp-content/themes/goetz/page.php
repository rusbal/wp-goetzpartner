<body class="page page-id-13 page-template page-template-template-blog-masonry page-template-template-blog-masonry-php blog layout-masonry description-under-image fancy-header-on large-hover-icons boxed-layout overlay-cursor-on srcset-enabled btn-flat custom-btn-color custom-btn-hover-color shadow-element-decoration filter-style-material contact-form-minimal large-fancy-datas blur-page outlines-bullets light-icons phantom-sticky phantom-shadow-decoration phantom-custom-logo-on sticky-mobile-header top-header first-switch-logo-center first-switch-menu-right second-switch-logo-left second-switch-menu-right right-mobile-menu layzr-loading-on wpb-js-composer js-comp-ver-4.11.2.1 vc_responsive accent-portfolio-icons album-minuatures-style-2">
<div id="load" class="ring-loader">
    <div class="load-wrap"></div>
</div>
<div id="page" class="boxed">

    <?php use Rsu\Helper\Template;

    get_template_part('templates/header'); ?>

    <div id="main" class="sidebar-right">
        <div class="main-gradient"></div>
        <div class="wf-wrap">
            <div class="wf-container-main">
                <div id="content" class="content" role="main">
                    <div class="vc_row wpb_row vc_row-fluid dt-default" style="margin-top: 0px;margin-bottom: 0px">
                        <div class="wpb_column vc_column_container vc_col-sm-12">
                            <div class="vc_column-inner ">
                                <div class="wpb_wrapper">
                                    <?php while (have_posts()) : the_post(); ?>
                                        <?php get_template_part('templates/page', 'header'); ?>
                                        <?php get_template_part('templates/content', 'page'); ?>
                                    <?php endwhile; ?>
                                </div>
                            </div>
                        </div>
                    </div>
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
<div style="display:none"></div>
