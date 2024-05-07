
<?php
include 'db.php';

// check if the 'city' parameter is set in the URL query string
// for eg: q=$city; pair of key and value
if (isset($_GET['q'])) {
    // sanitize and validate the city parameter
    $city = filter_var($_GET['q'], FILTER_SANITIZE_STRING);

    // check is the city parameter is not empty
    if (!empty($city)) {
        // fetch data from the openWeatherMap API
        $apiKey = "32fe44e76d0bfe1793f388366eef2320";
        $apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=$city&appid=$apiKey&units=metric";

        $weatherData = file_get_contents($apiUrl);

        // check is the API response is valid
        if ($weatherData !== false) {

            // decode the JSON string into a php associative array
            $weatherArray = json_decode($weatherData, true);

            // extract data
            $temperature = isset($weatherArray['main']['temp']) ? $weatherArray['main']['temp'] : null;
            $humidity = isset($weatherArray['main']['humidity']) ? $weatherArray['main']['humidity'] : null;
            $weatherCondition = isset($weatherArray['weather'][0]['description']) ? $weatherArray['weather'][0]['description'] : null;
            $pressure = isset($weatherArray['main']['pressure']) ? $weatherArray['main']['pressure'] : null;
            $windSpeed = isset($weatherArray['wind']['speed']) ? $weatherArray['wind']['speed'] : null;
            $weatherIcon = isset($weatherArray['weather'][0]['icon']) ? $weatherArray['weather'][0]['icon'] : null;

            $iconUrl = "https://openweathermap.org/img/w/".$weatherIcon.".png";
            

            // store it in the database
            $insertQuery = "INSERT INTO weather(q, record_date, temperature, pressure, humidity, weatherCondition, windSpeed, weatherIcon) 
            VALUES ('$city', CURDATE(), '$temperature', '$pressure', '$humidity', '$weatherCondition', '$windSpeed', '$iconUrl')";
            
            // if ($conn->query($insertQuery) === TRUE) {
            //     // Data inserted successfully
            //     echo "Weather data inserted successfully";
            // } else {
            //     // Error inserting data
            //     echo "Error inserting weather data: " . $conn->error;
            // }

            // return the weather data
            $weatherArray['weatherIcon'] =  $iconUrl;
            echo json_encode($weatherArray);
        }
    } else {
        // handle error fetching data from API
        echo json_encode(["error" => "Error fetching weather data from API"]);
    }
} else {
    // handle case when 'city' parameter is empty
    echo json_encode(["error" => "City parameter not provided."]);
}
$conn->close();
?>
