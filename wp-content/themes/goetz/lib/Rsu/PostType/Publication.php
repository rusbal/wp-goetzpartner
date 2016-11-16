<?php

namespace Rsu\PostType;


class Publication
{
    public function __construct() {
        add_action( 'init', array( $this, 'publication_init' ) );
    }

    function publication_init() {
        $labels = array(
            'name'               => _x( 'Publications', 'post type general name', 'goe' ),
            'singular_name'      => _x( 'Publication', 'post type singular name', 'goe' ),
            'menu_name'          => _x( 'Publications', 'admin menu', 'goe' ),
            'name_admin_bar'     => _x( 'Publication', 'add new on admin bar', 'goe' ),
            'add_new'            => _x( 'Add New', 'publication', 'goe' ),
            'add_new_item'       => __( 'Add New Publication', 'goe' ),
            'new_item'           => __( 'New Publication', 'goe' ),
            'edit_item'          => __( 'Edit Publication', 'goe' ),
            'view_item'          => __( 'View Publication', 'goe' ),
            'all_items'          => __( 'All Publications', 'goe' ),
            'search_items'       => __( 'Search Publications', 'goe' ),
            'parent_item_colon'  => __( 'Parent Publications:', 'goe' ),
            'not_found'          => __( 'No publication members found.', 'goe' ),
            'not_found_in_trash' => __( 'No publication members found in Trash.', 'goe' )
        );

        $args = array(
            'labels'             => $labels,
            'description'        => __( 'Description.', 'goe' ),
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => array( 'slug' => 'publication' ),
            'capability_type'    => 'post',
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => null,
            'menu_icon'          => 'dashicons-media-document',
        );

        register_post_type( 'publication', $args );
    }
}
