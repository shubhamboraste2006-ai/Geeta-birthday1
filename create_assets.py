import os
import math
import struct
import zlib
import wave

def write_png_file(filename, width, height, rgb_buffer):
    """Writes a standard PNG file given a flat bytearray of RGB bytes."""
    def make_chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)
    
    header = b'\x89PNG\r\n\x1a\n'
    ihdr = make_chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0))
    
    scanlines = []
    row_bytes = width * 3
    for y in range(height):
        start = y * row_bytes
        scanlines.append(b'\x00' + rgb_buffer[start:start+row_bytes])
    raw_data = b''.join(scanlines)
    idat = make_chunk(b'IDAT', zlib.compress(raw_data, 6))
    iend = make_chunk(b'IEND', b'')
    
    with open(filename, 'wb') as f:
        f.write(header + ihdr + idat + iend)

# Simple 5x7 bitmap font for rendering text into RGB buffer
FONT = {
    'A': [" 000 ", "0   0", "00000", "0   0", "0   0"],
    'B': ["0000 ", "0   0", "0000 ", "0   0", "0000 "],
    'C': [" 000 ", "0    ", "0    ", "0    ", " 000 "],
    'D': ["0000 ", "0   0", "0   0", "0   0", "0000 "],
    'E': ["00000", "0    ", "0000 ", "0    ", "00000"],
    'F': ["00000", "0    ", "0000 ", "0    ", "0    "],
    'G': [" 0000", "0    ", "0 000", "0   0", " 000 "],
    'H': ["0   0", "0   0", "00000", "0   0", "0   0"],
    'I': ["00000", "  0  ", "  0  ", "  0  ", "00000"],
    'J': ["  000", "    0", "    0", "0   0", " 000 "],
    'K': ["0   0", "0  0 ", "000  ", "0  0 ", "0   0"],
    'L': ["0    ", "0    ", "0    ", "0    ", "00000"],
    'M': ["0   0", "00 00", "0 0 0", "0   0", "0   0"],
    'N': ["0   0", "00  0", "0 0 0", "0  00", "0   0"],
    'O': [" 000 ", "0   0", "0   0", "0   0", " 000 "],
    'P': ["0000 ", "0   0", "0000 ", "0    ", "0    "],
    'Q': [" 000 ", "0   0", "0   0", "0  0 ", " 00 0"],
    'R': ["0000 ", "0   0", "0000 ", "0  0 ", "0   0"],
    'S': [" 0000", "0    ", " 000 ", "    0", "0000 "],
    'T': ["00000", "  0  ", "  0  ", "  0  ", "  0  "],
    'U': ["0   0", "0   0", "0   0", "0   0", " 000 "],
    'V': ["0   0", "0   0", "0   0", " 0 0 ", "  0  "],
    'W': ["0   0", "0   0", "0 0 0", "00 00", "0   0"],
    'X': ["0   0", " 0 0 ", "  0  ", " 0 0 ", "0   0"],
    'Y': ["0   0", " 0 0 ", "  0  ", "  0  ", "  0  "],
    'Z': ["00000", "   0 ", "  0  ", " 0   ", "00000"],
    '0': [" 000 ", "0  00", "0 0 0", "00  0", " 000 "],
    '1': ["  0  ", " 00  ", "  0  ", "  0  ", " 000 "],
    '2': [" 000 ", "    0", "  00 ", " 0   ", "00000"],
    '3': ["0000 ", "    0", "  00 ", "    0", "0000 "],
    '4': ["0  0 ", "0  0 ", "00000", "   0 ", "   0 "],
    '5': ["00000", "0    ", "0000 ", "    0", "0000 "],
    '6': [" 000 ", "0    ", "0000 ", "0   0", " 000 "],
    '7': ["00000", "    0", "   0 ", "  0  ", " 0   "],
    '8': [" 000 ", "0   0", " 000 ", "0   0", " 000 "],
    '9': [" 000 ", "0   0", " 0000", "    0", " 000 "],
    ' ': ["     ", "     ", "     ", "     ", "     "],
    '-': ["     ", "     ", "00000", "     ", "     "],
    ':': ["     ", "  0  ", "     ", "  0  ", "     "],
    '.': ["     ", "     ", "     ", "     ", "  0  "],
    '!': ["  0  ", "  0  ", "  0  ", "     ", "  0  "],
    '#': [" 0 0 ", "00000", " 0 0 ", "00000", " 0 0 "],
    '<': ["   0 ", "  0  ", " 0   ", "  0  ", "   0 "],
    '3': [" 000 ", "    0", " 000 ", "    0", " 000 "],
}

