function scrolledTo(element) {
    const rect = element.getBoundingClientRect();
    return window.scrollY > rect.top;
}

const tattoos = document.getElementById('tattoos');
const logo = document.getElementById('logo');

window.addEventListener('scroll', () => {
    if (scrolledTo(tattoos)) {
        logo.classList.add('revealed');
    }
});