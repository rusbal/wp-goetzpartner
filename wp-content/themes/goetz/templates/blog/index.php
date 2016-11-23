<?php

use Rsu\Helper\View;

?>
<div class="wf-container with-ajax loading-effect-fade-in lazy-loading-mode iso-container bg-under-post description-under-image content-align-left" data-padding="10px" data-cur-page="1" data-width="300px" data-columns="3">

    <?php

    while (have_posts()) : the_post();
        echo View::blogItem($includedFrom);
    endwhile;

    ?>

</div>