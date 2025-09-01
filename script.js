// Form
const successicon ='./assets/images/icon-success-check.svg';
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
const emailError = document.querySelector('#email + .error-message'); // or getElementById if it had an id
const queryTypeError = document.getElementById('query-type-error');
const messageError = document.getElementById('message-error');
const consentError = document.querySelector('.consent-container .error-message');

const submitButton = document.querySelector('.submit-button');





let icon = {
  success: `<img src="${successicon}" alt="Success icon" />`
};

const showToast = (
    message = "Sample Message",
    toastType = "info",
    duration = 5000) => {
    if (
        !Object.keys(icon).includes(toastType))
        toastType = "info";

    let box = document.createElement("div");
    box.classList.add(
        "toast", `toast-${toastType}`);
    box.innerHTML = ` <div class="toast-content-wrapper">
                      <div class="toast-icon">
                      ${icon[toastType]}
                      </div>
                      <div class="toast-message">${message}</div>
                      <div class="toast-progress"></div>
                      </div>`;
    duration = duration || 5000;
    box.querySelector(".toast-progress").style.animationDuration =
            `${duration / 1000}s`;

  const existingToast = document.body.querySelector(".toast");
  if (existingToast) existingToast.remove();

  document.body.appendChild(box);
  setTimeout(() => box.remove(), duration);
};

submitButton.addEventListener("click",(e) => {
        e.preventDefault();
        showToast("Article Submitted Successfully","success",5000);
    });

    console.log('submitButton is:', submitButton);
