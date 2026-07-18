/* =============== CHECKOUT PAGE LOGIC =============== */
const STORAGE_KEY = 'delizia-cart';
const ORDERS_KEY = 'delizia-orders';
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

function loadOrders() {
  try {
    const stored = localStorage.getItem(ORDERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

function saveOrder(order) {
  const orders = loadOrders();
  orders.unshift(order);
  try { localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); } catch {}
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
      const lname = document.getElementById('co-lname').value.trim();
      const email = document.getElementById('co-email').value.trim();
      const phone = document.getElementById('co-phone').value.trim();
      const address = document.getElementById('co-address').value.trim();
      const date = document.getElementById('co-date').value;
      const time = document.getElementById('co-time').value || 'Any time';
      const notes = document.getElementById('co-notes').value.trim();

      const itemLines = cart.map(i => `  - ${i.name} x${i.qty} = $${(i.price * i.qty).toFixed(2)}`).join('\n');
      const total = getTotal().toFixed(2);

      document.getElementById('co-success-summary').innerHTML = `
        <div class="co-success__detail"><i class="ri-user-line"></i> ${fname} ${lname}</div>
        <div class="co-success__detail"><i class="ri-mail-line"></i> ${email}</div>
        <div class="co-success__detail"><i class="ri-phone-line"></i> ${phone}</div>
        <div class="co-success__detail"><i class="ri-calendar-line"></i> Delivery: ${date} (${time})</div>
        <div class="co-success__detail"><i class="ri-map-pin-line"></i> ${address}</div>
        <div class="co-success__detail"><i class="ri-money-dollar-circle-line"></i> Total: $${total}</div>
      `;

      /* ---- Email (mailto → Gmail) ---- */
      const emailSubject = encodeURIComponent(`Order Confirmation #${orderId} — Delizia Bakery`);
      const emailBody = encodeURIComponent(
        `Hi ${fname},\n\n` +
        `Thank you for your order at Delizia Bakery!\n\n` +
        `Order ID: #${orderId}\n` +
        `Name: ${fname} ${lname}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Delivery: ${date} (${time})\n` +
        `Address: ${address}\n` +
        (notes ? `Notes: ${notes}\n` : '') +
        `\nOrder Items:\n${itemLines}\n\n` +
        `Subtotal: $${getSubtotal().toFixed(2)}\n` +
        `Tax (5%): $${getTax().toFixed(2)}\n` +
        `Delivery: $${DELIVERY_FEE.toFixed(2)}\n` +
        `Grand Total: $${total}\n\n` +
        `We'll contact you within 2 hours to confirm.\n\n` +
        `— Delizia Bakery`
      );
      document.getElementById('co-email-btn').href = `mailto:${email}?subject=${emailSubject}&body=${emailBody}`;

      /* ---- WhatsApp ---- */
      const waMsg = encodeURIComponent(
        `🎂 *Order Confirmation #${orderId}*\n\n` +
        `Hi ${fname}, thank you for ordering from Delizia Bakery!\n\n` +
        `📋 *Order Details:*\n${cart.map(i => `• ${i.name} x${i.qty} — $${(i.price * i.qty).toFixed(2)}`).join('\n')}\n\n` +
        `💰 *Total: $${total}*\n` +
        `📅 Delivery: ${date} (${time})\n` +
        `📍 Address: ${address}\n` +
        (notes ? `📝 Notes: ${notes}\n` : '') +
        `\nWe'll confirm your order shortly! 🎉`
      );
      const waPhone = phone.replace(/[^0-9]/g, '');
      document.getElementById('co-whatsapp-btn').href = `https://wa.me/${waPhone}?text=${waMsg}`;

      /* ---- Save order to history ---- */
      saveOrder({
        id: orderId,
        date: new Date().toISOString(),
        customer: { fname, lname, email, phone },
        delivery: { date, time, address, notes },
        items: cart.map(i => ({ name: i.name, price: i.price, qty: i.qty, img: i.img })),
        subtotal: getSubtotal(),
        tax: getTax(),
        deliveryFee: DELIVERY_FEE,
        total: parseFloat(total),
        status: 'Confirmed'
      });

      cart = [];
      saveCart();
      goToStep(4);

      /* ---- PDF Receipt ---- */
      document.getElementById('co-download-receipt').addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const pageW = doc.internal.pageSize.getWidth();

        /* Header */
        doc.setFillColor(220, 50, 50);
        doc.rect(0, 0, pageW, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text('DELIZIA BAKERY', 14, 18);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Handcrafted Custom Cakes', 14, 26);
        doc.text('www.delizia-bakery.com', 14, 33);

        /* Receipt title */
        doc.setTextColor(220, 50, 50);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('PAYMENT RECEIPT', pageW / 2, 52, { align: 'center' });

        /* Order info */
        doc.setTextColor(50, 50, 50);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const infoY = 62;
        doc.text(`Order ID: #${orderId}`, 14, infoY);
        doc.text(`Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 14, infoY + 6);
        doc.text(`Status: Confirmed`, pageW - 14, infoY, { align: 'right' });

        /* Divider */
        doc.setDrawColor(200, 200, 200);
        doc.line(14, infoY + 12, pageW - 14, infoY + 12);

        /* Customer details */
        const custY = infoY + 20;
        doc.setFont('helvetica', 'bold');
        doc.text('Customer Details', 14, custY);
        doc.setFont('helvetica', 'normal');
        doc.text(`Name: ${fname} ${lname}`, 14, custY + 7);
        doc.text(`Email: ${email}`, 14, custY + 13);
        doc.text(`Phone: ${phone}`, 14, custY + 19);

        /* Delivery details */
        doc.setFont('helvetica', 'bold');
        doc.text('Delivery Details', pageW / 2 + 10, custY);
        doc.setFont('helvetica', 'normal');
        doc.text(`Date: ${date}`, pageW / 2 + 10, custY + 7);
        doc.text(`Time: ${time}`, pageW / 2 + 10, custY + 13);
        doc.text(`Address: ${address}`, pageW / 2 + 10, custY + 19);
        if (notes) doc.text(`Notes: ${notes}`, pageW / 2 + 10, custY + 25);

        /* Divider */
        doc.line(14, custY + 30, pageW - 14, custY + 30);

        /* Items table header */
        let tableY = custY + 38;
        doc.setFillColor(245, 245, 245);
        doc.rect(14, tableY - 5, pageW - 28, 8, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text('Item', 16, tableY);
        doc.text('Qty', 120, tableY);
        doc.text('Price', 140, tableY);
        doc.text('Total', pageW - 16, tableY, { align: 'right' });

        /* Items */
        doc.setFont('helvetica', 'normal');
        tableY += 10;
        cart.forEach(item => {
          doc.text(item.name, 16, tableY);
          doc.text(`x${item.qty}`, 120, tableY);
          doc.text(`$${item.price.toFixed(2)}`, 140, tableY);
          doc.text(`$${(item.price * item.qty).toFixed(2)}`, pageW - 16, tableY, { align: 'right' });
          tableY += 7;
        });

        /* Divider */
        tableY += 3;
        doc.setDrawColor(200, 200, 200);
        doc.line(14, tableY, pageW - 14, tableY);
        tableY += 8;

        /* Totals */
        doc.setFontSize(10);
        const totalsX = 130;
        doc.text('Subtotal:', totalsX, tableY);
        doc.text(`$${getSubtotal().toFixed(2)}`, pageW - 16, tableY, { align: 'right' });
        tableY += 7;
        doc.text('Tax (5%):', totalsX, tableY);
        doc.text(`$${getTax().toFixed(2)}`, pageW - 16, tableY, { align: 'right' });
        tableY += 7;
        doc.text('Delivery:', totalsX, tableY);
        doc.text(`$${DELIVERY_FEE.toFixed(2)}`, pageW - 16, tableY, { align: 'right' });
        tableY += 10;

        /* Grand total */
        doc.setFillColor(255, 240, 240);
        doc.rect(120, tableY - 6, pageW - 134, 10, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(220, 50, 50);
        doc.text('GRAND TOTAL:', totalsX, tableY);
        doc.text(`$${total}`, pageW - 16, tableY, { align: 'right' });

        /* Footer */
        doc.setTextColor(150, 150, 150);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text('This is a computer-generated receipt. No signature required.', pageW / 2, 280, { align: 'center' });
        doc.text('Thank you for ordering from Delizia Bakery!', pageW / 2, 285, { align: 'center' });

        doc.save(`Delizia-Receipt-${orderId}.pdf`);
        showToast('Receipt downloaded!');
      });
    }, 2000);
  });
});
