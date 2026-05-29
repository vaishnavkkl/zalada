import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const outDir = path.join(root, 'out')
const indexFile = path.join(outDir, 'index.html')
const menuDir = path.join(outDir, 'menu', 'optimized')
const vendingDir = path.join(outDir, 'vending_images')

function fail(message) {
  console.error(`VERIFY_EXPORT_FAILED: ${message}`)
  process.exit(1)
}

function mustExist(target, label) {
  if (!fs.existsSync(target)) fail(`${label} missing at ${target}`)
}

mustExist(outDir, 'Export output')
mustExist(indexFile, 'Export index.html')
mustExist(menuDir, 'Optimized menu directory')
mustExist(vendingDir, 'Vending images directory')

const html = fs.readFileSync(indexFile, 'utf8')
if (!html.includes('/_next/static/')) fail('index.html does not reference Next static assets')
if (!html.includes('/menu/optimized/')) fail('index.html does not reference optimized menu images')
if (!html.includes('/vending_images/ezgif-frame-001.jpg')) {
  fail('index.html does not reference vending animation entry frame')
}

const menuFiles = fs
  .readdirSync(menuDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.jpg'))
if (menuFiles.length < 9) fail(`expected at least 9 optimized menu images, found ${menuFiles.length}`)

const vendingFiles = fs
  .readdirSync(vendingDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && /^ezgif-frame-\d{3}\.jpg$/i.test(entry.name))
  .map((entry) => entry.name)
  .sort()

if (vendingFiles.length !== 140) fail(`expected 140 vending frames, found ${vendingFiles.length}`)
if (!vendingFiles.includes('ezgif-frame-001.jpg')) fail('missing ezgif-frame-001.jpg')
if (!vendingFiles.includes('ezgif-frame-140.jpg')) fail('missing ezgif-frame-140.jpg')
if (vendingFiles.includes('ezgif-frame-141.jpg')) fail('unexpected ezgif-frame-141.jpg present')

console.log(
  `VERIFY_EXPORT_OK: menu_images=${menuFiles.length}, vending_frames=${vendingFiles.length}, index=ok`,
)
