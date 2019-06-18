const API_KEY = "2b461077b45a03601a15be3110b71617";
const COORDS = "coords";

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
    //getWeather
  }
}

function init() {
  loadCoords();
}

init();
