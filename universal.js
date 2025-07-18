// Universal JavaScript for DDC Homes Website
// Author: DDC Homes Development Team
// Version: 1.0

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initScrollAnimations();
    initNavigationEffects();
    initImageHoverEffects();
    initFormValidation();
    initSmoothScrolling();
    initMobileMenu();
    initTestimonialSlider();
    initCounterAnimations();
    initLoadingEffects();
    
    // Loading screen fade out
    function initLoadingEffects() {
        const body = document.body;
        body.style.opacity = '0';
        body.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            body.style.opacity = '1';
        }, 100);
    }
    
    // Scroll-based animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const elementsToAnimate = document.querySelectorAll('.card, .feature-box, .project-showcase, .testimonial-card, .section-title');
        elementsToAnimate.forEach(el => {
            el.classList.add('animate-ready');
            observer.observe(el);
        });
    }
    
    // Navigation effects
    function initNavigationEffects() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Add scroll effect to navbar
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Add active state management
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
            });
        });
        
        // Dropdown hover effects
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const menu = dropdown.querySelector('.dropdown-menu');
            
            dropdown.addEventListener('mouseenter', () => {
                menu.style.display = 'flex';
                menu.style.animation = 'slideDown 0.3s ease-out';
            });
            
            dropdown.addEventListener('mouseleave', () => {
                menu.style.animation = 'slideUp 0.3s ease-out';
                setTimeout(() => {
                    menu.style.display = 'none';
                }, 300);
            });
        });
    }
    
    // Image hover effects and lazy loading
    function initImageHoverEffects() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading placeholder
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            
            // Add hover effects to project images
            if (img.classList.contains('project-image')) {
                img.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05)';
                    this.style.transition = 'transform 0.3s ease';
                });
                
                img.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
            }
        });
        
        // Service card hover effects
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            });
        });
    }
    
    // Form validation
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const inputs = form.querySelectorAll('input[required], textarea[required]');
                let isValid = true;
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.classList.add('error');
                        showFieldError(input, 'This field is required');
                    } else {
                        input.classList.remove('error');
                        hideFieldError(input);
                    }
                    
                    // Email validation
                    if (input.type === 'email' && input.value.trim()) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(input.value)) {
                            isValid = false;
                            input.classList.add('error');
                            showFieldError(input, 'Please enter a valid email address');
                        }
                    }
                });
                
                if (isValid) {
                    // Show success message
                    showSuccessMessage('Thank you! Your message has been sent successfully.');
                    form.reset();
                }
            });
        });
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
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
    
    // Mobile menu functionality
    function initMobileMenu() {
        const navbar = document.querySelector('.navbar');
        const navbarNav = document.querySelector('.navbar-nav');
        
        // Create mobile menu toggle button
        const mobileToggle = document.createElement('button');
        mobileToggle.innerHTML = '☰';
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.style.display = 'none';
        
        navbar.appendChild(mobileToggle);
        
        // Toggle mobile menu
        mobileToggle.addEventListener('click', function() {
            navbarNav.classList.toggle('mobile-open');
            this.innerHTML = navbarNav.classList.contains('mobile-open') ? '✕' : '☰';
        });
        
        // Show/hide mobile toggle based on screen size
        function checkMobileView() {
            if (window.innerWidth <= 768) {
                mobileToggle.style.display = 'block';
            } else {
                mobileToggle.style.display = 'none';
                navbarNav.classList.remove('mobile-open');
            }
        }
        
        window.addEventListener('resize', checkMobileView);
        checkMobileView();
    }
    
    // Testimonial slider (if testimonials exist)
    function initTestimonialSlider() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        
        if (testimonials.length > 0) {
            let currentTestimonial = 0;
            
            // Auto-rotate testimonials every 5 seconds
            setInterval(() => {
                testimonials[currentTestimonial].style.opacity = '0.7';
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                
                setTimeout(() => {
                    testimonials.forEach((t, index) => {
                        t.style.opacity = index === currentTestimonial ? '1' : '0.7';
                    });
                }, 500);
            }, 5000);
        }
    }
    
    // Counter animations for stats
    function initCounterAnimations() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                counter.textContent = Math.floor(current);
                
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, 20);
        });
    }
    
    // Utility functions
    function showFieldError(field, message) {
        let errorElement = field.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('field-error')) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
        errorElement.textContent = message;
        errorElement.style.color = '#dc3545';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
    }
    
    function hideFieldError(field) {
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('field-error')) {
            errorElement.remove();
        }
    }
    
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #28a745;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    // Add CSS animations dynamically
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideDown {
            from { transform: translateY(-10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(-10px); opacity: 0; }
        }
        
        .animate-ready {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease-out;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .fade-in {
            animation: fadeIn 1s ease-out;
        }
        
        .fade-in-delayed {
            animation: fadeIn 1s ease-out 0.3s both;
        }
        
        .pulse-btn {
            animation: pulse 2s infinite;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .navbar.scrolled {
            background-color: rgba(0, 51, 102, 0.95);
            backdrop-filter: blur(10px);
        }
        
        .mobile-menu-toggle {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }
        
        @media (max-width: 768px) {
            .navbar-nav.mobile-open {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background-color: var(--secondary);
                padding: 1rem 0;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
        }
        
        .hover-zoom {
            transition: transform 0.3s ease;
        }
        
        .hover-zoom:hover {
            transform: scale(1.05);
        }
        
        .service-card {
            transition: all 0.3s ease;
        }
        
        .field-error {
            display: block;
            margin-top: 0.25rem;
        }
        
        input.error, textarea.error {
            border-color: #dc3545;
        }
    `;
    
    document.head.appendChild(styleSheet);
    
    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    console.log('DDC Homes website enhanced with universal JavaScript functionality');
});