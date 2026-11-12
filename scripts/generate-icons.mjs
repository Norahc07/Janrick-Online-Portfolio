import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconsDir = path.resolve(__dirname, '../public/icons');

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i += 1) {
    c ^= buf[i];
    for (let k = 0; k < 8; k += 1) {
      c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
    }
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  const crc = crc32(Buffer.concat([typeBuf, data]));
  crcBuf.writeUInt32BE(crc, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function createPng(size, bg = [48, 50, 56, 255], fg = [245, 245, 245, 255]) {
  const rows = [];
  for (let y = 0; y < size; y += 1) {
    const row = Buffer.alloc(1 + size * 4);
    for (let x = 0; x < size; x += 1) {
      const idx = 1 + x * 4;
      const margin = Math.floor(size * 0.12);
      const inBorder =
        x >= margin &&
        x < size - margin &&
        y >= margin &&
        y < size - margin &&
        (x < margin + Math.max(2, Math.floor(size * 0.04)) ||
          x >= size - margin - Math.max(2, Math.floor(size * 0.04)) ||
          y < margin + Math.max(2, Math.floor(size * 0.04)) ||
          y >= size - margin - Math.max(2, Math.floor(size * 0.04)));

      const color = inBorder ? fg : bg;
      row[idx] = color[0];
      row[idx + 1] = color[1];
      row[idx + 2] = color[2];
      row[idx + 3] = color[3];
    }
    rows.push(row);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const compressed = zlib.deflateSync(Buffer.concat(rows));
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

fs.mkdirSync(iconsDir, { recursive: true });
fs.writeFileSync(path.join(iconsDir, 'icon-192.png'), createPng(192));
fs.writeFileSync(path.join(iconsDir, 'icon-512.png'), createPng(512));
console.log('Generated PWA icons in public/icons');
