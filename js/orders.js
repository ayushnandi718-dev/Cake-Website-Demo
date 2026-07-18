/* =============== ORDERS PAGE LOGIC =============== */
const ORDERS_KEY = 'delizia-orders';
const STORAGE_KEY = 'delizia-cart';

function loadOrders() {
  try {
    const stored = localStorage.getItem(ORDERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

function loadCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

function formatOrderDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function renderOrders() {
  const orders = loadOrders();
  const listEl = document.getElementById('orders-list');
  const emptyEl = document.getElementById('orders-empty');

  if (orders.length === 0) {
    listEl.innerHTML = '';
    emptyEl.style.display = 'block';
    return;
  }

  emptyEl.style.display = 'none';
  listEl.innerHTML = orders.map((o, idx) => {
    const thumbsHtml = o.items.slice(0, 5).map(i =>
      `<img class="order-card__item-thumb" src="${i.img}" alt="${i.name}" loading="lazy">`
    ).join('');
    const moreCount = o.items.length - 5;
    const moreHtml = moreCount > 0 ? `<span class="order-card__more">+${moreCount} more</span>` : '';

    return `
      <div class="order-card" data-idx="${idx}">
        <div class="order-card__header">
          <div>
            <div class="order-card__id">#${o.id}</div>
            <div class="order-card__date">${formatOrderDate(o.date)}</div>
          </div>
          <span class="order-card__status order-card__status--${o.status.toLowerCase()}">${o.status}</span>
        </div>
        <div class="order-card__items">
          ${thumbsHtml}${moreHtml}
        </div>
        <div class="order-card__footer">
          <span class="order-card__total">$${o.total.toFixed(2)}</span>
          <div class="order-card__actions">
            <button class="order-card__btn" data-detail="${idx}">
              <i class="ri-eye-line"></i> View Details
            </button>
            <button class="order-card__btn" data-reorder="${idx}">
              <i class="ri-shopping-cart-2-line"></i> Re-order
            </button>
          </div>
        </div>
      </div>`;
  }).join('');
}

function showOrderDetail(order) {
  const itemsHtml = order.items.map(i => `
    <div class="od-item">
      <img class="od-item__img" src="${i.img}" alt="${i.name}">
      <div class="od-item__info">
        <div class="od-item__name">${i.name}</div>
        <div class="od-item__meta">$${i.price.toFixed(2)} × ${i.qty}</div>
      </div>
      <div class="od-item__price">$${(i.price * i.qty).toFixed(2)}</div>
    </div>
  `).join('');

  document.getElementById('order-detail-content').innerHTML = `
    <div class="od-title"><i class="ri-file-list-3-line"></i> Order #${order.id}</div>

    <div class="od-section">
      <div class="od-section-title">Customer</div>
      <div class="od-row"><span>Name</span> <strong>${order.customer.fname} ${order.customer.lname}</strong></div>
      <div class="od-row"><span>Email</span> <strong>${order.customer.email}</strong></div>
      <div class="od-row"><span>Phone</span> <strong>${order.customer.phone}</strong></div>
    </div>

    <hr class="od-divider">
    <div class="od-section">
      <div class="od-section-title">Delivery</div>
      <div class="od-row"><span>Date</span> <strong>${order.delivery.date}</strong></div>
      <div class="od-row"><span>Time</span> <strong>${order.delivery.time}</strong></div>
      <div class="od-row"><span>Address</span> <strong>${order.delivery.address}</strong></div>
      ${order.delivery.notes ? `<div class="od-row"><span>Notes</span> <strong>${order.delivery.notes}</strong></div>` : ''}
    </div>

    <hr class="od-divider">
    <div class="od-section">
      <div class="od-section-title">Items (${order.items.length})</div>
      ${itemsHtml}
    </div>

    <hr class="od-divider">
    <div class="od-section">
      <div class="od-total-row"><span>Subtotal</span> <span>$${order.subtotal.toFixed(2)}</span></div>
      <div class="od-total-row"><span>Tax (5%)</span> <span>$${order.tax.toFixed(2)}</span></div>
      <div class="od-total-row"><span>Delivery</span> <span>$${order.deliveryFee.toFixed(2)}</span></div>
      <div class="od-total-row od-total-row--grand"><span>Grand Total</span> <span>$${order.total.toFixed(2)}</span></div>
    </div>

    <div class="od-btns">
      <button class="btn btn-outline od-reorder-btn">
        <i class="ri-shopping-cart-2-line"></i> Re-order
      </button>
      <button class="btn btn-primary od-download-btn">
        <i class="ri-download-line"></i> Download PDF
      </button>
    </div>
  `;

  document.getElementById('order-detail-overlay').style.display = 'flex';
  document.body.style.overflow = 'hidden';

  document.querySelector('.od-reorder-btn').addEventListener('click', () => {
    addToCart(order);
    document.getElementById('order-detail-overlay').style.display = 'none';
    document.body.style.overflow = '';
  });

  document.querySelector('.od-download-btn').addEventListener('click', () => downloadOrderPDF(order));
}

function addToCart(order) {
  let cart = loadCart();
  let added = 0;
  order.items.forEach(item => {
    const existing = cart.find(c => c.id === item.name.replace(/\s+/g, '-').toLowerCase());
    if (existing) {
      existing.qty += item.qty;
    } else {
      cart.push({
        id: item.name.replace(/\s+/g, '-').toLowerCase(),
        name: item.name,
        price: item.price,
        qty: item.qty,
        img: item.img
      });
    }
    added++;
  });
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch {}
  showToast(`${added} item(s) added to cart`);
}

function downloadOrderPDF(order) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const pageW = doc.internal.pageSize.getWidth();
  let y = 15;

  // Header
  doc.setFillColor(232, 67, 97);
  doc.rect(0, 0, pageW, 42, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text('Delizia Bakery', 15, y + 6);
  doc.setFontSize(9);
  doc.text('Handcrafted with Love', 15, y + 13);
  doc.setFontSize(10);
  doc.text(`Order #${order.id}`, pageW - 15, y + 6, { align: 'right' });
  doc.text(formatOrderDate(order.date), pageW - 15, y + 13, { align: 'right' });
  y = 52;

  // Customer & Delivery
  doc.setTextColor(51, 51, 51);
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('Customer Details', 15, y); y += 6;
  doc.setFont(undefined, 'normal');
  doc.text(`Name: ${order.customer.fname} ${order.customer.lname}`, 15, y); y += 5;
  doc.text(`Email: ${order.customer.email}`, 15, y); y += 5;
  doc.text(`Phone: ${order.customer.phone}`, 15, y); y += 9;

  doc.setFont(undefined, 'bold');
  doc.text('Delivery Details', 15, y); y += 6;
  doc.setFont(undefined, 'normal');
  doc.text(`Date: ${order.delivery.date}  |  Time: ${order.delivery.time}`, 15, y); y += 5;
  doc.text(`Address: ${order.delivery.address}`, 15, y); y += 5;
  if (order.delivery.notes) { doc.text(`Notes: ${order.delivery.notes}`, 15, y); y += 5; }
  y += 4;

  // Items header
  doc.setFillColor(242, 238, 235);
  doc.rect(15, y, pageW - 30, 8, 'F');
  doc.setFont(undefined, 'bold');
  doc.text('Item', 18, y + 5.5);
  doc.text('Qty', pageW - 85, y + 5.5);
  doc.text('Unit Price', pageW - 68, y + 5.5);
  doc.text('Total', pageW - 35, y + 5.5, { align: 'right' });
  y += 10;

  doc.setFont(undefined, 'normal');
  order.items.forEach(item => {
    const lineTotal = item.price * item.qty;
    doc.text(item.name, 18, y + 4);
    doc.text(String(item.qty), pageW - 83, y + 4);
    doc.text('$' + item.price.toFixed(2), pageW - 68, y + 4);
    doc.text('$' + lineTotal.toFixed(2), pageW - 35, y + 4, { align: 'right' });
    y += 7;
  });

  // Totals
  y += 3;
  doc.setDrawColor(200);
  doc.line(pageW - 80, y, pageW - 15, y); y += 6;

  const totals = [
    ['Subtotal', order.subtotal],
    ['Tax (5%)', order.tax],
    ['Delivery', order.deliveryFee],
  ];
  totals.forEach(([label, val]) => {
    doc.text(label, pageW - 80, y);
    doc.text('$' + val.toFixed(2), pageW - 35, y, { align: 'right' });
    y += 6;
  });

  doc.setFillColor(232, 67, 97);
  doc.setFont(undefined, 'bold');
  doc.setFontSize(12);
  doc.text('Grand Total', pageW - 80, y + 1);
  doc.text('$' + order.total.toFixed(2), pageW - 35, y + 1, { align: 'right' });

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setDrawColor(200);
  doc.line(15, footerY - 10, pageW - 15, footerY - 10);
  doc.setFont(undefined, 'normal');
  doc.setFontSize(7);
  doc.setTextColor(120);
  doc.text('Computer-generated receipt - no signature required.', pageW / 2, footerY, { align: 'center' });

  try {
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Delizia-Receipt-${order.id}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch(e) { console.error(e); showToast('Failed to generate PDF'); }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderOrders();

  document.getElementById('orders-list').addEventListener('click', (e) => {
    const detailBtn = e.target.closest('[data-detail]');
    const reorderBtn = e.target.closest('[data-reorder]');
    if (!detailBtn && !reorderBtn) return;

    const orders = loadOrders();
    const idx = detailBtn ? parseInt(detailBtn.dataset.detail) : parseInt(reorderBtn.dataset.reorder);
    const order = orders[idx];
    if (!order) return;

    if (detailBtn) {
      showOrderDetail(order);
    } else {
      addToCart(order);
    }
  });

  document.getElementById('order-detail-close').addEventListener('click', () => {
    document.getElementById('order-detail-overlay').style.display = 'none';
    document.body.style.overflow = '';
  });

  document.getElementById('order-detail-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const overlay = document.getElementById('order-detail-overlay');
      if (overlay.style.display === 'flex') {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
      }
    }
  });
});
