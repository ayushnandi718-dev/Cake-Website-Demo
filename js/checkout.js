/* =============== CHECKOUT PAGE LOGIC =============== */
const STORAGE_KEY = 'delizia-cart';
const DELIVERY_FEE = 4.99;
const TAX_RATE = 0.05;

let cart = [];

function loadCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

function saveCart() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch {}
}

function getSubtotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }
function getTax() { return getSubtotal() * TAX_RATE; }
function getTotal() { return getSubtotal() + getTax() + (cart.length ? DELIVERY_FEE : 0); }
function getCount() { return cart.reduce((s, i) => s + i.qty, 0); }

/* ---- Toast ---- */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

/* ---- Render Items ---- */
function renderItems() {
  const itemsEl = document.getElementById('co-items');
  if (!itemsEl) return;

  itemsEl.innerHTML = cart.map(item => `
    <div class="co-item">
      <img src="${item.img}" alt="${item.name}" class="co-item__img">
      <div class="co-item__info">
        <div class="co-item__name">${item.name}</div>
        <div class="co-item__meta">$${item.price.toFixed(2)} × ${item.qty}</div>
      </div>
      <div class="co-item__price">$${(item.price * item.qty).toFixed(2)}</div>
    </div>
  `).join('');
}

/* ---- Render Summary ---- */
function renderSummary() {
  const count = getCount();
  const sub = getSubtotal();
  const tax = getTax();
  const total = getTotal();
  const html = `
    <div class="co-summary__row"><span>Subtotal (${count} item${count !== 1 ? 's' : ''})</span><span>$${sub.toFixed(2)}</span></div>
    <div class="co-summary__row"><span>Tax (5%)</span><span>$${tax.toFixed(2)}</span></div>
    <div class="co-summary__row"><span>Delivery</span><span>$${DELIVERY_FEE.toFixed(2)}</span></div>
    <div class="co-summary__row co-summary__row--total"><span>Grand Total</span><span>$${total.toFixed(2)}</span></div>
  `;
  ['co-summary', 'co-summary-2', 'co-summary-3'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  });

  const totalEl = document.getElementById('co-total');
  if (totalEl) totalEl.innerHTML = `Total to pay: <strong>$${total.toFixed(2)}</strong>`;
}

/* ---- Step Navigation ---- */
let currentStep = 1;

function goToStep(n) {
  currentStep = n;
  [1, 2, 3, 4].forEach(i => {
    const el = document.getElementById(`co-section-${i}`);
    if (el) el.style.display = i === n ? 'block' : 'none';
  });

  document.querySelectorAll('.co-step').forEach(step => {
    const s = parseInt(step.dataset.step);
    step.classList.remove('co-step--active', 'co-step--done');
    if (s < n) step.classList.add('co-step--done');
    else if (s === n) step.classList.add('co-step--active');
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  cart = loadCart();

  const emptyEl = document.getElementById('co-empty');
  const stepsEl = document.getElementById('co-steps');

  if (cart.length === 0) {
    if (emptyEl) emptyEl.style.display = 'block';
    if (stepsEl) stepsEl.style.display = 'none';
    [1, 2, 3, 4].forEach(i => {
      const el = document.getElementById(`co-section-${i}`);
      if (el) el.style.display = 'none';
    });
    return;
  }

  renderItems();
  renderSummary();

  /* Step 1 → 2 */
  document.getElementById('co-next-1').addEventListener('click', () => goToStep(2));

  /* Step 2 → back/next */
  document.getElementById('co-back-2').addEventListener('click', () => goToStep(1));
  document.getElementById('co-next-2').addEventListener('click', () => {
    const fname = document.getElementById('co-fname').value.trim();
    const email = document.getElementById('co-email').value.trim();
    const phone = document.getElementById('co-phone').value.trim();
    const address = document.getElementById('co-address').value.trim();
    const date = document.getElementById('co-date').value;
    if (!fname || !email || !phone || !address || !date) {
      showToast('Please fill in all required fields.'); return;
    }
    goToStep(3);
  });

  /* Step 3 → back */
  document.getElementById('co-back-3').addEventListener('click', () => goToStep(2));

  /* Card number formatting */
  document.getElementById('co-card').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  });
  document.getElementById('co-expiry').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1 / $2').slice(0, 7);
  });

  /* Min date */
  const min = new Date();
  min.setDate(min.getDate() + 2);
  document.getElementById('co-date').min = min.toISOString().split('T')[0];

  /* Place Order */
  document.getElementById('co-place-order').addEventListener('click', () => {
    const card = document.getElementById('co-card').value.replace(/\s/g, '');
    const expiry = document.getElementById('co-expiry').value.trim();
    const cvv = document.getElementById('co-cvv').value.trim();
    const holder = document.getElementById('co-holder').value.trim();
    if (card.length < 16 || !expiry || cvv.length < 3 || !holder) {
      showToast('Please fill in all payment details.'); return;
    }

    const btn = document.getElementById('co-place-order');
    btn.disabled = true;
    btn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 1s linear infinite"></i> Processing…';

    setTimeout(() => {
      const orderId = 'DLZ-' + Math.random().toString(36).slice(2, 7).toUpperCase();
      document.getElementById('co-order-id').textContent = `#${orderId}`;

      const fname = document.getElementById('co-fname').value.trim();
      const date = document.getElementById('co-date').value;
      document.getElementById('co-success-summary').innerHTML = `
        <div class="co-success__detail"><i class="ri-user-line"></i> ${fname}</div>
        <div class="co-success__detail"><i class="ri-calendar-line"></i> Delivery: ${date}</div>
        <div class="co-success__detail"><i class="ri-money-dollar-circle-line"></i> Total: $${getTotal().toFixed(2)}</div>
      `;

      cart = [];
      saveCart();
      goToStep(4);
    }, 2000);
  });
});
