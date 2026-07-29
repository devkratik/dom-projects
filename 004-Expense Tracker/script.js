"use strict";
const totalBalance = document.getElementById("total-balance");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const transactionDescription = document.getElementById("description");
const transactionAmount = document.getElementById("amount");
const recordContainer = document.getElementById("transaction-list");
const submitBtn = document.getElementById("submit");
const overlayContainer = document.getElementById("overlay");
const modalMessage = document.getElementById("modal-message");
const modalClose = document.getElementById("modal-close");
const transactionFormElement = document.getElementById("transaction-form");

// initially:
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// adding submit event to the transaction for element:
transactionFormElement.addEventListener("submit", addTransaction);

function addTransaction(e) {
  e.preventDefault();
  // get form values
  const description = transactionDescription.value.trim();
  const amount = parseFloat(transactionAmount.value);
  if (!description) return;
  if (!amount) return;
  //create transactions
  transactions.push({
    id: Date.now(),
    // description: description, shorthand below
    // amount:amount, shorthand below
    description,
    amount,
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));

  // update transaction list:
  updateTransactionList();
  updateSummary();

  //reset form
  transactionFormElement.reset();
}

function updateTransactionList() {
  recordContainer.innerHTML = "";

  const sortedTransactions = [...transactions].reverse();

  sortedTransactions.forEach((transaction) => {
    const transactionEl = createTransactionElement(transaction);
    recordContainer.appendChild(transactionEl);
  });
}

function createTransactionElement(transaction) {
  const li = document.createElement("li");
  li.classList.add("transaction");
  li.classList.add(transaction.amount > 0 ? "income" : "expense");

  li.innerHTML = `
     <span>${transaction.description}</span>
     <span>${formatCurrency(transaction.amount)}
      <button class="delete-btn" onClick = "removeTransaction(${transaction.id})"><i class="fa fa-close"></i></button>
     </span>
  `;
  return li;
}

function updateSummary() {
  const balance = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0,
  );
  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const expense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // update UI
  totalBalance.textContent = formatCurrency(balance);
  totalIncome.textContent = formatCurrency(income);
  totalExpense.textContent = formatCurrency(expense);
}

// format currency
function formatCurrency(number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(number);
}

//remove transaction
function removeTransaction(id) {
  //filter we want to delete
  transactions = transactions.filter((transaction) => transaction.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateSummary();
  updateTransactionList();
}

//INITIAL RENDER
updateSummary();
updateTransactionList();
