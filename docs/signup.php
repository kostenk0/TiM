<?php
if(!empty($_POST))
{
    $servername = "localhost:3307";
    $username = "root";
    $password = "";
    $dbname = "timemanager";

    $login = $_POST['login'];
    $email = $_POST['email'];

    $mysql = new mysqli($servername, $username, $password, $dbname);
    
    if($mysql->connect_error)
    {
        die('Connect Eror: ' . $mysql->connect_errno . ': ' . $mysql->connect_error);
    }

    $conn = mysqli_connect("localhost:3307", "root", "", "timemanager");

        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        $sql = "SET NAMES utf8";
        mysqli_query($conn, $sql);
        $sql = "SELECT login FROM user WHERE login = '$login' or email = '$email'";
        $result = mysqli_query($conn, $sql);
        if (!$result) {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
        if(mysqli_num_rows($result) != 0)
        {
            die("Login or email is alredy exists!");
        }

    $sql = "INSERT INTO user (login, password, email) VALUES ('{$mysql->real_escape_string($_POST['login'])}','{$mysql->real_escape_string($_POST['password'])}','{$mysql->real_escape_string($_POST['email'])}')";
    
    $insert = $mysql->query($sql);
    
    if($insert){
        echo "Successful";
    } else {
        die("Error: {$mysql->errno} : {$mysql->error}");
    }
    $mysql->close();
}
?>