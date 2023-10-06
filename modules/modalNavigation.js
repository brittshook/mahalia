import { inputValidation, toggleUI } from './inputValidation.js';

let currentPage = 0;

const pages =  document.querySelectorAll('.start-page, .form-page, .success-page');

let pageInputElements;
let inputs = (pageNumber) => pages[pageNumber].querySelectorAll('input[required], input[type="radio"], input[type="checkbox"], textarea[required');

function showPage(pageNumber) {
    pages.forEach(page => {
        page.style.display = 'none';
    });

    if (pageNumber >= 0 && pageNumber < pages.length) {
        pages[pageNumber].style.display = 'flex';
            currentPage = pageNumber;
    }
}

// Issue with the custom pronoun text box. Require not being removed when it was the only one selected. 
function enableNextButton() {
    pageInputElements = inputs(currentPage);
    const nextPageButton = pages[currentPage].querySelector('.next-page');
    
    let validInputs = 0;

    pageInputElements.forEach(input => {
        if (inputValidation(input)) {
            validInputs++;
        }
    });

    console.log(validInputs, pageInputElements.length);

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
            toggleUI(input);
            enableNextButton();
        });
    })

    inputElements.forEach(input => {
        input.addEventListener('autocompletechange', () => {
            toggleUI(input);
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