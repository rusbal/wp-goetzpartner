<?php
// Temporary only
function selfURL()
{
    return "http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
}

if (is_home()) {
    include 'archive-blog.php';
} else {
    ?>
    <h1>Index.php</h1>
    <hr>
    <p>Opps, page is not defined!
        <a href="mailto:raymond@philippinedev.com?Subject=Please work on <?= selfURL() ?>">Click here to email Raymond...</a>
    </p>
<?php
}

