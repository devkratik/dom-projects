"use strict";

const bookmarkName = document.getElementById("bookmark-name");
const bookmarkAdress = document.getElementById("bookmark-url");
const bookmarkBtn = document.getElementById("bookmark-add");
const bookmarkListContainer = document.getElementById("bookmark-list");
const bookmarkFormElement = document.getElementById("bookmark-form");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

const createBookmark = function (bookmark) {
  let bookmarkItem = document.createElement("li");
  bookmarkItem.dataset.id = bookmark.id;
  let bookmarkName = document.createElement("a");
  bookmarkName.innerHTML = `${bookmark.name} <i class="fa-solid fa-arrow-up-right-from-square"></i>`;
  bookmarkName.setAttribute("href", bookmark.url);
  let bookmarkRemove = document.createElement("button");
  bookmarkRemove.textContent = "Remove";
  bookmarkItem.classList.add("bookmark__item");
  bookmarkName.classList.add("bookmark__item-link");
  bookmarkRemove.classList.add("bookmark__item-remove");
  bookmarkItem.append(bookmarkName, bookmarkRemove);
  return bookmarkItem;
};

const updateBookmarkList = function () {
  bookmarkListContainer.innerHTML = "";
  const sortedBookmarks = [...bookmarks].reverse();

  sortedBookmarks.forEach((bookmark) => {
    const bookmarkEl = createBookmark(bookmark);
    bookmarkListContainer.appendChild(bookmarkEl);
  });
};

const addBookmark = function (e) {
  e.preventDefault();
  const name = bookmarkName.value.trim();
  const url = bookmarkAdress.value.trim();
  if (!name) return;
  if (!url) return;

  bookmarks.push({
    id: Date.now(),
    name,
    url,
  });

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  updateBookmarkList();
  bookmarkFormElement.reset();
};

bookmarkListContainer.addEventListener("click", function (e) {
  if (!e.target.classList.contains("bookmark__item-remove")) return;
  const item = e.target.closest(".bookmark__item");

  const id = Number(item.dataset.id);

  removeBookmark(id);
});

const removeBookmark = function (id) {
  bookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  updateBookmarkList();
};

bookmarkFormElement.addEventListener("submit", addBookmark);
updateBookmarkList();
