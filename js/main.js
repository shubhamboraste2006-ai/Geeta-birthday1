/**
 * ====================================================================
 * A SPECIAL BIRTHDAY SURPRISE FOR GEETU ❤️
 * Main Coordinator (js/main.js)
 * ====================================================================
 * Populates content from config.js, manages opening transitions,
 * envelope opening interaction, typewriter effects, and reset.
 */

(function () {
  'use strict';

  class BirthdayApp {
    constructor() {
      this.cfg = window.SURPRISE_CONFIG || {};
      this.init();
    }

    init() {
      document.addEventListener("DOMContentLoaded", () => {
        this.populateContentFromConfig();
        this.initTypewriter();
        this.bindEvents();
      });
    }

    populateContentFromConfig() {
      const cfg = this.cfg;
      const recipient = cfg.recipient || {};

      // 1. Hero Section
      const heroGreeting = document.getElementById("hero-greeting");
      if (heroGreeting && cfg.hero?.greeting) {
        heroGreeting.textContent = cfg.hero.greeting;
      }

      const openSurpriseBtn = document.getElementById("open-surprise-btn");
      if (openSurpriseBtn && cfg.hero?.buttonText) {
        openSurpriseBtn.innerHTML = `<span>${cfg.hero.buttonText}</span><i class="fa-solid fa-arrow-down btn-icon"></i>`;
      }

      // 2. Nickname Section
      const nicknameQuestion = document.getElementById("nickname-question");
      if (nicknameQuestion && cfg.nicknameSection?.question) {
        nicknameQuestion.textContent = cfg.nicknameSection.question;
      }

      const nicknameText = document.getElementById("nickname-text");
      if (nicknameText && (cfg.nicknameSection?.reveal || recipient.nickname)) {
        nicknameText.textContent = cfg.nicknameSection?.reveal || recipient.nickname;
      }

      const nicknameSubtext = document.getElementById("nickname-subtext");
      if (nicknameSubtext && cfg.nicknameSection?.subtext) {
        nicknameSubtext.textContent = cfg.nicknameSection.subtext;
      }

      // 3. Timeline Section
      this.populateTimeline();

      // 4. Letter Section
      this.populateLetter();

      // 5. Cake Section
      const cakeHeading = document.getElementById("cake-heading");
      if (cakeHeading && cfg.cake?.heading) {
        cakeHeading.textContent = cfg.cake.heading;
      }
      const cakeSubtitle = document.getElementById("cake-subtitle");
      if (cakeSubtitle && cfg.cake?.subtitle) {
        cakeSubtitle.textContent = cfg.cake.subtitle;
      }

      // 6. Celebration Section
      const celebHeadline = document.getElementById("celebration-headline");
      if (celebHeadline && cfg.celebration?.headline) {
        celebHeadline.textContent = cfg.celebration.headline;
      }
      const celebMessage = document.getElementById("celebration-message");
      if (celebMessage && cfg.celebration?.message) {
        celebMessage.textContent = cfg.celebration.message;
      }
      this.populateBlessings();

      // 7. Final Screen
      const finalNickname = document.getElementById("final-nickname");
      if (finalNickname && (cfg.final?.nickname || recipient.nickname)) {
        finalNickname.textContent = cfg.final?.nickname || recipient.nickname;
      }
      const finalMessage = document.getElementById("final-message");
      if (finalMessage && cfg.final?.message) {
        finalMessage.textContent = cfg.final.message;
      }
    }

    populateTimeline() {
      const timelineWrapper = document.getElementById("timeline-wrapper");
      if (!timelineWrapper) return;

      const items = this.cfg.timeline?.items || [];
      timelineWrapper.innerHTML = '<div class="timeline-stem"></div>';

      items.forEach((item, index) => {
        const itemEl = document.createElement("div");
        itemEl.className = "timeline-item";

        itemEl.innerHTML = `
          <div class="timeline-node">
            <i class="fa-solid ${item.icon || 'fa-heart'}"></i>
          </div>
          <div class="timeline-card">
            <div class="timeline-step">Moment ${item.step || index + 1}</div>
            <div class="timeline-tag">${item.tag || 'Special Memory'}</div>
            <div class="timeline-quote">"${item.message}"</div>
          </div>
        `;
        timelineWrapper.appendChild(itemEl);
      });
    }

    populateLetter() {
      const letter = this.cfg.letter || {};
      const salutationEl = document.getElementById("letter-salutation");
      const bodyEl = document.getElementById("letter-body");
      const signoffEl = document.getElementById("letter-signoff");
      const senderEl = document.getElementById("letter-sender");

      if (salutationEl) {
        salutationEl.textContent = letter.salutation || "Dear Geetu,";
      }

      if (bodyEl && letter.paragraphs) {
        bodyEl.innerHTML = letter.paragraphs
          .map((p) => {
            if (p.includes("Puran Poli") || p.includes("Mazhi") || p.includes("Majhi")) {
              return `<p class="letter-highlight">${p}</p>`;
            }
            return `<p>${p}</p>`;
          })
          .join("");
      }

      if (signoffEl) {
        signoffEl.textContent = letter.signoff || "With lots of love ❤️";
      }
      if (senderEl) {
        senderEl.textContent = letter.sender || "Always Yours";
      }
    }

    populateBlessings() {
      const grid = document.getElementById("celebration-grid");
      if (!grid) return;

      const blessings = this.cfg.celebration?.blessings || [];
      grid.innerHTML = "";

      blessings.forEach((b) => {
        const card = document.createElement("div");
        card.className = "blessing-card";
        card.innerHTML = `
          <div class="blessing-icon">
            <i class="fa-solid ${b.icon}"></i>
          </div>
          <h3 class="blessing-title">${b.title}</h3>
          <p class="blessing-desc">${b.desc}</p>
        `;
        grid.appendChild(card);
      });
    }

    initTypewriter() {
      const typewriterEl = document.getElementById("hero-subtitle-text");
      if (!typewriterEl) return;

      const text = this.cfg.hero?.animatedSubtitle || "Someone has prepared a little surprise for you...";
      typewriterEl.textContent = "";

      let charIdx = 0;
      const typeSpeed = 50;

      const type = () => {
        if (charIdx < text.length) {
          typewriterEl.textContent += text.charAt(charIdx);
          charIdx++;
          setTimeout(type, typeSpeed);
        }
      };

      setTimeout(type, 800);
    }

    bindEvents() {
      // 1. Open Surprise Button
      const openSurpriseBtn = document.getElementById("open-surprise-btn");
      if (openSurpriseBtn) {
        openSurpriseBtn.addEventListener("click", () => {
          // Play background music
          if (window.MusicPlayer) {
            window.MusicPlayer.startPlayback();
          }

          // Confetti burst
          if (typeof confetti === "function") {
            confetti({
              particleCount: 60,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#F4A6B8", "#FFE4EC", "#D8A0A8"],
            });
          }

          // Smooth scroll to Nickname Section
          const nicknameSection = document.getElementById("nickname");
          if (nicknameSection) {
            nicknameSection.scrollIntoView({ behavior: "smooth" });
          }
        });
      }

      // 2. Interactive Envelope & Letter
      const envelope = document.getElementById("envelope-interactive");
      const letterModal = document.getElementById("letter-modal");
      const letterCloseBtn = document.getElementById("letter-close-btn");

      if (envelope) {
        envelope.addEventListener("click", () => {
          envelope.classList.add("opened");

          // Little pop confetti
          if (typeof confetti === "function") {
            confetti({
              particleCount: 35,
              spread: 50,
              origin: { y: 0.5 },
              colors: ["#F4A6B8", "#FFD700", "#FFF8F0"],
            });
          }

          // Reveal parchment letter modal after smooth flap delay
          setTimeout(() => {
            if (letterModal) {
              letterModal.classList.add("active");
              document.body.style.overflow = "hidden";
            }
          }, 800);
        });
      }

      if (letterCloseBtn) {
        letterCloseBtn.addEventListener("click", () => {
          if (letterModal) {
            letterModal.classList.remove("active");
            document.body.style.overflow = "";
          }
          if (envelope) {
            setTimeout(() => {
              envelope.classList.remove("opened");
            }, 300);
          }
        });
      }

      if (letterModal) {
        letterModal.addEventListener("click", (e) => {
          if (e.target === letterModal) {
            letterModal.classList.remove("active");
            document.body.style.overflow = "";
            if (envelope) {
              setTimeout(() => {
                envelope.classList.remove("opened");
              }, 300);
            }
          }
        });
      }

      // 3. Experience Again Restart Button
      const restartBtn = document.getElementById("restart-experience-btn");
      if (restartBtn) {
        restartBtn.addEventListener("click", () => {
          // Reset birthday cake candles
          if (window.CelebrationManager) {
            window.CelebrationManager.reset();
          }

          // Scroll back to top
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });

          // Retype subtitle
          setTimeout(() => {
            this.initTypewriter();
          }, 1000);
        });
      }
    }
  }

  window.BirthdayApp = new BirthdayApp();
})();

