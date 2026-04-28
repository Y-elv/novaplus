// Sample product data
const products = [
    // Food & Treats
    {
        id: 1,
        name: 'Premium Dry Dog Food',
        price: 29.99,
        image: 'images/dog-food.jpg',
        category: 'food',
        petType: 'dog',
        rating: 4.5,
        inStock: true,
        featured: true
    },
    {
        id: 2,
        name: 'Grain-Free Cat Food',
        price: 24.99,
        image: 'images/cat-food.jpg',
        category: 'food',
        petType: 'cat',
        rating: 4.7,
        inStock: true,
        featured: true
    },
    {
        id: 3,
        name: 'Dog Treats - Chicken Flavor',
        price: 12.99,
        image: 'images/dog-treats.jpg',
        category: 'food',
        petType: 'dog',
        rating: 4.3,
        inStock: true,
        featured: false
    },
    {
        id: 4,
        name: 'Catnip Treats',
        price: 8.99,
        image: 'images/cat-treats.jpg',
        category: 'food',
        petType: 'cat',
        rating: 4.6,
        inStock: true,
        featured: false
    },
    
    // Accessories
    {
        id: 5,
        name: 'Comfortable Dog Bed',
        price: 49.99,
        image: 'images/dog-bed.jpg',
        category: 'accessories',
        petType: 'dog',
        rating: 4.8,
        inStock: true,
        featured: true
    },
    {
        id: 6,
        name: 'Cat Tree with Scratching Posts',
        price: 89.99,
        image: 'images/cat-tree.jpg',
        category: 'accessories',
        petType: 'cat',
        rating: 4.9,
        inStock: true,
        featured: true
    },
    {
        id: 7,
        name: 'Automatic Pet Feeder',
        price: 59.99,
        image: 'images/pet-feeder.jpg',
        category: 'accessories',
        petType: 'both',
        rating: 4.4,
        inStock: true,
        featured: false
    },
    {
        id: 8,
        name: 'Pet Carrier - Medium',
        price: 39.99,
        image: 'images/pet-carrier.jpg',
        category: 'accessories',
        petType: 'both',
        rating: 4.6,
        inStock: true,
        featured: false
    },
    
    // Grooming
    {
        id: 9,
        name: 'Pet Grooming Kit',
        price: 34.99,
        image: 'images/grooming-kit.jpg',
        category: 'grooming',
        petType: 'both',
        rating: 4.5,
        inStock: true,
        featured: true
    },
    {
        id: 10,
        name: 'Pet Hair Remover',
        price: 14.99,
        image: 'images/hair-remover.jpg',
        category: 'grooming',
        petType: 'both',
        rating: 4.2,
        inStock: true,
        featured: false
    },
    
    // Toys
    {
        id: 11,
        name: 'Interactive Dog Toy',
        price: 19.99,
        image: 'images/dog-toy.jpg',
        category: 'toys',
        petType: 'dog',
        rating: 4.7,
        inStock: true,
        featured: true
    },
    {
        id: 12,
        name: 'Feather Teaser Cat Toy',
        price: 9.99,
        image: 'images/cat-toy.jpg',
        category: 'toys',
        petType: 'cat',
        rating: 4.8,
        inStock: true,
        featured: false
    },
    
    // Health & Wellness
    {
        id: 13,
        name: 'Joint Supplement for Dogs',
        price: 24.99,
        image: 'images/dog-supplement.jpg',
        category: 'health',
        petType: 'dog',
        rating: 4.6,
        inStock: true,
        featured: true
    },
    {
        id: 14,
        name: 'Flea & Tick Prevention',
        price: 29.99,
        image: 'images/flea-treatment.jpg',
        category: 'health',
        petType: 'both',
        rating: 4.4,
        inStock: true,
        featured: false
    },
    {
        id: 15,
        name: 'Dental Care Kit for Cats',
        price: 18.99,
        image: 'images/cat-dental.jpg',
        category: 'health',
        petType: 'cat',
        rating: 4.5,
        inStock: true,
        featured: false
    },
    {
        id: 16,
        name: 'Pet First Aid Kit',
        price: 39.99,
        image: 'images/first-aid-kit.jpg',
        category: 'health',
        petType: 'both',
        rating: 4.7,
        inStock: true,
        featured: true
    }
];

// Shopping cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const categoryButtons = document.querySelectorAll('.category-buttons .btn');
const sortSelect = document.getElementById('sort-by');
const showSelect = document.getElementById('show');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageNumbers = document.getElementById('page-numbers');

// Pagination
let currentPage = 1;
let itemsPerPage = 12;
let filteredProducts = [...products];
let currentCategory = 'all';

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Load products
    displayProducts();
    updatePagination();
    updateCartCount();
    
    // Event listeners
    categoryButtons.forEach(button => {
        button.addEventListener('click', filterByCategory);
    });
    
    sortSelect.addEventListener('change', sortProducts);
    showSelect.addEventListener('change', updateItemsPerPage);
    prevPageBtn.addEventListener('click', goToPreviousPage);
    nextPageBtn.addEventListener('click', goToNextPage);
    
    // Check for category in URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        const button = Array.from(categoryButtons).find(btn => 
            btn.dataset.category === categoryParam);
        if (button) {
            button.click();
        }
    }
});

