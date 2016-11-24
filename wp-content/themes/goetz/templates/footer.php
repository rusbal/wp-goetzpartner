<?php

use Rsu\Settings\Option;

?>
<footer id="footer" class="footer solid-bg">
    <div id="bottom-bar" class="solid-bg" role="contentinfo">
        <div class="wf-wrap">
            <div class="wf-container-bottom">
                <div class="wf-table wf-mobile-collapsed">
                    <div id="branding-bottom" class="wf-td">
                        <a href="https://www.fachwerk4.de/">
                            <?= wp_get_attachment_image( Option::get('footer_logo'), 'full', false, ['class' => 'preload-me']) ?>
                        </a>
                    </div>
                    <div class="wf-td"></div>
                    <div class="wf-td bottom-text-block">
                        <p>© 2016 <?= Option::get('company_name') ?>. Alle Rechte vorbehalten. | <a href="/impressum">Impressum</a> | <a href="/datenschutz">Datenschutz</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
