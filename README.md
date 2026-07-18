# Delizia Bakery — Custom Cake Shop Website

A fully responsive, single-page bakery website with a complete shopping experience — product browsing, cart management, multi-step checkout, PDF receipts, and order history. Built with vanilla HTML, CSS, and JavaScript.

**Live Demo:** [ayushnandi718-dev.github.io/Cake-Website-Demo](https://ayushnandi718-dev.github.io/Cake-Website-Demo)

---

## Features

### Product Catalog
- **15 handcrafted cakes** across 5 categories: Strawberry, Vanilla, Chocolate, Dried Fruit, Others
- Category filtering with animated tab switching
- Product cards with images, descriptions, tags (Bestseller / Premium), and pricing
- Staggered entrance animations on filter change

### Shopping Cart
- Slide-in sidebar cart with overlay backdrop
- Add/remove items with quantity controls (+/-)
- Clear Cart button
- Animated cart badge with item count
- Persistent across sessions via `localStorage`

### Multi-Step Checkout
Two checkout implementations:
- **In-page modal** — 4-step wizard (Summary → Delivery → Payment → Success) without leaving the shop
- **Standalone page** (`checkout.html`) — dedicated full-page checkout with visual step indicator

**Checkout includes:**
- Order summary with itemized pricing breakdown
- Delivery details form (date picker, time selection, address)
- Demo payment form with auto-formatting (card number, expiry)
- Simulated processing animation

### Order Confirmation
- **Email** — pre-filled Gmail `mailto:` link with full order details
- **WhatsApp** — pre-filled `wa.me` message with order summary
- **PDF Receipt** — downloadable branded receipt via jsPDF with:
  - Bakery header and branding
  - Order ID, date, status
  - Customer and delivery details
  - Itemized table with quantities and prices
  - Subtotal, tax (5%), delivery fee, grand total

### Order History
- All past orders saved to `localStorage`
- Order cards with thumbnails, status badges, and totals
- **View Details** modal with full breakdown
- **Re-order** — adds all items from a past order back to cart
- **Download PDF** receipt for any past order
- Empty state when no orders exist

### Custom Order Form
- Inquiry form for custom cake requests (Birthday, Wedding, Anniversary, etc.)
- Fields: cake type, size, delivery date, special requests
- Validation with success confirmation

### Animations & Visual Effects
- Blob morphing hero background
- Floating emoji decorations
- Swiper carousels with 3D creative transitions
- Scroll-reveal animations via IntersectionObserver
- Cart item slide-out removal
- Add-to-cart button feedback (green checkmark)
- Toast notification system
- Glassmorphism sticky header on scroll

### Responsive Design
- Mobile-first with breakpoints from 440px to 1100px
- Adaptive product grid (1 → 2 → 3 → auto-fill columns)
- Hamburger navigation on mobile
- `clamp()` for fluid typography
- `100dvh` for full-viewport heights

---

## Tech Stack

| Category | Technology |
|---|---|
| Markup | HTML5 (semantic + ARIA) |
| Styling | CSS3 (Custom Properties, Grid, Flexbox, animations) |
| Logic | Vanilla JavaScript (ES6+) |
| Carousel | [Swiper v12](https://swiperjs.com) |
| PDF Generation | [jsPDF v2.5.2](https://www.npmjs.com/package/jspdf) |
| Icons | [Remix Icon v4.9](https://remixicon.com) |
| Fonts | Cormorant Garamond, DM Sans, Pacifico (Google Fonts) |
| Storage | localStorage (cart + order history) |

---

## Project Structure

```
Cake-Website-Demo/
├── index.html              # Main landing page & shop
├── checkout.html           # Standalone checkout page
├── orders.html             # Order history page
│
├── css/
│   ├── styles.css          # Main styles (sections, cart, nav, hero)
│   ├── checkout.css        # Checkout & order confirmation styles
│   └── orders.css          # Order history page styles
│
├── js/
│   ├── main.js             # Homepage logic (products, cart, modal checkout)
│   ├── checkout.js         # Standalone checkout page logic + PDF generation
│   └── orders.js           # Order history logic + PDF generation
│
└── assets/
    ├── common/             # Favicon, logos, blobs, stickers, leaves
    ├── home/               # Hero images, balloons, cake carousel images
    ├── about/              # About section images and cupcakes
    ├── products/           # Product images (15 cakes, 3 variants each)
    └── new-cakes/          # New creations carousel images
```

---

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/ayushnandi718-dev/Cake-Website-Demo.git
   ```
2. Open `index.html` in your browser — no build tools or server required.

---

## Upcoming Updates

- [ ] **Backend Integration** — Node.js/Express API for real order management and database storage
- [ ] **User Authentication** — Sign up / login with email or social accounts
- [ ] **Payment Gateway** — Stripe / Razorpay integration for real payments
- [ ] **Admin Dashboard** — Manage products, view orders, update order status
- [ ] **Product Reviews & Ratings** — Customer feedback on cakes
- [ ] **Wishlist** — Save favorite cakes for later
- [ ] **Search & Sort** — Search bar with name/category filtering, sort by price/popularity
- [ ] **Image Gallery** — Lightbox view for product images
- [ ] **Order Tracking** — Real-time delivery status updates
- [ ] **Email Notifications** — Automated order confirmation and delivery emails
- [ ] **Coupon / Discount Codes** — Promo code system at checkout
- [ ] **Multi-language Support** — Hindi and English toggle
- [ ] **PWA Support** — Offline access and installable app experience
- [ ] **Performance Optimization** — Lazy loading images, code splitting
- [ ] **Unit Tests** — Jest tests for cart logic and checkout validation

---

## License

This project is for educational and portfolio purposes.

---

Built with care by [Ayush Nandi](https://github.com/ayushnandi718-dev)
