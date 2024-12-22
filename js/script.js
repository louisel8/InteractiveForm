//This is JavaScript V2..

//Focus on the name input field when the page loads.


function setFocusToName() {
    document.getElementById("name").focus();
}
window.onload = setFocusToName;


// Hide or display the "Other" job role input based on selection.


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


// Handle design selection and display the corresponding color options.


function tShirtInfo() {
    const designDropdown = document.getElementById("design");
    const colorDropdown = document.getElementById("color");
    const colorHintOption = colorDropdown.querySelector('option[selected][hidden]');

    function displayOptions(options) {
        const allOptions = colorDropdown.querySelectorAll('option');
        allOptions.forEach(option => option.style.display = 'none');
        options.forEach(option => option.style.display = 'block');
    }

    function resetColorSelection() {
        colorDropdown.selectedIndex = 0;
        colorDropdown.disabled = true;
        colorDropdown.style.display = 'none';
        if (colorHintOption) {
            colorHintOption.textContent = 'Select a design theme above';
        }
    }

    designDropdown.addEventListener("change", (e) => {
        const selectedTheme = e.target.value;

        if (!selectedTheme || selectedTheme === "Select Theme") {
            resetColorSelection();
            return;
        }

        if (colorHintOption) {
            colorHintOption.textContent = 'Select a color below';
        }

        colorDropdown.disabled = false;
        colorDropdown.style.display = 'block';

        colorDropdown.selectedIndex = 0;

        if (selectedTheme === "js puns") {
            const jsPunsOptions = document.querySelectorAll('option[data-theme="js puns"]');
            displayOptions(jsPunsOptions);
        } else if (selectedTheme === "heart js") {
            const heartJsOptions = document.querySelectorAll('option[data-theme="heart js"]');
            displayOptions(heartJsOptions);
        }
    });
}

tShirtInfo();


// Total cost of the activities registration.


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


// Hide or display the payment method sections based on the user's selection.


function setPaymentTerms() {
    const paymentSelect = document.getElementById("payment");

    updatePaymentDisplay(paymentSelect.value);

    paymentSelect.addEventListener("change", (e) => {
        updatePaymentDisplay(e.target.value);
    });

    function updatePaymentDisplay(value) {

        document.getElementById("paypal").style.display = "none";
        document.getElementById("bitcoin").style.display = "none";
        document.getElementById("credit-card").style.display = "none";

        if (value === "paypal") {
            document.getElementById("paypal").style.display = "block";
        } else if (value === "bitcoin") {
            document.getElementById("bitcoin").style.display = "block";
        } else if (value === "credit-card") {
            document.getElementById("credit-card").style.display = "block";
        }
    }
}

setPaymentTerms();


// Validate the form inputs.


function validateNameSubmission() {
    const form = document.querySelector("form");
    const userNameInput = document.getElementById("name");
    const nameHint = document.getElementById("name-hint");
    const nameLabel = userNameInput.closest("label");

    validateInput(userNameInput, /.+/, nameHint, nameLabel);
}

validateNameSubmission();

function validateEmailSubmission() {
    const form = document.querySelector("form");
    const userEmailInput = document.getElementById("email");
    const emailHint = document.getElementById("email-hint");
    const emailLabel = userEmailInput.closest("label");

    validateInput(userEmailInput, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, emailHint, emailLabel);
}

validateEmailSubmission();

function validateZipCodeSubmission() {
    const form = document.querySelector("form");
    const zipCodeInput = document.getElementById("zip");
    const zipCodeHint = document.getElementById("zip-hint");
    const zipCodeLabel = zipCodeInput.closest("label");

    validateInput(zipCodeInput, /^\d{5}$/, zipCodeHint, zipCodeLabel);
}

validateZipCodeSubmission();

function validateCVVSubmission() {
    const form = document.querySelector("form");
    const cvvInput = document.getElementById("cvv");
    const cvvHint = document.getElementById("cvv-hint");
    const cvvLabel = cvvInput.closest("label");

    validateInput(cvvInput, /^\d{3}$/, cvvHint, cvvLabel);
}

validateCVVSubmission();

function validateCreditCardSubmission() {
    const form = document.querySelector("form");
    const ccInput = document.getElementById("cc-num");
    const ccHint = document.getElementById("cc-hint");
    const ccLabel = ccInput.closest("label");

    validateInput(ccInput, /^\d{13,16}$/, ccHint, ccLabel);
}

validateCreditCardSubmission();


// Validate the activities registration (at least one selection) and prevent time conflicts.


function validateActivitySection() {
    const form = document.querySelector("form");
    const userActivitySelection = document.getElementById("activities-box");
    const activityHint = document.getElementById("activities-hint");
    const activityFieldset = userActivitySelection.closest("fieldset");

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
            activityFieldset.classList.add("not-valid");
            activityFieldset.classList.remove("valid");
        } else {
            activityHint.style.display = "none";
            activityFieldset.classList.remove("not-valid");
            activityFieldset.classList.add("valid");
        }
    });

    userActivitySelection.addEventListener("change", () => {
        if (checkAnyChecked()) {
            activityHint.style.display = "none";
            activityFieldset.classList.remove("not-valid");
            activityFieldset.classList.add("valid");
        } else {
            activityHint.style.display = "block";
            activityFieldset.classList.add("not-valid");
            activityFieldset.classList.remove("valid");
        }
    });

    userActivitySelection.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
        checkbox.addEventListener("change", () => handleActivityTimeConflict(checkbox));
    });
}

validateActivitySection();


// display a checkmark icon or display a error indicator based on the input validation.


function validateInput(inputElement, regex, hintElement, labelElement) {
    inputElement.addEventListener("input", () => {
        if (!regex.test(inputElement.value)) {
            labelElement.classList.add("not-valid");
            labelElement.classList.remove("valid");
            hintElement.style.display = "block";
        } else {
            labelElement.classList.remove("not-valid");
            labelElement.classList.add("valid");
            hintElement.style.display = "none";
        }
    });
}


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


// Global submit validation listener.


document.querySelector("form").addEventListener("submit", function (event) {
    let isValid = true;

    const nameLabel = document.getElementById("name").closest("label");
    const emailLabel = document.getElementById("email").closest("label");
    const activitiesLabel = document.getElementById("activities-box").closest("fieldset");
    const paymentLabel = document.getElementById("payment").closest("label");

    if (!document.getElementById("name").value) {
        nameLabel.classList.add("not-valid");
        isValid = false;
    }

    if (!document.getElementById("email").value) {
        emailLabel.classList.add("not-valid");
        isValid = false;
    }

    if (!document.querySelectorAll("#activities-box input:checked").length) {
        activitiesLabel.classList.add("not-valid");
        isValid = false;
    }

    if (document.getElementById("payment").value === "credit-card") {
        const ccInput = document.getElementById("cc-num");
        const zipInput = document.getElementById("zip");
        const cvvInput = document.getElementById("cvv");

        if (!ccInput.value || !zipInput.value || !cvvInput.value) {
            isValid = false;
            ccInput.closest("label").classList.add("not-valid");
            zipInput.closest("label").classList.add("not-valid");
            cvvInput.closest("label").classList.add("not-valid");
        }
    }

    if (!isValid) {
        event.preventDefault();
    } else {

        sessionStorage.setItem("registrationSuccess", "true");
    }
});


// Show alert if form was successfully submitted and page is reloaded.


if (sessionStorage.getItem("registrationSuccess")) {
    alert("Registration is submitted successfully!");
    sessionStorage.removeItem("registrationSuccess");
}

