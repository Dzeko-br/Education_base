const gamburgerBtn = document.querySelector('.humburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = mobileMenu.querySelector('.mobile-menu__close');
const gamburgerItems = mobileMenu.querySelectorAll('.main-menu__link');

const showMenu = e => {
    e.preventDefault();
    mobileMenu.classList.toggle('mobile-menu--active');
}

gamburgerBtn.addEventListener('click', (e) => showMenu(e));
closeBtn.addEventListener('click', (e) => showMenu(e));

for (const item of gamburgerItems) {
    item.addEventListener('click', e => showMenu(e));
}

