let lastScrollY = window.scrollY;
let ticking = false;
const navbar = document.getElementById('NavBar');
const threshold = 10;

function onScroll() {
  const currentScrollY = window.scrollY;

  if (Math.abs(currentScrollY - lastScrollY) < threshold) {
    return;
  }

  if (currentScrollY > lastScrollY) {
    navbar.classList.add('hide');
  } else {
    navbar.classList.remove('hide');
  }

  lastScrollY = currentScrollY;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
    ticking = true;
  }
});
