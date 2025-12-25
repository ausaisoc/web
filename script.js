document.addEventListener('DOMContentLoaded', function() {
    // Christmas theme check (December 20-31)
    initChristmasTheme();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Toggle icon between bars and X
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .hero a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if the link is an anchor link
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    // Close mobile menu if open
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        const icon = mobileMenuBtn.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    
                    // Scroll to section
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show a success message
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
    
    // Add animation for features and project cards
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature, .project-card, .member-category');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Current year for footer copyright
    const yearSpan = document.querySelector('.footer-bottom p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2025', currentYear);
    }
    
    // Add CSS for mobile menu and animations
    const style = document.createElement('style');
    style.textContent = `
        nav.active {
            display: block;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background-color: white;
            padding: 20px;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        }
        
        nav.active ul {
            flex-direction: column;
            gap: 15px;
        }
        
        nav.active ul li {
            margin-left: 0;
        }
        
        header.scrolled {
            padding: 10px 0;
            background-color: rgba(255, 255, 255, 0.98);
        }
        
        .feature, .project-card, .member-category {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .feature.animate, .project-card.animate, .member-category.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// Christmas theme functionality
function initChristmasTheme() {
    const today = new Date();
    const month = today.getMonth(); // 0-indexed, so December is 11
    const day = today.getDate();
    
    // Check if it's December 20-31
    if (month === 11 && day >= 20 && day <= 31) {
        activateChristmasTheme();
    }
}

function activateChristmasTheme() {
    // Add Christmas class to body for CSS styling
    document.body.classList.add('christmas-theme');
    
    // Create and add the Christmas banner
    createChristmasBanner();
    
    // Create falling snow effect
    createSnowfall();
}

function createChristmasBanner() {
    const banner = document.createElement('div');
    banner.className = 'christmas-banner';
    banner.innerHTML = `
        <div class="christmas-banner-content">
            <span class="christmas-icon">🎄</span>
            <span class="christmas-message">Merry Christmas & Happy Holidays!</span>
            <span class="christmas-icon">🎅</span>
            <button class="christmas-close" aria-label="Close banner">&times;</button>
        </div>
    `;
    
    // Insert banner at the very top of the body
    document.body.insertBefore(banner, document.body.firstChild);
    
    // Add close button functionality
    const closeBtn = banner.querySelector('.christmas-close');
    closeBtn.addEventListener('click', function() {
        banner.classList.add('christmas-banner-hidden');
        document.body.classList.remove('christmas-banner-visible');
    });
    
    // Add class to body to adjust for banner height
    document.body.classList.add('christmas-banner-visible');
}

function createSnowfall() {
    const snowContainer = document.createElement('div');
    snowContainer.className = 'snow-container';
    snowContainer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(snowContainer);
    
    // Create initial batch of snowflakes
    const numberOfSnowflakes = 50;
    for (let i = 0; i < numberOfSnowflakes; i++) {
        createSnowflake(snowContainer, true);
    }
    
    // Continuously create new snowflakes
    setInterval(() => {
        if (document.querySelectorAll('.snowflake').length < 100) {
            createSnowflake(snowContainer, false);
        }
    }, 300);
}

function createSnowflake(container, initialLoad) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    
    // Random properties for each snowflake
    const size = Math.random() * 5 + 3; // 3-8px
    const startPositionX = Math.random() * 100; // 0-100% from left
    const animationDuration = Math.random() * 5 + 5; // 5-10 seconds
    const animationDelay = initialLoad ? Math.random() * -10 : 0; // Stagger initial snowflakes
    const opacity = Math.random() * 0.6 + 0.4; // 0.4-1 opacity
    const drift = Math.random() * 20 - 10; // -10 to 10px horizontal drift
    
    // Apply styles
    snowflake.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${startPositionX}%;
        animation-duration: ${animationDuration}s;
        animation-delay: ${animationDelay}s;
        opacity: ${opacity};
        --drift: ${drift}px;
    `;
    
    // Randomly choose snowflake character
    const snowflakeChars = ['❄', '❅', '❆', '•'];
    snowflake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
    
    container.appendChild(snowflake);
    
    // Remove snowflake after animation completes
    snowflake.addEventListener('animationend', function() {
        snowflake.remove();
    });
}
