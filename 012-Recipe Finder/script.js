"use strict";
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const errorEl = document.getElementById("search-error");
const errorContent = document.querySelector(".error__content");
const searchHeadingEl = document.querySelector(".search-heading");
const searchHeadingContent = document.querySelector(".search-heading__content");
const formEl = document.querySelector(".header__form");
const mealsContainer = document.querySelector(".container__meals");
const mealDetailsContainer = document.querySelector(".container__meal-details");
const backBtn = document.querySelector(".back-btn");
const mealDetailsContent = document.querySelector(".meal-details");

searchBtn.addEventListener("click", handleSearchClick);

const BASE_URL = `https://www.themealdb.com/api/json/v1/1/`;
const SEARCH_URL = `${BASE_URL}search.php?s=`;
const LOOKUP_URL = `${BASE_URL}lookup.php?i=`;

mealsContainer.addEventListener("click", showMealDetails);
backBtn.addEventListener("click", () => {
  mealDetailsContainer.classList.add("hidden");
});

async function showMealDetails(e) {
  mealDetailsContainer.classList.remove("hidden");
  const item = e.target.closest(".meal-item");

  if (!item) {
    return;
  }

  const id = item.dataset.mealid;

  const response = await fetch(`${LOOKUP_URL}${id}`);
  const data = await response.json();

  const { meals: mealDetail } = data;

  console.log("meal details:", mealDetail);

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (
      mealDetail[0][`strIngredient${i}`] &&
      mealDetail[0][`strIngredient${i}`] !== ""
    ) {
      ingredients.push({
        ingredient: mealDetail[0][`strIngredient${i}`],
        measure: mealDetail[0][`strMeasure${i}`],
      });
    }
  }

  console.log(`array of ingredients`, ingredients);

  mealDetailsContent.innerHTML = `
    <figure class="thumbnail">
      <img class="thumbnail__content" src="${mealDetail[0].strMealThumb}" alt="meal-thumbnail" />
    </figure>
    <div class="recipe">
      <p class="recipe__steps">${mealDetail[0].strInstructions}</p>
    </div>
    <ul class="ingredients">
    </ul>      
  `;

  const ingredeintsContainer = document.querySelector(".ingredients");
  ingredeintsContainer.innerHTML = "";

  ingredeintsContainer.innerHTML += `
  ${ingredients.map((item) => {
    return `<li class="ingredients__item">
      <i class="fa-solid fa-circle-check"></i>
      ${item.ingredient} : ${item.measure}
    </li>`;
  })}
  `;

  mealDetailsContainer.scrollIntoView({ behavior: "smooth" });
}

function displayMeals(data) {
  mealsContainer.innerHTML = "";

  const { meals } = data;

  console.log(meals);

  meals.forEach((meal) => {
    mealsContainer.innerHTML += `      
     <div class="meal-item" data-mealid="${meal.idMeal}">
      <figure class="meal-item__img">
        <img src="${meal.strMealThumb}" alt="meal-thumbnail" class="meal-item__img-content" />
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
  mealsContainer.innerHTML = "";
  mealDetailsContainer.classList.add("hidden");

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
