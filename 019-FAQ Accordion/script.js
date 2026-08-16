"use strict";

const faqItemContainerEl = document.querySelector(".faq-list");

faqItemContainerEl.addEventListener("click", handleActiveQuestion);

function handleActiveQuestion(e) {
  const clickedItem = e.target.closest(".faq-item");

  if (!clickedItem) return;

  const wasActive = clickedItem.classList.contains("active");

  const allQuestions = document.querySelectorAll(".faq-item");

  allQuestions.forEach((question) => {
    question.classList.remove("active");
  });

  // Only open it if it wasn't already open
  if (!wasActive) {
    clickedItem.classList.add("active");
  }
}
