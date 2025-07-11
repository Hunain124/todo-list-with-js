let form = document.getElementById("taskForm");
    let input = document.getElementById("taskInput");
    let list = document.getElementById("taskList");

    window.onload = function () {
      let saved = localStorage.getItem("tasks");
      if (saved) {
        let tasks = saved.split(","); 
        tasks.forEach(task => {
          if (task) addTaskToUI(task);
        });
      }
    };

    form.onsubmit = function (e) {
      e.preventDefault();
      let taskText = input.value.trim();

      if (taskText !== "") {
        addTaskToUI(taskText);
        saveToLocalStorage(taskText);
        input.value = "";
      }
    };

    function addTaskToUI(task) {
      let li = document.createElement("li");
      li.textContent = task + " ";

      let delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.onclick = function () {
        li.remove(); 
        deleteFromLocalStorage(task); 
      };

      li.appendChild(delBtn);
      list.appendChild(li);
    }

    function saveToLocalStorage(task) {
      let existing = localStorage.getItem("tasks");
      let updated = existing ? existing + "," + task : task;
      localStorage.setItem("tasks", updated);
    }

    function deleteFromLocalStorage(taskToDelete) {
      let allTasks = localStorage.getItem("tasks");
      if (allTasks) {
        let arr = allTasks.split(",");
        let updatedTasks = arr.filter(t => t !== taskToDelete);
        localStorage.setItem("tasks", updatedTasks.join(","));
      }
    }