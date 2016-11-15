<?php

namespace Rsu\Helper;


class View
{
    public static function sliderImages($field)
    {
        $outHtml = '';

        if( have_rows($field) ):

            $outHtml .= '
                <ul id="main-slideshow-content" class="rsHomePorthole">';

            while ( have_rows($field) ) : the_row();
                $image = get_sub_field('image');
                $outHtml .= '
                    <li>
                        <img class="preload-me" src="' . $image['url'] . '" '
                                . 'srcset="' . $image['url'] . ' ' . $image['width'] . 'w" '
                                . 'data-rsTmb="' . $image['sizes']['thumbnail'] . '" '
                                . 'alt="' . $image['alt'] . '" />
                    </li>';

            endwhile;

            $outHtml .= '</ul>';
        endif;

        return $outHtml;
    }
}