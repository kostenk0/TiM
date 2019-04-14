<?php
/////////////////////////////////////////////
        ////////НЕ МЕНЯТЬ, ДИБИЛЫ, БЛЯТЬ/////////////
        /////////////////////////////////////////////
        $servername = "localhost:3307";
		$username = "root";
		$password = "";
		$dbname = "timemanager";

        $login = $_POST['login'];

        $conn = mysqli_connect("localhost:3307", "root", "", "timemanager");

        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        $sql = "SET NAMES utf8";
        mysqli_query($conn, $sql);
        $sql = "SELECT login, starttime, endtime, text, priority, days, isdone FROM task WHERE login = '$login'";
        $result = mysqli_query($conn, $sql);
        if (!$result) {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
        $array = mysqli_fetch_all($result, 1);
        $return = [];
        foreach ($result as $row) {
            $return[] = [ 
                'login' => $row['login'],
                'starttime' => $row['starttime'],
                'endtime' => $row['endtime'],
                'text' => $row['text'],
                'priority' => $row['priority'],
                'isdone'=> $row['isdone'],
                'days' => unserialize($row['days'])
            ];
        }
        header('Content-type: application/json');
        echo json_encode($return);
    /////////////////////////////////////////////
    ////////НЕ МЕНЯТЬ, ДИБИЛЫ, БЛЯТЬ/////////////
    /////////////////////////////////////////////
?>