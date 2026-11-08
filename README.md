# Premdhan Homestay — Website Guide & Deployment

A fast, lightweight, and responsive static website built with pure semantic HTML5, CSS3, and vanilla JavaScript. No build tools, frameworks, or databases required. It works out-of-the-box by double-clicking `index.html`.

---

## 📁 Project Directory Structure

```text
premdhanhomestay/
├── index.html                  # Single-page website with all 9 sections
├── css/
│   └── style.css               # Styling, CSS variables, dark mode & responsive media queries
├── js/
│   └── main.js                 # Mobile menu, gallery filter, accessible lightbox, clipboard copy
├── images/
│   ├── favicon.svg             # Homestay browser tab icon
│   ├── hero/
│   │   └── hero.svg            # Hero banner placeholder
│   ├── rooms/
│   │   ├── deluxe-room.svg     # Room 1 photo placeholder
│   │   ├── family-suite.svg    # Room 2 photo placeholder
│   │   └── garden-room.svg     # Room 3 photo placeholder
│   └── gallery/
│       ├── rooms-1.svg         # Gallery placeholder (Rooms)
│       ├── bathrooms-1.svg     # Gallery placeholder (Bathrooms)
│       ├── living-1.svg        # Gallery placeholder (Living Area)
│       ├── kitchen-1.svg       # Gallery placeholder (Kitchen & Dining)
│       ├── outdoors-1.svg      # Gallery placeholder (Outdoors & Patio)
│       └── rooms-2.svg         # Gallery placeholder (Dressing/Desk)
└── README.md                   # This instruction manual
```

---

## 🖼️ How to Replace Placeholder Photos with Real Photos

Place your actual photos into the corresponding `images/` folders. You can use standard `.jpg` or `.webp` files. Then update the file paths in `index.html`.

### 1. Photo Dimensions & Recommendations

| Photo Location | Recommended File Name | Recommended Dimensions | Aspect Ratio | Format |
| :--- | :--- | :--- | :--- | :--- |
| **Hero (Exterior House View)** | `images/hero/hero.jpg` | **1920 × 1080 px** | 16:9 | JPG or WebP |
| **Room 1 (Deluxe Double)** | `images/rooms/deluxe-room.jpg` | **1200 × 800 px** | 3:2 | JPG or WebP |
| **Room 2 (Family Suite)** | `images/rooms/family-suite.jpg` | **1200 × 800 px** | 3:2 | JPG or WebP |
| **Room 3 (Garden View)** | `images/rooms/garden-room.jpg` | **1200 × 800 px** | 3:2 | JPG or WebP |
| **Gallery Photos (All 6)** | `images/gallery/<name>.jpg` | **800 × 600 px** | 4:3 | JPG or WebP |

> 💡 **Tip**: Compress your photos using a free tool like [TinyPNG / TinyJPG](https://tinypng.com) or [Squoosh](https://squoosh.app) to keep file sizes under 250 KB each. This ensures the site loads instantly even on mobile 3G/4G connections.

---

## ✏️ Exact Files and Line Numbers to Edit

Open `index.html` in any text editor (VS Code, TextEdit, Notepad):

### 1. Photos
- **Hero Image**: Line `88`  
  `<img src="images/hero/hero.svg" ...>`  
  Change to: `<img src="images/hero/hero.jpg" ...>`
- **Deluxe Double Room**: Line `188`  
  `<img src="images/rooms/deluxe-room.svg" ...>`  
  Change to: `<img src="images/rooms/deluxe-room.jpg" ...>`
- **Family Suite**: Line `251`  
  `<img src="images/rooms/family-suite.svg" ...>`  
  Change to: `<img src="images/rooms/family-suite.jpg" ...>`
- **Garden View Room**: Line `314`  
  `<img src="images/rooms/garden-room.svg" ...>`  
  Change to: `<img src="images/rooms/garden-room.jpg" ...>`
- **Gallery Photos**: Lines `395`, `424`, `453`, `482`, `511`, `540`  
  Update both `data-full="..."` and `<img src="..." alt="...">` with your gallery photo paths and descriptive captions.

### 2. Contact & Booking Details
- **Phone Number**: `+91 63534 02373` (configured across all links & copy buttons)
- **WhatsApp Direct Links**:
  - Room 1 Inquire button: Line `249` (`https://wa.me/916353402373`)
  - Room 2 Inquire button: Line `314` (`https://wa.me/916353402373`)
  - Room 3 Inquire button: Line `379` (`https://wa.me/916353402373`)
  - Contact Section WhatsApp button: Line `833` (`https://wa.me/916353402373`)
- **Phone Number Display & Copy Button**:
  - Readable text: Line `805` (`+91 63534 02373`)
  - Copy button attribute: Line `812` (`data-copy="+916353402373"`)
- **Email Address**:
  - Readable text: Line `727`
  - Mailto link: Line `731` (`mailto:stay@premdhanhomestay.com`)
- **Full Address**:
  - Lines `606–610` (inside `<address>`)

### 3. Room Rates & Timings
- **Check-in / Check-out Timings**: Line `158`
- **Room 1 Price**: Line `225` (currently `₹2,200 / night`)
- **Room 2 Price**: Line `288` (currently `₹3,200 / night`)
- **Room 3 Price**: Line `351` (currently `₹2,000 / night`)

---

## 🚀 How to Deploy for Free

### Option 1: Netlify (Recommended — Takes 1 Minute & Free Contact Forms)

Netlify is the easiest option because it supports free drag-and-drop deployment and automatically processes the contact form on your website without any backend code.

1. Go to **[netlify.com](https://www.netlify.com/)** and sign up for a free account.
2. Go to **Sites** and look for the box that says:  
   *"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"*.
3. Drag the entire `premdhanhomestay` folder into that box.
4. Netlify will instantly deploy your website and provide a free live URL (e.g. `https://premdhan-homestay.netlify.app`).
5. **Form Submissions**: When someone fills out the inquiry form, the messages will automatically appear in your Netlify Dashboard under **Forms**, and you can configure free email notifications under **Form Settings > Notifications**.
6. *(Optional)*: You can add a custom domain name (e.g. `premdhanhomestay.com`) under **Domain Management** at any time.

---

### Option 2: GitHub Pages (Free Hosting with Git)

1. Create a free account at **[github.com](https://github.com/)**.
2. Click **New Repository**, name it `premdhanhomestay`, and set it to **Public**.
3. Push your project files to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Premdhan Homestay website"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/premdhanhomestay.git
   git push -u origin main
   ```
4. On GitHub, go to your repository **Settings > Pages**.
5. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
6. Within 1–2 minutes, your website is live at `https://<YOUR_USERNAME>.github.io/premdhanhomestay/`.

---

## 🧪 Testing Locally

To preview your website locally:
- Simply double-click `index.html` to open it in Chrome, Safari, Edge, or Firefox.
- Or use any simple local HTTP server:
  ```bash
  # Using Python (built-in on Mac & Linux):
  python3 -m http.server 8000
  # Then open http://localhost:8000 in your browser
  ```

