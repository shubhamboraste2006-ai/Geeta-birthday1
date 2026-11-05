/**
 * ====================================================================
 * A SPECIAL BIRTHDAY SURPRISE FOR GEETU ❤️
 * Centralized Configuration File
 * ====================================================================
 * You can customize names, messages, letter text, photo captions,
 * color themes, and audio without touching any HTML/CSS/JS core files!
 */

window.SURPRISE_CONFIG = {
  // ------------------------------------------------------------------
  // 1. RECIPIENT INFORMATION
  // ------------------------------------------------------------------
  recipient: {
    name: "Geetu",
    nickname: "Mazhhya AAICHYA Hatachi Puran Poli ❤️",
    relationship: "Girlfriend",
    birthdayDate: "Special Day", // e.g., "November 4" or your special date
  },

  // ------------------------------------------------------------------
  // 2. THEME COLORS & PALETTE
  // ------------------------------------------------------------------
  theme: {
    burgundy: "#3B1026",
    rosePink: "#F4A6B8",
    blushPink: "#FFE4EC",
    roseGold: "#D8A0A8",
    cream: "#FFF8F0",
    softPurple: "#A78BFA",
    deepBurgundyDark: "#230816",
    glowGold: "rgba(255, 215, 0, 0.6)",
  },

  // ------------------------------------------------------------------
  // 3. SECTION 1: HERO / OPENING SURPRISE
  // ------------------------------------------------------------------
  hero: {
    greeting: "Hey Geetu ❤️",
    animatedSubtitle: "Someone has prepared a little surprise for you...",
    buttonText: "Open Your Surprise 💌",
    hintText: "Put on your earphones for the best experience 🎧",
  },

  // ------------------------------------------------------------------
  // 4. SECTION 2: SPECIAL NICKNAME SECTION
  // ------------------------------------------------------------------
  nicknameSection: {
    question: "Do you know what you'll always be?",
    reveal: "Mazhhya Aaichya Hatachi Puran Poli ❤️",
    subtext: "Some names are special, and this one belongs only to you.",
  },

  // ------------------------------------------------------------------
  // 5. SECTION 3: OUR BEAUTIFUL MEMORIES (PHOTO GALLERY)
  // ------------------------------------------------------------------
  gallery: {
    title: "Our Beautiful M",
    subtitle: "Frozen in time, treasured forever in my heart.",
    // You can replace these images in `assets/images/geetu-1.jpg` ...
    // If a photo fails to load or is not yet added, a romantic fallback card is shown!
    photos: [
      {
        url: "assets/images/geetu-1.jpg",
        caption: "My favorite view is you",
        alt: "Geetu memory 1",
        orientation: "portrait", // 'portrait' or 'landscape'
        tilt: -3, // degree of tilt for realistic polaroid scrapbook feel
      },
      {
        url: "assets/images/geetu-2.jpg",
        caption: "This smile is everything.",
        alt: "Geetu memory 2",
        orientation: "landscape",
        tilt: 4,
      },
      {
        url: "assets/images/geetu-3.jpg",
        caption: "One of My Favourite Memories ❤️.",
        alt: "Geetu memory 3",
        orientation: "portrait",
        tilt: -2,
      },
      {
        url: "assets/images/geetu-4.jpg",
        caption: "A moment I wish could last forever.",
        alt: "Geetu memory 4",
        orientation: "landscape",
        tilt: 3,
      },
      {
        url: "assets/images/geetu-5.jpg",
        caption: "Every second with you is a blessing.",
        alt: "Geetu memory 5",
        orientation: "portrait",
        tilt: -4,
      },
      {
        url: "assets/images/geetu-6.jpg",
        caption: "Laughter that warms my world.",
        alt: "Geetu memory 6",
        orientation: "landscape",
        tilt: 2,
      },
      {
        url: "assets/images/geetu-7.jpg",
        caption: "Very Lucky to Have You in My Life.",
        alt: "Geetu memory 7",
        orientation: "portrait",
        tilt: -2,
      },
      {
        url: "assets/images/geetu-8.jpg",
        caption: "Forever grateful for you ❤️",
        alt: "Geetu memory 8",
        orientation: "landscape",
        tilt: 4,
      },
    ],
  },

  // ------------------------------------------------------------------
  // 6. SECTION 4: OUR STORY (MEMORY TIMELINE)
  // ------------------------------------------------------------------
  timeline: {
    title: "Our Story",
    subtitle: "Every little step that brought us here...",
    items: [
      {
        step: "I",
        message: "Every beautiful story has its own little moments.",
        icon: "fa-heart",
        tag: "The Spark",
      },
      {
        step: "II",
        message: "Some moments become memories.",
        icon: "fa-star",
        tag: "The Smile",
      },
      {
        step: "III",
        message: "Some memories become precious.",
        icon: "fa-gem",
        tag: "The Bond",
      },
      {
        step: "IV",
        message: "And some people become special.",
        icon: "fa-crown",
        tag: "You, Geetu",
      },
    ],
  },

  // ------------------------------------------------------------------
  // 7. SECTION 5: A LETTER FOR YOU
  // ------------------------------------------------------------------
  letter: {
    title: "A Letter For You",
    teaser: "Geetu, I have something to tell you...",
    envelopePrompt: "Click the envelope to open 💌",
    salutation: "Dear Geetu,",
    paragraphs: [
      "I may not always have the perfect words to express how special you are to me, but I hope this little surprise makes you smile.",
      "Your smile, your presence, and the little moments we share mean more than words can explain.",
      "And no matter how many names the world gives you, you'll always have one special name in my heart...",
      "Mazhi Puran Poli ❤️",
      "Happy Birthday, Majhi Babdii!",
      "Mala Mahit Ahe Mi kayam Chuka Karto Pn At Last Tujhach ahe Ghe Samjun plzz",
      "Keep smiling and keep being the beautiful person you are.",
    ],
    signoff: "With lots of love ❤️",
    sender: "Always Yours",
  },

  // ------------------------------------------------------------------
  // 8. SECTION 6: BIRTHDAY CAKE SURPRISE
  // ------------------------------------------------------------------
  cake: {
    heading: "HAPPY BIRTHDAY GEETU! 🎂",
    subtitle: "Close your eyes, make a secret wish in your heart, and blow out the candles!",
    buttonText: "Make a Wish ✨",
    blownMessage: "Your wish has been whispered to the universe! ✨",
    candleCount: 3,
  },

  // ------------------------------------------------------------------
  // 9. SECTION 7: ROMANTIC CELEBRATION
  // ------------------------------------------------------------------
  celebration: {
    headline: "Today is all about YOU, Geetu ❤️",
    message: "May your life always be filled with happiness, love, laughter and beautiful moments.",
    blessings: [
      {
        icon: "fa-heart",
        title: "Boundless Love",
        desc: "To keep your heart warm every single day.",
      },
      {
        icon: "fa-wand-magic-sparkles",
        title: "Endless Joy",
        desc: "May your infectious laughter fill every room.",
      },
      {
        icon: "fa-compass",
        title: "Beautiful Journeys",
        desc: "Adventures, peaceful sunsets, and sweet moments.",
      },
      {
        icon: "fa-sun",
        title: "Golden Peace",
        desc: "Good health, success, and everything you dream of.",
      },
    ],
  },

  // ------------------------------------------------------------------
  // 10. SECTION 8: FINAL SURPRISE
  // ------------------------------------------------------------------
  final: {
    preTitle: "One last thing, Geetu...",
    nickname: "Mazhi Puran Poli ❤️",
    message: "Happy Birthday to my favourite person. You deserve all the happiness in this world.",
    restartButton: "Experience Again ❤️",
  },

  // ------------------------------------------------------------------
  // 11. BACKGROUND MUSIC & AUDIO SETTINGS
  // ------------------------------------------------------------------
  music: {
    title: "Romantic Melody for Geetu",
    artist: "With Love",
    src: "assets/music/romantic.mp3",
    defaultVolume: 0.65,
    // If romantic.mp3 is not present or fails to load, our built-in Web Audio API
    // romantic synthesizer plays a soothing, emotional acoustic piano arpeggio!
    enableSynthesizerFallback: true,
  },
};

