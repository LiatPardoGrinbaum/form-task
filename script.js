const form = document.querySelector("form");
const popup = document.querySelector(".popup");
const errorPopUp = document.querySelector(".errorPopUp");
const successPopUp = document.querySelector(".successPopUp");
const popupContainer = document.querySelector(".popupContainer");
const exitPopup = document.querySelector(".exitPopup");
//inputs fields for validation:
const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const fullName = document.querySelector("#fullName");
const secNumber = document.querySelector("#secNumber");
const fundName = document.querySelector("#fundName");
const accountNumber = document.querySelector("#accountNumber");
const fundNumber = document.querySelector("#fundNumber");
const withdraAmount = document.querySelector("#withdraAmount");

//withdrawal radio buttons
const radioWithdrawButtons = document.querySelectorAll(`input[name="radioWithdraw"]`);

radioWithdrawButtons.forEach((WithdrawBtn) => {
  const withdrawAmountDiv = document.querySelector(".withdrawAmountDiv");
  const withdraAmountInput = document.querySelector("#withdraAmount");
  const checkPaymentWith = document.querySelector(".checkPaymentWithDiv");

  WithdrawBtn.addEventListener("change", (e) => {
    if (e.target.value === "partial") {
      withdrawAmountDiv.style.display = "block";
      checkPaymentWith.style.display = "none";
      resetCheckboxes();
    } else if (e.target.value === "automated") {
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
    errorMessages.push("First name is required and must contain only english letters and whitespaces.");
  }
  //last name validation
  if (!/^[A-Za-z\s]+$/.test(lname.value)) {
    errorMessages.push("Last name is required and must contain only english letters and whitespaces.");
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

    errorTitle.innerText = "Form was not Sent!";
    errorTitleSecondary.innerText = "Please pay attention for the following errors:";

    errorMessages.forEach((errorMessage) => {
      const errorDiv = document.createElement("li");
      errorDiv.innerText = errorMessage;
      ul.appendChild(errorDiv);
      errorPopUp.appendChild(ul);
    });
    popupContainer.style.display = "flex";
  } else {
    e.preventDefault();
    popup.style.backgroundColor = "rgb(145, 196, 82)";
    const successTitle = document.createElement("h1");
    successPopUp.appendChild(successTitle);
    successTitle.innerText = "Your Form was sent successfully!";
    popupContainer.style.display = "flex";
    //submit form:
    setTimeout(() => {
      form.submit();
    }, 2000);
  }
});

//exit popup
exitPopup.addEventListener("click", () => {
  popupContainer.style.display = "none";
  errorPopUp.innerHTML = "";
  successPopUp.innerHTML = "";
});

//computed fields (first name field)
fname.addEventListener("keyup", (e) => {
  //if there is already text in the fullname field
  if (fullName.value.includes(" ")) {
    let lnameTmp = fullName.value.split(" ").slice(1).join(" ");
    fname.value = fname.value.replace(/[^A-Za-z]/g, "");
    fullName.value = fname.value + " " + lnameTmp;
  } else {
    //name can be only one word
    fname.value = fname.value.replace(/[^A-Za-z]/g, "");
    fullName.value = fname.value;
  }
});

//computed fields (last name field)
lname.addEventListener("keyup", (e) => {
  //when there is already firstname+lastname in fullname field or only a space
  if (fullName.value.includes(" ")) {
    let fnameTmp = fullName.value.split(" ")[0];
    fullName.value = fnameTmp + " " + lname.value;
    //if there is no charecter in fullname field
  } else if (fullName.value.length === 0) {
    fullName.value = " ";
    //if there is only first name without space after
  } else if (!fullName.value.includes(" ") && fullName.value.length > 0) {
    let fnamTmp = fullName.value;
    fullName.value = fnamTmp + " " + lname.value;
    //there is a firstname with a whitespace after it
  } else {
    fullName.value = fnamTmp + " " + lname.value;
  }
});

//computed fields (full name field)
fullName.addEventListener("keyup", (e) => {
  if (!fullName.value.includes(" ")) {
    fname.value = fullName.value;
  } else if (fullName.value.includes(" ")) {
    lname.value = e.target.value.split(" ").slice(1).join(" ");
    fname.value = e.target.value.split(" ").slice(0, 1).join(" ");
  }
});
