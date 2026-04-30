"use strict";

const formEl = document.getElementById("converter-form");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultContainer = document.getElementById("result");

window.addEventListener("load", fetchCurrencies);
formEl.addEventListener("submit", convertCurrency);

async function fetchCurrencies() {
  const response = await fetch(
    "https://api.exchangerate-api.com/v4/latest/USD",
  );
  const data = await response.json();
  console.log(data);
  const currencyOptions = Object.keys(data.rates);
  console.log(currencyOptions);
  currencyOptions.forEach((currency) => {
    //for from element
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);
    //for to element
    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
  });
}

async function convertCurrency(e) {
  e.preventDefault();
  const amount = parseFloat(amountInput.value);
  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;

  if (amount < 0) {
    alert("Please enter valid amount.");
    return;
  }
  const response = await fetch(
    `https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`,
  );
  const data = await response.json();

  const rate = data.rates[toCurrencyValue];
  const convertedAmount = (amount * rate).toFixed(2);

  resultContainer.textContent = `${amount} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;
  resultContainer.style.display = "flex";
}