def draw_text(buf, width, height, text, start_x, start_y, scale=3, color=(255, 240, 245)):
    text = text.upper()
    cur_x = start_x
    for ch in text:
        bitmap = FONT.get(ch, FONT[' '])
        for row_i, row in enumerate(bitmap):
            for col_i, bit in enumerate(row):
                if bit == '0':
                    for sy in range(scale):
                        for sx in range(scale):
                            px = cur_x + col_i * scale + sx
                            py = start_y + row_i * scale + sy
                            if 0 <= px < width and 0 <= py < height:
                                idx = (py * width + px) * 3
                                buf[idx] = color[0]
                                buf[idx+1] = color[1]
                                buf[idx+2] = color[2]
        cur_x += (len(bitmap[0]) + 1) * scale

def is_inside_heart(nx, ny):
    """nx and ny normalized between -1.5 and 1.5"""
    x = nx * 1.2
    y = -ny * 1.2 + 0.2
    # Heart curve: (x^2 + y^2 - 1)^3 - x^2 * y^3 <= 0
    f = (x*x + y*y - 1.0)**3 - x*x * (y*y*y)
    return f <= 0

def generate_romantic_image(filepath, width, height, title, subtitle, palette_index):
    buf = bytearray(width * height * 3)
    
    # Palette styles
    styles = [
        # (center_rgb, outer_rgb, heart_rgb, accent_rgb)
        ((110, 30, 70), (45, 10, 28), (244, 166, 184), (255, 230, 240)),   # Rose Burgundy
        ((140, 50, 90), (35, 12, 30), (216, 160, 168), (255, 248, 240)),  # Rose Gold
        ((90, 30, 80), (25, 8, 25), (167, 139, 250), (255, 220, 235)),    # Soft Purple Rose
        ((130, 40, 60), (40, 10, 20), (255, 180, 195), (255, 240, 220)),  # Warm Crimson
        ((100, 35, 75), (30, 10, 26), (244, 166, 184), (255, 215, 0)),    # Burgundy Gold
        ((120, 45, 85), (35, 15, 30), (230, 150, 170), (255, 250, 245)),  # Soft Blush
        ((85, 25, 65), (20, 6, 20), (200, 130, 160), (255, 230, 240)),    # Deep Velvet
        ((135, 55, 95), (42, 14, 32), (255, 175, 190), (255, 225, 200)),  # Sunset Glow
    ]
    center_col, outer_col, heart_col, accent_col = styles[palette_index % len(styles)]
    
    cx = width / 2.0
    cy = height * 0.42
    max_r = math.sqrt(cx*cx + cy*cy)
    
    # Render background gradient and glowing heart
    for y in range(height):
        for x in range(width):
            dx = x - cx
            dy = y - cy
            dist = math.sqrt(dx*dx + dy*dy)
            factor = min(1.0, dist / max_r)
            
            # Base radial vignette
            r = int(center_col[0] * (1.0 - factor*0.8) + outer_col[0] * (factor*0.8))
            g = int(center_col[1] * (1.0 - factor*0.8) + outer_col[1] * (factor*0.8))
            b = int(center_col[2] * (1.0 - factor*0.8) + outer_col[2] * (factor*0.8))
            
            # Subtle starry glitter
            star_hash = (x * 374761393 + y * 668265263) ^ 0x5bf03635
            if (star_hash & 0x7FF) == 1:
                r = min(255, r + 90)
                g = min(255, g + 80)
                b = min(255, b + 90)
            
            # Normalized coordinates for heart
            heart_scale = min(width, height) * 0.28
            hx = dx / heart_scale
            hy = (y - (cy - 10)) / heart_scale
            
            if is_inside_heart(hx, hy):
                # Inner heart glow
                heart_dist = math.sqrt(hx*hx + hy*hy)
                alpha = max(0.0, 1.0 - heart_dist * 0.7)
                r = min(255, int(r * (1 - alpha) + heart_col[0] * alpha * 1.1))
                g = min(255, int(g * (1 - alpha) + heart_col[1] * alpha * 1.1))
                b = min(255, int(b * (1 - alpha) + heart_col[2] * alpha * 1.1))
            else:
                # Soft aura around the heart
                glow_hx = dx / (heart_scale * 1.25)
                glow_hy = (y - (cy - 10)) / (heart_scale * 1.25)
                if is_inside_heart(glow_hx, glow_hy):
                    r = min(255, r + 35)
                    g = min(255, g + 20)
                    b = min(255, b + 30)

            # Draw an elegant inner photo border
            border_m = 18
            if (border_m <= x <= border_m + 2 or width - border_m - 3 <= x <= width - border_m or
                border_m <= y <= border_m + 2 or height - border_m - 3 <= y <= height - border_m):
                r = min(255, int(r * 0.3 + 216 * 0.7))
                g = min(255, int(g * 0.3 + 160 * 0.7))
                b = min(255, int(b * 0.3 + 168 * 0.7))

            idx = (y * width + x) * 3
            buf[idx] = max(0, min(255, r))
            buf[idx+1] = max(0, min(255, g))
            buf[idx+2] = max(0, min(255, b))
            
    # Text placement
    # Title
    t_scale = 4 if width >= 700 else 3
    t_w = len(title) * (5 + 1) * t_scale
    tx = max(24, int((width - t_w) / 2))
    ty = int(height * 0.70)
    draw_text(buf, width, height, title, tx, ty, scale=t_scale, color=accent_col)
    
    # Subtitle
    s_scale = 3 if width >= 700 else 2
    s_w = len(subtitle) * (5 + 1) * s_scale
    sx = max(24, int((width - s_w) / 2))
    sy = int(height * 0.81)
    draw_text(buf, width, height, subtitle, sx, sy, scale=s_scale, color=(240, 200, 215))

    write_png_file(filepath, width, height, buf)

