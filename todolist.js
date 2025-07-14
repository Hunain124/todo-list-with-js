const form = document.querySelector("#taskForm");
const inputField = form.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");

document.addEventListener("DOMContentLoaded", getData);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = inputField.value.trim();
  if (!inputValue) return;

  let tasks = JSON.parse(localStorage.getItem("toDo")) || [];

  tasks.push(inputValue);
  localStorage.setItem("toDo", JSON.stringify(tasks));

  inputField.value = "";
  getData();
});

function getData() {
  taskList.innerHTML = ""; 
  const tasks = JSON.parse(localStorage.getItem("toDo")) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${task}</span>
      <span>
        <button class="delete" data-index="${index}">Delete</button>
      </span>
    `;

    taskList.appendChild(li);
  });

  document.querySelectorAll(".delete").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.target.getAttribute("data-index")); // FIXED line
      deleteTask(index);
    });
  });
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("toDo")) || [];
  tasks.splice(index, 1); 
  localStorage.setItem("toDo", JSON.stringify(tasks));
  getData(); 
}
