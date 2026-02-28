## Maison Boutique – React + Vite Storefront (Current Status)

Maison is a boutique fashion storefront built with **React**, **Vite**, **React Router**, **Tailwind CSS**, and **Supabase** (for data).  
This README describes **how the site looks right now** and **what features are already implemented.**

---

### 1. Tech Stack & Setup

- **Frontend**: React 18 + Vite
- **Routing**: React Router (`BrowserRouter`, `Routes`)
- **Styling**: Tailwind-style utility classes
- **Backend / Data**: Supabase JS client (collections + products tables), with **demo fallback data** so the UI works even without a database.
- **State**: Custom cart context (`CartContext`) using React Context + `localStorage`.

**Run locally**

```bash
npm install
npx vite
```

Open `http://localhost:5173/` in your browser.

---

### 2. Pages & Navigation (What the user sees)

- **Navbar**
  - Fixed at the top with scroll shadow.
  - Brand: `MAISON` centered.
  - Left: search icon (opens a search bar overlay – UI only for now).
  - Right: profile icon (non-functional placeholder) and **cart icon with badge** showing total items.
  - Bottom menu:
    - **Collections**: clickable label linking to `/collections` **and** a dropdown listing:
      - Kurtis → `/collections/kurtis`
      - Anarkalis → `/collections/anarkalis`
      - Crop tops → `/collections/crop-tops`
      - Western wear → `/collections/western-wear`
    - **Blog** → `/blog` (coming soon text)
    - **About** → `/about`
    - **Contact** → `/contact`

- **Home (`/`)**
  - Full-screen **hero section**:
    - Background lifestyle image with a soft gradient overlay.
    - Headline: “Timeless Elegance”.
    - Subtext about handcrafted fashion pieces.
    - Primary button **“EXPLORE COLLECTIONS”** → navigates to `/collections`.
  - **Featured Collection** slider:
    - Horizontally scrollable row of products (from Supabase `products` where `is_featured = true`).
    - Auto-scrolls every few seconds.
  - **Story section**:
    - Split layout with an image and text “Crafted with Love”, describing slow fashion and craftsmanship.

- **Collections overview (`/collections`)**
  - Shows 4 large collection cards:
    - **Kurtis**
    - **Anarkalis**
    - **Crop tops**
    - **Western wear**
  - Each card contains: image, collection name, short description, and an “EXPLORE →” affordance.
  - Clicking a card takes you to `/collections/:slug` for that collection.

- **Collection detail (`/collections/:slug`)**
  - Supported slugs: `kurtis`, `anarkalis`, `crop-tops`, `western-wear`.
  - Header with collection name + description.
  - **Products grid**:
    - First tries to load from Supabase `collections` and `products` tables.
    - If Supabase is not configured or empty, it falls back to **beautiful demo dresses** for each collection (4+ per collection), defined in `fallbackData`.
    - Each product is rendered via `ProductCard` and **links to its own detail page**.

- **Product description/detail (`/collections/:slug/:productId`)**
  - Large product image on the left, details on the right.
  - Shows:
    - Collection name
    - Product name
    - **Price that changes per size**
  - **Size selection**:
    - Options: XS, S, M, L, XL.
    - Each size has its own price (base price plus or minus an offset), displayed below the size label.
  - **Color selection**:
    - Simple set of color names (e.g. Ivory, Blush Pink, Emerald, Charcoal).
  - **Add to Cart** button:
    - Adds the exact variant (size + color) to cart, with the correct per-size price.
    - Variant ID is unique per size/color, so different sizes of the same dress appear as separate lines in the cart.
  - If the product is one of the demo fallback items, a small note indicates that it’s demo data until Supabase is connected.

- **About (`/about`)**
  - Explains the Maison brand, slow fashion, Indian textiles inspiration, etc.

- **Blog (`/blog`)**
  - “Coming soon” message (placeholder for future articles).

- **Contact (`/contact`)**
  - Brand email and phone.
  - Basic contact form (Name, Email, Message) – UI only, no backend submission yet.

- **Footer**
  - Brand description.
  - Quick links to shop collections and about pages.
  - Social icons (static).
  - Copyright.

---

### 3. Cart & Add‑to‑Cart (What already works)

- **Global cart state**
  - Implemented via `CartContext` and wrapped around the whole app.
  - Persists items to `localStorage` so the cart survives page refreshes.
  - Tracks:
    - `items` (with `id`, `name`, `price`, optional `size`, `color`, `image_url`, `quantity`)
    - `totalItems` (sum of quantities)
    - `subtotal` (sum of `price * quantity`)

- **Product cards**
  - On all collection and featured sections:
    - Show image, name, and base price.
    - On hover, an **“ADD TO CART”** button appears to quickly add one unit with the base price.
    - Whole card is clickable and navigates to the **product detail page** for more options.

- **Cart drawer (from navbar)**
  - Opens by clicking the cart icon.
  - Displays:
    - Product thumbnail, name.
    - Price and, if available, **size and color indicators** (e.g. `₹2,199 • M • Emerald`).
    - Quantity controls (+/−) and a “Remove” link.
  - Shows subtotal and “PROCEED TO CHECKOUT” button (UI placeholder only for now).
  - “Clear cart” button to empty the cart.

---

### 4. Supabase Integration & Fallback Data

- **Supabase client** configured in `src/lib/supabase.js` using env vars:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- **Collections + products schema** created via the SQL migration under `supabase/migrations/...`.
- **Graceful fallback**:
  - If Supabase is not yet configured, or returns no data, the app uses `fallbackData.js` to show:
    - 4 named collections.
    - Multiple products per collection (with images and base prices).
  - This means the website already looks like a **fully designed boutique store** even before the real database is wired up.

---

### 5. Summary of What’s Done vs Next

**Already done**
- Multi-page boutique storefront (Home, Collections overview, per‑collection pages, product detail, About/Blog/Contact).
- Four collections with multiple demo dresses each.
- Product description page per dress, with:
  - Size selector.
  - Color selector.
  - Different prices for different sizes.
- Fully working cart (add, remove, change quantity, subtotal, variant info).
- Navigation UX: dropdown collections menu, hero CTA, stable layout.

**Not yet implemented (future work)**
- Real search functionality.
- Real contact form submission / order placement.
- Authentication / profile page.
- Admin product management (creating/updating products and collections via UI).

This README describes the **current state** of the Maison website so you know exactly what is built and what can be added next.
