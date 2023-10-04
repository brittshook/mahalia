let currentPage = 0;

// Navigate to next / previous page
function showPage(pageNumber) {
    const pages =  document.querySelectorAll('.start-page, .form-page, .success-page');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    if (pageNumber >= 0 && pageNumber < pages.length) {
        pages[pageNumber].style.display = 'flex';
        currentPage = pageNumber;
    }
}

// Enable next button if required fields are complete
// TODO - clear input fields when user leaves or submits form
function checkInputs(pageNumber) {
    if (pageNumber > 0) {
        const pages = document.querySelectorAll('.start-page, .form-page, .success-page');

        const allInputs = Array.from(pages[pageNumber].querySelectorAll('input[required], textarea[required], .options'));
        const fieldInputs = Array.from(pages[pageNumber].querySelectorAll('input[required], textarea[required]'));
        const optionInputs = Array.from(pages[pageNumber].querySelectorAll('input[type="checkbox"], input[type="radio"]'));

        const nextPageButton = pages[pageNumber].querySelector('.next-page');
        

        const fieldInputsCompleted = fieldInputs.filter(input => {
            return input.value.trim() !== '' || input.checked;
        });

        const optionInputsCompleted = optionInputs.filter(input => {
            return input.checked;
        });


        if (fieldInputsCompleted.length + optionInputsCompleted.length >= allInputs.length) {
            nextPageButton.removeAttribute('disabled');
        } else {
            nextPageButton.setAttribute('disabled', 'true');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showPage(currentPage);

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

    const inputElements = document.querySelectorAll('input[required], input[type="checkbox"], input[type="radio"], textarea[required]');
    inputElements.forEach(input => {
        input.addEventListener('input', () => {
            checkInputs(currentPage);
        });
    })
    
});

export { currentPage, showPage };