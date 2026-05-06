document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    
    // Header Scroll Effect
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Service Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const serviceGrids = document.querySelectorAll('.service-grid');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                serviceGrids.forEach(g => g.classList.remove('active'));
                btn.classList.add('active');
                const tabId = btn.getAttribute('data-target');
                console.log('Switching to tab:', tabId);
                const targetGrid = document.getElementById(tabId);
                
                if (targetGrid) {
                    console.log('Found grid for:', tabId);
                    targetGrid.classList.add('active');
                    // Ensure cards are visible if they were hidden by the reveal animation
                    targetGrid.querySelectorAll('.service-card').forEach(card => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                }
            });
        });
    }

    // WhatsApp Booking Logic
    const baseNumber = "919361002259";
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                const titleEl = card.querySelector('h3');
                if (titleEl) {
                    const serviceName = titleEl.innerText;
                    const message = encodeURIComponent(`Hi Style Craft! I would like to book an appointment for: ${serviceName}`);
                    window.open(`https://wa.me/${baseNumber}?text=${message}`, '_blank');
                }
            });
            card.style.cursor = 'pointer';
            card.setAttribute('title', 'Click to book this service via WhatsApp');
        });
    }

    // Carousel Logic
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        let currentIndex = 0;
        let timer;

        // Initialize Dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            slides.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.className = i === 0 ? 'dot active' : 'dot';
                dot.onclick = () => showSlide(i);
                dotsContainer.appendChild(dot);
            });
        }

        function showSlide(index) {
            slides[currentIndex].classList.remove('active');
            const dots = carousel.querySelectorAll('.dot');
            if (dots.length > 0) dots[currentIndex].classList.remove('active');
            
            currentIndex = (index + slides.length) % slides.length;
            
            slides[currentIndex].classList.add('active');
            if (dots.length > 0) dots[currentIndex].classList.add('active');
            
            startAutoPlay();
        }

        function startAutoPlay() {
            clearInterval(timer);
            timer = setInterval(() => {
                showSlide(currentIndex + 1);
            }, 5000);
        }

        if (nextBtn) {
            nextBtn.onclick = (e) => {
                e.preventDefault();
                showSlide(currentIndex + 1);
            };
        }

        if (prevBtn) {
            prevBtn.onclick = (e) => {
                e.preventDefault();
                showSlide(currentIndex - 1);
            };
        }

        startAutoPlay();
    }

    // Scroll Reveal
    const revealElements = document.querySelectorAll('.service-card, .about-text');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease-out';
            revealObserver.observe(el);
        });
    }
});
