<?php

namespace Rsu\Helper;


class Request
{
    /**
     * Returns "blog" from "/blog/path/?value=1"
     * @return string
     */
    public static function object()
    {
        $uri = trim($_SERVER['REQUEST_URI'], '/');
        list($first) = explode('/', $uri);
        return $first;
    }
}