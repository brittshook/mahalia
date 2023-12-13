import { currentPage, pages, showPage } from "./modalNavigation.js";
import { changeOptionInput } from "./toggleOptionUI.js";
import { updateErrorMessage } from "./inputValidation.js";

const openModalBtns = document.querySelectorAll('.open-modal');
openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('#modal-window').style.display = 'flex';
        document.body.style.overflow = 'hidden';
        showPage(0);
    });
});

function closeModal() {
    document.querySelector('#modal-window').style.display = 'none';
    document.body.style.overflow = 'visible';
    document.querySelector('form').reset();

    const nextPageButtons = document.querySelectorAll('.next-page');
    nextPageButtons.forEach(button => {
        if (!button.classList.contains('disabled') && button.id !== 'start-btn') {
            button.classList.add('disabled');
        }
    });

    const inputElements = document.querySelectorAll('input, textarea');
    inputElements.forEach(input => {
        resetFormUI(input);
    });
}

const closeModalButton = document.querySelector('.close-modal');
closeModalButton.addEventListener('click', () => {
    if (currentPage !== 0) {
        if (confirm("Your consultation request will not be submitted. Press OK to confirm close.")) {
            closeModal();
        };
    } else {
        closeModal();
    }
    });

function resetFormUI(input) {
    if (input.type === 'checkbox' || input.type === 'radio') {
        changeOptionInput(input, 'remove');
    }

    if (input.id === 'custom' && !input.checked) {
        document.querySelector('#custom-pronoun').disabled = true;
    }
    
    updateErrorMessage(input, '');
    input.classList.remove('success');
    input.classList.remove('error');
}