<?php
        /////////////////////////////////////////////
        ////////НЕ МЕНЯТЬ, ДИБИЛЫ, БЛЯТЬ/////////////
        /////////////////////////////////////////////
            $servername = "localhost:3307";
            $username = "root";
            $password = "";
            $dbname = "shop";
            $conn = mysqli_connect($servername, $username, $password, $dbname);
            if (!$conn) {
                die("Connection failed: " . mysqli_connect_error());
            }
            $sql = "SET NAMES utf8";
            mysqli_query($conn, $sql);
            $sql = "SELECT * FROM categories";
            $result = mysqli_query($conn, $sql);
            if (!$result) {
                echo "Error: " . $sql . "<br>" . mysqli_error($conn);
            }
            $array = mysqli_fetch_all($result, 1);
            $return = [];
            foreach ($result as $row) {
                $return[] = [ 
                    'id' => $row['category_id'],
                    'name' => $row['name'],
                    'description' => $row['description']
                ];
            }
            
            header('Content-type: application/json');
            echo json_encode($return);
        /////////////////////////////////////////////
        ////////НЕ МЕНЯТЬ, ДИБИЛЫ, БЛЯТЬ/////////////
        /////////////////////////////////////////////
    
        ?>