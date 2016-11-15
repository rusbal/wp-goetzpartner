<?php

namespace Rsu\Helper;


class View
{
    public static function sliderImages($field)
    {
        $outHtml = '';

        if (have_rows($field)):

            $outHtml .= '
                <ul id="main-slideshow-content" class="rsHomePorthole">';

            while (have_rows($field)) : the_row();
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
}