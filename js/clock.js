const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();
  clockTitle.innerText = `현재 시각: ${hours}시 ${minutes}분 ${seconds}초`;
}

function init() {
  getTime();
}

init();
