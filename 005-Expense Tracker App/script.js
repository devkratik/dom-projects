"use strict";
const totalBalance = document.getElementById("total-balance");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const transactionsContainer = document.getElementById("transaction-list");
const transactionDescription = document.getElementById("description");
const transactionAmount = document.getElementById("amount");
const recordContainer = document.getElementById("transaction-list");
const submitBtn = document.getElementById("submit");

let accountBalance = 0;
let accountIncome = 0;
let accountExpense = 0;

const addIncome = function (amountValue) {
  accountIncome += amountValue;
  accountBalance = accountBalance + amountValue;
  totalIncome.textContent = `\$ ${accountIncome}`;
  totalBalance.textContent = `\$ ${accountBalance}`;
};
const addExpense = function (amountValue) {
  amountValue = Math.abs(amountValue);
  if (amountValue <= accountBalance) {
    accountExpense += amountValue;
    accountBalance = Math.floor(accountBalance - amountValue);
    totalExpense.textContent = `\$ ${accountExpense}`;
    totalBalance.textContent = `\$ ${accountBalance}`;
  } else {
    console.log(`Account Balance is not enough!`);
  }
};

const createRecord = function (amount, description) {
  let currentRecord = document.createElement("li");
  currentRecord.classList.add("transaction");
  let transactedValue = document.createElement("span");
  let transactionText = document.createElement("span");
  currentRecord.style.borderRight = "4px solid";
  currentRecord.style.borderRightColor = amount > 0 ? "green" : "red";
  currentRecord.append(transactionText, transactedValue);
  transactedValue.textContent = amount;
  transactionText.textContent = description;

  recordContainer.append(currentRecord);
};

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let descriptionText = transactionDescription.value;
  let enteredAmount = Number(transactionAmount.value);
  if (!descriptionText) return;
  if (!enteredAmount) return;
  enteredAmount > 0 ? addIncome(enteredAmount) : addExpense(enteredAmount);
  createRecord(enteredAmount, descriptionText);
  transactionDescription.value = "";
  transactionAmount.value = "";
});
