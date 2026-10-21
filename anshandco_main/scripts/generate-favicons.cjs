const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 calculation for standard PNG chunks
function crc32(buf) {
  let table = new Int32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ -1) >>> 0;
}

function createPng(width, height, getPixel) {
  const rowSize = width * 4;
  const rawData = Buffer.alloc(height * (rowSize + 1));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // filter type 0: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y);
      rawData[offset++] = r;
      rawData[offset++] = g;
      rawData[offset++] = b;
      rawData[offset++] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData);

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcVal = crc32(Buffer.concat([typeBuf, data]));
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crcVal, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bits
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdr = makeChunk('IHDR', ihdrData);
  const idat = makeChunk('IDAT', compressed);
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdr, idat, iend]);
}

// Generate ANSH&CO favicon PNG with given size
function generateLogoPng(size) {
  // Define squircle corner radius
  const radius = size * 0.22;
  const barDefs = [
    { x: 0,   h: 60 },
    { x: 42,  h: 120 },
    { x: 84,  h: 180 },
    { x: 126, h: 280 },
    { x: 168, h: 240 },
    { x: 210, h: 200 }
  ];
  const barWidth = 16;
  const totalW = 226;
  const totalH = 280;

  // Scale and center inside canvas
  const targetH = size * 0.68;
  const scale = targetH / totalH;
  const scaledW = totalW * scale;
  const offsetX = (size - scaledW) / 2;
  const offsetY = (size - targetH) / 2;
  const bottomY = offsetY + targetH;

  return createPng(size, size, (px, py) => {
    // Check if inside rounded square
    const dx = Math.max(0, Math.abs(px - size / 2) - (size / 2 - radius));
    const dy = Math.max(0, Math.abs(py - size / 2) - (size / 2 - radius));
    const distSq = dx * dx + dy * dy;
    if (distSq > radius * radius) {
      return [0, 0, 0, 0]; // Transparent outside squircle
    }

    // Check if on one of the 6 bars
    for (const bar of barDefs) {
      const bx1 = offsetX + bar.x * scale;
      const bx2 = offsetX + (bar.x + barWidth) * scale;
      const by1 = bottomY - bar.h * scale;
      const by2 = bottomY;

      if (px >= bx1 && px <= bx2 && py >= by1 && py <= by2) {
        return [255, 255, 255, 255]; // Crisp white bar
      }
    }

    // Background squircle color: black (#0a0a0a)
    return [10, 10, 10, 255];
  });
}

// Helper to create simple single-or-multi image ICO
function createIco(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4);

  let offset = 6 + count * 16;
  const entries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.size >= 256 ? 0 : item.size, 0); // width
    entry.writeUInt8(item.size >= 256 ? 0 : item.size, 1); // height
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset of image data
    entries.push(entry);
    offset += item.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map(p => p.buffer)]);
}

const publicDir = path.join(__dirname, '..', 'public');

const png16 = generateLogoPng(16);
const png32 = generateLogoPng(32);
const png180 = generateLogoPng(180);
const png192 = generateLogoPng(192);
const png512 = generateLogoPng(512);

fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);
fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
fs.writeFileSync(path.join(publicDir, 'android-chrome-192x192.png'), png192);
fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), png512);

const icoBuffer = createIco([
  { size: 16, buffer: png16 },
  { size: 32, buffer: png32 }
]);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);

console.log('Successfully generated all brand favicons in public/');
