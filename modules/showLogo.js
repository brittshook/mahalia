function scrolledTo(element) {
    const rect = element.getBoundingClientRect();
    return window.scrollY > rect.top;
}

document.addEventListener('DOMContentLoaded', () => {
    const tattoos = document.querySelector('#tattoos');
    const logo = document.querySelector('#logo');
    
    window.addEventListener('scroll', () => {
        if (scrolledTo(tattoos)) {
            logo.classList.add('revealed');
        }
    });
});