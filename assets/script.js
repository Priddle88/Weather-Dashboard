

var btn = document.querySelector("#btn");
var cityH = document.querySelector(".city");
var lat;
var lon;
var todayDate = moment().format("l");

function submitIt(event) {
    event.preventDefault();
    var city = document.querySelector("#userInput").value;
    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=28593a11400157b5c35ed2400db6eb16`;
    
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
        console.log(data.current.temp);
    })
}

btn.addEventListener("click", submitIt);