// const cityInput = document.querySelector('.city_input');
// const searchBtn = document.querySelector('.search_btn');

// const weatherInfoSection = document.querySelector('.weatherInfo_section')
// const notFoundSection = document.querySelector('.search_error');
// const searchSection = document.querySelector('.search_city');

// const countryName = document.querySelector('.country_text');
// const temperature = document.querySelector('.tempt_text');
// const condition = document.querySelector('.condition');
// const humidityValue = document.querySelector('.humidity_value');
// const windSpeedValue = document.querySelector('.wind_speed');
// const wheatherImg = document.querySelector('.main_weather_ph');
// const currentData = document.querySelector('.current_day');
// const forecastItemContainer = document.querySelector('.third_sec_conteiner');

// const APIKey = '1731699e8320c2f46755d58311490467';

// // document.addEventListener('DOMContentLoaded', () => {
// //     const lastCity = localStorage.getItem('lastCity');
// //     if (lastCity) {
// //         updateWeatherInfo(lastCity);

// //     }
// // });

// searchBtn.addEventListener('click', () => {
//     if(cityInput.value.trim() != '') {
//         updateWeatherInfo(cityInput.value);
//         localStorage.setItem('lastCity', cityInput.value);
//         cityInput.value = ''
//         cityInput.blur()
//     }
// })
// cityInput.addEventListener('keydown', (event) => {
//     if(event.key == 'Enter' && 
//         cityInput.value.trim() != ''
//     ) {
//         updateWeatherInfo(cityInput.value) 
//         localStorage.setItem('lastCity', cityInput.value);
//         cityInput.value = ''
//         cityInput.blur()
//     }
// })

// function getCurrentDate() {
//     const mimdenareDate = new Date() 
//     const options = { 
//         weekDay: 'short',
//         day: '2-digit',
//         month: 'short'
//     }
//     return mimdenareDate.toLocaleDateString('en-GB', options);
// }


// async function getFetchData(endPoint, city) {
//     const APIUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${APIKey}&units=metric`;
//     const response = await fetch(APIUrl);
//     return response.json();
// }

// async function updateWeatherInfo(city) {
//     const weatherData = await getFetchData('weather', city);
//     if(weatherData.cod != 200) {
//         showDisplaySection(notFoundSection)
//         return
//     }
//     console.log(weatherData)

//     const {
//         name: country,
//         main: {temp, humidity},
//         weather: [{ id, main, icon }],
//         wind: {speed} } = weatherData;

//         countryName.textContent = country;
//         temperature.textContent = Math.round(temp) + ' °C';
//         condition.textContent = main;
//         humidityValue.textContent = humidity + ' %';
//         windSpeedValue.textContent = speed + '  M/s';
//         condition.textContent = main;
//         wheatherImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
//         currentData.textContent = getCurrentDate()
    
        
//         await updateForecastsInfo(city)
//     showDisplaySection(weatherInfoSection)
// }
// async function updateForecastsInfo(city) {
//     const forecastData = await getFetchData('forecast', city);
//     const timeTaken = '12:00:00';
//     const todayDate = new Date().toISOString().split('T')[0];
   
//     forecastItemContainer.innerHTML = '';
//     forecastData.list.forEach(forecastWeather => { 
//     if(forecastWeather.dt_txt.includes(timeTaken) && 
//     !forecastWeather.dt_txt.includes(todayDate)) {
//     updateForecastItem(forecastWeather);
//     }
//     })
// }

// function updateForecastItem(weatherData) {
//     const {
//         dt_txt: date,
//         weather: [{ id, icon }],
//         main: { temp }
//     } = weatherData

//     const dateTaken = new Date(date) 
//     const dateOption = {
//         day: '2-digit',
//         month: 'short'
//     } 
//     const dateResult = dateTaken.toLocaleDateString('en-US', dateOption)

//     const forecastItem = `
//         <div class="forecast_item">
//             <h5 class="forecast_item_date">${dateResult}</h5>
//             <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
//             <h5 class="forecast_item_temp">${Math.round(temp)} °C</h5>
//         </div>
//     `
//     forecastItemContainer.insertAdjacentHTML('beforeend', forecastItem);
// }

// function showDisplaySection(section) {
//     [weatherInfoSection, searchSection, notFoundSection]
//     .forEach(section => section.style.display = 'none')

//     section.style.display = 'flex'
// }








const cityInput = document.querySelector('.city_input');
const searchBtn = document.querySelector('.search_btn');

const weatherInfoSection = document.querySelector('.weatherInfo_section');
const notFoundSection = document.querySelector('.search_error');
const searchSection = document.querySelector('.search_city');

