# API-INTEGRATION

*COMPANY* : CODTECH IT SOLUTIONS

*NAME* : GRANDHE CHARAN SAI

*INTERN ID* : CT06DL451

*DOMAIN* : FULL STACK WEB DEVELOPMENT

*DURATION* : 6 WEEKS

*MENTOR* : NEELA SANTOSH

Project Overview: Weather Application Using OpenWeatherMap API and Leaflet
In this task, I developed a Weather Application that integrates weather data from the OpenWeatherMap API and displays geographical information using Leaflet, an open-source JavaScript library for interactive maps. The app enables users to check current weather conditions, 5-day weather forecasts, and location-based weather updates using either city names or geolocation (latitude and longitude).
The purpose of this project was to build a Progressive Web App (PWA) that would provide users with accurate, real-time weather information. It is designed to be responsive and interactive, delivering an intuitive user experience that’s both informative and visually engaging.
Tools and Technologies Used:
OpenWeatherMap API:
The main tool I used to fetch weather data. OpenWeatherMap is a widely used weather service that provides detailed weather forecasts, historical weather data, and other related services such as air quality monitoring. The free plan of OpenWeatherMap gives access to current weather data, forecasts, historical data for up to 5 days, and geolocation data, making it ideal for this application.
Key endpoints used in this app include:
/weather: Fetches the current weather of a specific city.
/forecast: Provides a 5-day weather forecast at 3-hour intervals.
/geocoding: Converts city names to geographical coordinates (latitude and longitude).
/air_pollution: Provides air quality data based on location.
Leaflet.js:
A powerful JavaScript library I used for creating interactive maps. Leaflet allows me to display a dynamic map that can show user locations or any other geographical data. It integrates seamlessly with other mapping services like OpenStreetMap to provide a free and reliable mapping solution.
In this project, I used Leaflet to display the location of the city searched by the user or the current geolocation of the user. This was achieved using Leaflet's L.map and L.marker methods to display the map and update markers based on the geographical coordinates.
HTML, CSS, and JavaScript:
HTML: The markup language I used to structure the web application. I used HTML to create elements such as text inputs, buttons, and containers for displaying weather data.
CSS: Used to style the page, making it responsive, visually appealing, and user-friendly. Basic CSS styles were used for layout, typography, and interactive elements like buttons.
JavaScript: The scripting language I used to handle interactions, fetch data from the OpenWeatherMap API, and dynamically update the DOM based on the weather data retrieved. It also handles user geolocation and integrates the Leaflet map to display the user’s or searched location.
VS Code (Visual Studio Code):
The code editor I used for writing and managing the project files. Visual Studio Code is a popular and robust code editor that is lightweight, supports a wide range of extensions, and offers features like syntax highlighting, auto-completion, and version control integration (via Git).
VS Code was chosen for this project because of its versatility and features, which make it ideal for developing web applications. The live-server extension in VS Code enabled easy testing and real-time previewing of the application in the browser.
Browser Developer Tools:
Browsers like Google Chrome and Mozilla Firefox were used for testing and debugging. The developer tools in these browsers helped inspect the HTML/CSS layout, view API responses, check for errors in JavaScript, and optimize the performance of the web application.
Task Details and Implementation:
The task involved developing a web application that:
Allows users to search for weather information based on city names or their geolocation (latitude and longitude).
Fetches current weather data and displays it dynamically on the page, including:
Temperature (in Celsius, Fahrenheit, and Kelvin)
Weather description (e.g., sunny, rainy)
Wind speed and direction
Humidity, air pressure, and visibility
Weather icons to visually represent the weather conditions.
Retrieves and displays a 5-day weather forecast at 3-hour intervals for the searched city.
Integrates Leaflet.js to show an interactive map with a marker indicating the location of the city or the user's geolocation.
Features of the Weather App:
Weather Information: The app provides detailed weather data like temperature, weather description, wind speed, humidity, pressure, and visibility. Each detail is presented clearly with units for easy interpretation.
5-Day Forecast: Users can view a 5-day forecast, with weather information updated at 3-hour intervals. This gives users a more comprehensive view of upcoming weather conditions.
Interactive Map: Leaflet was used to display an interactive map that shows the user’s current location or the location of the searched city. This map can be zoomed in/out and panned for a better view.
Geolocation: The app automatically detects the user’s geolocation using the browser’s geolocation API. This feature makes it easy for users to get weather information based on their current location without needing to type a city name.
Use Cases and Applications:
This weather app can be applied in various real-world scenarios:
Personal Use: People can use the app to check the weather and plan their day accordingly. Whether they’re commuting, traveling, or planning outdoor activities, real-time weather data can be invaluable.
Travel Apps: Travel and tourism applications can integrate weather features to provide users with relevant, location-based weather forecasts and maps to enhance their travel planning.
Event Planning: Event planners can use weather data to anticipate conditions on the day of the event, ensuring they can prepare for any weather-related challenges.
Education: This app can be used as a learning tool for students to understand how APIs work, how geolocation and weather data can be integrated into applications, and how web development tools like Leaflet can be used to build interactive maps.
Conclusion:
The task provided an excellent opportunity for me to apply key web development technologies and concepts, including API integration, dynamic DOM manipulation, interactive mapping, and responsive design. By using OpenWeatherMap and Leaflet.js, I was able to create a functional and visually appealing weather application. The project highlighted the importance of using modern web tools such as VS Code for efficient development and browser developer tools for testing and debugging. The weather app is practical, interactive, and can be further expanded with more features such as hourly forecasts, personalized settings, or integration with additional APIs for more weather-related services.
By using VS Code as my development environment, I leveraged its powerful features for an optimized and smooth coding experience. The combination of these tools allowed for a seamless development process, resulting in a highly functional, user-friendly weather application.
