import { resetFormUI } from "./inputValidation.js";
import { currentPage, pages, showPage } from "./modalNavigation.js";

document.addEventListener('DOMContentLoaded', () => {
    const openModalBtns = document.querySelectorAll('.open-modal');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('#modal-window').style.display = 'flex';
            document.body.style.overflow = 'hidden';
            showPage(0);
        });
    });
});

function closeModal() {
    document.querySelector('#modal-window').style.display = 'none';
    document.body.style.overflow = 'visible';
    document.querySelector('form').reset();

    for (let i = currentPage; i > 0; i--) {
        const nextPageButton = pages[i].querySelector('.next-page');
        nextPageButton.setAttribute('disabled', 'true');
    }

    const inputElements = document.querySelectorAll('input, textarea');
    inputElements.forEach(input => {
        resetFormUI(input);
    });
}

document.addEventListener('DOMContentLoaded', () => {
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
});