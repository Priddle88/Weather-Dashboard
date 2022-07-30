

var btn = document.querySelector("#btn");
var lat;
var lon;

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
    });
}

btn.addEventListener("click", submitIt);