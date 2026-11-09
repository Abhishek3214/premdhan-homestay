// WHATSAPP CONTACT CONFIGURATION
// Put your WhatsApp number here in country code + number format (digits only, no + or spaces).
// e.g. "919876543210" for India (+91)
const WHATSAPP_NUMBER = "916353402373"; // country code + number, digits only, no + or spaces

/**
 * PREMDHAN HOMESTAY - MAIN JAVASCRIPT
 * Plain vanilla JS, zero dependencies.
 * Handles: Sticky nav, Mobile drawer, Gallery filtering, Lightbox with touch swipe & keyboard, Copy phone, WhatsApp enquiry form.
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

  /* ==========================================================================
     6. WhatsApp Enquiry Form & WhatsApp Links Synchronizer
     ========================================================================== */
  const MONTH_NAMES = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Helper: check if WHATSAPP_NUMBER is still the placeholder
  const isPlaceholderNumber = (num) => {
    return !num || num.includes("X") || num.includes("x") || !/^\d{10,15}$/.test(num.trim());
  };

  // Helper: format YYYY-MM-DD date object
  const toISODateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Helper: format YYYY-MM-DD to "12 Dec 2026"
  const formatStayDate = (isoStr) => {
    if (!isoStr) return "";
    const parts = isoStr.split("-");
    if (parts.length !== 3) return isoStr;
    const year = parts[0];
    const monthIdx = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const monthName = MONTH_NAMES[monthIdx] || "";
    return `${day} ${monthName} ${year}`;
  };

  // Synchronize all WhatsApp links on the page with WHATSAPP_NUMBER
  const isPlaceholder = isPlaceholderNumber(WHATSAPP_NUMBER);
  const waLinks = document.querySelectorAll('a[href*="wa.me/"]');

  waLinks.forEach((link) => {
    if (isPlaceholder) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const ownerAlert = document.getElementById("form-owner-alert");
        if (ownerAlert) {
          ownerAlert.textContent = "Owner: add the WhatsApp number in js/main.js";
          ownerAlert.style.display = "block";
          ownerAlert.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        showToast("Owner: add the WhatsApp number in js/main.js");
      });
    } else {
      const currentHref = link.getAttribute("href");
      link.setAttribute("href", currentHref.replace(/wa\.me\/\w+/, `wa.me/${WHATSAPP_NUMBER}`));
    }
  });

  // Form Handling
  const enquiryForm = document.getElementById("enquiry-form");
  if (enquiryForm) {
    const ownerAlert = document.getElementById("form-owner-alert");
    const nameInput = document.getElementById("guest-name");
    const phoneInput = document.getElementById("guest-phone");
    const roomGroup = enquiryForm.querySelector(".room-selection-group");
    const roomCheckboxes = Array.from(enquiryForm.querySelectorAll('.room-checkbox[name="rooms"]'));
    const roomNotSure = document.getElementById("room-not-sure");
    const specificRoomCheckboxes = roomCheckboxes.filter((cb) => cb !== roomNotSure);
    const roomSummaryEl = document.getElementById("room-live-summary");
    const roomErrorEl = document.getElementById("room-selection-error");
    const checkInInput = document.getElementById("check-in-date");
    const checkOutInput = document.getElementById("check-out-date");
    const guestsInput = document.getElementById("num-guests");
    const messageInput = document.getElementById("guest-message");
    const submitBtn = document.getElementById("enquiry-submit-btn");
    const confirmationEl = document.getElementById("form-confirmation");

    const ROOM_NAMES = {
      "101": "Room 101 (Three Bed)",
      "102": "Room 102 (Four Bed)",
      "103": "Room 103 (Double Bed)",
      "104": "Room 104 (Double Bed)"
    };

    // Live room selection state and mutual exclusion
    const updateRoomSelectionState = () => {
      roomCheckboxes.forEach((cb) => {
        const label = cb.closest(".room-checkbox-label");
        if (label) {
          label.classList.toggle("is-selected", cb.checked);
        }
      });

      const checkedRooms = specificRoomCheckboxes
        .filter((cb) => cb.checked)
        .sort((a, b) => Number(a.value) - Number(b.value));

      if (roomNotSure && roomNotSure.checked) {
        if (roomSummaryEl) roomSummaryEl.textContent = "Not sure, please suggest";
      } else if (checkedRooms.length > 0) {
        const roomNumbers = checkedRooms.map((cb) => cb.value).join(", ");
        if (roomSummaryEl) {
          roomSummaryEl.textContent =
            checkedRooms.length === 1
              ? `1 room selected: ${roomNumbers}`
              : `${checkedRooms.length} rooms selected: ${roomNumbers}`;
        }
      } else {
        if (roomSummaryEl) roomSummaryEl.textContent = "";
      }

      const hasSelection = (roomNotSure && roomNotSure.checked) || checkedRooms.length > 0;
      if (hasSelection) {
        if (roomErrorEl) roomErrorEl.textContent = "";
        if (roomGroup) roomGroup.classList.remove("is-invalid");
      }
    };

    if (roomNotSure) {
      roomNotSure.addEventListener("change", () => {
        if (roomNotSure.checked) {
          specificRoomCheckboxes.forEach((cb) => {
            cb.checked = false;
          });
        }
        updateRoomSelectionState();
      });
    }

    specificRoomCheckboxes.forEach((cb) => {
      cb.addEventListener("change", () => {
        if (cb.checked && roomNotSure) {
          roomNotSure.checked = false;
        }
        updateRoomSelectionState();
      });
    });

    roomCheckboxes.forEach((cb) => {
      const label = cb.closest(".room-checkbox-label");
      if (label) {
        cb.addEventListener("focus", () => label.classList.add("has-focus"));
        cb.addEventListener("blur", () => label.classList.remove("has-focus"));
      }
    });

    // Show warning banner initially if WHATSAPP_NUMBER is still the placeholder
    if (isPlaceholder && ownerAlert) {
      ownerAlert.textContent = "Owner: add the WhatsApp number in js/main.js";
      ownerAlert.style.display = "block";
    }

    // Set minimum date restrictions (Check-in cannot be in the past)
    const today = new Date();
    const todayStr = toISODateString(today);
    if (checkInInput) {
      checkInInput.min = todayStr;
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (checkOutInput) {
      checkOutInput.min = toISODateString(tomorrow);
    }

    // Dynamic check-out date update when check-in changes
    if (checkInInput && checkOutInput) {
      checkInInput.addEventListener("change", () => {
        if (checkInInput.value) {
          const [y, m, d] = checkInInput.value.split("-").map(Number);
          const nextDay = new Date(y, m - 1, d + 1);
          const minCheckOut = toISODateString(nextDay);
          checkOutInput.min = minCheckOut;
          if (checkOutInput.value && checkOutInput.value <= checkInInput.value) {
            checkOutInput.value = minCheckOut;
          }
        }
      });
    }

    // Helper: set or clear field error
    const setFieldError = (inputEl, errorId, errorMsg) => {
      const errorEl = document.getElementById(errorId);
      if (!inputEl) return;
      if (errorMsg) {
        inputEl.classList.add("is-invalid");
        inputEl.setAttribute("aria-invalid", "true");
        if (errorEl) errorEl.textContent = errorMsg;
      } else {
        inputEl.classList.remove("is-invalid");
        inputEl.removeAttribute("aria-invalid");
        if (errorEl) errorEl.textContent = "";
      }
    };

    // Clear individual field errors on user interaction
    const inputFieldPairs = [
      { el: nameInput, errorId: "guest-name-error" },
      { el: phoneInput, errorId: "guest-phone-error" },
      { el: checkInInput, errorId: "check-in-date-error" },
      { el: checkOutInput, errorId: "check-out-date-error" },
      { el: guestsInput, errorId: "num-guests-error" },
      { el: messageInput, errorId: "guest-message-error" }
    ];

    inputFieldPairs.forEach(({ el, errorId }) => {
      if (el) {
        el.addEventListener("input", () => setFieldError(el, errorId, ""));
        el.addEventListener("change", () => setFieldError(el, errorId, ""));
      }
    });

    // Form submit listener
    enquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let hasError = false;
      let firstInvalidEl = null;

      const markInvalid = (el, errorId, msg) => {
        setFieldError(el, errorId, msg);
        if (!firstInvalidEl && el) {
          firstInvalidEl = el;
        }
        hasError = true;
      };

      // 1. Name validation
      const nameVal = nameInput ? nameInput.value.trim() : "";
      if (!nameVal) {
        markInvalid(nameInput, "guest-name-error", "Please enter your name.");
      } else {
        setFieldError(nameInput, "guest-name-error", "");
      }

      // 2. Phone validation (basic check for 10 digits)
      const phoneVal = phoneInput ? phoneInput.value.trim() : "";
      const phoneDigits = phoneVal.replace(/\D/g, "");
      if (!phoneVal) {
        markInvalid(phoneInput, "guest-phone-error", "Please enter your phone number.");
      } else if (phoneDigits.length < 10) {
        markInvalid(phoneInput, "guest-phone-error", "Please enter a valid phone number (at least 10 digits).");
      } else {
        setFieldError(phoneInput, "guest-phone-error", "");
      }

      // 3. Room selection validation (at least one room or "Not sure")
      const checkedRooms = specificRoomCheckboxes
        .filter((cb) => cb.checked)
        .sort((a, b) => Number(a.value) - Number(b.value));
      const isNotSure = roomNotSure ? roomNotSure.checked : false;

      let roomsVal = "";
      if (isNotSure) {
        roomsVal = "Not sure, please suggest";
        if (roomErrorEl) roomErrorEl.textContent = "";
        if (roomGroup) roomGroup.classList.remove("is-invalid");
      } else if (checkedRooms.length > 0) {
        roomsVal = checkedRooms.map((cb) => ROOM_NAMES[cb.value] || `Room ${cb.value}`).join(", ");
        if (roomErrorEl) roomErrorEl.textContent = "";
        if (roomGroup) roomGroup.classList.remove("is-invalid");
      } else {
        if (roomErrorEl) {
          roomErrorEl.textContent = "Please choose at least one room, or tick Not sure.";
        }
        if (roomGroup) {
          roomGroup.classList.add("is-invalid");
        }
        if (!firstInvalidEl && roomCheckboxes.length > 0) {
          firstInvalidEl = roomCheckboxes[0];
        }
        hasError = true;
      }

      // 4. Check-in date validation
      const checkInVal = checkInInput ? checkInInput.value : "";
      if (!checkInVal) {
        markInvalid(checkInInput, "check-in-date-error", "Please select a check-in date.");
      } else if (checkInVal < todayStr) {
        markInvalid(checkInInput, "check-in-date-error", "Check-in date cannot be in the past.");
      } else {
        setFieldError(checkInInput, "check-in-date-error", "");
      }

      // 5. Check-out date validation (must be after check-in)
      const checkOutVal = checkOutInput ? checkOutInput.value : "";
      if (!checkOutVal) {
        markInvalid(checkOutInput, "check-out-date-error", "Please select a check-out date.");
      } else if (checkInVal && checkOutVal <= checkInVal) {
        markInvalid(checkOutInput, "check-out-date-error", "Check-out date must be after check-in date.");
      } else {
        setFieldError(checkOutInput, "check-out-date-error", "");
      }

      // 6. Number of guests validation (whole number of at least 1)
      const guestsVal = guestsInput ? guestsInput.value.trim() : "";
      const guestsNum = Number(guestsVal);
      if (!guestsVal || isNaN(guestsNum) || !Number.isInteger(guestsNum) || guestsNum < 1) {
        markInvalid(guestsInput, "num-guests-error", "Please enter a whole number of at least 1 guest.");
      } else {
        setFieldError(guestsInput, "num-guests-error", "");
      }

      // If any invalid fields, focus the first one and halt
      if (hasError) {
        if (firstInvalidEl) {
          firstInvalidEl.focus();
        }
        return;
      }

      // Check placeholder WhatsApp number
      if (isPlaceholderNumber(WHATSAPP_NUMBER)) {
        if (ownerAlert) {
          ownerAlert.textContent = "Owner: add the WhatsApp number in js/main.js";
          ownerAlert.style.display = "block";
          ownerAlert.focus();
        }
        showToast("Owner: add the WhatsApp number in js/main.js");
        return;
      } else if (ownerAlert) {
        ownerAlert.style.display = "none";
      }

      // Build message plain text with line breaks
      const messageVal = messageInput ? messageInput.value.trim() : "";
      const lines = [
        "Hello Premdhan Homestay, I would like to enquire about a stay.",
        "",
        `Name: ${nameVal}`,
        `Phone: ${phoneVal}`,
        `Rooms: ${roomsVal}`,
        `Check-in: ${formatStayDate(checkInVal)}`,
        `Check-out: ${formatStayDate(checkOutVal)}`,
        `Guests: ${guestsVal}`
      ];

      if (messageVal.length > 0) {
        lines.push(`Message: ${messageVal}`);
      }

      lines.push("");
      lines.push("Please let me know availability and the rates. Thank you.");

      const fullMessage = lines.join("\n");
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;

      // Disable button briefly to prevent double opening
      if (submitBtn) {
        submitBtn.disabled = true;
        setTimeout(() => {
          submitBtn.disabled = false;
        }, 3000);
      }

      // Open WhatsApp: phones navigate in same tab, desktop in a new tab with rel="noopener"
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (window.matchMedia && window.matchMedia("(max-width: 768px)").matches);

      if (isMobileDevice) {
        window.location.href = whatsappUrl;
      } else {
        const link = document.createElement("a");
        link.href = whatsappUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      // Confirmation message with fallback link under button (entries preserved)
      if (confirmationEl) {
        confirmationEl.innerHTML = `WhatsApp should be opening. If it did not open, <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">tap here</a>`;
        confirmationEl.classList.add("show");
      }
    });
  }
});

