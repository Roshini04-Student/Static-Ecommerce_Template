 // ============================================
// SHOPPING CART FUNCTIONALITY
// ============================================
let cart = [];
let cartCount = 0;

// Update cart count display
function updateCartCount() {
    const cartElement = doṇcument.querySelector('.nav_cart');
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartElement.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Cart (${cartCount})`;
}

// Add item to cart
function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification(`${productName} added to cart!`);
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message) {
    // Remove existing notification if any
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) existingNotif.remove();
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Hide and remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
function setupSearch() {
    const searchInput = document.querySelector('.search_input');
    const searchIcon = document.querySelector('.serach_icon');
    
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (query === '') {
            showNotification('Please enter a search term');
            return;
        }
        
        const boxes = document.querySelectorAll('.box');
        let found = false;
        
        boxes.forEach(box => {
            const heading = box.querySelector('h2');
            if (heading) {
                const text = heading.textContent.toLowerCase();
                if (text.includes(query)) {
                    box.style.display = 'block';
                    box.style.border = '3px solid #ff9900';
                    found = true;
                } else {
                    box.style.display = 'none';
                }
            }
        });
        
        if (!found) {
            showNotification(`No results found for "${query}"`);
            boxes.forEach(box => box.style.display = 'block');
        } else {
            showNotification(`Found results for "${query}"`);
        }
    }
    
    // Search on icon click
    searchIcon.addEventListener('click', performSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Clear search and show all products
function clearSearch() {
    const searchInput = document.querySelector('.search_input');
    searchInput.value = '';
    
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.style.display = 'block';
        box.style.border = 'none';
    });
}

// ============================================
// PRODUCT BOX INTERACTIONS
// ============================================
function setupProductBoxes() {
    const boxes = document.querySelectorAll('.box');
    
    boxes.forEach((box, index) => {
        // Add click event to "See more" links
        const seeMoreLink = box.querySelector('p');
        const heading = box.querySelector('h2');
        
        if (seeMoreLink && heading) {
            seeMoreLink.style.cursor = 'pointer';
            seeMoreLink.addEventListener('click', (e) => {
                e.stopPropagation();
                const productName = heading.textContent;
                const price = Math.floor(Math.random() * 5000) + 500; // Random price
                addToCart(productName, price);
            });
        }
        
        // Add hover effect
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ============================================
// BACK TO TOP FUNCTIONALITY
// ============================================
function setupBackToTop() {
    const backToTop = document.querySelector('.foot');
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.style.cursor = 'pointer';
}

// ============================================
// STICKY NAVBAR ON SCROLL
// ============================================
function setupStickyNav() {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero_section');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.width = '100%';
            header.style.zIndex = '1000';
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
            
            // Add padding to body to prevent content jump
            if (heroSection) {
                heroSection.style.marginTop = '120px';
            }
        } else {
            header.style.position = 'relative';
            header.style.boxShadow = 'none';
            
            if (heroSection) {
                heroSection.style.marginTop = '0';
            }
        }
    });
}

// ============================================
// PANEL MENU TOGGLE
// ============================================
function setupPanelMenu() {
    const panelAll = document.querySelector('.panel_All');
    const panelOps = document.querySelector('.panel_ops');
    
    if (panelAll && panelOps) {
        panelAll.addEventListener('click', () => {
            panelOps.classList.toggle('show-menu');
            
            if (panelOps.classList.contains('show-menu')) {
                panelOps.style.display = 'flex';
            } else {
                panelOps.style.display = 'none';
            }
        });
    }
}

// ============================================
// SIGN IN DROPDOWN
// ============================================
function setupSignInDropdown() {
    const signIn = document.querySelector('.nav_signin');
    
    signIn.addEventListener('click', () => {
        showNotification('Sign in feature - Coming soon!');
    });
}

// ============================================
// VIEW CART MODAL
// ============================================
function createCartModal() {
    const cartBtn = document.querySelector('.nav_cart');
    
    cartBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Your cart is empty');
            return;
        }
        
        const existingModal = document.querySelector('.cart-modal');
        if (existingModal) existingModal.remove();
        
        const modal = document.createElement('div');
        modal.className = 'cart-modal';
        
        let cartHTML = '<div class="cart-modal-content">';
        cartHTML += '<span class="close-modal">&times;</span>';
        cartHTML += '<h2>Shopping Cart</h2>';
        
        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            cartHTML += `
                <div class="cart-item">
                    <p><strong>${item.name}</strong></p>
                    <p>Price: ₹${item.price} x ${item.quantity} = ₹${itemTotal}</p>
                </div>
            `;
        });
        
        cartHTML += `<div class="cart-total"><strong>Total: ₹${total}</strong></div>`;
        cartHTML += '<button class="checkout-btn">Proceed to Checkout</button>';
        cartHTML += '</div>';
        
        modal.innerHTML = cartHTML;
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => modal.remove());
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        // Checkout button
        const checkoutBtn = modal.querySelector('.checkout-btn');
        checkoutBtn.addEventListener('click', () => {
            showNotification('Proceeding to checkout...');
            modal.remove();
        });
    });
}

// ============================================
// INITIALIZE ALL FEATURES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    setupSearch();
    setupProductBoxes();
    setupBackToTop();
    setupStickyNav();
    setupPanelMenu();
    setupSignInDropdown();
    createCartModal();
    
    console.log('Amazon Clone JavaScript Loaded Successfully!');
});

// ============================================
// ADDITIONAL CSS IMPROVEMENTS
// ============================================
const styles = `
/* Notification Styles */
.notification {
    position: fixed;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    background: #232f3e;
    color: white;
    padding: 15px 30px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    z-index: 10000;
    transition: top 0.3s ease;
    font-size: 14px;
    font-family: arial;
}

.notification.show {
    top: 20px;
}

/* Cart Modal Styles */
.cart-modal {
    display: block;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    animation: fadeIn 0.3s;
}

.cart-modal-content {
    background-color: white;
    margin: 5% auto;
    padding: 30px;
    border-radius: 8px;
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    animation: slideDown 0.3s;
    font-family: arial;
}

.cart-modal-content h2 {
    margin-bottom: 20px;
    color: #0F1111;
    border-bottom: 2px solid #ff9900;
    padding-bottom: 10px;
}

.close-modal {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    line-height: 20px;
}

.close-modal:hover {
    color: #000;
}

.cart-item {
    border-bottom: 1px solid #ddd;
    padding: 15px 0;
}

.cart-item p {
    margin: 5px 0;
    color: #0F1111;
}

.cart-total {
    margin-top: 20px;
    padding: 15px;
    background: #f3f3f3;
    border-radius: 5px;
    font-size: 18px;
    text-align: right;
    color: #0F1111;
}

.checkout-btn {
    width: 100%;
    padding: 12px;
    margin-top: 15px;
    background: #ff9900;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
    font-weight: 700;
}

.checkout-btn:hover {
    background: #fa8900;
}

/* Smooth box transitions */
.box {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.box:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

/* Make "See more" links more clickable */
.box_content p:last-child {
    cursor: pointer;
    transition: color 0.3s ease;
}

.box_content p:last-child:hover {
    color: #C7511F;
    text-decoration: underline;
}

/* Search input focus effect */
.search_input:focus {
    outline: none;
}

/* Cart button hover effect */
.nav_cart {
    transition: color 0.3s ease;
}

.nav_cart:hover {
    color: #ff9900;
}

/* Panel menu responsive */
.panel_ops {
    transition: all 0.3s ease;
}

/* Smooth scrolling for entire page */
html {
    scroll-behavior: smooth;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideDown {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Loading spinner for future use */
.loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #ff9900;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 20px auto;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);