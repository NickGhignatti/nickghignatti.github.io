// Nick Ghignatti Portfolio - Fixed JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initParticles();
    initAnimatedCounters();
    initSkillsBanner();
    initProjectFilters();
    initScrollAnimations();
    initContactForm();
    initMobileMenu();
    initExternalLinks();
});

// Navigation and active section highlighting
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, #hero');
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetTop = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, offsetTop),
                    behavior: 'smooth'
                });
                
                // Update active link immediately
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            }
        });
    });
    
    // Update active navigation link on scroll with throttling
    let scrollTimeout;
    const updateActiveLink = () => {
        let current = 'hero'; // Default to hero
        const scrollPos = window.pageYOffset + 150; // Account for navbar + offset
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Update navbar background based on scroll position
        const navbar = document.getElementById('navbar');
        if (window.pageYOffset > 50) {
            navbar.style.backgroundColor = 'rgba(19, 52, 59, 0.98)';
            navbar.style.backdropFilter = 'blur(25px)';
        } else {
            navbar.style.backgroundColor = 'rgba(19, 52, 59, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    };
    
    // Throttled scroll event listener
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateActiveLink, 10);
    });
    
    // Initial call
    updateActiveLink();
}

// Skills Banner functionality
function initSkillsBanner() {
    const skillsBanner = document.getElementById('skills-banner');
    const skillItems = document.querySelectorAll('.skill-item');
    
    if (!skillsBanner || skillItems.length === 0) return;
    
    // Add click interactions for skill items
    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            const skillName = item.getAttribute('data-skill');
            showSkillInfo(skillName);
        });
        
        // Add hover effect
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Pause animation on banner hover
    skillsBanner.addEventListener('mouseenter', () => {
        const track = skillsBanner.querySelector('.skills-track');
        if (track) {
            track.style.animationPlayState = 'paused';
        }
    });
    
    skillsBanner.addEventListener('mouseleave', () => {
        const track = skillsBanner.querySelector('.skills-track');
        if (track) {
            track.style.animationPlayState = 'running';
        }
    });
}

// Show skill information
function showSkillInfo(skillName) {
    const skillDescriptions = {
        'Java': 'Solid experience in Java for enterprise applications, object-oriented design, and distributed systems development.',
        'C': 'Strong foundation in C for systems programming, performance-critical applications, and low-level development.',
        'Python': 'Advanced proficiency in Python for data science, machine learning, and backend development with modern frameworks.',
        'C#': 'Experience with C# for desktop applications, web development, and enterprise software solutions.',
        'PHP': 'Backend web development with PHP, including modern frameworks and API development.',
        'Rust': 'Systems programming with Rust, focusing on memory safety and performance-critical applications.',
        'CUDA': 'GPU programming and parallel computing using NVIDIA CUDA for high-performance applications.',
        'Scala': 'Functional programming with Scala for big data processing and distributed systems.',
        'GoLang': 'Concurrent programming with Go for microservices, cloud applications, and system tools.',
        'SQL': 'Database design, optimization, and complex query development across various database systems.',
        'NoSQL': 'Working with document databases, key-value stores, and distributed database systems.',
        'JavaScript': 'Expert-level JavaScript including ES6+, async programming, and modern web development.',
        'HTML/CSS': 'Semantic HTML and modern CSS including Flexbox, Grid, and responsive design principles.',
        'Vue': 'Building reactive user interfaces with Vue.js ecosystem and component-based architecture.',
        'TypeScript': 'Strongly-typed JavaScript development for large-scale applications and better maintainability.',
        'Svelte': 'Modern frontend framework for building fast and efficient web applications.',
        'Git': 'Version control, branching strategies, and collaborative development workflows.',
        'Docker': 'Containerization, orchestration, and deployment of applications across different environments.',
        'ICP': 'Internet Computer Protocol development and decentralized application deployment.'
    };
    
    const description = skillDescriptions[skillName] || `Experienced in working with ${skillName} technology.`;
    showNotification(`${skillName}: ${description}`, 'info', 5000);
}

// Project filtering functionality - FIXED
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter').toLowerCase();
            let visibleCount = 0;
            
            // Filter project cards
            projectCards.forEach((card) => {
                const category = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    visibleCount++;
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Show filter feedback
            setTimeout(() => {
                const filterText = button.textContent;
                const message = filter === 'all' 
                    ? `Showing all projects` 
                    : `Showing ${visibleCount} ${filterText} projects`;
                showNotification(message, 'info', 2000);
            }, 300);
        });
    });
    
    // Initialize with all projects visible
    projectCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.style.transition = 'all 0.3s ease';
    });
}

