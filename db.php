
<?php

$servername = "localhost";
$username = "id21876268_nikisha";
$password = "Bokunodarlin'02$";
$dbname = "id21876268_nikisha";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn-> connect_error){
    die("Connection failed: " . $conn->connect_error);
}else{
    //echo "SQL connected";
}
?>
