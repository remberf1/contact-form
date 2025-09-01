const successicon = './assets/images/icon-success-check.svg';
const form = document.querySelector('.contact-form');

// Inputs
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const queryTypeRadios = document.querySelectorAll('input[name="query-type"]');
const messageTextarea = document.getElementById('message');
const consentCheckbox = document.getElementById('consent');

const firstNameError = document.getElementById('first-name-error');
const lastNameError = document.getElementById('last-name-error');
const emailError = document.querySelector('#email + .error-message');
const queryTypeError = document.getElementById('query-type-error');
const messageError = document.getElementById('message-error');
const consentError = document.querySelector('.consent-container .error-message');

const submitButton = document.querySelector('.submit-button');

let icon = {
  success: `<img src="${successicon}" alt="Success icon" />`
};

// Function to show toast messages
const showToast = (message = "Sample Message", paragraph = "Sample Paragraph", toastType = "info", duration = 5000) => {
  if (!Object.keys(icon).includes(toastType)) toastType = "info";

  let box = document.createElement("div");
  box.classList.add("toast", `toast-${toastType}`);
  box.innerHTML = ` <div class="toast-content-wrapper">
                    <div class="toast-header">
                    <div class="toast-icon">
                    ${icon[toastType]}
                    </div>
                    <div class="toast-message">${message}</div>
                    </div>
                    <div class="toast-paragraph">${paragraph}</div>
                    <div class="toast-progress"></div>
                    </div>`;
  duration = duration || 5000;
  box.querySelector(".toast-progress").style.animationDuration = `${duration / 1000}s`;

  const existingToast = document.body.querySelector(".toast");
  if (existingToast) existingToast.remove();

  document.body.appendChild(box);
  setTimeout(() => box.remove(), duration);
};

// Function to validate the form
const validateForm = () => {
  let isValid = true;

  // Validate First Name
  if (!firstNameInput.value.trim()) {
    firstNameInput.classList.add('invalid');
    firstNameError.style.display = 'block';
    isValid = false;
  } else {
    firstNameInput.classList.remove('invalid');
    firstNameError.style.display = 'none';
  }

  // Validate Last Name
  if (!lastNameInput.value.trim()) {
    lastNameInput.classList.add('invalid');
    lastNameError.style.display = 'block';
    isValid = false;
  } else {
    lastNameInput.classList.remove('invalid');
    lastNameError.style.display = 'none';
  }

  // Validate Email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(emailInput.value)) {
    emailInput.classList.add('invalid');
    emailError.style.display = 'block';
    isValid = false;
  } else {
    emailInput.classList.remove('invalid');
    emailError.style.display = 'none';
  }

  // Validate Query Type (Radio Buttons)
  let isQueryTypeSelected = false;
  queryTypeRadios.forEach(radio => {
    if (radio.checked) {
      isQueryTypeSelected = true;
    }
  });

  if (!isQueryTypeSelected) {
    queryTypeError.style.display = 'block';
    isValid = false;
  } else {
    queryTypeError.style.display = 'none';
  }

  // Validate Message
  if (!messageTextarea.value.trim()) {
    messageTextarea.classList.add('invalid');
    messageError.style.display = 'block';
    isValid = false;
  } else {
    messageTextarea.classList.remove('invalid');
    messageError.style.display = 'none';
  }

  // Validate Consent Checkbox
  if (!consentCheckbox.checked) {
    consentError.style.display = 'block';
    isValid = false;
  } else {
    consentError.style.display = 'none';
  }

  return isValid;
};

// Handle form submission
submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (validateForm()) {
    // If the form is valid, show the success toast and reset the form
    showToast("Message sent!", "Thanks for completing the form. We'll be in touch soon", "success", 5000);
    form.reset(); // Reset the form fields
    
    document.querySelectorAll('.radio-class').forEach(container => container.classList.remove('selected'));
  }
});

// Add event listeners for input fields to dynamically remove error state
firstNameInput.addEventListener('input', () => {
  if (firstNameInput.value.trim()) {
    firstNameInput.classList.remove('invalid');
    firstNameError.style.display = 'none';
  }
});

lastNameInput.addEventListener('input', () => {
  if (lastNameInput.value.trim()) {
    lastNameInput.classList.remove('invalid');
    lastNameError.style.display = 'none';
  }
});

emailInput.addEventListener('input', () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailPattern.test(emailInput.value)) {
    emailInput.classList.remove('invalid');
    emailError.style.display = 'none';
  }
});

messageTextarea.addEventListener('input', () => {
  if (messageTextarea.value.trim()) {
    messageTextarea.classList.remove('invalid');
    messageError.style.display = 'none';
  }
});

consentCheckbox.addEventListener('change', () => {
  if (consentCheckbox.checked) {
    consentError.style.display = 'none';
  }
});

const radioContainers = document.querySelectorAll('.radio-class');

radioContainers.forEach(container => {
  const radio = container.querySelector('input[type="radio"]');

  radio.addEventListener('change', () => {
    radioContainers.forEach(c => c.classList.remove('selected'));

    if (radio.checked) {
      container.classList.add('selected');
      queryTypeError.style.display = 'none'; // Hide error when radio button is selected
    }
  });
});
