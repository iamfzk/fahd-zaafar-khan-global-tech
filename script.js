/**
 * FZK Global Technologies - Website Scripts
 * Professional IT Company Website
 */

document.addEventListener('DOMContentLoaded', () => {
    initPageLoader();
    initLanguageSwitcher();
    initQuickProjectSelect();
    initScrollProgress();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initActiveNavLink();
    initScrollReveal();
    initCounterAnimation();
    initContactForm();
    initTypingAnimation();
    initThemeToggle();
    initBackToTop();
    initProjectFilter();
    initProjectModal();
    initFormValidation();
    initSkillAnimation();
    initTestimonials();
    initFAQ();
    initCookieConsent();
    initNewsletter();
    initParticles();
    initStickyCta();
    initCopyButtons();
    initFooterForm();
    initExitPopup();
    initCalculator();
    initLeadMagnet();
    initChatWidget();
    initKeyboardShortcuts();
    initROICalculator();
    initPWAInstall();
    initPrintButton();
    initCharCount();
    initQuickContact();
    initFooterYear();
});

/**
 * Page loader - hide when page is ready
 */
function initPageLoader() {
    const loader = document.getElementById('pageLoader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader?.classList.add('hidden');
        }, 800);
    });
}

/**
 * Scroll progress bar
 */
function initScrollProgress() {
    const progress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progress) progress.style.width = percent + '%';
    });
}

/**
 * Navbar scroll effect - add shadow when scrolled
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Update active nav link based on scroll position
 */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/**
 * Scroll reveal animation for sections
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.section-header, .service-card, .tech-item, .project-card, .about-content, .skill-item, .faq-item, .team-card, .cert-badge, .client-logo, .testimonials-slider, .process-step, .pricing-card, .timeline-item, .map-wrapper, .compare-table-wrap, .as-seen-logos, .industry-tags'
    );

    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, revealOptions);

    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        revealObserver.observe(el);
    });
}

/**
 * Animated counter for stats
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'), 10);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

/**
 * Language switcher (EN / Hindi / Urdu)
 */
const TRANSLATIONS = {
    en: {
        heroTitle: 'Building Digital Solutions for the Future',
        heroSubPrefix: 'We provide',
        btnServices: 'Our Services',
        btnContact: 'Contact Us',
        typingPhrases: ['Java Full Stack Development', 'Spring Boot APIs', 'Cloud Solutions', 'Modern Web Applications', 'React & Angular Apps', 'Microservices Architecture']
    },
    hi: {
        heroTitle: 'भविष्य के लिए डिजिटल समाधान निर्माण',
        heroSubPrefix: 'हम प्रदान करते हैं',
        btnServices: 'हमारी सेवाएं',
        btnContact: 'संपर्क करें',
        typingPhrases: ['Java फुल स्टैक डेवलपमेंट', 'Spring Boot APIs', 'क्लाउड सॉल्यूशन', 'आधुनिक वेब एप्लिकेशन', 'React और Angular ऐप्स', 'माइक्रोसर्विसेस आर्किटेक्चर']
    },
    ur: {
        heroTitle: 'مستقبل کے لیے ڈیجیٹل حل کی تعمیر',
        heroSubPrefix: 'ہم فراہم کرتے ہیں',
        btnServices: 'ہماری خدمات',
        btnContact: 'رابطہ کریں',
        typingPhrases: ['Java Full Stack Development', 'Spring Boot APIs', 'کلاؤڈ حل', 'جدید ویب ایپلیکیشنز', 'React اور Angular ایپس', 'مائیکرو سروسز آرکیٹیکچر']
    }
};

function initLanguageSwitcher() {
    const switcher = document.getElementById('langSwitcher');
    const dropdown = document.getElementById('langDropdown');
    const wrap = document.querySelector('.lang-switcher-wrap');
    const langLabel = switcher?.querySelector('span');

    let currentLang = localStorage.getItem('fzk_lang') || 'en';
    applyLanguage(currentLang, { isInitialLoad: true });
    if (langLabel) langLabel.textContent = currentLang === 'en' ? 'EN' : currentLang === 'hi' ? 'हि' : 'اردو';
    if (document.documentElement.lang !== currentLang) document.documentElement.lang = currentLang === 'ur' ? 'ur' : currentLang === 'hi' ? 'hi' : 'en';

    switcher?.addEventListener('click', (e) => {
        e.stopPropagation();
        wrap?.classList.toggle('open');
    });

    dropdown?.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            currentLang = lang;
            applyLanguage(lang, { isInitialLoad: false });
            localStorage.setItem('fzk_lang', lang);
            if (langLabel) langLabel.textContent = lang === 'en' ? 'EN' : lang === 'hi' ? 'हि' : 'اردو';
            wrap?.classList.remove('open');
        });
    });

    document.addEventListener('click', () => wrap?.classList.remove('open'));
}

