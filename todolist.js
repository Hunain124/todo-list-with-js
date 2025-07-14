const form = document.querySelector("#taskForm");
const inputField = form.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");

let editIndex = null;

document.addEventListener("DOMContentLoaded", getData);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = inputField.value.trim();
  if (!inputValue) return;

  let tasks = getTasksFromLocalStorage();

  if (editIndex !== null) {
    tasks[editIndex] = inputValue;
    editIndex = null;
  } else {
    tasks.push(inputValue);
  }

  localStorage.setItem("toDo", JSON.stringify(tasks));
  inputField.value = "";
  form.querySelector("button").textContent = "Add Task"; // Reset button text
  getData();
});

function getTasksFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem("toDo")) || [];
  } catch (e) {
    localStorage.removeItem("toDo");
    return [];
  }
}

function getData() {
  taskList.innerHTML = "";
  const tasks = getTasksFromLocalStorage();

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${task}</span>
      <span>
        <button class="edit" data-index="${index}" style="margin-right: 8px;">Edit</button>
        <button class="delete" data-index="${index}">Delete</button>
      </span>
    `;

    taskList.appendChild(li);
  });

  document.querySelectorAll(".delete").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.target.getAttribute("data-index"));
      deleteTask(index);
    });
  });

  document.querySelectorAll(".edit").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      editIndex = parseInt(e.target.getAttribute("data-index"));
      const tasks = getTasksFromLocalStorage();
      inputField.value = tasks[editIndex];
      form.querySelector("button").textContent = "Update Task";
    });
  });
}

function deleteTask(index) {
  const tasks = getTasksFromLocalStorage();
  tasks.splice(index, 1);
  localStorage.setItem("toDo", JSON.stringify(tasks));
  getData();
}
