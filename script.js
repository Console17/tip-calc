const billInput = document.querySelector(".bill-input");
const billError = document.querySelector(".bill-error");
const peopleInput = document.querySelector(".people-input");
const peopleError = document.querySelector(".people-error");
const tipAmount = document.querySelector(".tip-amount");
const totalAmount = document.querySelector(".total-amount");
const buttons = document.querySelectorAll(".tip-btn");
const customTip = document.querySelector(".custom-tip");

let tipPercentage = 0;

function handleInput(inputElement, errorElement) {
  const value = inputElement.value;

  if (value !== "") {
    inputElement.style.border = "2px solid hsl(172, 67%, 45%)";
    errorElement.style.display = "none";
  } else {
    inputElement.style.border = "2px solid red";
    errorElement.style.display = "block";
  }
  calculateTip();
}

billInput.addEventListener("input", () => handleInput(billInput, billError));
billInput.addEventListener("blur", () => handleInput(billInput, billError));
peopleInput.addEventListener("input", () =>
  handleInput(peopleInput, peopleError)
);
peopleInput.addEventListener("blur", () =>
  handleInput(peopleInput, peopleError)
);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => {
      btn.classList.remove("btn-clicked");
    });
    button.classList.add("btn-clicked");

    tipPercentage = parseFloat(button.value);

    calculateTip();
  });
});

customTip.addEventListener("input", () => {
  tipPercentage = customTip.value / 100;
  calculateTip();
});

function calculateTip() {
  const billValue = billInput.value;
  const peopleValue = peopleInput.value;

  if (!isNaN(billValue) && !isNaN(peopleValue) && peopleValue > 0) {
    const tipPerPerson = (billValue * tipPercentage) / peopleValue;
    const totalPerPerson = billValue / peopleValue + tipPerPerson;

    tipAmount.textContent = tipPerPerson.toFixed(2);
    totalAmount.textContent = totalPerPerson.toFixed(2);
  }
}
