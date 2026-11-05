# A Special Birthday Surprise for Geetu ❤️ (Mazhi Puran Poli)

A premium, romantic, emotional, and interactive birthday surprise website crafted with love for Geetu.

---

## ✨ Features & Experiences

1. **Cinematic Hero Introduction**
   - Fullscreen dark burgundy and rose gold starry background.
   - Falling rose petals, floating glowing hearts, and twinkling starry particles on interactive HTML5 Canvas.
   - Shimmering greeting: *"Hey Geetu ❤️"* with typewriter subtitle *"Someone has prepared a little surprise for you..."*.
   - Glowing *"Open Your Surprise 💌"* CTA that starts the romantic music and glides smoothly into the journey.

2. **Special Nickname Section**
   - Emotional reveal: *"Do you know what you'll always be?"*
   - Intricate SVG heart path that draws and pulses around the glowing nickname: **Mazhi Puran Poli ❤️**.
   - Subtext: *"Some names are special, and this one belongs only to you."*

3. **Our Beautiful Memories - Polaroid Photo Scrapbook Gallery**
   - 8 animated Polaroid frames with organic angles, washi tape accents, and realistic drop shadows.
   - Smooth 3D tilt and zoom hover effects.
   - Fullscreen interactive Lightbox with memory counter (*Memory 1 of 8*), previous/next buttons, touch swipe support for mobile, and keyboard shortcuts (Left Arrow, Right Arrow, ESC).
   - Graceful fallback: If an image is missing or not yet added, a romantic memory art card is displayed instead of a broken image.

4. **Our Story - Memory Timeline**
   - Vertical romantic timeline with a glowing rose gold central stem and illuminated heart nodes.
   - Glassmorphic milestone cards with smooth scroll-triggered reveal animations:
     - *"Every beautiful story has its own little moments."*
     - *"Some moments become memories."*
     - *"Some memories become precious."*
     - *"And some people become special."*

5. **A Letter For You**
   - An interactive 3D envelope with a wax heart seal.
   - Clicking opens the flap in 3D, sending up confetti, and unfolds into a parchment love letter modal.
   - The complete heartfelt letter dedicated to Geetu and signed with love.

6. **Interactive Birthday Cake & Candle Blowing**
   - A 3-tier birthday cake with creamy frosting drips, berries, and glowing candles with animated flickering flames.
   - Interactive *"Make a Wish ✨"* button:
     - Extinguishes the candle flames with animated smoke wafts.
     - Synthesizes a celestial wish chime.
     - Triggers multi-stage confetti and fireworks in the night sky!
     - Unlocks the celebration screen.

7. **Romantic Celebration & Blessings**
   - Fireworks exploding in the sky.
   - Floating helium balloons rising gently from the bottom.
   - Shimmering headline: *"Today is all about YOU, Geetu ❤️"*
   - Romantic blessing cards (Boundless Love, Endless Joy, Beautiful Journeys, Golden Peace).

8. **Emotional Final Screen & Reset**
   - Beating giant heart gradient.
   - *"One last thing, Geetu..."*
   - **Mazhi Puran Poli ❤️**
   - *"Happy Birthday to my favourite person. You deserve all the happiness in this world."*
   - *"Experience Again ❤️"* button that smoothly scrolls back to the beginning and re-arms the entire experience.

9. **Romantic Music Player Controller**
   - Floating glassmorphism player pill at the bottom-right corner.
   - Spinning vinyl disk animation and animated soundwave bars.
   - Play/Pause, Mute/Unmute, and volume slider.
   - Built-in Web Audio API romantic synthesizer fallback: if `assets/music/romantic.mp3` is not found, a soothing acoustic piano arpeggio plays automatically so the experience is never silent!

---

## 📁 Project Structure

```
birthday1/
│
├── index.html                  # Main semantic HTML5 webpage
├── config.js                   # Centralized configuration file (customize everything here!)
├── README.md                   # Documentation & instructions
│
├── assets/
│   ├── images/                 # Photo gallery images
│   │   ├── geetu-1.jpg
│   │   ├── geetu-2.jpg
│   │   ├── geetu-3.jpg
│   │   ├── geetu-4.jpg
│   │   ├── geetu-5.jpg
│   │   ├── geetu-6.jpg
│   │   ├── geetu-7.jpg
│   │   └── geetu-8.jpg
│   │
│   └── music/                  # Background music
│       └── romantic.mp3
│
├── css/
│   ├── style.css               # Core styling, glassmorphism, colors, polaroids, cake
│   ├── animations.css          # Keyframe animations (flicker, float, heart pulse, vinyl)
│   └── responsive.css          # Mobile phone & tablet responsiveness
│
└── js/
    ├── main.js                 # App coordinator, dynamic text injection, envelope logic
    ├── gallery.js              # Polaroid gallery renderer & interactive lightbox
    ├── animations.js           # Falling rose petals, floating hearts, stars & GSAP ScrollTriggers
    ├── music.js                # Audio controller & Web Audio API synthesizer fallback
    └── celebration.js          # Cake candles blow interaction, fireworks & balloons
```

---

## 🛠️ How to Customize

You do **NOT** need to edit HTML, CSS, or JS files. Everything is centralized in **`config.js`**:

### 1. Replacing Photographs
Simply place your real photos of Geetu into `assets/images/`:
- `assets/images/geetu-1.jpg`
- `assets/images/geetu-2.jpg`
... up to `geetu-8.jpg`.

In `config.js`, you can adjust captions, tilt angles, and orientation:
```javascript
{
  url: "assets/images/geetu-1.jpg",
  caption: "Your favorite memory caption ❤️",
  orientation: "portrait", // 'portrait' or 'landscape'
  tilt: -3
}
```

### 2. Replacing Background Music
Place any romantic MP3 file in:
`assets/music/romantic.mp3`

Or customize the path in `config.js`:
```javascript
music: {
  title: "Song Title",
  src: "assets/music/your-romantic-song.mp3",
  defaultVolume: 0.65
}
```

### 3. Personalizing the Letter & Nicknames
Open `config.js` and modify:
- `recipient.nickname`: Change to any pet name.
- `letter.paragraphs`: Add or edit any personal paragraphs in the letter.
- `cake.heading`: Birthday title.
- `timeline.items`: Add or customize memories.

---

## 🚀 How to Run Locally

You can open `index.html` in any modern web browser directly, or serve it using Python's built-in web server:

```powershell
python -m http.server 8000
```

Then visit:
`http://localhost:8000`

---

*Made with love for Geetu ❤️*

