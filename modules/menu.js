const openMenuBtn = document.querySelector('.open-menu');
const closeMenuBtns = document.querySelectorAll('.close-menu');

openMenuBtn.addEventListener('click', () => {
    document.getElementById('menu-window').style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeMenuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('menu-window').style.display = 'none';
        document.body.style.overflow = 'visible';
    })
});