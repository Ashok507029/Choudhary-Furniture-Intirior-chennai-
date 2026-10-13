/**
 * Choudhary Furniture & Interiors - Premium CMS & Star Review Integration
 * Handles:
 * - Dynamic Google Sheets CSV data loaders for projects and reviews
 * - Robust fallback logic to static HTML blocks when URLs are empty
 * - Dynamic rating stars selection and Form submission to Google Apps Script
 * - Navigation menus, sliders, sticky header triggers, and stats counters.
 */

// ==========================================================================
// Google Sheets CMS Setup (Instructions included in walkthrough.md)
// ==========================================================================
const PROJECTS_SHEET_CSV_URL = ''; // Paste your Published CSV link for Projects
const REVIEWS_SHEET_CSV_URL = '';   // Paste your Published CSV link for Reviews
const GOOGLE_SCRIPT_WEBHOOK_URL = ''; // Paste your Apps Script Web App URL for reviews/projects submission
const IMGBB_API_KEY = '502a5b3f282b1e1aa14fb81b0f9e5aba'; // Paste your free ImgBB API Key here to enable mobile gallery uploads

document.addEventListener('DOMContentLoaded', () => {
  // Mark body so CSS scroll-animations activate (progressive enhancement)
  // Without this class, all .scroll-reveal elements stay fully visible (no hidden content)
  document.body.classList.add('js-scroll-ready');

  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 1. Sticky Header scroll effect
  const header = document.getElementById('main-header');
  const stickyScrollThreshold = 50;
  function handleHeaderScroll() {
    if (window.scrollY > stickyScrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll();

  // 2. Luxury Sidebar Drawer & Mobile Menu Mechanics
  const sidebar = document.getElementById('luxury-sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
  const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  function openSidebar() {
    if (sidebar) sidebar.classList.add('active');
    if (sidebarOverlay) sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('active');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openSidebar();
    });
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openSidebar();
    });
  }

  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener('click', closeSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
      closeSidebar();
    }
  });

  const sidebarLinks = document.querySelectorAll('.sidebar-nav-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', closeSidebar);
  });

  // 3. Active Nav Link on Scroll & Current Page Indicator
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const vNavLinks = document.querySelectorAll('.v-nav-item');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  function updateActiveNavLink() {
    // On subpages (about.html, services.html, portfolio.html, contact.html), keep current page highlighted
    if (currentPath && currentPath !== 'index.html' && currentPath !== '') {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
      vNavLinks.forEach(vLink => {
        const vHref = vLink.getAttribute('href');
        if (vHref === currentPath) {
          vLink.classList.add('active');
        } else {
          vLink.classList.remove('active');
        }
      });
      sidebarLinks.forEach(sLink => {
        const sHref = sLink.getAttribute('href');
        if (sHref === currentPath) {
          sLink.classList.add('active');
        } else {
          sLink.classList.remove('active');
        }
      });
      return;
    }

    // On index.html: ensure Home item is active on vertical dock
    vNavLinks.forEach(vLink => {
      const vHref = vLink.getAttribute('href');
      if (vHref === 'index.html' || vHref === './' || vHref === '#') {
        vLink.classList.add('active');
      } else {
        vLink.classList.remove('active');
      }
    });

    // On index.html: highlight section in view if linking to hashes
    let currentSectionId = '';
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollPosition >= (sectionTop - 140)) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}` || href === `index.html#${currentSectionId}`) {
          link.classList.add('active');
        } else if (href && (href.startsWith('#') || href.startsWith('index.html#'))) {
          link.classList.remove('active');
        }
      });
    }
  }
  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  // 4. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });
    revealElements.forEach(element => revealObserver.observe(element));

    // Hard fallback: if any elements are still invisible after 2.5s, force-show them
    setTimeout(() => {
      document.querySelectorAll('.scroll-reveal:not(.visible)').forEach(el => {
        el.classList.add('visible');
      });
    }, 2500);
  } else {
    revealElements.forEach(element => element.classList.add('visible'));
  }

  // 5. Animated Stats Counters
  const counters = document.querySelectorAll('.stat-number');
  const counterAnimationDuration = 1800;
  function animateCounters() {
    counters.forEach(counter => {
      const targetVal = parseInt(counter.getAttribute('data-target'));
      const startVal = 0;
      let startTime = null;
      function updateCounterValue(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / counterAnimationDuration, 1);
        const currentVal = Math.floor(progress * (targetVal - startVal) + startVal);
        counter.textContent = currentVal;
        if (progress < 1) {
          requestAnimationFrame(updateCounterValue);
        } else {
          counter.textContent = targetVal;
        }
      }
      requestAnimationFrame(updateCounterValue);
    });
  }
  const statsSection = document.querySelector('.why-stats');
  if (statsSection && 'IntersectionObserver' in window) {
    let animatedOnce = false;
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedOnce) {
          animateCounters();
          animatedOnce = true;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    statsObserver.observe(statsSection);
  } else {
    animateCounters();
  }

  // ==========================================================================
  // CSV Parsing Engine
  // ==========================================================================
  function parseCSV(csvText) {
    const lines = [];
    let currentLine = [];
    let insideQuotes = false;
    let currentValue = '';

    for (let i = 0; i < csvText.length; i++) {
      const char = csvText[i];
      const nextChar = csvText[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          currentValue += '"'; // Escaped quotes
          i++;
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        currentLine.push(currentValue.trim());
        currentValue = '';
      } else if ((char === '\r' || char === '\n') && !insideQuotes) {
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
        currentLine.push(currentValue.trim());
        lines.push(currentLine);
        currentLine = [];
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    if (currentValue || currentLine.length > 0) {
      currentLine.push(currentValue.trim());
      lines.push(currentLine);
    }
    if (lines.length < 2) return [];
    const headers = lines[0];
    return lines.slice(1)
      .filter(row => row.length >= headers.length)
      .map(row => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header.trim()] = row[index] ? row[index] : '';
        });
        return obj;
      });
  }

  // ==========================================================================
  // 6. Portfolio Filtering & Dynamic Loader
  // ==========================================================================
  let activeFilter = 'all';
  let visibleProjectsCount = 8;
  const PROJECTS_PAGE_SIZE = 6;

  function updatePortfolioVisibility() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    let matchingCount = 0;
    let shownCount = 0;

    portfolioItems.forEach(item => {
      const category = item.getAttribute('data-category');
      const matchesFilter = (activeFilter === 'all' || category === activeFilter);

      if (matchesFilter) {
        matchingCount++;
        if (shownCount < visibleProjectsCount) {
          // Show item — clear any hiding styles immediately (no flicker)
          item.classList.add('visible'); // Ensures scroll-reveal doesn't keep it invisible
          item.style.display = 'block';
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
          shownCount++;
        } else {
          // Hide item — beyond the page limit
          item.style.display = 'none';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.92)';
        }
      } else {
        // Doesn't match filter — hide
        item.style.display = 'none';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.92)';
      }
    });

    const loadMoreContainer = document.querySelector('.portfolio-load-more');
    if (loadMoreContainer) {
      if (matchingCount > visibleProjectsCount) {
        loadMoreContainer.style.display = 'block';
      } else {
        loadMoreContainer.style.display = 'none';
      }
    }
  }

  function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      
      newButton.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        newButton.classList.add('active');

        activeFilter = newButton.getAttribute('data-filter');
        visibleProjectsCount = 8; // Reset to default 8 visible on filter change
        updatePortfolioVisibility();
      });
    });

    const loadMoreBtn = document.getElementById('btn-load-more-projects');
    if (loadMoreBtn) {
      const newLoadMoreBtn = loadMoreBtn.cloneNode(true);
      loadMoreBtn.parentNode.replaceChild(newLoadMoreBtn, loadMoreBtn);
      
      newLoadMoreBtn.addEventListener('click', () => {
        visibleProjectsCount += PROJECTS_PAGE_SIZE;
        updatePortfolioVisibility();
      });
    }

    updatePortfolioVisibility();
  }

  function renderProjectsFromCSV(projectsData) {
    const grid = document.getElementById('portfolio-items-grid');
    if (!grid || projectsData.length === 0) return;

    grid.innerHTML = ''; // Clear fallback items
    projectsData.forEach((project, idx) => {
      const item = document.createElement('div');
      item.className = 'portfolio-item scroll-reveal scale-up visible';
      item.setAttribute('data-category', project.Category.toLowerCase().trim());
      item.setAttribute('data-images', project.ImageUrl.trim());
      item.id = `portfolio-item-dynamic-${idx}`;
      
      const firstImage = (project.ImageUrl.split(',')[0] || '').trim();

      item.innerHTML = `
        <div class="portfolio-image-wrapper">
          <img src="${firstImage}" alt="${project.Name.trim()}" class="portfolio-img">
          <div class="portfolio-gradient-overlay"></div>
          <div class="portfolio-meta">
            <span class="portfolio-cat">${project.Category.trim()}</span>
            <h4 class="portfolio-title">${project.Name.trim()}</h4>
            <p class="portfolio-location"><i data-lucide="map-pin"></i> ${project.Location.trim()}</p>
            <p class="portfolio-desc">${project.Description.trim()}</p>
          </div>
        </div>
      `;
      grid.appendChild(item);
    });

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    initPortfolioFilters();
  }

  // ==========================================================================
  // localStorage Projects Persistence (Survives Page Refresh)
  // ==========================================================================
  const LOCAL_STORAGE_KEY = 'cfi_admin_projects';

  function saveProjectToLocalStorage(project) {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    existing.unshift(project); // Add to beginning (newest first)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
  }

  function loadSavedProjectsFromLocalStorage() {
    const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    if (saved.length === 0) return;

    const grid = document.getElementById('portfolio-items-grid');
    if (!grid) return;

    saved.forEach(project => {
      const item = document.createElement('div');
      item.className = 'portfolio-item scroll-reveal scale-up visible';
      item.setAttribute('data-category', (project.category || '').toLowerCase().trim());
      item.setAttribute('data-images', project.imageUrl.trim());
      item.style.opacity = '1';
      item.style.transform = 'scale(1)';
      item.style.display = 'block';

      const categoryTitle = project.category
        ? project.category.charAt(0).toUpperCase() + project.category.slice(1)
        : 'Project';

      const firstImage = (project.imageUrl.split(',')[0] || '').trim();

      item.innerHTML = `
        <div class="portfolio-image-wrapper">
          <img src="${firstImage}" alt="${project.name}" class="portfolio-img">
          <div class="portfolio-gradient-overlay"></div>
          <div class="portfolio-meta">
            <span class="portfolio-cat">${categoryTitle}</span>
            <h4 class="portfolio-title">${project.name}</h4>
            <p class="portfolio-location"><i data-lucide="map-pin"></i> ${project.location}</p>
            <p class="portfolio-desc">${project.description}</p>
          </div>
        </div>
      `;
      grid.insertBefore(item, grid.firstChild);
    });

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Load projects from localStorage when page opens
  loadSavedProjectsFromLocalStorage();

  // Load Projects from Google Sheet (if configured)
  if (PROJECTS_SHEET_CSV_URL) {
    fetch(PROJECTS_SHEET_CSV_URL)
      .then(response => response.text())
      .then(csvText => {
        const parsed = parseCSV(csvText);
        if (parsed.length > 0) {
          renderProjectsFromCSV(parsed);
        } else {
          console.warn('Projects spreadsheet empty, showing fallback projects.');
          initPortfolioFilters();
        }
      })
      .catch(err => {
        console.error('Error fetching projects from sheet, loading static projects:', err);
        initPortfolioFilters();
      });
  } else {
    // If no Sheets URL is specified, initialize filters on the preloaded static items
    initPortfolioFilters();
  }

  // ==========================================================================
  // 7. Testimonials Slider Carousel & Loader
  // ==========================================================================
  let currentSlideIndex = 0;
  let testimonialAutoSlideTimer = null;
  const slideIntervalDuration = 6000;

  function initTestimonialsSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('testimonial-prev-btn');
    const nextBtn = document.getElementById('testimonial-next-btn');
    const dotContainer = document.getElementById('testimonial-slider-dots');

    if (slides.length === 0) return;

    function updateTestimonialSlides(targetIndex) {
      if (targetIndex >= slides.length) {
        currentSlideIndex = 0;
      } else if (targetIndex < 0) {
        currentSlideIndex = slides.length - 1;
      } else {
        currentSlideIndex = targetIndex;
      }

      slides.forEach((slide, idx) => {
        slide.classList.remove('active');
        if (idx === currentSlideIndex) {
          slide.classList.add('active');
        }
      });

      if (dotContainer) {
        const dots = dotContainer.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
          dot.classList.remove('active');
          if (idx === currentSlideIndex) {
            dot.classList.add('active');
          }
        });
      }
    }

    function startAutoSlide() {
      stopAutoSlide();
      testimonialAutoSlideTimer = setInterval(() => {
        updateTestimonialSlides(currentSlideIndex + 1);
      }, slideIntervalDuration);
    }

    function stopAutoSlide() {
      if (testimonialAutoSlideTimer) {
        clearInterval(testimonialAutoSlideTimer);
      }
    }

    // Rebind controls
    if (nextBtn) {
      const newNextBtn = nextBtn.cloneNode(true);
      nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
      newNextBtn.addEventListener('click', () => {
        updateTestimonialSlides(currentSlideIndex + 1);
        startAutoSlide();
      });
    }

    if (prevBtn) {
      const newPrevBtn = prevBtn.cloneNode(true);
      prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
      newPrevBtn.addEventListener('click', () => {
        updateTestimonialSlides(currentSlideIndex - 1);
        startAutoSlide();
      });
    }

    if (dotContainer) {
      dotContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = `dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('data-slide', idx);
        dot.addEventListener('click', () => {
          updateTestimonialSlides(idx);
          startAutoSlide();
        });
        dotContainer.appendChild(dot);
      });
    }

    startAutoSlide();
    const sliderWrapper = document.querySelector('.testimonials-slider-wrapper');
    if (sliderWrapper) {
      sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
      sliderWrapper.addEventListener('mouseleave', startAutoSlide);
    }
  }

  function renderReviewsFromCSV(reviewsData) {
    const slider = document.getElementById('testimonials-slider');
    if (!slider) return;

    // Filter reviews where Status is 'approved'
    const approvedReviews = reviewsData.filter(item => 
      item.Status && item.Status.toLowerCase().trim() === 'approved'
    );

    if (approvedReviews.length === 0) {
      initTestimonialsSlider();
      return;
    }

    slider.innerHTML = ''; // Clear fallback review content
    approvedReviews.forEach((review, idx) => {
      const slide = document.createElement('div');
      slide.className = `testimonial-slide ${idx === 0 ? 'active' : ''}`;
      
      // Calculate star markup based on rating column
      const starsCount = parseInt(review.Rating) || 5;
      let starsHTML = '';
      for (let i = 0; i < starsCount; i++) {
        starsHTML += `<i data-lucide="star" style="fill: var(--color-gold); color: var(--color-gold); width: 14px; height: 14px; margin-right: 2px;"></i>`;
      }

      slide.innerHTML = `
        <div style="margin-bottom: 15px;">${starsHTML}</div>
        <p class="testimonial-text">"${review.ReviewText.trim()}"</p>
        <div class="testimonial-user">
          <div class="testimonial-avatar"><i data-lucide="user"></i></div>
          <div class="testimonial-info">
            <h4>${review.Name.trim()}</h4>
            <p>${review.Location.trim()}</p>
          </div>
        </div>
      `;
      slider.appendChild(slide);
    });

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    initTestimonialsSlider();
  }

  // Load Reviews
  if (REVIEWS_SHEET_CSV_URL) {
    fetch(REVIEWS_SHEET_CSV_URL)
      .then(response => response.text())
      .then(csvText => {
        const parsed = parseCSV(csvText);
        if (parsed.length > 0) {
          renderReviewsFromCSV(parsed);
        } else {
          console.warn('Reviews sheet empty or has no rows, using fallbacks.');
          initTestimonialsSlider();
        }
      })
      .catch(err => {
        console.error('Error fetching reviews from sheet, showing static content:', err);
        initTestimonialsSlider();
      });
  } else {
    initTestimonialsSlider();
  }

  // ==========================================================================
  // 8. Write a Review Star Rating Interactive Selector
  // ==========================================================================
  const triggerBtn = document.getElementById('btn-open-review-form');
  const reviewFormWrapper = document.getElementById('review-submission-wrapper');
  
  if (triggerBtn && reviewFormWrapper) {
    triggerBtn.addEventListener('click', () => {
      const isHidden = reviewFormWrapper.style.display === 'none';
      if (isHidden) {
        reviewFormWrapper.style.display = 'block';
        triggerBtn.innerHTML = '<i data-lucide="x"></i> Close Form';
      } else {
        reviewFormWrapper.style.display = 'none';
        triggerBtn.innerHTML = '<i data-lucide="edit-3"></i> Write a Review';
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  }

  // Star select interaction
  const starBtns = document.querySelectorAll('#review-stars-selector .star-btn');
  const ratingValInput = document.getElementById('review-rating-value');
  
  if (starBtns.length > 0 && ratingValInput) {
    // Set 5 stars active by default on load
    starBtns.forEach(btn => btn.classList.add('active'));

    starBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const rating = parseInt(btn.getAttribute('data-rating'));
        ratingValInput.value = rating;

        // Highlight stars up to selected value
        starBtns.forEach(star => {
          const starRatingVal = parseInt(star.getAttribute('data-rating'));
          if (starRatingVal <= rating) {
            star.classList.add('active');
          } else {
            star.classList.remove('active');
          }
        });
      });
    });
  }

  // Handle Review Submission
  const reviewForm = document.getElementById('customer-review-form');
  const reviewFormMsg = document.getElementById('review-form-response-msg');

  if (reviewForm && reviewFormMsg) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('btn-submit-review');
      const originalBtnText = submitBtn.innerHTML;

      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Review... <i data-lucide="loader" class="animate-spin" style="margin-left: 8px;"></i>';
      if (typeof lucide !== 'undefined') lucide.createIcons();

      reviewFormMsg.className = 'form-message';
      reviewFormMsg.style.display = 'none';

      const submissionData = {
        action: 'addReview',
        name: document.getElementById('review-name').value,
        location: document.getElementById('review-location').value,
        rating: document.getElementById('review-rating-value').value,
        reviewText: document.getElementById('review-text').value,
        status: 'pending' // submitted reviews are pending approval
      };

      if (!GOOGLE_SCRIPT_WEBHOOK_URL) {
        // Mock success fallback if Apps Script URL is empty
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
          if (typeof lucide !== 'undefined') lucide.createIcons();

          reviewFormMsg.textContent = 'Success (Demo Mode)! Your review was sent. In live mode, it will populate in your Google Sheet for admin approval.';
          reviewFormMsg.classList.add('success');
          reviewFormMsg.style.display = 'block';

          reviewForm.reset();
          starBtns.forEach(star => star.classList.add('active'));
          ratingValInput.value = 5;
        }, 1500);
        return;
      }

      // Live POST submission to Google Sheet Apps Script Web App Endpoint
      fetch(GOOGLE_SCRIPT_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors', // allows cross-domain POST without strict CORS configs on Google servers
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      })
      .then(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        if (typeof lucide !== 'undefined') lucide.createIcons();

        reviewFormMsg.textContent = 'Thank you! Your review has been submitted for approval. It will appear on the website once approved in Google Sheets.';
        reviewFormMsg.classList.add('success');
        reviewFormMsg.style.display = 'block';

        reviewForm.reset();
        starBtns.forEach(star => star.classList.add('active'));
        ratingValInput.value = 5;
      })
      .catch(err => {
        console.error('Error submitting review:', err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        if (typeof lucide !== 'undefined') lucide.createIcons();

        reviewFormMsg.textContent = 'Failed to submit review. Please check your network connection and try again.';
        reviewFormMsg.classList.add('error');
        reviewFormMsg.style.display = 'block';
      });
    });
  }

  // ==========================================================================
  // 9. Free Quote Estimation Form Submission (Mock simulation)
  // ==========================================================================
  const quoteForm = document.getElementById('quote-estimation-form');
  const responseMsg = document.getElementById('quote-form-response-msg');

  if (quoteForm && responseMsg) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitButton = document.getElementById('btn-submit-quote');
      const originalBtnText = submitButton.innerHTML;

      submitButton.disabled = true;
      submitButton.innerHTML = 'Calculating Estimate... <i data-lucide="loader" class="animate-spin" style="margin-left: 8px;"></i>';
      
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }

      responseMsg.className = 'form-message';
      responseMsg.style.display = 'none';

      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = originalBtnText;
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }

        responseMsg.textContent = 'Estimate Request Sent! Our senior design estimator will contact you within 12 hours with structural recommendations.';
        responseMsg.classList.add('success');
        responseMsg.style.display = 'block';

        quoteForm.reset();
      }, 1800);
    });
  }

  // ==========================================================================
  // 10. Passcode-Protected Admin Panel & ImgBB Uploader
  // ==========================================================================
  const adminModal = document.getElementById('admin-modal');
  const footerAdminTrigger = document.getElementById('footer-admin-trigger');
  const btnCloseAdmin = document.getElementById('btn-close-admin');
  const adminPasscodeForm = document.getElementById('admin-passcode-form');
  const adminUploadProjectForm = document.getElementById('admin-upload-project-form');
  const adminLoginStep = document.getElementById('admin-login-step');
  const adminUploaderStep = document.getElementById('admin-uploader-step');
  const adminLoginMsg = document.getElementById('admin-login-msg');
  const adminUploadResponseMsg = document.getElementById('admin-upload-response-msg');

  function openProjectUploaderModal() {
    if (!adminModal) return;
    adminModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Check if already unlocked in localStorage
    const isUnlocked = sessionStorage.getItem('cfi_admin_auth') === 'true';
    const btnLockAdmin = document.getElementById('btn-lock-admin');
    if (isUnlocked) {
      if (adminLoginStep) adminLoginStep.style.display = 'none';
      if (adminUploaderStep) adminUploaderStep.style.display = 'block';
      if (btnLockAdmin) btnLockAdmin.style.display = 'inline-flex';
      switchAdminTab('upload');
    } else {
      if (adminLoginStep) adminLoginStep.style.display = 'block';
      if (adminUploaderStep) adminUploaderStep.style.display = 'none';
      if (btnLockAdmin) btnLockAdmin.style.display = 'none';
      if (adminPasscodeForm) adminPasscodeForm.reset();
      if (adminLoginMsg) adminLoginMsg.style.display = 'none';
      const passcodeField = document.getElementById('admin-passcode');
      if (passcodeField) passcodeField.focus();
    }
    if (adminUploadResponseMsg) adminUploadResponseMsg.style.display = 'none';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function closeProjectUploaderModal() {
    if (!adminModal) return;
    adminModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // WAY 2: Secret Keyboard Shortcut (Ctrl + Shift + A or Alt + A)
  // Protected with strict password verification below
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
        (e.altKey && (e.key === 'A' || e.key === 'a'))) {
      e.preventDefault();
      openProjectUploaderModal();
    }
  });

  // Close Admin Modal
  if (btnCloseAdmin) {
    btnCloseAdmin.addEventListener('click', closeProjectUploaderModal);
  }

  // Close modal when clicking outside the card
  if (adminModal) {
    adminModal.addEventListener('click', (e) => {
      if (e.target === adminModal) {
        closeProjectUploaderModal();
      }
    });
  }

  // Lock / Logout Button inside Modal
  const btnLockAdmin = document.getElementById('btn-lock-admin');
  if (btnLockAdmin) {
    btnLockAdmin.addEventListener('click', () => {
      sessionStorage.removeItem('cfi_admin_auth');
      if (adminLoginStep) adminLoginStep.style.display = 'block';
      if (adminUploaderStep) adminUploaderStep.style.display = 'none';
      btnLockAdmin.style.display = 'none';
      if (adminPasscodeForm) adminPasscodeForm.reset();
      if (adminLoginMsg) {
        adminLoginMsg.className = 'form-message success';
        adminLoginMsg.textContent = 'Portal locked successfully.';
        adminLoginMsg.style.display = 'block';
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  }

  // Strict Password Verification Handler (No 1-Click bypass)
  if (adminPasscodeForm && adminLoginMsg) {
    adminPasscodeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const passcodeEntered = document.getElementById('admin-passcode').value.trim();
      
      adminLoginMsg.className = 'form-message';
      adminLoginMsg.style.display = 'none';

      // Strict security password verification
      if (passcodeEntered === 'admin123' || passcodeEntered === 'cfi@2026' || passcodeEntered === 'cfi@admin') {
        sessionStorage.setItem('cfi_admin_auth', 'true');
        adminLoginStep.style.display = 'none';
        adminUploaderStep.style.display = 'block';
        if (btnLockAdmin) btnLockAdmin.style.display = 'inline-flex';
        adminUploadProjectForm.reset();
        switchAdminTab('upload');
        if (typeof lucide !== 'undefined') lucide.createIcons();
      } else {
        adminLoginMsg.textContent = 'Incorrect security password. Access denied.';
        adminLoginMsg.classList.add('error');
        adminLoginMsg.style.display = 'block';
      }
    });
  }

  // Live Thumbnail Preview Strip for Selected Files
  const projectImageInput = document.getElementById('admin-project-image');
  const imagePreviewContainer = document.getElementById('admin-image-preview-container');
  if (projectImageInput && imagePreviewContainer) {
    projectImageInput.addEventListener('change', () => {
      imagePreviewContainer.innerHTML = '';
      const files = Array.from(projectImageInput.files || []);
      files.forEach(file => {
        const img = document.createElement('img');
        img.className = 'admin-preview-thumb';
        img.src = URL.createObjectURL(file);
        img.alt = file.name;
        imagePreviewContainer.appendChild(img);
      });
    });
  }

  // Admin Project Upload Form Submission
  if (adminUploadProjectForm && adminUploadResponseMsg) {
    adminUploadProjectForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btnSubmit = document.getElementById('btn-admin-submit-project');
      const originalBtnText = btnSubmit.innerHTML;

      // Loading state
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = 'Uploading Project... <i data-lucide="loader" class="animate-spin" style="margin-left: 8px;"></i>';
      if (typeof lucide !== 'undefined') lucide.createIcons();

      adminUploadResponseMsg.className = 'form-message';
      adminUploadResponseMsg.style.display = 'none';

      const fileInput = document.getElementById('admin-project-image');
      const files = fileInput.files ? Array.from(fileInput.files) : [];

      // In production (when ImgBB API key is set), selecting at least one file is required.
      if (files.length === 0 && IMGBB_API_KEY) {
        adminUploadResponseMsg.textContent = 'Please select at least one project image file to upload.';
        adminUploadResponseMsg.classList.add('error');
        adminUploadResponseMsg.style.display = 'block';
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = originalBtnText;
        if (typeof lucide !== 'undefined') lucide.createIcons();
        return;
      }

      // Check if ImgBB API key is configured or no file is selected
      if (!IMGBB_API_KEY || files.length === 0) {
        // Fallback: Demo / Mock Mode
        setTimeout(() => {
          // Generate local object URLs for all selected files or use unsplash placeholder
          const localImgUrls = files.length > 0 
            ? files.map(file => URL.createObjectURL(file)).join(',') 
            : 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80';
          
          const name = document.getElementById('admin-project-name').value;
          const category = document.getElementById('admin-project-category').value;
          const location = document.getElementById('admin-project-location').value;
          const description = document.getElementById('admin-project-desc').value;

          const submissionData = {
            action: 'addProject',
            name: name,
            category: category,
            location: location,
            description: description,
            imageUrl: localImgUrls
          };

          if (!GOOGLE_SCRIPT_WEBHOOK_URL) {
            // Fully local demo mode: add project directly to front-end DOM portfolio list
            appendProjectToDOM(submissionData);
            adminUploadResponseMsg.textContent = `Success (Demo Mode)! Uploaded & appended project with ${files.length || 1} image(s).`;
            adminUploadResponseMsg.classList.add('success');
            adminUploadResponseMsg.style.display = 'block';
            adminUploadProjectForm.reset();
            if (imagePreviewContainer) imagePreviewContainer.innerHTML = '';
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = originalBtnText;
            if (typeof lucide !== 'undefined') lucide.createIcons();
          } else {
            // Webhook is configured, send the payload with local/mock image URL
            sendToWebhook(submissionData, originalBtnText, btnSubmit);
          }
        }, 1500);
        return;
      }

      // Real Mode: Upload each to ImgBB concurrently
      adminUploadResponseMsg.textContent = `Uploading 1 of ${files.length} image(s)...`;
      adminUploadResponseMsg.className = 'form-message success';
      adminUploadResponseMsg.style.display = 'block';

      const uploadPromises = files.map((file, index) => {
        const formData = new FormData();
        formData.append('image', file);

        return fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
          method: 'POST',
          body: formData
        })
        .then(res => {
          if (!res.ok) throw new Error('ImgBB HTTP Error ' + res.status);
          return res.json();
        })
        .then(imgResponse => {
          if (imgResponse && imgResponse.data && imgResponse.data.url) {
            return imgResponse.data.url;
          } else {
            throw new Error(imgResponse.error ? imgResponse.error.message : 'ImgBB response structure invalid');
          }
        });
      });

      Promise.all(uploadPromises)
      .then(uploadedUrls => {
        const imageUrlsString = uploadedUrls.join(',');
        const submissionData = {
          action: 'addProject',
          name: document.getElementById('admin-project-name').value,
          category: document.getElementById('admin-project-category').value,
          location: document.getElementById('admin-project-location').value,
          description: document.getElementById('admin-project-desc').value,
          imageUrl: imageUrlsString
        };

        if (!GOOGLE_SCRIPT_WEBHOOK_URL) {
          // ImgBB uploaded OK — save permanently to localStorage so it survives refresh!
          saveProjectToLocalStorage(submissionData);
          appendProjectToDOM(submissionData);
          adminUploadResponseMsg.innerHTML = `✅ ${uploadedUrls.length} Photo(s) successfully uploaded! Project has been <strong>permanently saved</strong>.`;
          adminUploadResponseMsg.classList.add('success');
          adminUploadResponseMsg.style.display = 'block';
          adminUploadProjectForm.reset();
          if (imagePreviewContainer) imagePreviewContainer.innerHTML = '';
          btnSubmit.disabled = false;
          btnSubmit.innerHTML = originalBtnText;
          if (typeof lucide !== 'undefined') lucide.createIcons();
        } else {
          // Save to localStorage AND send to Google Sheets Webhook
          saveProjectToLocalStorage(submissionData);
          sendToWebhook(submissionData, originalBtnText, btnSubmit);
        }
      })
      .catch(err => {
        console.error('ImgBB Image Upload Error:', err);
        adminUploadResponseMsg.textContent = 'Image Upload Failed: ' + err.message + '. Please ensure your ImgBB API key is correct.';
        adminUploadResponseMsg.classList.add('error');
        adminUploadResponseMsg.style.display = 'block';
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = originalBtnText;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      });
    });
  }

  // Send Project details to Google Apps Script Web App Webhook
  function sendToWebhook(submissionData, originalBtnText, btnSubmit) {
    fetch(GOOGLE_SCRIPT_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData)
    })
    .then(() => {
      adminUploadResponseMsg.textContent = 'Project successfully uploaded & published to your Google Sheets dashboard!';
      adminUploadResponseMsg.classList.add('success');
      adminUploadResponseMsg.style.display = 'block';
      adminUploadProjectForm.reset();
      if (imagePreviewContainer) imagePreviewContainer.innerHTML = '';
      
      // Append locally too for instant visual feedback
      appendProjectToDOM(submissionData);

      btnSubmit.disabled = false;
      btnSubmit.innerHTML = originalBtnText;
      if (typeof lucide !== 'undefined') lucide.createIcons();
    })
    .catch(err => {
      console.error('Webhook POST Error:', err);
      adminUploadResponseMsg.textContent = 'Project detail sync failed. Please check your network connection and verify Apps Script setup.';
      adminUploadResponseMsg.classList.add('error');
      adminUploadResponseMsg.style.display = 'block';
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = originalBtnText;
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  }

  // Helper to dynamically insert new project into the current front-end display grid for immediate visual feedback
  function appendProjectToDOM(project) {
    const grid = document.getElementById('portfolio-items-grid');
    if (!grid) return;

    const item = document.createElement('div');
    item.className = 'portfolio-item scroll-reveal scale-up visible';
    item.setAttribute('data-category', project.category.toLowerCase().trim());
    item.setAttribute('data-images', project.imageUrl.trim());
    item.style.opacity = '1';
    item.style.transform = 'scale(1)';
    item.style.display = 'block';

    const categoryTitle = project.category.charAt(0).toUpperCase() + project.category.slice(1);
    const firstImage = (project.imageUrl.split(',')[0] || '').trim();

    item.innerHTML = `
      <div class="portfolio-image-wrapper">
        <img src="${firstImage}" alt="${project.name.trim()}" class="portfolio-img">
        <div class="portfolio-gradient-overlay"></div>
        <div class="portfolio-meta">
          <span class="portfolio-cat">${categoryTitle}</span>
          <h4 class="portfolio-title">${project.name.trim()}</h4>
          <p class="portfolio-location"><i data-lucide="map-pin"></i> ${project.location.trim()}</p>
          <p class="portfolio-desc">${project.description.trim()}</p>
          <span class="portfolio-view-pill">View Project Details <i data-lucide="arrow-up-right"></i></span>
        </div>
      </div>
    `;

    // Add to the front of the grid (top left of portfolio) so it's instantly seen
    grid.insertBefore(item, grid.firstChild);

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    if (typeof updatePortfolioVisibility === 'function') {
      updatePortfolioVisibility();
    }
  }

  // ==========================================================================
  // Admin Panel Tab Switching & Manage Projects
  // ==========================================================================
  function switchAdminTab(tabName) {
    const uploadTab = document.getElementById('admin-tab-upload');
    const manageTab = document.getElementById('admin-tab-manage');
    const btnUpload = document.getElementById('tab-btn-upload');
    const btnManage = document.getElementById('tab-btn-manage');

    if (tabName === 'upload') {
      if (uploadTab) uploadTab.style.display = 'block';
      if (manageTab) manageTab.style.display = 'none';
      if (btnUpload) {
        btnUpload.style.borderBottomColor = 'var(--color-gold)';
        btnUpload.style.color = 'var(--color-gold)';
      }
      if (btnManage) {
        btnManage.style.borderBottomColor = 'transparent';
        btnManage.style.color = 'var(--color-text-muted)';
      }
    } else {
      if (uploadTab) uploadTab.style.display = 'none';
      if (manageTab) manageTab.style.display = 'block';
      if (btnManage) {
        btnManage.style.borderBottomColor = 'var(--color-gold)';
        btnManage.style.color = 'var(--color-gold)';
      }
      if (btnUpload) {
        btnUpload.style.borderBottomColor = 'transparent';
        btnUpload.style.color = 'var(--color-text-muted)';
      }
      renderSavedProjectsList();
    }
  }

  function renderSavedProjectsList() {
    const listContainer = document.getElementById('admin-saved-projects-list');
    const noProjectsMsg = document.getElementById('admin-no-projects-msg');
    if (!listContainer) return;

    const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    listContainer.innerHTML = '';

    if (saved.length === 0) {
      if (noProjectsMsg) noProjectsMsg.style.display = 'block';
      return;
    }

    if (noProjectsMsg) noProjectsMsg.style.display = 'none';

    saved.forEach((project, idx) => {
      const row = document.createElement('div');
      row.style.cssText = 'display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--color-border-light);';

      const firstImage = (project.imageUrl.split(',')[0] || '').trim();

      row.innerHTML = `
        <img src="${firstImage}" alt="${project.name}" style="width: 56px; height: 56px; object-fit: cover; border-radius: 4px; flex-shrink: 0; border: 1px solid var(--color-border-light);">
        <div style="flex: 1; min-width: 0;">
          <strong style="font-size: 0.9rem; color: var(--color-text-dark); display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${project.name}</strong>
          <span style="font-size: 0.78rem; color: var(--color-text-muted);">${project.category} &bull; ${project.location}</span>
        </div>
        <button data-delete-idx="${idx}" style="background: none; border: 1px solid #ef4444; color: #ef4444; border-radius: 4px; padding: 6px 10px; cursor: pointer; flex-shrink: 0; transition: all 0.3s;" title="Delete Project">
          <i data-lucide="trash-2" style="width: 16px; height: 16px; pointer-events: none;"></i>
        </button>
      `;

      row.querySelector('[data-delete-idx]').addEventListener('click', (e) => {
        const delIdx = parseInt(e.currentTarget.getAttribute('data-delete-idx'));
        const current = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
        current.splice(delIdx, 1);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
        // Reload page so portfolio reflects deletion
        window.location.reload();
      });

      listContainer.appendChild(row);
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // Wire up tab buttons
  const tabBtnUpload = document.getElementById('tab-btn-upload');
  const tabBtnManage = document.getElementById('tab-btn-manage');
  if (tabBtnUpload) tabBtnUpload.addEventListener('click', () => switchAdminTab('upload'));
  if (tabBtnManage) tabBtnManage.addEventListener('click', () => switchAdminTab('manage'));

  // ==========================================================================
  // Before/After Slider Interaction & Tabs Toggle
  // ==========================================================================
  const baSlider = document.getElementById('ba-range-slider');
  const baBeforeImgEl = document.querySelector('.before-after-slider-container .before-img img');
  const baAfterImgEl = document.querySelector('.before-after-slider-container .after-img img');
  const baAfterImgContainer = document.querySelector('.before-after-slider-container .after-img');
  const baBarHandle = document.querySelector('.before-after-slider-container .slider-bar-handle');
  const baBtnHandle = document.querySelector('.before-after-slider-container .slider-button-handle');
  const baTabButtons = document.querySelectorAll('.ba-tab-btn');

  function updateSlider(val) {
    if (baAfterImgContainer && baBarHandle && baBtnHandle) {
      baAfterImgContainer.style.clipPath = `inset(0 0 0 ${val}%)`;
      baBarHandle.style.left = `${val}%`;
      baBtnHandle.style.left = `${val}%`;
    }
  }

  if (baSlider) {
    baSlider.addEventListener('input', (e) => {
      updateSlider(e.target.value);
    });
  }

  if (baTabButtons.length > 0) {
    baTabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Toggle active states
        baTabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Extract before/after image paths
        const beforeSrc = button.getAttribute('data-before');
        const afterSrc = button.getAttribute('data-after');

        // Apply with fade transition
        if (baBeforeImgEl && baAfterImgEl) {
          baBeforeImgEl.style.opacity = '0.4';
          baAfterImgEl.style.opacity = '0.4';
          
          setTimeout(() => {
            baBeforeImgEl.src = beforeSrc;
            baAfterImgEl.src = afterSrc;
            
            baBeforeImgEl.style.opacity = '1';
            baAfterImgEl.style.opacity = '1';
          }, 150);
        }

        // Reset range value to 50
        if (baSlider) {
          baSlider.value = 50;
          updateSlider(50);
        }
      });
    });
  }

  // ==========================================================================
  // Admin Project Uploader Image Preview Strip
  // ==========================================================================
  const adminProjectImageInput = document.getElementById('admin-project-image');
  const adminImagePreviewContainer = document.getElementById('admin-image-preview-container');


  if (adminProjectImageInput && adminImagePreviewContainer) {
    adminProjectImageInput.addEventListener('change', () => {
      adminImagePreviewContainer.innerHTML = '';
      const files = adminProjectImageInput.files ? Array.from(adminProjectImageInput.files) : [];
      
      files.forEach(file => {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.className = 'admin-preview-thumb';
        img.alt = file.name;
        img.title = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        adminImagePreviewContainer.appendChild(img);
      });
    });
  }

  if (adminUploadProjectForm && adminImagePreviewContainer) {
    adminUploadProjectForm.addEventListener('reset', () => {
      adminImagePreviewContainer.innerHTML = '';
    });
  }

  // ==========================================================================
  // Lightbox Modal Logic
  // ==========================================================================
  const lightbox = document.getElementById('project-lightbox');
  const closeLightboxBtn = document.getElementById('btn-close-lightbox');
  const lightboxMainImg = document.getElementById('lightbox-main-img');
  const lightboxPrevBtn = document.getElementById('lightbox-btn-prev');
  const lightboxNextBtn = document.getElementById('lightbox-btn-next');
  const lightboxThumbsContainer = document.getElementById('lightbox-thumbs-container');
  
  const lightboxCat = document.getElementById('lightbox-project-cat');
  const lightboxTitle = document.getElementById('lightbox-project-title');
  const lightboxLocation = document.getElementById('lightbox-project-location');
  const lightboxDesc = document.getElementById('lightbox-project-desc');
  const lightboxWhatsappLink = document.getElementById('lightbox-whatsapp-link');

  let currentProjectImages = [];
  let currentImageIdx = 0;

  function openLightbox(title, category, location, description, imageUrlsString) {
    if (!lightbox) return;

    currentProjectImages = (imageUrlsString || '').split(',').map(url => url.trim()).filter(url => url);
    if (currentProjectImages.length === 0) return;

    currentImageIdx = 0;

    // Populate metadata
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxCat) lightboxCat.textContent = category;
    if (lightboxLocation) lightboxLocation.innerHTML = `<i data-lucide="map-pin"></i> ${location}`;
    if (lightboxDesc) lightboxDesc.textContent = description;
    
    // Update WhatsApp link text dynamically
    if (lightboxWhatsappLink) {
      const waText = encodeURIComponent(`Hi Choudhary Furniture! I'm interested in getting a quote for something similar to your "${title}" project in ${location}.`);
      lightboxWhatsappLink.href = `https://wa.me/916375507029?text=${waText}`;
    }

    updateLightboxImage();
    renderLightboxThumbnails();

    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // stop background scroll

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  function closeLightbox() {
    if (lightbox) lightbox.style.display = 'none';
    document.body.style.overflow = ''; // restore background scroll
  }

  function updateLightboxImage() {
    if (!lightboxMainImg || currentProjectImages.length === 0) return;
    
    lightboxMainImg.style.opacity = '0.3';
    setTimeout(() => {
      lightboxMainImg.src = currentProjectImages[currentImageIdx];
      lightboxMainImg.style.opacity = '1';
    }, 150);

    // Toggle nav buttons visibility based on count
    if (lightboxPrevBtn && lightboxNextBtn) {
      if (currentProjectImages.length <= 1) {
        lightboxPrevBtn.style.display = 'none';
        lightboxNextBtn.style.display = 'none';
      } else {
        lightboxPrevBtn.style.display = 'flex';
        lightboxNextBtn.style.display = 'flex';
      }
    }
  }

  function renderLightboxThumbnails() {
    if (!lightboxThumbsContainer) return;
    lightboxThumbsContainer.innerHTML = '';

    if (currentProjectImages.length <= 1) {
      lightboxThumbsContainer.parentElement.style.display = 'none';
      return;
    }
    
    lightboxThumbsContainer.parentElement.style.display = 'flex';

    currentProjectImages.forEach((imgUrl, idx) => {
      const thumb = document.createElement('img');
      thumb.src = imgUrl;
      thumb.className = `lightbox-thumb ${idx === currentImageIdx ? 'active' : ''}`;
      thumb.alt = `Thumbnail ${idx + 1}`;
      thumb.addEventListener('click', () => {
        currentImageIdx = idx;
        updateLightboxImage();
        updateActiveThumbnail();
      });
      lightboxThumbsContainer.appendChild(thumb);
    });
  }

  function updateActiveThumbnail() {
    const thumbs = lightboxThumbsContainer.querySelectorAll('.lightbox-thumb');
    thumbs.forEach((thumb, idx) => {
      if (idx === currentImageIdx) {
        thumb.classList.add('active');
        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        thumb.classList.remove('active');
      }
    });
  }

  // Bind Lightbox control listeners
  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', () => {
      if (currentProjectImages.length <= 1) return;
      currentImageIdx = (currentImageIdx - 1 + currentProjectImages.length) % currentProjectImages.length;
      updateLightboxImage();
      updateActiveThumbnail();
    });
  }
  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', () => {
      if (currentProjectImages.length <= 1) return;
      currentImageIdx = (currentImageIdx + 1) % currentProjectImages.length;
      updateLightboxImage();
      updateActiveThumbnail();
    });
  }

  // Keyboard Navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && currentProjectImages.length > 1) {
        lightboxPrevBtn.click();
      }
      if (e.key === 'ArrowRight' && currentProjectImages.length > 1) {
        lightboxNextBtn.click();
      }
    }
  });

  // Delegated click event listener on the portfolio items grid
  const portfolioGrid = document.getElementById('portfolio-items-grid');
  if (portfolioGrid) {
    portfolioGrid.addEventListener('click', (e) => {
      const item = e.target.closest('.portfolio-item');
      if (!item) return;

      const title = item.querySelector('.portfolio-title').textContent.trim();
      const category = item.querySelector('.portfolio-cat').textContent.trim();
      const location = item.querySelector('.portfolio-location').textContent.trim();
      const desc = item.querySelector('.portfolio-desc').textContent.trim();
      const images = item.getAttribute('data-images') || item.querySelector('.portfolio-img').src;

      openLightbox(title, category, location, desc, images);
    });
  }

  // ==========================================================================
  // AI Design Assistant Chatbot Logic
  // ==========================================================================
  const chatbotWidget = document.getElementById('ai-chatbot-widget');
  const toggleChatbotBtn = document.getElementById('btn-toggle-chatbot');
  const chatbotDrawer = document.getElementById('chatbot-drawer');
  const chatMessagesLog = document.getElementById('chatbot-messages-log');
  const chatbotInputForm = document.getElementById('chatbot-input-form');
  const chatbotUserInput = document.getElementById('chatbot-user-input');
  const suggestionsContainer = document.getElementById('chatbot-suggestions-container');

  if (toggleChatbotBtn && chatbotDrawer) {
    toggleChatbotBtn.addEventListener('click', () => {
      const isHidden = chatbotDrawer.style.display === 'none';
      if (isHidden) {
        chatbotDrawer.style.display = 'flex';
        toggleChatbotBtn.querySelector('.icon-sparkles').style.display = 'none';
        toggleChatbotBtn.querySelector('.icon-close').style.display = 'block';
        toggleChatbotBtn.style.transform = 'rotate(90deg)';
        setTimeout(() => chatMessagesLog.scrollTop = chatMessagesLog.scrollHeight, 100);
      } else {
        chatbotDrawer.style.display = 'none';
        toggleChatbotBtn.querySelector('.icon-sparkles').style.display = 'block';
        toggleChatbotBtn.querySelector('.icon-close').style.display = 'none';
        toggleChatbotBtn.style.transform = 'rotate(0deg)';
      }
    });

    // Close chatbot drawer when clicking outside
    document.addEventListener('click', (e) => {
      if (!chatbotWidget.contains(e.target)) {
        chatbotDrawer.style.display = 'none';
        toggleChatbotBtn.querySelector('.icon-sparkles').style.display = 'block';
        toggleChatbotBtn.querySelector('.icon-close').style.display = 'none';
        toggleChatbotBtn.style.transform = 'rotate(0deg)';
      }
    });
  }

  const chatReplies = {
    cost_estimate: "Our modular kitchen estimates range from **₹1.5 Lakhs** (Standard) to **₹4.5 Lakhs+** (Luxury German Blum setups). Complete flat interior projects start around **₹3.5 Lakhs** for a basic 2BHK up to **₹15 Lakhs+** for high-end turnkey villas. You can fill the quote form on our site to receive an itemized estimation sheet!",
    wood_types: "We primarily utilize premium **BWP (Boiling Water Proof) Marine Plywood** with IS:710 grading for kitchens/bathrooms, ensuring 100% termite proofing. For custom standalone furniture, we fabricate using selected **Teak, Sheesham (Indian Rosewood), or White Oak** according to grain expectations.",
    warranty: "We offer a flat **10-Year Warranty** on all factory-manufactured modular cabinets, sliding wardrobes, and modular kitchens. Hardware accessories from Hettich and Blum carry a **lifetime manufacturer warranty**.",
    free_visit: "Yes! We provide **no-obligation site measurements & space planning** inside Chennai. Our project managers will visit with raw wood, laminates, and veneers catalogs. Click below to book your site slot directly via WhatsApp!"
  };

  const freeTextReplies = [
    { keywords: ['price', 'cost', 'budget', 'rate', 'rupees', 'lakhs'], reply: "Our turnkey interior works average ₹1,200 to ₹2,500 per sqft depending on raw material selection (veneer vs acrylic). Would you like to schedule a quick phone call to discuss your blueprint?" },
    { keywords: ['kitchen', 'modular', 'cabinet', 'drawer'], reply: "We design U-shape, L-shape, and island modular kitchens with soft-close acrylic finishes. Let's arrange a consultation to draft a 3D visual plan!" },
    { keywords: ['location', 'address', 'sowcarpet', 'chennai', 'where'], reply: "Our corporate showroom is located at Amman Coil Street, Sowcarpet, Chennai-600001. We serve clients across Chennai, Kanchipuram, and nearby zones." },
    { keywords: ['materials', 'plywood', 'veneer', 'laminate'], reply: "We only use premium water-resistant plywood (Greenply/Century) and laminates of 1.2mm thickness. We'll bring these samples to your site!" }
  ];

  function addChatMessage(text, sender = 'bot') {
    if (!chatMessagesLog) return;

    const msg = document.createElement('div');
    msg.className = `chatbot-msg msg-${sender}`;
    
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    msg.innerHTML = `
      <div class="msg-bubble">
        ${formattedText}
      </div>
    `;

    if (suggestionsContainer && sender === 'bot') {
      chatMessagesLog.insertBefore(msg, suggestionsContainer);
    } else {
      chatMessagesLog.appendChild(msg);
    }
    
    chatMessagesLog.scrollTop = chatMessagesLog.scrollHeight;
  }

  function showTypingIndicator() {
    if (!chatMessagesLog) return null;

    const indicator = document.createElement('div');
    indicator.className = 'chatbot-msg msg-bot temp-indicator';
    indicator.innerHTML = `
      <div class="msg-bubble" style="padding: 8px 14px;">
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    
    if (suggestionsContainer) {
      chatMessagesLog.insertBefore(indicator, suggestionsContainer);
    } else {
      chatMessagesLog.appendChild(indicator);
    }
    
    chatMessagesLog.scrollTop = chatMessagesLog.scrollHeight;
    return indicator;
  }

  function handleBotResponse(actionKeyOrText, isAction = true) {
    const indicator = showTypingIndicator();

    setTimeout(() => {
      if (indicator) indicator.remove();

      let replyText = "";
      if (isAction) {
        replyText = chatReplies[actionKeyOrText] || "I'm looking into this for you...";
      } else {
        const cleanQuery = actionKeyOrText.toLowerCase();
        const matched = freeTextReplies.find(item => item.keywords.some(kw => cleanQuery.includes(kw)));
        if (matched) {
          replyText = matched.reply;
        } else {
          replyText = "Thank you for asking! I've logged your query. Would you like to connect directly with our chief interior designer on WhatsApp for instant drawings?";
        }
      }

      addChatMessage(replyText, 'bot');

      if (replyText.includes('WhatsApp') || replyText.includes('WhatsApp slot')) {
        appendWhatsAppCTA();
      }
    }, 1000);
  }

  function appendWhatsAppCTA() {
    if (document.getElementById('chatbot-whatsapp-cta')) return;

    const cta = document.createElement('div');
    cta.id = 'chatbot-whatsapp-cta';
    cta.style.cssText = 'align-self: flex-start; margin-top: 5px; width: 100%; max-width: 85%;';
    cta.innerHTML = `
      <a href="https://wa.me/916375507029?text=Hi!%20I'm%20chatting%20with%20Aria%20on%20your%20site%20and%20want%20to%20discuss%20an%20interior%20design%20project." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width: 100%; justify-content: center; font-size: 0.8rem; padding: 10px 14px;">
        <i data-lucide="message-circle" style="width: 14px; height: 14px;"></i> Chat on WhatsApp
      </a>
    `;
    
    if (suggestionsContainer) {
      chatMessagesLog.insertBefore(cta, suggestionsContainer);
    } else {
      chatMessagesLog.appendChild(cta);
    }
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
    chatMessagesLog.scrollTop = chatMessagesLog.scrollHeight;
  }

  if (suggestionsContainer) {
    suggestionsContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.suggestion-chip');
      if (!chip) return;

      const action = chip.getAttribute('data-action');
      const questionText = chip.textContent.trim();

      addChatMessage(questionText, 'user');
      handleBotResponse(action, true);
    });
  }

  if (chatbotInputForm && chatbotUserInput) {
    chatbotInputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatbotUserInput.value.trim();
      if (!text) return;

      addChatMessage(text, 'user');
      chatbotUserInput.value = '';

      handleBotResponse(text, false);
    });
  }

  // ==========================================================================
  // 11. Theme Switcher (Dark / Light)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('cfi-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('cfi-theme', newTheme);
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  }

  // ==========================================================================
  // 12. Scroll Progress Bar
  // ==========================================================================
  const progressBar = document.getElementById('scroll-progress');
  function updateScrollProgress() {
    if (progressBar) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    }
  }
  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress();

  // ==========================================================================
  // 13. Interactive Material & Finishes Studio
  // ==========================================================================
  const materialData = {
    walnut: {
      title: "American Walnut & Burmese Teak",
      tag: "Heritage Hardwood",
      warranty: "25+ Year Durability",
      img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
      desc: "Sourced from sustainably managed timber reserves, our walnut veneers and solid hardwoods are precision kiln-dried to below 8% moisture content to eliminate cracking, bowing, or climate expansion in tropical weather.",
      finishes: "Matte PU, Italian Polyester, Natural Oil",
      use: "Dining Tables, Fluted Wall Louvers, TV Consoles"
    },
    marble: {
      title: "Italian Statuario & Calacatta Gold",
      tag: "Natural Luxury Stone",
      warranty: "Lifetime Structural Stone",
      img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      desc: "Hand-selected quarried Italian marble slabs, book-matched by master masons. Sealed with diamond nano-coating to prevent staining from turmeric, wine, or citrus.",
      finishes: "Honed Satin, High Polish, Leather Touch",
      use: "Island Countertops, Feature Walls, Vanity Tops"
    },
    brass: {
      title: "Brushed Champagne Brass & Titanium PVD",
      tag: "Architectural Metalwork",
      warranty: "15-Year Tarnish Free",
      img: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1200&q=80",
      desc: "Precision laser-cut stainless steel frames coated with Physical Vapor Deposition (PVD) titanium layer in champagne gold and rose bronze. Scratch, salt-air, and corrosion resistant.",
      finishes: "Brushed Hairline, Mirror Polish, Matte Antique",
      use: "Retail Display Racks, Console Trims, Partition Frames"
    },
    fabric: {
      title: "High-Martindale Bouclé & Italian Velvets",
      tag: "Bespoke Textiles",
      warranty: "100,000+ Martindale Rubs",
      img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      desc: "Heavy commercial-grade upholstery fabrics infused with stain-guard hydrophobic barriers. High tactile warmth with zero pilling, designed for daily living comfort.",
      finishes: "Textured Bouclé, Crushed Velvet, Full-Grain Leather",
      use: "Curved Living Sofas, Bed Headboards, Lounge Chairs"
    },
    plywood: {
      title: "BWP Grade 710 Calibrated Marine Core",
      tag: "Structural Foundation",
      warranty: "10-Year Anti-Termite Warranty",
      img: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=80",
      desc: "Quadruple-pressed, calibrated marine-grade plywood made from 100% hardwood timber veneers bonded with unextended phenol-formaldehyde resin. Zero gaps, 100% waterproof.",
      finishes: "Calibrated 16mm/18mm/25mm Sheets",
      use: "Modular Kitchen Carcasses, Heavy Wardrobes, Bed Boxes"
    }
  };

  const materialTabBtns = document.querySelectorAll('.material-tab-item');
  const matImg = document.getElementById('material-display-img');
  const matTag = document.getElementById('material-display-tag');
  const matTitle = document.getElementById('material-display-title');
  const matWarranty = document.getElementById('material-display-warranty');
  const matDesc = document.getElementById('material-display-desc');
  const matFinishes = document.getElementById('material-display-finishes');
  const matUse = document.getElementById('material-display-use');

  materialTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      materialTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.getAttribute('data-material');
      const data = materialData[key];
      if (!data) return;

      if (matImg) {
        matImg.style.opacity = '0.3';
        setTimeout(() => {
          matImg.src = data.img;
          matImg.alt = data.title;
          matImg.style.opacity = '1';
        }, 150);
      }
      if (matTag) matTag.textContent = data.tag;
      if (matTitle) matTitle.textContent = data.title;
      if (matWarranty) matWarranty.innerHTML = `<i data-lucide="award"></i> ${data.warranty}`;
      if (matDesc) matDesc.textContent = data.desc;
      if (matFinishes) matFinishes.textContent = data.finishes;
      if (matUse) matUse.textContent = data.use;
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  });

  // ==========================================================================
  // 14. Interactive Turnkey Cost & Timeline Estimator
  // ==========================================================================
  const spacePills = document.querySelectorAll('.calc-pill');
  const tierCards = document.querySelectorAll('.tier-card');
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox-label input');
  const finalPriceElem = document.getElementById('calc-final-price');
  const daysValElem = document.getElementById('calc-days-val');
  const shareWaBtn = document.getElementById('calc-share-whatsapp');

  let currentBasePrice = 1450000;
  let currentDays = 45;
  let currentSpaceName = "3BHK Luxury Flat";
  let currentMultiplier = 1.0;
  let currentTierName = "Signature Bespoke";

  function formatIndianCurrency(num) {
    return num.toLocaleString('en-IN');
  }

  function updateCalculation() {
    let addonsTotal = 0;
    addonCheckboxes.forEach(chk => {
      if (chk.checked) {
        addonsTotal += parseInt(chk.getAttribute('data-addon-cost') || 0);
      }
    });

    const rawTotal = Math.round((currentBasePrice * currentMultiplier) + addonsTotal);
    const formattedPrice = formatIndianCurrency(rawTotal);

    if (finalPriceElem) finalPriceElem.textContent = formattedPrice;
    if (daysValElem) daysValElem.textContent = `${currentDays} Days`;

    if (shareWaBtn) {
      const msg = `Hello CFI Architects! I configured my project on your website estimator:%0A- Space: ${currentSpaceName}%0A- Execution Tier: ${currentTierName}%0A- Approximate Estimate: Rs.${formattedPrice}%0A- Guaranteed Handover: ${currentDays} Days.%0AI'd like to book a site measurement visit!`;
      shareWaBtn.href = `https://wa.me/916375507029?text=${msg}`;
    }
  }

  spacePills.forEach(pill => {
    pill.addEventListener('click', () => {
      spacePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentBasePrice = parseInt(pill.getAttribute('data-base') || 1450000);
      currentDays = parseInt(pill.getAttribute('data-days') || 45);
      const span = pill.querySelector('span');
      if (span) currentSpaceName = span.textContent.trim();
      updateCalculation();
    });
  });

  tierCards.forEach(card => {
    card.addEventListener('click', () => {
      tierCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentMultiplier = parseFloat(card.getAttribute('data-multiplier') || 1.0);
      currentTierName = card.getAttribute('data-tier-name') || "Signature Bespoke";
      updateCalculation();
    });
  });

  addonCheckboxes.forEach(chk => {
    chk.addEventListener('change', updateCalculation);
  });

  updateCalculation();

  // ==========================================================================
  // 15. Architectural FAQ Accordion
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

});

