/**
 * 제일기계 웹사이트 메인 JavaScript
 * DN Solutions 스타일 애니메이션 적용
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initHeroSlider();
    initScrollToTop();
    initHeaderScroll();
    initSmoothScroll();
    initScrollAnimations();
    initCounterAnimation();
    initParallax();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const hasSubmenu = document.querySelectorAll('.has-submenu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        document.addEventListener('click', function(e) {
            if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
                menuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    hasSubmenu.forEach(function(item) {
        const link = item.querySelector('a');
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('active');
            }
        });
    });
}

/**
 * Hero Slider with Enhanced Animations
 */
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dots .dot');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');

    if (slides.length === 0) return;

    let currentSlide = 0;
    let slideInterval;
    let isAnimating = false;

    function showSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        // Remove active from all
        slides.forEach((slide) => {
            slide.classList.remove('active');
        });

        dots.forEach((dot) => {
            dot.classList.remove('active');
        });

        // Add active to current
        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');

        // Reset hero content animations
        const content = slides[index].querySelector('.hero-content');
        if (content) {
            const elements = content.querySelectorAll('h1, p, .hero-buttons, .section-label');
            elements.forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; // Trigger reflow
                el.style.animation = null;
            });
        }

        currentSlide = index;

        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 6000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    startAutoSlide();

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        }
    });
}

/**
 * Scroll to Top Button
 */
function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.floating-btn.top');

    if (!scrollTopBtn) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');

    if (!header) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const currentScroll = window.scrollY;

                if (currentScroll > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                lastScroll = currentScroll;
                ticking = false;
            });

            ticking = true;
        }
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll Animations (AOS-like)
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    if (animatedElements.length === 0) {
        // Auto-add animations to elements
        addAutoAnimations();
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Auto-add animations to common elements
 */
function addAutoAnimations() {
    // Section headers
    document.querySelectorAll('.section-header').forEach((el, i) => {
        el.setAttribute('data-aos', 'fade-up');
    });

    // Category cards
    document.querySelectorAll('.category-card').forEach((el, i) => {
        el.setAttribute('data-aos', 'fade-up');
        el.setAttribute('data-aos-delay', (i * 100).toString());
    });

    // Product cards
    document.querySelectorAll('.product-card').forEach((el, i) => {
        el.setAttribute('data-aos', 'fade-up');
        el.setAttribute('data-aos-delay', ((i % 4) * 100).toString());
    });

    // Service cards
    document.querySelectorAll('.service-card').forEach((el, i) => {
        el.setAttribute('data-aos', 'fade-up');
        el.setAttribute('data-aos-delay', (i * 100).toString());
    });

    // Value cards
    document.querySelectorAll('.value-card').forEach((el, i) => {
        el.setAttribute('data-aos', 'zoom-in');
        el.setAttribute('data-aos-delay', (i * 100).toString());
    });

    // About section
    document.querySelectorAll('.about-image').forEach(el => {
        el.setAttribute('data-aos', 'fade-right');
    });

    document.querySelectorAll('.about-content').forEach(el => {
        el.setAttribute('data-aos', 'fade-left');
    });

    // News items
    document.querySelectorAll('.news-list li').forEach((el, i) => {
        el.setAttribute('data-aos', 'fade-up');
        el.setAttribute('data-aos-delay', (i * 50).toString());
    });

    // Partner logos
    document.querySelectorAll('.partner-logo').forEach((el, i) => {
        el.setAttribute('data-aos', 'zoom-in');
        el.setAttribute('data-aos-delay', (i * 50).toString());
    });

    // CTA section
    document.querySelectorAll('.cta-content').forEach(el => {
        el.setAttribute('data-aos', 'fade-up');
    });

    // Re-observe new elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Counter Animation for Statistics
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-item strong, .about-features strong');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const match = text.match(/(\d+)/);

    if (!match) return;

    const target = parseInt(match[1]);
    const suffix = text.replace(/[\d,]/g, '');
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (easeOutExpo)
        const easeProgress = 1 - Math.pow(2, -10 * progress);

        const current = Math.floor(start + (target - start) * easeProgress);
        element.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString() + suffix;
            element.classList.add('counter-animated');
        }
    }

    requestAnimationFrame(update);
}

/**
 * Parallax Effect
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-bg');

    if (parallaxElements.length === 0) return;

    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.scrollY;

                parallaxElements.forEach(el => {
                    const speed = 0.3;
                    el.style.transform = `scale(1.05) translateY(${scrolled * speed}px)`;
                });

                ticking = false;
            });

            ticking = true;
        }
    });
}

/**
 * Form Validation Helper
 */
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            field.parentElement.classList.add('has-error');
        } else {
            field.classList.remove('error');
            field.parentElement.classList.remove('has-error');
        }
    });

    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            isValid = false;
            emailField.classList.add('error');
        }
    }

    const phoneField = form.querySelector('[type="tel"]');
    if (phoneField && phoneField.value) {
        const phoneRegex = /^[\d\-\+\s()]+$/;
        if (!phoneRegex.test(phoneField.value)) {
            isValid = false;
            phoneField.classList.add('error');
        }
    }

    return isValid;
}

/**
 * Lazy Load Images
 */
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

/**
 * Product Filter (for product pages)
 */
function initProductFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;

            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            products.forEach(product => {
                const category = product.dataset.category;

                if (filter === 'all' || category === filter) {
                    product.style.display = '';
                    product.classList.add('aos-animate');
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
}

// Initialize product filter if on product page
if (document.querySelector('.filter-btn')) {
    initProductFilter();
}

/**
 * Scroll Progress Indicator
 */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="progress-bar"></div>';
    document.body.prepend(progressBar);

    const bar = progressBar.querySelector('.progress-bar');

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        bar.style.width = scrollPercent + '%';
    });
}

/**
 * Image Error Handler
 */
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        // Placeholder for broken images
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f5f5f5" width="400" height="300"/%3E%3Ctext fill="%23aaa" font-family="sans-serif" font-size="20" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E';
        this.classList.add('img-placeholder');
    });
});
