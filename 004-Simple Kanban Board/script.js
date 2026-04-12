"use strict";
// :SELECT ELEMENTS: //
const allBoards = document.querySelectorAll(".board");
const boardCards = document.querySelectorAll(".board__card");
const kanbanContainer = document.querySelector(".container");

// functions

const dragStart = function (e) {
  const selectedCard = e.target.closest(".board__card");
  if (!selectedCard) return;
  e.dataTransfer.setData("text/plain", selectedCard.id);
};

const dragEnd = function (e) {
  console.log(`Drag ended`);
};

const dragOver = function (e) {
  e.preventDefault();
};

const dragEnter = function (e) {
  e.preventDefault();
  const board = e.target.closest(".board");
  if (!board) return;
  board.classList.add("over");
};

const dragLeave = function (e) {
  const board = e.target.closest(".board");
  if (!board) return;
  board.classList.remove("over");
};

const dragDrop = function (e) {
  e.preventDefault();

  const id = e.dataTransfer.getData("text/plain");
  const card = document.getElementById(id);

  const board = e.target.closest(".board");
  if (!board) return;
  board.appendChild(card);
  board.classList.remove("over");
};

// Trying to use event delegation
kanbanContainer.addEventListener("dragstart", dragStart);
kanbanContainer.addEventListener("dragend", dragEnd);
kanbanContainer.addEventListener("dragover", dragOver);
kanbanContainer.addEventListener("dragenter", dragEnter);
kanbanContainer.addEventListener("dragleave", dragLeave);
kanbanContainer.addEventListener("drop", dragDrop);