/**
 * Quick project selector - scroll to contact and pre-fill project type
 */
function initQuickProjectSelect() {
    document.querySelectorAll('.quick-select-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = btn.getAttribute('data-type');
            const select = document.getElementById('projectType');
            if (select && type) {
                select.value = type;
            }
        });
    });
}

function applyLanguage(lang, opts = {}) {
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    const heroTitle = document.getElementById('heroTitle');
    const heroSubPrefix = document.getElementById('heroSubPrefix');
    const btnServices = document.getElementById('btnServices');
    const btnContact = document.getElementById('btnContact');
    const typingEl = document.getElementById('typingText');

    if (heroTitle) heroTitle.textContent = t.heroTitle;
    if (heroSubPrefix) heroSubPrefix.textContent = t.heroSubPrefix;
    if (btnServices) btnServices.textContent = t.btnServices;
    if (btnContact) btnContact.textContent = t.btnContact;

    if (!opts.isInitialLoad && typingEl && t.typingPhrases) {
        startTypingAnimation(t.typingPhrases, typingEl);
    }
}

function startTypingAnimation(phrases, typingEl) {
    if (!typingEl || !phrases?.length) return;
    if (window.__typingInterval) clearTimeout(window.__typingInterval);
    let phraseIndex = 0, charIndex = 0, isDeleting = false;
    const typeSpeed = 80, deleteSpeed = 50, pauseTime = 2000;

    function type() {
        const current = phrases[phraseIndex];
        if (isDeleting) {
            typingEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }
        let delay = isDeleting ? deleteSpeed : typeSpeed;
        if (!isDeleting && charIndex === current.length) {
            delay = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 500;
        }
        window.__typingInterval = setTimeout(type, delay);
    }
    type();
}

/**
 * Typing animation in hero
 */
function initTypingAnimation() {
    const lang = localStorage.getItem('fzk_lang') || 'en';
    const phrases = (TRANSLATIONS[lang] || TRANSLATIONS.en).typingPhrases;
    const typingEl = document.getElementById('typingText');
    if (!typingEl) return;
    setTimeout(() => startTypingAnimation(phrases, typingEl), 1000);
}

/**
 * Dark mode toggle
 */
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const body = document.body;
    const moonIcon = toggle?.querySelector('.fa-moon');
    const sunIcon = toggle?.querySelector('.fa-sun');

    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (moonIcon) moonIcon.style.display = 'none';
        if (sunIcon) sunIcon.style.display = 'inline-block';
    }

    toggle?.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        if (moonIcon) moonIcon.style.display = isDark ? 'none' : 'inline-block';
        if (sunIcon) sunIcon.style.display = isDark ? 'inline-block' : 'none';
    });
}

/**
 * Back to top button
 */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn?.classList.add('visible');
        } else {
            btn?.classList.remove('visible');
        }
    });
    btn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Project filter by technology
 */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const noResults = document.getElementById('projectNoResults');

    function updateFilter(filter) {
        let visibleCount = 0;
        projectCards.forEach(card => {
            const tags = (card.getAttribute('data-tags') || '').split(',').map(t => t.trim());
            const show = filter === 'all' || tags.includes(filter);
            card.style.display = show ? '' : 'none';
            card.style.animation = show ? 'fadeIn 0.4s ease' : 'none';
            if (show) visibleCount++;
        });
        if (noResults) noResults.style.display = visibleCount === 0 ? 'flex' : 'none';
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateFilter(btn.getAttribute('data-filter'));
        });
    });
}

/**
 * Project detail modal
 */
function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const overlay = modal?.querySelector('.modal-overlay');
    const projectCards = document.querySelectorAll('.project-card');

    function openModal(title, description, tags) {
        modalBody.innerHTML = `
            <h3>${title}</h3>
            <p style="color: var(--gray); line-height: 1.8;">${description}</p>
            <div class="modal-tags">${tags.map(t => `<span>${t}</span>`).join('')}</div>
        `;
        modal?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal?.classList.remove('active');
        document.body.style.overflow = '';
    }

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3')?.textContent || '';
            const description = card.getAttribute('data-description') || card.querySelector('p')?.textContent || '';
            const tags = (card.getAttribute('data-tags') || '').split(',').map(t => t.trim());
            openModal(title, description, tags);
        });
    });

    modalClose?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => e.key === 'Escape' && closeModal());
}

