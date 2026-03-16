
// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 800);
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    html.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.style.transition = 'background 0.4s ease, color 0.4s ease';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    setTimeout(() => { document.body.style.transition = ''; }, 400);
});

// ===== MOBILE NAVIGATION =====
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const header = document.getElementById('header');

mobileToggle.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('active');
    mobileToggle.innerHTML = isActive ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    mobileToggle.setAttribute('aria-expanded', isActive);
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        mobileToggle.setAttribute('aria-expanded', 'false');
    });
});

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.getElementById('scrollProgress');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
    scrollProgress.setAttribute('aria-valuenow', Math.round(scrolled));
    
    // Header Scroll Effect
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    lastScrollY = scrollTop;
}, { passive: true }); // Passive listener for performance

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== ANIMATE ON SCROLL =====
const animateElements = document.querySelectorAll('.animate-on-scroll');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => { entry.target.classList.add('visible'); }, index * 150);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

animateElements.forEach(el => observer.observe(el));

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelectorAll('.form-error').forEach(el => el.style.display = 'none');
    formSuccess.style.display = 'none';
    
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.value.trim()) { document.getElementById('nameError').style.display = 'block'; isValid = false; }
    if (!emailRegex.test(email.value)) { document.getElementById('emailError').style.display = 'block'; isValid = false; }
    if (!message.value.trim()) { document.getElementById('messageError').style.display = 'block'; isValid = false; }

    if (isValid) {
        formSuccess.style.display = 'block';
        contactForm.reset();
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => { formSuccess.style.display = 'none'; }, 7000);
        console.log('Form submitted:', { name: name.value, email: email.value, message: message.value });
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

// ===== DYNAMIC YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== INITIALIZE ANIMATIONS =====
window.addEventListener('load', () => {
    document.querySelectorAll('.skill-progress-bar').forEach((progress, index) => {
        const level = progress.style.getPropertyValue('--level');
        progress.style.width = '0';
        setTimeout(() => {
            progress.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            progress.style.width = level;
        }, 500 + (index * 100));
    });
    document.querySelector('.hero-content')?.classList.add('visible');
});

// ===== PARALLAX EFFECT FOR HERO (Disabled on Mobile) =====
window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) { // Only on desktop
        const scrolled = window.scrollY;
        const heroImage = document.querySelector('.hero-image-container');
        if (heroImage && scrolled < 800) {
            heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    }
}, { passive: true });

// ===== TILT EFFECT FOR CARDS (Disabled on Touch Devices) =====
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
    document.querySelectorAll('.project-card, .skill-category, .testimonial-card, .blog-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}