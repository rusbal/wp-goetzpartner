<?php

namespace Rsu\PostType;


class Projekt
{
    public function __construct() {
        add_action( 'init', array( $this, 'projekt_init' ) );
    }

    function projekt_init() {
        $labels = array(
            'name'               => _x( 'Projekts', 'post type general name', 'goe' ),
            'singular_name'      => _x( 'Projekt', 'post type singular name', 'goe' ),
            'menu_name'          => _x( 'Projekts', 'admin menu', 'goe' ),
            'name_admin_bar'     => _x( 'Projekt', 'add new on admin bar', 'goe' ),
            'add_new'            => _x( 'Add New', 'projekt', 'goe' ),
            'add_new_item'       => __( 'Add New Projekt', 'goe' ),
            'new_item'           => __( 'New Projekt', 'goe' ),
            'edit_item'          => __( 'Edit Projekt', 'goe' ),
            'view_item'          => __( 'View Projekt', 'goe' ),
            'all_items'          => __( 'All Projekts', 'goe' ),
            'search_items'       => __( 'Search Projekts', 'goe' ),
            'parent_item_colon'  => __( 'Parent Projekts:', 'goe' ),
            'not_found'          => __( 'No projekt found.', 'goe' ),
            'not_found_in_trash' => __( 'No projekt found in Trash.', 'goe' )
        );

        $args = array(
            'labels'             => $labels,
            'description'        => __( 'Description.', 'goe' ),
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => array( 'slug' => 'projekt' ),
            'capability_type'    => 'post',
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => null,
            'menu_icon'          => 'dashicons-media-document',
            'taxonomies'         => array( 'category' ),
        );

        register_post_type( 'projekt', $args );
    }
}
