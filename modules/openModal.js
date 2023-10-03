import { showPage } from "./modalNavigation.js";

document.addEventListener('DOMContentLoaded', () => {
    const openModalBtns = document.querySelectorAll('.open-modal');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.modal-window').style.display = 'flex';
            document.body.style.overflow = 'hidden';
            showPage(0);
        });
    });
});