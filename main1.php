
<?php
include 'db.php';

// fetch data from database
function fetchWeatherFromDatabase($city){
    global $conn;

    $sevenDaysAgo = date('Y-m-d', strtotime('-7 days'));

    // escape the city variable to prevent SQL injection
    $city = $conn->real_escape_string($city);

    $sql = "SELECT * FROM weather WHERE q = '$city' and record_date > '$sevenDaysAgo' GROUP BY (record_date)";
    $result = $conn -> query($sql);

$weatherData = array();
if ($result -> num_rows > 0){
    while ($row = $result -> fetch_assoc()){
        $weatherData[] = $row;
    }
}
return $weatherData;
}

// set the city you want to retrieve data for
$city = "Avadi";

$weatherDataFromDB = fetchWeatherFromDatabase($city);

echo json_encode($weatherDataFromDB);


// close database connection
$conn -> close();
?>
