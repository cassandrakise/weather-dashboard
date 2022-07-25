var userCityEl = document.querySelector('#user-city');
var cityButtonsEl = document.querySelector('#city-buttons');
var cityEl = document.querySelector('#city');
var searchContainerEl = document.querySelector('#searchCity-container');
var citySearchTerm = document.querySelector('#city-term');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityEl.value.trim();

  if (cityName) {
    getUserRepos(cityName);

    searchContainerEl.textContent = '';
    cityEl.value = '';
  } else {
    alert('Please enter a city name');
  }
};

var buttonClickHandler = function (event) {
  var place = event.target.getAttribute('data-city');

  if (place) {
    getFeaturedRepos(place);

    searchContainerEl.textContent = '';
  }
};

var getWeatherInfo = function (city) {
  var apiUrl = 'https://api.github.com/users/' + city + '/repos';

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data, city);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to find Weather data');
    });
};

var getFeaturedWeather = function (place) {
  var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit={limit}&appid={API key}';

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayWeather(data.items, place);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

var displayWeather = function (weather, searchTerm) {
  if (weather.length === 0) {
    searchContainerEl.textContent = 'No cities found.';
    return;
  }

  citySearchTerm.textContent = searchTerm;

  for (var i = 0; i < weather.length; i++) {
    var weatherInfo = weather[i].owner.login + '/' + weather[i].name; // needs to be switched for city search

    var weatherEl = document.createElement('div');
    weatherEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span');
    titleEl.textContent = weatherInfo;

    weatherEl.appendChild(titleEl);

    var resultEl = document.createElement('span');
    resultEl.classList = 'flex-row align-center';

    if (weather[i].open_issues_count > 0) {
      resultEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + weather[i].open_issues_count + ' issue(s)';
    } else {
      resultEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    weatherEl.appendChild(resultEl);

    searchContainerEl.appendChild(weatherEl);
  }
};

userCityEl.addEventListener('submit', formSubmitHandler);
cityButtonsEl.addEventListener('click', buttonClickHandler);
