/* ============================================
   EURL DAY PHARM - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation ---
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('nav__overlay');
    document.body.appendChild(overlay);

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show');
            overlay.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    function closeMenu() {
        navMenu.classList.remove('show');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    if (navClose) {
        navClose.addEventListener('click', closeMenu);
    }

    overlay.addEventListener('click', closeMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- Active Navigation Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollActive);

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');

    function scrollHeader() {
        if (window.scrollY >= 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', scrollHeader);

    // --- Scroll Up Button ---
    const scrollUp = document.getElementById('scroll-up');

    function scrollUpFunc() {
        if (window.scrollY >= 400) {
            scrollUp.classList.add('show');
        } else {
            scrollUp.classList.remove('show');
        }
    }

    window.addEventListener('scroll', scrollUpFunc);

    if (scrollUp) {
        scrollUp.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Counter Animation ---
    const statsNumbers = document.querySelectorAll('.stats__number');

    function animateCounters() {
        statsNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };

            updateCounter();
        });
    }

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');

                // Trigger counter animation when stats section is visible
                if (entry.target.closest('.stats')) {
                    animateCounters();
                }

                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.stats__item, .produit__card, .contact__card, .apropos__content, .apropos__image'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(el);
    });

    // --- Smooth Scroll for All Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Logo Fallback ---
    const logoImages = document.querySelectorAll('.nav__logo-img, .footer__logo');
    logoImages.forEach(img => {
        img.onerror = function() {
            this.style.display = 'none';
        };
    });

});
