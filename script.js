// ============================================
// Weather Forecast App — script.js
// ============================================
// This file:
// 1. Grabs references to the HTML elements we need
// 2. Listens for the user searching (click or Enter key)
// 3. Fetches weather data from the OpenWeatherMap API
// 4. Updates the page with the result — or shows an error

// ----- 1. Configuration -----
// Get a free key at https://openweathermap.org/api and paste it below.
const API_KEY = "aef3f8774f9ebb0c5349544464d6a995";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// ----- 2. References to the HTML elements -----
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const loadingSpinnerEl = document.getElementById("loadingSpinner");
const errorMessageEl = document.getElementById("errorMessage");
const weatherCardEl = document.getElementById("weatherCard");

const cityNameEl = document.getElementById("cityName");
const countryNameEl = document.getElementById("countryName");
const weatherIconEl = document.getElementById("weatherIcon");
const temperatureEl = document.getElementById("temperature");
const descriptionEl = document.getElementById("description");
const feelsLikeEl = document.getElementById("feelsLike");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("windSpeed");

// ----- 3. Small helper functions to show/hide sections -----
// Keeping these separate keeps the main search logic easy to follow.

function showLoading() {
  loadingSpinnerEl.classList.remove("d-none");
  errorMessageEl.classList.add("d-none");
  weatherCardEl.classList.add("d-none");
}

function hideLoading() {
  loadingSpinnerEl.classList.add("d-none");
}

function showError(message) {
  errorMessageEl.textContent = message;
  errorMessageEl.classList.remove("d-none");
  weatherCardEl.classList.add("d-none");
}

function hideError() {
  errorMessageEl.classList.add("d-none");
}

// ----- Weather category helper -----
// OpenWeatherMap returns many specific condition names (e.g. "Rain",
// "Drizzle", "Haze"...). We group them into the 6 categories our
// CSS gradients in style.css are built for: clear, clouds, rain,
// thunderstorm, snow, mist.
function getWeatherCategory(mainCondition) {
  const condition = mainCondition.toLowerCase();

  if (condition === "clear") return "clear";
  if (condition === "clouds") return "clouds";
  if (condition === "rain" || condition === "drizzle") return "rain";
  if (condition === "thunderstorm") return "thunderstorm";
  if (condition === "snow") return "snow";
  if (["mist", "fog", "haze", "smoke", "dust", "sand", "ash"].includes(condition)) {
    return "mist";
  }

  return "clear"; // sensible fallback for anything unexpected
}

// ----- 4. Write the weather data onto the page -----
function displayWeather(data) {
  // "data" is the JSON object OpenWeatherMap sends back.
  // We pick out the pieces the app needs and insert them into the page.

  cityNameEl.textContent = data.name;
  countryNameEl.textContent = data.sys.country;

  temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
  descriptionEl.textContent = data.weather[0].description;
  feelsLikeEl.textContent = `${Math.round(data.main.feels_like)}°C`;
  humidityEl.textContent = `${data.main.humidity}%`;
  windSpeedEl.textContent = `${data.wind.speed} m/s`;

  // OpenWeatherMap gives us a short icon code (e.g. "04d").
  // We use it to build the URL of the matching icon image.
  const iconCode = data.weather[0].icon;
  weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIconEl.alt = data.weather[0].description;

  weatherCardEl.classList.remove("d-none");

  // Update the page background to match this city's current weather.
  const category = getWeatherCategory(data.weather[0].main);
  document.body.setAttribute("data-weather", category);
}

// ----- 5. Fetch weather data for a given city -----
async function getWeather(city) {
  showLoading();
  hideError();

  // encodeURIComponent() makes city names with spaces/accents URL-safe
  // (e.g. "New York" -> "New%20York"). units=metric gives us Celsius
  // instead of the API's default unit, Kelvin.
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    // fetch() only throws on a network failure — a "city not found"
    // response still arrives successfully, just with a 404 status.
    // So we check response.status ourselves and throw our own errors.
    if (response.status === 401) {
      throw new Error("Invalid API key. Add your OpenWeatherMap key to API_KEY in script.js.");
    }
    if (response.status === 404) {
      throw new Error("City not found. Please check the spelling and try again.");
    }
    if (!response.ok) {
      throw new Error("Something went wrong. Please try again later.");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    // Runs for network errors AND for the errors we threw above.
    showError(error.message);
    console.error("Weather fetch failed:", error);
  } finally {
    // finally always runs, whether the fetch succeeded or failed —
    // a reliable place to turn the spinner off either way.
    hideLoading();
  }
}

// ----- 6. Read the input box and start a search -----
function handleSearch() {
  const city = cityInput.value.trim();

  if (city === "") {
    showError("Please enter a city name.");
    return;
  }

  getWeather(city);
}

// ----- 7. Event Listeners -----
// Search when the button is clicked...
searchBtn.addEventListener("click", handleSearch);

// ...or when the user presses "Enter" inside the input box.
cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleSearch();
  }
});
