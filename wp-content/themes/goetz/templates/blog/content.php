<?php

use Rsu\Helper\View;

$id = get_the_ID();

?>
<div id="content" class="content" role="main">
    <article id="post-<?= $id ?>" class="post-<?= $id ?> post type-post status-publish format-standard has-post-thumbnail category-preise-und-auszeichnungen description-off">

        <?= View::featuredImage($id) ?>

        <div class="vc_row wpb_row vc_row-fluid dt-default" style="margin-top: 0px;margin-bottom: 0px">
            <div class="wpb_column vc_column_container vc_col-sm-12">
                <div class="vc_column-inner ">
                    <div class="wpb_wrapper">
                        <div class="vc_empty_space"  style="height: 32px" ><span class="vc_empty_space_inner"></span></div>
                        <div class="wpb_text_column wpb_content_element ">
                            <div class="wpb_wrapper">
                                <?= the_content(); ?>
                            </div>
                        </div>
                        <?//= View::spacer() ?>
                        <?//= View::spacer() ?>
<!--                                        <div class="wpb_text_column wpb_content_element ">-->
<!--                                            <div class="wpb_wrapper">-->
<!--                                                <p>Beitragsfoto: © Andreas Schwarz, <a href="http://taspoawards.de" target="_blank">taspoawards.de<br />-->
<!--                                                    </a>Projekt-Fotos: [1] © <a href="http://volkermichael.com" target="_blank">Volker Michael</a> und [2 + 3] © <a href="http://christian-eblenkamp.de" target="_blank">Christian Eblenkamp</a>-->
<!--                                                </p>-->
<!--                                            </div>-->
<!--                                        </div>-->
                    </div>
                </div>
            </div>
        </div>
        <div class="post-meta wf-mobile-collapsed">
            <div class="project-share-overlay allways-visible-icons">
                <a href="#" class="share-button entry-share h5-size">Teilen Sie diesen Blogbeitrag!</a>
                <div class="soc-ico">
                    <?= View::facebookShareLink() ?>
                    <?= View::twitterShareLink() ?>
                    <?= View::googleShareLink() ?>
                </div>
            </div>
        </div>

        <?= View::authorInfoDiv() ?>

        <?= View::otherBlogPosts() ?>

    </article>
</div>