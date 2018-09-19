var weatherInfo = (function(){
    var cityUrlMap = new Map();
    var addCityUrl = function(city, url){
        cityUrlMap.set(city, url);
    };
    var deleteCityUrl = function(city){
        cityUrlMap.delete(city);
    };

    return{
        get: function(){
            return cityUrlMap;
        },
        add: function(city, url){
            addCityUrl(city, url);
        },
        delete: function(city){
            deleteCityUrl(city);
        }
    };
})();

function fillDefaultCities(){
    weatherInfo.add("Lviv", "http://api.openweathermap.org/data/2.5/weather?appid=1cbb9d3c2d3d13f34be51c51afe4b6cb&q=Lviv,ua");
    weatherInfo.add("Kyiv", "http://api.openweathermap.org/data/2.5/weather?appid=1cbb9d3c2d3d13f34be51c51afe4b6cb&q=Kiev,ua");
    weatherInfo.add("Odessa", "http://api.openweathermap.org/data/2.5/weather?appid=1cbb9d3c2d3d13f34be51c51afe4b6cb&q=Odessa,ua");
}

function updateForm(){
    var sectionForm = document.getElementById("weather-info");
    sectionForm.innerHTML = "";
    var infoMap = weatherInfo.get();
    for(var [key, value] of infoMap) {
        var city = key;
        var url = value;
        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.send();
        if(request.status != 200){
            alert(request.status + ": " + request.statusText);
        } else{
            var info = JSON.parse(request.responseText);
            var kelvinDifference = 273.15;
            var temperature = Math.round(info.main.temp - kelvinDifference);
            var description = info.weather[0].main + ", " + info.weather[0].description;
            sectionForm.innerHTML += "<article class='item zoomable'><header><h2>" + city + "</h2></header><h2 class='title'>" + temperature 
            + "&deg;</h2><div class='description'><img src='http://openweathermap.org/img/w/" + info.weather[0].icon +".png' class='icon'></img><p>" + description + "</p></div></article>";
        }
        // request.open('GET', url, true);
        // request.send();
        // request.onreadystatechange = function(){
        //     console.log("Request ready");
        //     if (request.readyState != 4) return;
        //     if (request.status != 200) {
        //         alert( request.status + ': ' + request.statusText );
        //     } else {
        //         var info = JSON.parse(request.responseText);
        //         var kelvinDifference = 273.15;
        //         var temperature = Math.round(info.main.temp - kelvinDifference);
        //         var description = info.weather[0].main + ", " + info.weather[0].description;
        //         sectionForm.innerHTML += "<article><header><h2>" + city + "</h2></header><h2>" + temperature + "</h2><p><span>Icon</span>" + description + "</p></article>";
        //     }
        // }
    }
}

function addCity(){
    var formHolder = document.getElementById("form-popup");
    formHolder.style.visibility = "visible";
}

function submitCity(){
    var formHolder = document.getElementById("form-popup");
    formHolder.style.visibility = "hidden";
    var inputField = document.getElementById("city-name");
    var userInput = inputField.value;
    inputField.value = "";
    validateCity(userInput);
}

function validateCity(userInput){
    for(var city of weatherInfo.get().keys()){
        if(userInput == city){
            alert("City " + userInput + " is already in the list.");
            return;
        }
    }
    var urlTemplate = "http://api.openweathermap.org/data/2.5/weather?appid=1cbb9d3c2d3d13f34be51c51afe4b6cb&q=";
    var url = urlTemplate + userInput;
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    if(request.status != 200){
        alert("Unable to add " + userInput + " to the list.");
    } else{
        alert("Added " + userInput + " to the list.")
    }
    weatherInfo.add(userInput, url);
    updateForm();
}

fillDefaultCities();
updateForm();
setInterval(updateForm, 5 * 60 * 1000);
