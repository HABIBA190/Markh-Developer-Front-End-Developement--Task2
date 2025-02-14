const API_KEY = "c1cfb860d67e4970b12cc730adce7338" 
const cityInput = document.getElementById("cityInput")
const searchBtn = document.getElementById("searchBtn")
const weatherInfo = document.getElementById("weatherInfo")
let updateInterval

async function fetchWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    console.log("Fetching weather data from:", url)

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log("Received data:", data)

    if (data.cod === "404") {
      throw new Error("City not found. Please try again.")
    }

    displayWeather(data)
  } catch (error) {
    console.error("Error fetching weather data:", error)
    alert(`An error occurred: ${error.message}`)
    weatherInfo.style.display = "none"
  }
}

function displayWeather(data) {
  const { name, timezone } = data
  const { icon, description, main } = data.weather[0]
  const { temp, humidity } = data.main
  const { speed } = data.wind

  const localTime = new Date(Date.now() + timezone * 1000)

  document.getElementById("cityName").textContent = name
  document.getElementById("localTime").textContent = `Local Time: ${localTime.toLocaleTimeString()}`
  document.getElementById("localDate").textContent = `Local Date: ${localTime.toLocaleDateString()}`
  document.getElementById("weatherCondition").textContent = `Weather Condition: ${main}`
  document.getElementById("temperature").textContent = `Temperature: ${temp.toFixed(1)}°C`
  document.getElementById("description").textContent = `Description: ${description}`
  document.getElementById("humidity").textContent = `Humidity: ${humidity}%`
  document.getElementById("windSpeed").textContent = `Wind Speed: ${speed} m/s`
  document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`
  document.getElementById("weatherIcon").alt = `Weather icon for ${main}`
  document.getElementById("lastUpdated").textContent = `Last Updated: ${new Date().toLocaleTimeString()}`

  weatherInfo.style.display = "block"
}

function startLiveUpdates(city) {
  if (updateInterval) {
    clearInterval(updateInterval)
  }
  fetchWeather(city)
  updateInterval = setInterval(() => fetchWeather(city), 30000) 
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim()
  if (city) {
    startLiveUpdates(city)
  } else {
    alert("Please enter a city name")
  }
})

cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const city = cityInput.value.trim()
    if (city) {
      startLiveUpdates(city)
    } else {
      alert("Please enter a city name")
    }
  }
})


if (API_KEY === "YOUR_OPENWEATHER_API_KEY") {
  alert("Please set your OpenWeatherMap API key in the script.js file")
}


document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.getElementById("body");

  if (localStorage.getItem("darkMode") === "enabled") {
      enableDarkMode();
  }

  darkModeToggle.addEventListener("click", () => {
      if (body.classList.contains("bg-gray-900")) {
          disableDarkMode();
      } else {
          enableDarkMode();
      }
  });

  function enableDarkMode() {
      body.classList.add("bg-gray-900", "text-white");
      body.classList.remove("bg-gradient-to-r");
      darkModeToggle.textContent = "☀️";
      localStorage.setItem("darkMode", "enabled");
  }

  function disableDarkMode() {
      body.classList.remove("bg-gray-900", "text-white");
      body.classList.add("bg-gradient-to-r");
      darkModeToggle.textContent = "🌙";
      localStorage.setItem("darkMode", "disabled");
  }
});


