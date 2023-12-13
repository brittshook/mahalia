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
        if (inputValidation(input)) {
            validInputs++;
        }
    });

    if (validInputs === pageInputElements.length) {
        nextPageButton.classList.remove('disabled');
    } else {
        nextPageButton.classList.add('disabled');
    }
}

function wiggleOnError(button) {
    if (button.classList.contains('disabled')) {
        pageInputElements = inputs(currentPage);
        pageInputElements.forEach(input => {
            if (!inputValidation(input)) {
                toggleInputUI(input);
                input.classList.add('wiggle');
                setTimeout(() => {
                    input.classList.remove('wiggle');
                },1000);
            };
        });
    };
}

function isPageComplete(input) {
    toggleInputUI(input);
    enableNextButton();
}

showPage(currentPage);

const inputElements = document.querySelectorAll('input, textarea');
inputElements.forEach(input => {
    input.addEventListener('change', () => {
        isPageComplete(input);
    });

    input.addEventListener('autocompletechange', () => {
        isPageComplete(input);
    });
});

const uploadBox = document.querySelector('#file-upload-box');
uploadBox.addEventListener('drop', () => {
    setTimeout(() => {
        const input = uploadBox.querySelector('#box-file');
        isPageComplete(input);
    }, 0);
})

const nextPageButtons = document.querySelectorAll('.next-page');
nextPageButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('disabled')) {
            wiggleOnError(button);
        } else {
            showPage(currentPage + 1);
        }
    });
});

const prevPageButtons = document.querySelectorAll('.prev-page');
prevPageButtons.forEach(button => {
    button.addEventListener('click', () => {
        showPage(currentPage - 1);
    });
});

export { currentPage, showPage, pages };