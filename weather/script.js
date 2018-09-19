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
    weatherInfo.add("Kiev", "http://api.openweathermap.org/data/2.5/weather?appid=1cbb9d3c2d3d13f34be51c51afe4b6cb&q=Kiev,ua");
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
            + "&deg;</h2><div class='description'><img src='http://openweathermap.org/img/w/" + info.weather[0].icon +".png' class='icon'></img><p>" + description 
            + "</p></div><button type='button' class='close-button' onclick=deleteCity('" + city + "')></button></article>";
        }
    }
}

function addCity(){
    var formHolder = document.getElementById("form-popup");
    formHolder.style.visibility = "visible";
}

function deleteCity(city){
    weatherInfo.delete(String(city));
    updateForm();
}

function submitCity(){
    var formHolder = document.getElementById("form-popup");
    formHolder.style.visibility = "hidden";
    var cityInputField = document.getElementById("city-name");
    var cityInput = cityInputField.value;
    cityInputField.value = "";
    validateCity(cityInput);
}

function closeForm(){
    var formHolder = document.getElementById("form-popup");
    formHolder.style.visibility = "hidden";
    var cityInputField = document.getElementById("city-name");
    cityInputField.value = "";
}

function validateCity(cityInput){
    for(var city of weatherInfo.get().keys()){
        if(cityInput == city){
            alert("City " + cityInput + " is already in the list.");
            return;
        }
    }
    var urlTemplate = "http://api.openweathermap.org/data/2.5/weather?appid=1cbb9d3c2d3d13f34be51c51afe4b6cb&q=";
    var url = urlTemplate + cityInput;
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    if(request.status != 200){
        alert("Unable to add " + cityInput + " to the list.");
    } else{
        alert("Added " + cityInput + " to the list.")
    }
    weatherInfo.add(cityInput, url);
    updateForm();
}

fillDefaultCities();
updateForm();
setInterval(updateForm, 5 * 60 * 1000);
