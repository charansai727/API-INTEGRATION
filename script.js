const weatherAPIKey = "f7b88c519297f43bb6c165ec8f81eff7";
const geoAPIURL = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=" + weatherAPIKey + "&units=metric";
const cityAPIURL = "https://api.openweathermap.org/data/2.5/weather?q={cityName}&appid=" + weatherAPIKey + "&units=metric";
const forecastAPIURL = "https://api.openweathermap.org/data/2.5/forecast?q={cityName}&appid=" + weatherAPIKey + "&units=metric";

const weatherContainer = document.getElementById('weather');
const mapContainer = document.getElementById('map');
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const loadingText = document.getElementById('loadingText');
const forecastContainer = document.getElementById('forecast');

let map = L.map(mapContainer).setView([20.5937, 78.9629], 2);
let marker;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

function fetchWeatherByCity(city) {
  const url = cityAPIURL.replace("{cityName}", city);
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      displayWeather(data);
      fetchForecast(city);
      updateMap(data.coord.lat, data.coord.lon, data.name);
    })
    .catch(error => {
      console.error("City weather fetch error:", error);
      showError("City not found. Please try again.");
      hideLoading();
    });
}

function fetchWeatherByGeolocation(lat, lon) {
  const url = geoAPIURL.replace("{lat}", lat).replace("{lon}", lon);
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch geolocation weather");
      return response.json();
    })
    .then(data => {
      displayWeather(data);
      fetchForecastByGeolocation(lat, lon);
      updateMap(lat, lon, "Your Location");
    })
    .catch(() => fetchWeatherByIP());
}

function fetchWeatherByIP() {
  fetch("https://ipapi.co/json/")
    .then(res => res.json())
    .then(loc => {
      fetchWeatherByCity(loc.city);
    })
    .catch(() => {
      showError("Could not fetch weather data.");
      hideLoading();
    });
}

function displayWeather(data) {
  const feelsLike = data.main.feels_like;
  const emoji = feelsLike >= 30 ? '🔥' : feelsLike <= 10 ? '❄️' : '😊';
  const tips = [
    "Stay hydrated in hot weather!",
    "Carry an umbrella if it's cloudy.",
    "Windy days are great for flying kites!",
    "Check UV index before going out.",
    "Cold? Wear layers to stay warm!"
  ];
  const timezoneOffset = data.timezone; // seconds
  const localTime = new Date(Date.now() + timezoneOffset * 1000).toUTCString();

  // Dynamic background
  const weatherMain = data.weather[0].main.toLowerCase();
  document.body.className = weatherMain;

  // Weather UI
  weatherContainer.innerHTML = `
    <h2>${data.name}</h2>
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Feels Like:</strong> ${feelsLike}°C ${emoji}</p>
    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    <p><strong>Local Time:</strong> ${localTime}</p>
    <p style="font-style: italic;">💡 ${tips[Math.floor(Math.random() * tips.length)]}</p>
  `;
  hideLoading();

  // Voice feedback
  const msg = new SpeechSynthesisUtterance(`Weather in ${data.name} is ${data.weather[0].description} with temperature of ${data.main.temp} degrees.`);
  window.speechSynthesis.speak(msg);
}

function fetchForecast(city) {
  const url = forecastAPIURL.replace("{cityName}", city);
  fetch(url)
    .then(response => response.json())
    .then(data => displayForecast(data))
    .catch(() => showError("Could not load forecast."));
}

function displayForecast(data) {
  forecastContainer.innerHTML = `<h3>5-Day Forecast</h3>`;
  for (let i = 0; i < 5; i++) {
    const item = data.list[i * 8];
    const day = new Date(item.dt * 1000).toLocaleDateString();
    const temp = item.main.temp;
    const desc = item.weather[0].description;
    const icon = item.weather[0].icon;

    forecastContainer.innerHTML += `
      <div class="forecast-day">
        <p><strong>${day}</strong></p>
        <p>Temp: ${temp}°C</p>
        <p>${desc}</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}" />
      </div>
    `;
  }
}

function updateMap(lat, lon, cityName) {
  map.setView([lat, lon], 10);
  if (marker) map.removeLayer(marker);
  marker = L.marker([lat, lon]).addTo(map)
    .bindPopup(`<strong>${cityName}</strong>`)
    .openPopup();
}

function showLoading() {
  loadingText.style.display = "block";
  weatherContainer.style.transform = "scale(0.9)";
}

function hideLoading() {
  loadingText.style.display = "none";
}

function showError(message) {
  weatherContainer.innerHTML = `<p style="color: red;">${message}</p>`;
}

searchButton.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    showLoading();
    fetchWeatherByCity(city);
  }
});

window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        showLoading();
        fetchWeatherByGeolocation(pos.coords.latitude, pos.coords.longitude);
      },
      () => fetchWeatherByIP()
    );
  } else {
    fetchWeatherByIP();
  }
};
