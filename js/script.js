/**
 * MVBRYT LeadGen - Premium Interactivity (V2)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Shrink & Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            // Only remove on home page if we want that transparency at top
            if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
                navbar.classList.remove('scrolled');
            } else {
                navbar.classList.add('scrolled'); // Stay solid on other pages
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
                // Add a small delay for staggered effect if items are in a group
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

    // --- Contact Form Simulation ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Deploying Protocol...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            setTimeout(() => {
                btn.innerText = 'Strategy Proposal Deployed!';
                btn.style.background = 'var(--accent)';
                btn.style.opacity = '1';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = 'linear-gradient(135deg, var(--primary), var(--primary-bright))';
                    btn.disabled = false;
                }, 4000);
            }, 2000);
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
            
            // Close other items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
