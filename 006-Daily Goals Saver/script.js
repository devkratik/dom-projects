"use strict";
const formElement = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskDescription = document.getElementById("task-description");
const taskContainer = document.getElementById("tasks-container");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

updateUI(tasks);

formElement.addEventListener("submit", addTask);

function addTask(e) {
  //preventing default reload on submit:
  e.preventDefault();

  //taking values:
  const task = taskInput.value;
  const description = taskDescription.value;

  if (!task) return;
  if (!description) return;

  const taskObject = {
    id: Date.now(),
    taskName: task,
    taskSummary: description,
  };

  //update tasks:
  tasks.push(taskObject);

  //localStorage update
  localStorage.setItem("tasks", JSON.stringify(tasks));

  //update UI
  updateUI(tasks);

  //reset form:
  formElement.reset();
}

function updateUI(currentTask) {
  taskContainer.innerHTML = "";
  currentTask.forEach((task) => {
    let taskEl = document.createElement("li");
    taskEl.classList.add("task-item");
    taskEl.innerHTML = `
    <div class="task-info">
      <div class="task-name">${task.taskName}</div>
      <div class="task-summary">${task.taskSummary}</div>
    </div>
    <div class="delete-btn" onClick = removeTask(${task.id})><i class="fa fa-close"></i></div>  
  `;
    taskContainer.appendChild(taskEl);
  });
}

function removeTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  updateUI(tasks);
}
