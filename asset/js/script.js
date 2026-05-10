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


  // ---------- Nav Active Link (pathname-based) ----------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === currentPage || (currentPage === '' && href === 'index.html'));
  });
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === currentPage || (currentPage === '' && href === 'index.html'));
  });


  // ---------- Scroll-triggered Glass Nav (hero page only) ----------
  const mainNav = document.getElementById('main-nav');
  if (mainNav && mainNav.classList.contains('nav') && !mainNav.classList.contains('models-nav')) {
    const onScroll = () => {
      mainNav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load in case page is already scrolled
  }


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
/* ============================================
   SPECS PAGE — Tab Switcher + Counter (Phase 3)
   ============================================ */

(function initSpecsPage() {

  const specsTabs = document.querySelectorAll('.specs-tab');
  if (!specsTabs.length) return; // Not on specs page

  // ---------- Full spec data for all 5 bikes ----------
  const specsData = [
    {
      bike: 'HUSQVARNA 701',
      hp: 74, torque: 73, weight: 149, tank: 13,
      engineType: '692cc LC4 single-cylinder, SOHC 4-valve',
      bore: '102 × 84.5 mm',
      compression: '12.5:1',
      fuel: 'EFI, ride-by-wire throttle',
      cooling: 'Liquid-cooled',
      power: '74 HP @ 8,000 rpm',
      torqueSpec: '73 Nm @ 6,500 rpm',
      topSpeed: '~200 km/h',
      frame: 'Chromoly steel trellis',
      weightSpec: '149 kg',
      seatHeight: '890 mm',
      tankSpec: '13 L',
      suspFront: 'WP APEX 43mm USD forks, 200mm travel',
      suspRear: 'WP APEX monoshock, fully adjustable',
      brakeFront: '320mm disc, Brembo radial 4-piston caliper',
      brakeRear: '240mm disc, single-piston caliper',
      abs: '2-channel Bosch cornering ABS',
      tyreFront: '120/70 ZR17 — Pirelli Diablo Rosso',
      tyreRear: '160/60 ZR17 — Pirelli Diablo Rosso',
      wheels: '17" front & rear',
    },
    {
      bike: 'KTM 690 SMC R',
      hp: 75, torque: 75, weight: 150, tank: 14,
      engineType: '693cc LC4 single-cylinder, SOHC 4-valve',
      bore: '102 × 84.5 mm',
      compression: '12.6:1',
      fuel: 'EFI, ride-by-wire + cornering ABS mapping',
      cooling: 'Liquid-cooled',
      power: '75 HP @ 7,500 rpm',
      torqueSpec: '75 Nm @ 6,000 rpm',
      topSpeed: '~195 km/h',
      frame: 'Chromoly steel trellis, CNC-machined',
      weightSpec: '150 kg',
      seatHeight: '885 mm',
      tankSpec: '14 L',
      suspFront: 'WP APEX 43mm USD forks, 200mm travel',
      suspRear: 'WP APEX PDS monoshock, fully adjustable',
      brakeFront: '320mm disc, Brembo 4-piston radial caliper',
      brakeRear: '240mm disc, single-piston caliper',
      abs: '2-channel Bosch cornering ABS + supermoto mode',
      tyreFront: '120/70 ZR17 — Pirelli Diablo Supercorsa',
      tyreRear: '160/60 ZR17 — Pirelli Diablo Supercorsa',
      wheels: '17" front & rear, lightweight alloy',
    },
    {
      bike: 'YAMAHA WR450F',
      hp: 63, torque: 52, weight: 118, tank: 7.6,
      engineType: '450cc DOHC 4-valve forward-inclined single',
      bore: '97 × 60.8 mm',
      compression: '12.8:1',
      fuel: 'EFI, dual injector system',
      cooling: 'Liquid-cooled',
      power: '63 HP @ 9,000 rpm',
      torqueSpec: '52 Nm @ 7,500 rpm',
      topSpeed: '~170 km/h (supermoto converted)',
      frame: 'Bilateral aluminium beam frame',
      weightSpec: '118 kg',
      seatHeight: '968 mm',
      tankSpec: '7.6 L',
      suspFront: 'Öhlins 48mm USD forks, 310mm travel',
      suspRear: 'Öhlins TTX monoshock, fully adjustable',
      brakeFront: '270mm disc, Brembo 2-piston caliper',
      brakeRear: '245mm disc, single-piston caliper',
      abs: 'None (race-spec)',
      tyreFront: '120/70 ZR17 — Bridgestone Battlax Hypersport',
      tyreRear: '160/60 ZR17 — Bridgestone Battlax Hypersport',
      wheels: '17" supermoto-spec alloy',
    },
    {
      bike: 'KAWASAKI KLX450R',
      hp: 58, torque: 46, weight: 118, tank: 7.6,
      engineType: '449cc liquid-cooled 4-stroke single, DOHC',
      bore: '96 × 62.1 mm',
      compression: '12.3:1',
      fuel: 'EFI, Keihin 44mm throttle body',
      cooling: 'Liquid-cooled',
      power: '58 HP @ 8,500 rpm',
      torqueSpec: '46 Nm @ 6,500 rpm',
      topSpeed: '~160 km/h (supermoto converted)',
      frame: 'Perimeter aluminium frame, high-tensile steel subframe',
      weightSpec: '118 kg',
      seatHeight: '985 mm',
      tankSpec: '7.6 L',
      suspFront: 'KYB 48mm inverted forks, 300mm travel',
      suspRear: 'KYB monoshock, 4-way adjustable',
      brakeFront: '270mm disc, Nissin 2-piston caliper',
      brakeRear: '240mm disc, single-piston caliper',
      abs: 'None (off-road/supermoto spec)',
      tyreFront: '120/70 ZR17 — Dunlop Sportmax Q4',
      tyreRear: '160/60 ZR17 — Dunlop Sportmax Q4',
      wheels: '17" supermoto alloy rims',
    },
    {
      bike: 'HONDA CRF450L',
      hp: 56, torque: 44, weight: 140, tank: 7.6,
      engineType: '450cc unicam 4-stroke single, DOHC 4-valve',
      bore: '96 × 62.1 mm',
      compression: '12.0:1',
      fuel: 'EFI, PGM-FI 46mm throttle body',
      cooling: 'Liquid-cooled',
      power: '56 HP @ 8,500 rpm',
      torqueSpec: '44 Nm @ 6,500 rpm',
      topSpeed: '~155 km/h (supermoto converted)',
      frame: 'Twin-spar aluminium frame',
      weightSpec: '140 kg',
      seatHeight: '905 mm',
      tankSpec: '7.6 L',
      suspFront: 'HMAS 49mm cartridge forks, 249mm travel',
      suspRear: 'HMAS Pro-Link monoshock, adjustable preload',
      brakeFront: '260mm disc, Nissin 2-piston caliper',
      brakeRear: '240mm disc, single-piston caliper',
      abs: 'Dual-channel ABS (road mode)',
      tyreFront: '120/70 ZR17 — Michelin Pilot Power 3',
      tyreRear: '160/60 ZR17 — Michelin Pilot Power 3',
      wheels: '17" cast alloy, supermoto conversion',
    },
  ];

  // ---------- Counter animation ----------
  const counters = document.querySelectorAll('.specs-counter');
  let countersAnimated = false;

  function animateCounters(data) {
    counters.forEach(counter => {
      const key = counter.dataset.target;
      const targetEl = counter.closest('.specs-hero-stat');
      const labelEl = targetEl ? targetEl.querySelector('.specs-hero-label') : null;

      // map label to data key
      let targetVal;
      if (labelEl) {
        const label = labelEl.textContent.trim();
        if (label === 'Peak Power') targetVal = data.hp;
        if (label === 'Max Torque') targetVal = data.torque;
        if (label === 'Dry Weight') targetVal = data.weight;
        if (label === 'Fuel Tank') targetVal = data.tank;
      }

      if (targetVal === undefined) return;

      const isDecimal = !Number.isInteger(targetVal);
      const start = 0;
      const end = targetVal;
      const duration = 900;
      const startTime = performance.now();

      function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * ease;
        counter.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
        if (progress < 1) requestAnimationFrame(tick);
        else counter.textContent = isDecimal ? end.toFixed(1) : end;
      }
      requestAnimationFrame(tick);
    });
  }

  // ---------- Tab switching ----------
  const colBike = document.getElementById('specs-col-bike');
  const specsTbody = document.getElementById('specs-tbody');

  const keyMap = {
    engineType: 'engineType', bore: 'bore', compression: 'compression',
    fuel: 'fuel', cooling: 'cooling',
    power: 'power', torque: 'torqueSpec', topSpeed: 'topSpeed',
    frame: 'frame', weight: 'weightSpec', seatHeight: 'seatHeight', tank: 'tankSpec',
    suspFront: 'suspFront', suspRear: 'suspRear',
    brakeFront: 'brakeFront', brakeRear: 'brakeRear', abs: 'abs',
    tyreFront: 'tyreFront', tyreRear: 'tyreRear', wheels: 'wheels',
  };

  function switchBike(index) {
    const data = specsData[index];
    if (!data) return;

    // Update column header
    if (colBike) colBike.textContent = data.bike;

    // Flash table values
    const valCells = specsTbody ? specsTbody.querySelectorAll('[data-key]') : [];
    valCells.forEach(cell => {
      cell.style.transition = 'opacity 0.2s ease';
      cell.style.opacity = '0';
    });

    setTimeout(() => {
      valCells.forEach(cell => {
        const key = cell.dataset.key;
        const dataKey = keyMap[key] || key;
        if (data[dataKey] !== undefined) cell.textContent = data[dataKey];
        cell.style.opacity = '1';
      });
      // Re-animate counters on tab switch
      animateCounters(data);
    }, 220);
  }

  specsTabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      specsTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      switchBike(i);
    });
  });

  // ---------- Scroll reveal for specs rows ----------
  const specsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, idx * 40);
        specsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.specs-row[data-reveal], .specs-hero-stat[data-reveal], .specs-download-cta[data-reveal]').forEach(el => {
    specsObserver.observe(el);
  });

  // Trigger counters when hero stats come into view
  const heroStatsEl = document.getElementById('specs-hero-stats');
  if (heroStatsEl) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters(specsData[0]);
          counterObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });
    counterObserver.observe(heroStatsEl);
  }

})();
/* ============================================
   GALLERY PAGE — Filter + Lightbox (Phase 4)
   ============================================ */

