/**
 * ====================================================================
 * A SPECIAL BIRTHDAY SURPRISE FOR GEETU ❤️
 * Celebration & Birthday Cake Engine (js/celebration.js)
 * ====================================================================
 * Candle-blowing interactions, smoke puffs, multi-stage confetti explosions,
 * canvas fireworks simulator, and helium balloon generator.
 */

(function () {
  'use strict';

  class BirthdayCelebrationManager {
    constructor() {
      this.cakeConfig = window.SURPRISE_CONFIG?.cake || {};
      this.celebrationConfig = window.SURPRISE_CONFIG?.celebration || {};

      this.isCandlesBlown = false;

      // DOM Elements
      this.makeWishBtn = null;
      this.candles = [];
      this.flames = [];
      this.wishStatusBanner = null;
      this.fireworksCanvas = null;
      this.fireworksCtx = null;
      this.balloonsContainer = null;

      // Fireworks state
      this.fireworkRockets = [];
      this.fireworkSparks = [];
      this.isFireworksActive = false;
      this.fireworksTimer = null;

      this.init();
    }

    init() {
      document.addEventListener("DOMContentLoaded", () => {
        this.cacheDOM();
        this.initBalloons();
        this.bindEvents();
      });
    }

    cacheDOM() {
      this.makeWishBtn = document.getElementById("make-wish-btn");
      this.candles = Array.from(document.querySelectorAll(".candle"));
      this.flames = Array.from(document.querySelectorAll(".flame"));
      this.wishStatusBanner = document.getElementById("wish-status-banner");
      this.fireworksCanvas = document.getElementById("fireworks-canvas");
      this.balloonsContainer = document.getElementById("balloons-container");

      if (this.fireworksCanvas) {
        this.fireworksCtx = this.fireworksCanvas.getContext("2d");
        this.resizeFireworks();
        window.addEventListener("resize", () => this.resizeFireworks());
      }
    }

    resizeFireworks() {
      if (!this.fireworksCanvas) return;
      this.fireworksCanvas.width = window.innerWidth;
      this.fireworksCanvas.height = window.innerHeight;
    }

    bindEvents() {
      if (this.makeWishBtn) {
        this.makeWishBtn.addEventListener("click", () => this.blowCandlesAndCelebrate());
      }
    }

    blowCandlesAndCelebrate() {
      if (this.isCandlesBlown) return;
      this.isCandlesBlown = true;

      // 1. Play blowing audio chime
      this.playWishSound();

      // 2. Extinguish candle flames with animation
      this.flames.forEach((flame, index) => {
        setTimeout(() => {
          flame.classList.add("blown-out");
        }, index * 120);
      });

      // 3. Update button state
      if (this.makeWishBtn) {
        this.makeWishBtn.innerHTML = '<i class="fa-solid fa-check"></i> Wish Made! ✨';
        this.makeWishBtn.style.opacity = "0.75";
        this.makeWishBtn.style.pointerEvents = "none";
      }

      // 4. Show wish confirmation banner
      if (this.wishStatusBanner) {
        this.wishStatusBanner.textContent =
          this.cakeConfig.blownMessage || "Your wish has been whispered to the universe! ✨";
        this.wishStatusBanner.classList.add("visible");
      }

      // 5. Fire spectacular confetti
      this.triggerConfettiBlast();

      // 6. Launch fireworks
      this.startFireworks();

      // 7. Smoothly scroll down to Celebration Section after 2 seconds
      setTimeout(() => {
        const celebrationSection = document.getElementById("celebration");
        if (celebrationSection) {
          celebrationSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 2200);
    }

    playWishSound() {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Synthesize gentle celestial chime
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.001, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 1.2);
      });
    }

    triggerConfettiBlast() {
      if (typeof confetti === "function") {
        // Multi-stage confetti fireworks
        const count = 200;
        const defaults = {
          origin: { y: 0.7 },
          colors: ["#F4A6B8", "#FFE4EC", "#D8A0A8", "#FFF8F0", "#A78BFA", "#FFD700"],
        };

        function fire(particleRatio, opts) {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
          });
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });

        // Continuous celebratory bursts
        setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ["#F4A6B8", "#FFF8F0", "#FFD700"],
          });
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ["#A78BFA", "#FFE4EC", "#F4A6B8"],
          });
        }, 600);
      }
    }

    startFireworks() {
      if (!this.fireworksCanvas) return;
      this.isFireworksActive = true;
      this.fireworksCanvas.classList.add("active");

      // Launch bursts periodically
      this.fireworksTimer = setInterval(() => {
        if (!this.isFireworksActive) return;
        const x = Math.random() * (this.fireworksCanvas.width - 200) + 100;
        const y = Math.random() * (this.fireworksCanvas.height * 0.5) + 80;
        this.createFireworkBurst(x, y);
      }, 700);

      this.animateFireworks();

      // Automatically calm down fireworks after 20 seconds
      setTimeout(() => {
        if (this.fireworksTimer) clearInterval(this.fireworksTimer);
        this.fireworksTimer = null;
      }, 20000);
    }

    createFireworkBurst(x, y) {
      const colors = ["#F4A6B8", "#FFD700", "#FFF8F0", "#A78BFA", "#FF85A2", "#67E8F9"];
      const burstColor = colors[Math.floor(Math.random() * colors.length)];
      const sparkCount = 48;

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount;
        const speed = Math.random() * 4.5 + 2;
        this.fireworkSparks.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: burstColor,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
          radius: Math.random() * 2.5 + 1.5,
        });
      }
    }

    animateFireworks() {
      if (!this.isFireworksActive && this.fireworkSparks.length === 0) return;

      this.fireworksCtx.clearRect(0, 0, this.fireworksCanvas.width, this.fireworksCanvas.height);

      for (let i = this.fireworkSparks.length - 1; i >= 0; i--) {
        const s = this.fireworkSparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.05; // gravity
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          this.fireworkSparks.splice(i, 1);
          continue;
        }

        this.fireworksCtx.save();
        this.fireworksCtx.beginPath();
        this.fireworksCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        this.fireworksCtx.fillStyle = s.color;
        this.fireworksCtx.globalAlpha = Math.max(0, s.alpha);
        this.fireworksCtx.shadowColor = s.color;
        this.fireworksCtx.shadowBlur = 10;
        this.fireworksCtx.fill();
        this.fireworksCtx.restore();
      }

      requestAnimationFrame(() => this.animateFireworks());
    }

    initBalloons() {
      if (!this.balloonsContainer) return;

      const balloonColors = [
        "radial-gradient(circle at 35% 35%, #FFB6C1, #C2185B)",
        "radial-gradient(circle at 35% 35%, #FDE047, #CA8A04)",
        "radial-gradient(circle at 35% 35%, #C4B5FD, #7C3AED)",
        "radial-gradient(circle at 35% 35%, #FDA4AF, #E11D48)",
        "radial-gradient(circle at 35% 35%, #FFF1F2, #FB7185)",
      ];

      for (let i = 0; i < 15; i++) {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.left = `${Math.random() * 95}%`;
        balloon.style.background = balloonColors[i % balloonColors.length];
        balloon.style.animationDuration = `${Math.random() * 8 + 9}s`;
        balloon.style.animationDelay = `${Math.random() * 6}s`;
        this.balloonsContainer.appendChild(balloon);
      }
    }

    reset() {
      this.isCandlesBlown = false;
      this.flames.forEach((flame) => flame.classList.remove("blown-out"));
      if (this.makeWishBtn) {
        this.makeWishBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Make a Wish ✨';
        this.makeWishBtn.style.opacity = "1";
        this.makeWishBtn.style.pointerEvents = "auto";
      }
      if (this.wishStatusBanner) {
        this.wishStatusBanner.classList.remove("visible");
      }
    }
  }

  window.CelebrationManager = new BirthdayCelebrationManager();
})();

