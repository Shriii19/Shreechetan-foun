/**
 * ShreeChetan Janseva Foundation Website
 * Main JavaScript file for interactivity and functionality
 */

// ====================================
// Global Variables & State
// ====================================
let currentTestimonial = 0;
let isModalOpen = false;
let navMenuOpen = false;
let selectedDonationAmount = 500;

// ====================================
// DOM Ready & Initialization
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializeCounters();
    initializeTestimonials();
    initializeGallery();
    initializeForms();
    initializeDonationModal();
    initializeModals();
    
    console.log('ShreeChetan Foundation website initialized successfully');
}

// ====================================
// Navigation Functions
// ====================================
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.getElementById('header');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenuOpen && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenuOpen) {
                closeMobileMenu();
            }
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                if (navMenuOpen) {
                    closeMobileMenu();
                }
            }
        });
    });

    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

function toggleMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navMenuOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navMenuOpen = true;
    navToggle.classList.add('active');
    navMenu.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus trap for accessibility
    trapFocus(navMenu);
}

function closeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navMenuOpen = false;
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// ====================================
// Scroll Effects & Animations
// ====================================
function initializeScrollEffects() {
    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.getElementById('header')?.offsetHeight || 80;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ====================================
// Counter Animation (Intersection Observer)
// ====================================
function initializeCounters() {
    const counters = document.querySelectorAll('.impact__number');
    
    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };

    // Add animation class for visual effect
    element.style.animation = 'countUp 0.5s ease-out';
    updateCounter();
}

// ====================================
// Testimonials Carousel
// ====================================
function initializeTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial__card');
    const prevBtn = document.getElementById('testimonials-prev');
    const nextBtn = document.getElementById('testimonials-next');
    const dots = document.querySelectorAll('.testimonials__dot');

    if (testimonialCards.length === 0) return;

    // Auto-advance testimonials
    let testimonialInterval = setInterval(nextTestimonial, 5000);

    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            clearInterval(testimonialInterval);
            previousTestimonial();
            testimonialInterval = setInterval(nextTestimonial, 5000);
        });
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            clearInterval(testimonialInterval);
            nextTestimonial();
            testimonialInterval = setInterval(nextTestimonial, 5000);
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            clearInterval(testimonialInterval);
            goToTestimonial(index);
            testimonialInterval = setInterval(nextTestimonial, 5000);
        });
    });

    // Pause on hover
    const testimonialContainer = document.querySelector('.testimonials__container');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });

        testimonialContainer.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(nextTestimonial, 5000);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!isModalOpen) {
            if (e.key === 'ArrowLeft') {
                clearInterval(testimonialInterval);
                previousTestimonial();
                testimonialInterval = setInterval(nextTestimonial, 5000);
            } else if (e.key === 'ArrowRight') {
                clearInterval(testimonialInterval);
                nextTestimonial();
                testimonialInterval = setInterval(nextTestimonial, 5000);
            }
        }
    });
}

function nextTestimonial() {
    const testimonialCards = document.querySelectorAll('.testimonial__card');
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    updateTestimonialDisplay();
}

function previousTestimonial() {
    const testimonialCards = document.querySelectorAll('.testimonial__card');
    currentTestimonial = currentTestimonial === 0 ? testimonialCards.length - 1 : currentTestimonial - 1;
    updateTestimonialDisplay();
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonialDisplay();
}

function updateTestimonialDisplay() {
    const testimonialCards = document.querySelectorAll('.testimonial__card');
    const dots = document.querySelectorAll('.testimonials__dot');

    // Update active testimonial
    testimonialCards.forEach((card, index) => {
        card.classList.toggle('active', index === currentTestimonial);
    });

    // Update active dot
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}

// ====================================
// Gallery Lightbox
// ====================================
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery__item');
    const galleryModal = document.getElementById('gallery-modal');
    const galleryModalImg = document.getElementById('gallery-modal-img');
    const galleryModalClose = document.getElementById('gallery-modal-close');

    if (!galleryModal || !galleryModalImg) return;

    // Gallery item click handlers
    galleryItems.forEach(item => {
        const viewBtn = item.querySelector('.gallery__view-btn');
        if (viewBtn) {
            viewBtn.addEventListener('click', function() {
                const imageSrc = item.getAttribute('data-image');
                const img = item.querySelector('.gallery__img');
                const altText = img ? img.getAttribute('alt') : 'Gallery image';
                
                openGalleryModal(imageSrc, altText);
            });
        }
    });

    // Close modal handlers
    if (galleryModalClose) {
        galleryModalClose.addEventListener('click', closeGalleryModal);
    }

    galleryModal.addEventListener('click', function(e) {
        if (e.target === galleryModal || e.target.classList.contains('modal__backdrop')) {
            closeGalleryModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (galleryModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeGalleryModal();
            }
        }
    });
}