(function initGalleryPage() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  if (!filterBtns.length) return; // Not on gallery page

  const cards = Array.from(document.querySelectorAll('.gallery-card'));
  const countEl = document.getElementById('gallery-count-num');
  const emptyEl = document.getElementById('gallery-empty');

  // Lightbox elements
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTag = document.getElementById('lightbox-tag');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxPh = document.getElementById('lightbox-placeholder');
  const lightboxPhFile = document.getElementById('lightbox-ph-file');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxBd = document.getElementById('lightbox-backdrop');

  let filteredCards = [...cards];
  let lightboxIndex = 0;

  // ---------- Stagger reveal on load ----------
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(22px)';
    card.style.transition =
      `opacity 0.5s ease ${i * 0.07}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`;
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 80);
  });

  // ---------- Filter ----------
  const tagReadable = { onroad: 'ON ROAD', offroad: 'OFF ROAD', studio: 'STUDIO', race: 'RACE' };

  function applyFilter(filter) {
    filteredCards = [];
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
      if (match) filteredCards.push(card);
    });

    if (countEl) countEl.textContent = filteredCards.length;
    if (emptyEl) emptyEl.style.display = filteredCards.length === 0 ? 'block' : 'none';
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      applyFilter(btn.dataset.filter);
    });
  });

  // Initial state
  applyFilter('all');

  // ---------- Lightbox ----------
  function renderLightbox() {
    const card = filteredCards[lightboxIndex];
    if (!card) return;

    const imgEl = card.querySelector('.gallery-card-img img');
    const caption = card.dataset.caption || '';
    const catKey = card.dataset.category || '';
    const tag = tagReadable[catKey] || catKey.toUpperCase();

    if (lightboxTag) lightboxTag.textContent = tag;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    if (lightboxCounter) lightboxCounter.textContent =
      `${lightboxIndex + 1} / ${filteredCards.length}`;

    const hasImg = imgEl && imgEl.src && imgEl.style.display !== 'none';

    if (hasImg) {
      lightboxImg.src = imgEl.src;
      lightboxImg.alt = imgEl.alt || caption;
      lightboxImg.style.display = '';
      if (lightboxPh) lightboxPh.style.display = 'none';
    } else {
      lightboxImg.src = '';
      lightboxImg.style.display = 'none';
      if (lightboxPh) {
        lightboxPh.style.display = 'flex';
        const phFile = card.querySelector('.gallery-ph-file');
        if (lightboxPhFile && phFile) lightboxPhFile.textContent = phFile.textContent;
      }
    }
  }

  function openLightbox(card) {
    lightboxIndex = filteredCards.indexOf(card);
    if (lightboxIndex === -1) return;
    renderLightbox();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function navLightbox(dir) {
    if (!filteredCards.length) return;
    lightboxIndex = (lightboxIndex + dir + filteredCards.length) % filteredCards.length;
    renderLightbox();
  }

  // Card click opens lightbox
  cards.forEach(card => {
    card.addEventListener('click', () => openLightbox(card));
  });

  // Controls
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBd) lightboxBd.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => navLightbox(-1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => navLightbox(1));

  // Keyboard
  document.addEventListener('keydown', e => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') { e.preventDefault(); closeLightbox(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); navLightbox(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); navLightbox(1); }
  });

  // Touch swipe inside lightbox
  let lbTouchX = 0;
  if (lightbox) {
    lightbox.addEventListener('touchstart', e => {
      lbTouchX = e.changedTouches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener('touchend', e => {
      const diff = lbTouchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) navLightbox(diff > 0 ? 1 : -1);
    }, { passive: true });
  }

})();
/* ============================================
   CONTACT PAGE — Form Validation + Submit (Phase 5)
   ============================================ */

