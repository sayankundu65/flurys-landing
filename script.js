/* ============================================
   FLURYS COFFEE - JavaScript
   Scroll animations, mobile nav, 
   and interactive elements
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation ---
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll(
    '.bestsellers__card, .heritage__left, .heritage__content, .social__item, .hero__images-row, .hero__text-btn-row, .hero__tagline-new, .hero__right-panel'
  );

  revealElements.forEach(el => {
    el.classList.add('fade-in-up');
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Staggered animation for grid items
        const delay = entry.target.closest('.bestsellers__grid, .social__grid')
          ? index * 100
          : 0;
        
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Header Scroll Effect ---
  const header = document.getElementById('main-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
      header.style.boxShadow = '0 2px 16px rgba(0, 0, 0, 0.06)';
    } else {
      header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // --- Image Lazy Load Enhancement ---
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (img.complete) {
      img.classList.add('img-loaded');
    } else {
      img.classList.add('img-loading');
      img.addEventListener('load', () => {
        img.classList.remove('img-loading');
        img.classList.add('img-loaded');
      });
      img.addEventListener('error', () => {
        img.classList.remove('img-loading');
        // Set a fallback background on error
        img.style.backgroundColor = '#ede8dd';
        img.style.opacity = '1';
      });
    }
  });

  // --- Product Card Interaction ---
  const productCards = document.querySelectorAll('.bestsellers__card');
  productCards.forEach(card => {
    card.addEventListener('click', () => {
      // Visual feedback
      card.style.transform = 'scale(0.97)';
      setTimeout(() => {
        card.style.transform = '';
      }, 150);
    });
  });

  // --- Social Grid Hover ---
  const socialItems = document.querySelectorAll('.social__item:not(.social__item--handle)');
  socialItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      socialItems.forEach(other => {
        if (other !== item) {
          other.style.opacity = '0.7';
        }
      });
    });
    item.addEventListener('mouseleave', () => {
      socialItems.forEach(other => {
        other.style.opacity = '1';
      });
    });
  });

});
