<?php
if(!empty($_POST))
{
    $servername = "localhost:3307";
    $username = "root";
    $password = "";
    $dbname = "timemanager";

    $isDone = $_POST['isDone'];
    $priority = $_POST['priority'];
    $text = $_POST['text'];
    $start = $_POST['start'];
    $end = $_POST['end'];
    $login = $_POST['login'];
    $starttime = $_POST['starttime'];
    $endtime = $_POST['endtime'];
    $days = $_POST['days'];
    $serializedArray = serialize($days);
    $start = date("Y-m-d h:i:s",strtotime($start));
    $end = date("Y-m-d h:i:s",strtotime($end));

    $mysql = new mysqli($servername, $username, $password, $dbname);
    
    if($mysql->connect_error)
    {
        die('Connect Eror: ' . $mysql->connect_errno . ': ' . $mysql->connect_error);
    }

    $sql = "INSERT INTO task (isdone, priority, text, start, login, end, starttime, endtime, days) VALUES ('{$mysql->real_escape_string($isDone)}','{$mysql->real_escape_string($priority)}','{$mysql->real_escape_string($text)}', '{$mysql->real_escape_string($start)}', '{$mysql->real_escape_string($login)}', '{$mysql->real_escape_string($end)}', '{$mysql->real_escape_string($starttime)}', '{$mysql->real_escape_string($endtime)}', '{$mysql->real_escape_string($serializedArray)}')";
    
    $insert = $mysql->query($sql);
    
    if($insert){
        echo "Successful";
    } else {
        die("Error: {$mysql->errno} : {$mysql->error}");
    }
    $mysql->close();
}
?>