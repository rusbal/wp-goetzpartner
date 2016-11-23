<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/themes/dt-the7/js/above-the-fold.min.js?ver=1.0.0'></script>
<script type='text/javascript' src='https://maps.googleapis.com/maps/api/js?v=3.23&key=<?= Rsu\Settings\Option::get('google_api_key') ?>'></script>
<script type='text/javascript' src='https://www.fachwerk4.de/wp-includes/js/jquery/ui/core.min.js?ver=1.11.4'></script>
<script type='text/javascript' src='https://www.fachwerk4.de/wp-content/plugins/Ultimate_VC_Addons/assets/min-js/ultimate.min.js?ver=3.16.1'></script>
<!--[if lt IE 9]>
<script>var rfbwp_ie_8 = true;</script>
<![endif]-->
<style type='text/css'>img#wpstats{display:none}</style>
<!--[if lte IE 9]>
<link rel="stylesheet" type="text/css" href="https://www.fachwerk4.de/wp-content/plugins/js_composer/assets/css/vc_lte_ie9.min.css" media="screen">
<![endif]-->
<!--[if IE  8]>
<link rel="stylesheet" type="text/css" href="https://www.fachwerk4.de/wp-content/plugins/js_composer/assets/css/vc-ie8.min.css" media="screen">
<![endif]-->
<script type="text/javascript">jQuery(function($) {
        var $window = $(window),
            $load = $("#load");

        $window.removeLoading = setTimeout(function() {
            $load.addClass("loader-removed").fadeOut(500);
        }, 500);

        $window.one("dt.removeLoading", function() {
            if (!$load.hasClass("loader-removed")) {
                clearTimeout($window.removeLoading);
                $("#load").addClass("loader-removed").fadeOut(500);
            }
        });
    });
</script>
