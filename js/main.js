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

  // ============================================
  // BOOKING MODAL — fake but convincing flow
  // ============================================
  (function initBookingModal() {
    var isEN = document.documentElement.lang === 'en';

    var T = isEN ? {
      title: 'Book an Appointment',
      step: 'Step',
      of: 'of',
      pickService: 'Choose a service',
      pickDoctor: 'Choose a doctor',
      pickDate: 'Pick a date and time',
      yourDetails: 'Your details',
      name: 'Full name',
      phone: 'Phone number',
      namePh: 'e.g. Nino Beridze',
      phonePh: '+995 5XX XX XX XX',
      back: 'Back',
      next: 'Continue',
      confirm: 'Confirm Booking',
      successTitle: 'Booking Confirmed!',
      successText: 'We\'ve sent the details to your phone. Our team will call you to confirm shortly.',
      summaryService: 'Service',
      summaryDoctor: 'Doctor',
      summaryDate: 'Date & time',
      anyDoctor: 'Any available doctor',
      noSlots: 'No slots',
      services: [
        { id: 'endo', icon: 'fa-disease', label: 'Endocrinology' },
        { id: 'card', icon: 'fa-heartbeat', label: 'Cardiology' },
        { id: 'pulm', icon: 'fa-lungs', label: 'Pulmonology' },
        { id: 'lab',  icon: 'fa-flask', label: 'Laboratory' },
        { id: 'opht', icon: 'fa-eye', label: 'Ophthalmology' },
        { id: 'check', icon: 'fa-shield-alt', label: 'Health Checkup' }
      ],
      doctors: {
        endo: [
          { name: 'Prof. Ramaz Kurashvili', spec: 'Endocrinologist · Director' },
          { name: 'Lali Nikoleishvili', spec: 'Endocrinologist · Founder' },
          { name: 'Ketevan Bandzava', spec: 'Endocrinologist' }
        ],
        card: [ { name: 'Giorgi Tatishvili', spec: 'Cardiologist' } ],
        pulm: [ { name: 'Elene Sherozia', spec: 'Pulmonologist · Founder' } ],
        lab:  [ { name: 'Lab team', spec: 'No appointment needed' } ],
        opht: [ { name: 'Nino Kvaratskhelia', spec: 'Ophthalmologist' } ],
        check:[ { name: 'Multidisciplinary team', spec: 'Comprehensive checkup' } ]
      },
      days: ['SUN','MON','TUE','WED','THU','FRI','SAT']
    } : {
      title: 'ვიზიტის ჩაწერა',
      step: 'ნაბიჯი',
      of: '/',
      pickService: 'აირჩიეთ სერვისი',
      pickDoctor: 'აირჩიეთ ექიმი',
      pickDate: 'აირჩიეთ თარიღი და დრო',
      yourDetails: 'თქვენი მონაცემები',
      name: 'სახელი და გვარი',
      phone: 'ტელეფონი',
      namePh: 'მაგ. ნინო ბერიძე',
      phonePh: '+995 5XX XX XX XX',
      back: 'უკან',
      next: 'შემდეგი',
      confirm: 'ვიზიტის დადასტურება',
      successTitle: 'ვიზიტი დადასტურებულია!',
      successText: 'დეტალები გამოგზავნილია თქვენს ნომერზე. ჩვენი თანამშრომელი მალე დაგიკავშირდებათ.',
      summaryService: 'სერვისი',
      summaryDoctor: 'ექიმი',
      summaryDate: 'თარიღი / დრო',
      anyDoctor: 'ნებისმიერი თავისუფალი ექიმი',
      noSlots: 'დაკავებული',
      services: [
        { id: 'endo', icon: 'fa-disease', label: 'ენდოკრინოლოგია' },
        { id: 'card', icon: 'fa-heartbeat', label: 'კარდიოლოგია' },
        { id: 'pulm', icon: 'fa-lungs', label: 'პულმონოლოგია' },
        { id: 'lab',  icon: 'fa-flask', label: 'ლაბორატორია' },
        { id: 'opht', icon: 'fa-eye', label: 'ოფთალმოლოგია' },
        { id: 'check', icon: 'fa-shield-alt', label: 'ჯანმრთელობის ჩექაფი' }
      ],
      doctors: {
        endo: [
          { name: 'პროფ. რამაზ ყურაშვილი', spec: 'ენდოკრინოლოგი · დირექტორი' },
          { name: 'ლალი ნიკოლეიშვილი', spec: 'ენდოკრინოლოგი · დამფუძნებელი' },
          { name: 'ქეთევან ბანძავა', spec: 'ენდოკრინოლოგი' }
        ],
        card: [ { name: 'გიორგი ტატიშვილი', spec: 'კარდიოლოგი' } ],
        pulm: [ { name: 'ელენე შეროზია', spec: 'პულმონოლოგი · დამფუძნებელი' } ],
        lab:  [ { name: 'ლაბორატორიის გუნდი', spec: 'ჩაწერა არ არის საჭირო' } ],
        opht: [ { name: 'ნინო კვარაცხელია', spec: 'ოფთალმოლოგი' } ],
        check:[ { name: 'მულტიდისციპლინარული გუნდი', spec: 'კომპლექსური ჩექაფი' } ]
      },
      days: ['კვი','ორშ','სამ','ოთხ','ხუთ','პარ','შაბ']
    };

    var state = { step: 1, service: null, doctor: null, date: null, time: null, name: '', phone: '' };
    var TIMES = ['09:30','10:00','10:30','11:00','11:30','12:00','14:00','14:30','15:00','15:30','16:00','16:30'];

    // Build modal HTML
    var modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = '' +
      '<div class="booking-modal-overlay" data-close></div>' +
      '<div class="booking-modal-content">' +
        '<div class="booking-modal-header">' +
          '<h2 class="booking-modal-title">' + T.title + '</h2>' +
          '<button class="booking-modal-close" data-close aria-label="Close"><i class="fas fa-times"></i></button>' +
        '</div>' +
        '<div class="booking-progress">' +
          '<div class="booking-progress-bar active"></div>' +
          '<div class="booking-progress-bar"></div>' +
          '<div class="booking-progress-bar"></div>' +
          '<div class="booking-progress-bar"></div>' +
        '</div>' +
        '<div class="booking-modal-body">' +
          // Step 1
          '<div class="booking-step active" data-step="1">' +
            '<div class="booking-step-label">' + T.step + ' 1 ' + T.of + ' 4</div>' +
            '<h3>' + T.pickService + '</h3>' +
            '<div class="booking-options">' +
              T.services.map(function(s){
                return '<button type="button" class="booking-option" data-service="' + s.id + '" data-label="' + s.label + '">' +
                       '<i class="fas ' + s.icon + '"></i><span>' + s.label + '</span></button>';
              }).join('') +
            '</div>' +
          '</div>' +
          // Step 2
          '<div class="booking-step" data-step="2">' +
            '<div class="booking-step-label">' + T.step + ' 2 ' + T.of + ' 4</div>' +
            '<h3>' + T.pickDoctor + '</h3>' +
            '<div class="booking-doctors" data-doctors></div>' +
          '</div>' +
          // Step 3
          '<div class="booking-step" data-step="3">' +
            '<div class="booking-step-label">' + T.step + ' 3 ' + T.of + ' 4</div>' +
            '<h3>' + T.pickDate + '</h3>' +
            '<div class="booking-date-row" data-dates></div>' +
            '<div class="booking-times" data-times></div>' +
          '</div>' +
          // Step 4
          '<div class="booking-step" data-step="4">' +
            '<div class="booking-step-label">' + T.step + ' 4 ' + T.of + ' 4</div>' +
            '<h3>' + T.yourDetails + '</h3>' +
            '<div class="booking-summary" data-summary></div>' +
            '<div class="booking-form-group"><label>' + T.name + '</label><input type="text" data-input="name" placeholder="' + T.namePh + '"></div>' +
            '<div class="booking-form-group"><label>' + T.phone + '</label><input type="tel" data-input="phone" placeholder="' + T.phonePh + '"></div>' +
          '</div>' +
          // Success
          '<div class="booking-step" data-step="success">' +
            '<div class="booking-success">' +
              '<div class="booking-success-icon"><i class="fas fa-check"></i></div>' +
              '<h3>' + T.successTitle + '</h3>' +
              '<p>' + T.successText + '</p>' +
              '<div class="booking-success-details" data-success-details></div>' +
            '</div>' +
          '</div>' +
          // Actions
          '<div class="booking-actions" data-actions>' +
            '<button type="button" class="booking-back" data-back>' + T.back + '</button>' +
            '<button type="button" class="booking-next" data-next disabled>' + T.next + '</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    var $ = function(sel){ return modal.querySelector(sel); };
    var $$ = function(sel){ return modal.querySelectorAll(sel); };
    var bars = $$('.booking-progress-bar');
    var stepEls = $$('.booking-step');
    var actions = $('[data-actions]');
    var backBtn = $('[data-back]');
    var nextBtn = $('[data-next]');

    function updateUI() {
      stepEls.forEach(function(el){
        el.classList.toggle('active', el.getAttribute('data-step') == String(state.step));
      });
      bars.forEach(function(b, i){ b.classList.toggle('active', i < state.step); });
      backBtn.style.visibility = (state.step > 1 && state.step <= 4) ? 'visible' : 'hidden';
      // Next button text
      if (state.step === 4) nextBtn.textContent = T.confirm;
      else nextBtn.textContent = T.next;
      // Validate
      var valid = false;
      if (state.step === 1) valid = !!state.service;
      else if (state.step === 2) valid = !!state.doctor;
      else if (state.step === 3) valid = !!state.date && !!state.time;
      else if (state.step === 4) valid = state.name.trim().length > 1 && state.phone.trim().length > 4;
      nextBtn.disabled = !valid;
      actions.style.display = (state.step > 4) ? 'none' : '';
    }

    function openModal(prefillService) {
      state = { step: 1, service: null, doctor: null, date: null, time: null, name: '', phone: '' };
      // reset selections
      $$('.booking-option').forEach(function(b){ b.classList.remove('selected'); });
      $('[data-input="name"]').value = '';
      $('[data-input="phone"]').value = '';
      if (prefillService) {
        var btn = $('.booking-option[data-service="' + prefillService + '"]');
        if (btn) btn.click();
        // Move to step 2 immediately if prefilled
        // Actually, just leave on step 1 with selection visible
      }
      modal.classList.add('active');
      document.body.classList.add('no-scroll');
      updateUI();
    }
    function closeModal() {
      modal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }

    // Step 1: services
    $$('.booking-option').forEach(function(btn){
      btn.addEventListener('click', function(){
        $$('.booking-option').forEach(function(b){ b.classList.remove('selected'); });
        btn.classList.add('selected');
        state.service = { id: btn.getAttribute('data-service'), label: btn.getAttribute('data-label') };
        updateUI();
      });
    });

    // Step 2: doctors (dynamic)
    function renderDoctors() {
      var container = $('[data-doctors]');
      var list = T.doctors[state.service.id] || [];
      container.innerHTML = list.map(function(d, i){
        var initials = d.name.split(' ').map(function(p){ return p[0]; }).slice(0,2).join('');
        return '<button type="button" class="booking-doctor" data-doctor="' + i + '">' +
                 '<div class="booking-doctor-avatar">' + initials + '</div>' +
                 '<div class="booking-doctor-info">' +
                   '<div class="booking-doctor-name">' + d.name + '</div>' +
                   '<div class="booking-doctor-spec">' + d.spec + '</div>' +
                 '</div>' +
               '</button>';
      }).join('');
      container.querySelectorAll('.booking-doctor').forEach(function(btn){
        btn.addEventListener('click', function(){
          container.querySelectorAll('.booking-doctor').forEach(function(b){ b.classList.remove('selected'); });
          btn.classList.add('selected');
          var idx = parseInt(btn.getAttribute('data-doctor'), 10);
          state.doctor = list[idx];
          updateUI();
        });
      });
    }

    // Step 3: dates + times
    function renderDates() {
      var container = $('[data-dates]');
      var today = new Date();
      var html = '';
      for (var i = 1; i <= 14; i++) {
        var d = new Date(today);
        d.setDate(today.getDate() + i);
        // Skip Sundays
        if (d.getDay() === 0) continue;
        html += '<button type="button" class="booking-date" data-date="' + d.toISOString().slice(0,10) + '" data-display="' + (d.getDate() + ' ' + ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]) + '">' +
                  '<span class="booking-date-day">' + T.days[d.getDay()] + '</span>' +
                  '<span class="booking-date-num">' + d.getDate() + '</span>' +
                '</button>';
      }
      container.innerHTML = html;
      container.querySelectorAll('.booking-date').forEach(function(btn){
        btn.addEventListener('click', function(){
          container.querySelectorAll('.booking-date').forEach(function(b){ b.classList.remove('selected'); });
          btn.classList.add('selected');
          state.date = { iso: btn.getAttribute('data-date'), display: btn.getAttribute('data-display') };
          state.time = null;
          renderTimes();
          updateUI();
        });
      });
    }
    function renderTimes() {
      var container = $('[data-times]');
      // Pseudo-random "booked" slots based on date
      var seed = state.date ? state.date.iso.split('-').reduce(function(a,b){ return a + parseInt(b,10); }, 0) : 0;
      container.innerHTML = TIMES.map(function(t, i){
        var booked = ((i * 7 + seed) % 5) === 0;
        return '<button type="button" class="booking-time" data-time="' + t + '" ' + (booked ? 'disabled' : '') + '>' + t + '</button>';
      }).join('');
      container.querySelectorAll('.booking-time').forEach(function(btn){
        btn.addEventListener('click', function(){
          if (btn.disabled) return;
          container.querySelectorAll('.booking-time').forEach(function(b){ b.classList.remove('selected'); });
          btn.classList.add('selected');
          state.time = btn.getAttribute('data-time');
          updateUI();
        });
      });
    }

    // Step 4: summary + inputs
    function renderSummary() {
      $('[data-summary]').innerHTML =
        '<div class="booking-summary-row"><span>' + T.summaryService + '</span><strong>' + state.service.label + '</strong></div>' +
        '<div class="booking-summary-row"><span>' + T.summaryDoctor + '</span><strong>' + state.doctor.name + '</strong></div>' +
        '<div class="booking-summary-row"><span>' + T.summaryDate + '</span><strong>' + state.date.display + ' · ' + state.time + '</strong></div>';
    }
    $('[data-input="name"]').addEventListener('input', function(e){ state.name = e.target.value; updateUI(); });
    $('[data-input="phone"]').addEventListener('input', function(e){ state.phone = e.target.value; updateUI(); });

    // Navigation
    nextBtn.addEventListener('click', function(){
      if (state.step === 1) { state.step = 2; renderDoctors(); }
      else if (state.step === 2) { state.step = 3; renderDates(); renderTimes(); }
      else if (state.step === 3) { state.step = 4; renderSummary(); }
      else if (state.step === 4) {
        // Submit (fake)
        $('[data-success-details]').innerHTML =
          '<div class="booking-summary-row"><span>' + T.summaryService + '</span><strong>' + state.service.label + '</strong></div>' +
          '<div class="booking-summary-row"><span>' + T.summaryDoctor + '</span><strong>' + state.doctor.name + '</strong></div>' +
          '<div class="booking-summary-row"><span>' + T.summaryDate + '</span><strong>' + state.date.display + ' · ' + state.time + '</strong></div>';
        state.step = 'success';
        // Hide actions, show only close
        actions.style.display = 'none';
        stepEls.forEach(function(el){
          el.classList.toggle('active', el.getAttribute('data-step') === 'success');
        });
        bars.forEach(function(b){ b.classList.add('active'); });
        return;
      }
      updateUI();
    });
    backBtn.addEventListener('click', function(){
      if (state.step > 1 && typeof state.step === 'number') {
        state.step--;
        updateUI();
      }
    });

    // Close handlers
    modal.querySelectorAll('[data-close]').forEach(function(el){
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    // --- Wire trigger buttons ---
    // Any button/link with .btn-appointment, .btn-appointment-green, or [data-book] opens the modal.
    // Also: mobile CTA bar link, booking-highlight phones — leave alone.
    function wireTriggers() {
      var triggers = document.querySelectorAll('.btn-appointment, .btn-appointment-green, [data-book], .mobile-cta-bar a');
      triggers.forEach(function(el){
        // Skip if it points at a tel: link
        var href = el.getAttribute('href') || '';
        if (href.indexOf('tel:') === 0 || href.indexOf('mailto:') === 0) return;
        el.addEventListener('click', function(e){
          e.preventDefault();
          var prefill = el.getAttribute('data-book') || null;
          openModal(prefill);
        });
      });
    }
    wireTriggers();

    // Expose for inline triggers if needed
    window.diacorOpenBooking = openModal;
  })();

});
