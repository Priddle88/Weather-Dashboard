
var oneDay = document.querySelector(".oneDay");
var btn = document.querySelector("#btn");
var cityH = document.querySelector(".city");
var tempToday = document.querySelector(".temp");
var windSpeed = document.querySelector(".windSpeed");
var humidity = document.querySelector(".humidity");
var uvIndex = document.querySelector(".uvIndex");
var content = document.querySelectorAll(".content");
var sbox2All = document.querySelectorAll(".sbox2");

var bigImage = document.createElement("img");
var myId = "28593a11400157b5c35ed2400db6eb16";

var lat;
var lon;
var todayDate = moment().format("l");



function hideBorders() {
    
    for (let i = 0; i < content.length; i++) {
        content[i].style.display = "none";
        
    }
}

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
        degrees(lat ,lon);
    });

    inputStorage(city);

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
        fiveDay(data);
        
    })
}

function fiveDay(data) {
    var ct = document.querySelectorAll(".ct");
    var date1 = document.querySelector(".date1");
    var date2 = document.querySelector(".date2");
    var date3 = document.querySelector(".date3");
    var date4 = document.querySelector(".date4");
    var date5 = document.querySelector(".date5");

    for (let i = 0; i < content.length; i++) {
        content[i].style.display = "flex";
    }

    console.log("My name is Parker");
    console.log(data.daily[0].temp.day);
    
    console.log(ct.children);
    day = moment().dayOfYear();
    day1 = moment().dayOfYear(day+1);
    console.log(day1);
    day2 = moment().dayOfYear(day+2);
    console.log(day2);
    day3 = moment().dayOfYear(day+3);
    console.log(day3);
    day4 = moment().dayOfYear(day+4);
    console.log(day4);
    day5 = moment().dayOfYear(day+5);
    console.log(day5);

    day1 = day1.format("l");
    console.log(day1);
    day2 = day2.format("l");
    console.log(day2);
    day3 = day3.format("l");
    console.log(day3);
    day4 = day4.format("l");
    console.log(day4);
    day5 = day5.format("l");
    console.log(day5);

    date1.textContent = day1;
    date2.textContent = day2;
    date3.textContent = day3;
    date4.textContent = day4;
    date5.textContent = day5;

   
    pushTemps(data);
}

function pushTemps(data) {
    var iconCt = document.querySelectorAll(".iconCt");
    var tempCt = document.querySelectorAll(".tempCt");
    var windCt = document.querySelectorAll(".windCt");
    var humCt = document.querySelectorAll(".humCt")

    console.log("push Temps function");
    console.log(tempCt);
    
    for(i = 0; i < tempCt.length; i++) {
        var littleIcons = data.daily[i].weather[0].icon;

        iconCt[i].src = (`http://openweathermap.org/img/wn/${littleIcons}@2x.png`);
        tempCt[i].textContent = `Temp: ${data.daily[i].temp.day}`;
        windCt[i].textContent = `Wind: ${data.daily[i].wind_speed} MPH`;
        humCt[i].textContent = `Humidity: ${data.daily[i].wind_speed} %`;

    }
}

function inputStorage(city) {
    localStorage.setItem("City", city);
    displayStorage();
}

function displayStorage() {
    var sbox2 = document.querySelector(".sbox2");
    // var sbox2All = document.querySelectorAll(".sbox2");
    var cityList = document.createElement("button");

    cityList.textContent = localStorage.getItem("City");
    cityList.value = localStorage.getItem("City");
    console.log(`city: ${cityList}`);
    sbox2.append(cityList); 
    addListener();
}

function addListener() {
    
    for (let i = 0; i < sbox2All.length; i++) {
        // console.log(sbox2All[i].children[0]);
        // console.log("Hello");
        // console.log(sbox2All[i].children[i].value);
        sbox2All[i].children[i].addEventListener("click", displayPrev)
    }
}

function displayPrev(event) {
    event.preventDefault();
    console.clear();

    var pastCity = [];

    for (let i = 0; i < sbox2All.length; i++) {
        console.log(sbox2All[i].children[0]);
        console.log("Hello");
        console.log(sbox2All[i].children[i].value);
        pastCity.push(sbox2All[i].children[i].value);
        console.log(pastCity);
        console.log("LOOK HERE!");
    }

    console.log("Hello World");

    var requestUrl2 = `http://api.openweathermap.org/geo/1.0/direct?q=${pastCity}&limit=1&appid=${myId}`;
    
    fetch(requestUrl2)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        console.log(data[0].lat);
        lat = data[0].lat;
        lon = data[0].lon;
        todaysWeather(lat, lon);
        degrees(lat ,lon);
    });
}

hideBorders();

btn.addEventListener("click", submitIt);