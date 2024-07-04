// Cart operations

const CART_KEY = 'shopping_cart';

function getCart() {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  const existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += product.quantity;
  } else {
    cart.push(product);
  }
  saveCart(cart);
}

function updateCheckout() {
  const cart = getCart();
  const checkoutContainer = document.querySelector('.checkout-grid .order-summary');
  if (!checkoutContainer) return;

  checkoutContainer.innerHTML = '';
  cart.forEach(product => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item-container');
    cartItem.innerHTML = `
      <div class="delivery-date">Delivery date: ${product.deliveryDate}</div>
      <div class="cart-item-details-grid">
        <img class="product-image" src="${product.image}">
        <div class="cart-item-details">
          <div class="product-name">${product.name}</div>
          <div class="product-price">${product.price}</div>
          <div class="product-quantity">
            <span>Quantity: <span class="quantity-label">${product.quantity}</span></span>
            <span class="update-quantity-link link-primary">Update</span>
            <span class="delete-quantity-link link-primary">Delete</span>
          </div>
        </div>
        <div class="delivery-options">
          <div class="delivery-options-title">Choose a delivery option:</div>
          <!-- Delivery options here -->
        </div>
      </div>
    `;
    checkoutContainer.appendChild(cartItem);
  });

  updateOrderSummary();
}

function updateOrderSummary() {
  const cart = getCart();
  const itemTotal = cart.reduce((total, product) => total + product.price * product.quantity, 0);
  const shipping = 4.99; // Example shipping cost
  const tax = itemTotal * 0.10; // Example tax rate
  const orderTotal = itemTotal + shipping + tax;

  document.querySelector('.payment-summary-row .payment-summary-money').textContent = `$${itemTotal.toFixed(2)}`;
  document.querySelector('.payment-summary-row.subtotal-row .payment-summary-money').textContent = `$${(itemTotal + shipping).toFixed(2)}`;
  document.querySelector('.payment-summary-row.total-row .payment-summary-money').textContent = `$${orderTotal.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  updateCheckout();
});
