#!/usr/bin/env node
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { generateTexture, writePNG, W, H } from './texture-core.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '../src/assets/PK_Textures/water.png')

console.log('Generating water texture…')
writePNG(generateTexture({ bg: [5, 15, 50], ember: [80, 160, 255], fly: [180, 230, 255], seed: 5 }), W, H, OUT)
