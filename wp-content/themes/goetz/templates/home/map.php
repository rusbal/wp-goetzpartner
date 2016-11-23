<?php

use Rsu\Settings\Option;

?>
<div class="wpb_column vc_column_container vc_col-sm-4">
    <div class="vc_column-inner ">
        <div class="wpb_wrapper">
            <div class="ult-spacer spacer-5829113ba7f6f" data-id="5829113ba7f6f" data-height="0" data-height-mobile="32" data-height-tab="" data-height-tab-portrait="" data-height-mobile-landscape="32" style="clear:both;display:block;"></div>
            <div class="wpb_text_column wpb_content_element ">
                <div class="wpb_wrapper">
                    <h4>So finden Sie uns:</h4>
                </div>
            </div>
            <div class="vc_empty_space"  style="height: 24px" ><span class="vc_empty_space_inner"></span></div>
            <div id='wrap_map_5829113ba819e' class='ultimate-map-wrapper ult-adjust-bottom-margin ' style=' height:300px;'>
                <div id='map_5829113ba819e' data-map_override='0' class='ultimate_google_map wpb_content_element page_margin_top' style='width:100%;height:300px;'></div>
            </div>
            <script type='text/javascript'>/*<![CDATA[*/(function($) {
                'use strict';
                var map_latitude = parseFloat('<?= Option::get('map_latitude'); ?>');
                var map_longitude = parseFloat('<?= Option::get('map_longitude'); ?>');
                var map_map_5829113ba819e = null;
                var coordinate_map_5829113ba819e;
                var isDraggable = $(document).width() > 641 ? true : true;
                try
                {
                    var map_map_5829113ba819e = null;
                    var coordinate_map_5829113ba819e;
                    coordinate_map_5829113ba819e=new google.maps.LatLng(map_latitude, map_longitude);
                    var mapOptions= {
                        zoom: 12,
                        center: coordinate_map_5829113ba819e,
                        scaleControl: true,
                        streetViewControl: false,
                        mapTypeControl: false,
                        panControl: false,
                        zoomControl: false,
                        scrollwheel: true,
                        draggable: isDraggable,
                        zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL },
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                    };
                    var map_map_5829113ba819e = new google.maps.Map(document.getElementById('map_5829113ba819e'), mapOptions);
                    var x = 'infowindow_open_value';
                    var marker_map_5829113ba819e = new google.maps.Marker({
                        position: new google.maps.LatLng(map_latitude, map_longitude),
                        animation:  google.maps.Animation.DROP,
                        map: map_map_5829113ba819e,
                        icon: ''
                    });
                    google.maps.event.addListener(marker_map_5829113ba819e, 'click', toggleBounce);
                    var infowindow = new google.maps.InfoWindow();
                    infowindow.setContent('<div class="map_info_text" style=\'color:#000;\'><?= Option::companyNameDesc() ?></div>');
                    google.maps.event.addListener(marker_map_5829113ba819e, 'click', function() {
                        infowindow.open(map_map_5829113ba819e,marker_map_5829113ba819e);
                    });}
                catch(e){};
                jQuery(document).ready(function($){
                    google.maps.event.trigger(map_map_5829113ba819e, 'resize');
                    $(window).resize(function(){
                        google.maps.event.trigger(map_map_5829113ba819e, 'resize');
                        if(map_map_5829113ba819e!=null)
                            map_map_5829113ba819e.setCenter(coordinate_map_5829113ba819e);
                    });
                    $('.ui-tabs').bind('tabsactivate', function(event, ui) {
                        if($(this).find('.ultimate-map-wrapper').length > 0) {
                            setTimeout(function(){
                                $(window).trigger('resize');
                            },200);
                        }
                    });
                    $('.ui-accordion').bind('accordionactivate', function(event, ui) {
                        if($(this).find('.ultimate-map-wrapper').length > 0) {
                            setTimeout(function(){
                                $(window).trigger('resize');
                            },200);
                        }
                    });
                    $(window).load(function(){
                        setTimeout(function(){
                            $(window).trigger('resize');
                        },200);
                    });
                    $('.ult_exp_section').select(function(){
                        if($(map_map_5829113ba819e).parents('.ult_exp_section')) {
                            setTimeout(function(){
                                $(window).trigger('resize');
                            },200);
                        }
                    });
                    $(document).on('onUVCModalPopupOpen', function(){
                        if($(map_map_5829113ba819e).parents('.ult_modal-content')) {
                            setTimeout(function(){
                                $(window).trigger('resize');
                            },200);
                        }
                    });
                    $(document).on('click','.ult_tab_li',function(){
                        $(window).trigger('resize');
                        setTimeout(function(){
                            $(window).trigger('resize');
                        },200);
                    });
                });
                function toggleBounce() {
                    if (marker_map_5829113ba819e.getAnimation() != null) {
                        marker_map_5829113ba819e.setAnimation(null);
                    } else {
                        marker_map_5829113ba819e.setAnimation(google.maps.Animation.BOUNCE);
                    }
                }
            })(jQuery);/*]]>*/
            </script>
        </div>
    </div>
</div>
