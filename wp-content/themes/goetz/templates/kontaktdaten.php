<?php

use Rsu\Settings\Option;

$options = Option::get_fields();

?>
<div class="wpb_wrapper">
    <div class="ult-spacer spacer-5829113ba8410" data-id="5829113ba8410" data-height="0" data-height-mobile="32" data-height-tab="" data-height-tab-portrait="" data-height-mobile-landscape="32" style="clear:both;display:block;"></div>
    <div class="wpb_text_column wpb_content_element ">
        <div class="wpb_wrapper"> <h4>Kontaktdaten:</h4> </div>
    </div>
    <div class="wpb_text_column wpb_content_element ">
        <div class="wpb_wrapper">
            <p><span class="color-title"><?= $options['company_name'] ?></span>
                <br /> <?= $options['address_line_1'] ?>
                <br /> <?= $options['address_line_2'] ?></p>
            <p>Telefonnummer:<br /> <?= $options['telephone'] ?> </p>
            <p><span class="color-title">Fax:<br /> </span><?= $options['fax'] ?> </p>
            <p><span class="color-title">E-Mail:</span><br /> <?= $options['email'] ?> </p>
            <p><span class="color-title">Soziale Netzwerke:
                <div class="soc-ico">
                    <a title="Rss" href="<?= $options['rss'] ?>" target="_blank" class="rss"><span class="assistive-text">Rss</span></a>
                    <a title="Twitter" href="<?= $options['twitter'] ?>" target="_blank" class="twitter"><span class="assistive-text">Twitter</span></a>
                    <a title="Facebook" href="<?= $options['facebook'] ?>" target="_blank" class="facebook"><span class="assistive-text">Facebook</span></a>
                    <a title="Google+" href="<?= $options['google'] ?>" target="_blank" class="google"><span class="assistive-text">Google+</span></a>
            </div>
        </div>
    </div>
</div>