// Particle animation in hero section
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 30; // Reduced count for better performance
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 1px and 3px
        const size = Math.random() * 2 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        
        // Random animation duration and delay
        const duration = Math.random() * 4 + 6;
        const delay = Math.random() * 2;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Animated counters for statistics
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const animateCounters = () => {
        if (hasAnimated) return;
        hasAnimated = true;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2500; // 2.5 seconds
            const stepTime = 50; // Update every 50ms
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, stepTime);
        });
    };
    
    // Trigger animation when hero section is in view
    const hero = document.getElementById('hero');
    if (hero) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    setTimeout(animateCounters, 1000); // Delay for better effect
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(hero);
    }
}

// Scroll animations for sections
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.interest-item, .stat-card, .project-card');
    
    const animateOnScroll = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };
    
    const scrollObserver = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
        scrollObserver.observe(element);
    });
}

// Contact form handling - FIXED
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    // Remove any event listeners that might interfere with form input
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        // Ensure inputs can receive focus and accept text
        input.style.pointerEvents = 'auto';
        input.style.userSelect = 'text';
        input.removeAttribute('readonly');
        input.removeAttribute('disabled');
    });
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name')?.trim() || '';
        const email = formData.get('email')?.trim() || '';
        const subject = formData.get('subject')?.trim() || '';
        const message = formData.get('message')?.trim() || '';
        
        // Clear any existing error states
        clearFormErrors();
        
        // Validation
        let hasErrors = false;
        
        if (!name) {
            showFieldError('name', 'Name is required');
            hasErrors = true;
        }
        
        if (!email) {
            showFieldError('email', 'Email is required');
            hasErrors = true;
        } else if (!isValidEmail(email)) {
            showFieldError('email', 'Please enter a valid email address');
            hasErrors = true;
        }
        
        if (!subject) {
            showFieldError('subject', 'Subject is required');
            hasErrors = true;
        }
        
        if (!message) {
            showFieldError('message', 'Message is required');
            hasErrors = true;
        } else if (message.length < 10) {
            showFieldError('message', 'Message must be at least 10 characters long');
            hasErrors = true;
        }
        
        if (hasErrors) {
            showNotification('Please fix the errors above and try again.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending Message...';
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        
        // Simulate network delay
        setTimeout(() => {
            showNotification(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            clearFormErrors();
        }, 2000);
    });
    
    function showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        if (!field) return;
        
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;
        
        field.style.borderColor = '#c0152f';
        
        let errorMsg = formGroup.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.style.color = '#c0152f';
            errorMsg.style.fontSize = '12px';
            errorMsg.style.marginTop = '4px';
            formGroup.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
    }
    
    function clearFormErrors() {
        const errorMessages = contactForm.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    function openMobileMenu() {
        navMenu.classList.add('active');
        hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate hamburger icon
        const spans = hamburger.querySelectorAll('span');
        if (spans.length >= 3) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        }
    }
    
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
        
        const spans = hamburger.querySelectorAll('span');
        if (spans.length >= 3) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // Expose closeMobileMenu globally
    window.closeMobileMenu = closeMobileMenu;
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !hamburger.contains(e.target) && 
            !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// External links functionality
function initExternalLinks() {
    // Handle project GitHub and demo links
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const url = link.getAttribute('href');
            if (url && url !== '#') {
                // Allow default behavior for external links
                showNotification('Opening project link...', 'info', 2000);
            } else {
                e.preventDefault();
            }
        });
    });
    
    // Handle social links
    const socialLinks = document.querySelectorAll('.social-link, .footer-social a');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const url = link.getAttribute('href');
            if (url && url !== '#') {
                // Allow default behavior for external links
                showNotification('Opening social link...', 'info', 2000);
            } else {
                e.preventDefault();
            }
        });
    });
    
    // Handle contact email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', () => {
            showNotification('Opening email client...', 'info', 2000);
        });
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info', duration = 3000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    // Set styles based on type
    let backgroundColor, textColor, icon;
    switch (type) {
        case 'success':
            backgroundColor = '#21809b';
            textColor = 'white';
            icon = '✓';
            break;
        case 'error':
            backgroundColor = '#c0152f';
            textColor = 'white';
            icon = '✕';
            break;
        case 'info':
        default:
            backgroundColor = '#626c71';
            textColor = 'white';
            icon = 'ℹ';
            break;
    }
    
    notification.innerHTML = `
        <span class="notification-icon">${icon}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close">×</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 12px 16px;
        background: ${backgroundColor};
        color: ${textColor};
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        max-width: 350px;
        font-weight: 500;
        font-size: 14px;
        line-height: 1.4;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    
    // Add click handler to close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 16px;
        cursor: pointer;
        padding: 0;
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.8;
        margin-left: auto;
    `;
    
    closeBtn.addEventListener('click', () => {
        if (notification.parentNode) {
            notification.remove();
        }
    });
    
    document.body.appendChild(notification);
    
    // Trigger animation
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    });
    
    // Auto remove after duration
    if (duration > 0) {
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                notification.style.opacity = '0';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, duration);
    }
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Console welcome message
console.log('🚀 Nick Ghignatti Portfolio - Loaded Successfully!');