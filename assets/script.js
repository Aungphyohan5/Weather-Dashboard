var searchBtn = document.getElementById('search-btn') //html line 26
var userInput = document.getElementById('search-box') //html line 24
var currentWeather = document.getElementById('current-weather') //html line 29
var cityName = document.getElementById('cityName')
var currentTemp = document.getElementById('current-Temp')
var currentWind = document.getElementById('current-Wind')
var currentHumid = document.getElementById('humid')



var today = dayjs().format('(M / D / YYYY)')
console.log(today)



function getApi() {
    var weatherAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=' + userInput.value + '&units=imperial&appid=30b8051a7b8c924e7c54f8a686fd9df9';

    fetch(weatherAPI)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data)





            for (var i = 0; i < 5; i++) {







                cityName.innerHTML = userInput.value + today
                var icondata = data.list[0].weather[0].icon
                document.getElementById('weather-icon').src = "http://openweathermap.org/img/w/" + icondata + '.png'
                currentTemp.innerHTML = 'Temp: ' + (data.list[0].main.temp).toFixed(2) + '°F'
                currentWind.innerHTML = 'Wind: ' + (data.list[0].wind.speed) + 'MPH'
                currentHumid.innerHTML = 'Humidity: ' + (data.list[0].main.humidity) + '°%'


                $('#day-1').text(dayjs.unix(data.list[7].dt).format('M / D / YYYY'));
                var dayIcon = data.list[7].weather[0].icon
                document.getElementById('day1-icon').src = "http://openweathermap.org/img/w/" + dayIcon + '.png'
                $('#day1-Temp').text('Temp: ' + (data.list[7].main.temp).toFixed(2) + '°F')
                currentWind.innerHTML = 'Wind: ' + (data.list[7].wind.speed) + 'MPH'
                currentHumid.innerHTML = 'Humidity: ' + (data.list[7].main.humidity) + '°%'
                console.log('#day-1')



            }


        }
        )
}

searchBtn.addEventListener('click', getApi)