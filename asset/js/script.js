/* ============================================
   SUPERMOTO — Interactive Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Preloader ----------
  const preloader = document.getElementById('preloader');

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1600);
  });

  // Fallback: hide preloader after 3s regardless
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 3000);


  // ---------- Subtle Parallax on Mouse Move ----------
  const heroBike = document.getElementById('hero-bike');
  const bikeImages = document.querySelectorAll('.bike-image');
  const bgText = document.querySelector('.bg-text span');

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    mouseX = (e.clientX / innerWidth - 0.5) * 2;  // -1 to 1
    mouseY = (e.clientY / innerHeight - 0.5) * 2;
  });

  function animateParallax() {
    // Smooth interpolation
    currentX += (mouseX - currentX) * 0.06;
    currentY += (mouseY - currentY) * 0.06;

    if (bikeImages) {
      const moveX = currentX * 12;
      const moveY = currentY * 8;
      bikeImages.forEach(img => {
        img.style.setProperty('--px', `${moveX}px`);
        img.style.setProperty('--py', `${moveY}px`);
      });
    }

    if (bgText) {
      const moveX = currentX * -20;
      const moveY = currentY * -10;
      bgText.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    requestAnimationFrame(animateParallax);
  }

  // Only apply parallax on non-touch devices
  if (!('ontouchstart' in window)) {
    requestAnimationFrame(animateParallax);
  }


  // ---------- Feature Column Hover: Number Glow ----------
  const featureCols = document.querySelectorAll('.feature-col');

  featureCols.forEach(col => {
    col.addEventListener('mouseenter', () => {
      col.classList.add('hovered');
    });
    col.addEventListener('mouseleave', () => {
      col.classList.remove('hovered');
    });
  });


  // ---------- Carousel Arrow Click Effect ----------
  const arrowLeft = document.getElementById('carousel-left');
  const arrowRight = document.getElementById('carousel-right');

  function pulseArrow(el) {
    el.style.transform = 'scale(0.9)';
    setTimeout(() => {
      el.style.transform = 'scale(1)';
    }, 150);
  }

  let currentBikeIndex = 0;

  function updateCarousel() {
    if (!bikeImages) return;
    bikeImages.forEach((img, index) => {
      if (index === currentBikeIndex) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });
  }

  if (arrowLeft) {
    arrowLeft.addEventListener('click', () => {
      pulseArrow(arrowLeft);
      if (bikeImages.length > 0) {
        currentBikeIndex = (currentBikeIndex - 1 + bikeImages.length) % bikeImages.length;
        updateCarousel();
      }
    });
  }

  if (arrowRight) {
    arrowRight.addEventListener('click', () => {
      pulseArrow(arrowRight);
      if (bikeImages.length > 0) {
        currentBikeIndex = (currentBikeIndex + 1) % bikeImages.length;
        updateCarousel();
      }
    });
  }


  // ---------- Smooth Scroll Reveal (for future sections) ----------
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-reveal]').forEach(el => {
    observer.observe(el);
  });


  // ---------- Nav Link Active State ----------
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });


  // ---------- Dynamic Spotlight Follow ----------
  const spotlight = document.querySelector('.hero-spotlight');

  if (spotlight && !('ontouchstart' in window)) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth * 100).toFixed(1);
      const y = (e.clientY / window.innerHeight * 100).toFixed(1);
      spotlight.style.background = `radial-gradient(
        ellipse 60% 55% at ${x}% ${y}%,
        rgba(255, 255, 255, 0.04) 0%,
        rgba(0, 229, 255, 0.015) 30%,
        transparent 70%
      )`;
    });
  }

});
