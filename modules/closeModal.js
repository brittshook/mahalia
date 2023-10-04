import { currentPage } from "./modalNavigation.js";

function closeModal() {
    document.querySelector('.modal-window').style.display = 'none';
    document.body.style.overflow = 'visible';
    document.querySelector('form').reset();
}

document.addEventListener('DOMContentLoaded', () => {
    const closeModalBtn = document.querySelector('.close-modal');

    closeModalBtn.addEventListener('click', () => {
        if (currentPage !== 0) {
            if (confirm("Your form will not be submitted. Press OK to confirm close.")) {
                closeModal();
            };
        } else {
            closeModal();
        }
    });
});