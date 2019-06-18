const weatherContainer = document.querySelector(".js-weather");

const API_KEY = "2b461077b45a03601a15be3110b71617",
  COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      //then이 뜻하는 것은 이 API로 부터 데이터가 다 넘어오면 then이후를 실행하겠다는 뜻이다
      // 이 API로부터 json 데이터를 받아온다.
      //console.log(response.json());
      // reponse를 console에 찍어 보면 network 정보만 보인다.
      // 이렇게 찍어보면 실질적으로 필요한 데이터는 pending되고 있는 것으로 나온다. 따라서 다음 코드에 then을 한번 더 찍어준다.
      return response.json();
    })
    .then(function(json) {
      console.log(json);

      const location = json.name;
      const temp = Math.floor(json.main.temp);

      weatherContainer.innerText = `${location}동, ${temp}도 `;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  //console.log(position);
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const coordsObj = {
    lat,
    lon
  };
  saveCoords(coordsObj);
  getWeather(lat, lon);
}

function handleGeoError() {
  console.log("Where Are You?");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    // console.log(typeof parsedCoords.lat);
    getWeather(parsedCoords.lat, parsedCoords.lon);
  }
}

function init() {
  loadCoords();
}

init();
