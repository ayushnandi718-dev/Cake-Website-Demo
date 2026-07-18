/* =============== PRODUCT DATA =============== */
const PRODUCTS = [
  { id: 1, name: 'Strawberry Shortcake', price: 15.99, category: 'strawberry', tag: 'Bestseller', desc: 'Light sponge with fresh strawberries and whipped cream.', img: 'assets/products/product-strawberry-1.png' },
  { id: 2, name: 'Fresh Strawberry Delight', price: 17.99, category: 'strawberry', tag: 'New', desc: 'Double layer with strawberry compote and mascarpone.', img: 'assets/products/product-strawberry-2.png' },
  { id: 3, name: 'Strawberry Rose Cake', price: 19.99, category: 'strawberry', tag: 'Premium', desc: 'Elegant rose-shaped decoration with strawberry mousse.', img: 'assets/products/product-strawberry-3.png' },
  { id: 4, name: 'Classic Vanilla Bean', price: 15.99, category: 'vanilla', tag: 'Classic', desc: 'Rich Madagascar vanilla bean with buttercream frosting.', img: 'assets/products/product-vanilla-1.png' },
  { id: 5, name: 'Vanilla Buttercream', price: 16.99, category: 'vanilla', tag: 'Popular', desc: 'Ultra-smooth buttercream with vanilla pastry cream filling.', img: 'assets/products/product-vanilla-2.png' },
  { id: 6, name: 'Soft Vanilla Sponge', price: 14.99, category: 'vanilla', tag: 'Light', desc: 'Airy chiffon sponge with vanilla cream and fresh flowers.', img: 'assets/products/product-vanilla-3.png' },
  { id: 7, name: 'Chocolate Fudge Cake', price: 18.99, category: 'chocolate', tag: 'Bestseller', desc: 'Triple-layered dark chocolate with fudge ganache.', img: 'assets/products/product-chocolate-1.png' },
  { id: 8, name: 'Dark Velvet Cake', price: 20.99, category: 'chocolate', tag: 'Premium', desc: 'Deep dark chocolate with velvet crumb and cocoa glaze.', img: 'assets/products/product-chocolate-2.png' },
  { id: 9, name: 'Triple Chocolate', price: 22.99, category: 'chocolate', tag: 'Indulgent', desc: 'White, milk, and dark chocolate in every single bite.', img: 'assets/products/product-chocolate-3.png' },
  { id: 10, name: 'Peanut Banana Cake', price: 16.99, category: 'fruit', tag: 'Nutty', desc: 'Caramelised banana with roasted peanut butter cream.', img: 'assets/products/product-dried-fruit-1.png' },
  { id: 11, name: 'Filled Walnut Cake', price: 17.99, category: 'fruit', tag: 'Crunchy', desc: 'Dense walnut sponge with caramel and walnut praline.', img: 'assets/products/product-dried-fruit-2.png' },
  { id: 12, name: 'Glazed Pecan Cake', price: 19.99, category: 'fruit', tag: 'Special', desc: 'Buttery pecan filling with caramel glaze topping.', img: 'assets/products/product-dried-fruit-3.png' },
  { id: 13, name: 'Chocolate Brownie', price: 12.99, category: 'others', tag: 'Fudgy', desc: 'Dense fudge brownie with glossy chocolate topping.', img: 'assets/products/product-others-1.png' },
  { id: 14, name: 'Cream Cupcake', price: 8.99, category: 'others', tag: 'Mini', desc: 'Fluffy vanilla cupcake with swirled rosette frosting.', img: 'assets/products/product-others-2.png' },
  { id: 15, name: 'Lemon Zest Cake', price: 15.99, category: 'others', tag: 'Fresh', desc: 'Tangy lemon curd with cream cheese and lemon glaze.', img: 'assets/products/product-others-3.png' },
];

const DELIVERY_FEE = 4.99;
const TAX_RATE = 0.05;
const STORAGE_KEY = 'delizia-cart';

/* =============== CART STATE =============== */
let cart = loadCart();
let isRemoving = false;

/* ---- Persistence ---- */
function loadCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}
function saveCart() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch { }
}