/**
 * Real-time form validation
 */
/**
 * Skill bar animation
 */
function initSkillAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.skill-fill');
                const width = fill?.getAttribute('data-width') || 0;
                fill?.style.setProperty('--skill-width', width + '%');
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.3 });
    skillItems.forEach(el => observer.observe(el));
}

/**
 * Testimonials carousel
 */
function initTestimonials() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.getElementById('testimonialDots');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    let current = 0;

    if (cards.length === 0) return;

    cards.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('data-index', i);
        dotsContainer?.appendChild(dot);
    });

    const dots = document.querySelectorAll('.testimonial-dot');

    function show(index) {
        current = (index + cards.length) % cards.length;
        cards.forEach((c, i) => c.classList.toggle('active', i === current));
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    prevBtn?.addEventListener('click', () => show(current - 1));
    nextBtn?.addEventListener('click', () => show(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));

    setInterval(() => show(current + 1), 5000);
}

/**
 * FAQ accordion
 */
function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const btn = item.querySelector('.faq-question');
        btn?.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
}

/**
 * Cookie consent
 */
function initCookieConsent() {
    const consent = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('cookieAccept');
    const declineBtn = document.getElementById('cookieDecline');
    if (localStorage.getItem('cookiesAccepted') || localStorage.getItem('cookiesDeclined')) {
        consent?.classList.remove('visible');
        return;
    }
    setTimeout(() => consent?.classList.add('visible'), 2000);
    acceptBtn?.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        consent?.classList.remove('visible');
    });
    declineBtn?.addEventListener('click', () => {
        localStorage.setItem('cookiesDeclined', 'true');
        consent?.classList.remove('visible');
    });
}

/**
 * Particle background in hero
 */
function initParticles() {
    const canvas = document.getElementById('heroParticles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 50;

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2 + 0.5,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.15)';
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }

    resize();
    createParticles();
    animate();
    window.addEventListener('resize', () => { resize(); createParticles(); });
}

/**
 * Sticky CTA bar - show on scroll
 */
function initStickyCta() {
    const cta = document.getElementById('stickyCta');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600 && window.scrollY > lastScroll) {
            cta?.classList.add('visible');
        } else if (window.scrollY < 400) {
            cta?.classList.remove('visible');
        }
        lastScroll = window.scrollY;
    });
}

/**
 * Copy to clipboard buttons
 */
function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const text = btn.getAttribute('data-copy');
            try {
                await navigator.clipboard.writeText(text);
                btn.classList.add('copied');
                showNotification('Copied to clipboard!', 'success');
                setTimeout(() => btn.classList.remove('copied'), 2000);
            } catch {
                showNotification('Could not copy', 'error');
            }
        });
    });
}

/**
 * Project cost calculator
 */
function initCalculator() {
    const typeSelect = document.getElementById('calcType');
    const complexitySelect = document.getElementById('calcComplexity');
    const valueEl = document.getElementById('calcValue');
    const baseRanges = { web: [50000, 150000], api: [80000, 200000], fullstack: [150000, 400000], enterprise: [400000, 1500000] };

    function update() {
        const type = typeSelect?.value || 'web';
        const mult = parseFloat(complexitySelect?.value) || 1;
        const [min, max] = baseRanges[type];
        const rMin = Math.round(min * mult / 10000) * 10000;
        const rMax = Math.round(max * mult / 10000) * 10000;
        const fmt = (n) => n >= 100000 ? `${(n/100000).toFixed(1)}L` : `${(n/1000).toFixed(0)}K`;
        if (valueEl) valueEl.textContent = `₹${fmt(rMin)} - ₹${fmt(rMax)}`;
    }
    typeSelect?.addEventListener('change', update);
    complexitySelect?.addEventListener('change', update);
    update();
}

/**
 * Lead magnet popup
 */
function initLeadMagnet() {
    const magnet = document.getElementById('leadMagnet');
    const closeBtn = document.getElementById('leadClose');
    const form = document.getElementById('leadForm');
    if (localStorage.getItem('leadShown')) return;

    setTimeout(() => magnet?.classList.add('visible'), 15000);
    closeBtn?.addEventListener('click', () => {
        magnet?.classList.remove('visible');
        localStorage.setItem('leadShown', 'true');
    });
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Thank you! Opening your guide...', 'success');
        magnet?.classList.remove('visible');
        localStorage.setItem('leadShown', 'true');
        window.open('assets/brochure.html', '_blank', 'noopener');
    });
}

