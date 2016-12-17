<?php

$str = $_POST['dataString'];

if (file_exists("naver/navershopping.txt")) {
    $dir = 'naver/';

    rename($dir . "navershopping.txt", $dir . "before.txt");

} else {
    echo "not exist";
}

$fp = fopen($_SERVER['DOCUMENT_ROOT'] . "/naver/navershopping.txt","wb");
fwrite($fp,$str);
fclose($fp);

?>