// Load cart from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display cart items on checkout page
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
            `;
            cartItems.appendChild(cartItem);
            total += item.price * item.quantity; // Calculate total amount
        });
    } else {
        cartItems.innerHTML = '<p>Your cart is empty.</p>'; // Empty cart message
    }

    totalAmount.textContent = total.toFixed(2); // Update total amount
}

// Event listener for checkout form submission
document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get user details from form
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const zip = document.getElementById('zip').value;

    // Display order confirmation
    alert(`Thank you for your purchase, ${name}! Your order will be shipped to ${address}, ${city}, ${zip}.`);

    // Clear the cart
    localStorage.removeItem('cart'); // Clear cart from local storage
    cart = []; // Reset cart
    displayCartItems(); // Refresh cart display
});

// Show cart count in header
document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cartCount');
    cartCount.textContent = cart.length; // Set cart count
    displayCartItems(); // Display cart items
});
