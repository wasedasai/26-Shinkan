document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.querySelector('.saikun-menu');
    const closeBtn = document.querySelector('.menu-close');
    const slideMenu = document.querySelector('.open-menu');

    openBtn.addEventListener('click', () => {
        slideMenu.classList.add('is-open');
    });
    closeBtn.addEventListener('click', () => {
        slideMenu.classList.remove('is-open');
    });
    const sections = document.querySelectorAll('section');
    const mainTitle = document.getElementById('main-title');
    const navLinks = document.querySelectorAll('.nav-link');
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const newTitle = entry.target.getAttribute('data-title');
          const currentSectionId = entry.target.getAttribute('id');
          if (mainTitle.textContent !== newTitle) {
            mainTitle.classList.add('is-hidden');
            setTimeout(() => {
              mainTitle.textContent = newTitle;
              mainTitle.classList.remove('is-hidden');
            }, 400);
          }
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);
    sections.forEach(sec => observer.observe(sec));
    const sidebar = document.querySelector('.sidebar');
    const heroArea = document.querySelector('.hero');
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                sidebar.classList.add('is-visible');
            } else {
                sidebar.classList.remove('is-visible');
            }
        });
    }, {
        rootMargin: '-10% 0px 0px 0px' 
    });
    if (heroArea) {
        heroObserver.observe(heroArea);
    }
});