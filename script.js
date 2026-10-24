/**
 * FZK Global Technologies - Website Scripts
 * Professional IT Company Website
 */

document.addEventListener('DOMContentLoaded', () => {
    initReducedMotion();
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
    initFaqSearch();
    initOnlineStatus();
    initCookieConsent();
    initNewsletter();
    initParticles();
    initStickyCta();
    initCopyButtons();
    initFooterForm();
    initExitPopup();
    initCalculator();
    initTechSearch();
    initKeyboardShortcuts();
    initROICalculator();
    initPWAInstall();
    initCharCount();
    initFooterYear();
    initVideoPlayer();
    initAiAssistant();
});

/**
 * Respect prefers-reduced-motion (accessibility)
 */
function initReducedMotion() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        document.body.classList.add('reduce-motion');
    }
}

/**
 * Video playlist: play / add / remove (localStorage)
 * Default: Spring Boot Microservices (OktaDev) — replaced old Node.js placeholder
 */
function initVideoPlayer() {
    const STORAGE_KEY = 'fzk_video_playlist';
    const player = document.getElementById('videoPlayer');
    const playlistEl = document.getElementById('videoPlaylist');
    const addForm = document.getElementById('videoAddForm');
    if (!player || !playlistEl) return;

    const defaults = [
        {
            id: 'm-lhymNdPBc',
            title: 'Java Microservices with Spring Boot & Spring Cloud',
            meta: '~11 min · HD'
        }
    ];

    function loadList() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length) return parsed;
            }
        } catch (_) {}
        return defaults.slice();
    }

    function saveList(list) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    function extractId(input) {
        if (!input) return '';
        const s = input.trim();
        if (/^[\w-]{11}$/.test(s)) return s;
        try {
            const u = new URL(s);
            if (u.hostname.includes('youtu.be')) return u.pathname.slice(1).split('/')[0];
            if (u.searchParams.get('v')) return u.searchParams.get('v');
            const parts = u.pathname.split('/');
            const embedIdx = parts.indexOf('embed');
            if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1];
            const shortsIdx = parts.indexOf('shorts');
            if (shortsIdx >= 0 && parts[shortsIdx + 1]) return parts[shortsIdx + 1];
        } catch (_) {}
        return '';
    }

    let list = loadList();
    // Migrate away from old Node.js placeholder if still present as only video
    if (list.length === 1 && list[0].id === 'TlB_eWDSMt4') {
        list = defaults.slice();
        saveList(list);
    }

    let activeId = list[0]?.id || defaults[0].id;

    function showFacade(video) {
        player.setAttribute('data-video-id', video.id);
        player.innerHTML = `
            <button type="button" class="video-facade" id="videoPlayBtn" aria-label="Play video">
                <div class="video-facade-bg" aria-hidden="true"></div>
                <div class="video-facade-content">
                    <span class="video-play-ring"><i class="fas fa-play"></i></span>
                    <span class="video-facade-label">${video.title}</span>
                    <span class="video-facade-meta"><i class="fas fa-clock"></i> ${video.meta || 'YouTube'}</span>
                </div>
            </button>`;
        document.getElementById('videoPlayBtn')?.addEventListener('click', () => playVideo(video));
    }

    function playVideo(video) {
        activeId = video.id;
        player.setAttribute('data-video-id', video.id);
        player.innerHTML = `<iframe src="https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0" title="${video.title.replace(/"/g, '')}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        renderPlaylist();
    }

    function renderPlaylist() {
        playlistEl.innerHTML = list.map((v) => `
            <li class="video-playlist-item${v.id === activeId ? ' active' : ''}" data-id="${v.id}">
                <button type="button" class="video-playlist-play" title="Play">
                    <i class="fas fa-play"></i>
                    <span>${v.title}</span>
                </button>
                <button type="button" class="video-playlist-remove" title="Remove" aria-label="Remove ${v.title}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </li>`).join('') || '<li class="video-playlist-empty">No videos. Add one below.</li>';

        playlistEl.querySelectorAll('.video-playlist-item').forEach((li) => {
            const id = li.getAttribute('data-id');
            const video = list.find((x) => x.id === id);
            li.querySelector('.video-playlist-play')?.addEventListener('click', () => {
                if (video) playVideo(video);
            });
            li.querySelector('.video-playlist-remove')?.addEventListener('click', () => {
                if (list.length <= 1) {
                    showNotification('At least one video required', 'error');
                    return;
                }
                list = list.filter((x) => x.id !== id);
                saveList(list);
                if (activeId === id) {
                    activeId = list[0].id;
                    showFacade(list[0]);
                }
                renderPlaylist();
                showNotification('Video removed', 'success');
            });
        });
    }

    addForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const url = document.getElementById('videoAddUrl')?.value || '';
        const titleInput = document.getElementById('videoAddTitle')?.value?.trim();
        const id = extractId(url);
        if (!id) {
            showNotification('Invalid YouTube link', 'error');
            return;
        }
        if (list.some((v) => v.id === id)) {
            showNotification('Video already in playlist', 'error');
            return;
        }
        const video = {
            id,
            title: titleInput || `YouTube video (${id})`,
            meta: 'YouTube'
        };
        list.push(video);
        saveList(list);
        addForm.reset();
        renderPlaylist();
        showNotification('Video added', 'success');
    });

    const current = list.find((v) => v.id === activeId) || list[0];
    showFacade(current);
    renderPlaylist();
}

