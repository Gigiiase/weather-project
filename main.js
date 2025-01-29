const cityInput = document.querySelector('.city_input');
const searchBtn = document.querySelector('.search_btn');

const weatherInfoSection = document.querySelector('.weatherInfo_section')
const notFoudSection = document.querySelector('.search_error');
const searchSection = document.querySelector('.search_city');

const countryName = document.querySelector('.country_text');
const temperature = document.querySelector('.tempt_text');
const condition = document.querySelector('.condition');
const humidityValue = document.querySelector('.humidity_value');
const windSpeedValue = document.querySelector('.wind_speed');
const wheatherImg = document.querySelector('.main_weather_ph');
const currentData = document.querySelector('.current_day');

const APIKey = '1731699e8320c2f46755d58311490467';

searchBtn.addEventListener('click', () => {
    if(cityInput.value.trim() != '') {
        cityInput.value = ''
        cityInput.blur()
    }
})
cityInput.addEventListener('keydown', (event) => {
    if(event.key == 'Enter' && 
        cityInput.value.trim() != ''
    ) {
        updateWeatherInfo(cityInput.value) 
        cityInput.value = ''
        cityInput.blur()
    }
})

async function getFetchData(endPoint, city) {
    const APIUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${APIKey}&units=metric`;
    const response = await fetch(APIUrl);
    return response.json();
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city);
    if(weatherData.cod != 200) {
        showDisplaySection(notFoudSection)
        return
    }
    console.log(weatherData)

    const {
        name: country,
        main: {temp, humidity},
        weather: [{ id, main, icon }],
        wind: {speed} } = weatherData;

        countryName.textContent = country;
        temperature.textContent = Math.round(temp) + ' °C';
        condition.textContent = main;
        humidityValue.textContent = humidity + ' %';
        windSpeedValue.textContent = speed + '  M/s';

    showDisplaySection(weatherInfoSection)
}
function showDisplaySection(section) {
    [weatherInfoSection, searchSection, notFoudSection]
    .forEach(section => section.style.display = 'none')

    section.style.display = 'flex'
}