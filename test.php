<?php

$str = $_POST['dataString'];

$fp = fopen($_SERVER['DOCUMENT_ROOT'] . "/naver/test.txt","wb");
fwrite($fp,$str);
fclose($fp);

?>