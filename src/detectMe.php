<?php
session_start();
$a = session_id();
session_destroy();

session_start();
$b = session_id();
session_destroy();

$cookieEnabled = false;
if ($a == $b) {
    $cookieEnabled = true;
}
$infos = new stdClass();
$infos->cookie = $cookieEnabled;
?>
<noscript></noscript>
<?php return json_encode(["cookie"=>$cookieEnabled]); ?>
