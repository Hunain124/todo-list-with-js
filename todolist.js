const form = document.querySelector("#taskForm");
let inputField = form.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");


form.addEventListener("submit", (e) => {
  e.preventDefault();

  let toDo = localStorage.getItem("toDO");
  let inputValue = inputField.value;

  localStorage.setItem('toDo', inputValue);
  getData();
  
  console.log(inputValue);
})

function getData() {
  let li = document.createElement('li');
  li.innerHTML = `<span>asdasd </span><span><button>Delete</button><button>update</button></span>`
  taskList.appendChild(li)
}



console.log(inputField)