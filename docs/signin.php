<?php
/////////////////////////////////////////////
        ////////НЕ МЕНЯТЬ, ДИБИЛЫ, БЛЯТЬ/////////////
        /////////////////////////////////////////////
        $servername = "localhost:3307";
		$username = "root";
		$password = "";
		$dbname = "timemanager";

        $login = $_POST['login'];
        $password = $_POST['password'];

        $conn = mysqli_connect("localhost:3307", "root", "", "timemanager");

        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        $sql = "SET NAMES utf8";
        mysqli_query($conn, $sql);
        $sql = "SELECT login FROM user WHERE login = '$login' and password = '$password'";
        $result = mysqli_query($conn, $sql);
        if (!$result) {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
        $array = mysqli_fetch_all($result, 1);
        $return = [];
        foreach ($result as $row) {
            $return[] = [ 
                'login' => $row['login']
            ];
        }
        header('Content-type: application/json');
        echo json_encode($return);
    /////////////////////////////////////////////
    ////////НЕ МЕНЯТЬ, ДИБИЛЫ, БЛЯТЬ/////////////
    /////////////////////////////////////////////
?>