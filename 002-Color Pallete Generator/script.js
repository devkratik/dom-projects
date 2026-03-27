"use strict";
const copyBtns = document.querySelectorAll(".card__info-copy");
const generateButton = document.querySelector(".generate-button");
const colorCode = document.querySelectorAll(".card__info-code");
const allCards = document.querySelectorAll(".card");

generateButton.addEventListener("click", function () {
  allCards.forEach((card, index) => {
    const color = generateColor();
    card.style.backgroundColor = color;
    colorCode[index].textContent = color;
  });
});

function generateColor() {
  const char = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += char[Math.floor(Math.random() * 16)];
  }
  return color;
}

copyBtns.forEach((copyBtn) => {
  copyBtn.addEventListener("click", function () {
    const card = copyBtn.closest(".card");
    const text = card.querySelector(".card__info-code").textContent;

    navigator.clipboard.writeText(text);

    console.log("Copied:", text);
  });
});
