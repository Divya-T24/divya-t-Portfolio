const cursor = document.querySelector('.cursor-dot');
const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const links = document.querySelectorAll('a');
const sections = [...document.querySelectorAll('.section[id]')];
const navLinks = [...document.querySelectorAll('.nav-link')];

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

if (cursor && hasFinePointer) {
  window.addEventListener('mousemove', event => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.classList.add('is-visible');
  });

  document.documentElement.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-visible', 'link-hover');
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cursor.classList.remove('is-visible', 'link-hover');
    }
  });

  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursor.classList.add('link-hover');
    });

    link.addEventListener('mouseleave', () => {
      cursor.classList.remove('link-hover');
    });
  });
}

function updateActiveNavigation() {
  if (!sections.length || !navLinks.length) return;

  const threshold = document.querySelector('.top-bar').offsetHeight + 24;
  let current = sections[0].id;

  sections.forEach(section => {
    if (section.getBoundingClientRect().top <= threshold) {
      current = section.id;
    }
  });

  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    current = sections[sections.length - 1].id;
  }

  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

window.addEventListener('scroll', updateActiveNavigation, { passive: true });
window.addEventListener('resize', updateActiveNavigation);
updateActiveNavigation();
