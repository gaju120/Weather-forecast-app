

# 🌤️ Weather Forecast APP

A simple, responsive weather forecast app that lets you search for any city and see its current weather conditions. Built as a portfolio project using only HTML5, Bootstrap 5, custom CSS, and vanilla JavaScript — no frameworks, no build tools.

## ✨ Features

- 🔍 Search for weather by city name
- 🏙️ City name and country
- 🌡️ Current temperature and "feels like" temperature
- ☁️ Weather description with matching icon
- 💧 Humidity percentage
- 💨 Wind speed
- ⏳ Loading spinner while data is being fetched
- ⚠️ Friendly error message for invalid city names
- 📱 Fully responsive layout using Bootstrap's grid system

## 🛠️ Built With

- **HTML5** – semantic page structure
- **Bootstrap 5** – grid system and base components (via CDN)
- **Custom CSS** – color palette, typography, and the "frosted glass" card styling
- **Vanilla JavaScript** – `fetch`, `async`/`await`, and DOM manipulation (no frameworks or libraries)
- **[OpenWeatherMap API](https://openweathermap.org/api)** – live weather data

## 📁 Project Structure

```
Weather-Forecast-App/
├── index.html    # Page structure and layout
├── style.css      # Custom styling (colors, fonts, layout)
├── script.js       # Search logic, API calls, DOM updates
└── README.md      # Project documentation (this file)
```

## 🚀 Getting Started

### 1. Get a free API key
1. Create a free account at [OpenWeatherMap](https://home.openweathermap.org/users/sign_up)
2. Go to the **API keys** tab in your account and copy your key
3. New keys can take a little while to activate — don't worry if it doesn't work in the first few minutes

### 2. Add your API key
Open `script.js` and replace the placeholder with your real key:

```js
const API_KEY = "YOUR_API_KEY";
```

### 3. Run the app
This is a static site — no installs or build tools required.
- Open `index.html` directly in your browser, **or**
- Use an extension like VS Code's "Live Server" for auto-reload while editing

## 🎯 How to Use

1. Type a city name into the search box (e.g. `London`, `Tokyo`, `New York`)
2. Click **Search**, or just press **Enter**
3. View the temperature, conditions, humidity, and wind speed
4. If the city can't be found, a friendly error message appears instead

## 🌱 Possible Future Improvements

- 5-day forecast view
- "Use my location" button with the Geolocation API
- °C / °F unit toggle
- Recent search history
- Light/dark theme switch

## 🙌 Credits

- Weather data from [OpenWeatherMap](https://openweathermap.org/)
- Components from [Bootstrap 5](https://getbootstrap.com/)
- Fonts from [Google Fonts](https://fonts.google.com/) — Poppins & Inter

## 👤 Author

**Your Name**
Portfolio: your-portfolio-link.com · GitHub: [@yourusername](https://github.com/yourusername)

## 📄 License

This project is open source and free to use for learning purposes.
