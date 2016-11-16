<?php

use Rsu\Models\Publication;

?>
<div id="Publikationen" data-anchor="#Publikationen" class="vc_row wpb_row vc_row-fluid dt-default" style="margin-top: 0px;margin-bottom: 0px">
    <div class="wpb_column vc_column_container vc_col-sm-12">
        <div class="vc_column-inner ">
            <div class="wpb_wrapper"></div>
        </div>
    </div>
</div>
<div class="stripe stripe-style-1 outline-element-decoration outline-stripe-decoration" style="background-position: top;background-repeat: no-repeat;background-attachment: scroll;background-size: auto;padding-top: 0px;padding-bottom: 0px;margin-top: 0px;margin-bottom: 0px">
    <div class="vc_row wpb_row vc_row-fluid" style="">
        <div class="wpb_column vc_column_container vc_col-sm-12">
            <div class="vc_column-inner ">
                <div class="wpb_wrapper">
                    <div class="vc_empty_space"  style="height: 42px" ><span class="vc_empty_space_inner"></span></div>
                    <div id="ultimate-heading-34945829113b9fb4a" class="uvc-heading ult-adjust-bottom-margin ultimate-heading-34945829113b9fb4a uvc-8750 " data-hspacer="line_with_icon" data-hline_width="auto" data-hicon_type="selector" data-hborder_style="solid" data-hborder_height="1" data-hborder_color="#ccc" data-icon_width="32" data-hfixer="10"  data-halign="center" style="text-align:center">
                        <div class="uvc-main-heading ult-responsive"  data-ultimate-target='.uvc-heading.ultimate-heading-34945829113b9fb4a h3'  data-responsive-json-new='{"font-size":"","line-height":""}' >
                            <h3 style="font-weight:normal;">Publikationen</h3>
                        </div>
                        <div class="uvc-heading-spacer line_with_icon" style="topheight:32px;">
                            <div class="ult-just-icon-wrapper  ">
                                <div class="align-icon" style="text-align:center;">
                                    <div class="aio-icon none "  style="color:#d20a11;font-size:32px;display:inline-block;">
                                        <i class="Defaults-paperclip"></i>
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
                                            <p><span style="color: #4c4c4c;">Die Projekte von Fachwerk4 sind bereits in zahlreichen Fachbüchern und Fachzeitschriften, aber auch in Tageszeitungen veröffentlicht worden. Diese Berichte sowie eigene Publikationen möchten wir Ihnen hier zum Download zur Verfügung stellen.</span></p>
                                            <p>Weitere Veröffentlichungen finden Sie <a href="/publikationen/">in unserem Archiv</a>.</p>
                                        </div>
                                    </div>
                                    <div class="vc_empty_space"  style="height: 42px" ><span class="vc_empty_space_inner"></span></div>
                                    <section id="benefits-grid-1" class="benefits-grid wf-container benefits-style-two light-bg light-hover-bg accent-icon-color light-icon-hover-color" data-width="100px" data-columns="1">
                                        <style type="text/css">#benefits-grid-1 .benefits-grid-ico > .fa { font-size: 35px; line-height: 35px; }</style>

                                        <?php
                                        $my_query = (new Publication)->own();
                                        while ($my_query->have_posts()) : $my_query->the_post(); ?>
                                        ?>
                                        <div class="wf-cell">
                                            <div>
                                                <div class="text-normal">
                                                    <div class="wf-table">
                                                        <div class="wf-td"><a href="<?= the_field('pdf_file') ?>" class="benefits-grid-ico" target="_blank"><i class="<?= the_field('icon') ?>"></i></a></div>
                                                        <div class="wf-td benefits-inner">
                                                            <h6 class="benefit-title"> <a href="<?= the_field('pdf_file') ?>" target="_blank"><?= the_title() ?></a> </h6>
                                                            <p><?= the_field('detail') ?></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <?php
                                        endwhile;
                                        wp_reset_query();
                                        ?>

                                    </section>
                                    <div class="vc_empty_space"  style="height: 42px" ><span class="vc_empty_space_inner"></span></div>
                                </div>
                            </div>
                        </div>
                        <div class="wpb_column vc_column_container vc_col-sm-4">
                            <div class="vc_column-inner ">
                                <div class="wpb_wrapper">
                                    <div class="ult-spacer spacer-5829113ba2595" data-id="5829113ba2595" data-height="0" data-height-mobile="32" data-height-tab="" data-height-tab-portrait="" data-height-mobile-landscape="32" style="clear:both;display:block;"></div>
                                    <div class="wpb_text_column wpb_content_element ">
                                        <div class="wpb_wrapper">
                                            <h4>Fachmagazine &amp; Fachbücher</h4>
                                        </div>
                                    </div>
                                    <div class="vc_empty_space"  style="height: 24px" ><span class="vc_empty_space_inner"></span></div>
                                    <section id="benefits-grid-2" class="benefits-grid wf-container benefits-style-two light-bg light-hover-bg accent-icon-color light-icon-hover-color" data-width="100px" data-columns="1">
                                        <style type="text/css">#benefits-grid-2 .benefits-grid-ico > .fa { font-size: 35px; line-height: 35px; }</style>

                                        <?php
                                        $my_query = (new Publication)->newspaper();
                                        while ($my_query->have_posts()) : $my_query->the_post(); ?>
                                        ?>
                                        <div class="wf-cell">
                                            <div>
                                                <div class="text-normal">
                                                    <div class="wf-table">
                                                        <div class="wf-td"><a href="<?= the_field('pdf_file') ?>" class="benefits-grid-ico" target="_blank"><i class="<?= the_field('icon') ?>"></i></a></div>
                                                        <div class="wf-td benefits-inner">
                                                            <h6 class="benefit-title"> <a href="<?= the_field('pdf_file') ?>" target="_blank"><?= the_title() ?></a> </h6>
                                                            <p><?= the_field('detail') ?></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <?php
                                        endwhile;
                                        wp_reset_query();
                                        ?>

                                    </section>
                                    <div class="vc_empty_space"  style="height: 42px" ><span class="vc_empty_space_inner"></span></div>
                                </div>
                            </div>
                        </div>
                        <div class="wpb_column vc_column_container vc_col-sm-4">
                            <div class="vc_column-inner ">
                                <div class="wpb_wrapper">
                                    <div class="ult-spacer spacer-5829113ba4391" data-id="5829113ba4391" data-height="0" data-height-mobile="32" data-height-tab="" data-height-tab-portrait="" data-height-mobile-landscape="32" style="clear:both;display:block;"></div>
                                    <div class="wpb_text_column wpb_content_element ">
                                        <div class="wpb_wrapper">
                                            <h4>Tageszeitungen</h4>
                                        </div>
                                    </div>
                                    <div class="vc_empty_space"  style="height: 24px" ><span class="vc_empty_space_inner"></span></div>
                                    <section id="benefits-grid-3" class="benefits-grid wf-container benefits-style-two light-bg light-hover-bg accent-icon-color light-icon-hover-color" data-width="100px" data-columns="1">
                                        <style type="text/css">#benefits-grid-3 .benefits-grid-ico > .fa { font-size: 35px; line-height: 35px; }</style>

                                        <?php
                                        $my_query = (new Publication)->special();
                                        while ($my_query->have_posts()) : $my_query->the_post(); ?>
                                        ?>
                                        <div class="wf-cell">
                                            <div>
                                                <div class="text-normal">
                                                    <div class="wf-table">
                                                        <div class="wf-td"><a href="<?= the_field('pdf_file') ?>" class="benefits-grid-ico" target="_blank"><i class="<?= the_field('icon') ?>"></i></a></div>
                                                        <div class="wf-td benefits-inner">
                                                            <h6 class="benefit-title"> <a href="<?= the_field('pdf_file') ?>" target="_blank"><?= the_title() ?></a> </h6>
                                                            <p><?= the_field('detail') ?></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <?php
                                        endwhile;
                                        wp_reset_query();
                                        ?>

                                    </section>
                                    <div class="vc_empty_space"  style="height: 42px" ><span class="vc_empty_space_inner"></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
