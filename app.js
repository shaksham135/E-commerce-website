let products = []; // Store products globally
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to fetch and display products
function fetchProducts() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data; // Store products in the global variable
            displayProducts(data);
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Function to display products
function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear existing content
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <p>Rating: ${product.rating} ★</p>
            <p>${product.description}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Function to add items to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item already exists
    } else {
        cart.push({ ...product, quantity: 1 }); // Add new item to cart
    }

    updateCart(); // Update the cart display
}

// Function to update cart display
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
    
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const totalAmount = document.getElementById('totalAmount');
    
    cartItems.innerHTML = ''; // Clear cart items
    let total = 0; // Initialize total

    if (cart.length > 0) {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <p>${item.name} x${item.quantity}</p>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItems.appendChild(cartItem);
            total += item.price * item.quantity; // Calculate total amount
        });
    } else {
        cartItems.innerHTML = '<p>Your cart is empty.</p>'; // Empty cart message
    }
    
    cartCount.textContent = cart.length; // Update cart count
    totalAmount.textContent = total.toFixed(2); // Update total amount

    // Create or update Checkout Button
    let checkoutBtn = document.getElementById('checkoutButton');
    if (!checkoutBtn) {
        checkoutBtn = document.createElement('button');
        checkoutBtn.id = 'checkoutButton'; // Assign an ID to the button
        checkoutBtn.textContent = 'Checkout';
        checkoutBtn.onclick = () => {
            window.location.href = 'checkout.html'; // Redirect to checkout page
        };
        document.getElementById('cartTotal').appendChild(checkoutBtn); // Add button to the total section
    }
}

// Function to remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId); // Remove item
    updateCart(); // Update the cart display
}

// Show cart section
document.getElementById('cartBtn').addEventListener('click', function() {
    const cartSection = document.getElementById('cartSection');
    cartSection.style.display = cartSection.style.display === 'none' ? 'block' : 'none'; // Toggle cart visibility
});

// Initialize and load products on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts(); // Fetch products
    updateCart(); // Update cart on load
});
