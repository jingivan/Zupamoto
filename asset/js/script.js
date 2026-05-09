/* ============================================
   SUPERMOTO — Interactive Script
   Phase 1 Complete
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Preloader ----------
  const preloader = document.getElementById('preloader');

  window.addEventListener('load', () => {
    setTimeout(() => { preloader.classList.add('hidden'); }, 1600);
  });
  setTimeout(() => { preloader.classList.add('hidden'); }, 3000);


  // ---------- Per-Bike Data ----------
  const bikeData = [
    {
      brand: 'HUSQVARNA', model: '701 SUPERMOTO',
      tagline1: 'Born from the dirt.', tagline2: 'Perfected on asphalt.',
      engine: 'High-torque 692cc single-cylinder, tuned for instant throttle response.',
      tires: '17-inch wheels with Pirelli Diablo Rosso tires and adjustable WP Apex forks.',
      weight: 'Ultra-lightweight frame at just 149 kg — razor-sharp in every corner.',
    },
    {
      brand: 'KTM', model: '690 SMC R',
      tagline1: 'Ready to race.', tagline2: 'Ready for anything.',
      engine: '693cc LC4 single-cylinder with ride-by-wire and cornering ABS.',
      tires: 'Supermoto-spec 17-inch wheels with WP APEX suspension, fully adjustable.',
      weight: 'Race-bred chassis at 150 kg dry — dominates every urban canyon.',
    },
    {
      brand: 'YAMAHA', model: 'WR450F SUPERMOTO',
      tagline1: 'Track precision.', tagline2: 'Street soul.',
      engine: '450cc DOHC 4-valve, cross-plane crankshaft for linear, addictive power.',
      tires: '17-inch supermoto hoops with Ohlins TTX forks front and rear.',
      weight: 'Featherlight at 118 kg — the tightest turning circle in the segment.',
    },
    {
      brand: 'KAWASAKI', model: 'KLX450R SUPERMOTO',
      tagline1: 'Raw. Relentless.', tagline2: 'Unstoppable.',
      engine: '449cc liquid-cooled single-cylinder with revised cam timing for street use.',
      tires: 'Street-biased 17-inch rubber with inverted KYB front forks.',
      weight: 'Aggressive 118 kg platform — turn-in speed that defies logic.',
    },
    {
      brand: 'HONDA', model: 'CRF450L SUPERMOTO',
      tagline1: 'Engineered to thrill.', tagline2: 'Built to last.',
      engine: '450cc unicam 4-stroke, street-tuned with dual exhaust compatibility.',
      tires: 'Dual-sport 17-inch setup with HMAS cartridge front forks.',
      weight: 'Proven 140 kg platform — reliability meets razor-sharp street agility.',
    },
  ];


  // ---------- Carousel ----------
  const bikeImages = document.querySelectorAll('.bike-image');
  const dots = document.querySelectorAll('.carousel-dot');
  const bikeIndicator = document.getElementById('bike-indicator');
  const bikeBrand = document.getElementById('bike-brand');
  const bikeModel = document.getElementById('bike-model');
  const tagLine1 = document.getElementById('tagline-line-1');
  const tagLine2 = document.getElementById('tagline-line-2');
  const featEngine = document.getElementById('feat-engine-text');
  const featTires = document.getElementById('feat-tires-text');
  const featWeight = document.getElementById('feat-weight-text');
  const bgTextContent = document.getElementById('bg-text-content');
  const arrowLeft = document.getElementById('carousel-left');
  const arrowRight = document.getElementById('carousel-right');

  let currentBikeIndex = 0;
  let isTransitioning = false;

  const fadeEls = [tagLine1, tagLine2, featEngine, featTires, featWeight].filter(Boolean);

  function updateCarousel(newIndex) {
    if (isTransitioning || newIndex === currentBikeIndex) return;
    isTransitioning = true;
    currentBikeIndex = newIndex;
    const data = bikeData[currentBikeIndex];

    // Swap images
    bikeImages.forEach((img, i) => img.classList.toggle('active', i === currentBikeIndex));

    // Sync dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentBikeIndex);
      dot.setAttribute('aria-selected', String(i === currentBikeIndex));
    });

    // Indicator transition
    if (bikeIndicator) {
      bikeIndicator.classList.add('transitioning');
      setTimeout(() => {
        bikeBrand.textContent = data.brand;
        bikeModel.textContent = data.model;
        bikeIndicator.classList.remove('transitioning');
      }, 300);
    }

    // Fade out content, swap, fade in
    fadeEls.forEach(el => { el.style.transition = 'opacity 0.3s ease'; el.style.opacity = '0'; });
    setTimeout(() => {
      if (tagLine1) tagLine1.textContent = data.tagline1;
      if (tagLine2) tagLine2.textContent = data.tagline2;
      if (featEngine) featEngine.textContent = data.engine;
      if (featTires) featTires.textContent = data.tires;
      if (featWeight) featWeight.textContent = data.weight;
      if (bgTextContent) bgTextContent.textContent = data.brand;
      fadeEls.forEach(el => { el.style.opacity = '1'; });
    }, 320);

    setTimeout(() => { isTransitioning = false; }, 700);
  }

  function goNext() { updateCarousel((currentBikeIndex + 1) % bikeImages.length); }
  function goPrev() { updateCarousel((currentBikeIndex - 1 + bikeImages.length) % bikeImages.length); }

  function pulseArrow(el) {
    if (!el) return;
    el.style.transform = 'scale(0.88)';
    setTimeout(() => { el.style.transform = 'scale(1)'; }, 150);
  }

  if (arrowLeft) arrowLeft.addEventListener('click', () => { pulseArrow(arrowLeft); goPrev(); });
  if (arrowRight) arrowRight.addEventListener('click', () => { pulseArrow(arrowRight); goNext(); });

  dots.forEach((dot, i) => dot.addEventListener('click', () => updateCarousel(i)));

  // Arrow key nav
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { pulseArrow(arrowLeft); goPrev(); }
    if (e.key === 'ArrowRight') { pulseArrow(arrowRight); goNext(); }
  });

  // Swipe support
  let touchStartX = 0;
  document.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
  }, { passive: true });

  // Init indicator text
  if (bikeBrand) bikeBrand.textContent = bikeData[0].brand;
  if (bikeModel) bikeModel.textContent = bikeData[0].model;


  // ---------- Parallax on Mouse Move ----------
  const bgText = document.querySelector('.bg-text span');
  let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animateParallax() {
    currentX += (mouseX - currentX) * 0.06;
    currentY += (mouseY - currentY) * 0.06;
    bikeImages.forEach(img => {
      img.style.setProperty('--px', `${currentX * 12}px`);
      img.style.setProperty('--py', `${currentY * 8}px`);
    });
    if (bgText) bgText.style.transform = `translate(${currentX * -20}px, ${currentY * -10}px)`;
    requestAnimationFrame(animateParallax);
  }

  if (!('ontouchstart' in window)) requestAnimationFrame(animateParallax);


  // ---------- Feature Column Hover ----------
  document.querySelectorAll('.feature-col').forEach(col => {
    col.addEventListener('mouseenter', () => col.classList.add('hovered'));
    col.addEventListener('mouseleave', () => col.classList.remove('hovered'));
  });


  // ---------- Scroll Reveal ----------
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));


  // ---------- Mobile Drawer ----------
  const hamburger = document.getElementById('nav-hamburger');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-menu-overlay');
  const drawerClose = document.getElementById('mobile-drawer-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    mobileOverlay.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    mobileOverlay.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNavLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });


  // ---------- Nav Active Link ----------
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href') === '#') e.preventDefault();
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });


  // ---------- Dynamic Spotlight ----------
  const spotlight = document.querySelector('.hero-spotlight');
  if (spotlight && !('ontouchstart' in window)) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth * 100).toFixed(1);
      const y = (e.clientY / window.innerHeight * 100).toFixed(1);
      spotlight.style.background = `radial-gradient(ellipse 60% 55% at ${x}% ${y}%, rgba(255,255,255,0.04) 0%, rgba(0,229,255,0.015) 30%, transparent 70%)`;
    });
  }

});

/* ============================================
   MODELS PAGE — Filter Logic (Phase 2)
   ============================================ */

(function initModelsPage() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modelCards = document.querySelectorAll('.model-card');
  const emptyState = document.getElementById('models-empty');

  if (!filterBtns.length) return; // Not on models page

  // Stagger card reveal on load
  modelCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(28px)';
    card.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`;
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100);
  });

  function filterCards(brand) {
    let visibleCount = 0;

    modelCards.forEach((card) => {
      const cardBrand = card.dataset.brand;
      const show = brand === 'all' || cardBrand === brand;

      if (show) {
        card.style.display = '';
        card.classList.remove('hidden');
        visibleCount++;
        // Small re-reveal animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 30);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        setTimeout(() => {
          card.style.display = 'none';
          card.classList.add('hidden');
        }, 400);
      }
    });

    // Empty state
    if (emptyState) {
      emptyState.classList.toggle('visible', visibleCount === 0);
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      filterCards(btn.dataset.filter);
    });
  });
})();