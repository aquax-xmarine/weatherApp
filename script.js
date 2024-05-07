function getWeather(cityInput){
    const localStorageData = localStorage.getItem(cityInput)
    if (localStorageData){
        displayWeatherInfo(JSON.parse(localStorageData))
    }else{
        // display a message indicating no data is available
        const weatherInfoContainer = document.getElementById("weatherInfo")
        weatherInfoContainer.innerHTML = "<p>No weather data available for this city.</p>"
        // check for internet connection before attempting to fetch data
        if (navigator.onLine){
        // show a button to allow the user to fetch data from the API
        weatherInfoContainer.innerHTML += "<button id = 'fetchDataButton'>Fetch Data</button>"
        // add event listener to the button to fetch data from the API when clicked
        document.getElementById('fetchDataButton').addEventListener("click", ()=> {
            fetchWeatherFromPhp(cityInput)  
        })
        }
        
    }
}

function fetchWeatherFromPhp(cityInput) {
    // Fetch weather data from the API
    fetch(`https://nikishashrestha.000webhostapp.com/main.php?q=${cityInput}`)
        // q = parameter used to specify the city name for which we want to retrieve weather information.
        // units=metric(used to get temperature in celsius)
        .then(async (response) => {
            // console.log(response)
            if (!response.ok){
                throw new Error('Network response was not ok');
            }
            try{
                // parse json response
                return await response.json(); 
            } catch (error) {
                throw new Error('Error parsing JSON data: ' + error.message)
            }
            
        })
        .then(data => {
            // handle parsed json data
            // console.log(data)
            displayWeatherInfo(data)
            localStorage.setItem(cityInput, JSON.stringify(data))

            
        })
        .catch(error => {
            // handle errors
            console.error('The city that you entered is invalid.  ', error)
            // Inform the user about the error
            const weatherInfoContainer = document.getElementById("weatherInfo");
            weatherInfoContainer.innerHTML = "<p>The city that you entered is invalid.</p>";
        })
    }

           
function displayWeatherInfo(data) {
    const weatherInfoContainer = document.getElementById("weatherInfo");
    const cityName = data.name;
    // Create a new Date object
    var currentDate = new Date();
    // creates new date object representing current date and time

    // Get the current date
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
    var year = currentDate.getFullYear();

    // Get the current day
    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayOfWeek = daysOfWeek[currentDate.getDay()];

    const weatherCondition = data.weather[0].description;
    const weatherIcon = data.weather[0].icon
    // console.log(weatherIcon)

    const temperature = data.main.temp;
    const pressure = data.main.pressure
    const humidity = data.main.humidity
    const windSpeed = data.wind.speed

    const weatherHTML = `
      
      <h1>${temperature}°</h1>
      <h1>${weatherCondition} </h1>
      <p><img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"></p>
      <h1>${cityName}</h1>
      <hr/>
      <p>${dayOfWeek}, ${month}/${day}/${year}</p>
      <table class ="weatherContainerinfo">
      <tr>
      <td>
      <p><b>Pressure:</b></p>
      <p>${pressure} hPa</p>
      </td>
      <td>
      <p><b>Humidity:</b></p>
      <p> ${humidity} %</p>
      </td>
      <td>
      <p><b>Wind Speed:</b></p>
      <p> ${windSpeed} m/s</p>
      </td>
      </table>
  `
    weatherInfoContainer.innerHTML = weatherHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    const defaultCity = 'avadi';
    getWeather(defaultCity)
});



document.getElementById("cityInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const cityInput = document.getElementById("cityInput").value;
        // retrieves the value entered by the user
        if (cityInput === "") {
            alert("The search is empty. Please enter a valid city.");
        } else {
            getWeather(cityInput);
        }
    }
});



// Nikisha Shrestha
2408239