/**
 * Page loader — hide ASAP (don't wait for YouTube/fonts/CDN)
 */
function initPageLoader() {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;
    const hide = () => loader.classList.add('hidden');
    // Show content as soon as DOM is ready
    requestAnimationFrame(() => setTimeout(hide, 200));
    // Safety: always hide within 1.2s even if something hangs
    setTimeout(hide, 1200);
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
        '.section-header, .service-card, .tech-item, .project-card, .about-content, .skill-item, .faq-item, .team-card, .cert-badge, .client-logo, .testimonials-slider, .process-step, .pricing-card, .timeline-item, .map-wrapper, .compare-table-wrap, .as-seen-logos, .industry-tags, .blog-card, .guarantee-card, .video-showcase'
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
        typingPhrases: ['Java Full Stack Development', 'AI Engineer Solutions', 'Data Scientist with AI', 'Spring Boot APIs', 'Cloud Solutions', 'Microservices Architecture']
    },
    hi: {
        heroTitle: 'भविष्य के लिए डिजिटल समाधान निर्माण',
        heroSubPrefix: 'हम प्रदान करते हैं',
        btnServices: 'हमारी सेवाएं',
        btnContact: 'संपर्क करें',
        typingPhrases: ['Java फुल स्टैक डेवलपमेंट', 'AI Engineer सॉल्यूशन', 'Data Scientist with AI', 'Spring Boot APIs', 'क्लाउड सॉल्यूशन', 'माइक्रोसर्विसेस आर्किटेक्चर']
    },
    ur: {
        heroTitle: 'مستقبل کے لیے ڈیجیٹل حل کی تعمیر',
        heroSubPrefix: 'ہم فراہم کرتے ہیں',
        btnServices: 'ہماری خدمات',
        btnContact: 'رابطہ کریں',
        typingPhrases: ['Java Full Stack Development', 'AI Engineer Solutions', 'Data Scientist with AI', 'Spring Boot APIs', 'کلاؤڈ حل', 'مائیکرو سروسز آرکیٹیکچر']
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
 * FAQ search filter
 */
function initFaqSearch() {
    const input = document.getElementById('faqSearch');
    const items = document.querySelectorAll('.faq-item');
    const noResults = document.getElementById('faqNoResults');
    if (!input || !items.length) return;

    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        let visible = 0;
        items.forEach(item => {
            const text = (item.textContent || '').toLowerCase();
            const show = !q || text.includes(q);
            item.style.display = show ? '' : 'none';
            if (show) visible++;
        });
        if (noResults) noResults.hidden = visible > 0;
    });
}

/**
 * Dynamic online status (Mon–Fri 9AM–6PM IST)
 */
