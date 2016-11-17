<?php

namespace Rsu\Helper\Widget;


class View
{
    public static function sidebarLinkToBlog($blog, $container = '', $containerClass = [])
    {
        $id = $blog['ID'];
        $link = get_permalink($id);
        $title = get_the_title($id);
        $longDate = get_the_date('c');
        $humanDate = get_the_date('j. F Y');

        $thumbnail = get_the_post_thumbnail($id, 'post-thumbnail', [
            'class' => 'preload-me', 'height' => 60, 'width' => 60
        ]);

        $html = <<<STRING
            <article class="post-format-standard">
                <div class="wf-td">
                    <a class="alignleft post-rollover layzr-bg" href="$link" >$thumbnail</a>
                </div>
                <div class="post-content">
                    <a href="$link">$title</a>
                    <br />
                    <time class="text-secondary" datetime="$longDate">$humanDate</time>
                </div>
            </article>
STRING;

        $open = $container ? "<$container class='" . implode(' ', $containerClass) . "'>" : '';
        $close = $container ? "</$container>" : '';

        return "
            {$open}{$html}{$close}";
    }
}