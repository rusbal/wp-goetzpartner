<?php

namespace Rsu\Models;


class Image
{
    public static function title($imgId)
    {
        return get_post($imgId)->post_title;
    }
}