/* ---- Calculations ---- */
function getSubtotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }
function getTax() { return getSubtotal() * TAX_RATE; }
function getTotal() { return getSubtotal() + getTax() + (cart.length ? DELIVERY_FEE : 0); }
function getCount() { return cart.reduce((s, i) => s + i.qty, 0); }

/* =============== CART ACTIONS =============== */
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, img: product.img, qty: 1 });
  }
  saveCart();
  renderCart();
  showToast(`🎂 ${product.name} added to cart!`);

  /* button feedback */
  const btn = document.querySelector(`.product-card__add[data-id="${id}"]`);
  if (btn) {
    btn.classList.add('added');
    btn.innerHTML = '<i class="ri-check-line"></i>';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = '<i class="ri-shopping-bag-3-line"></i>';
    }, 900);
  }
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

function removeItem(id) {
  if (isRemoving) return;
  isRemoving = true;

  const item = cart.find(i => i.id === id);
  const el = document.querySelector(`.cart-item[data-id="${id}"]`);

  if (el) {
    el.style.transition = 'opacity .25s, transform .25s';
    el.style.opacity = '0';
    el.style.transform = 'translateX(30px)';
    setTimeout(() => {
      cart = cart.filter(i => i.id !== id);
      saveCart();
      renderCart();
      isRemoving = false;
    }, 260);
  } else {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
    isRemoving = false;
  }

  if (item) showToast(`${item.name} removed.`);
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
  showToast('Cart cleared.');
}

/* =============== RENDER CART =============== */
function renderCart() {
  const container = document.getElementById('cart-items');
  const footer = document.getElementById('cart-footer');
  const badge = document.getElementById('cart-badge');

  const count = getCount();
  badge.textContent = count;
  badge.classList.toggle('show', count > 0);

  if (cart.length === 0) {
    footer.style.display = 'none';
    container.innerHTML = `
      <div class="cart-empty" id="cart-empty">
        <i class="ri-shopping-bag-3-line"></i>
        <p>Your cart is empty</p>
        <span>Add some delicious cakes!</span>
      </div>`;
    return;
  }

  footer.style.display = 'block';

  const subtotal = getSubtotal();
  const tax = getTax();
  const grandTotal = getTotal();

  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.img}" alt="${item.name}" class="cart-item__img">
      <div class="cart-item__content">
        <h4 class="cart-item__name">${item.name}</h4>
        <p class="cart-item__single">$${item.price.toFixed(2)} each</p>
        <div class="cart-item__qty">
          <button onclick="changeQty(${item.id}, -1)" aria-label="Decrease quantity">
            <i class="ri-subtract-line"></i>
          </button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${item.id}, 1)" aria-label="Increase quantity">
            <i class="ri-add-line"></i>
          </button>
        </div>
      </div>
      <div class="cart-item__right">
        <div class="cart-item__price">$${(item.price * item.qty).toFixed(2)}</div>
        <button class="cart-item__remove" onclick="removeItem(${item.id})" aria-label="Remove ${item.name}">
          <i class="ri-delete-bin-line"></i>
        </button>
      </div>
    </div>
  `).join('');

  document.getElementById('cart-total').innerHTML = `
    <div class="cart-summary">
      <div class="cart-summary__row">
        <span>Subtotal (${count} item${count !== 1 ? 's' : ''})</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      <div class="cart-summary__row">
        <span>Tax (5%)</span>
        <span>$${tax.toFixed(2)}</span>
      </div>
      <div class="cart-summary__row">
        <span>Delivery</span>
        <span>$${DELIVERY_FEE.toFixed(2)}</span>
      </div>
      <div class="cart-summary__row cart-summary__row--total">
        <span>Grand Total</span>
        <span>$${grandTotal.toFixed(2)}</span>
      </div>
    </div>
  `;
}

/* =============== RENDER PRODUCTS =============== */
function renderProducts(filter = 'all') {
  const grid = document.getElementById('products-grid');
  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(p => `
    <article class="product-card" data-category="${p.category}">
      <div class="product-card__img-wrap">
        <img src="${p.img}" alt="${p.name}" class="product-card__img" loading="lazy" onerror="this.style.display='none'">
        <span class="product-card__tag">${p.tag}</span>
      </div>
      <div class="product-card__body">
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__desc">${p.desc}</p>
        <div class="product-card__footer">
          <span class="product-card__price">$${p.price.toFixed(2)}</span>
          <button class="product-card__add" data-id="${p.id}" onclick="addToCart(${p.id})" aria-label="Add ${p.name} to cart">
            <i class="ri-shopping-bag-3-line"></i>
          </button>
        </div>
      </div>
    </article>
  `).join('');

  /* restore "added" state for items already in cart */
  cart.forEach(item => {
    const btn = document.querySelector(`.product-card__add[data-id="${item.id}"]`);
    if (btn) btn.title = `In cart (${item.qty})`;
  });

  /* staggered entrance */
  grid.querySelectorAll('.product-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity .5s ${i * 0.06}s, transform .5s ${i * 0.06}s`;
    requestAnimationFrame(() => setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 50));
  });
}

