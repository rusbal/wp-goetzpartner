<?php

use Rsu\Helper\Template;
use Rsu\Helper\View;
use Rsu\Helper\Widget;
use Rsu\Models\Publication;
use Rsu\Settings\Option;

?>
<div class="sidebar-content">
    <section id="presscore-contact-info-widget-16" class="widget widget_presscore-contact-info-widget">
        <h1><?= Template::$type ?></h1>
        <div class="widget-title"><?= Option::get('company_name') ?> | <?= Option::get('company_description') ?></div>
        <ul class="contact-info">
            <li><span class="color-primary">Telefonnummer:</span><br /><?= Option::get('telephone') ?></li>
            <li><span class="color-primary">Fax:</span><br /><?= Option::get('fax') ?></li>
            <li><span class="color-primary">E-Mail:</span><br /><?= Option::get('email') ?></li>
        </ul>
        <div class="soc-ico">
            <p class="assistive-text">Find us on:</p>
            <a title="Facebook" href="<?= Option::get('facebook') ?>" target="_blank" class="facebook"><span class="assistive-text">Facebook</span></a>
            <a title="Twitter" href="<?= Option::get('twitter') ?>" target="_blank" class="twitter"><span class="assistive-text">Twitter</span></a>
            <a title="Google+" href="<?= Option::get('google') ?>" target="_blank" class="google"><span class="assistive-text">Google+</span></a>
            <a title="Rss" href="<?= Option::get('rss') ?>" target="_blank" class="rss"><span class="assistive-text">Rss</span></a>
        </div>
    </section>
<!--    <section id="presscore-blog-posts-16" class="widget widget_presscore-blog-posts">-->
<!--        <div class="widget-title">Neue Nachrichten</div>-->
<!--        <ul class="recent-posts">-->
<!--            <li>-->
<!--                <article class="post-format-standard">-->
<!--                    <div class="wf-td"><a class="alignleft post-rollover layzr-bg" href="https://www.fachwerk4.de/gartendesigner-des-jahres-ausgezeichnet/" ><img class="lazy-load preload-me" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 60 60'%2F%3E" data-src="https://www.fachwerk4.de/wp-content/uploads/2016/11/Preisverleihung-Gartendesigner-des-Jahres-Taspo-60x60.jpg" data-srcset="https://www.fachwerk4.de/wp-content/uploads/2016/11/Preisverleihung-Gartendesigner-des-Jahres-Taspo-60x60.jpg 60w, https://www.fachwerk4.de/wp-content/uploads/2016/11/Preisverleihung-Gartendesigner-des-Jahres-Taspo-120x120.jpg 120w" width="60" height="60"  alt="GartenLandschaft Berg, Gewinner TASPO Award, Foto: © Andreas Schwarz, taspoawards.de" /></a></div>-->
<!--                    <div class="post-content"><a href="https://www.fachwerk4.de/gartendesigner-des-jahres-ausgezeichnet/">&#8222;Gartendesigner des Jahres&#8220; ausgezeichnet</a><br /><time class="text-secondary" datetime="2016-11-07T17:24:01+00:00">7. November 2016</time></div>-->
<!--                </article>-->
<!--            </li>-->
<!--            <li>-->
<!--                <article class="post-format-standard">-->
<!--                    <div class="wf-td"><a class="alignleft post-rollover layzr-bg" href="https://www.fachwerk4.de/azubi-blog-baustellenpraktikum/" ><img class="lazy-load preload-me" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 60 60'%2F%3E" data-src="https://www.fachwerk4.de/wp-content/uploads/2016/10/baustelle-60x60.jpg" data-srcset="https://www.fachwerk4.de/wp-content/uploads/2016/10/baustelle-60x60.jpg 60w, https://www.fachwerk4.de/wp-content/uploads/2016/10/baustelle-120x120.jpg 120w" width="60" height="60"  alt="" /></a></div>-->
<!--                    <div class="post-content"><a href="https://www.fachwerk4.de/azubi-blog-baustellenpraktikum/">Azubi-Blog: Baustellenpraktikum oder &#8222;Stein auf Stein&#8220;</a><br /><time class="text-secondary" datetime="2016-10-12T12:38:17+00:00">12. Oktober 2016</time></div>-->
<!--                </article>-->
<!--            </li>-->
<!--            <li>-->
<!--                <article class="post-format-standard">-->
<!--                    <div class="wf-td"><a class="alignleft post-rollover layzr-bg" href="https://www.fachwerk4.de/ein-weiteres-jubilaeum/" ><img class="lazy-load preload-me" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 60 60'%2F%3E" data-src="https://www.fachwerk4.de/wp-content/uploads/2016/10/10jahre-ik-60x60.jpg" data-srcset="https://www.fachwerk4.de/wp-content/uploads/2016/10/10jahre-ik-60x60.jpg 60w, https://www.fachwerk4.de/wp-content/uploads/2016/10/10jahre-ik-120x120.jpg 120w" width="60" height="60"  alt="" /></a></div>-->
<!--                    <div class="post-content"><a href="https://www.fachwerk4.de/ein-weiteres-jubilaeum/">Ein weiteres Jubiläum, das wir gefeiert haben</a><br /><time class="text-secondary" datetime="2016-10-10T09:17:03+00:00">10. Oktober 2016</time></div>-->
<!--                </article>-->
<!--            </li>-->
<!--            <li>-->
<!--                <article class="post-format-standard">-->
<!--                    <div class="wf-td"><a class="alignleft post-rollover layzr-bg" href="https://www.fachwerk4.de/architektur-buch-15-jahre/" ><img class="lazy-load preload-me" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 60 60'%2F%3E" data-src="https://www.fachwerk4.de/wp-content/uploads/2016/09/architekturbuch-fachwerk4-60x60.jpg" data-srcset="https://www.fachwerk4.de/wp-content/uploads/2016/09/architekturbuch-fachwerk4-60x60.jpg 60w, https://www.fachwerk4.de/wp-content/uploads/2016/09/architekturbuch-fachwerk4-120x120.jpg 120w" width="60" height="60"  alt="" /></a></div>-->
<!--                    <div class="post-content"><a href="https://www.fachwerk4.de/architektur-buch-15-jahre/">15 Jahre Fachwerk4 auf 190 Seiten</a><br /><time class="text-secondary" datetime="2016-09-27T07:30:37+00:00">27. September 2016</time></div>-->
<!--                </article>-->
<!--            </li>-->
<!--        </ul>-->
<!--    </section>-->

    <?= Widget::show(Template::$type); ?>

</div>