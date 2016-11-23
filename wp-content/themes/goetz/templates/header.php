<?php

use Rsu\Helper\View;
use Rsu\Settings\Option;

?>
<a class="skip-link screen-reader-text" href="#content">Skip to content</a>
<div class="masthead inline-header right widgets full-height surround shadow-decoration show-device-logo show-mobile-logo" style="" role="banner">
    <div class="top-bar solid-bg">
        <div class="mini-widgets">
            <span class="mini-contacts address icon-off show-on-desktop near-logo-first-switch in-menu-second-switch"><?= Option::get('company_name') ?> | <?= Option::get('company_description') ?></span>
            <span class="mini-contacts email show-on-desktop near-logo-first-switch in-menu-second-switch"><?= Option::get('email') ?></span>
            <span class="mini-contacts phone show-on-desktop near-logo-first-switch in-menu-second-switch"><?= Option::get('telephone') ?></span>
        </div>
        <div class="mini-widgets">
            <div class="soc-ico show-on-desktop near-logo-first-switch in-menu-second-switch disabled-bg hover-accent-bg">
                <a title="Facebook" href="<?= Option::get('facebook') ?>" target="_blank" class="facebook"><span class="assistive-text">Facebook</span></a>
                <a title="Twitter" href="<?= Option::get('twitter') ?>" target="_blank" class="twitter"><span class="assistive-text">Twitter</span></a>
                <a title="Google+" href="<?= Option::get('google') ?>" target="_blank" class="google"><span class="assistive-text">Google+</span></a>
                <a title="Rss" href="<?= Option::get('rss') ?>" target="_blank" class="rss"><span class="assistive-text">Rss</span></a>
            </div>
        </div>
    </div>
    <header class="header-bar">
        <div class="branding">
            <a href="/" class="sticky-logo">
                <?= wp_get_attachment_image( Option::get('header_logo'), 'full', false, ['class' => 'preload-me']) ?>
            </a>
            <a href="/">
                <?= wp_get_attachment_image( Option::get('header_logo'), 'full', false, ['class' => 'preload-me']) ?>
                <?= wp_get_attachment_image( Option::get('header_logo'), 'full', false, ['class' => 'mobile-logo preload-me']) ?>
            </a>
            <div id="site-title" class="assistive-text"><?= Option::get('company_name') ?></div>
            <div id="site-description" class="assistive-text"><?= Option::get('company_description') ?></div>
        </div>
        <ul id="primary-menu" class="main-nav underline-decoration from-centre-line outside-item-remove-margin" role="menu">
            <li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-8 current_page_item menu-item-22 first">
                <a href='/' data-level='1'><span class="menu-item-text"><span class="menu-text">Home</span></span></a>
            </li>
            <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-17159">
                <a href='<?= View::linkToAnchor('#!/Aktuelles') ?>' data-level='1'><span class="menu-item-text"><span class="menu-text">Aktuelles</span></span></a>
            </li>
            <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-23">
                <a href='<?= View::linkToAnchor('#!/Leistungen') ?>' data-level='1'><span class="menu-item-text"><span class="menu-text">Leistungen</span></span></a>
            </li>
            <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-15951 dt-mega-menu mega-auto-width mega-column-3">
                <a href='/portfolio/' data-level='1'><span class="menu-item-text"><span class="menu-text">Realisierte Projekte</span></span></a>
            </li>
            <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-15952 dt-mega-menu mega-auto-width mega-column-3">
                <a href='/publication/' data-level='1'><span class="menu-item-text"><span class="menu-text">Publikationen</span></span></a>
            </li>
            <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-24">
                <a href='<?= View::linkToAnchor('#!/Team') ?>' data-level='1'><span class="menu-item-text"><span class="menu-text">Team</span></span></a>
            </li>
            <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-17775">
                <a href='/presse/' data-level='1'><span class="menu-item-text"><span class="menu-text">Presse</span></span></a>
            </li>
            <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-26">
                <a href='<?= View::linkToAnchor('#!/Kontakt') ?>' data-level='1'><span class="menu-item-text"><span class="menu-text">Kontakt</span></span></a>
            </li>
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
</div>
<div class='dt-close-mobile-menu-icon'><span></span></div>
<div
    class='dt-mobile-header'>
    <ul id="mobile-menu" class="mobile-main-nav" role="menu">
        <li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-8 current_page_item menu-item-22 first">
            <a href='/' data-level='1'><span class="menu-item-text"><span class="menu-text">Home</span></span></a>
        </li>
        <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-17159">
            <a href='/#!/Aktuelles' data-level='1'><span class="menu-item-text"><span class="menu-text">Aktuelles</span></span></a>
        </li>
        <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-23">
            <a href='/#!/Leistungen' data-level='1'><span class="menu-item-text"><span class="menu-text">Leistungen</span></span></a>
        </li>
        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-15951 dt-mega-menu mega-auto-width mega-column-3">
            <a href='/portfolio/' data-level='1'><span class="menu-item-text"><span class="menu-text">Realisierte Projekte</span></span></a>
        </li>
        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-15952 dt-mega-menu mega-auto-width mega-column-3">
            <a href='/publication/' data-level='1'><span class="menu-item-text"><span class="menu-text">Publikationen</span></span></a>
        </li>
        <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-24">
            <a href='/#!/Team' data-level='1'><span class="menu-item-text"><span class="menu-text">Team</span></span></a>
        </li>
        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-17775">
            <a href='/presse/' data-level='1'><span class="menu-item-text"><span class="menu-text">Presse</span></span></a>
        </li>
        <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-26">
            <a href='/#!/Kontakt' data-level='1'><span class="menu-item-text"><span class="menu-text">Kontakt</span></span></a>
        </li>
    </ul>
    <div class='mobile-mini-widgets-in-menu'></div>
</div>
