import { inputRules, inputValidation, toggleValidationUI } from './inputValidation.js';

let currentPage = 0;
const pages =  document.querySelectorAll('.start-page, .form-page, .success-page');

function showPage(pageNumber) {
    pages.forEach(page => {
        page.style.display = 'none';
    });

    if (pageNumber >= 0 && pageNumber < pages.length) {
        pages[pageNumber].style.display = 'flex';
            currentPage = pageNumber;
    }
}

// Issue: when you click the label for the checkboxes, it next page enables but the check doesnt show
function enableNextButton() {
    const nextPageButton = pages[currentPage].querySelector('.next-page');

    const allInputs = Array.from(pages[currentPage].querySelectorAll('input[required], input[type="checkbox"], input[type="radio"], textarea[required]'));
    const allInputsByName = allInputs.map(input => input.name);
    const allInputsByUnqiueName = [...new Set(allInputsByName)];

    const validInputs = allInputsByUnqiueName.filter(input => inputRules[input]['isValid']); 

    console.log(allInputsByUnqiueName);
    console.log(validInputs);
    console.log(validInputs.length === allInputsByUnqiueName.length);

    if (validInputs.length === allInputsByUnqiueName.length) {
        nextPageButton.removeAttribute('disabled');
    } else {
        nextPageButton.setAttribute('disabled', 'true');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showPage(currentPage);

    const inputElements = document.querySelectorAll('input[required], input[type="checkbox"], input[type="radio"], textarea[required]');
    inputElements.forEach(input => {
        input.addEventListener('input', () => {
            inputValidation(input);
            toggleValidationUI(input);
            console.log(inputRules);
            enableNextButton();
        });
    })

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


/* ARCHIVED
function checkInputs(pageNumber) {
    if (pageNumber > 0) {
        const pages = document.querySelectorAll('.start-page, .form-page, .success-page');

        const allInputs = Array.from(pages[pageNumber].querySelectorAll('input[required], textarea[required], .options'));
        const fieldInputs = Array.from(pages[pageNumber].querySelectorAll('input[required], textarea[required]'));
        const optionInputs = Array.from(pages[pageNumber].querySelectorAll('input[type="checkbox"], input[type="radio"]'));

        const nextPageButton = pages[pageNumber].querySelector('.next-page');
        
        const fieldInputsCompleted = fieldInputs.filter(input => input.value.trim() !== '' || input.checked);
        const optionInputsCompleted = optionInputs.filter(input => input.checked);

        if (fieldInputsCompleted.length + optionInputsCompleted.length >= allInputs.length) {
            nextPageButton.removeAttribute('disabled');
        } else {
            nextPageButton.setAttribute('disabled', 'true');
        }
    }
}
*/