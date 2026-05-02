#!/usr/bin/env python3
"""
Generate Pokémon type textures (420×590 px).
Style: dark background + energy rising from bottom + sparks + firefly glows.
Each type uses its own colour palette; all share the same structure.
"""
import numpy as np
from PIL import Image, ImageFilter, ImageDraw
import math

W, H = 420, 590
OUT = '/Users/heo/Documents/src/pokedex/src/assets/PK_Textures/'

# ── Noise ─────────────────────────────────────────────────────────────────────

def make_noise(w, h, freq=0.02, octaves=5, seed=0):
    rng = np.random.default_rng(seed)
    x = np.arange(w, dtype=np.float64)[np.newaxis, :]
    y = np.arange(h, dtype=np.float64)[:, np.newaxis]
    out, amp, f, tot = np.zeros((h, w)), 1.0, freq, 0.0
    for _ in range(octaves):
        kx, ky = rng.uniform(-1, 1, 2)
        mag = math.sqrt(kx**2 + ky**2) + 1e-9
        kx, ky = kx / mag, ky / mag
        ph = rng.uniform(0, 2 * math.pi)
        out += amp * np.sin((x * kx + y * ky) * f * 2 * math.pi + ph)
        tot += amp; amp *= 0.5; f *= 1.95
    return ((out / tot + 1) * 0.5).clip(0, 1).astype(np.float32)

# ── Generic generator ─────────────────────────────────────────────────────────

def gen(name, bg, rc, gc, bc, ember, fly, seed):
    """
    bg          : (r,g,b)  near-black background tinted with type colour
    rc,gc,bc    : (threshold, range, max_brightness) per channel
                  contribution = clip((flame - threshold) / range, 0,1) * max
    ember, fly  : (r,g,b) colour for spark particles / firefly glows
    seed        : int  — drives all random noise so each type looks unique
    """
    rng = np.random.default_rng(seed * 17 + 3)
    arr = np.zeros((H, W, 3), np.float32)
    arr[:, :] = bg

    yg  = np.arange(H, dtype=np.float32)[:, np.newaxis]
    xg  = np.arange(W, dtype=np.float32)[np.newaxis, :]
    pos = yg / (H - 1)   # 0 = top, 1 = bottom

    # Multi-octave turbulent noise
    n1 = make_noise(W, H, 0.018, 6, seed=seed)
    n2 = make_noise(W, H, 0.04,  5, seed=seed + 1)
    n3 = make_noise(W, H, 0.08,  4, seed=seed + 2)
    fn = n1 * 0.5 + n2 * 0.35 + n3 * 0.15

    # Horizontal sway
    xwarp = (make_noise(W, H, 0.015, 4, seed=seed + 10) - 0.5) * 70
    xi    = np.clip(xg + xwarp * pos, 0, W - 1).astype(np.int32)
    yi    = np.tile(np.arange(H)[:, np.newaxis], (1, W))
    fn_w  = fn[yi, xi]

    # Flame field: strong at bottom, fades upward
    vert  = np.clip((pos - 0.15) / 0.85, 0, 1) ** 1.8
    flame = np.clip(fn_w * vert * 2.2, 0, 1) ** 0.7

    def ch(t, r, m):
        return np.clip((flame - t) / r, 0, 1) * m

    arr[:, :, 0] = np.clip(arr[:, :, 0] + ch(*rc), 0, 255)
    arr[:, :, 1] = np.clip(arr[:, :, 1] + ch(*gc), 0, 255)
    arr[:, :, 2] = np.clip(arr[:, :, 2] + ch(*bc), 0, 255)

    # ── Embers (sparks scattered in and above the energy zone) ────────────────
    eimg = Image.new('L', (W, H), 0)
    ed   = ImageDraw.Draw(eimg)
    for _ in range(220):
        ex = int(rng.integers(5, W - 5))
        ey = (int(rng.integers(int(H * .38), H - 4)) if rng.random() < .72
              else int(rng.integers(int(H * .05), int(H * .38))))
        er = int(rng.integers(1, 4))
        ed.ellipse([(ex - er, ey - er), (ex + er, ey + er)],
                   fill=int(rng.integers(200, 255)))
    eg = np.array(eimg.filter(ImageFilter.GaussianBlur(2.5)), np.float32) / 255
    ec = np.array(eimg.filter(ImageFilter.GaussianBlur(0.8)), np.float32) / 255
    for i, c in enumerate(ember):
        arr[:, :, i] = np.clip(arr[:, :, i] + eg * (c * 0.8) + ec * c, 0, 255)

    # ── Fireflies (soft glows in the darker upper area) ───────────────────────
    ffimg = Image.new('L', (W, H), 0)
    ffd   = ImageDraw.Draw(ffimg)
    for _ in range(38):
        fx = int(rng.integers(8, W - 8))
        fy = int(rng.integers(8, int(H * 0.65)))
        ffd.ellipse([(fx - 1, fy - 1), (fx + 1, fy + 1)], fill=255)
    fg = np.array(ffimg.filter(ImageFilter.GaussianBlur(7)),   np.float32) / 255
    fc = np.array(ffimg.filter(ImageFilter.GaussianBlur(1.5)), np.float32) / 255
    for i, c in enumerate(fly):
        arr[:, :, i] = np.clip(arr[:, :, i] + fg * (c * 0.7) + fc * c, 0, 255)

    (Image.fromarray(arr.clip(0, 255).astype(np.uint8), 'RGB')
          .filter(ImageFilter.GaussianBlur(1.2))
          .save(OUT + name + '.png'))
    print(f'  ✓ {name}')