/**
 * Keyboard shortcuts
 */
function initKeyboardShortcuts() {
    const modal = document.getElementById('shortcutsModal');
    const closeBtn = document.getElementById('shortcutsClose');
    const overlay = modal?.querySelector('.shortcuts-overlay');

    document.addEventListener('keydown', (e) => {
        if (e.key === '?') {
            e.preventDefault();
            modal?.classList.toggle('active');
        }
        if (e.key === 'Escape') modal?.classList.remove('active');
        const inInput = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);
        if (!inInput && (e.key === 'h' || e.key === 'H')) {
            if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                window.location.hash = '#home';
            }
        }
        if (!inInput && (e.key === 'c' || e.key === 'C')) {
            if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                window.location.hash = '#contact';
            }
        }
        if (!inInput && (e.key === 'p' || e.key === 'P')) {
            if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                window.print();
            }
        }
        if (!inInput && (e.key === 'b' || e.key === 'B')) {
            if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    });

    closeBtn?.addEventListener('click', () => modal?.classList.remove('active'));
    overlay?.addEventListener('click', () => modal?.classList.remove('active'));
}

/**
 * Chat widget
 */
function initChatWidget() {
    const toggle = document.getElementById('chatToggle');
    const panel = document.getElementById('chatPanel');
    const closeBtn = document.getElementById('chatClose');
    const sendBtn = document.getElementById('chatSend');
    const input = document.getElementById('chatInput');

    toggle?.addEventListener('click', () => panel?.classList.toggle('open'));
    closeBtn?.addEventListener('click', () => panel?.classList.remove('open'));
    sendBtn?.addEventListener('click', () => {
        if (input?.value.trim()) {
            showNotification('For instant response, please WhatsApp us!', 'success');
            input.value = '';
            panel?.classList.remove('open');
        }
    });
}

/**
 * Exit intent popup - show when user moves mouse to leave
 */
function initExitPopup() {
    const popup = document.getElementById('exitPopup');
    const closeBtn = document.getElementById('exitPopupClose');
    const overlay = popup?.querySelector('.exit-popup-overlay');
    if (localStorage.getItem('exitPopupShown')) return;

    document.addEventListener('mouseout', (e) => {
        if (e.clientY < 10 && !popup?.classList.contains('active')) {
            popup?.classList.add('active');
            localStorage.setItem('exitPopupShown', 'true');
        }
    });

    function closePopup() {
        popup?.classList.remove('active');
    }
    closeBtn?.addEventListener('click', closePopup);
    overlay?.addEventListener('click', closePopup);
}

/**
 * Footer quick contact form - uses FormSubmit.co
 */
function initFooterForm() {
    const form = document.getElementById('footerForm');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]');
        const msg = form.querySelector('input[type="text"]');
        if (!email?.value.trim() || !msg?.value.trim()) return;
        const btn = form.querySelector('button[type="submit"]');
        const orig = btn?.textContent;
        if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }
        try {
            const formData = new FormData(form);
            const res = await fetch(form.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
            const data = await res.json();
            if (data.success === true || data.success === 'true' || res.ok) {
                window.location.href = 'thank-you.html';
                return;
            } else throw new Error();
        } catch {
            showNotification('Something went wrong. Please try again.', 'error');
        }
        if (btn) { btn.textContent = orig; btn.disabled = false; }
    });
}

/**
 * Newsletter form
 */
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (!input?.value.trim()) return;
        const btn = form.querySelector('button[type="submit"]');
        const orig = btn?.textContent;
        if (btn) { btn.textContent = '...'; btn.disabled = true; }
        try {
            const formData = new FormData(form);
            const res = await fetch(form.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
            const data = await res.json();
            if (data.success === true || data.success === 'true' || res.ok) {
                showNotification('Thank you for subscribing!', 'success');
                input.value = '';
            } else throw new Error();
        } catch {
            showNotification('Something went wrong. Please try again.', 'error');
        }
        if (btn) { btn.textContent = orig; btn.disabled = false; }
    });
}

