const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greeting");

const USER_LS = "currentuser",
  SHOWING = "showing";

function saveUser(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  userGreeting(currentValue);
  saveUser(currentValue);
}

function askForName() {
  form.classList.add(SHOWING);
  form.addEventListener("submit", handleSubmit);
}

function userGreeting(text) {
  form.classList.remove(SHOWING);
  greeting.classList.add(SHOWING);
  greeting.innerHTML = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser == null) {
    //currentUser가 존재 하지 않을시
    askForName();
  } else {
    // currentUser가 존재할시
    userGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
