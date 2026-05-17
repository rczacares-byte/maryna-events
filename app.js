/*
  Maryna Events - App Engine
  Interactividad general
*/

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // HERO: 3D Parallax Hover Effect
    // ============================================================
    (function initHero3D() {
        const heroSection = document.getElementById('hero');
        const logoWrapper = document.getElementById('logo-3d-wrapper');

        if (!heroSection || !logoWrapper) return;

        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            // Calculate center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate offset from center (-1 to 1)
            const offsetX = (x - centerX) / centerX;
            const offsetY = (y - centerY) / centerY;

            // Max rotation degrees
            const maxTilt = 15;

            const tiltX = -offsetY * maxTilt;
            const tiltY = offsetX * maxTilt;

            logoWrapper.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            logoWrapper.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    })();







    // ============================================================
    // NAVEGACIÓN: visible inmediatamente + transparente sobre hero
    // ============================================================
    const mainNav = document.querySelector('.main-nav');
    if (mainNav) {
        mainNav.style.setProperty('--nav-opacity', '1');

        // Al salir del hero (80px scroll), el nav se vuelve sólido rosa
        const updateNavScroll = () => {
            if (window.scrollY > 80) {
                mainNav.classList.add('scrolled');
            } else {
                mainNav.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', updateNavScroll, { passive: true });
        updateNavScroll(); // Para manejar refresh en el medio de la página
    }

    // ============================================================
    // SCROLL REVEAL para secciones inferiores
    // ============================================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll(
        '.fade-in-up, .slide-in-right, .feature-card, .features-header, ' +
        '.services-header, .services-interactive, .experience-header, ' +
        '.timeline-container, .timeline-item, .cta-container, ' +
        '.footer-brand, .footer-links, .footer-contact, .masonry-gallery'
    );
    fadeElements.forEach(el => revealObserver.observe(el));

    // ============================================================
    // PESTAÑAS INTERACTIVAS (Servicios)
    // ============================================================
    const serviceTabs = document.querySelectorAll('.service-tab');
    const servicePanels = document.querySelectorAll('.service-panel');

    serviceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            serviceTabs.forEach(t => t.classList.remove('active'));
            servicePanels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId)?.classList.add('active');
        });
    });

    // ============================================================
    // GALERÍA MASONRY — Filtros
    // ============================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => item.classList.add('hide'), 400);
                }
            });
        });
    });

    // ============================================================
    // LIGHTBOX
    // ============================================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.gallery-img');
            const title = item.querySelector('.gallery-title');
            if (img && lightboxImg) {
                lightboxImg.src = img.src;
                lightboxCaption.textContent = title?.textContent ?? '';
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeLightbox = () => {
        lightbox?.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => { if (lightboxImg) lightboxImg.src = ''; }, 300);
    };

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && lightbox?.classList.contains('active')) closeLightbox();
    });

    // ============================================================
    // MENÚ HAMBURGUESA (móvil)
    // ============================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

});
