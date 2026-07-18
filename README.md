<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:DC3545,50:FF6B81,100:FFC2D1&height=220&section=header&text=DELIZIA%20BAKERY&fontSize=50&fontColor=ffffff&fontAlignY=35&desc=Custom%20Cake%20Shop%20Website&descSize=16&descAlignY=55&animation=fadeIn&rotate=0&seed=1" width="100%">

### A fully responsive bakery website with a complete shopping experience

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-%E2%9A%A1%EF%B8%8F-DC3545?style=for-the-badge&logo=vercel&logoColor=white)](https://ayushnandi718-dev.github.io/Cake-Website-Demo)
[![License](https://img.shields.io/badge/LICENSE-MIT-blue?style=for-the-badge)](https://github.com/ayushnandi718-dev/Cake-Website-Demo/blob/main/LICENSE)
[![Stars](https://img.shields.io/github/stars/ayushnandi718-dev/Cake-Website-Demo?style=for-the-badge&color=FFD700)](https://github.com/ayushnandi718-dev/Cake-Website-Demo)
[![Forks](https://img.shields.io/github/forks/ayushnandi718-dev/Cake-Website-Demo?style=for-the-badge&color=00C853)](https://github.com/ayushnandi718-dev/Cake-Website-Demo)

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=3000&pause=1000&color=DC3545&center=true&vCenter=true&multiline=true&repeat=true&width=600&height=100&lines=Product+Browsing+%F0%9F%8D%B0+Shopping+Cart+%F0%9F%9B%92+Multi-Step+Checkout+%F0%9F%9A%CD%0APDF+Receipts+%F0%9F%93%84+Order+History+%F0%9F%93%A6+Animations+%E2%9C%A8" alt="Typing SVG" width="600">

---

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:FFC2D1,50:FF6B81,100:DC3545&height=80&section=divider&rotate=0&seed=2" width="100%">

</div>

## <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="24"> Tech Stack

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Swiper](https://img.shields.io/badge/Swiper-v12-6332F6?style=for-the-badge&logo=swiper&logoColor=white)
![jsPDF](https://img.shields.io/badge/jsPDF-2.5.2-D35400?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)
![RemixIcon](https://img.shields.io/badge/Remix_Icon-v4.9-00B4D8?style=for-the-badge&logo=remixicon&logoColor=white)
![GoogleFonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=for-the-badge&logo=googlefonts&logoColor=white)
![localStorage](https://img.shields.io/badge/Storage-localStorage-FFA000?style=for-the-badge&logo=javascript&logoColor=white)

</div>

---

## <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="24"> Features

<table>
<tr>
<td width="50%" valign="top">

### <img src="https://em-content.zobj.net/source/twitter/376/cake_1f370-fe0f.svg" width="20"> Product Catalog
- **15 handcrafted cakes** across 5 categories
- Category filtering with animated tab switching
- Product cards with tags, descriptions & pricing
- Staggered entrance animations on filter change

### <img src="https://em-content.zobj.net/source/twitter/376/shopping-bags_1f6cd-fe0f.svg" width="20"> Shopping Cart
- Slide-in sidebar with overlay backdrop
- Add / remove items with quantity controls
- Clear Cart button
- Animated badge with item count
- Persistent via `localStorage`

</td>
<td width="50%" valign="top">

### <img src="https://em-content.zobj.net/source/twitter/376/credit-card_1f4b3.svg" width="20"> Multi-Step Checkout
- **4-step wizard** — Summary &rarr; Delivery &rarr; Payment &rarr; Success
- In-page modal **and** standalone page
- Demo payment with auto-formatting
- Visual step indicator with progress states

### <img src="https://em-content.zobj.net/source/twitter/376/outbox-tray_1f4e4.svg" width="20"> Order Confirmation
- **Email** — Gmail `mailto:` with full order details
- **WhatsApp** — Pre-filled `wa.me` message
- **PDF Receipt** — Branded download via jsPDF

</td>
</tr>
<tr>
<td width="50%" valign="top">

### <img src="https://em-content.zobj.net/source/twitter/376/bar-chart_1f4ca.svg" width="20"> Order History
- All past orders saved to `localStorage`
- Order cards with thumbnails & status badges
- **View Details** modal with full breakdown
- **Re-order** — one-click cart restoration
- **Download PDF** for any past order

</td>
<td width="50%" valign="top">

### <img src="https://em-content.zobj.net/source/twitter/376/party-popper_1f389.svg" width="20"> Animations & Effects
- Blob morphing hero background
- Floating emoji decorations
- Swiper 3D creative transitions
- Scroll-reveal via IntersectionObserver
- Cart item slide-out removal
- Glassmorphism sticky header

</td>
</tr>
</table>

---

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:FFC2D1,50:FF6B81,100:DC3545&height=80&section=divider&rotate=0&seed=3" width="100%">
</div>

## <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="24"> Project Structure

```
Cake-Website-Demo/
├── 📄 index.html           → Main landing page & shop
├── 📄 checkout.html        → Standalone checkout page
├── 📄 orders.html          → Order history page
│
├── 📁 css/
│   ├── 🎨 styles.css       → Main styles (hero, sections, cart, nav)
│   ├── 🎨 checkout.css     → Checkout & confirmation styles
│   └── 🎨 orders.css       → Order history page styles
│
├── 📁 js/
│   ├── ⚡ main.js           → Homepage (products, cart, modal checkout)
│   ├── ⚡ checkout.js       → Checkout page logic + PDF generation
│   └── ⚡ orders.js         → Order history + PDF generation
│
└── 📁 assets/
    ├── 🖼️ common/           → Favicon, logos, blobs, stickers
    ├── 🖼️ home/             → Hero images, balloons, carousel
    ├── 🖼️ about/            → About section images
    ├── 🖼️ products/         → 15 cake product images
    └── 🖼️ new-cakes/        → New creations carousel images
```

---

## <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="24"> Responsive Design

<div align="center">

| Breakpoint | Layout |
|:---:|:---|
| `< 500px` | Single column, hamburger nav |
| `500px` | 2-column product grid |
| `860px` | 3-column product grid |
| `960px` | Hero + About side-by-side |
| `1100px+` | Auto-fill product grid, full nav |

</div>

```
Mobile-First  ·  clamp() Typography  ·  100dvh Heights  ·  CSS Custom Properties
```

---

## <img src="https://em-content.zobj.net/source/twitter/376/rocket_1f680.svg" width="24"> Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/ayushnandi718-dev/Cake-Website-Demo.git

# 2. Open in browser
cd Cake-Website-Demo
start index.html      # Windows
# open index.html     # macOS
```

> No build tools, no server, no dependencies required. Just open `index.html`.

---

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:FFC2D1,50:FF6B81,100:DC3545&height=80&section=divider&rotate=0&seed=4" width="100%">
</div>

## <img src="https://em-content.zobj.net/source/twitter/376/telescope_1f52d.svg" width="24"> Upcoming Updates

<div align="center">

| Priority | Feature | Description |
|:---:|:---|:---|
| 🔴 | **Backend Integration** | Node.js/Express API with MongoDB for real order management |
| 🔴 | **User Authentication** | Sign up / login with email or social accounts |
| 🔴 | **Payment Gateway** | Stripe / Razorpay integration for real payments |
| 🟠 | **Admin Dashboard** | Manage products, view orders, update status |
| 🟠 | **Order Tracking** | Real-time delivery status updates |
| 🟠 | **Email Notifications** | Automated order confirmation & delivery emails |
| 🟡 | **Wishlist** | Save favorite cakes for later |
| 🟡 | **Search & Sort** | Name/category search with price & popularity sort |
| 🟡 | **Product Reviews** | Customer ratings and feedback |
| 🟡 | **Coupon System** | Promo codes at checkout |
| 🟢 | **Image Lightbox** | Full-screen product image gallery |
| 🟢 | **Multi-language** | Hindi and English toggle |
| 🟢 | **PWA Support** | Offline access & installable app |
| 🟢 | **Performance** | Lazy loading, code splitting, optimization |
| 🟢 | **Unit Tests** | Jest tests for cart & checkout logic |

</div>

---

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:FFC2D1,50:FF6B81,100:DC3545&height=80&section=divider&rotate=0&seed=5" width="100%">
</div>

## <img src="https://em-content.zobj.net/source/twitter/376/artist-palette_1f3a8.svg" width="24"> Color Palette

<div align="center">

![Rose](https://img.shields.io/badge/Rose-DC3545?style=for-the-badge&color=DC3545)
![Rose Dark](https://img.shields.io/badge/Rose_Dark-B02A37?style=for-the-badge&color=B02A37)
![Cream](https://img.shields.io/badge/Cream-FFF5EE?style=for-the-badge&color=FFF5EE)
![Text](https://img.shields.io/badge/Text-2D2024?style=for-the-badge&color=2D2024)

</div>

---

<div align="center">

### Made with <img src="https://em-content.zobj.net/source/twitter/376/red-heart_2764-fe0f.svg" width="18"> by [Ayush Nandi](https://github.com/ayushnandi718-dev)

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:DC3545,50:FF6B81,100:FFC2D1&height=120&section=footer&text=THANKS%20FOR%20VISITING!&fontSize=20&fontColor=ffffff&fontAlignY=45&animation=twinkling&rotate=0&seed=6" width="100%">

</div>
