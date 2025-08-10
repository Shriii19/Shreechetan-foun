        document.addEventListener('DOMContentLoaded', function() {
            // Mobile navigation toggle
            const navToggle = document.getElementById('nav-toggle');
            const navLinks = document.getElementById('nav-links');
            
            navToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                navToggle.innerHTML = navLinks.classList.contains('active') ? 
                    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            });
            
            // Close mobile menu when clicking a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
            
            // Header scroll effect
            const header = document.getElementById('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const headerHeight = header.offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Counter animation
            const counters = document.querySelectorAll('.impact-number');
            
            const startCounter = () => {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-count');
                    const count = +counter.innerText.replace('+', '');
                    const increment = target / 100;
                    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment) + '+';
                        setTimeout(startCounter, 20);
                    } else {
                        counter.innerText = target + '+';
                    }
                });
            };
            
            // Start counter when section is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        startCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            document.querySelector('.impact').style.opacity = '0';
            setTimeout(() => {
                document.querySelector('.impact').style.opacity = '1';
                observer.observe(document.querySelector('.impact'));
            }, 500);
            
            // Form submission
            const volunteerForm = document.getElementById('volunteer-form');
            volunteerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                
                // Simple validation
                if (!name || !email) {
                    alert('Please fill in all required fields');
                    return;
                }
                
                // Show success message
                alert(`Thank you ${name}! We've received your volunteer application and will contact you soon.`);
                
                // Reset form
                volunteerForm.reset();
            });
            
            // Gallery lightbox effect
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => {
                item.addEventListener('click', function() {
                    const imgSrc = this.querySelector('img').src;
                    const lightbox = document.createElement('div');
                    lightbox.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0,0,0,0.9);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 10000;
                        cursor: zoom-out;
                    `;
                    
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.style.maxWidth = '90%';
                    img.style.maxHeight = '90%';
                    img.style.borderRadius = '8px';
                    img.style.animation = 'fadeIn 0.5s ease-out';
                    
                    lightbox.appendChild(img);
                    document.body.appendChild(lightbox);
                    
                    lightbox.addEventListener('click', function() {
                        document.body.removeChild(lightbox);
                    });
                });
            });
            
            // Animate elements on scroll
            const animateOnScroll = () => {
                const elements = document.querySelectorAll('.about-card, .program-card');
                
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight * 0.8;
                    
                    if (elementPosition < screenPosition) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                });
            };
            
            // Set initial state for animation
            document.querySelectorAll('.about-card, .program-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
            
            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll(); // Initial check
            
            // Hero text animation
            document.querySelector('.hero-text').style.opacity = '0';
            document.querySelector('.hero-text').style.transform = 'translateY(30px)';
            document.querySelector('.hero-text').style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                document.querySelector('.hero-text').style.opacity = '1';
                document.querySelector('.hero-text').style.transform = 'translateY(0)';
            }, 300);
        });