// --- DOM Element References ---
const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const loader = document.getElementById('loader');
const errorDisplay = document.getElementById('error-display');
const weatherDisplay = document.getElementById('weather-display');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const weatherIcon = document.getElementById('weather-icon');

// --- API Configuration ---
const apiKey = '1b0874642c28a3a34c92da91dd035eb8'; 
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// --- Event Listeners ---
weatherForm.addEventListener('submit', handleFormSubmit);

/**
 * Handles the form submission event.
 * @param {Event} e The submit event object.
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    const city = cityInput.value.trim();

    if (!city) {
        displayError('Please enter a city name or zip code.');
        return;
    }

    // Reset UI state
    hideAllSections();
    loader.classList.remove('hidden');

    try {
        const weatherData = await fetchWeather(city);
        displayWeather(weatherData);
    } catch (error) {
        displayError(error.message);
    } finally {
        loader.classList.add('hidden');
    }
}

/**
 * Fetches weather data from the OpenWeatherMap API.
 * @param {string} city The city name or zip code.
 * @returns {Promise<object>} A promise that resolves to the weather data object.
 */
async function fetchWeather(city) {
    const url = `${apiBaseUrl}?q=${city}&appid=${apiKey}&units=metric`; // Use 'imperial' for Fahrenheit

    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`City not found: "${city}"`);
        } else if (response.status === 401) {
            throw new Error('Invalid API Key. Please check your key.');
        } else {
            throw new Error(`An error occurred: ${response.statusText}`);
        }
    }

    const data = await response.json();
    return data;
}

/**
 * Displays the fetched weather data on the UI.
 * @param {object} data The weather data from the API.
 */
function displayWeather(data) {
    hideAllSections();
    
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`; // Or °F if using imperial units
    weatherDescription.textContent = data.weather[0].description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    weatherDisplay.classList.remove('hidden');
}

/**
 * Displays an error message on the UI.
 * @param {string} message The error message to display.
 */
function displayError(message) {
    hideAllSections();
    errorDisplay.textContent = message;
    errorDisplay.classList.remove('hidden');
}

/**
 * Hides all dynamic content sections (weather, error).
 */
function hideAllSections() {
    weatherDisplay.classList.add('hidden');
    errorDisplay.classList.add('hidden');
}