// Display products
function displayProducts() {
    // Clear container
    productsContainer.innerHTML = '';
    
    // Get current page items
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredProducts.slice(startIndex, endIndex);
    
    if (paginatedItems.length === 0) {
        productsContainer.innerHTML = '<div class="no-results">No products found. Please try a different filter.</div>';
        return;
    }
    
    // Create product cards
    paginatedItems.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.dataset.category = product.category;
        productElement.dataset.petType = product.petType;
        
        // Create star rating HTML
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 >= 0.5;
        let starsHTML = '';
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                starsHTML += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                starsHTML += '<i class="fas fa-star-half-alt"></i>';
            } else {
                starsHTML += '<i class="far fa-star"></i>';
            }
        }
        
        productElement.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
                ${product.featured ? '<span class="featured-badge">Featured</span>' : ''}
                ${!product.inStock ? '<span class="out-of-stock">Out of Stock</span>' : ''}
            </div>
            <div class="product-info">
                <span class="category">${formatCategory(product.category)}</span>
                <h3>${product.name}</h3>
                <div class="rating">
                    ${starsHTML}
                    <span>(${product.rating})</span>
                </div>
                <button class="btn btn-primary add-to-cart" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                    ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button class="btn btn-outline view-details" data-id="${product.id}">
                    View Details
                </button>
            </div>
        `;
        
        productsContainer.appendChild(productElement);
    });
    
    // Add event listeners to the new buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', viewProductDetails);
    });
}

// Filter products by category
function filterByCategory(e) {
    const category = e.target.dataset.category;
    currentCategory = category;
    currentPage = 1; // Reset to first page
    
    // Update active button
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Filter products
    if (category === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    // Update URL
    const url = new URL(window.location);
    if (category === 'all') {
        url.searchParams.delete('category');
    } else {
        url.searchParams.set('category', category);
    }
    window.history.pushState({}, '', url);
    
    // Update display
    displayProducts();
    updatePagination();
}

// Sort products
function sortProducts() {
    const sortBy = sortSelect.value;
    
    switch(sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'featured':
        default:
            // Default sorting (by featured first, then by id)
            filteredProducts.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return a.id - b.id;
            });
    }
    
    // Reset to first page when changing sort
    currentPage = 1;
    displayProducts();
    updatePagination();
}

// Update items per page
function updateItemsPerPage() {
    itemsPerPage = parseInt(showSelect.value);
    currentPage = 1; // Reset to first page
    displayProducts();
    updatePagination();
}

// Pagination functions
function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    
    // Update previous/next buttons
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage >= totalPages;
    
    // Update page numbers
    pageNumbers.innerHTML = '';
    
    // Show up to 5 page numbers
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4 && startPage > 1) {
        startPage = Math.max(1, endPage - 4);
    }
    
    // Previous page button
    if (startPage > 1) {
        const prevDots = document.createElement('button');
        prevDots.className = 'page-dots';
        prevDots.textContent = '...';
        prevDots.disabled = true;
        pageNumbers.appendChild(prevDots);
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => goToPage(i));
        pageNumbers.appendChild(pageBtn);
    }
    
    // Next page button
    if (endPage < totalPages) {
        const nextDots = document.createElement('button');
        nextDots.className = 'page-dots';
        nextDots.textContent = '...';
        nextDots.disabled = true;
        pageNumbers.appendChild(nextDots);
    }
    
    // Update URL without page reload
    const url = new URL(window.location);
    if (currentPage > 1) {
        url.searchParams.set('page', currentPage);
    } else {
        url.searchParams.delete('page');
    }
    window.history.pushState({}, '', url);
}

function goToPage(page) {
    currentPage = page;
    displayProducts();
    updatePagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayProducts();
        updatePagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayProducts();
        updatePagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Shopping cart functions
function addToCart(e) {
    const productId = parseInt(e.target.dataset.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show success message
    showNotification(`${product.name} added to cart!`);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}

// View product details
function viewProductDetails(e) {
    const productId = parseInt(e.target.dataset.id);
    if (!Number.isNaN(productId)) {
        window.location.href = `view-product.html?id=${productId}`;
    }
}

// Helper functions
function formatCategory(category) {
    return category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
}

function showNotification(message) {
    // In a real app, you might want to use a more sophisticated notification system
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    notification.style.zIndex = '1000';
    notification.style.animation = 'slideIn 0.5s forwards';
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Add some animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .notification {
        animation: slideIn 0.5s forwards;
    }
`;
document.head.appendChild(style);

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const pageParam = parseInt(urlParams.get('page')) || 1;
    
    if (categoryParam && categoryParam !== currentCategory) {
        const button = Array.from(categoryButtons).find(btn => 
            btn.dataset.category === categoryParam);
        if (button) {
            button.click();
        }
    } else if (pageParam !== currentPage) {
        currentPage = pageParam;
        displayProducts();
        updatePagination();
    }
});
