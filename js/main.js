/**
 * PREMDHAN HOMESTAY - MAIN JAVASCRIPT
 * Plain vanilla JS, zero dependencies.
 * Handles: Sticky nav, Mobile drawer, Gallery filtering, Lightbox with touch swipe & keyboard, Copy phone.
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
     1. Sticky Header & Scroll Spy
     ========================================================================== */
  const header = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Scroll spy for active navigation item
    let currentId = "";
    const scrollPos = window.scrollY + 120;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  /* ==========================================================================
     2. Mobile Navigation Menu
     ========================================================================== */
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !navMenu.classList.contains("open");
      navToggle.classList.toggle("open", isOpen);
      navMenu.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    };

    navToggle.addEventListener("click", () => toggleMenu());

    // Close when clicking nav links
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => toggleMenu(false));
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        toggleMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        toggleMenu(false);
      }
    });
  }

  /* ==========================================================================
     3. Gallery Filter & Lightbox with Touch Swipe
     ========================================================================== */
  const filterBtns = document.querySelectorAll(".gallery-filter-btn");
  const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxImg = lightbox ? lightbox.querySelector(".lightbox-image") : null;
  const lightboxCaption = lightbox ? lightbox.querySelector(".lightbox-caption") : null;
  const lightboxCounter = lightbox ? lightbox.querySelector(".lightbox-counter") : null;
  const btnPrev = lightbox ? lightbox.querySelector(".lightbox-prev") : null;
  const btnNext = lightbox ? lightbox.querySelector(".lightbox-next") : null;
  const btnClose = lightbox ? lightbox.querySelector(".lightbox-close") : null;

  let currentCategory = "all";
  let activeVisibleItems = [...galleryItems];
  let activeIndex = 0;

  // Filter items
  const updateGalleryFilter = (category) => {
    currentCategory = category;
    galleryItems.forEach((item) => {
      const itemCat = item.getAttribute("data-category");
      if (category === "all" || itemCat === category) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });

    // Recompute visible items for lightbox navigation
    activeVisibleItems = galleryItems.filter((item) => !item.classList.contains("hidden"));
  };

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter");
      updateGalleryFilter(category);
    });
  });

  // Lightbox functions
  const openLightbox = (index) => {
    if (!lightbox || activeVisibleItems.length === 0) return;
    activeIndex = (index + activeVisibleItems.length) % activeVisibleItems.length;
    const currentItem = activeVisibleItems[activeIndex];
    const imgEl = currentItem.querySelector("img");
    const fullSrc = currentItem.getAttribute("data-full") || imgEl.getAttribute("src");
    const captionText = currentItem.getAttribute("data-caption") || imgEl.getAttribute("alt") || "";

    lightboxImg.src = fullSrc;
    lightboxImg.alt = captionText;
    lightboxCaption.textContent = captionText;
    lightboxCounter.textContent = `${activeIndex + 1} / ${activeVisibleItems.length}`;

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (btnClose) btnClose.focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    // Return focus to active gallery item
    if (activeVisibleItems[activeIndex]) {
      activeVisibleItems[activeIndex].focus();
    }
  };

  const showNextImage = () => {
    openLightbox(activeIndex + 1);
  };

  const showPrevImage = () => {
    openLightbox(activeIndex - 1);
  };

  // Attach click to gallery items
  galleryItems.forEach((item) => {
    const handleOpen = () => {
      const indexInVisible = activeVisibleItems.indexOf(item);
      if (indexInVisible !== -1) {
        openLightbox(indexInVisible);
      }
    };

    item.addEventListener("click", handleOpen);
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleOpen();
      }
    });
  });

  if (lightbox) {
    if (btnNext) btnNext.addEventListener("click", showNextImage);
    if (btnPrev) btnPrev.addEventListener("click", showPrevImage);
    if (btnClose) btnClose.addEventListener("click", closeLightbox);

    // Click outside image closes lightbox
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target.classList.contains("lightbox-img-wrap")) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNextImage();
      if (e.key === "ArrowLeft") showPrevImage();
    });

    // Touch Swipe Detection for mobile devices
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    lightbox.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      },
      { passive: true }
    );

    lightbox.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
      },
      { passive: true }
    );

    const handleSwipe = () => {
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      // Ensure horizontal swipe is dominant and above threshold (40px)
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX < 0) {
          // Swiped left -> Next
          showNextImage();
        } else {
          // Swiped right -> Previous
          showPrevImage();
        }
      }
    };
  }

  /* ==========================================================================
     4. Copy Phone / WhatsApp Number Functionality
     ========================================================================== */
  const copyBtns = document.querySelectorAll(".copy-btn");
  const toast = document.getElementById("toast");

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  };

  copyBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const textToCopy = btn.getAttribute("data-copy");
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback method
          const tempInput = document.createElement("textarea");
          tempInput.value = textToCopy;
          tempInput.style.position = "fixed";
          tempInput.style.left = "-9999px";
          document.body.appendChild(tempInput);
          tempInput.focus();
          tempInput.select();
          document.execCommand("copy");
          document.body.removeChild(tempInput);
        }

        const originalText = btn.innerHTML;
        btn.classList.add("copied");
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          Copied!
        `;
        showToast(`Copied to clipboard: ${textToCopy}`);

        setTimeout(() => {
          btn.classList.remove("copied");
          btn.innerHTML = originalText;
        }, 2200);
      } catch (err) {
        showToast(`Number: ${textToCopy}`);
      }
    });
  });

  /* ==========================================================================
     5. Smooth scroll fallback & focus management
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
        targetElement.setAttribute("tabindex", "-1");
        targetElement.focus({ preventScroll: true });
      }
    });
  });
});

