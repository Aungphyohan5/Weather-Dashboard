// var searchBtn = document.getElementById('search-btn') //html line 26
var userInput = document.getElementById('search-box') //html line 24
var currentWeather = document.getElementById('current-weather') //html line 29
var cityName = document.getElementById('cityName')
var currentTemp = document.getElementById('current-Temp')
var currentWind = document.getElementById('current-Wind')
var currentHumid = document.getElementById('humid')
var searchBtn = document.querySelectorAll(".search-btn")[0]
var search = document.getElementById('search-city')
var historyList = document.getElementById('historyList')


// today date
var today = dayjs().format('(M / D / YYYY)')
console.log(today)


var savedCity = []

// search history function ------//
function recentSearchBtn() {

    var liEl = $("<li>")
    var newBtn = $('<button>');
    //Adding Extra ID for Button to stop Creating Duplicate Button on Click
    newBtn.attr('id', 'extraBtn');
    newBtn.addClass("btn-secondary", "list-group-item");
    newBtn.text(userInput.value);
    liEl.append(newBtn)
    $("#historyList").prepend(liEl);

    $("#extraBtn").on("click", function () {
        userInput.value = $(this).text();
        getApi();
    });

}



// Retrieve the data from weather API-----//
function getApi() {
    var weatherAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=' + userInput.value + '&units=imperial&exclude=hourly&appid=30b8051a7b8c924e7c54f8a686fd9df9';

    // fetch the data-----//
    fetch(weatherAPI)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data)


            for (var i = 0; i < 5; i++) {

                // current weather data----//
                cityName.innerHTML = userInput.value + today
                var icondata = data.list[0].weather[0].icon
                document.getElementById('weather-icon').src = "http://openweathermap.org/img/w/" + icondata + '.png'
                currentTemp.innerHTML = 'Temp: ' + (data.list[0].main.temp).toFixed(2) + '°F'
                currentWind.innerHTML = 'Wind: ' + (data.list[0].wind.speed) + 'MPH'
                currentHumid.innerHTML = 'Humidity: ' + (data.list[0].main.humidity) + '°%'

                // five day weather forecast ====//

                // Day 1 weather forecast-----//
                $('#day-1').text(dayjs.unix(data.list[7].dt).format('M / D / YYYY'));
                var dayIcon = data.list[7].weather[0].icon
                document.getElementById('day1-icon').src = "http://openweathermap.org/img/w/" + dayIcon + '.png'
                $('#day1-Temp').text('Temp: ' + (data.list[8].main.temp).toFixed(2) + '°F')
                $('#day1-Wind').text('Wind: ' + (data.list[8].wind.speed) + 'MPH')
                $('#day1-humid').text('Humidity: ' + (data.list[8].main.humidity) + '°%')


                // Day 2 weather forecast-----//
                $('#day-2').text(dayjs.unix(data.list[15].dt).format('M / D / YYYY'));
                var daytwoIcon = data.list[15].weather[0].icon
                document.getElementById('day2-icon').src = "http://openweathermap.org/img/w/" + daytwoIcon + '.png'
                $('#day2-Temp').text('Temp: ' + (data.list[15].main.temp).toFixed(2) + '°F')
                $('#day2-Wind').text('Wind: ' + (data.list[15].wind.speed) + 'MPH')
                $('#day2-humid').text('Humidity: ' + (data.list[15].main.humidity) + '°%')

                // console.log(daytwoIcon)

                // Day 3 weather forecast-----//
                $('#day-3').text(dayjs.unix(data.list[23].dt).format('M / D / YYYY'));
                var daythreeIcon = data.list[23].weather[0].icon
                document.getElementById('day3-icon').src = "http://openweathermap.org/img/w/" + daythreeIcon + '.png'
                $('#day3-Temp').text('Temp: ' + (data.list[23].main.temp).toFixed(2) + '°F')
                $('#day3-Wind').text('Wind: ' + (data.list[23].wind.speed) + 'MPH')
                $('#day3-humid').text('Humidity: ' + (data.list[23].main.humidity) + '°%')

                // Day 4 weather forecast-----//
                $('#day-4').text(dayjs.unix(data.list[31].dt).format('M / D / YYYY'));
                var dayfourIcon = data.list[31].weather[0].icon
                document.getElementById('day4-icon').src = "http://openweathermap.org/img/w/" + dayfourIcon + '.png'
                $('#day4-Temp').text('Temp: ' + (data.list[31].main.temp).toFixed(2) + '°F')
                $('#day4-Wind').text('Wind: ' + (data.list[31].wind.speed) + 'MPH')
                $('#day4-humid').text('Humidity: ' + (data.list[31].main.humidity) + '°%')

                // Day 5 weather forecast-----//
                $('#day-5').text(dayjs.unix(data.list[39].dt).format('M / D / YYYY'));
                var dayfiveIcon = data.list[39].weather[0].icon
                document.getElementById('day5-icon').src = "http://openweathermap.org/img/w/" + dayfiveIcon + '.png'
                $('#day5-Temp').text('Temp: ' + (data.list[39].main.temp).toFixed(2) + '°F')
                $('#day5-Wind').text('Wind: ' + (data.list[39].wind.speed) + 'MPH')
                $('#day5-humid').text('Humidity: ' + (data.list[39].main.humidity) + '°%')
                // console.log(dayfiveIcon)


            }


        }
        )
}

// local storage function to store the data
function init() {

    localStorage.setItem('cities', JSON.stringify(savedCity));
    console.log(savedCity)

    var storedSearch = JSON.parse(localStorage.getItem('cities'));
    console.log(storedSearch)
}



//  clicl function to get the weather forecast ----//
searchBtn.addEventListener('click', function (event) {
    event.preventDefault();

    var city = userInput.value.trim();
    console.log(city)
    savedCity.push(city)

    recentSearchBtn()
    init()
    getApi()

})



// clear history function to clear the history
$("#clearHistory").on("click", function (event) {
    $("#historyList").empty();
});


window.addEventListener("load", function () {
    userInput.value = 'london'
    getApi()
})