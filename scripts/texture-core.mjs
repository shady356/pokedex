/**
 * Shared utilities for generating Pokémon type textures.
 * Particle-only style: dark background + embers + firefly glows (no flame field).
 */

import { writeFileSync } from 'fs'
import { deflateSync } from 'zlib'

export const W = 420, H = 590

// ── CRC32 ─────────────────────────────────────────────────────────────────────
const CRC_TABLE = new Uint32Array(256)
for (let i = 0; i < 256; i++) {
  let c = i
  for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1)
  CRC_TABLE[i] = c
}
function crc32(buf) {
  let c = 0xFFFFFFFF
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8)
  return (c ^ 0xFFFFFFFF) >>> 0
}
function pngChunk(type, data) {
  const t = Buffer.from(type, 'ascii')
  const crcBuf = Buffer.concat([t, data])
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(crcBuf))
  return Buffer.concat([len, t, data, crc])
}

// ── Mulberry32 PRNG ───────────────────────────────────────────────────────────
export function makePRNG(seed) {
  let s = ((seed * 17 + 3) >>> 0)
  return {
    random() {
      s = (s + 0x6D2B79F5) >>> 0
      let t = Math.imul(s ^ (s >>> 15), 1 | s)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    },
    integers(lo, hi) { return Math.floor(this.random() * (hi - lo)) + lo }
  }
}

// ── Separable Gaussian blur ───────────────────────────────────────────────────
function gaussianKernel(sigma) {
  const r = Math.ceil(sigma * 3)
  const k = []
  let sum = 0
  for (let i = 0; i <= 2 * r; i++) {
    const x = i - r
    const v = Math.exp(-(x * x) / (2 * sigma * sigma))
    k.push(v); sum += v
  }
  return { k: k.map(v => v / sum), r }
}
function blurChannel(src, w, h, sigma) {
  const { k, r } = gaussianKernel(sigma)
  const tmp = new Float32Array(w * h)
  const out = new Float32Array(w * h)
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let v = 0
      for (let i = 0; i < k.length; i++) v += src[y * w + Math.min(Math.max(x + i - r, 0), w - 1)] * k[i]
      tmp[y * w + x] = v
    }
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let v = 0
      for (let i = 0; i < k.length; i++) v += tmp[Math.min(Math.max(y + i - r, 0), h - 1) * w + x] * k[i]
      out[y * w + x] = v
    }
  return out
}
function blurRGB(arr, w, h, sigma) {
  const ch = [new Float32Array(w * h), new Float32Array(w * h), new Float32Array(w * h)]
  for (let i = 0; i < w * h; i++) { ch[0][i] = arr[i * 3]; ch[1][i] = arr[i * 3 + 1]; ch[2][i] = arr[i * 3 + 2] }
  const blurred = ch.map(c => blurChannel(c, w, h, sigma))
  const out = new Float32Array(w * h * 3)
  for (let i = 0; i < w * h; i++) { out[i * 3] = blurred[0][i]; out[i * 3 + 1] = blurred[1][i]; out[i * 3 + 2] = blurred[2][i] }
  return out
}

// ── Draw filled circle onto single-channel buffer ─────────────────────────────
function circle(img, w, h, cx, cy, r, val) {
  for (let dy = -r; dy <= r; dy++)
    for (let dx = -r; dx <= r; dx++) {
      if (dx * dx + dy * dy > r * r) continue
      const px = cx + dx, py = cy + dy
      if (px >= 0 && px < w && py >= 0 && py < h)
        img[py * w + px] = Math.max(img[py * w + px], val)
    }
}

// ── Generate pixel buffer for one type ────────────────────────────────────────
/**
 * @param {{ bg: [number,number,number], ember: [number,number,number], fly: [number,number,number], seed: number }} config
 * @returns {Buffer}
 */
export function generateTexture({ bg, ember, fly, seed }) {
  const rng = makePRNG(seed)

  const arr = new Float32Array(H * W * 3)
  for (let i = 0; i < H * W; i++) { arr[i * 3] = bg[0]; arr[i * 3 + 1] = bg[1]; arr[i * 3 + 2] = bg[2] }

  // ── Embers (sparks scattered throughout) ──────────────────────────────────
  const eimg = new Float32Array(H * W)
  for (let n = 0; n < 220; n++) {
    const ex = rng.integers(5, W - 5)
    const ey = rng.random() < 0.72
      ? rng.integers(Math.floor(H * 0.38), H - 4)
      : rng.integers(Math.floor(H * 0.05), Math.floor(H * 0.38))
    const er = rng.integers(1, 4)
    const fill = rng.integers(200, 255)
    circle(eimg, W, H, ex, ey, er, fill)
  }
  const eg = blurChannel(eimg, W, H, 2.5)
  const ec = blurChannel(eimg, W, H, 0.8)
  for (let i = 0; i < H * W; i++)
    for (let c = 0; c < 3; c++)
      arr[i * 3 + c] = Math.min(arr[i * 3 + c] + (eg[i] / 255) * (ember[c] * 0.8) + (ec[i] / 255) * ember[c], 255)

  // ── Fireflies (soft glows in upper 65%) ───────────────────────────────────
  const ffimg = new Float32Array(H * W)
  for (let n = 0; n < 38; n++) {
    const fx = rng.integers(8, W - 8)
    const fy = rng.integers(8, Math.floor(H * 0.65))
    circle(ffimg, W, H, fx, fy, 1, 255)
  }
  const fg = blurChannel(ffimg, W, H, 7)
  const fc = blurChannel(ffimg, W, H, 1.5)
  for (let i = 0; i < H * W; i++)
    for (let c = 0; c < 3; c++)
      arr[i * 3 + c] = Math.min(arr[i * 3 + c] + (fg[i] / 255) * (fly[c] * 0.7) + (fc[i] / 255) * fly[c], 255)

  // ── Final softening blur ───────────────────────────────────────────────────
  const final = blurRGB(arr, W, H, 1.2)
  const pixels = Buffer.alloc(H * W * 3)
  for (let i = 0; i < H * W * 3; i++) pixels[i] = Math.min(Math.max(Math.round(final[i]), 0), 255)
  return pixels
}

// ── Write PNG ─────────────────────────────────────────────────────────────────
export function writePNG(pixels, w, h, path) {
  const rowLen = w * 3
  const raw = Buffer.alloc(h * (1 + rowLen))
  for (let y = 0; y < h; y++) {
    raw[y * (1 + rowLen)] = 0
    pixels.copy(raw, y * (1 + rowLen) + 1, y * rowLen, (y + 1) * rowLen)
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4)
  ihdr[8] = 8; ihdr[9] = 2 // 8-bit RGB
  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', deflateSync(raw, { level: 6 })),
    pngChunk('IEND', Buffer.alloc(0)),
  ])
  writeFileSync(path, png)
  console.log(`  ✓ ${path}`)
}
