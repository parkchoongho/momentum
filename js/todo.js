const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODO_LS = "toDos";

let toDos = [];

function handleDelete(event) {
  const btn = event.target;
  const li = btn.parentElement;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  // console.log(cleanToDos);
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li"),
    delBtn = document.createElement("button"),
    span = document.createElement("span"),
    newId = toDos.length + 1,
    toDoObj = {
      text: text,
      id: newId
    };
  delBtn.addEventListener("click", handleDelete);
  toDos.push(toDoObj);
  delBtn.innerText = "❌";
  span.innerText = text;

  li.id = newId;
  li.appendChild(span);
  li.appendChild(delBtn);
  toDoList.appendChild(li);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODO_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      console.log(toDo.text);
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
