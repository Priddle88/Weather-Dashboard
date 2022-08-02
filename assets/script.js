
var oneDay = document.querySelector(".oneDay");
var btn = document.querySelector("#btn");
var cityH = document.querySelector(".city");
var tempToday = document.querySelector(".temp");
var windSpeed = document.querySelector(".windSpeed");
var humidity = document.querySelector(".humidity");
var uvIndex = document.querySelector(".uvIndex");
var bigImage = document.createElement("img");
var myId = "28593a11400157b5c35ed2400db6eb16";

var lat;
var lon;
var todayDate = moment().format("l");

function submitIt(event) {
    event.preventDefault();
    var city = document.querySelector("#userInput").value;
    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${myId}`;
    
    fetch(requestUrl)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        console.log(data[0].lat);
        lat = data[0].lat;
        lon = data[0].lon;
        todaysWeather(lat, lon);
        degrees(lat ,lon)
    });

}

function todaysWeather(x, y) {
    console.log(x);
    var requestAgain = `https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&appid=28593a11400157b5c35ed2400db6eb16`;
    fetch(requestAgain)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        var cityName = data.name;
        console.log(cityName);
        console.log(todayDate);
        console.log(`${cityName} (${todayDate})`);
        cityH.textContent = (`${cityName} (${todayDate})`);
        console.log(data.main.temp);
    });
}

function degrees(x, y) {
    var requestAgain1 = `http://api.openweathermap.org/data/2.5/onecall?lat=${x}&lon=${y}&units=imperial&appid=28593a11400157b5c35ed2400db6eb16`;
    fetch(requestAgain1)
    .then(function(response) {
        return response.json()
    }) .then(function(data) {
        console.log(data);
        console.log(data.current.temp);

        var currentTemp = data.current.temp;
        var wind = data.current.wind_speed;
        var humid = data.current.humidity;
        var uvI = data.current.uvi;
        var iconPic = data.current.weather[0].icon;
        console.log(iconPic);

        tempToday.textContent = (`Temp: ${currentTemp} ℉`);
        windSpeed.textContent = (`Wind: ${wind} MPH`);
        humidity.textContent = (`Humidity: ${humid} %`);
        uvIndex.textContent = (`UV Index: ${uvI}`);
        oneDay.style.background = (`http://openweathermap.org/img/wn/${iconPic}@2x.png`);
        bigImage.src = (`http://openweathermap.org/img/wn/${iconPic}@2x.png`);
        bigImage.classList.add("image");
        uvIndex.appendChild(bigImage);
        
    })
}

function fiveDay(x, y) {
    var requestAgain2 = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`;
    fetch(requestAgain2)
    .then(function(response) {
        return response.json()
    }) .then(function(data) {

    })
}

btn.addEventListener("click", submitIt);