def generate_ambient_audio(filepath):
    """Generates a pleasant, soothing romantic acoustic chime/melody in a standard WAV file."""
    # Note: Modern browsers can play WAV audio seamlessly.
    # We will write an audio file here and also support synth in JS!
    sample_rate = 22050
    duration = 18.0  # 18 seconds loop
    num_samples = int(sample_rate * duration)
    
    # Romantic pentatonic chord progression: Cmaj7 - Am9 - Fmaj7 - Gsus4
    # Frequencies in Hz:
    progression = [
        # Chord 1: C - E - G - B (Cmaj7)
        [261.63, 329.63, 392.00, 493.88],
        # Chord 2: A - C - E - G (Am7)
        [220.00, 261.63, 329.63, 392.00],
        # Chord 3: F - A - C - E (Fmaj7)
        [174.61, 220.00, 261.63, 329.63],
        # Chord 4: G - B - D - F# (Gmaj7 / Gsus)
        [196.00, 246.94, 293.66, 369.99],
    ]
    
    wav_file = wave.open(filepath, 'wb')
    wav_file.setnchannels(2)      # Stereo
    wav_file.setsampwidth(2)     # 16-bit
    wav_file.setframerate(sample_rate)
    
    frames = bytearray()
    chord_len = duration / len(progression)
    
    for i in range(num_samples):
        t = i / sample_rate
        chord_idx = int((t % duration) / chord_len)
        chord_t = t % chord_len
        notes = progression[chord_idx]
        
        val_l = 0.0
        val_r = 0.0
        
        # Soft arpeggio / ambient chime
        for n_idx, freq in enumerate(notes):
            # Pluck offset
            note_offset = n_idx * 0.45
            note_time = chord_t - note_offset
            if note_time > 0:
                # Envelope: fast attack, exponential soft decay
                env = math.exp(-note_time * 1.5)
                # Soft sine wave + gentle harmonics
                wave_val = (math.sin(2 * math.pi * freq * note_time) * 0.7 +
                            math.sin(4 * math.pi * freq * note_time) * 0.25 +
                            math.sin(6 * math.pi * freq * note_time) * 0.05)
                pan = 0.3 + 0.4 * (n_idx / (len(notes) - 1))
                val_l += wave_val * env * (1.0 - pan)
                val_r += wave_val * env * pan
                
        # Master volume and clamp
        val_l = max(-0.95, min(0.95, val_l * 0.4))
        val_r = max(-0.95, min(0.95, val_r * 0.4))
        
        sample_int_l = int(val_l * 32767.0)
        sample_int_r = int(val_r * 32767.0)
        frames.extend(struct.pack('<hh', sample_int_l, sample_int_r))
        
    wav_file.writeframes(frames)
    wav_file.close()

def main():
    img_dir = os.path.join("assets", "images")
    music_dir = os.path.join("assets", "music")
    os.makedirs(img_dir, exist_ok=True)
    os.makedirs(music_dir, exist_ok=True)
    
    photos = [
        ("geetu-1.jpg", 600, 800, "GEETU", "A BEAUTIFUL MOMENT", 0),
        ("geetu-2.jpg", 800, 600, "MEMORIES", "FAVOURITE MOMENT", 1),
        ("geetu-3.jpg", 600, 800, "GEETU", "THIS SMILE IS EVERYTHING", 2),
        ("geetu-4.jpg", 800, 600, "FOREVER", "A WISH COME TRUE", 3),
        ("geetu-5.jpg", 600, 800, "GEETU", "EVERY SECOND A BLESSING", 4),
        ("geetu-6.jpg", 800, 600, "LAUGHTER", "WARMS MY WORLD", 5),
        ("geetu-7.jpg", 600, 800, "GEETU", "MY FAVORITE VIEW", 6),
        ("geetu-8.jpg", 800, 600, "GRATEFUL", "MAZHI PURAN POLI", 7),
    ]
    
    for filename, w, h, title, sub, pal in photos:
        target = os.path.join(img_dir, filename)
        print(f"Generating {target} ({w}x{h})...")
        generate_romantic_image(target, w, h, title, sub, pal)
        
    audio_path = os.path.join(music_dir, "romantic.mp3")
    print(f"Generating gentle romantic audio track at {audio_path}...")
    generate_ambient_audio(audio_path)
    print("All assets successfully generated!")

if __name__ == "__main__":
    main()