function openGalleryModal(imageSrc, altText) {
    const galleryModal = document.getElementById('gallery-modal');
    const galleryModalImg = document.getElementById('gallery-modal-img');
    
    if (galleryModal && galleryModalImg) {
        galleryModalImg.src = imageSrc;
        galleryModalImg.alt = altText;
        
        galleryModal.classList.add('active');
        galleryModal.setAttribute('aria-hidden', 'false');
        isModalOpen = true;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus on close button for accessibility
        const closeBtn = document.getElementById('gallery-modal-close');
        if (closeBtn) {
            closeBtn.focus();
        }
    }
}

function closeGalleryModal() {
    const galleryModal = document.getElementById('gallery-modal');
    
    if (galleryModal) {
        galleryModal.classList.remove('active');
        galleryModal.setAttribute('aria-hidden', 'true');
        isModalOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// ====================================
// Form Validation & Handling
// ====================================
function initializeForms() {
    const volunteerForm = document.getElementById('volunteer-form');
    
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', handleVolunteerFormSubmit);
        
        // Real-time validation
        const formInputs = volunteerForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

function handleVolunteerFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validate all fields
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Simulate form submission
        const submitBtn = form.querySelector('.form__submit');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showSuccessModal('Thank you for volunteering!', 'We will contact you soon with volunteer opportunities.');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous errors
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required.';
        isValid = false;
    }
    
    // Specific field validations
    if (value && isValid) {
        switch (fieldName) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address.';
                    isValid = false;
                }
                break;
                
            case 'phone':
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
                if (!phoneRegex.test(value)) {
                    errorMessage = 'Please enter a valid phone number.';
                    isValid = false;
                }
                break;
                
            case 'name':
                if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters long.';
                    isValid = false;
                }
                break;
        }
    }
    
    // Show error if validation failed
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = message;
    }
    field.classList.add('error');
}

function clearFieldError(field) {
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = '';
    }
    field.classList.remove('error');
}

// ====================================
// Donation Modal
// ====================================
function initializeDonationModal() {
    const donateButtons = document.querySelectorAll('#donate-btn, #hero-donate-btn');
    const donateModal = document.getElementById('donate-modal');
    const donateModalClose = document.getElementById('donate-modal-close');
    const donateForm = document.getElementById('donate-form');
    const amountButtons = document.querySelectorAll('.amount__btn');
    const customAmountGroup = document.getElementById('custom-amount-group');
    const customAmountInput = document.getElementById('custom-amount');
    const donationTypeInputs = document.querySelectorAll('input[name="donation-type"]');

    // Open donation modal
    donateButtons.forEach(btn => {
        btn.addEventListener('click', openDonationModal);
    });

    // Close donation modal
    if (donateModalClose) {
        donateModalClose.addEventListener('click', closeDonationModal);
    }

    if (donateModal) {
        donateModal.addEventListener('click', function(e) {
            if (e.target === donateModal || e.target.classList.contains('modal__backdrop')) {
                closeDonationModal();
            }
        });
    }

    // Amount selection
    amountButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            amountButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const amount = this.getAttribute('data-amount');
            
            if (amount === 'custom') {
                customAmountGroup.style.display = 'block';
                customAmountInput.focus();
                selectedDonationAmount = 0;
            } else {
                customAmountGroup.style.display = 'none';
                selectedDonationAmount = parseInt(amount);
            }
            
            updateDonationSummary();
        });
    });

    // Custom amount input
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            selectedDonationAmount = parseInt(this.value) || 0;
            updateDonationSummary();
        });
    }

    // Donation type change
    donationTypeInputs.forEach(input => {
        input.addEventListener('change', updateDonationSummary);
    });

    // Donation form submission
    if (donateForm) {
        donateForm.addEventListener('submit', handleDonationFormSubmit);
    }

    // Initialize default state
    updateDonationSummary();
}

