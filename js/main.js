document.addEventListener("DOMContentLoaded", function () {
  // Global toast helper for success/error messages across pages.
  if (!window.showToast) {
    window.showToast = function (message, type = "success") {
      let container = document.querySelector(".toast-container");
      if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
      }

      const toast = document.createElement("div");
      toast.className = `toast-message toast-${type}`;
      toast.textContent = message;
      container.appendChild(toast);

      requestAnimationFrame(() => {
        toast.classList.add("visible");
      });

      window.setTimeout(() => {
        toast.classList.remove("visible");
        window.setTimeout(() => toast.remove(), 260);
      }, 2800);
    };
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  const nav = document.querySelector("nav");
  const body = document.body;
  let navBackdrop = null;

  function closeMobileMenu() {
    if (!nav || !mobileMenuBtn) return;
    nav.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    body.classList.remove("menu-open");
    if (navBackdrop) {
      navBackdrop.classList.remove("active");
    }
  }

  function openMobileMenu() {
    if (!nav || !mobileMenuBtn) return;
    nav.classList.add("active");
    mobileMenuBtn.classList.add("active");
    body.classList.add("menu-open");
    if (navBackdrop) {
      navBackdrop.classList.add("active");
    }
  }

  if (mobileMenuBtn) {
    navBackdrop = document.createElement("div");
    navBackdrop.className = "nav-backdrop";
    body.appendChild(navBackdrop);

    navBackdrop.addEventListener("click", closeMobileMenu);

    mobileMenuBtn.addEventListener("click", function () {
      const isActive = nav && nav.classList.contains("active");
      if (isActive) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Close mobile menu when clicking on a nav link
  if (nav) {
    nav.querySelectorAll("a[href]").forEach((navLink) => {
      navLink.addEventListener("click", () => {
        // Keep default browser navigation exactly like desktop.
        // We only close menu UI state when a link is tapped.
        closeMobileMenu();
      });
    });
  }

  // Close menu with Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  // Make logo a Home/Landing navigation target on every page
  const logo = document.querySelector(".logo");
  if (logo && !logo.closest("a")) {
    logo.setAttribute("role", "link");
    logo.setAttribute("tabindex", "0");
    logo.setAttribute("aria-label", "Go to homepage");
    logo.addEventListener("click", function () {
      window.location.href = "index.html";
    });
    logo.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        window.location.href = "index.html";
      }
    });
  }

  // Always show current year in footer labels
  const currentYear = new Date().getFullYear();
  document.querySelectorAll(".current-year").forEach((yearElement) => {
    yearElement.textContent = String(currentYear);
  });

  // Keep social links consistent on all pages.
  const socialProfiles = {
    facebook: "https://www.facebook.com/novaplus_pet_shop",
    instagram: "https://www.instagram.com/novaplus_pet_shop",
    twitter: "https://x.com/novaplus_pet_shop",
  };
  document.querySelectorAll(".social-links a").forEach((link) => {
    const icon = link.querySelector("i");
    if (!icon) return;

    if (icon.classList.contains("fa-facebook")) {
      link.href = socialProfiles.facebook;
      link.setAttribute("aria-label", "Novaplus Pet Shop on Facebook");
    } else if (icon.classList.contains("fa-instagram")) {
      link.href = socialProfiles.instagram;
      link.setAttribute("aria-label", "Novaplus Pet Shop on Instagram");
    } else if (icon.classList.contains("fa-twitter")) {
      link.href = socialProfiles.twitter;
      link.setAttribute("aria-label", "Novaplus Pet Shop on X");
    }
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  // Floating WhatsApp quick actions (shown on all pages)
  const whatsappStyleId = "whatsapp-float-styles";
  if (!document.getElementById(whatsappStyleId)) {
    const style = document.createElement("style");
    style.id = whatsappStyleId;
    style.textContent = `
      .whatsapp-float {
        position: fixed;
        right: 18px;
        bottom: 18px;
        z-index: 1200;
      }
      .whatsapp-main-btn {
        width: 58px;
        height: 58px;
        border: 0;
        border-radius: 50%;
        cursor: pointer;
        background: #25d366;
        color: #fff;
        font-size: 1.7rem;
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
      }
      .whatsapp-menu {
        position: absolute;
        right: 0;
        bottom: 72px;
        min-width: 250px;
        padding: 10px;
        border-radius: 12px;
        background: #fff;
        box-shadow: 0 14px 30px rgba(0, 0, 0, 0.18);
        border: 1px solid #e5e7eb;
        display: none;
      }
      .whatsapp-menu.open {
        display: block;
      }
      .whatsapp-action {
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        color: #111827;
        padding: 10px 12px;
        border-radius: 8px;
        font-weight: 600;
      }
      .whatsapp-action:hover {
        background: #f3f4f6;
      }
      .whatsapp-action i {
        color: #25d366;
      }
    `;
    document.head.appendChild(style);
  }

  const whatsappWidget = document.createElement("div");
  whatsappWidget.className = "whatsapp-float";
  whatsappWidget.innerHTML = `
    <div class="whatsapp-menu" id="whatsapp-menu">
      <a
        class="whatsapp-action"
        href="https://wa.me/250788407116"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat for shop services"
      >
        <i class="fab fa-whatsapp" aria-hidden="true"></i>
        <span>Shop - 0788407116</span>
      </a>
      <a
        class="whatsapp-action"
        href="https://wa.me/250787082975"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat for home veterinary services"
      >
        <i class="fab fa-whatsapp" aria-hidden="true"></i>
        <span>Home Veterinary Services - 0787082975</span>
      </a>
    </div>
    <button
      type="button"
      class="whatsapp-main-btn"
      id="whatsapp-main-btn"
      aria-label="Open WhatsApp contacts"
      aria-expanded="false"
      aria-controls="whatsapp-menu"
    >
      <i class="fab fa-whatsapp" aria-hidden="true"></i>
    </button>
  `;
  document.body.appendChild(whatsappWidget);

  const whatsappMainBtn = document.getElementById("whatsapp-main-btn");
  const whatsappMenu = document.getElementById("whatsapp-menu");
  if (whatsappMainBtn && whatsappMenu) {
    whatsappMainBtn.addEventListener("click", () => {
      const willOpen = !whatsappMenu.classList.contains("open");
      whatsappMenu.classList.toggle("open", willOpen);
      whatsappMainBtn.setAttribute("aria-expanded", String(willOpen));
    });

    document.addEventListener("click", (event) => {
      if (!whatsappWidget.contains(event.target)) {
        whatsappMenu.classList.remove("open");
        whatsappMainBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Sticky header on scroll
  const header = document.querySelector("header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove("scroll-up");
      return;
    }

    if (
      currentScroll > lastScroll &&
      !header.classList.contains("scroll-down")
    ) {
      // Scroll down
      header.classList.remove("scroll-up");
      header.classList.add("scroll-down");
    } else if (
      currentScroll < lastScroll &&
      header.classList.contains("scroll-down")
    ) {
      // Scroll up
      header.classList.remove("scroll-down");
      header.classList.add("scroll-up");
    }

    lastScroll = currentScroll;
  });

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Premium Dog Food",
      image: "images/premium%20dog%20food%20.png",
      category: "Food & Treats",
      link: "view-product.html?id=1",
    },
    {
      id: 2,
      name: "Cat Litter Box",
      image: "images/cart%20little%20box%20.jpg",
      category: "Accessories",
      link: "view-product.html?id=2",
    },
    {
      id: 3,
      name: "Dog Leash",
      image: "images/dog%20leash.avif",
      category: "Collars & Leashes",
      link: "view-product.html?id=3",
    },
    {
      id: 4,
      name: "Pet Grooming Kit",
      image: "images/grooming%20kit.avif",
      category: "Grooming",
      link: "view-product.html?id=4",
    },
    {
      id: 5,
      name: "First Aid Kit",
      image: "images/first%20aid%20kit.jpeg",
      category: "Accessories",
      link: "view-product.html?id=5",
    },
    {
      id: 6,
      name: "Pet Food Plate",
      image: "images/pet%20food%20plate.jpeg",
      category: "Accessories",
      link: "view-product.html?id=6",
    },
    {
      id: 7,
      name: "Josera Pet Food",
      image: "images/josera%20pet%20food .jpeg",
      category: "Food & Treats",
      link: "view-product.html?id=7",
    },
    {
      id: 8,
      name: "Track & Tail Rope Leash",
      image: "images/Track%20%26%20Tail%20Rope%20Dog%20Leash.jpeg",
      category: "Grooming",
      link: "view-product.html?id=8",
    },
    {
      id: 9,
      name: "Pet Soft & Comfy Padded Polyester Belt",
      image: "images/pet%20soft%20&%20comfy%20padded%20polyester%20belt.jpeg",
      category: "Collars & Leashes",
      link: "view-product.html?id=9",
    },
    {
      id: 10,
      name: "Chewing Toy",
      image: "images/chewing%20toy.jpeg",
      category: "Accessories",
      link: "view-product.html?id=10",
    },
    {
      id: 11,
      name: "Pet Shampoo",
      image: "images/pet%20shampo.jpeg",
      category: "Grooming",
      link: "view-product.html?id=11",
    },
    {
      id: 12,
      name: "Bravo Active Food",
      image: "images/bravo%20active%20food .jpeg",
      category: "Food & Treats",
      link: "view-product.html?id=12",
    },
    {
      id: 13,
      name: "Cat Food and Water Bowl",
      image: "images/Cat%20Food%20and%20Water%20Bowl%20Set.jpeg",
      category: "Accessories",
      link: "view-product.html?id=13",
    },
    {
      id: 14,
      name: "Chalesco Rope Tire Toy",
      image: "images/chalesco%20rope%20tire%20toy.jpeg",
      category: "Accessories",
      link: "view-product.html?id=14",
    },
    {
      id: 15,
      name: "Pet Ball Toy ",
      image: "images/pet%20ball%20toy.png",
      category: "Accessories",
      link: "view-product.html?id=15",
    },
    {
      id: 16,
      name: "Classic Adult Dog Food",
      image: "images/classic%20adult%20dog%20food.jpeg",
      category: "Food & Treats",
      link: "view-product.html?id=16",
    },
    {
      id: 17,
      name: "Classic Kitten Food",
      image: "images/classic%20kitten%20food .jpeg",
      category: "Food & Treats",
      link: "view-product.html?id=17",
    },
    {
      id: 18,
      name: "Foam Fitness Training Ring",
      image: "images/foam%20fitness%20training%20ring.jpeg",
      category: "Accessories",
      link: "view-product.html?id=18",
    },
    {
      id: 19,
      name: "Gromming Gloves",
      image: "images/gromming%20gloves.jpeg",
      category: "Grooming",
      link: "view-product.html?id=19",
    },
    {
      id: 20,
      name: "Josi Pet Food",
      image: "images/josi%20pet%20food .jpeg",
      category: "Food & Treats",
      link: "view-product.html?id=20",
    },
    {
      id: 21,
      name: "Pet Bag",
      image: "images/pet%20bag.jpeg",
      category: "Accessories",
      link: "view-product.html?id=21",
    },
    {
      id: 22,
      name: "Pet Beds",
      image: "images/pet%20beds.jpeg",
      category: "Accessories",
      link: "view-product.html?id=22",
    },
    {
      id: 23,
      name: "Pet Brushes",
      image: "images/pet%20brushes.jpeg",
      category: "Grooming",
      link: "view-product.html?id=23",
    },
    {
      id: 24,
      name: "Pet Chest Holder",
      image: "images/pet%20chest%20holder.jpeg",
      category: "Accessories",
      link: "view-product.html?id=24",
    },
    {
      id: 25,
      name: "Pet Cone",
      image: "images/pet%20cone.jpeg",
      category: "Accessories",
      link: "view-product.html?id=25",
    },
    {
      id: 26,
      name: "Pet Nail Clipper",
      image: "images/pet%20nail%20clipper.jpeg",
      category: "Grooming",
      link: "view-product.html?id=26",
    },
    {
      id: 27,
      name: "Royal Cannin Food",
      image: "images/Royal%20Cannin%20Puppy.jpeg",
      category: "Food & Treats",
      link: "view-product.html?id=27",
    },
    {
      id: 28,
      name: "WEPO Throwing Ball",
      image: "images/WEPO%20Throwing%20Ball%20for%20Dogs.jpeg",
      category: "Accessories",
      link: "view-product.html?id=28",
    },
  ];

  // Sample testimonials data
  const testimonials = [
    {
      text: "Novaplus veterinary Pet Ltd has been taking care of my pets for years. Their team is professional and caring. Highly recommended!",
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
    const productsGrid = document.querySelector(
      ".featured-products .products-grid",
    );
    if (!productsGrid) return;

    // Clear loading content if any
    productsGrid.innerHTML = "";

    const featuredProducts = products.slice(0, 4);

    // Add products to the grid
    featuredProducts.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "product-card";
      productElement.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
                </div>
                <div class="product-info">
                    <span class="category">${product.category}</span>
                    <h3>${product.name}</h3>
                    <a class="btn btn-primary" href="${product.link}">View Product</a>
                </div>
            `;
      productsGrid.appendChild(productElement);
    });
  }

  function initAllProductsPage() {
    const productsGrid = document.getElementById("all-products-grid");
    const searchInput = document.getElementById("products-search");
    const prevButton = document.getElementById("products-prev");
    const nextButton = document.getElementById("products-next");
    const pageInfo = document.getElementById("products-page-info");
    if (
      !productsGrid ||
      !searchInput ||
      !prevButton ||
      !nextButton ||
      !pageInfo
    )
      return;

    const pageSize = 9;
    let currentPage = 1;
    let filteredProducts = [...products];

    function renderAllProducts() {
      productsGrid.innerHTML = "";
      const totalPages = Math.max(
        1,
        Math.ceil(filteredProducts.length / pageSize),
      );
      if (currentPage > totalPages) currentPage = totalPages;

      const start = (currentPage - 1) * pageSize;
      const pageItems = filteredProducts.slice(start, start + pageSize);

      if (pageItems.length === 0) {
        productsGrid.innerHTML =
          '<div class="no-products">No products found for your search.</div>';
      } else {
        pageItems.forEach((product) => {
          const card = document.createElement("article");
          card.className = "product-card";
          card.innerHTML = `
            <div class="product-image">
              <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
              <span class="product-badge">${product.category}</span>
            </div>
            <div class="product-info">
              <span class="category">${product.category}</span>
              <h3>${product.name}</h3>
              <p class="product-description">Trusted quality product for your pet's daily care and comfort.</p>
              <div class="product-meta">
                <span><i class="fas fa-box-open"></i> In stock</span>
              </div>
              <a class="btn btn-primary" href="${product.link}">View Product</a>
            </div>
          `;
          productsGrid.appendChild(card);
        });
      }

      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
      prevButton.disabled = currentPage <= 1;
      nextButton.disabled = currentPage >= totalPages;
    }

    function applySearch() {
      const query = searchInput.value.trim().toLowerCase();
      filteredProducts = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
      });
      currentPage = 1;
      renderAllProducts();
    }

    searchInput.addEventListener("input", applySearch);
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage -= 1;
        renderAllProducts();
      }
    });
    nextButton.addEventListener("click", () => {
      const totalPages = Math.max(
        1,
        Math.ceil(filteredProducts.length / pageSize),
      );
      if (currentPage < totalPages) {
        currentPage += 1;
        renderAllProducts();
      }
    });

    renderAllProducts();
  }

  // Load testimonials
  function loadTestimonials() {
    const testimonialSlider = document.querySelector(".testimonial-slider");
    if (!testimonialSlider) return;

    // Clear loading content if any
    testimonialSlider.innerHTML = "";

    // Add testimonials to the slider
    testimonials.forEach((testimonial) => {
      const testimonialElement = document.createElement("div");
      testimonialElement.className = "testimonial";

      // Create star rating
      let stars = "";
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
    if (
      document.querySelector(".testimonial-slider") &&
      typeof $.fn.slick !== "undefined"
    ) {
      $(".testimonial-slider").slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
      });
    }
  }

  // Add to cart function
  window.addToCart = function (productId) {
    // In a real app, this would add the product to a shopping cart
    const product = products.find((p) => p.id === productId);
    if (product) {
      alert(`Added ${product.name} to your cart!`);
      // Here you would typically update the cart in your state management
    }
  };

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });

  // Initialize components
  loadFeaturedProducts();
  loadTestimonials();
  initAllProductsPage();

  // Load jQuery and Slick if not already loaded
  if (!window.jQuery) {
    const jqueryScript = document.createElement("script");
    jqueryScript.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    jqueryScript.integrity =
      "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=";
    jqueryScript.crossOrigin = "anonymous";
    document.head.appendChild(jqueryScript);

    jqueryScript.onload = function () {
      const slickScript = document.createElement("script");
      slickScript.src =
        "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js";
      document.head.appendChild(slickScript);

      const slickStyle = document.createElement("link");
      slickStyle.rel = "stylesheet";
      slickStyle.href =
        "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.min.css";
      document.head.appendChild(slickStyle);

      const slickThemeStyle = document.createElement("link");
      slickThemeStyle.rel = "stylesheet";
      slickThemeStyle.href =
        "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.css";
      document.head.appendChild(slickThemeStyle);

      slickScript.onload = initTestimonialSlider;
    };
  } else {
    initTestimonialSlider();
  }

  // Active link highlighting
  const currentLocation = location.href;
  const navLinks = document.querySelectorAll("nav a");
  const navLength = navLinks.length;
  for (let i = 0; i < navLength; i++) {
    if (navLinks[i].href === currentLocation) {
      navLinks[i].classList.add("active");
    }
  }
});

// Form validation for contact form
function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    alert("Please fill in all required fields.");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
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
  alert(
    "Thank you for your appointment request! We will contact you shortly to confirm.",
  );
  e.target.reset();

  return false;
}

function validateAppointmentForm() {
  const requiredFields = [
    "name",
    "email",
    "phone",
    "pet-type",
    "service",
    "date",
    "time",
  ];

  for (const field of requiredFields) {
    const element = document.getElementById(field);
    if (element && element.value.trim() === "") {
      alert(
        `Please fill in the ${element.getAttribute("placeholder") || field} field.`,
      );
      element.focus();
      return false;
    }
  }

  const email = document.getElementById("email").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  return true;
}

// Add event listeners when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Appointment form submission
  const appointmentForm = document.getElementById("appointment-form");
  if (appointmentForm) {
    appointmentForm.onsubmit = handleAppointmentForm;
  }
});
