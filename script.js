const form = document.querySelector("form");
const popup = document.querySelector(".popup");
const errorPopUp = document.querySelector(".errorPopUp");
const successPopUp = document.querySelector(".successPopUp");
const popupContainer = document.querySelector(".popupContainer");
//inputs fields for validation:
const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const secNumber = document.querySelector("#secNumber");
const fundName = document.querySelector("#fundName");
const accountNumber = document.querySelector("#accountNumber");
const fundNumber = document.querySelector("#fundNumber");
const withdraAmount = document.querySelector("#withdraAmount");

//buttons:
const btnClear = document.querySelector(".btnClear");
// const btnSend = document.querySelector(".btnSend");

//withdrawal radio buttons
const radioWithdrawButtons = document.querySelectorAll(`input[name="radioWithdraw"]`);

radioWithdrawButtons.forEach((WithdrawBtn) => {
  const withdrawAmountDiv = document.querySelector(".withdrawAmountDiv");
  const withdraAmountInput = document.querySelector("#withdraAmount");
  const checkPaymentWith = document.querySelector(".checkPaymentWithDiv");

  WithdrawBtn.addEventListener("change", (e) => {
    if (e.target.value === "partial") {
      // console.log("partial");

      withdrawAmountDiv.style.display = "block";
      checkPaymentWith.style.display = "none";
      resetCheckboxes();
    } else if (e.target.value === "automated") {
      // console.log("automated");
      withdrawAmountDiv.style.display = "none";
      withdraAmountInput.value = "";
      checkPaymentWith.style.display = "flex";
    } else {
      withdrawAmountDiv.style.display = "none";
      withdraAmountInput.value = "";
      checkPaymentWith.style.display = "none";
      resetCheckboxes();
    }
  });
});

//checkbox buttons
const checkboxButtons = document.querySelectorAll(`input[type="checkbox"]`);
checkboxButtons.forEach((checkboxBtn) => {
  const EligibleCheck = document.querySelector(".EligibleCheck");
  checkboxBtn.addEventListener("change", (e) => {
    if (e.target.id === "paymentWithdrawCheck") {
      if (e.target.checked === true) {
        EligibleCheck.style.display = "flex";
      } else if (e.target.checked === false) {
        EligibleCheck.style.display = "none";
      }
    }
  });
});

//reset checkbox buttons when Automated montly withdrawal is not checked
function resetCheckboxes() {
  checkboxButtons.forEach((checkboxBtn) => {
    checkboxBtn.checked = false;
    const EligibleCheck = document.querySelector(".EligibleCheck");
    EligibleCheck.style.display = "none";
  });
}

//check validation when sending a form:
form.addEventListener("submit", (e) => {
  const errorMessages = [];
  //first name valisation
  if (!/^[A-Za-z\s]+$/.test(fname.value)) {
    errorMessages.push("First name is required and must contain only letters and whitespaces.");
  }
  //last name validation
  if (!/^[A-Za-z\s]+$/.test(lname.value)) {
    errorMessages.push("Last name is required and must contain only letters and whitespaces.");
  }
  //security number format validation
  console.log(secNumber.value);

  if (!/^[0-9]{3}-[0-9]{2}-[0-9]{4}$/.test(secNumber.value)) {
    errorMessages.push(
      "Security number is required and must be in this format DDD-DD-DDDD where D is any digit between 0 to 9. "
    );
  }
  if (!/^[a-zA-Z0-9\s]+$/.test(fundName.value)) {
    errorMessages.push("Fund name is required and must consist of english letters, numbers and whitespaces only. ");
  }
  if (!/^[0-9]+$/.test(fundNumber.value)) {
    errorMessages.push("Fund number is required and must consist only digits. ");
  }
  if (!/^[0-9]+$/.test(accountNumber.value)) {
    errorMessages.push("Account number is required and must consist only digits. ");
  }

  if (Number(withdraAmount.value) > 99000 || withdraAmount.value === "") {
    errorMessages.push("Withdrawal amount is required and must be less than 99000. ");
  }

  if (errorMessages.length > 0) {
    e.preventDefault();
    popup.style.backgroundColor = "rgb(218, 92, 92)";
    const errorTitle = document.createElement("h1");
    const errorTitleSecondary = document.createElement("h3");
    const ul = document.createElement("ul");

    errorPopUp.appendChild(errorTitle);
    errorPopUp.appendChild(errorTitleSecondary);

    errorMessages.forEach((errorMessage) => {
      const errorDiv = document.createElement("li");
      errorDiv.innerText = errorMessage;
      errorTitle.innerText = "Form was not Sent!";
      errorTitleSecondary.innerText = "Please pay attention for the following errors:";
      ul.appendChild(errorDiv);
      errorPopUp.appendChild(errorDiv);
    });
    popupContainer.style.display = "flex";
  } else {
    e.preventDefault();
    popup.style.backgroundColor = "rgb(145, 196, 82)";
    const successTitle = document.createElement("h1");

    successPopUp.appendChild(successTitle);
    successTitle.innerText = "Your Form was sent successfully!";
    popupContainer.style.display = "flex";
  }
});

//exit popup
popup.addEventListener("click", () => {
  popupContainer.style.display = "none";
  errorPopUp.innerHTML = "";
  successPopUp.innerHTML = "";
});

// paymentWithdrawCheck.addEventListener("change", (e) => {
//   const EligbleCheck = document.querySelector(".EligbleCheck");
//   console.log(e.target.checked);
//   if (e.target.checked === true) {
//     // console.log(checked);
//     EligbleCheck.style.display = "flex";
//   } else {
//     EligbleCheck.style.display = "none";
//   }
// });

/* 
withdrawTypeRadio.addEventListener("click", (e) => {
  console.log(e.target);
  const withdrawInputDiv = document.querySelector(".withdrawInputDiv");
  const checkPaymentWith = document.querySelector(".checkPaymentWith");
  if (e.target.id === "radio7") {
    withdrawInputDiv.style.display = "block";
  } else if (e.target.id === "radio8") {
    checkPaymentWith.style.display = "border";
  } else {
    withdrawInputDiv.style.display = "none";
    checkPaymentWith.style.display = "none";
  }
});

automated.addEventListener("click", (e) => {
  if (e.target.id === "radio8") {
    const checkPaymentWith = document.querySelector(".checkPaymentWith");
    checkPaymentWith.style.display = "block";
  }

  const withdrawInputDiv = document.querySelector(".withdrawInputDiv");
  if (e.target.id === "radio7") {
    withdrawInputDiv.style.display = "block";
  } else {
    withdrawInputDiv.style.display = "none";
  }
}); */

//clear fields:
btnClear.addEventListener("click", (e) => {
  e.preventDefault();
  fname.value = "";
  lname.value = "";
  fundName.value = "";
  accountNumber.value = "";
  withdraAmount.value = "";
});