/**
 * Real-time form validation
 */
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(input, msg) {
        const group = input.closest('.form-group');
        group?.classList.add('error');
        let errEl = group?.querySelector('.error-msg');
        if (!errEl) {
            errEl = document.createElement('div');
            errEl.className = 'error-msg';
            errEl.style.marginTop = '6px';
            group?.appendChild(errEl);
        }
        errEl.textContent = msg;
    }

    function clearError(input) {
        const group = input.closest('.form-group');
        group?.classList.remove('error');
        group?.querySelector('.error-msg')?.remove();
    }

    function validateField(input, validator, errorMsg) {
        if (validator(input.value)) {
            clearError(input);
        } else if (input.value.trim()) {
            showError(input, errorMsg);
        } else {
            clearError(input);
        }
    }

    nameInput?.addEventListener('blur', () => validateField(nameInput, v => v.trim().length >= 2, 'Name must be at least 2 characters'));
    emailInput?.addEventListener('blur', () => validateField(emailInput, validateEmail, 'Please enter a valid email address'));
    messageInput?.addEventListener('blur', () => validateField(messageInput, v => v.trim().length >= 10, 'Message must be at least 10 characters'));

    [nameInput, emailInput, messageInput].forEach(input => {
        input?.addEventListener('input', () => clearError(input));
    });
}

/**
 * Contact form handling - uses Formspree when action contains formspree.io
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const message = document.getElementById('message')?.value.trim();

        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        if (form.querySelector('input[name="_honey"]')?.value) return;

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn?.textContent;
        if (submitBtn) { submitBtn.textContent = 'Sending...'; submitBtn.disabled = true; }

        const action = form.getAttribute('action') || '';
        const useFormSubmit = action.includes('formsubmit.co');

        try {
            if (useFormSubmit) {
                const formData = new FormData(form);
                const res = await fetch(action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
                const data = await res.json();
                if (data.success === true || data.success === 'true' || res.ok) {
                    window.location.href = 'thank-you.html';
                    return;
                } else throw new Error(data.message || 'Failed');
            } else {
                await new Promise(r => setTimeout(r, 1200));
                showNotification('Thank you! Your message has been sent. We will get back to you soon.', 'success');
                form.reset();
            }
        } catch (err) {
            showNotification('Something went wrong. Please try emailing us directly.', 'error');
        }
        if (submitBtn) { submitBtn.textContent = originalText; submitBtn.disabled = false; }
    });
}

/**
 * Show notification toast
 */
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `notification-toast notification-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 500;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

/**
 * ROI Calculator
 */
function initROICalculator() {
    const processes = document.getElementById('roiProcesses');
    const hours = document.getElementById('roiHours');
    const hoursSaved = document.getElementById('roiHoursSaved');
    const costSaved = document.getElementById('roiCostSaved');

    function update() {
        const p = parseInt(processes?.value || 20, 10);
        const h = parseFloat(hours?.value || 2, 10);
        const totalHours = p * h;
        const monthlyCost = Math.round(totalHours * 4 * 250);
        if (hoursSaved) hoursSaved.textContent = totalHours;
        if (costSaved) costSaved.textContent = '₹' + monthlyCost.toLocaleString('en-IN');
    }

    processes?.addEventListener('input', update);
    hours?.addEventListener('input', update);
    update();
}

/**
 * PWA Install Prompt
 */
function initPWAInstall() {
    const banner = document.getElementById('pwaInstall');
    const closeBtn = document.getElementById('pwaClose');
    const installBtn = document.getElementById('pwaInstallBtn');

    if (!banner) return;

    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if (!localStorage.getItem('pwaInstallDismissed')) {
            setTimeout(() => banner.classList.add('visible'), 3000);
        }
    });

    closeBtn?.addEventListener('click', () => {
        banner.classList.remove('visible');
        localStorage.setItem('pwaInstallDismissed', 'true');
    });

    installBtn?.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') banner.classList.remove('visible');
        }
    });

    if (window.matchMedia('(display-mode: standalone)').matches) {
        banner.style.display = 'none';
    }
}

/**
 * Print button
 */
function initPrintButton() {
    document.getElementById('printBtn')?.addEventListener('click', () => window.print());
}

/**
 * Quick contact button - scroll to contact
 */
function initQuickContact() {
    document.getElementById('quickContactBtn')?.addEventListener('click', () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
}

/**
 * Dynamic footer year
 */
function initFooterYear() {
    const el = document.getElementById('footerYear');
    if (el) el.textContent = new Date().getFullYear();
}

/**
 * Character count for message textarea
 */
function initCharCount() {
    const msg = document.getElementById('message');
    const countEl = document.getElementById('charCount');
    if (!msg || !countEl) return;
    msg.addEventListener('input', () => { countEl.textContent = msg.value.length; });
    countEl.textContent = msg.value.length;
}
