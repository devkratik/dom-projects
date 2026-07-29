"use strict";
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const errorEl = document.getElementById("search-error");
const errorContent = document.querySelector(".error__content");
const searchHeadingEl = document.querySelector(".search-heading");
const searchHeadingContent = document.querySelector(".search-heading__content");
const formEl = document.querySelector(".header__form");
const mealsContainer = document.querySelector(".container__meals");

searchBtn.addEventListener("click", handleSearchClick);

const BASE_URL = `https://www.themealdb.com/api/json/v1/1/`;
const SEARCH_URL = `${BASE_URL}search.php?s=`;
const LOOKUP_URL = `${BASE_URL}lookup.php?i=`;

function displayMeals(data) {
  mealsContainer.innerHTML = "";
  const { meals } = data;

  console.log(meals);

  meals.forEach((meal) => {
    mealsContainer.innerHTML += `      
     <div class="meal-item">
      <figure class="meal-item__img">
        <img src="${meal.strMealThumb}" alt="" class="meal-item__img-content" />
      </figure>
      <div class="meal-item__info">
      <p class="meal-item__info-name">${meal.strMeal}</p>
      <p class="meal-item__info-category">${meal.strCategory}</p>
      </div>
    </div>
      
    `;
  });
}

async function handleSearchClick(e) {
  e.preventDefault();

  const searchTerm = searchInput.value.trim();
  if (!searchTerm) {
    showError(`Please enter search term or keyword.`);
    return;
  }

  hideError();

  searchHeadingEl.classList.remove("hidden");
  searchHeadingContent.textContent = `Searching results for "${searchTerm}" ...`;

  const response = await fetch(`${SEARCH_URL}${searchTerm}`);
  const data = await response.json();

  console.log(data);

  if (!data.meals) {
    showError(
      `No results for ${searchTerm}. Please enter any other term or keyword.`,
    );
    searchHeadingEl.classList.add("hidden");
    formEl.reset();
    return;
  }

  searchHeadingContent.textContent = `Search results for "${searchTerm}" :`;
  displayMeals(data);

  formEl.reset();
}

function showError(msg) {
  errorContent.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> ${msg}`;
  errorEl.classList.remove("hidden");
}

function hideError() {
  errorContent.innerHTML = "";
  errorEl.classList.add("hidden");
}
