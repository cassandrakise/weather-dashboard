var userCityEl = document.querySelector('#user-city');
var cityButtonsEl = document.querySelector('#city-buttons');
var cityEl = document.querySelector('#city');
var searchContainerEl = document.querySelector('#searchCity-container');
var citySearchTerm = document.querySelector('#city-term');
var cityName = ""

var citySubmit = function (event) {
  event.preventDefault();

    cityName = cityEl.value.trim();

  if (cityName) {
    getWeatherInfo(cityName);

    searchContainerEl.textContent = '';
    cityEl.value = '';
  } else {
    alert('Please enter a city name');
  }
};

var buttonClick = function (event) {
  var place = event.target.getAttribute('data-city');

  if (place) {
    getWeatherInfo (place);

    searchContainerEl.textContent = '';
  }
};

var getWeatherInfo = function (city) {
  var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=ff6a273910ec546d256f63f1ed5537a8'; 

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
            console.log(data)
            getFeaturedWeather (data[0].lat, data[0].lon) 
          //displayWeather(data, city);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to find Weather data');
    });
};

var getFeaturedWeather = function (lat, lon) {
  var apiUrl = 'http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly&appid=ff6a273910ec546d256f63f1ed5537a8'; // what is the API key in this situation? -> https://openweathermap.org/api/geocoding-api

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data)
       displayWeather(data);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

var displayWeather = function (weather) {
  console.log(weather.current);
  console.log(weather.daily);
  
// will then need to independently call all the variables from current and daily datasets

  // citySearchTerm.textContent = searchTerm;

  // for (var i = 0; i < weather.length; i++) {
  //   var weatherInfo = weather[i].owner.login + '/' + weather[i].name; // needs to be switched for city search

  //   var weatherEl = document.createElement('div');
  //   weatherEl.classList = 'list-item flex-row justify-space-between align-center';

  //   var titleEl = document.createElement('span');
  //   titleEl.textContent = weatherInfo;

  //   weatherEl.appendChild(titleEl);

  //   var resultEl = document.createElement('span');
  //   resultEl.classList = 'flex-row align-center';

  //   if (weather[i].open_issues_count > 0) {
  //     resultEl.innerHTML =
  //       "<i class='fas fa-times status-icon icon-danger'></i>" + weather[i].open_issues_count + ' issue(s)';
  //   } else {
  //     resultEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
  //   }

  //   weatherEl.appendChild(resultEl);

  //   searchContainerEl.appendChild(weatherEl);
  // }
};

userCityEl.addEventListener('submit', citySubmit);
cityButtonsEl.addEventListener('click', buttonClick);
