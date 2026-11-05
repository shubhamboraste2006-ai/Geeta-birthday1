/**
 * ====================================================================
 * A SPECIAL BIRTHDAY SURPRISE FOR GEETU ❤️
 * Photo Gallery & Lightbox Engine (js/gallery.js)
 * ====================================================================
 * Renders animated Polaroid frames from config.js, handles missing images
 * gracefully, and provides a full-screen interactive lightbox.
 */

(function () {
  'use strict';

  class RomanticGallery {
    constructor() {
      this.config = window.SURPRISE_CONFIG?.gallery || {
        title: "Our Beautiful Memories",
        subtitle: "Frozen in time, treasured forever in my heart.",
        photos: [],
      };

      this.validPhotos = [];
      this.currentIndex = 0;

      // DOM Elements
      this.galleryGrid = null;
      this.lightboxModal = null;
      this.lightboxImg = null;
      this.lightboxCaption = null;
      this.lightboxCounter = null;
      this.lightboxCloseBtn = null;
      this.lightboxPrevBtn = null;
      this.lightboxNextBtn = null;

      // Touch swipe tracking
      this.touchStartX = 0;
      this.touchEndX = 0;

      this.init();
    }

    init() {
      document.addEventListener("DOMContentLoaded", () => {
        this.cacheDOM();
        this.renderGallery();
        this.bindEvents();
      });
    }

    cacheDOM() {
      this.galleryGrid = document.getElementById("gallery-grid");
      this.lightboxModal = document.getElementById("lightbox-modal");
      this.lightboxImg = document.getElementById("lightbox-img");
      this.lightboxCaption = document.getElementById("lightbox-caption");
      this.lightboxCounter = document.getElementById("lightbox-counter");
      this.lightboxCloseBtn = document.getElementById("lightbox-close");
      this.lightboxPrevBtn = document.getElementById("lightbox-prev");
      this.lightboxNextBtn = document.getElementById("lightbox-next");
    }

    renderGallery() {
      if (!this.galleryGrid) return;
      this.galleryGrid.innerHTML = "";

      const photos = this.config.photos || [];
      if (photos.length === 0) {
        this.galleryGrid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
            <p>Add your special photographs in config.js</p>
          </div>
        `;
        return;
      }

      photos.forEach((photo, index) => {
        const tilt = photo.tilt || (index % 2 === 0 ? -3 : 3);
        const orientationClass = photo.orientation === "portrait" ? "portrait" : "landscape";

        const card = document.createElement("div");
        card.className = `polaroid-card ${orientationClass}`;
        card.style.transform = `rotate(${tilt}deg)`;
        card.setAttribute("data-index", index);

        // Preload image test for graceful fallback
        const testImg = new Image();
        testImg.src = photo.url;

        testImg.onload = () => {
          this.validPhotos.push({ ...photo, originalIndex: index });
        };

        card.innerHTML = `
          <div class="polaroid-image-wrapper">
            <img 
              src="${photo.url}" 
              alt="${photo.alt || 'Romantic Memory'}" 
              class="polaroid-img"
              loading="lazy"
            />
            <div class="polaroid-overlay">
              <div class="polaroid-zoom-icon">
                <i class="fa-solid fa-expand"></i>
              </div>
            </div>
          </div>
          <div class="polaroid-caption">${photo.caption || 'A beautiful moment ❤️'}</div>
          <div class="polaroid-date">Memory ${index + 1}</div>
        `;

        // Graceful error fallback: if photo fails to load, show warm aesthetic card instead of broken image
        const imgEl = card.querySelector(".polaroid-img");
        imgEl.onerror = () => {
          console.info(`Photo at ${photo.url} not found. Displaying romantic memory card.`);
          const wrapper = card.querySelector(".polaroid-image-wrapper");
          if (wrapper) {
            wrapper.innerHTML = `
              <div class="gallery-placeholder">
                <i class="fa-solid fa-heart"></i>
                <p>Cherished Memory</p>
              </div>
            `;
          }
        };

        // Click to open lightbox
        card.addEventListener("click", () => {
          this.openLightbox(index);
        });

        this.galleryGrid.appendChild(card);
      });
    }

    bindEvents() {
      if (this.lightboxCloseBtn) {
        this.lightboxCloseBtn.addEventListener("click", () => this.closeLightbox());
      }

      if (this.lightboxPrevBtn) {
        this.lightboxPrevBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.navigate(-1);
        });
      }

      if (this.lightboxNextBtn) {
        this.lightboxNextBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.navigate(1);
        });
      }

      // Close when clicking outside dialog
      if (this.lightboxModal) {
        this.lightboxModal.addEventListener("click", (e) => {
          if (e.target === this.lightboxModal) {
            this.closeLightbox();
          }
        });

        // Touch swipe handling
        this.lightboxModal.addEventListener("touchstart", (e) => {
          this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.lightboxModal.addEventListener("touchend", (e) => {
          this.touchEndX = e.changedTouches[0].screenX;
          this.handleSwipe();
        }, { passive: true });
      }

      // Keyboard Controls
      document.addEventListener("keydown", (e) => {
        if (!this.lightboxModal || !this.lightboxModal.classList.contains("active")) return;

        if (e.key === "Escape") {
          this.closeLightbox();
        } else if (e.key === "ArrowLeft") {
          this.navigate(-1);
        } else if (e.key === "ArrowRight") {
          this.navigate(1);
        }
      });
    }

    handleSwipe() {
      const threshold = 50;
      if (this.touchEndX < this.touchStartX - threshold) {
        // Swiped Left -> Next
        this.navigate(1);
      } else if (this.touchEndX > this.touchStartX + threshold) {
        // Swiped Right -> Prev
        this.navigate(-1);
      }
    }

    openLightbox(index) {
      const photos = this.config.photos || [];
      if (!photos[index]) return;

      this.currentIndex = index;
      this.updateLightboxContent();

      if (this.lightboxModal) {
        this.lightboxModal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent page scroll
      }
    }

    closeLightbox() {
      if (this.lightboxModal) {
        this.lightboxModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    }

    navigate(direction) {
      const photos = this.config.photos || [];
      if (photos.length === 0) return;

      this.currentIndex = (this.currentIndex + direction + photos.length) % photos.length;
      this.updateLightboxContent();
    }

    updateLightboxContent() {
      const photos = this.config.photos || [];
      const photo = photos[this.currentIndex];
      if (!photo) return;

      if (this.lightboxImg) {
        this.lightboxImg.style.opacity = "0";
        this.lightboxImg.src = photo.url;
        this.lightboxImg.alt = photo.alt || "Geetu Memory";

        this.lightboxImg.onload = () => {
          this.lightboxImg.style.opacity = "1";
        };
      }

      if (this.lightboxCaption) {
        this.lightboxCaption.textContent = photo.caption || "A beautiful moment ❤️";
      }

      if (this.lightboxCounter) {
        this.lightboxCounter.textContent = `Memory ${this.currentIndex + 1} of ${photos.length}`;
      }
    }
  }

  window.RomanticGallery = new RomanticGallery();
})();

