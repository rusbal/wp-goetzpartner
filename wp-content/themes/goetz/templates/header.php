<?php

use Rsu\Settings\Option;

?>
<header class="header-bar">
    <div class="branding">
        <a href="/">
            <?= wp_get_attachment_image( Option::get('header_logo'), 'full', false, ['class' => 'preload-me']) ?>
            <?= wp_get_attachment_image( Option::get('header_logo'), 'full', false, ['class' => 'mobile-logo preload-me']) ?>
        </a>
        <div id="site-title" class="assistive-text">Fachwerk4</div>
        <div id="site-description" class="assistive-text">Elegante und moderne Architektur</div>
    </div>
    <ul id="primary-menu" class="main-nav underline-decoration from-centre-line outside-item-remove-margin" role="menu">
        <li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-8 current_page_item menu-item-22 act first"><a href='/' data-level='1'><span class="menu-item-text"><span class="menu-text">Home</span></span></a></li>
        <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-17159"><a href='#!/Aktuelles' data-level='1'><span class="menu-item-text"><span class="menu-text">Aktuelles</span></span></a></li>
        <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-23"><a href='#!/Leistungen' data-level='1'><span class="menu-item-text"><span class="menu-text">Leistungen</span></span></a></li>
        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-15951 dt-mega-menu mega-auto-width mega-column-3"><a href='/portfolio/' data-level='1'><span class="menu-item-text"><span class="menu-text">Realisierte Projekte</span></span></a></li>
        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-15952 dt-mega-menu mega-auto-width mega-column-3"><a href='/publikationen/' data-level='1'><span class="menu-item-text"><span class="menu-text">Publikationen</span></span></a></li>
        <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-24"><a href='#!/Team' data-level='1'><span class="menu-item-text"><span class="menu-text">Team</span></span></a></li>
        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-17775"><a href='/presse/' data-level='1'><span class="menu-item-text"><span class="menu-text">Presse</span></span></a></li>
        <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-26"><a href='#!/Kontakt' data-level='1'><span class="menu-item-text"><span class="menu-text">Kontakt</span></span></a></li>
    </ul>
    <div class="mini-widgets">
        <div class="mini-search show-on-desktop near-logo-first-switch in-menu-second-switch">
            <form class="searchform" role="search" method="get" action="https://www.fachwerk4.de/">
                <input type="text" class="field searchform-s" name="s" value="" placeholder="Type and hit enter &hellip;" />
                <input type="submit" class="assistive-text searchsubmit" value="Go!" />
                <a href="#go" id="trigger-overlay" class="submit text-disable">&nbsp;</a>
            </form>
        </div>
    </div>
</header>
