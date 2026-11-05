/**
 * ====================================================================
 * A SPECIAL BIRTHDAY SURPRISE FOR GEETU ❤️
 * Music Player Engine (js/music.js)
 * ====================================================================
 * Handles audio playback, controls, volume fades, and includes a
 * romantic Web Audio API synthesizer fallback if audio file is missing.
 */

(function () {
  'use strict';

  class RomanticMusicController {
    constructor() {
      this.config = window.SURPRISE_CONFIG?.music || {
        title: "Romantic Melody for Geetu",
        src: "assets/music/romantic.mp3",
        defaultVolume: 0.65,
        enableSynthesizerFallback: true,
      };

      this.audio = new Audio();
      this.audio.src = this.config.src;
      this.audio.loop = true;
      this.audio.volume = this.config.defaultVolume;
      this.audio.preload = "auto";

      this.isPlaying = false;
      this.isMuted = false;
      this.usingSynth = false;

      // Web Audio Synth state
      this.audioCtx = null;
      this.synthInterval = null;
      this.masterGain = null;

      // DOM Elements
      this.playerEl = null;
      this.playPauseBtn = null;
      this.muteBtn = null;
      this.volumeSlider = null;
      this.trackTitleEl = null;
      this.statusTextEl = null;
      this.vinylDisk = null;

      this.init();
    }

    init() {
      document.addEventListener("DOMContentLoaded", () => {
        this.cacheDOM();
        this.bindEvents();
      });

      // Error handler on HTML5 audio: switch to synth if needed
      this.audio.addEventListener("error", () => {
        console.warn("Audio file could not be loaded directly. Initializing Web Audio romantic synth...");
        this.usingSynth = true;
      });
    }

    cacheDOM() {
      this.playerEl = document.getElementById("floating-music-player");
      this.playPauseBtn = document.getElementById("player-play-btn");
      this.muteBtn = document.getElementById("player-mute-btn");
      this.volumeSlider = document.getElementById("player-volume-slider");
      this.trackTitleEl = document.getElementById("player-track-title");
      this.statusTextEl = document.getElementById("player-status-text");
      this.vinylDisk = document.getElementById("player-vinyl-disk");

      if (this.trackTitleEl && this.config.title) {
        this.trackTitleEl.textContent = this.config.title;
      }
      if (this.volumeSlider) {
        this.volumeSlider.value = this.config.defaultVolume;
      }
    }

    bindEvents() {
      if (this.playPauseBtn) {
        this.playPauseBtn.addEventListener("click", () => this.togglePlay());
      }
      if (this.vinylDisk) {
        this.vinylDisk.addEventListener("click", () => this.togglePlay());
      }
      if (this.muteBtn) {
        this.muteBtn.addEventListener("click", () => this.toggleMute());
      }
      if (this.volumeSlider) {
        this.volumeSlider.addEventListener("input", (e) => {
          this.setVolume(parseFloat(e.target.value));
        });
      }
    }

    startPlayback() {
      if (this.isPlaying) return;

      // Ensure AudioContext is ready for browser autoplay policies
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.audioCtx = new AudioContext();
        }
      }
      if (this.audioCtx && this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }

      const playPromise = this.audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.updateUI();
          })
          .catch((err) => {
            console.warn("Audio element play error or block. Falling back to ambient Web Audio synth.", err);
            this.startWebAudioSynth();
          });
      } else {
        this.isPlaying = true;
        this.updateUI();
      }
    }

    togglePlay() {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.startPlayback();
      }
    }

    pause() {
      this.isPlaying = false;
      this.audio.pause();
      if (this.synthInterval) {
        clearInterval(this.synthInterval);
        this.synthInterval = null;
      }
      this.updateUI();
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      this.audio.muted = this.isMuted;
      if (this.masterGain && this.audioCtx) {
        this.masterGain.gain.setValueAtTime(
          this.isMuted ? 0 : (this.volumeSlider ? parseFloat(this.volumeSlider.value) : 0.6),
          this.audioCtx.currentTime
        );
      }
      this.updateUI();
    }

    setVolume(vol) {
      vol = Math.max(0, Math.min(1, vol));
      this.audio.volume = vol;
      if (this.masterGain && this.audioCtx && !this.isMuted) {
        this.masterGain.gain.setValueAtTime(vol * 0.35, this.audioCtx.currentTime);
      }
      if (vol === 0) {
        this.isMuted = true;
      } else if (this.isMuted) {
        this.isMuted = false;
        this.audio.muted = false;
      }
      this.updateUI();
    }

    updateUI() {
      if (!this.playerEl) return;

      if (this.isPlaying) {
        this.playerEl.classList.add("playing");
        if (this.playPauseBtn) {
          this.playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }
        if (this.statusTextEl) {
          this.statusTextEl.innerHTML = `
            <div class="soundwave-bars">
              <span></span><span></span><span></span><span></span>
            </div>
            Playing romantic melody
          `;
        }
      } else {
        this.playerEl.classList.remove("playing");
        if (this.playPauseBtn) {
          this.playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
        if (this.statusTextEl) {
          this.statusTextEl.innerHTML = `Paused`;
        }
      }

      if (this.muteBtn) {
        if (this.isMuted) {
          this.muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        } else {
          this.muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        }
      }
    }

    /**
     * Romantic Web Audio API Synthesizer Fallback
     * Generates a dreamy, gentle acoustic piano/celeste arpeggio with soft reverb.
     */
    startWebAudioSynth() {
      if (!this.config.enableSynthesizerFallback) return;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!this.audioCtx) {
        this.audioCtx = new AudioContext();
      }
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }

      this.masterGain = this.audioCtx.createGain();
      const vol = this.volumeSlider ? parseFloat(this.volumeSlider.value) : this.config.defaultVolume;
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : vol * 0.35, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);

      // Romantic Canon-style progression notes: C - G - Am - F - C - G - C
      const chords = [
        [261.63, 329.63, 392.00, 523.25], // Cmaj
        [196.00, 246.94, 293.66, 392.00], // Gmaj
        [220.00, 261.63, 329.63, 440.00], // Amin
        [174.61, 220.00, 261.63, 349.23], // Fmaj
      ];

      let chordIndex = 0;
      let noteIndex = 0;

      const playNote = (freq, duration = 1.6) => {
        if (!this.isPlaying || !this.audioCtx) return;
        const now = this.audioCtx.currentTime;

        const osc = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();

        // Warm blend of sine and triangle for music box / electric piano warmth
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        // Gentle envelope: instantaneous soft attack, exponential decay
        noteGain.gain.setValueAtTime(0.0001, now);
        noteGain.gain.linearRampToValueAtTime(0.4, now + 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + duration);
      };

      this.isPlaying = true;
      this.updateUI();

      if (this.synthInterval) clearInterval(this.synthInterval);
      this.synthInterval = setInterval(() => {
        if (!this.isPlaying) return;
        const currentChord = chords[chordIndex];
        playNote(currentChord[noteIndex], 2.2);

        noteIndex++;
        if (noteIndex >= currentChord.length) {
          noteIndex = 0;
          chordIndex = (chordIndex + 1) % chords.length;
        }
      }, 550);
    }
  }

  window.MusicPlayer = new RomanticMusicController();
})();