/* =============== CHECKOUT MODAL =============== */
function buildCheckoutModal() {
  if (document.getElementById('checkout-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'checkout-modal';
  modal.className = 'checkout-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'checkout-title');

  modal.innerHTML = `
    <div class="checkout-backdrop" id="checkout-backdrop"></div>
    <div class="checkout-panel">
      <button class="checkout-close" id="checkout-close" aria-label="Close checkout">
        <i class="ri-close-line"></i>
      </button>

      <!-- STEP 1 – Order Summary -->
      <div class="checkout-step" id="checkout-step-1">
        <h3 class="checkout-title" id="checkout-title">
          <i class="ri-shopping-bag-3-line"></i> Order Summary
        </h3>
        <div class="checkout-items" id="checkout-items"></div>
        <div class="checkout-breakdown" id="checkout-breakdown"></div>
        <div class="checkout-actions">
          <button class="btn btn-primary" id="checkout-next-1">
            Continue to Delivery <i class="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>

      <!-- STEP 2 – Delivery Details -->
      <div class="checkout-step" id="checkout-step-2" style="display:none">
        <h3 class="checkout-title">
          <i class="ri-truck-line"></i> Delivery Details
        </h3>
        <div class="checkout-form">
          <div class="form__row">
            <div class="form__group">
              <label class="form__label" for="co-fname">First Name *</label>
              <input class="form__input" id="co-fname" type="text" placeholder="Maria" autocomplete="given-name">
            </div>
            <div class="form__group">
              <label class="form__label" for="co-lname">Last Name *</label>
              <input class="form__input" id="co-lname" type="text" placeholder="Garcia" autocomplete="family-name">
            </div>
          </div>
          <div class="form__group">
            <label class="form__label" for="co-email">Email *</label>
            <input class="form__input" id="co-email" type="email" placeholder="maria@email.com" autocomplete="email">
          </div>
          <div class="form__group">
            <label class="form__label" for="co-phone">Phone *</label>
            <input class="form__input" id="co-phone" type="tel" placeholder="+1 234 567 890" autocomplete="tel">
          </div>
          <div class="form__group">
            <label class="form__label" for="co-address">Delivery Address *</label>
            <input class="form__input" id="co-address" type="text" placeholder="123 Main St, City" autocomplete="street-address">
          </div>
          <div class="form__row">
            <div class="form__group">
              <label class="form__label" for="co-date">Delivery Date *</label>
              <input class="form__input" id="co-date" type="date">
            </div>
            <div class="form__group">
              <label class="form__label" for="co-time">Preferred Time</label>
              <select class="form__select" id="co-time">
                <option value="">Any time</option>
                <option>Morning (9am–12pm)</option>
                <option>Afternoon (12pm–4pm)</option>
                <option>Evening (4pm–8pm)</option>
              </select>
            </div>
          </div>
          <div class="form__group">
            <label class="form__label" for="co-notes">Special Instructions</label>
            <textarea class="form__textarea" id="co-notes" placeholder="Allergies, special requests, inscription text…"></textarea>
          </div>
        </div>
        <div class="checkout-actions">
          <button class="btn btn-outline" id="checkout-back-2">
            <i class="ri-arrow-left-line"></i> Back
          </button>
          <button class="btn btn-primary" id="checkout-next-2">
            Continue to Payment <i class="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>

      <!-- STEP 3 – Payment -->
      <div class="checkout-step" id="checkout-step-3" style="display:none">
        <h3 class="checkout-title">
          <i class="ri-secure-payment-line"></i> Payment
        </h3>
        <div class="checkout-payment-note">
          <i class="ri-shield-check-line"></i>
          <span>This is a demo — no real payment will be processed.</span>
        </div>
        <div class="checkout-form">
          <div class="form__group">
            <label class="form__label" for="co-card">Card Number</label>
            <input class="form__input" id="co-card" type="text" placeholder="4242 4242 4242 4242" maxlength="19" inputmode="numeric">
          </div>
          <div class="form__row">
            <div class="form__group">
              <label class="form__label" for="co-expiry">Expiry</label>
              <input class="form__input" id="co-expiry" type="text" placeholder="MM / YY" maxlength="7">
            </div>
            <div class="form__group">
              <label class="form__label" for="co-cvv">CVV</label>
              <input class="form__input" id="co-cvv" type="text" placeholder="123" maxlength="4" inputmode="numeric">
            </div>
          </div>
          <div class="form__group">
            <label class="form__label" for="co-holder">Name on Card</label>
            <input class="form__input" id="co-holder" type="text" placeholder="Maria Garcia" autocomplete="cc-name">
          </div>
        </div>
        <div class="checkout-order-total" id="checkout-order-total"></div>
        <div class="checkout-actions">
          <button class="btn btn-outline" id="checkout-back-3">
            <i class="ri-arrow-left-line"></i> Back
          </button>
          <button class="btn btn-primary" id="checkout-place-order">
            <i class="ri-lock-line"></i> Place Order
          </button>
        </div>
      </div>

      <!-- STEP 4 – Success -->
      <div class="checkout-step checkout-success" id="checkout-step-4" style="display:none">
        <div class="checkout-success__icon">🎂</div>
        <h3 class="checkout-success__title">Order Placed!</h3>
        <p class="checkout-success__msg">
          Thank you! Your order <strong id="checkout-order-id"></strong> has been received.
          We'll contact you within 2 hours to confirm delivery details.
        </p>
        <div class="checkout-success__summary" id="checkout-success-summary"></div>
        <button class="btn btn-primary" id="checkout-done">
          <i class="ri-home-line"></i> Continue Shopping
        </button>
      </div>

      <!-- Step indicator -->
      <div class="checkout-steps-indicator" id="checkout-steps-indicator">
        <span class="step-dot step-dot--active" data-step="1">1</span>
        <span class="step-line"></span>
        <span class="step-dot" data-step="2">2</span>
        <span class="step-line"></span>
        <span class="step-dot" data-step="3">3</span>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  initCheckoutEvents();
}

function showCheckoutStep(n) {
  [1, 2, 3, 4].forEach(i => {
    const el = document.getElementById(`checkout-step-${i}`);
    if (el) el.style.display = i === n ? 'block' : 'none';
  });
  const indicator = document.getElementById('checkout-steps-indicator');
  if (indicator) {
    if (n === 4) { indicator.style.display = 'none'; return; }
    indicator.style.display = 'flex';
    indicator.querySelectorAll('.step-dot').forEach(dot => {
      const s = parseInt(dot.dataset.step);
      dot.className = 'step-dot' + (s < n ? ' step-dot--done' : s === n ? ' step-dot--active' : '');
    });
  }
}

function populateCheckoutSummary() {
  const itemsEl = document.getElementById('checkout-items');
  const breakdownEl = document.getElementById('checkout-breakdown');
  const totalEl = document.getElementById('checkout-order-total');

  if (itemsEl) {
    itemsEl.innerHTML = cart.map(item => `
      <div class="checkout-item">
        <img src="${item.img}" alt="${item.name}" class="checkout-item__img">
        <div class="checkout-item__info">
          <span class="checkout-item__name">${item.name}</span>
          <span class="checkout-item__qty">× ${item.qty}</span>
        </div>
        <span class="checkout-item__price">$${(item.price * item.qty).toFixed(2)}</span>
      </div>
    `).join('');
  }

  const sub = getSubtotal();
  const tax = getTax();
  const total = getTotal();
  const rows = `
    <div class="checkout-breakdown__row"><span>Subtotal</span><span>$${sub.toFixed(2)}</span></div>
    <div class="checkout-breakdown__row"><span>Tax (5%)</span><span>$${tax.toFixed(2)}</span></div>
    <div class="checkout-breakdown__row"><span>Delivery</span><span>$${DELIVERY_FEE.toFixed(2)}</span></div>
    <div class="checkout-breakdown__row checkout-breakdown__row--total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
  `;
  if (breakdownEl) breakdownEl.innerHTML = rows;
  if (totalEl) totalEl.innerHTML = `<div class="checkout-grand-total">Total to pay: <strong>$${total.toFixed(2)}</strong></div>`;
}

function initCheckoutEvents() {
  /* close */
  const closeCheckout = () => {
    const placeBtn = document.getElementById('checkout-place-order');
    if (placeBtn) {
      placeBtn.disabled = false;
      placeBtn.innerHTML = '<i class="ri-lock-line"></i> Place Order';
    }
    resetCheckoutForm();
    showCheckoutStep(1);
    document.getElementById('checkout-modal').classList.remove('open');
    document.body.style.overflow = '';
  };
  document.getElementById('checkout-close').addEventListener('click', closeCheckout);
  document.getElementById('checkout-backdrop').addEventListener('click', closeCheckout);

  /* step navigation */
  document.getElementById('checkout-next-1').addEventListener('click', () => {
    showCheckoutStep(2);
    /* set min date */
    const min = new Date();
    min.setDate(min.getDate() + 2);
    document.getElementById('co-date').min = min.toISOString().split('T')[0];
  });

  document.getElementById('checkout-back-2').addEventListener('click', () => showCheckoutStep(1));
  document.getElementById('checkout-next-2').addEventListener('click', () => {
    const fname = document.getElementById('co-fname').value.trim();
    const email = document.getElementById('co-email').value.trim();
    const phone = document.getElementById('co-phone').value.trim();
    const address = document.getElementById('co-address').value.trim();
    const date = document.getElementById('co-date').value;
    if (!fname || !email || !phone || !address || !date) {
      showToast('⚠️ Please fill in all required fields.'); return;
    }
    showCheckoutStep(3);
  });

  document.getElementById('checkout-back-3').addEventListener('click', () => showCheckoutStep(2));

  /* card number formatting */
  document.getElementById('co-card').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  });
  document.getElementById('co-expiry').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1 / $2').slice(0, 7);
  });

  /* place order */
  document.getElementById('checkout-place-order').addEventListener('click', () => {
    const card = document.getElementById('co-card').value.replace(/\s/g, '');
    const expiry = document.getElementById('co-expiry').value.trim();
    const cvv = document.getElementById('co-cvv').value.trim();
    if (card.length < 16 || !expiry || cvv.length < 3) {
      showToast('⚠️ Please fill in valid payment details.'); return;
    }

    /* simulate processing */
    const btn = document.getElementById('checkout-place-order');
    btn.disabled = true;
    btn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 1s linear infinite"></i> Processing…';

    setTimeout(() => {
      /* generate order id */
      const orderId = 'DLZ-' + Math.random().toString(36).slice(2, 7).toUpperCase();
      document.getElementById('checkout-order-id').textContent = `#${orderId}`;

      const fname = document.getElementById('co-fname').value.trim();
      const date = document.getElementById('co-date').value;
      document.getElementById('checkout-success-summary').innerHTML = `
        <div class="checkout-success__detail"><i class="ri-user-line"></i> ${fname}</div>
        <div class="checkout-success__detail"><i class="ri-calendar-line"></i> Delivery: ${date}</div>
        <div class="checkout-success__detail"><i class="ri-money-dollar-circle-line"></i> Total: $${getTotal().toFixed(2)}</div>
      `;

      showCheckoutStep(4);
    }, 1800);
  });

  /* done */
  document.getElementById('checkout-done').addEventListener('click', () => {
    clearCart();
    const placeBtn = document.getElementById('checkout-place-order');
    if (placeBtn) {
      placeBtn.disabled = false;
      placeBtn.innerHTML = '<i class="ri-lock-line"></i> Place Order';
    }
    resetCheckoutForm();
    document.getElementById('checkout-modal').classList.remove('open');
    document.body.style.overflow = '';
    showToast('🎉 Thanks for your order! We\'ll be in touch soon.');
  });
}

