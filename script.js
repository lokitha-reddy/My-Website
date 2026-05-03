// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
const closeIcon = mobileMenuBtn.querySelector('.close-icon');
const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');
const downloadResumeBtn = document.getElementById('downloadResumeBtn');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');

// State
let isMenuOpen = false;
let activeSection = 'home';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Set current year
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // Initialize scroll spy
    initScrollSpy();
    
    // Add event listeners
    addEventListeners();
});

// Event Listeners
function addEventListeners() {
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Scroll spy
    window.addEventListener('scroll', handleScroll);
    
    // Download resume
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', downloadResume);
    }
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Hero buttons
    const heroButtons = document.querySelectorAll('[data-section]');
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            scrollToSection(sectionId);
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile Menu Functions
function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        mobileNav.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        mobileNav.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

function closeMobileMenu() {
    if (isMenuOpen) {
        isMenuOpen = false;
        mobileNav.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

// Navigation Functions
function handleNavClick(e) {
    e.preventDefault();
    const sectionId = this.getAttribute('data-section');
    scrollToSection(sectionId);
    closeMobileMenu();
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll Spy
function initScrollSpy() {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (sections.length === 0) return;
    
    // Set initial active section
    updateActiveNavLink('home');
}

function handleScroll() {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const scrollPosition = window.scrollY + 100;
    
    let currentSection = 'home';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.id;
        }
    });
    
    if (currentSection !== activeSection) {
        activeSection = currentSection;
        updateActiveNavLink(currentSection);
    }
}

function updateActiveNavLink(sectionId) {
    // Remove active class from all nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current section links
    const activeLinks = document.querySelectorAll(`[data-section="${sectionId}"]`);
    activeLinks.forEach(link => {
        if (link.classList.contains('nav-link') || link.classList.contains('nav-mobile-link')) {
            link.classList.add('active');
        }
    });
}

// Download Resume Function
function downloadResume() {
    const resumeContent = `NARAPUREDDY LOKITHA
BCA Student | Data Analytics & UI/UX Design Specialist

Contact Information:
Email: nlokithareddy226@example.com
Phone: +91-7288087997
LinkedIn: https://linkedin.com/in/lokitha
GitHub: github.com/lokitha

Skills:
• Programming: Python, C, Java, SQL
• Data Analytics: Power BI, Tableau, Excel, Pandas, NumPy, Matplotlib
• UI/UX Tools: Figma, Adobe XD, Canva
• Soft Skills: Problem-solving, Team Collaboration, Communication

Experience:
• UI/UX Design Intern - Codtech IT Solutions (2024)
• Data Analytics Intern - Codex Techno (2024)
• Python Development Intern - Cornify Technologies (2024)
• Student Ambassador - Lets Upgrade (2023-2024)

Achievements:
• Team Leader - 24-hour XHorizon Hackathon (Website Development)
• Industrial Training at Placemantra (Real-time projects)
• Event Coordinator in college festivals

Certifications:
• Google UX Design (Coursera)
• Data Visualization & Analytics Specialist (L&T Edu Tech)
• Design Thinking for Innovation (Coursera)
• Introduction to Big Data Analytics (L&T Edu Tech)

Projects:
• Food Delivery App UI/UX - Mobile-first design with user research
• Sales Data Analytics Dashboard - Interactive visualizations with Python
• Portfolio Website - Responsive design with modern technologies
`;

    try {
        const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Narapureddy_Lokitha_Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // Show success message
        showNotification('Resume downloaded successfully!', 'success');
    } catch (error) {
        console.error('Error downloading resume:', error);
        showNotification('Error downloading resume. Please try again.', 'error');
    }
}

// Contact Form Handler
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Validate form data
    if (!data.name || !data.email || !data.message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.form-submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i data-lucide="loader-2"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Reinitialize icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        console.log('Form submitted:', data);
    }, 2000);
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i data-lucide="x"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        max-width: 400px;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background-color: #10b981; color: white;' : ''}
        ${type === 'error' ? 'background-color: #ef4444; color: white;' : ''}
        ${type === 'info' ? 'background-color: #3b82f6; color: white;' : ''}
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-card, .skill-category, .project-card, .timeline-item, .achievement-card, .certification-card');
    animateElements.forEach(el => observer.observe(el));
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initAnimations, 500);
});

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768 && isMenuOpen) {
        closeMobileMenu();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && isMenuOpen) {
        closeMobileMenu();
    }
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    // Polyfill for smooth scrolling
    const smoothScrollPolyfill = function(target, duration = 800) {
        const targetPosition = target.offsetTop - document.querySelector('.header').offsetHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    };
    
    // Override scrollToSection for older browsers
    window.scrollToSection = function(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            smoothScrollPolyfill(element);
        }
    };
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(handleScroll, 10);
window.removeEventListener('scroll', handleScroll);
window.addEventListener('scroll', debouncedScrollHandler);

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

function safeQuerySelectorAll(selector) {
    try {
        return document.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Elements not found: ${selector}`);
        return [];
    }
}

// Console welcome message
console.log(`
🚀 Portfolio Website Loaded Successfully!
👨‍💻 Developed by: Narapureddy Lokitha
📧 Contact: lokitha@example.com
🔗 LinkedIn: linkedin.com/in/lokitha
🐙 GitHub: github.com/lokitha

Built with HTML, CSS, and JavaScript
`);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToSection,
        toggleMobileMenu,
        downloadResume,
        isValidEmail,
        showNotification
    };
}