function initOnlineStatus() {
    const badge = document.getElementById('onlineStatus');
    const text = document.getElementById('onlineStatusText');
    if (!badge || !text) return;

    const now = new Date();
    const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const day = ist.getDay();
    const hour = ist.getHours();
    const isOnline = day >= 1 && day <= 5 && hour >= 9 && hour < 18;

    if (isOnline) {
        badge.classList.remove('is-offline');
        text.textContent = "We're online now";
    } else {
        badge.classList.add('is-offline');
        text.textContent = 'Offline — reply next business day';
    }
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
 * Galaxy starfield in hero (disabled when user prefers reduced motion)
 */
function initParticles() {
    const canvas = document.getElementById('heroParticles');
    if (!canvas || document.body.classList.contains('reduce-motion')) return;

    const ctx = canvas.getContext('2d');
    let stars = [];
    const starCount = 40;

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    function createStars() {
        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.8 + 0.3,
                speed: Math.random() * 0.35 + 0.05,
                twinkle: Math.random() * Math.PI * 2,
                twinkleSpeed: Math.random() * 0.04 + 0.01
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.y += s.speed;
            s.twinkle += s.twinkleSpeed;
            if (s.y > canvas.height) {
                s.y = 0;
                s.x = Math.random() * canvas.width;
            }
            const alpha = 0.35 + Math.abs(Math.sin(s.twinkle)) * 0.55;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }

    resize();
    createStars();
    animate();
    window.addEventListener('resize', () => { resize(); createStars(); });
}

/**
 * Sticky CTA bar - show on scroll; lift FABs so nothing overlaps
 */
function initStickyCta() {
    const cta = document.getElementById('stickyCta');
    let lastScroll = 0;

    function syncFabOffset() {
        const open = cta?.classList.contains('visible');
        document.body.classList.toggle('has-sticky-cta', !!open);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600 && window.scrollY > lastScroll) {
            cta?.classList.add('visible');
        } else if (window.scrollY < 400) {
            cta?.classList.remove('visible');
        }
        lastScroll = window.scrollY;
        syncFabOffset();
    });
    syncFabOffset();
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
 * Tech stack search filter
 */
