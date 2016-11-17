<?php

namespace Rsu\Helper;


use Rsu\Models\Publication;

class Widget
{
    public static function publication()
    {
        return '
            <section id="text-17" class="widget widget_text">
                <div class="widget-title">Downloads</div>
                    <div class="textwidget">
                        <section id="benefits-grid-4" class="benefits-grid wf-container benefits-style-two icons-bg light-bg accent-hover-bg accent-icon-color light-icon-hover-color" data-width="180px" data-columns="1">
                            <style type="text/css">#benefits-grid-4.icons-bg .benefits-grid-ico { height: 44px; line-height: 44px; width: 44px;-webkit-border-radius: 100px;-moz-border-radius: 100px;-ms-border-radius: 100px;-o-border-radius: 100px;border-radius: 100px; }#benefits-grid-4.icons-bg .benefits-grid-ico > .fa { font-size: 24px; line-height: 44px; }</style>
                            ' . View::wfCell((new Publication)->own(), 'h6', 'text-small') . '
                        </section>
                </div>
            </section>';
    }

    public static function project()
    {
        return <<<STRING
        <section id="presscore-blog-posts-3" class="widget widget_presscore-blog-posts">
            <div class="widget-title">Neue Nachrichten</div>
            <ul class="recent-posts">
                <li>
                    <article class="post-format-standard">
                        <div class="wf-td">
                            <a class="alignleft post-rollover layzr-bg" href="https://www.fachwerk4.de/gartendesigner-des-jahres-ausgezeichnet/" ><img class="lazy-load preload-me" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 60 60'%2F%3E" data-src="https://www.fachwerk4.de/wp-content/uploads/2016/11/Preisverleihung-Gartendesigner-des-Jahres-Taspo-60x60.jpg" data-srcset="https://www.fachwerk4.de/wp-content/uploads/2016/11/Preisverleihung-Gartendesigner-des-Jahres-Taspo-60x60.jpg 60w, https://www.fachwerk4.de/wp-content/uploads/2016/11/Preisverleihung-Gartendesigner-des-Jahres-Taspo-120x120.jpg 120w" width="60" height="60"  alt="GartenLandschaft Berg, Gewinner TASPO Award, Foto: © Andreas Schwarz, taspoawards.de" /></a>
                        </div>
                        <div class="post-content">
                            <a href="https://www.fachwerk4.de/gartendesigner-des-jahres-ausgezeichnet/">&#8222;Gartendesigner des Jahres&#8220; ausgezeichnet</a><br /><time class="text-secondary" datetime="2016-11-07T17:24:01+00:00">7. November 2016</time>
                        </div>
                    </article>
                </li>
                <li>
                    <article
                        class="post-format-standard">
                        <div
                            class="wf-td"><a
                                class="alignleft post-rollover layzr-bg" href="https://www.fachwerk4.de/azubi-blog-baustellenpraktikum/" ><img
                                    class="lazy-load preload-me" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 60 60'%2F%3E" data-src="https://www.fachwerk4.de/wp-content/uploads/2016/10/baustelle-60x60.jpg" data-srcset="https://www.fachwerk4.de/wp-content/uploads/2016/10/baustelle-60x60.jpg 60w, https://www.fachwerk4.de/wp-content/uploads/2016/10/baustelle-120x120.jpg 120w" width="60" height="60"  alt="" /></a></div>
                        <div
                            class="post-content"><a
                                href="https://www.fachwerk4.de/azubi-blog-baustellenpraktikum/">Azubi-Blog: Baustellenpraktikum oder &#8222;Stein auf Stein&#8220;</a><br
                            /><time
                                class="text-secondary" datetime="2016-10-12T12:38:17+00:00">12. Oktober 2016</time></div>
                    </article>
                </li>
                <li>
                    <article
                        class="post-format-standard">
                        <div
                            class="wf-td"><a
                                class="alignleft post-rollover layzr-bg" href="https://www.fachwerk4.de/ein-weiteres-jubilaeum/" ><img
                                    class="lazy-load preload-me" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 60 60'%2F%3E" data-src="https://www.fachwerk4.de/wp-content/uploads/2016/10/10jahre-ik-60x60.jpg" data-srcset="https://www.fachwerk4.de/wp-content/uploads/2016/10/10jahre-ik-60x60.jpg 60w, https://www.fachwerk4.de/wp-content/uploads/2016/10/10jahre-ik-120x120.jpg 120w" width="60" height="60"  alt="" /></a></div>
                        <div
                            class="post-content"><a
                                href="https://www.fachwerk4.de/ein-weiteres-jubilaeum/">Ein weiteres Jubiläum, das wir gefeiert haben</a><br
/><time
                                class="text-secondary" datetime="2016-10-10T09:17:03+00:00">10. Oktober 2016</time></div>
                    </article>
                </li>
                <li>
                    <article
                        class="post-format-standard">
                        <div
                            class="wf-td"><a
                                class="alignleft post-rollover layzr-bg" href="https://www.fachwerk4.de/architektur-buch-15-jahre/" ><img
                                    class="lazy-load preload-me" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 60 60'%2F%3E" data-src="https://www.fachwerk4.de/wp-content/uploads/2016/09/architekturbuch-fachwerk4-60x60.jpg" data-srcset="https://www.fachwerk4.de/wp-content/uploads/2016/09/architekturbuch-fachwerk4-60x60.jpg 60w, https://www.fachwerk4.de/wp-content/uploads/2016/09/architekturbuch-fachwerk4-120x120.jpg 120w" width="60" height="60"  alt="" /></a></div>
                        <div
                            class="post-content"><a
                                href="https://www.fachwerk4.de/architektur-buch-15-jahre/">15 Jahre Fachwerk4 auf 190 Seiten</a><br
/><time
                                class="text-secondary" datetime="2016-09-27T07:30:37+00:00">27. September 2016</time></div>
                    </article>
                </li>
            </ul>
        </section>
        <section
            id="presscore-portfolio-2" class="widget widget_presscore-portfolio">
            <div
                class="widget-title">Neue Projekte</div>
            <div
                class="instagram-photos" data-image-max-width="150">
                <a
                    href="https://www.fachwerk4.de/projekt/haus-eifel/" title="Haus Eifel" class="post-rollover layzr-bg" ><img
                        class="lazy-load preload-me" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 150 150'%2F%3E" data-src="https://www.fachwerk4.de/wp-content/uploads/2015/03/Fachwerk4-Moderne-Architektur-Haus-G-14-150x150.jpg" data-srcset="https://www.fachwerk4.de/wp-content/uploads/2015/03/Fachwerk4-Moderne-Architektur-Haus-G-14-150x150.jpg 150w, https://www.fachwerk4.de/wp-content/uploads/2015/03/Fachwerk4-Moderne-Architektur-Haus-G-14-300x300.jpg 300w" width="150" height="150"  alt="Fachwerk4 | Architekten BDA, Haus Eifel, Bad Münstereifel, Winterstimmung, Ansicht Nordseite" /></a><a
                    href="https://www.fachwerk4.de/projekt/innenarchitektur-physiotherapiepraxis/" title="Praxis für Physiotherapie" class="post-rollover layzr-bg" ><img
                        class="lazy-load preload-me" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 150 150'%2F%3E" data-src="https://www.fachwerk4.de/wp-content/uploads/2015/05/Korte_06-150x150.jpg" data-srcset="https://www.fachwerk4.de/wp-content/uploads/2015/05/Korte_06-150x150.jpg 150w, https://www.fachwerk4.de/wp-content/uploads/2015/05/Korte_06-300x300.jpg 300w" width="150" height="150"  alt="Fachwerk4 | Architekten BDA, Praxis für Physiotherapie, Montabaur, Behandlungszimmer" /></a><a
                    href="https://www.fachwerk4.de/projekt/wohnhaus-s/" title="Wohnhaus S" class="post-rollover layzr-bg" ><img
                        class="lazy-load preload-me" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 150 150'%2F%3E" data-src="https://www.fachwerk4.de/wp-content/uploads/2014/03/moderne-architektur-fw4-02-150x150.jpg" data-srcset="https://www.fachwerk4.de/wp-content/uploads/2014/03/moderne-architektur-fw4-02-150x150.jpg 150w, https://www.fachwerk4.de/wp-content/uploads/2014/03/moderne-architektur-fw4-02-300x300.jpg 300w" width="150" height="150"  alt="Fachwerk4 | Architekten BDA, Wohnhaus S, Montabaur, Straßenansicht / Eingang" /></a><a
                    href="https://www.fachwerk4.de/projekt/reisebuero-montabaur/" title="Reisebüro" class="post-rollover layzr-bg" ><img
                        class="lazy-load preload-me" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 150 150'%2F%3E" data-src="https://www.fachwerk4.de/wp-content/uploads/2015/03/Fachwerk4-Moderne-Architektur-Reisebuero-03-150x150.jpg" data-srcset="https://www.fachwerk4.de/wp-content/uploads/2015/03/Fachwerk4-Moderne-Architektur-Reisebuero-03-150x150.jpg 150w, https://www.fachwerk4.de/wp-content/uploads/2015/03/Fachwerk4-Moderne-Architektur-Reisebuero-03-300x300.jpg 300w" width="150" height="150"  alt="Fachwerk4 | Architekten BDA, Reisebüro, Montabaur, Wartebereich" /></a>
            </div>
        </section>
STRING;
    }

    public static function show($type)
    {
        return self::$type();
    }
}