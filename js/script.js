// text field focus to name field when first load.


function setFocusToName() {
    document.getElementById("name").focus();
}
window.onload = setFocusToName;

setFocusToName();


// hide or display the other job role accordingly when the user select or unselect the title "other".


function setJobOtherRole() {
    const form = document.querySelector("form");
    form.addEventListener("change", (e) => {
        if (e.target.id === "title" && e.target.value === "other") {
            document.getElementById("other-job-role").style.display = "block";
        } else {
            document.getElementById("other-job-role").style.display = "none";
        }
    });
}

setJobOtherRole();


// function the drop down menu accordingly based on the Design selection.


function tShirtInfo() {
    const designDropdown = document.getElementById("design");
    const colorDropdown = document.getElementById("color");

    function displayOptions(options) {
        const allOptions = colorDropdown.querySelectorAll('option');
        allOptions.forEach(option => option.style.display = 'none');


        options.forEach(option => option.style.display = 'block');
    }

    designDropdown.addEventListener("change", (e) => {
        const selectedTheme = e.target.value;

        if (!selectedTheme || selectedTheme === "Select Theme") {
            colorDropdown.disabled = true;
            return;
        }

        colorDropdown.disabled = false;

        if (selectedTheme === "js puns") {
            const jsPunsOptions = document.querySelectorAll('option[data-theme="js puns"]');
            displayOptions(jsPunsOptions);
        }

        else if (selectedTheme === "heart js") {
            const heartJsOptions = document.querySelectorAll('option[data-theme="heart js"]');
            displayOptions(heartJsOptions);
        }
    });

    colorDropdown.disabled = true;
}

tShirtInfo();


// total cost of the activities registration.


let totalCost = 0;

function updateTotalCost() {
    const totalCostElement = document.getElementById('total-cost');
    if (totalCostElement) {
        totalCostElement.textContent = `Total cost: $${totalCost}`;
    }
}

function handleCheckboxChange(event) {

    const cost = parseInt(event.target.getAttribute('data-cost'));

    if (isNaN(cost)) {
        console.error("Invalid cost value for checkbox", event.target);
        return; 
    }

    if (event.target.checked) {
        totalCost += cost;
    } else {
        totalCost -= cost;
    }

    updateTotalCost();
}

const activityCheckboxes = document.querySelectorAll('.activities-box');
activityCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleCheckboxChange);
});

updateTotalCost();


// hide or display the payment terms boxes accordingly based on user's selection.


function setPaymentTerms() {
    const paymentSelect = document.getElementById("payment");
    
    paymentSelect.addEventListener("change", (e) => {
        updatePaymentDisplay(e.target.value);
    });

    function updatePaymentDisplay(value) {
        if (value === "paypal") {
            document.getElementById("paypal").style.display = "block";
            document.getElementById("bitcoin").style.display = "none";
        } else if (value === "bitcoin") {
            document.getElementById("bitcoin").style.display = "block";
            document.getElementById("paypal").style.display = "none";
        } else {
            document.getElementById("bitcoin").style.display = "none";
            document.getElementById("paypal").style.display = "none";
        }
    }
}

setPaymentTerms();


// validate the name input and show the error accordingly when submitting the form.


function validateNameSubmission() {
    const form = document.querySelector("form");
    const userNameInput = document.getElementById("name");
    const nameHint = document.getElementById("name-hint");

    form.addEventListener("submit", (e) => {
      
        if (userNameInput.value.trim() === "") {
            nameHint.style.display = "block";
            e.preventDefault();
        } else {
            nameHint.style.display = "none";
        }
    });

    userNameInput.addEventListener("input", () => {
        if (userNameInput.value.trim() !== "") {
            nameHint.style.display = "none";
        }
    });
}

validateNameSubmission();


// validate the email input and show the error accordingly when submitting the form.


function validateEmailSubmission() {
    const form = document.querySelector("form");
    const userEmailInput = document.getElementById("email");
    const emailHint = document.getElementById("email-hint");
    
    form.addEventListener("submit", (e) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (!emailRegex.test(userEmailInput.value)) {
            emailHint.style.display = "block";
            e.preventDefault();
        } else {
            emailHint.style.display = "none";
        }
    });

    userEmailInput.addEventListener("input", () => {
        emailHint.style.display = "none";
    });
}

validateEmailSubmission();


// a, validate the activities registration (at least selecting one) and show the error accordingly when submitting the form.
// b, prevent users from selecting activities that occur at the same time.


