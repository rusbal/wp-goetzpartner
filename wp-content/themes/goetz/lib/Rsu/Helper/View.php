<?php

namespace Rsu\Helper;

use Rsu\Helper\Widget\View as WidgetView;
use Rsu\Models\Post;

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

    public static function featuredImage($id)
    {
        return '
        <a href="' . get_the_post_thumbnail_url($id, 'full' ) . '" class="alignnone rollover rollover-zoom dt-single-mfp-popup dt-mfp-item mfp-image layzr-bg"
           title="GartenLandschaft Berg, Gewinner TASPO Award, Foto: © Andreas Schwarz, taspoawards.de"
           data-dt-img-description="GartenLandschaft Berg, Gewinner TASPO Award, Foto: © Andreas Schwarz, taspoawards.de">
            ' . get_the_post_thumbnail($id, 'large', ['class' => 'preload-me'] ) . '
        </a>';
    }

    public static function dayLink()
    {
        $link = get_day_link( get_the_time('Y'), get_the_time('m'), get_the_time('d') );
        $hourMinute = get_the_time('h:i');
        $datetime = get_the_time('c');
        $humanDate = get_the_time('d. F Y');

        return '
        <a href="' . $link . '" title="' . $hourMinute . '" class="data-link" rel="bookmark">
            <time class="entry-date updated" datetime="' . $datetime . '">' . $humanDate . '</time>
        </a>';
    }

    public static function authorLink()
    {
        global $authordata;
        if ( ! is_object( $authordata ) ) {
            return;
        }

        return sprintf(
            '<a class="author vcard" href="%1$s" title="%2$s" rel="author">By <span class="fn">%3$s</span></a>',
            esc_url( get_author_posts_url( $authordata->ID, $authordata->user_nicename ) ),
            esc_attr( sprintf( __( 'View all posts by %s' ), get_the_author() ) ),
            get_the_author()
        );
    }

    public static function articleTopBar()
    {
        return '
            <div class="article-top-bar disabled-bg">
                <div class="wf-wrap">
                    <div class="wf-container-top">
                        <div class="entry-meta">
                            ' . self::dayLink() . '
                            ' . self::authorLink() . '
                        </div>
                        <div class="navigation-inner">
                            <div class="single-navigation-wrap">
                                <a class="prev-post disabled" href="javascript:void(0);"></a>
                                <a class="back-to-list" href="/blog/"></a>
                                <a class="next-post" href="https://www.fachwerk4.de/azubi-blog-baustellenpraktikum/" rel="prev"></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>';
    }

    public static function authorInfoDiv()
    {
        return '
            <div class="dt-fancy-separator title-left fancy-author-title">
                    <div class="dt-fancy-title">Über den Autor<span class="separator-holder separator-right"></span></div>
                </div>
                <div class="entry-author wf-table">
                    <div class="wf-td entry-author-img">
                        <a href="' . get_the_author_meta('url') . '" class="alignleft">
                            ' . get_avatar(get_the_author_meta('id'), 85, '', '', ['class' => 'avatar avatar-85 photo']) . '
                        </a>
                    </div>
                <div class="wf-td entry-author-info">
                    <p class="h5-size">' . get_the_author_meta('display_name') . '</p>
                    <p class="text-normal">' . get_the_author_meta('description') . '</p>
                </div>
            </div>';
    }

    public static function socialShareLink($site)
    {
        $link = get_permalink();
        $title = get_the_title();

        if ($site == 'facebook') {
            return '
                <a href="http://www.facebook.com/sharer.php?u=' . $link . '/' . $title
                . '" class="facebook" target="_blank" title="Facebook"><span class="assistive-text">Facebook</span></a>';
        }
        if ($site == 'google') {
            return '
                <a href="https://plus.google.com/share?url=' . $link . '/' . $title
                . '" class="google" target="_blank" title="Google+"><span class="assistive-text">Google+</span></a>';
        }
        if ($site == 'twitter') {
            return '
                <a href="https://twitter.com/share?text=' . $title . '&#038;url=' . $link
                . '" class="twitter" target="_blank" title="Twitter"><span class="assistive-text">Twitter</span></a>';
        }
    }

    public static function facebookShareLink() { return self::socialShareLink('facebook'); }
    public static function googleShareLink() { return self::socialShareLink('google'); }
    public static function twitterShareLink() { return self::socialShareLink('twitter'); }

    public static function spacer($height = 32, $class = 'vc_empty_space')
    {
        return '<div class="' . $class . '"  style="height: ' . $height . 'px" ><span class="vc_empty_space_inner"></span></div>';
    }

    public static function imageForPost($imagePath)
    {
        return '
            <div class="vc_grid-item vc_clearfix vc_col-sm-6 vc_grid-term-1">
                <div class="vc_grid-item-mini vc_clearfix ">
                    <div class="vc_gitem-animated-block ">
                        <div class="vc_gitem-zone vc_gitem-zone-a vc-gitem-zone-height-mode-auto vc-gitem-zone-height-mode-auto-1-1 vc_gitem-is-link" style="background-image: url(' . $imagePath . ') !important;">
                            <a href="' . $imagePath . '" title="15 Jahre elegante und moderne Architektur: Was für ein Fest!"  data-rel="prettyPhoto[rel--998290976]" data-vc-gitem-zone="prettyphotoLink" class="vc_gitem-link prettyphoto vc-zone-link vc-prettyphoto-link" ></a>	
                            <img src="' . $imagePath . '" class="vc_gitem-zone-img" alt="">	
                            <div class="vc_gitem-zone-mini"> </div>
                        </div>
                    </div>
                </div>
                <div class="vc_clearfix"></div>
            </div>';
    }

    public static function otherBlogPosts()
    {
        $recentPosts = Post::recentPosts(4);

        $postsHtml = '';

        foreach ($recentPosts as $post) {
            $postsHtml .= '
                <div class="wf-cell wf-1-2">
                    ' . WidgetView::sidebarLinkToBlog($post, 'div', ['borders']) . '
                </div>';
        }

        return '
            <div class="dt-fancy-separator title-left fancy-posts-title">
                <div class="dt-fancy-title">Weitere Nachrichten<span class="separator-holder separator-right"></span></div>
            </div>
            <section class="items-grid wf-container">
                ' . $postsHtml . '
            </section>';
    }
}