function openDonationModal() {
    const donateModal = document.getElementById('donate-modal');
    
    if (donateModal) {
        donateModal.classList.add('active');
        donateModal.setAttribute('aria-hidden', 'false');
        isModalOpen = true;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus on first input for accessibility
        const firstInput = donateModal.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
        
        // Trap focus within modal
        trapFocus(donateModal);
    }
}

function closeDonationModal() {
    const donateModal = document.getElementById('donate-modal');
    
    if (donateModal) {
        donateModal.classList.remove('active');
        donateModal.setAttribute('aria-hidden', 'true');
        isModalOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

function updateDonationSummary() {
    const amountDisplay = document.getElementById('donation-amount-display');
    const typeDisplay = document.getElementById('donation-type-display');
    const donationTypeInput = document.querySelector('input[name="donation-type"]:checked');
    
    if (amountDisplay) {
        amountDisplay.textContent = selectedDonationAmount > 0 ? `₹${selectedDonationAmount.toLocaleString()}` : '₹0';
    }
    
    if (typeDisplay && donationTypeInput) {
        typeDisplay.textContent = donationTypeInput.value === 'monthly' ? 'Monthly' : 'One-time';
    }
}

function handleDonationFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Basic validation
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'var(--accent-color)';
        } else {
            field.style.borderColor = '';
        }
    });
    
    if (selectedDonationAmount <= 0) {
        isValid = false;
        alert('Please select a donation amount.');
        return;
    }
    
    if (isValid) {
        // Simulate donation processing
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            closeDonationModal();
            showSuccessModal(
                'Thank you for your donation!', 
                `Your ${formData.get('donation-type')} donation of ₹${selectedDonationAmount.toLocaleString()} will make a real difference in our communities.`
            );
            form.reset();
            selectedDonationAmount = 500;
            updateDonationSummary();
            
            // Reset form state
            document.querySelectorAll('.amount__btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector('.amount__btn[data-amount="500"]').classList.add('active');
            document.getElementById('custom-amount-group').style.display = 'none';
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
}

// ====================================
// Modal System
// ====================================
function initializeModals() {
    const successModal = document.getElementById('success-modal');
    const successModalClose = document.getElementById('success-modal-close');
    
    // Success modal close
    if (successModalClose) {
        successModalClose.addEventListener('click', closeSuccessModal);
    }
    
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal || e.target.classList.contains('modal__backdrop')) {
                closeSuccessModal();
            }
        });
    }
    
    // Global modal keyboard handling
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isModalOpen) {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                if (activeModal.id === 'donate-modal') {
                    closeDonationModal();
                } else if (activeModal.id === 'gallery-modal') {
                    closeGalleryModal();
                } else if (activeModal.id === 'success-modal') {
                    closeSuccessModal();
                }
            }
        }
    });
}

function showSuccessModal(title, message) {
    const successModal = document.getElementById('success-modal');
    const successTitle = document.getElementById('success-modal-title');
    const successMessage = document.getElementById('success-message');
    
    if (successModal && successTitle && successMessage) {
        successTitle.textContent = title;
        successMessage.textContent = message;
        
        successModal.classList.add('active');
        successModal.setAttribute('aria-hidden', 'false');
        isModalOpen = true;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus on close button
        const closeBtn = document.getElementById('success-modal-close');
        if (closeBtn) {
            closeBtn.focus();
        }
    }
}

function closeSuccessModal() {
    const successModal = document.getElementById('success-modal');
    
    if (successModal) {
        successModal.classList.remove('active');
        successModal.setAttribute('aria-hidden', 'true');
        isModalOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// ====================================
// Accessibility Helpers
// ====================================
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// ====================================
// Utility Functions
// ====================================
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ====================================
// Error Handling
// ====================================
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// ====================================
// Performance Monitoring
// ====================================
window.addEventListener('load', function() {
    // Log page load performance
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});

// ====================================
// Service Worker Registration (for PWA)
// ====================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment the following lines if you add a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}

// ====================================
// Export functions for testing (if using modules)
// ====================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeWebsite,
        validateField,
        updateDonationSummary,
        nextTestimonial,
        previousTestimonial
    };
}
