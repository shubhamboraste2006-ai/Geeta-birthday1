/**
 * ====================================================================
 * A SPECIAL BIRTHDAY SURPRISE FOR GEETU ❤️
 * Animation Engine (js/animations.js)
 * ====================================================================
 * Floating rose petals, sparkling stars, glowing hearts particle canvas,
 * and GSAP scroll-triggered romantic transitions.
 */

(function () {
  'use strict';

  class ParticleCanvasManager {
    constructor() {
      this.canvas = document.getElementById("petals-canvas");
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext("2d");
      this.particles = [];
      this.maxPetals = 45;
      this.maxHearts = 18;
      this.maxStars = 60;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.animationFrameId = null;

      this.init();
    }

    init() {
      this.resize();
      window.addEventListener("resize", () => this.resize());
      this.createParticles();
      this.animate();
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }

    createParticles() {
      this.particles = [];

      // 1. Rose Petals (falling down)
      for (let i = 0; i < this.maxPetals; i++) {
        this.particles.push({
          type: "petal",
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 12 + 10,
          speedY: Math.random() * 1.2 + 0.8,
          speedX: Math.random() * 0.8 - 0.4,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.03,
          swing: Math.random() * Math.PI * 2,
          swingSpeed: Math.random() * 0.03 + 0.01,
          opacity: Math.random() * 0.55 + 0.35,
          color: Math.random() > 0.4 ? "#F4A6B8" : "#E87A90",
        });
      }

      // 2. Glowing Hearts (gently floating up)
      for (let i = 0; i < this.maxHearts; i++) {
        this.particles.push({
          type: "heart",
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 16 + 12,
          speedY: -(Math.random() * 0.7 + 0.3),
          speedX: Math.random() * 0.4 - 0.2,
          opacity: Math.random() * 0.4 + 0.25,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.04 + 0.02,
        });
      }

      // 3. Twinkling Stars
      for (let i = 0; i < this.maxStars; i++) {
        this.particles.push({
          type: "star",
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2.2 + 0.8,
          opacity: Math.random() * 0.7 + 0.2,
          twinkleSpeed: Math.random() * 0.04 + 0.015,
          twinkleVal: Math.random() * Math.PI * 2,
        });
      }
    }

    drawHeart(ctx, x, y, size, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      // Top left curve
      ctx.bezierCurveTo(
        -size / 2,
        -size / 2,
        -size,
        topCurveHeight / 3,
        0,
        size
      );
      // Top right curve
      ctx.bezierCurveTo(
        size,
        topCurveHeight / 3,
        size / 2,
        -size / 2,
        0,
        topCurveHeight
      );
      ctx.closePath();
      ctx.fillStyle = `rgba(244, 166, 184, ${opacity})`;
      ctx.shadowColor = "rgba(244, 166, 184, 0.8)";
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();
    }

    drawPetal(ctx, p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(Math.sin(p.swing), 1); // 3D flip effect

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size / 2, p.size / 2, 0, p.size);
      ctx.bezierCurveTo(p.size / 2, p.size / 2, p.size / 2, -p.size / 2, 0, 0);
      ctx.closePath();

      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.shadowColor = "rgba(244, 166, 184, 0.4)";
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    }

    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        if (p.type === "petal") {
          p.y += p.speedY;
          p.x += Math.sin(p.swing) * 0.7 + p.speedX;
          p.rotation += p.rotationSpeed;
          p.swing += p.swingSpeed;

          // Recycle petal
          if (p.y > this.height + 30) {
            p.y = -20;
            p.x = Math.random() * this.width;
          }
          if (p.x < -20) p.x = this.width + 20;
          if (p.x > this.width + 20) p.x = -20;

          this.drawPetal(this.ctx, p);
        } else if (p.type === "heart") {
          p.y += p.speedY;
          p.x += p.speedX;
          p.pulse += p.pulseSpeed;
          const currentSize = p.size * (1 + Math.sin(p.pulse) * 0.15);

          // Recycle heart
          if (p.y < -30) {
            p.y = this.height + 20;
            p.x = Math.random() * this.width;
          }

          this.drawHeart(this.ctx, p.x, p.y, currentSize, p.opacity);
        } else if (p.type === "star") {
          p.twinkleVal += p.twinkleSpeed;
          const currentOpacity = p.opacity * (0.4 + 0.6 * Math.sin(p.twinkleVal));

          this.ctx.save();
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(255, 248, 240, ${Math.max(0, currentOpacity)})`;
          this.ctx.shadowColor = "#FFF8F0";
          this.ctx.shadowBlur = 8;
          this.ctx.fill();
          this.ctx.restore();
        }
      }

      this.animationFrameId = requestAnimationFrame(() => this.animate());
    }
  }

  // Romantic GSAP Animations & ScrollTriggers
  function setupScrollAnimations() {
    if (typeof gsap === "undefined") {
      console.warn("GSAP library not detected. Running standard fallback animations.");
      return;
    }

    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // 1. Hero Content Entrance
    gsap.from(".hero-content", {
      opacity: 0,
      scale: 0.9,
      duration: 1.4,
      ease: "power3.out",
      delay: 0.2,
    });

    gsap.from(".hero-heart-badge", {
      scale: 0,
      rotation: -30,
      duration: 1.2,
      ease: "elastic.out(1, 0.5)",
      delay: 0.5,
    });

    // 2. Nickname Section Scroll Trigger
    if (document.querySelector("#nickname")) {
      gsap.from("#nickname .nickname-card", {
        scrollTrigger: {
          trigger: "#nickname",
          start: "top 75%",
        },
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".heart-path", {
        scrollTrigger: {
          trigger: "#nickname",
          start: "top 65%",
        },
        strokeDashoffset: 1000,
        duration: 2.8,
        ease: "power2.inOut",
      });
    }

    // 3. Timeline Items Staggered Reveal
    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item, idx) => {
      const isEven = idx % 2 === 1;
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
        },
        opacity: 0,
        x: isEven ? 60 : -60,
        duration: 1,
        ease: "power3.out",
      });
    });

    // 4. Gallery Polaroid Cards Staggered Reveal
    gsap.from(".polaroid-card", {
      scrollTrigger: {
        trigger: "#gallery",
        start: "top 70%",
      },
      opacity: 0,
      y: 50,
      stagger: 0.12,
      duration: 1,
      ease: "power2.out",
    });

    // 5. Envelope Entrance
    gsap.from(".envelope-container", {
      scrollTrigger: {
        trigger: "#letter",
        start: "top 70%",
      },
      opacity: 0,
      scale: 0.85,
      y: 40,
      duration: 1.1,
      ease: "back.out(1.4)",
    });

    // 6. Cake Section Entrance
    gsap.from(".cake-wrapper", {
      scrollTrigger: {
        trigger: "#cake",
        start: "top 70%",
      },
      opacity: 0,
      scale: 0.8,
      y: 50,
      duration: 1.2,
      ease: "elastic.out(1, 0.75)",
    });

    // 7. Blessings Cards Stagger
    gsap.from(".blessing-card", {
      scrollTrigger: {
        trigger: "#celebration",
        start: "top 70%",
      },
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.9,
      ease: "power2.out",
    });

    // 8. Final Screen Giant Heart
    gsap.from(".giant-heart-wrapper", {
      scrollTrigger: {
        trigger: "#final",
        start: "top 70%",
      },
      opacity: 0,
      scale: 0.3,
      duration: 1.4,
      ease: "elastic.out(1, 0.5)",
    });
  }

  // Initialize on load
  document.addEventListener("DOMContentLoaded", () => {
    window.ParticleManager = new ParticleCanvasManager();
    setTimeout(setupScrollAnimations, 200);
  });
})();

