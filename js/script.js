/**
 * MVBRYT LeadGen - Premium Interactivity (V2.1 - REAL FORM SUBMISSION)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Shrink & Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (!navbar) return;
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
                navbar.classList.remove('scrolled');
            } else {
                navbar.classList.add('scrolled');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // --- Staggered Scroll Reveal Animations ---
    const revealItems = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = entry.target.parentElement.classList.contains('grid') || 
                              entry.target.parentElement.classList.contains('feature-list') 
                              ? (index % 3) * 150 : 0;
                
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });

    // --- Unified REAL Contact Form Handling (Web3Forms) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            const originalBg = btn.style.background;
            
            // Visual Pending State
            btn.innerText = 'Deploying Protocol...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success State
                    btn.innerText = 'Strategy Proposal Deployed!';
                    btn.style.background = 'var(--accent)';
                    btn.style.opacity = '1';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.background = originalBg || 'linear-gradient(135deg, var(--primary), var(--primary-bright))';
                        btn.disabled = false;
                    }, 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Submission Error:', error);
                alert('Connection Error. Please try again or email mvbrytceo@gmail.com directly.');
                btn.innerText = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
            }
        });
    }

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const expanded = navLinks.classList.contains('open');
            navToggle.setAttribute('aria-expanded', expanded);
        });
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});