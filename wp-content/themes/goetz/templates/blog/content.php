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

        <div class="dt-fancy-separator title-left fancy-posts-title">
            <div class="dt-fancy-title">Weitere Nachrichten<span class="separator-holder separator-right"></span></div>
        </div>
        <section class="items-grid wf-container">
            <div class="wf-cell wf-1-2">
                <div class="borders">
                    <article class="post-format-aside">
                        <div class="wf-td">
                            <a class="alignleft post-rollover layzr-bg" href="https://www.fachwerk4.de/wohnhaus-s-heinze-architekten-award/" ><img
                                    class="lazy-load preload-me" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 60 60'%2F%3E" data-src="https://www.fachwerk4.de/wp-content/uploads/2016/03/heinze-architekten-award-fachwerk4-60x60.jpg" data-srcset="https://www.fachwerk4.de/wp-content/uploads/2016/03/heinze-architekten-award-fachwerk4-60x60.jpg 60w, https://www.fachwerk4.de/wp-content/uploads/2016/03/heinze-architekten-award-fachwerk4-120x120.jpg 120w" width="60" height="60"  alt="Teilnahme am Heinze ArchitektenAWARD | Fachwerk4" /></a>
                        </div>
                        <div class="post-content">
                            <a href="https://www.fachwerk4.de/wohnhaus-s-heinze-architekten-award/">Wohnhaus S im Voting für den Heinze ArchitektenAWARD</a><br /><time class="text-secondary" datetime="2016-03-23T11:36:00+00:00">23. März 2016</time>
                        </div>
                    </article>
                </div>
            </div>
            <div class="wf-cell wf-1-2">
                <div class="borders">
                    <article class="post-format-standard">
                        <div class="wf-td">
                            <a class="alignleft post-rollover layzr-bg" href="https://www.fachwerk4.de/mehr-effizienz-architektur-und-energieeffizienz/" ><img class="lazy-load preload-me" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 60 60'%2F%3E" data-src="https://www.fachwerk4.de/wp-content/uploads/2015/08/Mehr-Effizienz-Architektur-Energieeffizienz-60x60.jpg" data-srcset="https://www.fachwerk4.de/wp-content/uploads/2015/08/Mehr-Effizienz-Architektur-Energieeffizienz-60x60.jpg 60w, https://www.fachwerk4.de/wp-content/uploads/2015/08/Mehr-Effizienz-Architektur-Energieeffizienz-120x120.jpg 120w" width="60" height="60"  alt="Mehr Effizienz | Architektur und Energieeffizienz | © Architektenkammer Rheinland Pfalz | Fachwerk4 | Architekten BDA" /></a>
                        </div>
                        <div class="post-content">
                            <a href="https://www.fachwerk4.de/mehr-effizienz-architektur-und-energieeffizienz/">Mehr Effizienz! Architektur und Energieeffizienz</a><br /><time class="text-secondary" datetime="2015-08-03T17:47:28+00:00">3. August 2015</time>
                        </div>
                    </article>
                </div>
            </div>
            <div class="wf-cell wf-1-2">
                <div class="borders">
                    <article class="post-format-standard">
                        <div class="wf-td">
                            <a class="alignleft post-rollover layzr-bg" href="https://www.fachwerk4.de/mehrfamilienhaus-himmelfeld-im-buch-haeuser-des-jahres-2012-callwey/" ><img class="lazy-load preload-me" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 60 60'%2F%3E" data-src="https://www.fachwerk4.de/wp-content/uploads/2012/10/haeuser_des_jahres_callwey_011-60x60.jpg" data-srcset="https://www.fachwerk4.de/wp-content/uploads/2012/10/haeuser_des_jahres_callwey_011-60x60.jpg 60w, https://www.fachwerk4.de/wp-content/uploads/2012/10/haeuser_des_jahres_callwey_011-120x120.jpg 120w" width="60" height="60"  alt="Fachwerk4 | Architekten BDA, Callwey: Häuser des Jahres, Die Jury bei der Auswahl" /></a>
                        </div>
                        <div class="post-content">
                            <a href="https://www.fachwerk4.de/mehrfamilienhaus-himmelfeld-im-buch-haeuser-des-jahres-2012-callwey/">Mehrfamilienhaus Himmelfeld im Buch Häuser des Jahres 2012, Callwey-Verlag</a><br />
                            <time class="text-secondary" datetime="2012-10-04T11:55:46+00:00">4. Oktober 2012</time>
                        </div>
                    </article>
                </div>
            </div>
            <div class="wf-cell wf-1-2">
                <div class="borders">
                    <article class="post-format-standard">
                        <div class="wf-td">
                            <a class="alignleft post-rollover layzr-bg" href="https://www.fachwerk4.de/tag-der-architektur-2012/" ><img
                                    class="lazy-load preload-me" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 60 60'%2F%3E" data-src="https://www.fachwerk4.de/wp-content/uploads/2012/05/tda12-60x60.jpg" data-srcset="https://www.fachwerk4.de/wp-content/uploads/2012/05/tda12-60x60.jpg 60w, https://www.fachwerk4.de/wp-content/uploads/2012/05/tda12-120x120.jpg 120w" width="60" height="60"  alt="" /></a></div>
                        <div class="post-content">
                            <a href="https://www.fachwerk4.de/tag-der-architektur-2012/">Rückschau: Tag der Architektur 2012</a><br />
                            <time class="text-secondary" datetime="2012-06-24T21:39:39+00:00">24. Juni 2012</time>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    </article>
</div>