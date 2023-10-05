import { currentPage, pages } from "./modalNavigation.js";
import { changeOptionInput } from "./toggleOptionUI.js";

// TODO, add all custom states once set in code
function closeModal() {
    // Do not show modal, and unlock the background page
    document.querySelector('.modal-window').style.display = 'none';
    document.body.style.overflow = 'visible';

    // Reset form fields
    document.querySelector('form').reset();

    // Disable next page buttons again
    for (let i = currentPage; i > 0; i--) {
        const nextPageButton = pages[i].querySelector('.next-page');
        nextPageButton.setAttribute('disabled', 'true');
    }

    // Reset custom UI states
    const inputElements = document.querySelectorAll('input, textarea');
    inputElements.forEach(input => input.classList.remove('error', 'success'));

    const optionInputs = document.querySelectorAll('.checkbox, .radio'); 
    optionInputs.forEach(option => changeOptionInput(option, 'remove'));
}

document.addEventListener('DOMContentLoaded', () => {
    const closeModalButton = document.querySelector('.close-modal');

    closeModalButton.addEventListener('click', () => {
        if (currentPage !== 0) {
            if (confirm("Your form will not be submitted. Press OK to confirm close.")) {
                closeModal();
            };
        } else {
            closeModal();
        }
    });
});