function initTechSearch() {
    const input = document.getElementById('techSearch');
    const items = document.querySelectorAll('.tech-item');
    const noResults = document.getElementById('techNoResults');
    if (!input || !items.length) return;

    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        let visible = 0;
        items.forEach(item => {
            const label = (item.getAttribute('data-tech') || item.textContent || '').toLowerCase();
            const show = !q || label.includes(q);
            item.classList.toggle('is-hidden', !show);
            if (show) visible++;
        });
        if (noResults) noResults.hidden = visible > 0;
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
 * FZK AI Assistant — EN / Hindi / Arabic smart chatbot
 */
function initAiAssistant() {
    const root = document.getElementById('aiAssistant');
    const toggle = document.getElementById('aiToggle');
    const panel = document.getElementById('aiPanel');
    const closeBtn = document.getElementById('aiClose');
    const form = document.getElementById('aiForm');
    const input = document.getElementById('aiInput');
    const messages = document.getElementById('aiMessages');
    const chipsEl = document.getElementById('aiChips');
    const langGroup = document.getElementById('aiLang');
    const statusText = document.getElementById('aiStatusText');
    if (!root || !toggle || !panel || !messages) return;

    const WA = 'https://wa.me/917728855804?text=' + encodeURIComponent("Hi, I'd like to discuss a project with FZK Global Technologies.");
    const CONTACT = '#contact';
    const PHONE = 'tel:+917728855804';
    const LANG_KEY = 'fzk_ai_lang';
    let lang = localStorage.getItem(LANG_KEY) || 'en';
    if (!['en', 'hi', 'ar'].includes(lang)) lang = 'en';

    const ui = {
        en: {
            status: 'Online · EN / हिं / ع',
            placeholder: 'Ask in English / हिंदी / العربية…',
            welcome: 'Hello! I am the <strong>FZK AI Assistant</strong>.\n\nAsk about AI Engineer, Java Full Stack, pricing, or timelines — in English, Hindi, or Arabic.\n\nQuick options below.',
            chips: [
                { id: 'services', label: 'Services' },
                { id: 'ai', label: 'AI Engineer' },
                { id: 'pricing', label: 'Pricing' },
                { id: 'timeline', label: 'Timeline' },
                { id: 'contact', label: 'Contact' },
                { id: 'call', label: 'Free call' }
            ]
        },
        hi: {
            status: 'ऑनलाइन · EN / हिं / ع',
            placeholder: 'अंग्रेज़ी / हिंदी / العربية में पूछें…',
            welcome: 'नमस्ते! मैं <strong>FZK AI Assistant</strong> हूँ।\n\nAI Engineer, Java Full Stack, कीमत, टाइमलाइन — अंग्रेज़ी, हिंदी या अरबी में पूछ सकते हैं।\n\nनीचे क्विक विकल्प हैं।',
            chips: [
                { id: 'services', label: 'सेवाएँ' },
                { id: 'ai', label: 'AI Engineer' },
                { id: 'pricing', label: 'कीमत' },
                { id: 'timeline', label: 'समय' },
                { id: 'contact', label: 'संपर्क' },
                { id: 'call', label: 'फ्री कॉल' }
            ]
        },
        ar: {
            status: 'متصل · EN / हिं / ع',
            placeholder: 'اسأل بالإنجليزية / हिंदी / العربية…',
            welcome: 'مرحبًا! أنا <strong>مساعد FZK الذكي</strong>.\n\nاسأل عن هندسة الذكاء الاصطناعي، Java Full Stack، الأسعار أو الجداول — بالإنجليزية أو الهندية أو العربية.\n\nخيارات سريعة بالأسفل.',
            chips: [
                { id: 'services', label: 'الخدمات' },
                { id: 'ai', label: 'مهندس AI' },
                { id: 'pricing', label: 'الأسعار' },
                { id: 'timeline', label: 'المدة' },
                { id: 'contact', label: 'تواصل' },
                { id: 'call', label: 'مكالمة مجانية' }
            ]
        }
    };

    const intents = [
        {
            id: 'greet',
            keys: ['hi', 'hello', 'hey', 'namaste', 'namaskar', 'hii', 'good morning', 'good evening', 'salaam', 'salam', 'مرحبا', 'السلام', 'اهلا', 'أهلا', 'नमस्ते', 'हेलो'],
            replies: {
                en: 'Hello! 👋 I am the FZK AI Assistant.\n\nI help with AI Engineer, Java Full Stack, Spring Boot microservices, Data Science, and AWS Cloud projects.\n\nWhat would you like to know — services, pricing, or a free consultation?',
                hi: 'नमस्ते! 👋 मैं FZK AI Assistant हूँ।\n\nAI Engineer, Java Full Stack, Spring Boot, Data Science और AWS Cloud प्रोजेक्ट्स में मदद करता हूँ।\n\nक्या जानना चाहते हैं — सेवाएँ, कीमत, या फ्री सलाह?',
                ar: 'مرحبًا! 👋 أنا مساعد FZK.\n\nأساعد في هندسة الذكاء الاصطناعي، Java Full Stack، Spring Boot، علوم البيانات، وسحابة AWS.\n\nماذا تريد أن تعرف — الخدمات، الأسعار، أم استشارة مجانية؟'
            }
        },
        {
            id: 'services',
            keys: ['service', 'services', 'kya karte', 'offer', 'what do you', 'solutions', 'kaam', 'सेवा', 'خدمات', 'خدمة', 'ماذا تقدمون'],
            replies: {
                en: 'We deliver:\n• AI Engineer Solutions (LangChain, ML, automation)\n• Data Scientist with AI\n• Java Full Stack & Spring Boot microservices\n• REST APIs\n• React / Angular apps\n• AWS cloud deployment\n\nDetails: <a href="#services">Services</a>',
                hi: 'हम ये देते हैं:\n• AI Engineer Solutions (LangChain, ML, automation)\n• Data Scientist with AI\n• Java Full Stack & Spring Boot microservices\n• REST APIs\n• React / Angular apps\n• AWS cloud deployment\n\nविवरण: <a href="#services">Services</a>',
                ar: 'نقدّم:\n• حلول مهندس الذكاء الاصطناعي (LangChain، ML، الأتمتة)\n• عالم بيانات مع AI\n• Java Full Stack و Spring Boot\n• واجهات REST API\n• تطبيقات React / Angular\n• نشر سحابة AWS\n\nالتفاصيل: <a href="#services">Services</a>'
            }
        },
        {
            id: 'ai',
            keys: ['ai engineer', 'ai', 'artificial', 'machine learning', 'langchain', 'chatgpt', 'llm', 'genai', 'generative', 'مهندس', 'ذكاء اصطناعي', 'الذكاء'],
            replies: {
                en: 'AI Engineer Solutions: custom AI/ML systems, LangChain apps, intelligent automation, and AI features in your product.\n\nUse-cases: chatbots, document AI, fraud detection, recommendations.\n\nDiscuss: <a href="' + CONTACT + '">Get Free Quote</a> · <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a>',
                hi: 'AI Engineer Solutions: कस्टम AI/ML सिस्टम, LangChain ऐप्स, स्मार्ट ऑटोमेशन, और प्रोडक्ट में AI फीचर्स।\n\nउदाहरण: चैटबॉट, document AI, fraud detection, recommendations.\n\nबात करें: <a href="' + CONTACT + '">Get Free Quote</a> · <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a>',
                ar: 'حلول مهندس AI: أنظمة ذكاء اصطناعي مخصصة، تطبيقات LangChain، أتمتة ذكية، وميزات AI في منتجك.\n\nحالات الاستخدام: روبوتات محادثة، ذكاء المستندات، كشف الاحتيال، التوصيات.\n\nناقش معنا: <a href="' + CONTACT + '">عرض مجاني</a> · <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a>'
            }
        },
        {
            id: 'data',
            keys: ['data scien', 'analytics', 'pipeline', 'predictive', 'dashboard', 'डेटा', 'بيانات', 'تحليلات'],
            replies: {
                en: 'Data Scientist with AI: data pipelines, predictive models, analytics dashboards, and AI-driven insights — from raw data to decisions.\n\nTalk to us: <a href="' + CONTACT + '">Contact form</a>',
                hi: 'Data Scientist with AI: डेटा पाइपलाइन, प्रेडिक्टिव मॉडल, एनालिटिक्स डैशबोर्ड, और AI insights — डेटा से बिज़नेस निर्णय तक।\n\nबात करें: <a href="' + CONTACT + '">Contact form</a>',
                ar: 'عالم بيانات مع AI: خطوط بيانات، نماذج تنبؤية، لوحات تحليلات، ورؤى مدعومة بالذكاء الاصطناعي.\n\nتواصل: <a href="' + CONTACT + '">نموذج التواصل</a>'
            }
        },
        {
            id: 'java',
            keys: ['java', 'spring', 'microservice', 'backend', 'api', 'rest'],
            replies: {
                en: 'We build enterprise Java + Spring Boot microservices and secure REST APIs — banking, insurance, healthcare style systems.\n\nDemo: <a href="#video">See How We Build</a>',
                hi: 'हम enterprise Java + Spring Boot microservices और सुरक्षित REST APIs बनाते हैं — banking, insurance, healthcare स्टाइल।\n\nडेमो: <a href="#video">See How We Build</a>',
                ar: 'نبني أنظمة Java و Spring Boot وواجهات REST آمنة — بأسلوب البنوك والتأمين والرعاية الصحية.\n\nالعرض: <a href="#video">See How We Build</a>'
            }
        },
        {
            id: 'web',
            keys: ['react', 'angular', 'frontend', 'web app', 'full stack', 'fullstack'],
            replies: {
                en: 'Full-stack delivery: React / Angular frontends + Java Spring Boot backends, cloud-ready builds.\n\nFor a quote: <a href="' + CONTACT + '">Contact</a>',
                hi: 'Full-stack: React / Angular फ्रंटएंड + Java Spring Boot बैकएंड, cloud-ready।\n\nकोटेशन: <a href="' + CONTACT + '">Contact</a>',
                ar: 'تطوير كامل: واجهات React / Angular + خلفية Java Spring Boot جاهزة للسحابة.\n\nعرض سعر: <a href="' + CONTACT + '">تواصل</a>'
            }
        },
        {
            id: 'cloud',
            keys: ['aws', 'cloud', 'deploy', 'kubernetes', 'docker', 'devops', 'سحابة', 'كلاود'],
            replies: {
                en: 'AWS / cloud deployment, Docker, CI/CD, and production monitoring are available.\n\nShare your project size — we will estimate.',
                hi: 'AWS / cloud deployment, Docker, CI/CD और production monitoring मिलता है।\n\nप्रोजेक्ट साइज़ बताएँ — अनुमान देंगे।',
                ar: 'يتوفر نشر AWS والسحابة وDocker وCI/CD ومراقبة الإنتاج.\n\nأخبرنا بحجم مشروعك لنقدّر التكلفة.'
            }
        },
        {
            id: 'pricing',
            keys: ['price', 'pricing', 'cost', 'kitna', 'budget', 'quote', 'rate', 'charges', 'fees', 'paisa', 'कीमत', 'मूल्य', 'سعر', 'أسعار', 'تكلفة'],
            replies: {
                en: 'Indicative plans:\n• Starter — basic web app, ~2 weeks\n• Professional — full-stack + APIs, 2–4 months\n• Enterprise — microservices + AWS, 6–12 months\n\nExact quote after free consultation. <a href="#calculator">Cost Calculator</a> · <a href="#pricing">Pricing</a>',
                hi: 'अनुमानित प्लान:\n• Starter — बेसिक वेब ऐप, ~2 हफ़्ते\n• Professional — full-stack + APIs, 2–4 महीने\n• Enterprise — microservices + AWS, 6–12 महीने\n\nसटीक कोट फ्री सलाह के बाद। <a href="#calculator">Calculator</a> · <a href="#pricing">Pricing</a>',
                ar: 'خطط تقريبية:\n• Starter — تطبيق ويب بسيط، ~أسبوعان\n• Professional — كامل + APIs، 2–4 أشهر\n• Enterprise — خدمات مصغّرة + AWS، 6–12 شهرًا\n\nالسعر الدقيق بعد استشارة مجانية. <a href="#calculator">حاسبة التكلفة</a> · <a href="#pricing">الأسعار</a>'
            }
        },
        {
            id: 'timeline',
            keys: ['time', 'timeline', 'kitne din', 'duration', 'how long', 'delivery', 'kab tak', 'समय', 'مدة', 'وقت', 'متى'],
            replies: {
                en: 'Typical timelines:\n• Small: 2–4 weeks\n• Medium: 2–4 months\n• Enterprise: 6–12 months\n\nExact estimate after scope is clear.',
                hi: 'आमतौर पर:\n• छोटा: 2–4 हफ़्ते\n• मध्यम: 2–4 महीने\n• एंटरप्राइज़: 6–12 महीने\n\nस्कोप साफ़ होने पर सटीक अनुमान।',
                ar: 'الجداول المعتادة:\n• صغير: 2–4 أسابيع\n• متوسط: 2–4 أشهر\n• مؤسسي: 6–12 شهرًا\n\nالتقدير الدقيق بعد وضوح النطاق.'
            }
        },
        {
            id: 'contact',
            keys: ['contact', 'email', 'phone', 'whatsapp', 'call', 'number', 'reach', 'baat', 'संपर्क', 'تواصل', 'هاتف', 'ايميل', 'بريد'],
            replies: {
                en: 'Contact FZK:\n• WhatsApp / Call: <a href="' + PHONE + '">+91-7728855804</a>\n• Email: fahdzaafarkhanglobaltechnology@gmail.com\n• Form: <a href="' + CONTACT + '">Get In Touch</a>\n• Chat: <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a>',
                hi: 'FZK से संपर्क:\n• WhatsApp / Call: <a href="' + PHONE + '">+91-7728855804</a>\n• Email: fahdzaafarkhanglobaltechnology@gmail.com\n• फ़ॉर्म: <a href="' + CONTACT + '">Get In Touch</a>\n• चैट: <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a>',
                ar: 'تواصل مع FZK:\n• واتساب / اتصال: <a href="' + PHONE + '">+91-7728855804</a>\n• البريد: fahdzaafarkhanglobaltechnology@gmail.com\n• النموذج: <a href="' + CONTACT + '">تواصل معنا</a>\n• دردشة: <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a>'
            }
        },
        {
            id: 'call',
            keys: ['free call', 'consultation', 'book', 'meeting', 'schedule', 'demo call', 'कॉल', 'सलाह', 'استشارة', 'مكالمة'],
            replies: {
                en: 'Free 30-minute discovery call — no pressure.\n\n<a href="' + CONTACT + '">Book via contact form</a> or <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a>: +91-7728855804',
                hi: 'फ्री 30 मिनट की discovery call — कोई दबाव नहीं।\n\n<a href="' + CONTACT + '">फ़ॉर्म से बुक करें</a> या <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a>: +91-7728855804',
                ar: 'مكالمة اكتشاف مجانية لمدة 30 دقيقة — بلا ضغط.\n\n<a href="' + CONTACT + '">احجز عبر النموذج</a> أو <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a>: +91-7728855804'
            }
        },
        {
            id: 'nda',
            keys: ['nda', 'security', 'confidential', 'سرية', 'اتفاقية'],
            replies: {
                en: 'Yes — we sign NDAs. Your IP stays yours. Standard for enterprise engagements.',
                hi: 'हाँ — हम NDA साइन करते हैं। IP आपकी रहती है। एंटरप्राइज़ काम के लिए यह सामान्य है।',
                ar: 'نعم — نوقّع اتفاقيات عدم الإفصاح. ملكيتك الفكرية تبقى لك. هذا معتاد للمشاريع المؤسسية.'
            }
        },
        {
            id: 'support',
            keys: ['support', 'maintain', 'bug', 'after launch', 'सपोर्ट', 'دعم', 'صيانة'],
            replies: {
                en: 'Post-launch support includes bug fixes, updates, and performance optimization. Plans include 1–12 months support.',
                hi: 'लॉन्च के बाद सपोर्ट: bug fixes, updates, performance। प्लान में 1–12 महीने सपोर्ट शामिल।',
                ar: 'الدعم بعد الإطلاق يشمل إصلاح الأخطاء والتحديثات وتحسين الأداء. الخطط تشمل دعمًا من 1–12 شهرًا.'
            }
        },
        {
            id: 'about',
            keys: ['who', 'founder', 'fahd', 'company', 'about', 'fzk', 'कंपनी', 'عن', 'مؤسس'],
            replies: {
                en: 'Fahd Zaafar Khan Global Technologies (FZK) — AI Engineer Solutions, Java Full Stack, Spring Boot APIs, and Cloud.\n\nFounder: Fahd Zaafar Khan · 10+ years experience.\n<a href="#about">About us</a>',
                hi: 'Fahd Zaafar Khan Global Technologies (FZK) — AI Engineer, Java Full Stack, Spring Boot APIs और Cloud.\n\nसंस्थापक: Fahd Zaafar Khan · 10+ वर्ष अनुभव।\n<a href="#about">About us</a>',
                ar: 'Fahd Zaafar Khan Global Technologies (FZK) — حلول AI و Java Full Stack و Spring Boot والسحابة.\n\nالمؤسس: Fahd Zaafar Khan · أكثر من 10 سنوات خبرة.\n<a href="#about">من نحن</a>'
            }
        },
        {
            id: 'human',
            keys: ['human', 'agent', 'real person', 'team', 'insaan', 'انسان', 'فريق', 'شخص'],
            replies: {
                en: 'Talk to the team: <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a> or call <a href="' + PHONE + '">+91-7728855804</a> — usually a fast reply.',
                hi: 'टीम से बात: <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a> या कॉल <a href="' + PHONE + '">+91-7728855804</a> — जल्दी जवाब मिलता है।',
                ar: 'تحدث مع الفريق: <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a> أو اتصل <a href="' + PHONE + '">+91-7728855804</a> — الرد عادة سريع.'
            }
        },
        {
            id: 'thanks',
            keys: ['thanks', 'thank you', 'shukriya', 'dhanyavad', 'okay', 'cool', 'great', 'धन्यवाद', 'शुक्रिया', 'شكرا', 'شكرًا'],
            replies: {
                en: 'You are welcome! Ask anything else — or send project details on <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a>.',
                hi: 'आपका स्वागत है! और कुछ पूछें — या प्रोजेक्ट डिटेल <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a> पर भेजें।',
                ar: 'على الرحب والسعة! اسأل أي شيء آخر — أو أرسل تفاصيل المشروع عبر <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a>.'
            }
        }
    ];

    const fallback = {
        en: 'Got it — our team can give the exact answer.\n\nIn short: we handle AI / Full Stack / Spring Boot / AWS projects.\n\nTry the chips below, or <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a> / <a href="' + CONTACT + '">Get Free Quote</a>.',
        hi: 'समझ गया — सटीक जवाब टीम देगी।\n\nसंक्षेप में: AI / Full Stack / Spring Boot / AWS प्रोजेक्ट्स हैंडल करते हैं।\n\nनीचे चिप्स आज़माएँ, या <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a> / <a href="' + CONTACT + '">Get Free Quote</a>.',
        ar: 'حسنًا — الفريق يعطي الجواب الدقيق.\n\nباختصار: ننفّذ مشاريع AI و Full Stack و Spring Boot و AWS.\n\nجرّب الخيارات بالأسفل، أو <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a> / <a href="' + CONTACT + '">عرض مجاني</a>.'
    };

    function detectLang(text) {
        if (/[\u0600-\u06FF]/.test(text)) return 'ar';
        if (/[\u0900-\u097F]/.test(text)) return 'hi';
        const t = text.toLowerCase();
        if (/\b(kya|hai|haan|nahi|kitna|kaise|namaste|shukriya|dhanyavad|mujhe|chahiye)\b/.test(t)) return 'hi';
        if (/\b(مرحبا|السلام|شكرا|أريد|كم|ما هو)\b/.test(text)) return 'ar';
        if (/\b(hello|hi|what|how|price|cost|service|please|thanks)\b/.test(t)) return 'en';
        return lang;
    }

    function applyLang(next, opts = {}) {
        lang = next;
        localStorage.setItem(LANG_KEY, lang);
        const meta = ui[lang];
        panel.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        panel.setAttribute('lang', lang === 'hi' ? 'hi' : lang);
        if (statusText) statusText.textContent = meta.status;
        if (input) input.placeholder = meta.placeholder;
        langGroup?.querySelectorAll('.ai-lang-btn').forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        renderChips();
        if (opts.announce !== false) {
            messages.innerHTML = '';
            appendMsg(meta.welcome, 'bot');
        }
    }

    function renderChips() {
        chipsEl.innerHTML = '';
        ui[lang].chips.forEach((chip) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'ai-chip';
            btn.textContent = chip.label;
            btn.dataset.intent = chip.id;
            btn.addEventListener('click', () => {
                if (!panel.classList.contains('open')) openPanel();
                send(chip.label, chip.id);
            });
            chipsEl.appendChild(btn);
        });
    }

    function openPanel() {
        panel.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
        setTimeout(() => input?.focus(), 200);
    }

    function closePanel() {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
    }

    function appendMsg(text, role) {
        const el = document.createElement('div');
        el.className = 'ai-msg ' + role;
        if (role === 'bot') {
            el.innerHTML = text;
            if (lang === 'ar') el.setAttribute('dir', 'rtl');
        } else {
            el.textContent = text;
            if (/[\u0600-\u06FF]/.test(text)) el.setAttribute('dir', 'rtl');
        }
        messages.appendChild(el);
        messages.scrollTop = messages.scrollHeight;
        return el;
    }

    function showTyping() {
        const el = document.createElement('div');
        el.className = 'ai-typing';
        el.id = 'aiTyping';
        el.innerHTML = '<span></span><span></span><span></span>';
        messages.appendChild(el);
        messages.scrollTop = messages.scrollHeight;
    }

    function hideTyping() {
        document.getElementById('aiTyping')?.remove();
    }

    function keyMatches(q, key) {
        const k = key.trim().toLowerCase();
        if (!k) return false;
        if (k.length <= 3 && !/[\u0600-\u06FF\u0900-\u097F]/.test(k)) {
            return new RegExp('(?:^|\\s|[?.!,])' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?:$|\\s|[?.!,])').test(q);
        }
        return q.includes(k);
    }

    function findIntent(raw, forcedId) {
        if (forcedId) return intents.find((i) => i.id === forcedId) || null;
        const q = raw.toLowerCase().trim();
        let best = null;
        let bestScore = 0;
        for (const intent of intents) {
            let score = 0;
            for (const key of intent.keys) {
                if (keyMatches(q, key) || raw.includes(key)) score += key.trim().length;
            }
            if (score > bestScore) {
                bestScore = score;
                best = intent;
            }
        }
        return bestScore > 0 ? best : null;
    }

    function getReply(raw, forcedId) {
        const detected = detectLang(raw);
        if (detected !== lang) applyLang(detected, { announce: false });
        const intent = findIntent(raw, forcedId);
        if (!intent) return fallback[lang];
        return intent.replies[lang] || intent.replies.en;
    }

    function botReply(text, forcedId) {
        showTyping();
        const delay = 450 + Math.min(900, text.length * 8);
        setTimeout(() => {
            hideTyping();
            appendMsg(getReply(text, forcedId), 'bot');
        }, delay);
    }

    function send(text, forcedId) {
        const msg = (text || '').trim();
        if (!msg) return;
        appendMsg(msg, 'user');
        if (input) input.value = '';
        botReply(msg, forcedId);
    }

    langGroup?.addEventListener('click', (e) => {
        const btn = e.target.closest('.ai-lang-btn');
        if (!btn || !btn.dataset.lang) return;
        applyLang(btn.dataset.lang);
    });

    applyLang(lang, { announce: true });

    toggle.addEventListener('click', () => {
        if (panel.classList.contains('open')) closePanel();
        else openPanel();
    });
    closeBtn?.addEventListener('click', closePanel);

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        send(input?.value || '');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('open')) closePanel();
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
