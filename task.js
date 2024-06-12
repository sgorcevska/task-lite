let taskId = 0;

const themeImage = document.getElementById("image-day-mode");
const logo = document.getElementById("logo")
const container = document.getElementById("taskList");
const taskNameInput = document.getElementById("taskName");
const taskDescriptionInput = document.getElementById("taskDescription");
const errorMessage = document.getElementById("error-message");
const addButton = document.getElementById("add");
const taskHeading = document.createElement("h3");
const taskText = document.createElement("p");

let currentImage = 1;

function toggleDarkMode() {
  if (currentImage === 1) {
    themeImage.src = "night-removebg-preview.png"; 
    logo.src = "v.png"
    currentImage = 2; 
  } else {
    themeImage.src = "day-removebg-preview.png";
    logo.src = "logo-black.png";
    currentImage = 1; 
  }

  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");

  taskDescriptionInput.classList.toggle("dark-mode-inputs");
  taskDescriptionInput.classList.toggle("light-mode-input");

  taskNameInput.classList.toggle("light-mode-input");
  taskNameInput.classList.toggle("dark-mode-inputs");
  

  taskHeading.classList.toggle("task-heading-light")
  taskHeading.classList.toggle("task-heading-dark")

  taskText.classList.toggle("task-text");
  taskText.classList.toggle("task-text-dark");

  addButton.classList.toggle("light-add-task-button");
  addButton.classList.toggle("dark-add-task-button");
}

function addTask() {
  let taskName = taskNameInput.value.trim();
  let taskDescription = taskDescriptionInput.value.trim();

  if (taskName === "" || taskDescription === "") {
    errorMessage.style.display = "block";
    return;
  } else {
    errorMessage.style.display = "none";
  }

  let tasks = getTasksFromLocalStorage();
  taskId++;

  tasks.push({
    id: taskId.toString(),
    name: taskName,
    description: taskDescription,
  });

  saveTasksToLocalStorage(tasks);
  savedTasks();

  taskNameInput.value = "";
  taskDescriptionInput.value = "";
}

window.onload = function () {
  savedTasks();
  errorMessage.style.display = "block";
};

function savedTasks() {
  container.innerHTML = "";
  let tasks = getTasksFromLocalStorage();
  tasks.forEach((task, index) => {
    displayTask(index + 1, task.name, task.description, task.id);
  });
}

function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.tasks || "[]");
}

function saveTasksToLocalStorage(tasks) {
  localStorage.tasks = JSON.stringify(tasks);
}

function displayTask(number, name, description, id) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";
  taskDiv.id = `task-${id}`;

  taskHeading.className = "task-heading-light";
  taskHeading.textContent = `Task ${number}: ${name}`;

  taskText.className = "task-text";
  taskText.textContent = description;

  const buttons = document.createElement("div");
  buttons.className = "buttons";

  const editContainer = document.createElement("div");
  editContainer.className = "buttonsIndividual";

  const editButton = document.createElement("img");
  const editExplain = document.createElement("span");

  editButton.src = "icons8-edit-48.png";
  editButton.alt = "Edit";
  editButton.className = "svg-icons";
  editExplain.innerText = "Edit";
  editButton.onclick = () => editTask(id);

  editContainer.appendChild(editButton);
  editContainer.appendChild(editExplain);

  const deleteContainer = document.createElement("div");
  deleteContainer.className = "buttonsIndividual";

  const deleteButton = document.createElement("img");
  const deleteExplain = document.createElement("span");

  deleteButton.src = "icons8-delete-48.png";
  deleteButton.alt = "Delete";
  deleteButton.className = "svg-icons";
  deleteExplain.innerText = "Delete";
  deleteButton.onclick = () => deleteTask(id);

  deleteContainer.appendChild(deleteButton);
  deleteContainer.appendChild(deleteExplain);

  buttons.appendChild(editContainer);
  buttons.appendChild(deleteContainer);

  taskDiv.appendChild(taskHeading);
  taskDiv.appendChild(taskText);
  taskDiv.appendChild(buttons);

  container.appendChild(taskDiv);
}

function editTask(id) {
  let tasks = getTasksFromLocalStorage();
  let task = tasks.find((t) => t.id === id.toString());

  if (task) {
    let newTaskName = prompt("Enter the new task name:", task.name);
    let newTaskDescription = prompt(
      "Enter the new task description:",
      task.description
    );

    if (newTaskName !== null && newTaskDescription !== null) {
      task.name = newTaskName;
      task.description = newTaskDescription;
      saveTasksToLocalStorage(tasks);
      savedTasks();
    }
  }
}

function deleteTask(id) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter((t) => t.id !== id.toString());
  saveTasksToLocalStorage(tasks);

  if (tasks.length === 0) {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
  }

  let maxId = 0;
  for (let task of tasks) {
    if (parseInt(task.id) > maxId) {
      maxId = parseInt(task.id);
    }
  }
  taskId = maxId;
  savedTasks();
}
