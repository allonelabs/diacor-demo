/* ============================================
   DIACOR CLINIC — Demo JavaScript
   ============================================ */

// --- Dark Mode (runs before DOMContentLoaded to prevent flash) ---
(function() {
  var savedTheme = localStorage.getItem('diacor_theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

document.addEventListener('DOMContentLoaded', function () {

  // --- Dark Mode Toggle ---
  var themeToggle = document.querySelectorAll('.theme-toggle');

  themeToggle.forEach(function(btn) {
    btn.addEventListener('click', function () {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('diacor_theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('diacor_theme', 'dark');
      }
      // Update all toggle icons
      document.querySelectorAll('.theme-toggle i').forEach(function(icon) {
        icon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
      });
    });
  });

  // Set correct icon on load
  var isDarkOnLoad = document.documentElement.getAttribute('data-theme') === 'dark';
  document.querySelectorAll('.theme-toggle i').forEach(function(icon) {
    icon.className = isDarkOnLoad ? 'fas fa-sun' : 'fas fa-moon';
  });

  // --- Mobile Navigation ---
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      mobileOverlay.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }

  // --- Hero Slider ---
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevArrow = document.querySelector('.hero-arrow-prev');
  const nextArrow = document.querySelector('.hero-arrow-next');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function startSlider() {
    if (slides.length <= 1) return;
    slideInterval = setInterval(function () {
      goToSlide(currentSlide + 1);
    }, 5000);
  }

  function resetSlider() {
    clearInterval(slideInterval);
    startSlider();
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      goToSlide(i);
      resetSlider();
    });
  });

  if (prevArrow) {
    prevArrow.addEventListener('click', function () {
      goToSlide(currentSlide - 1);
      resetSlider();
    });
  }

  if (nextArrow) {
    nextArrow.addEventListener('click', function () {
      goToSlide(currentSlide + 1);
      resetSlider();
    });
  }

  startSlider();

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        var isActive = item.classList.contains('active');
        faqItems.forEach(function (fi) {
          fi.classList.remove('active');
        });
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Auto-open first FAQ item
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
  }

  // --- Doctor Search & Filter ---
  var doctorSearch = document.querySelector('.team-search input');
  var doctorFilter = document.querySelector('.team-filter-select');
  var doctorCards = document.querySelectorAll('.doctor-card');

  function filterDoctors() {
    var searchTerm = doctorSearch ? doctorSearch.value.toLowerCase() : '';
    var filterValue = doctorFilter ? doctorFilter.value.toLowerCase() : '';

    doctorCards.forEach(function (card) {
      var name = (card.getAttribute('data-name') || '').toLowerCase();
      var specialty = (card.getAttribute('data-specialty') || '').toLowerCase();
      var matchesSearch = !searchTerm || name.includes(searchTerm) || specialty.includes(searchTerm);
      var matchesFilter = !filterValue || specialty.includes(filterValue);
      card.style.display = (matchesSearch && matchesFilter) ? '' : 'none';
    });
  }

  if (doctorSearch) {
    doctorSearch.addEventListener('input', filterDoctors);
  }

  if (doctorFilter) {
    doctorFilter.addEventListener('change', filterDoctors);
  }

  // --- Scroll to Top ---
  var scrollTopBtn = document.querySelector('.scroll-top');

  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Cookie Banner ---
  var cookieBanner = document.querySelector('.cookie-banner');
  var cookieAccept = document.querySelector('.cookie-accept');
  var cookieDecline = document.querySelector('.cookie-decline');

  if (cookieBanner && !localStorage.getItem('diacor_cookies')) {
    setTimeout(function () {
      cookieBanner.classList.add('active');
    }, 1000);
  }

  if (cookieAccept) {
    cookieAccept.addEventListener('click', function () {
      localStorage.setItem('diacor_cookies', 'accepted');
      cookieBanner.classList.remove('active');
    });
  }

  if (cookieDecline) {
    cookieDecline.addEventListener('click', function () {
      localStorage.setItem('diacor_cookies', 'declined');
      cookieBanner.classList.remove('active');
    });
  }

  // --- Contact Form (demo) ---
  var contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('გმადლობთ! თქვენი შეტყობინება მიღებულია. (Thank you! Your message has been received.)');
      contactForm.reset();
    });
  }

  // ============================================
  // NEW FEATURES — Redesign
  // ============================================

  // --- Scroll Animations (IntersectionObserver) ---
  var animateElements = document.querySelectorAll('.animate-on-scroll');

  if (animateElements.length > 0 && 'IntersectionObserver' in window) {
    var animateObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.getAttribute('data-delay');
          if (delay) {
            entry.target.style.transitionDelay = delay + 'ms';
          }
          entry.target.classList.add('is-visible');
          animateObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    animateElements.forEach(function (el) {
      animateObserver.observe(el);
    });
  } else {
    // Fallback: show all immediately
    animateElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // --- Counter Animation ---
  var statNumbers = document.querySelectorAll('.stat-number[data-count-to]');

  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count-to'), 10);
          var duration = 1500;
          var start = 0;
          var startTime = null;

          function animateCount(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var current = Math.floor(progress * target);
            el.textContent = current;
            if (progress < 1) {
              requestAnimationFrame(animateCount);
            } else {
              el.textContent = target;
            }
          }

          requestAnimationFrame(animateCount);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  // --- Header Scroll Effect ---
  var header = document.querySelector('.header');
  var utilityBar = document.querySelector('.utility-bar');
  var lastScrollY = 0;

  if (header) {
    window.addEventListener('scroll', function () {
      var currentScrollY = window.scrollY;

      // Add shadow on scroll
      if (currentScrollY > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }

      // Hide/show utility bar on scroll direction
      if (utilityBar) {
        if (currentScrollY > 150 && currentScrollY > lastScrollY) {
          utilityBar.classList.add('utility-bar--hidden');
        } else {
          utilityBar.classList.remove('utility-bar--hidden');
        }
      }

      lastScrollY = currentScrollY;
    });
  }

  // --- Expandable Sections (Value Cards, Doctor Profiles) ---
  var expandableWrappers = document.querySelectorAll('.expandable-wrapper');

  expandableWrappers.forEach(function (wrapper) {
    wrapper.addEventListener('click', function (e) {
      // Don't toggle if clicking a link inside
      if (e.target.tagName === 'A' || e.target.closest('a')) return;

      var isActive = wrapper.classList.contains('active');
      // Close all siblings
      expandableWrappers.forEach(function (w) {
        w.classList.remove('active');
      });
      if (!isActive) {
        wrapper.classList.add('active');
      }
    });
  });

  // --- Service Expand Cards ---
  var serviceExpandCards = document.querySelectorAll('.service-expand-card');

  serviceExpandCards.forEach(function (card) {
    var header = card.querySelector('.service-expand-header');
    if (header) {
      header.addEventListener('click', function () {
        var isActive = card.classList.contains('active');
        serviceExpandCards.forEach(function (c) {
          c.classList.remove('active');
        });
        if (!isActive) {
          card.classList.add('active');
        }
      });
    }
  });

  // --- Doctor Profile Expand ---
  var doctorProfileLinks = document.querySelectorAll('.doctor-link');

  doctorProfileLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var card = link.closest('.doctor-card');
      if (card) {
        var isExpanded = card.classList.contains('expanded');
        // Close all
        document.querySelectorAll('.doctor-card.expanded').forEach(function (c) {
          c.classList.remove('expanded');
        });
        if (!isExpanded) {
          card.classList.add('expanded');
        }
      }
    });
  });

  // --- Filter Pills ---
  var filterPillContainers = document.querySelectorAll('.filter-pills');

  filterPillContainers.forEach(function (container) {
    var pills = container.querySelectorAll('.filter-pill');
    var targetSelector = container.getAttribute('data-target');
    var targets = targetSelector ? document.querySelectorAll(targetSelector) : [];

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        // Update active pill
        pills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');

        var filterValue = pill.getAttribute('data-filter').toLowerCase();

        targets.forEach(function (target) {
          if (!filterValue) {
            target.style.display = '';
          } else {
            var data = (target.getAttribute('data-category') || target.getAttribute('data-specialty') || '').toLowerCase();
            target.style.display = data.includes(filterValue) ? '' : 'none';
          }
        });
      });
    });
  });

  // --- FAQ Search Filter ---
  var faqSearchInput = document.querySelector('.faq-search input');

  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', function () {
      var term = faqSearchInput.value.toLowerCase();
      var items = document.querySelectorAll('.faq-item');
      var categories = document.querySelectorAll('.faq-category-title');

      items.forEach(function (item) {
        var questionText = (item.querySelector('.faq-question span') || item.querySelector('.faq-question')).textContent.toLowerCase();
        var answerText = (item.querySelector('.faq-answer') || {}).textContent || '';
        answerText = answerText.toLowerCase();
        item.style.display = (!term || questionText.includes(term) || answerText.includes(term)) ? '' : 'none';
      });

      // Hide category titles if all their items are hidden
      categories.forEach(function (cat) {
        var nextItems = [];
        var sibling = cat.nextElementSibling;
        while (sibling && !sibling.classList.contains('faq-category-title')) {
          if (sibling.classList.contains('faq-item')) nextItems.push(sibling);
          sibling = sibling.nextElementSibling;
        }
        var anyVisible = nextItems.some(function (item) { return item.style.display !== 'none'; });
        cat.style.display = anyVisible ? '' : 'none';
      });
    });
  }

  // --- Service Nav Scroll Spy ---
  var serviceNavLinks = document.querySelectorAll('.services-nav-link');
  var serviceTargets = [];

  serviceNavLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      var target = document.querySelector(href);
      if (target) {
        serviceTargets.push({ link: link, target: target });

        link.addEventListener('click', function (e) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    }
  });

  if (serviceTargets.length > 0) {
    var spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          serviceNavLinks.forEach(function (l) { l.classList.remove('active'); });
          var match = serviceTargets.find(function (s) { return s.target === entry.target; });
          if (match) match.link.classList.add('active');
        }
      });
    }, {
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0
    });

    serviceTargets.forEach(function (s) {
      spyObserver.observe(s.target);
    });
  }

});