function openCheckout() {
  if (cart.length === 0) { showToast('Your cart is empty!'); return; }
  buildCheckoutModal();
  populateCheckoutSummary();
  showCheckoutStep(1);
  document.getElementById('checkout-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  closeCart();
}

function resetCheckoutForm() {
  ['co-fname', 'co-lname', 'co-email', 'co-phone', 'co-address', 'co-date', 'co-time', 'co-notes',
    'co-card', 'co-expiry', 'co-cvv', 'co-holder'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
}

/* =============== TOAST =============== */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

/* =============== CART SIDEBAR =============== */
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');

function openCart() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('open');
  cartOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('open');
  cartOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('cart-toggle').addEventListener('click', openCart);
document.getElementById('cart-close').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
document.getElementById('cart-checkout').addEventListener('click', openCheckout);
document.getElementById('cart-clear').addEventListener('click', clearCart);

/* =============== MOBILE NAV =============== */
const navList = document.getElementById('nav-list');
document.getElementById('nav-toggle').addEventListener('click', () => navList.classList.add('open'));
document.getElementById('nav-close').addEventListener('click', () => navList.classList.remove('open'));
navList.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', () => navList.classList.remove('open')));

/* =============== PRODUCT TABS =============== */
document.querySelectorAll('.products__tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.products__tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    renderProducts(tab.dataset.filter);
  });
});

