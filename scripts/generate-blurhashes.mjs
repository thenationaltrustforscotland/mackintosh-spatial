/**
 * Generate blurhash strings for the room images and print them as a JSON map.
 * Run: node scripts/generate-blurhashes.mjs
 * Paste the output into the `blurhash` fields in src/data/rooms.ts.
 */
import { readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { encode } from 'blurhash'
import sharp from 'sharp'

const here = dirname(fileURLToPath(import.meta.url))
const roomsDir = join(here, '..', 'src', 'assets', 'rooms')

const files = readdirSync(roomsDir).filter((f) => /\.(avif|jpe?g|png|webp)$/i.test(f))
const out = {}

for (const file of files) {
  process.stdout.write(`Encoding ${file}… `)
  // Downscale first: blurhash only needs a small sample and encode is O(pixels).
  const { data, info } = await sharp(join(roomsDir, file))
    .raw()
    .ensureAlpha()
    .resize(64, 64, { fit: 'inside' })
    .toBuffer({ resolveWithObject: true })

  const hash = encode(new Uint8ClampedArray(data), info.width, info.height, 4, 3)
  out[file] = hash
  process.stdout.write(`${hash}\n`)
}

console.log(`\n${JSON.stringify(out, null, 2)}`)
