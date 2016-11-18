<?php

use Rsu\Helper\View;

?>
<div class="wf-container with-ajax loading-effect-fade-in lazy-loading-mode iso-container bg-under-post description-under-image content-align-left" data-padding="10px" data-cur-page="1" data-width="300px" data-columns="3">

    <?php

    while (have_posts()) : the_post(); ?>

    <div class="wf-cell iso-item category-66" data-post-id="17779" data-date="2016-11-07T17:24:01+00:00" data-name="&quot;Gartendesigner des Jahres&quot; ausgezeichnet">
        <article class="post post-17779 type-post status-publish format-standard has-post-thumbnail hentry category-preise-und-auszeichnungen bg-on description-off">
            <div class="blog-media wf-td">
                <p><a href="<?= get_the_permalink() ?>" class="alignnone rollover layzr-bg" >
                    <?= get_the_post_thumbnail(null, 'post-thumbnail', ['class' => 'preload-me']) ?>
                </a></p>
            </div>
            <div class="blog-content wf-td">
                <h3 class="entry-title">
                    <a href="<?= get_the_permalink() ?>" title="<?= get_the_title() ?>" rel="bookmark"><?= get_the_title() ?></a>
                </h3>
                <?= get_the_excerpt() ?>
                <a href="<?= get_the_permalink() ?>" class="details more-link" rel="nofollow">Details</a>
                <div class="entry-meta">
                    <?= View::dayLink() ?>
                    <a class="author vcard" href="<?= get_author_posts_url(get_the_author_meta('ID')) ?>" title="View all posts by <?= get_the_author() ?>" rel="author">By <span class="fn"><?= get_the_author() ?></span></a>
                </div>
            </div>
        </article>
    </div>

    <?php endwhile; ?>

</div>