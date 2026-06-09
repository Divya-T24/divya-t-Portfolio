const cursor = document.querySelector('.cursor-dot');

const links = document.querySelectorAll(
  'a, .project-actions a, .resume-btn, .nav-link'
);

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

/* PAGE LOAD */

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

/* CUSTOM CURSOR */

window.addEventListener('mousemove', event => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

/* CURSOR HOVER */

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    cursor.classList.add('link-hover');
  });

  link.addEventListener('mouseleave', () => {
    cursor.classList.remove('link-hover');
  });
});

/* ACTIVE NAVIGATION ON SCROLL */

window.addEventListener('scroll', () => {

  let current = '';

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }

  });

  navLinks.forEach(link => {

    link.classList.remove('active');

    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }

  });

});
