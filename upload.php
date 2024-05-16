<?php
if(!empty($_POST['data'])){
$data = $_POST['data'];
if(!empty($_POST['name'])){
$name = $_POST['name'];
}
else{
    $name='NaN';
}
if(!empty($_POST['data'])){
$timestamp = $_POST['timestamp'];
}
else{
    $timestamp='NaN';
}
$fname = $name."_".$timestamp.".csv";

$file = fopen("Upload/".$fname, 'w');//creates new file
fwrite($file, $data);
fclose($file);
}
