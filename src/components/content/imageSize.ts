import { existsSync, openSync, readSync, closeSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Build-time intrinsic size for an image in `public/`, so content <img> tags can
 * carry width/height and the browser reserves the right box before the file
 * loads (no layout shift). Purely an aspect-ratio hint — the components still
 * size with `w-full h-auto`, which overrides the attributes at render time.
 *
 * Dependency-free on purpose: the repo builds on Cloudflare with a frozen
 * bun.lockb, and adding a package to read four numbers is not worth the
 * lockfile risk (see CLAUDE.md Gotchas). Every asset here is webp; png and jpeg
 * are handled too so this keeps working if a future capture is not converted.
 */
export type ImageSize = { width: number; height: number } | null

const cache = new Map<string, ImageSize>()

function readHeader(path: string, bytes = 64): Buffer | null {
	try {
		const fd = openSync(path, 'r')
		const buf = Buffer.alloc(bytes)
		const read = readSync(fd, buf, 0, bytes, 0)
		closeSync(fd)
		return read > 0 ? buf.subarray(0, read) : null
	} catch {
		return null
	}
}

function webp(b: Buffer): ImageSize {
	if (b.length < 30 || b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP')
		return null
	const kind = b.toString('ascii', 12, 16)
	// Lossy: dimensions sit after the 0x9D 0x01 0x2A keyframe start code.
	if (kind === 'VP8 ')
		return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff }
	// Lossless: 14 bits each, minus one, packed across four bytes.
	if (kind === 'VP8L') {
		const b0 = b[21]!,
			b1 = b[22]!,
			b2 = b[23]!,
			b3 = b[24]!
		return {
			width: 1 + (((b1 & 0x3f) << 8) | b0),
			height: 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6))
		}
	}
	// Extended: 24-bit canvas size, minus one.
	if (kind === 'VP8X')
		return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) }
	return null
}

function png(b: Buffer): ImageSize {
	if (b.length < 24 || b.readUInt32BE(0) !== 0x89504e47) return null
	return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) }
}

function jpeg(path: string): ImageSize {
	const b = readHeader(path, 65536)
	if (!b || b[0] !== 0xff || b[1] !== 0xd8) return null
	let i = 2
	while (i < b.length - 9) {
		if (b[i] !== 0xff) {
			i++
			continue
		}
		const marker = b[i + 1]!
		// SOF0–SOF15, excluding the non-frame markers DHT/JPG/DAC.
		if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc)
			return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) }
		i += 2 + b.readUInt16BE(i + 2)
	}
	return null
}

/** `src` is a public-root path like `/assets/projects/case-study-1/x.webp`. */
export function getImageSize(src: string): ImageSize {
	if (!src || !src.startsWith('/')) return null
	if (cache.has(src)) return cache.get(src)!

	const path = join(process.cwd(), 'public', src.split('?')[0]!)
	let size: ImageSize = null
	if (existsSync(path)) {
		const head = readHeader(path)
		if (head) size = webp(head) ?? png(head) ?? jpeg(path)
	}
	cache.set(src, size)
	return size
}
