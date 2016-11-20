<?php

namespace Rsu\Models;


class Leistungen
{
    public static function getData()
    {
        $data = [];

        while ( have_rows('leistungen_services') ) : the_row();
            $title = get_sub_field('leistungen_service_title');
            $items = [];
            while ( have_rows('leistungen_service_items') ) : the_row();
                $items[] = get_sub_field('leistungen_service_item');
            endwhile;
            $data[$title] = $items;
        endwhile;

        return $data;
    }
}