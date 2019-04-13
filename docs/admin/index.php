<html>
    <head>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
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
        /////////////////////////////////////////////
        ////////НЕ МЕНЯТЬ, ДИБИЛЫ, БЛЯТЬ/////////////
        /////////////////////////////////////////////
            if(isset($_POST['submit_caption']) && isset($_POST['caption'])) {
                $value = $_POST['caption'];
                mysqli_query($conn, "TRUNCATE TABLE caption");
                
                $sql = "SET NAMES utf8";
                mysqli_query($conn, $sql);
                if(!mysqli_query($conn, "INSERT INTO caption (id, name) VALUES (NULL, \"$value\")")) {
                    echo mysqli_error($conn);
                }
            }
            if(isset($_POST['submit_menu_content'])) {
                mysqli_query($conn, "TRUNCATE TABLE menu");
                
                $sql = "SET NAMES utf8";
                mysqli_query($conn, $sql);
                $amount = $_POST['amount'];
                for ($i = 0; $i < $amount; $i++) {
                    $menu = $_POST["menu$i"];
                    mysqli_query($conn, "INSERT INTO menu (id, name) VALUES (NULL, \"$menu\")");
                }
            }
            if(isset($_POST['submit_section']) && isset($_POST['section'])) {
                $value = $_POST['section'];
                mysqli_query($conn, "TRUNCATE TABLE section");
                
                $sql = "SET NAMES utf8";
                mysqli_query($conn, $sql);
                if(!mysqli_query($conn, "INSERT INTO section (name) VALUES (\"$value\")")) {
                    echo mysqli_error($conn);
                }
            }
            if(isset($_POST['submit_article_content']) && $_POST['amount'] >= 4) {
                $amount = $_POST['amount'];
                $continue = 1;
                for ($i = 0; $i < $amount; $i++) {
                    if(!(isset($_POST["article_caption$i"]) && isset($_POST["article_text$i"])) && isset($_POST["article_link$i"])) {
                        $continue = 0;
                    }
                }
                if ($continue) {
                    mysqli_query($conn, "TRUNCATE TABLE article");
                
                    $sql = "SET NAMES utf8";
                    mysqli_query($conn, $sql);
                    for ($i = 0; $i < $amount; $i++) {
                        $caption = $_POST["article_caption$i"];
                        $text = $_POST["article_text$i"];
                        $number = $_POST["order$i"];
                        $link = $_POST["article_link$i"];
                        mysqli_query($conn, "INSERT INTO article (number, heading, summary, link, date_time) VALUES (\"$number\", \"$caption\", \"$text\",\"$link\", CURRENT_TIME())");
                    }
                }
            }
            if(isset($_POST['full_submit']) && isset($_POST['full'])) {
                $value = $_POST['full'];
                mysqli_query($conn, "TRUNCATE TABLE full");
                
                $sql = "SET NAMES utf8";
                mysqli_query($conn, $sql);
                if(!mysqli_query($conn, "INSERT INTO full (name) VALUES (\"$value\")")) {
                    echo mysqli_error($conn);
                }
            }
            if(isset($_POST['submit_footer']) && isset($_POST['footer']) && isset($_POST['footer_link'])) {
                $footer = $_POST['footer'];
                $link = $_POST['footer_link'];
                $result = $footer . "<a href=#>" .$link;
                mysqli_query($conn, "TRUNCATE TABLE footer");
                
                $sql = "SET NAMES utf8";
                mysqli_query($conn, $sql);
                if(!mysqli_query($conn, "INSERT INTO footer (name) VALUES (\"$result\")")) {
                    echo mysqli_error($conn);
                }
            }
        ?>
    </head>
    <body>
        <p>Створення категорії</p>
        <form action="admin.php" method="post">
           <p>Name: <input required></p>
           <p>Description: <input required></p> 
           <p><input type="submit" value="submit"></p>
        </form>
        <p>Створення продукту</p>
        <form action="admin.php" method="post">
           <p>Name: <input required></p>
           <p>Description: <input required></p>
           <p>Image_url: <input required></p> 
           <p>Price: <input required></p> 
           <p>Special_price: <input></p> 
           <p>Category_name: <input required></p> 
           <p><input type="submit" value="submit"></p> 
        </form>
    </body>
    <?php mysqli_close($conn); ?>
</html>