function validateActivitySection() {
    const form = document.querySelector("form");
    const userActivitySelection = document.getElementById("activities-box");
    const activityHint = document.getElementById("activities-hint");

    const checkAnyChecked = () => {
        const checkboxes = userActivitySelection.querySelectorAll("input[type='checkbox']");
        return Array.from(checkboxes).some(checkbox => checkbox.checked);
    };

    const handleActivityTimeConflict = (selectedCheckbox) => {
        const allCheckboxes = userActivitySelection.querySelectorAll("input[type='checkbox']");
        const selectedTime = selectedCheckbox.getAttribute("data-day-and-time");

        allCheckboxes.forEach(checkbox => {
            const time = checkbox.getAttribute("data-day-and-time");

            if (time === selectedTime && checkbox !== selectedCheckbox) {

                checkbox.disabled = selectedCheckbox.checked;
            }
        });
    };

    form.addEventListener("submit", (event) => {
        if (!checkAnyChecked()) {
            event.preventDefault();
            activityHint.style.display = "block";
        }
    });

    userActivitySelection.addEventListener("change", () => {
        if (checkAnyChecked()) {
            activityHint.style.display = "none";
        }
    });

    activityHint.style.display = "none";

    const activityCheckboxes = userActivitySelection.querySelectorAll('input[type="checkbox"]');
    activityCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            handleActivityTimeConflict(checkbox);
        });
    });
}

validateActivitySection();


// validate the credit card info input and show the error accordingly when submitting the form.


const form = document.querySelector("form");
const ccNum = document.getElementById("cc-num");
const ccHint = document.getElementById("cc-hint");
const paymentWay = document.getElementById("payment");

function validateCreditCardNumber(number) {
    const cardNumberRegex = /^\d+$/;
    return cardNumberRegex.test(number) && number.length >= 13 && number.length <= 16;
}

form.addEventListener("submit", (event) => {
    if (paymentWay.value === "credit-card") {
        const cardValue = ccNum && ccNum.value;

        if (!cardValue.trim()) {
            ccHint.textContent = "Credit card number cannot be empty.";
            ccHint.style.display = "block";
            event.preventDefault();
        } 

        else if (!validateCreditCardNumber(cardValue)) {
            ccHint.style.display = "block";
            event.preventDefault();
        } else {
            ccHint.style.display = "none";
        }
    }
});

ccNum.addEventListener("input", () => {
    ccHint.style.display = "none";
});

const ccZip = document.getElementById("zip");
const zipHint = document.getElementById("zip-hint");

function validateZipCode(number) {
    const zipCodeRegex = /^\d+$/;
    return zipCodeRegex.test(number) && number.length === 5;
}

form.addEventListener("submit", (event) => {
    const zipCode = ccZip.value.trim();

    if (zipCode === "") {
        zipHint.textContent = "Zip code cannot be empty."; 
        zipHint.style.display = "block";  
        event.preventDefault();
    } else if (!validateZipCode(zipCode)) {
        zipHint.textContent = "Invalid zip code. Please enter a 5-digit zip code."; 
        zipHint.style.display = "block";
        event.preventDefault();
    } else {
        zipHint.style.display = "none";
    }
});


ccZip.addEventListener("input", () => {
    zipHint.style.display = "none";
});

const ccCVV = document.getElementById("cvv");
const cvvHint = document.getElementById("cvv-hint");

function validateCVVCode(number) {
    const cvvCodeRegex = /^\d+$/;
    return cvvCodeRegex.test(number) && number.length === 3;
}

form.addEventListener("submit", (event) => {
    const cvvCode = ccCVV.value.trim();

    if (cvvCode === "") {
        cvvHint.textContent = "CVV code cannot be empty.";
        cvvHint.style.display = "block";
        event.preventDefault();
    } else if (!validateCVVCode(cvvCode)) {
        cvvHint.textContent = "Invalid CVV code. Please enter a 3-digit CVV.";
        cvvHint.style.display = "block";
        event.preventDefault();
    } else {
        cvvHint.style.display = "none";
    }
});

// Real-time validation for the CVV input field

ccCVV.addEventListener("input", () => {
    const cvvCode = ccCVV.value.trim();

    if (!/^\d*$/.test(cvvCode)) {
        cvvHint.textContent = "Please enter only numbers.";
        cvvHint.style.display = "block";
    } else if (cvvCode.length !== 3) {
        cvvHint.textContent = "CVV code must be exactly 3 digits.";
        cvvHint.style.display = "block";
    } else {
        cvvHint.style.display = "none";
    }
});


// moves the focus state from one input to the next for the "Register for Activities" section. 


const activityLabels = document.querySelectorAll('#activities label');

activityLabels.forEach(label => {
    const checkbox = label.querySelector('input[type="checkbox"]');

    if (checkbox) {
    
        checkbox.addEventListener('focus', () => {
            label.classList.add('focus');  
        });

        checkbox.addEventListener('blur', () => {
            label.classList.remove('focus');
        });
    }
});

