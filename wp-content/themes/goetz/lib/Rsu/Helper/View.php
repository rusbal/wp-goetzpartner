<?php

namespace Rsu\Helper;


class View
{
    public static function sliderImages($field, $slug = null)
    {
        $outHtml = '';

        if ($slug) {
            $post = get_page_by_path( $slug, OBJECT, 'page' );
        } else {
            $post = new \stdClass();
        }

        if (have_rows($field, $post->ID)):

            $outHtml .= '
                <ul id="main-slideshow-content" class="rsHomePorthole">';

            while (have_rows($field, $post->ID)) : the_row();
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

    public static function teamMembers()
    {
        $outHtml = '';

        $type = 'team';
        $args = array(
            'post_type' => $type,
            'post_status' => 'publish',
        );

        $my_query = new \WP_Query($args);
        if ($my_query->have_posts()) {
            while ($my_query->have_posts()) : $my_query->the_post();
                $image = get_field('picture');
                $size = 'medium'; // (thumbnail, medium, large, full or custom size)

                $website = get_field('website');
                $email = get_field('email');
                $twitter = get_field('twitter');
                $facebook = get_field('facebook');
                $google = get_field('google');

                $outHtml .= '
                <div class="wf-cell" data-post-id="' . get_the_ID() . '" data-date="' . get_the_modified_time() . '" data-name="' . get_the_title() . '">
                    <div class="team-container dt_team type-dt_team status-publish has-post-thumbnail hentry dt_team_category-mitarbeiter bg-on description-off">
                        <div class="team-media">
                            <a href="' . get_permalink() . '" class="rollover layzr-bg">
                                ' . wp_get_attachment_image($image['id'], $size, false, ['class' => 'iso-lazy-load preload-me height-ready iso-layzr-loaded']) . '
                            </a>
                        </div>
                        <div class="team-desc">
                            <div class="team-author">
                                <div class="team-author-name">' . get_the_title() . '</div>
                                <p>' . get_field('title_line_1') . '</p>
                            </div>
                            <div class="soc-ico">'
                                . ($website ? '
                                    <a title="Persönlicher Blog / Webseite" href="' . $website . '" target="_blank" class="website">
                                        <span class="assistive-text">Persönlicher Blog / Webseite</span>
                                    </a>' : '')
                                . ($email ? '
                                    <a title="E-Mail" href="mailto:' . $email . '" target="_top" class="mail">
                                        <span class="assistive-text">E-Mail</span>
                                    </a>' : '')
                                . ($facebook ? '
                                    <a title="Facebook" href="' . $facebook . '" target="_blank" class="facebook">
                                        <span class="assistive-text">Facebook</span>
                                    </a>' : '')
                                . ($twitter ? '
                                    <a title="Twitter" href="' . $twitter . '" target="_blank" class="twitter">
                                        <span class="assistive-text">Twitter</span>
                                    </a>' : '')
                                . ($google ? '
                                    <a title="Google+" href="' . $google . '" target="_blank" class="google">
                                        <span class="assistive-text">Google+</span>
                                    </a>' : '')
                            .'</div>
                        </div>
                    </div>
                </div>';
            endwhile;
        }
        wp_reset_query();

        return $outHtml;
    }

    public static function vita()
    {
        $outHtml = '';
        if( have_rows('vita') ):
            $outHtml .= '<ul>';
            while ( have_rows('vita') ) : the_row();
                $outHtml .= '<li><strong>' . get_sub_field('date_info') . '</strong> ' . get_sub_field('description') . '</li>';
            endwhile;
            $outHtml .= '</ul>';
        endif;
        return $outHtml;
    }

    public static function kontakt()
    {
        $phone = get_field('phone');
        $fax = get_field('fax');
        $email = get_field('email');
        $twitter = get_field('twitter');
        $facebook = get_field('facebook');
        $google = get_field('google');

        echo '
            <div class="wpb_wrapper">
                <p><strong><span class="color-title">Telefonnummer:</span></strong>&nbsp;' . $phone . '</p>
                <p><strong><span class="color-title">Fax:</span></strong>&nbsp;' . $fax . '</p>
                <p><strong><span class="color-title">E-Mail:</span></strong>&nbsp;' . $email . '</p>
                <p><span class="color-title"><strong>Soziale Netzwerke:</strong></span></p>
                <div class="soc-ico">
                    <a title="Twitter" href="' . $twitter . '" target="_blank" class="twitter" style="visibility: visible;">
                        <svg class="icon" viewBox="0 0 24 24"> <use xlink:href="#twitter"/> </svg>
                    </a>
                    <a title="Facebook" href="' . $facebook . '" target="_blank" class="facebook" style="visibility: visible;">
                        <svg class="icon" viewBox="0 0 24 24"> <use xlink:href="#facebook"/> </svg>
                    </a>
                    <a title="Google+" href="' . $google . '" target="_blank" class="google" style="visibility: visible;">
                        <svg class="icon" viewBox="0 0 24 24"> <use xlink:href="#google"/> </svg>
                    </a>
                </div>
            </div>';
    }

    public static function wfCell($query, $headerStyle = 'h6', $class = 'text-big')
    {
        $outHtml = '';

        while ($query->have_posts()) : $query->the_post();
            $outHtml .= '
            <div class="wf-cell">
                <div>
                    <div class="' . $class . '">
                        <div class="wf-table">
                            <div class="wf-td"><a href="' . get_field('pdf_file') . '" class="benefits-grid-ico" target="_blank"><i class="' . get_field('icon') . '"></i></a></div>
                            <div class="wf-td benefits-inner">
                                <' . $headerStyle . ' class="benefit-title"> <a href="' . get_field('pdf_file') . '" target="_blank">' . get_the_title() . '</a> </' . $headerStyle . '>
                                <p>' . get_field('detail') . '</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>';
        endwhile;

        wp_reset_query();

        return $outHtml;
    }
}