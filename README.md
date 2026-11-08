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

## 🖼️ Real Photos Active on the Site

The real homestay photos from `renamed_images/` have been processed, web-optimized, and placed directly into `images/` for fast loading and crisp resolution across all devices.

### Active Photo Mapping

| Area / Card | File Path | Source Image | Description |
| :--- | :--- | :--- | :--- |
| **Hero Banner** | `images/hero/hero.jpg` | `Bedroom_1_Bed_Overview.jpg` | Homestay guest room overview |
| **Double Bed Room** | `images/rooms/room-double.jpg` | `Bedroom_2_Full_Room_View.jpg` | Rooms 103 & 104 full perspective |
| **Three Bed Room** | `images/rooms/room-three-bed.jpg` | `Bedroom_1_Bed_Overview.jpg` | Room 101 double & single bed setup |
| **Four Bed Room** | `images/rooms/room-four-bed.jpg` | `Bedroom_3_Two_Double_Beds_Full_View.jpg` | Room 102 two double beds |
| **Gallery (Rooms)** | `images/gallery/room-double-overview.jpg` | `Bedroom_2_Full_Room_View.jpg` | Rooms 103 & 104 double bed room |
| **Gallery (Rooms)** | `images/gallery/room-three-overview.jpg` | `Bedroom_1_Bed_Overview.jpg` | Room 101 three beds setup |
| **Gallery (Rooms)** | `images/gallery/room-four-beds.jpg` | `Bedroom_3_Two_Double_Beds_Full_View.jpg` | Room 102 four bed room |
| **Gallery (Rooms)** | `images/gallery/room-double-bedside.jpg` | `Bedroom_2_Bedside_Angle.jpg` | Rooms 103 & 104 bedside view |
| **Gallery (Rooms)** | `images/gallery/room-three-full.jpg` | `Bedroom_1_Triple_Full_Room.jpg` | Room 101 full room view |
| **Gallery (Rooms)** | `images/gallery/room-three-double.jpg` | `Bedroom_1_Double_Bed_Angle.jpg` | Room 101 double bed angle |
| **Gallery (Rooms)** | `images/gallery/room-double-closeup.jpg` | `Bedroom_2_Bed_Close_Up.jpg` | Rooms 103 & 104 bed detail |
| **Gallery (Rooms)** | `images/gallery/room-three-mirror.jpg` | `Bedroom_1_Dressing_Mirror.jpg` | Room 101 dressing mirror |
| **Gallery (Rooms)** | `images/gallery/room-three-single.jpg` | `Bedroom_1_Single_Bed_Angle.jpg` | Room 101 single bed angle |
| **Gallery (Rooms)** | `images/gallery/room-three-window.jpg` | `Bedroom_1_Window_Headboard.jpg` | Room 101 window & headboard |
| **Gallery (Rooms)** | `images/gallery/room-three-console.jpg` | `Bedroom_1_Side_Console.jpg` | Room 101 side console |
| **Gallery (Bathrooms)** | `images/gallery/bathroom-washbasin.jpg` | `Toilet_Washbasin_Mirror_Entrance.jpg` | Washbasin, mirror & clean fixtures |
| **Gallery (Bathrooms)** | `images/gallery/bathroom-commode.jpg` | `Toilet_Commode_Interior.jpg` | Clean western toilet & hot water |
| **Gallery (Bathrooms)** | `images/gallery/bathroom-attached.jpg` | `Bedroom_1_Attached_Washroom_View.jpg` | Room 101 attached washroom view |
| **Gallery (Outdoors)** | `images/gallery/outdoors-1.svg` | Placeholder SVG | Front entrance (replace with real exterior when ready) |
| **Gallery (Parking)** | `images/gallery/parking-1.svg` | Placeholder SVG | Parking area (replace with real parking photo when ready) |

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

## 🌐 Live Website & Repository

- **Live Website Address**: [https://Abhishek3214.github.io/premdhan-homestay/](https://Abhishek3214.github.io/premdhan-homestay/)
- **GitHub Repository**: [https://github.com/Abhishek3214/premdhan-homestay](https://github.com/Abhishek3214/premdhan-homestay)

---

## 🚀 How to Update the Website in the Future

Whenever you make changes to your website (such as updating photos, prices, contact information, or text), run these three commands in your terminal:

```bash
git add .
git commit -m "Describe the change"
git push
```

GitHub Pages will automatically detect your push and deploy your updates to the live site within 1 to 2 minutes.

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