(function initContactPage() {
  if (!document.querySelector('.contact-page')) return;

  // ---------- [data-reveal] scroll entrance ----------
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger: info panel first, form second
          const delay = entry.target.classList.contains('contact-info') ? 0 : 120;
          setTimeout(() => entry.target.classList.add('revealed'), delay);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));
  }

  // ---------- Elements ----------
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit');
  const spinner = document.getElementById('form-spinner');
  const successEl = document.getElementById('contact-success');
  const resetBtn = document.getElementById('contact-success-reset');

  if (!form) return;

  const fields = {
    name: { el: document.getElementById('field-name'), err: document.getElementById('error-name') },
    email: { el: document.getElementById('field-email'), err: document.getElementById('error-email') },
    phone: { el: document.getElementById('field-phone'), err: document.getElementById('error-phone') },
    model: { el: document.getElementById('field-model'), err: document.getElementById('error-model') },
    message: { el: document.getElementById('field-message'), err: document.getElementById('error-message') },
  };

  // ---------- Validation rules ----------
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRx = /^[\d\s\+\-\(\)\.]{7,20}$/;

  function validate() {
    let ok = true;

    const checks = [
      {
        key: 'name',
        test: () => fields.name.el.value.trim().length >= 2,
        msg: 'Please enter your name.',
      },
      {
        key: 'email',
        test: () => emailRx.test(fields.email.el.value.trim()),
        msg: 'Please enter a valid email address.',
      },
      {
        key: 'phone',
        test: () => {
          const v = fields.phone.el.value.trim();
          return v === '' || phoneRx.test(v); // optional
        },
        msg: 'Enter a valid phone number, or leave blank.',
      },
      {
        key: 'model',
        test: () => fields.model.el.value !== '',
        msg: 'Please select a model or inquiry type.',
      },
      {
        key: 'message',
        test: () => fields.message.el.value.trim().length >= 10,
        msg: 'Please enter a message (10+ characters).',
      },
    ];

    checks.forEach(({ key, test, msg }) => {
      if (!test()) {
        showError(fields[key], msg);
        ok = false;
      } else {
        clearError(fields[key]);
      }
    });

    return ok;
  }

  function showError({ el, err }, msg) {
    el.classList.add('error');
    err.textContent = msg;
    err.classList.add('visible');
  }

  function clearError({ el, err }) {
    el.classList.remove('error');
    err.textContent = '';
    err.classList.remove('visible');
  }

  // Clear error live as the user types / changes
  Object.values(fields).forEach(({ el, err }) => {
    const evts = el.tagName === 'SELECT' ? ['change'] : ['input', 'change'];
    evts.forEach(evt => el.addEventListener(evt, () => {
      if (el.classList.contains('error')) clearError({ el, err });
    }));
  });

  // ---------- Submit ----------
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) {
      // Focus first errored field
      const first = Object.values(fields).find(f => f.el.classList.contains('error'));
      if (first) first.el.focus();
      return;
    }

    // Submitting state
    submitBtn.classList.add('submitting');

    // Simulate async send (~1.4 s)
    setTimeout(() => {
      form.style.display = 'none';
      successEl.hidden = false;
      submitBtn.classList.remove('submitting');
    }, 1400);
  });

  // ---------- Reset ----------
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      Object.values(fields).forEach(f => clearError(f));
      successEl.hidden = true;
      form.style.display = '';
      if (fields.name.el) fields.name.el.focus();
    });
  }

})();