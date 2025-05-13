// Define constants for API URLs
const weatherAPIKey = "f7b88c519297f43bb6c165ec8f81eff7"; // Replace with your OpenWeatherMap API key
const geoAPIURL = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=" + weatherAPIKey + "&units=metric";
const cityAPIURL = "https://api.openweathermap.org/data/2.5/weather?q={cityName}&appid=" + weatherAPIKey + "&units=metric";
const forecastAPIURL = "https://api.openweathermap.org/data/2.5/forecast?q={cityName}&appid=" + weatherAPIKey + "&units=metric";

// Select DOM elements
const weatherContainer = document.getElementById('weather');
const mapContainer = document.getElementById('map');
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const loadingText = document.getElementById('loadingText');
const forecastContainer = document.getElementById('forecast');

// Initialize the Leaflet map
let map = L.map(mapContainer).setView([51.505, -0.09], 2);  // Default coordinates (can be updated later)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to fetch weather data by city name
function fetchWeatherByCity(city) {
  const url = cityAPIURL.replace("{cityName}", city);
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
      fetchForecast(city);  // Fetch forecast after displaying current weather
      updateMap(data.coord.lat, data.coord.lon); // Update map with coordinates
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      alert("City not found. Please try again.");
      hideLoading();
    });
}

// Function to fetch weather data by geolocation
function fetchWeatherByGeolocation(lat, lon) {
  const url = geoAPIURL.replace("{lat}", lat).replace("{lon}", lon);
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
      fetchForecastByGeolocation(lat, lon);  // Fetch forecast after displaying current weather
      updateMap(lat, lon); // Update map with current geolocation
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      alert("Could not fetch weather data. Please try again.");
      hideLoading();
    });
}

// Function to display weather data on the page
function displayWeather(data) {
  weatherContainer.innerHTML = `
    <h2>${data.name}</h2>
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
  weatherContainer.style.transform = "scale(1)"; // Add transition effect when new data is shown
  hideLoading();
}

// Function to fetch 5-day forecast for the given city
function fetchForecast(city) {
  const url = forecastAPIURL.replace("{cityName}", city);
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayForecast(data);
    })
    .catch(error => {
      console.error("Error fetching forecast data:", error);
      alert("Could not fetch forecast data. Please try again.");
      hideLoading();
    });
}

// Function to display 5-day forecast data
function displayForecast(data) {
  forecastContainer.innerHTML = `<h3>5-Day Forecast</h3>`;
  
  // Loop through forecast data (3-hour intervals, so we pick one from each day)
  for (let i = 0; i < 5; i++) {
    const day = new Date(data.list[i * 8].dt * 1000).toLocaleDateString(); // 8 data points per day
    const temp = data.list[i * 8].main.temp;
    const description = data.list[i * 8].weather[0].description;
    const icon = data.list[i * 8].weather[0].icon; // Get weather icon

    forecastContainer.innerHTML += `
      <div class="forecast-day">
        <p><strong>${day}</strong></p>
        <p>Temp: ${temp}°C</p>
        <p>Description: ${description}</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}" />
      </div>
    `;
  }
}

// Function to update the map with new coordinates
function updateMap(lat, lon) {
  map.setView([lat, lon], 10); // Adjust zoom level to 10 for city-level view
  L.marker([lat, lon]).addTo(map)
    .bindPopup("Location")
    .openPopup();
}

// Function to show loading text while waiting for API responses
function showLoading() {
  loadingText.style.display = "block";
  weatherContainer.style.transform = "scale(0.9)"; // Shrink weather container while loading
}

// Function to hide loading text
function hideLoading() {
  loadingText.style.display = "none";
}

// Event listener for city search
searchButton.addEventListener('click', function() {
  const city = cityInput.value;
  if (city) {
    showLoading();
    fetchWeatherByCity(city);
  }
});

// Event listener for geolocation-based weather
window.onload = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      showLoading();
      fetchWeatherByGeolocation(position.coords.latitude, position.coords.longitude);
    }, function() {
      alert("Geolocation is not supported or permission denied.");
      hideLoading();
    });
  } else {
    alert("Geolocation is not supported by this browser.");
    hideLoading();
  }
};
