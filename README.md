# Premdhan Homestay — Website Guide & Deployment

A fast, lightweight, and responsive static website built with pure semantic HTML5, CSS3, and vanilla JavaScript. No build tools, frameworks, or databases required. It works out-of-the-box by double-clicking `index.html`.

---

## 📁 Project Directory Structure

```text
premdhanhomestay/
├── index.html                  # Single-page website with all sections
├── css/
│   └── style.css               # Styling, CSS variables, dark mode & responsive media queries
├── js/
│   └── main.js                 # Mobile menu, gallery filter, accessible lightbox, clipboard copy
├── images/
│   ├── favicon.svg             # Homestay browser tab icon
│   ├── hero/
│   │   └── hero.svg            # Hero banner placeholder (Replace with hero.jpg)
│   ├── rooms/
│   │   ├── room-double.svg     # Double Bed Room (Rooms 103 & 104) -> Replace with room-double.jpg
│   │   ├── room-three-bed.svg  # Three Bed Room (Room 101) -> Replace with room-three-bed.jpg
│   │   └── room-four-bed.svg   # Four Bed Room (Room 102) -> Replace with room-four-bed.jpg
│   └── gallery/
│       ├── rooms-1.svg         # Rooms 103 & 104
│       ├── rooms-2.svg         # Room 101
│       ├── rooms-3.svg         # Room 102
│       ├── bathrooms-1.svg     # Attached Bathroom & Solar Hot Water
│       ├── outdoors-1.svg      # Outdoors & Front Entrance
│       └── parking-1.svg       # Free Guest Parking Area
└── README.md                   # This instruction manual
```

---

## 🖼️ How to Replace Placeholder Photos with Real Photos

Place your actual photos into the corresponding `images/` folders. You can use standard `.jpg` or `.webp` files. Then update the file paths in `index.html`.

### 1. Photo Mapping & Recommended Dimensions

| Room / Area | File to Place in Folder | Line in `index.html` | Recommended Dimensions | Ratio |
| :--- | :--- | :--- | :--- | :--- |
| **Hero (Exterior House View)** | `images/hero/hero.jpg` | Line `123` | **1920 × 1080 px** | 16:9 |
| **Double Bed Room (Rooms 103 & 104)** | `images/rooms/room-double.jpg` | Line `235` | **1200 × 800 px** | 3:2 |
| **Three Bed Room (Room 101)** | `images/rooms/room-three-bed.jpg` | Line `311` | **1200 × 800 px** | 3:2 |
| **Four Bed Room (Room 102)** | `images/rooms/room-four-bed.jpg` | Line `387` | **1200 × 800 px** | 3:2 |
| **Gallery: Rooms 103 & 104** | `images/gallery/rooms-1.jpg` | Line `483` | **800 × 600 px** | 4:3 |
| **Gallery: Room 101** | `images/gallery/rooms-2.jpg` | Line `512` | **800 × 600 px** | 4:3 |
| **Gallery: Room 102** | `images/gallery/rooms-3.jpg` | Line `541` | **800 × 600 px** | 4:3 |
| **Gallery: Attached Bathroom** | `images/gallery/bathrooms-1.jpg` | Line `570` | **800 × 600 px** | 4:3 |
| **Gallery: Outdoors & Entrance** | `images/gallery/outdoors-1.jpg` | Line `599` | **800 × 600 px** | 4:3 |
| **Gallery: Free Parking** | `images/gallery/parking-1.jpg` | Line `628` | **800 × 600 px** | 4:3 |

> 💡 **Tip**: Compress your photos using a free tool like [TinyPNG / TinyJPG](https://tinypng.com) or [Squoosh](https://squoosh.app) to keep file sizes under 250 KB each.

---

## 📋 Missing Details Still to be Confirmed / Added by Host

The website has realistic and safe placeholders for details you have not confirmed yet. When you are ready to add them:

1. **Prices / Tariffs**:
   - Currently, prices are omitted from room cards as requested.
   - If you wish to show prices later, there is a marked, commented spot inside each room card (`<!-- <div class="room-price-box">...</div> -->` around lines `282`, `358`, and `434`). Simply uncomment them and insert your rate per night.
2. **Check-in / Check-out Times**:
   - Marked placeholder in About section (Line `207`): `[Check-in / Check-out times: Contact host]`.
3. **Max Guests / Capacity**:
   - Marked placeholder in About section (Line `195`): `[To be confirmed with host]`.
4. **Full Street Address**:
   - Currently set to: `Near Dwarkadhish Temple Area, Dwarka, Gujarat – 361335` (Lines `780–784`).
   - Update with your exact door / lane / landmark when ready.
5. **Email Address**:
   - Currently set to placeholder `stay@premdhanhomestay.com` (Lines `879` & `883`).

---

## 📞 Host Contact Details Configured

- **Phone Number**: `+91 63534 02373`
- **1-Click WhatsApp Inquiries**:
  - Double Bed Room (Rooms 103 & 104): `https://wa.me/916353402373?text=...`
  - Three Bed Room (Room 101): `https://wa.me/916353402373?text=...`
  - Four Bed Room (Room 102): `https://wa.me/916353402373?text=...`
  - Floating Bottom-Right WhatsApp Button: `https://wa.me/916353402373?text=...`
- **1-Click Copy Number**: Configured on the Contact card.

---

## 🚀 How to Deploy for Free

### Option 1: Netlify (Recommended — Drag & Drop)
1. Go to **[netlify.com](https://www.netlify.com/)** and log in or create a free account.
2. Open the **Sites** tab.
3. Drag and drop the `premdhanhomestay` folder into the upload box.
4. Your site will deploy instantly with a free SSL certificate (`https://<your-subdomain>.netlify.app`).

### Option 2: GitHub Pages
1. Create a repository on **[github.com](https://github.com/)** named `premdhanhomestay`.
2. Push your project files:
   ```bash
   git add .
   git commit -m "Update rooms and amenities"
   git remote add origin https://github.com/<YOUR-USERNAME>/premdhanhomestay.git
   git push -u origin main
   ```
3. In GitHub Settings > Pages, select branch `main` and root (`/`). Your site is live!
