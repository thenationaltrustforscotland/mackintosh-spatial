/** Object-image placeholder as an SVG data URI: a stylised Mackintosh rose on
 *  NTS air. Shown until a real object photo (from CIIM/Portfolio) is wired in. */
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#f5f5f1"/>
  <g transform="translate(200 150)" fill="none" stroke="#cf007d" stroke-width="6">
    <circle r="46"/>
    <path d="M0 -46 A46 46 0 0 1 32 32" stroke="#6c1862"/>
    <circle r="26" stroke="#6c1862"/>
    <path d="M0 -26 A26 26 0 0 1 18 18"/>
    <circle r="8" fill="#cf007d" stroke="none"/>
  </g>
  <g transform="translate(200 150)" stroke="#00857e" stroke-width="4" fill="none">
    <path d="M-70 70 q20 -30 60 -40"/>
    <path d="M70 70 q-20 -30 -60 -40"/>
  </g>
  <text x="200" y="270" text-anchor="middle" font-family="sans-serif" font-size="14"
    fill="#969699">Image to follow</text>
</svg>`

export const placeholderImage = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
