<?php

namespace Rsu\PostType;


class Team
{
    public function __construct() {
        add_action( 'init', array( $this, 'team_init' ) );
    }

    function team_init() {
        $labels = array(
            'name'               => _x( 'Team Members', 'post type general name', 'goe' ),
            'singular_name'      => _x( 'Team Member', 'post type singular name', 'goe' ),
            'menu_name'          => _x( 'Team Members', 'admin menu', 'goe' ),
            'name_admin_bar'     => _x( 'Team Member', 'add new on admin bar', 'goe' ),
            'add_new'            => _x( 'Add New', 'team', 'goe' ),
            'add_new_item'       => __( 'Add New Team Member', 'goe' ),
            'new_item'           => __( 'New Team Member', 'goe' ),
            'edit_item'          => __( 'Edit Team Member', 'goe' ),
            'view_item'          => __( 'View Team Member', 'goe' ),
            'all_items'          => __( 'All Team Members', 'goe' ),
            'search_items'       => __( 'Search Team Members', 'goe' ),
            'parent_item_colon'  => __( 'Parent Team Members:', 'goe' ),
            'not_found'          => __( 'No team members found.', 'goe' ),
            'not_found_in_trash' => __( 'No team members found in Trash.', 'goe' )
        );

        $args = array(
            'labels'             => $labels,
            'description'        => __( 'Description.', 'goe' ),
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => array( 'slug' => 'team' ),
            'capability_type'    => 'post',
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => null,
            'menu_icon'          => 'dashicons-businessman',
//            'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
        );

        register_post_type( 'team', $args );
    }
}

