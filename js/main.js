document.addEventListener('DOMContentLoaded', function() {
    // Global toast helper for success/error messages across pages.
    if (!window.showToast) {
        window.showToast = function(message, type = 'success') {
            let container = document.querySelector('.toast-container');
            if (!container) {
                container = document.createElement('div');
                container.className = 'toast-container';
                document.body.appendChild(container);
            }

            const toast = document.createElement('div');
            toast.className = `toast-message toast-${type}`;
            toast.textContent = message;
            container.appendChild(toast);

            requestAnimationFrame(() => {
                toast.classList.add('visible');
            });

            window.setTimeout(() => {
                toast.classList.remove('visible');
                window.setTimeout(() => toast.remove(), 260);
            }, 2800);
        };
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    const body = document.body;
    let navBackdrop = null;

    function closeMobileMenu() {
        if (!nav || !mobileMenuBtn) return;
        nav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        body.classList.remove('menu-open');
        if (navBackdrop) {
            navBackdrop.classList.remove('active');
        }
    }

    function openMobileMenu() {
        if (!nav || !mobileMenuBtn) return;
        nav.classList.add('active');
        mobileMenuBtn.classList.add('active');
        body.classList.add('menu-open');
        if (navBackdrop) {
            navBackdrop.classList.add('active');
        }
    }
    
    if (mobileMenuBtn) {
        navBackdrop = document.createElement('div');
        navBackdrop.className = 'nav-backdrop';
        body.appendChild(navBackdrop);

        navBackdrop.addEventListener('click', closeMobileMenu);

        mobileMenuBtn.addEventListener('click', function() {
            const isActive = nav && nav.classList.contains('active');
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    // Close mobile menu when clicking on a nav link
    if (nav) {
        nav.querySelectorAll('a[href]').forEach((navLink) => {
            navLink.addEventListener('click', () => {
                // Keep default browser navigation exactly like desktop.
                // We only close menu UI state when a link is tapped.
                closeMobileMenu();
            });
        });
    }

    // Close menu with Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // Make logo a Home/Landing navigation target on every page
    const logo = document.querySelector('.logo');
    if (logo && !logo.closest('a')) {
        logo.setAttribute('role', 'link');
        logo.setAttribute('tabindex', '0');
        logo.setAttribute('aria-label', 'Go to homepage');
        logo.addEventListener('click', function () {
            window.location.href = 'index.html';
        });
        logo.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                window.location.href = 'index.html';
            }
        });
    }

    // Always show current year in footer labels
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('.current-year').forEach((yearElement) => {
        yearElement.textContent = String(currentYear);
    });

    // Keep social links consistent on all pages.
    const socialProfiles = {
        facebook: 'https://www.facebook.com/novaplus_pet_shop',
        instagram: 'https://www.instagram.com/novaplus_pet_shop',
        twitter: 'https://x.com/novaplus_pet_shop'
    };
    document.querySelectorAll('.social-links a').forEach((link) => {
        const icon = link.querySelector('i');
        if (!icon) return;

        if (icon.classList.contains('fa-facebook')) {
            link.href = socialProfiles.facebook;
            link.setAttribute('aria-label', 'Novaplus Pet Shop on Facebook');
        } else if (icon.classList.contains('fa-instagram')) {
            link.href = socialProfiles.instagram;
            link.setAttribute('aria-label', 'Novaplus Pet Shop on Instagram');
        } else if (icon.classList.contains('fa-twitter')) {
            link.href = socialProfiles.twitter;
            link.setAttribute('aria-label', 'Novaplus Pet Shop on X');
        }
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // Sticky header on scroll
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });

    // Sample product data
    const products = [
        {
            id: 1,
            name: 'Premium Dog Food',
            price: '18,000',
            image: 'images/premium%20dog%20food%20.png',
            category: 'Food & Treats',
            link: 'pet-shop.html?category=food'
        },
        {
            id: 2,
            name: 'Cat Litter Box',
            price: '12,500',
            image: 'images/cart%20little%20box%20.jpg',
            category: 'Accessories',
            link: 'pet-shop.html?category=accessories'
        },
        {
            id: 3,
            name: 'Dog Leash',
            price: '9,000',
            image: 'images/dog%20leash.avif',
            category: 'Collars & Leashes',
            link: 'pet-shop.html?category=accessories'
        },
        {
            id: 4,
            name: 'Pet Grooming Kit',
            price: '22,000',
            image: 'images/grooming%20kit.avif',
            category: 'Grooming',
            link: 'pet-shop.html?category=grooming'
        }
    ];

    // Sample testimonials data
    const testimonials = [
      {
        text: "Novaplus Veterinary has been taking care of my pets for years. Their team is professional and caring. Highly recommended!",
        author: "Aliete Umurerwa",
        rating: 5,
      },
      {
        text: "The pet shop has everything I need for my three dogs. Great quality products and the staff is very knowledgeable.",
        author: "Kamanzi David",
        rating: 5,
      },
      {
        text: "The vets here are amazing! They treated my cat with such care and the follow-up was excellent.",
        author: "Emily Biremeye",
        rating: 5,
      },
    ];

    // Load featured products
    function loadFeaturedProducts() {
        const productsGrid = document.querySelector('.products-grid');
        if (!productsGrid) return;

        // Clear loading content if any
        productsGrid.innerHTML = '';

        // Add products to the grid
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-card';
            productElement.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
                </div>
                <div class="product-info">
                    <span class="category">${product.category}</span>
                    <h3>${product.name}</h3>
                    <div class="price">RWF ${product.price}</div>
                    <a class="btn btn-primary" href="${product.link}">View Product</a>
                </div>
            `;
            productsGrid.appendChild(productElement);
        });
    }

    // Load testimonials
    function loadTestimonials() {
        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (!testimonialSlider) return;

        // Clear loading content if any
        testimonialSlider.innerHTML = '';

        // Add testimonials to the slider
        testimonials.forEach(testimonial => {
            const testimonialElement = document.createElement('div');
            testimonialElement.className = 'testimonial';
            
            // Create star rating
            let stars = '';
            for (let i = 0; i < 5; i++) {
                if (i < testimonial.rating) {
                    stars += '<i class="fas fa-star"></i>';
                } else {
                    stars += '<i class="far fa-star"></i>';
                }
            }
            
            testimonialElement.innerHTML = `
                <div class="testimonial-text">
                    <p>"${testimonial.text}"</p>
                </div>
                <div class="rating">
                    ${stars}
                </div>
                <div class="testimonial-author">${testimonial.author}</div>
            `;
            testimonialSlider.appendChild(testimonialElement);
        });
    }

    // Initialize Slick slider for testimonials if it's the homepage
    function initTestimonialSlider() {
        if (document.querySelector('.testimonial-slider') && typeof $.fn.slick !== 'undefined') {
            $('.testimonial-slider').slick({
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                adaptiveHeight: true,
                autoplay: true,
                autoplaySpeed: 5000,
                arrows: false
            });
        }
    }

    // Add to cart function
    window.addToCart = function(productId) {
        // In a real app, this would add the product to a shopping cart
        const product = products.find(p => p.id === productId);
        if (product) {
            alert(`Added ${product.name} to your cart!`);
            // Here you would typically update the cart in your state management
        }
    };

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize components
    loadFeaturedProducts();
    loadTestimonials();
    
    // Load jQuery and Slick if not already loaded
    if (!window.jQuery) {
        const jqueryScript = document.createElement('script');
        jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        jqueryScript.integrity = 'sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=';
        jqueryScript.crossOrigin = 'anonymous';
        document.head.appendChild(jqueryScript);
        
        jqueryScript.onload = function() {
            const slickScript = document.createElement('script');
            slickScript.src = 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js';
            document.head.appendChild(slickScript);
            
            const slickStyle = document.createElement('link');
            slickStyle.rel = 'stylesheet';
            slickStyle.href = 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.min.css';
            document.head.appendChild(slickStyle);
            
            const slickThemeStyle = document.createElement('link');
            slickThemeStyle.rel = 'stylesheet';
            slickThemeStyle.href = 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.css';
            document.head.appendChild(slickThemeStyle);
            
            slickScript.onload = initTestimonialSlider;
        };
    } else {
        initTestimonialSlider();
    }

    // Active link highlighting
    const currentLocation = location.href;
    const navLinks = document.querySelectorAll('nav a');
    const navLength = navLinks.length;
    for (let i = 0; i < navLength; i++) {
        if (navLinks[i].href === currentLocation) {
            navLinks[i].classList.add('active');
        }
    }
});

// Form validation for contact form
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (name === '' || email === '' || message === '') {
        alert('Please fill in all required fields.');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    return true;
}

// Appointment form handling
function handleAppointmentForm(e) {
    e.preventDefault();
    
    if (!validateAppointmentForm()) {
        return false;
    }
    
    // In a real app, you would send this data to your server
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    
    // Show success message
    alert('Thank you for your appointment request! We will contact you shortly to confirm.');
    e.target.reset();
    
    return false;
}

function validateAppointmentForm() {
    const requiredFields = ['name', 'email', 'phone', 'pet-type', 'service', 'date', 'time'];
    
    for (const field of requiredFields) {
        const element = document.getElementById(field);
        if (element && element.value.trim() === '') {
            alert(`Please fill in the ${element.getAttribute('placeholder') || field} field.`);
            element.focus();
            return false;
        }
    }
    
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    return true;
}

// Add event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Appointment form submission
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.onsubmit = handleAppointmentForm;
    }
});
