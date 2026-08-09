"use strict";
const launchDate = new Date(2026, 7, 12, 12, 0); // 1 Jan 2027 at 12:00 pm
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const emailFormEl = document.getElementById("email-form");
const successMessageEl = document.getElementById("success-message");

function updateCountdown() {
  const now = new Date();
  const diff = launchDate - now;

  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

//initialize the call:
updateCountdown();

//update it every second:
setInterval(updateCountdown, 1000);

emailFormEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const button = emailFormEl.querySelector("button");
  button.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;
  button.disabled = true;

  //simulate an api call:
  setTimeout(() => {
    emailFormEl.classList.add("hidden");
    successMessageEl.classList.remove("hidden");
  }, 2000);
});
