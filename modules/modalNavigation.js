import { inputValidation, toggleInputUI } from './inputValidation.js';

let currentPage = 0;

const pages =  document.querySelectorAll('.start-page, .form-page, .success-page');

let pageInputElements;
let inputs = (pageNumber) => pages[pageNumber].querySelectorAll('input, textarea');

function showPage(pageNumber) {
    pages.forEach(page => {
        page.style.display = 'none';
    });

    if (pageNumber >= 0 && pageNumber < pages.length) {
        pages[pageNumber].style.display = 'flex';
            currentPage = pageNumber;
    }
}

function enableNextButton() {
    pageInputElements = inputs(currentPage);
    const nextPageButton = pages[currentPage].querySelector('.next-page');
    
    let validInputs = 0;

    pageInputElements.forEach(input => {
        const { isValid } = inputValidation(input);

        if (isValid) {
            validInputs++;
        }
    });

    if (validInputs === pageInputElements.length) {
        nextPageButton.removeAttribute('disabled');
        return true;
    } else {
        nextPageButton.setAttribute('disabled', 'true');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showPage(currentPage);

    const inputElements = document.querySelectorAll('input, textarea');

    inputElements.forEach(input => {
        input.addEventListener('change', () => {
            toggleInputUI(input);
            enableNextButton();
        });
    })

    inputElements.forEach(input => {
        input.addEventListener('autocompletechange', () => {
            toggleInputUI(input);
            enableNextButton();
        });
    });

    const nextPageButtons = document.querySelectorAll('.next-page');
    nextPageButtons.forEach(button => {
        button.addEventListener('click', () => {
            showPage(currentPage + 1);
        });
    });

    const prevPageButtons = document.querySelectorAll('.prev-page');
    prevPageButtons.forEach(button => {
        button.addEventListener('click', () => {
            showPage(currentPage - 1);
        });
    });
});

export { currentPage, showPage, pages };