const countryName = document.querySelector('.country_text');
const temperature = document.querySelector('.tempt_text');
const condition = document.querySelector('.condition');
const humidityValue = document.querySelector('.humidity_value');
const windSpeedValue = document.querySelector('.wind_speed');
const weatherImg = document.querySelector('.main_weather_ph');
const currentData = document.querySelector('.current_day');
const forecastItemContainer = document.querySelector('.third_sec_conteiner');
const mostViewedCityElement = document.querySelector('.most_viewed_city'); // New element to display most viewed city

const APIKey = '1731699e8320c2f46755d58311490467';

// 🔹 Load the last searched and most viewed city on page load
document.addEventListener('DOMContentLoaded', () => {
    const lastCity = localStorage.getItem('lastCity');
    const mostViewedCity = getMostViewedCity();

    if (lastCity) {
        updateWeatherInfo(lastCity);
    }
    
    if (mostViewedCity) {
        mostViewedCityElement.textContent = `Most Searched: ${mostViewedCity}`;
    }
});

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() !== '') {
        handleCitySearch(cityInput.value);
    }
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && cityInput.value.trim() !== '') {
        handleCitySearch(cityInput.value);
    }
});

function handleCitySearch(city) {
    updateWeatherInfo(city);
    updateCitySearchCount(city); // 🔹 Track city search count
    localStorage.setItem('lastCity', city);
    cityInput.value = '';
    cityInput.blur();

    // Update most viewed city display
    const mostViewedCity = getMostViewedCity();
    if (mostViewedCity) {
        mostViewedCityElement.textContent = `Most Searched: ${mostViewedCity}`;
    }
}

function getCurrentDate() {
    const currentDate = new Date();
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
    };
    return currentDate.toLocaleDateString('en-GB', options);
}

async function getFetchData(endpoint, city) {
    const APIUrl = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${APIKey}&units=metric`;
    
    try {
        const response = await fetch(APIUrl);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch data:', error.message);
        return null;
    }
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city);
    
    if (!weatherData || weatherData.cod !== 200) {
        showDisplaySection(notFoundSection);
        return;
    }

    console.log(weatherData);

    const {
        name: country,
        main: { temp, humidity },
        weather: [{ main, icon }],
        wind: { speed },
    } = weatherData;

    countryName.textContent = country;
    temperature.textContent = Math.round(temp) + ' °C';
    condition.textContent = main;
    humidityValue.textContent = humidity + ' %';
    windSpeedValue.textContent = speed + ' M/s';
    weatherImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    currentData.textContent = getCurrentDate();

    await updateForecastsInfo(city);
    showDisplaySection(weatherInfoSection);
}

async function updateForecastsInfo(city) {
    const forecastData = await getFetchData('forecast', city);
    if (!forecastData || !forecastData.list) {
        console.warn('No forecast data available.');
        return;
    }

    const timeTaken = '12:00:00';
    const todayDate = new Date().toISOString().split('T')[0];

    forecastItemContainer.innerHTML = ''; // Clear previous forecasts

    forecastData.list.forEach((forecastWeather) => {
        if (forecastWeather.dt_txt.includes(timeTaken) && !forecastWeather.dt_txt.includes(todayDate)) {
            updateForecastItem(forecastWeather);
        }
    });
}

function updateForecastItem(weatherData) {
    const {
        dt_txt: date,
        weather: [{ icon }],
        main: { temp },
    } = weatherData;

    const dateTaken = new Date(date);
    const dateOptions = {
        day: '2-digit',
        month: 'short',
    };
    const dateResult = dateTaken.toLocaleDateString('en-US', dateOptions);

    const forecastItem = `
        <div class="forecast_item">
            <h5 class="forecast_item_date">${dateResult}</h5>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
            <h5 class="forecast_item_temp">${Math.round(temp)} °C</h5>
        </div>
    `;

    forecastItemContainer.insertAdjacentHTML('beforeend', forecastItem);
}

function showDisplaySection(section) {
    [weatherInfoSection, searchSection, notFoundSection].forEach((s) => (s.style.display = 'none'));
    section.style.display = 'flex';
}

// 🔹 Function to track city search count
function updateCitySearchCount(city) {
    let citySearches = JSON.parse(localStorage.getItem('citySearches')) || {};

    if (citySearches[city]) {
        citySearches[city]++;
    } else {
        citySearches[city] = 1;
    }

    localStorage.setItem('citySearches', JSON.stringify(citySearches));
}

// 🔹 Function to get the most viewed city
function getMostViewedCity() {
    const citySearches = JSON.parse(localStorage.getItem('citySearches')) || {};
    let mostViewedCity = null;
    let maxCount = 0;

    for (const city in citySearches) {
        if (citySearches[city] > maxCount) {
            maxCount = citySearches[city];
            mostViewedCity = city;
        }
    }

    return mostViewedCity;
}
