#!/usr/bin/env node
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { generateTexture, writePNG, W, H } from './texture-core.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = (name) => resolve(__dirname, `../src/assets/PK_Textures/${name}.png`)

// bg, ember, fly colours and seed match gen_textures.py
const TYPES = [
  { name: 'fire',     bg: [ 28,  8,  0], ember: [255,140, 20], fly: [240,200, 80], seed:  1 },
  { name: 'grass',    bg: [  5, 28,  5], ember: [ 80,255, 40], fly: [150,255, 80], seed:  3 },
  { name: 'water',    bg: [  5, 15, 50], ember: [ 80,160,255], fly: [180,230,255], seed:  5 },
  { name: 'electric', bg: [ 20, 18,  0], ember: [255,230, 50], fly: [255,255,120], seed:  7 },
  { name: 'ice',      bg: [  5, 30, 40], ember: [150,220,255], fly: [200,240,255], seed:  9 },
  { name: 'fighting', bg: [ 35,  5,  5], ember: [255, 80, 20], fly: [255,160, 80], seed: 11 },
  { name: 'poison',   bg: [ 25,  5, 35], ember: [200, 80,255], fly: [220,160,255], seed: 13 },
  { name: 'ground',   bg: [ 40, 25,  5], ember: [220,160, 60], fly: [255,210,100], seed: 15 },
  { name: 'flying',   bg: [ 15, 15, 45], ember: [160,190,255], fly: [200,215,255], seed: 17 },
  { name: 'psychic',  bg: [ 40,  5, 25], ember: [255, 80,180], fly: [255,180,230], seed: 19 },
  { name: 'bug',      bg: [ 20, 25,  0], ember: [180,230, 20], fly: [210,255, 80], seed: 21 },
  { name: 'rock',     bg: [ 35, 25,  5], ember: [200,160, 80], fly: [230,200,130], seed: 23 },
  { name: 'ghost',    bg: [ 15,  5, 35], ember: [160,100,255], fly: [200,160,255], seed: 25 },
  { name: 'dragon',   bg: [ 10,  5, 40], ember: [100,120,255], fly: [160,150,255], seed: 27 },
  { name: 'dark',     bg: [ 12,  8,  5], ember: [150,110, 60], fly: [180,140, 90], seed: 29 },
  { name: 'steel',    bg: [ 20, 22, 30], ember: [180,190,220], fly: [210,220,255], seed: 31 },
  { name: 'fairy',    bg: [ 40,  5, 25], ember: [255,100,180], fly: [255,190,225], seed: 33 },
  { name: 'normal',   bg: [ 30, 28, 18], ember: [200,185,140], fly: [230,220,185], seed: 35 },
]

console.log('Generating all 18 Pokémon type textures (particles only, no flame field)…')
for (const type of TYPES) {
  writePNG(generateTexture(type), W, H, OUT(type.name))
}
console.log('\nDone!')
