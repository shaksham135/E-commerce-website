// Load cart from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display cart items on the cart page
function displayCartItems() {
    const cartItems = document.getElementById('cartItems');
    const totalAmount = document.getElementById('totalAmount');
    cartItems.innerHTML = ''; // Clear existing cart items

    let total = 0; // Initialize total

    if (cart.length > 0) {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <p>${item.name} x${item.quantity}</p>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
                <button class="removeBtn" data-id="${item.id}">Remove</button>
            `;
            cartItems.appendChild(cartItem);
            total += item.price * item.quantity; // Calculate total amount
        });
    } else {
        cartItems.innerHTML = '<p>Your cart is empty.</p>'; // Empty cart message
    }

    totalAmount.textContent = total.toFixed(2); // Update total amount
}

// Event listener for removing items from the cart
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('removeBtn')) {
        const id = Number(event.target.getAttribute('data-id'));
        cart = cart.filter(item => item.id !== id); // Remove item from cart
        localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
        displayCartItems(); // Refresh cart display
    }
});

// Event listener for clear cart button
document.getElementById('clearCartBtn').addEventListener('click', function() {
    cart = []; // Clear cart array
    localStorage.removeItem('cart'); // Remove from local storage
    displayCartItems(); // Refresh cart display
});

// Event listener for checkout button
document.getElementById('checkoutBtn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items to your cart before proceeding to checkout.");
    } else {
        window.location.href = 'checkout.html'; // Redirect to checkout page
    }
});

// Display cart items on page load
document.addEventListener('DOMContentLoaded', displayCartItems);