# ── Type definitions ──────────────────────────────────────────────────────────
# (name, bg, r_params, g_params, b_params, ember_rgb, fly_rgb, seed)
# Channel params: (threshold, range, max_brightness)
#   contribution = clip((flame - threshold) / range, 0,1) * max_brightness

TYPES = [
    ('fire',     (28,  8,  0), (0.00,.40,230), (0.35,.65,185), (0.80,.20,140), (255,140, 20), (240,200, 80),  1),
    ('grass',    ( 5, 28,  5), (0.55,.45,180), (0.00,.40,230), (0.80,.20,140), ( 80,255, 40), (150,255, 80),  3),
    ('water',    ( 5, 15, 50), (0.70,.30,140), (0.25,.75,200), (0.00,.40,230), ( 80,160,255), (180,230,255),  5),
    ('electric', (20, 18,  0), (0.00,.40,220), (0.00,.40,210), (0.75,.25,200), (255,230, 50), (255,255,120),  7),
    ('ice',      ( 5, 30, 40), (0.60,.40,160), (0.15,.85,210), (0.00,.40,230), (150,220,255), (200,240,255),  9),
    ('fighting', (35,  5,  5), (0.00,.40,230), (0.45,.55,150), (0.80,.20,100), (255, 80, 20), (255,160, 80), 11),
    ('poison',   (25,  5, 35), (0.20,.80,200), (0.75,.25,140), (0.00,.40,230), (200, 80,255), (220,160,255), 13),
    ('ground',   (40, 25,  5), (0.00,.40,230), (0.25,.75,180), (0.75,.25,100), (220,160, 60), (255,210,100), 15),
    ('flying',   (15, 15, 45), (0.40,.60,160), (0.35,.65,180), (0.00,.40,230), (160,190,255), (200,215,255), 17),
    ('psychic',  (40,  5, 25), (0.00,.40,230), (0.65,.35,150), (0.30,.70,200), (255, 80,180), (255,180,230), 19),
    ('bug',      (20, 25,  0), (0.30,.70,180), (0.00,.40,230), (0.85,.15,100), (180,230, 20), (210,255, 80), 21),
    ('rock',     (35, 25,  5), (0.00,.50,210), (0.20,.80,170), (0.75,.25,100), (200,160, 80), (230,200,130), 23),
    ('ghost',    (15,  5, 35), (0.35,.65,180), (0.70,.30,150), (0.00,.40,230), (160,100,255), (200,160,255), 25),
    ('dragon',   (10,  5, 40), (0.45,.55,160), (0.55,.45,160), (0.00,.40,230), (100,120,255), (160,150,255), 27),
    ('dark',     (12,  8,  5), (0.00,.60,160), (0.30,.70,120), (0.75,.25, 80), (150,110, 60), (180,140, 90), 29),
    ('steel',    (20, 22, 30), (0.30,.70,180), (0.25,.75,190), (0.00,.50,220), (180,190,220), (210,220,255), 31),
    ('fairy',    (40,  5, 25), (0.00,.40,230), (0.55,.45,160), (0.25,.75,200), (255,100,180), (255,190,225), 33),
    ('normal',   (30, 28, 18), (0.00,.50,210), (0.10,.90,195), (0.55,.45,150), (200,185,140), (230,220,185), 35),
]

# ── Run ───────────────────────────────────────────────────────────────────────
if __name__ == '__main__':
    print('Generating all 18 Pokémon type textures…')
    for t in TYPES:
        gen(*t)
    print('\nDone!')
