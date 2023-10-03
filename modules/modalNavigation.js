let currentPage = 0;

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

document.addEventListener('DOMContentLoaded', () => {
    showPage(currentPage);

    const nextPageButtons = document.querySelectorAll('.next-page');
    nextPageButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('clicked form btn');
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

export { currentPage, showPage };