/* =============== HEADER & SCROLL UP =============== */
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY >= 50);
  document.getElementById('scroll-up').classList.toggle('show', window.scrollY >= 350);
}, { passive: true });

/* =============== ACTIVE NAV LINK =============== */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    const link = document.querySelector(`.nav__link[href="#${sec.id}"]`);
    if (link) link.classList.toggle('active', y >= top && y < top + sec.offsetHeight);
  });
}, { passive: true });

/* =============== SCROLL REVEAL =============== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal],[data-reveal-left],[data-reveal-right]')
  .forEach(el => revealObserver.observe(el));

/* =============== ORDER FORM =============== */
const minDate = new Date();
minDate.setDate(minDate.getDate() + 2);
document.getElementById('f-date').min = minDate.toISOString().split('T')[0];

document.getElementById('order-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const type = document.getElementById('f-type').value;
  const date = document.getElementById('f-date').value;
  if (!name || !email || !type || !date) { showToast('Please fill in all required fields.'); return; }
  this.style.display = 'none';
  document.getElementById('form-success').style.display = 'block';
  showToast('🎂 Order submitted successfully!');
});

/* =============== SWIPERS =============== */
new Swiper('.hero__swiper', {
  loop: true,
  speed: 800,
  effect: 'creative',
  creativeEffect: {
    prev: { translate: ['-100%', 0, -300], rotate: [0, 0, -12], opacity: .5, scale: .8 },
    next: { translate: ['100%', 0, -300], rotate: [0, 0, 12], opacity: .5, scale: .8 },
  },
  autoplay: { delay: 3000, disableOnInteraction: false },
});

new Swiper('.newcakes__swiper', {
  loop: true,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  spaceBetween: 24,
  speed: 700,
  effect: 'creative',
  creativeEffect: {
    limitProgress: 2,
    prev: { translate: ['-30%', 0, 0], scale: .65 },
    next: { translate: ['30%', 0, 0], scale: .65 },
  },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  autoplay: { delay: 3200, disableOnInteraction: false },
});

/* =============== INIT =============== */
renderProducts('all');
renderCart();
