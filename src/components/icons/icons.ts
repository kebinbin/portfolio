import { iconPaths } from './IconPaths'
import { artwork } from './artwork'

/**
 * Central icon registry — the single source of truth for every icon in the app.
 * Consumers use <Icon name="…" /> and never import an icon library directly; this
 * map hides where each glyph actually comes from. Three sources:
 *
 * - `iconify`  → a brand/tech logo from the Iconify `simple-icons` set, rendered
 *                via astro-icon. Filled, monochrome (currentColor).
 * - `phosphor` → a stroke-drawn UI icon (Phosphor), body lives in IconPaths.ts.
 * - `svg`      → custom inline artwork (viewBox + currentColor body), see artwork.ts.
 *
 * `size: 'lg'` marks the company logos that render larger than the toolkit row.
 */
export type IconDef =
	| { source: 'iconify'; id: string; label: string; size?: 'lg' }
	| { source: 'phosphor'; body: string; label: string; size?: 'lg' }
	| { source: 'svg'; viewBox: string; body: string; label: string; size?: 'lg' }

export const icons = {
	// — UI icons (Phosphor, stroke) —
	list: { source: 'phosphor', body: iconPaths['list'], label: 'Menu' },
	// Replaces a literal "↗" (U+2197): iOS/Android substitute the emoji glyph
	// for that codepoint, so the character rendered full-color and off-baseline
	// on phones. An inline SVG is the only way to guarantee the mark.
	'arrow-up-right': {
		source: 'phosphor',
		body: iconPaths['arrow-up-right'],
		label: 'Opens in a new tab'
	},
	github: { source: 'phosphor', body: iconPaths['github-logo'], label: 'GitHub' },
	linkedin: { source: 'phosphor', body: iconPaths['linkedin-logo'], label: 'LinkedIn' },

	// — Filled brand marks (Simple Icons) — the classic solid glyphs, opposite
	// style of the outlined Phosphor pair above (filled Octocat / filled "in"
	// badge with the letters cut out as negative space, instead of a stroked
	// outline with separate letter strokes).
	'github-filled': { source: 'iconify', id: 'simple-icons:github', label: 'GitHub' },
	'linkedin-filled': { source: 'iconify', id: 'simple-icons:linkedin', label: 'LinkedIn' },

	// — Company logos —
	hp: { source: 'iconify', id: 'simple-icons:hp', label: 'HP', size: 'lg' },
	hpe: { source: 'svg', ...artwork.hpe, label: 'Hewlett Packard Enterprise', size: 'lg' },

	// — Toolkit (tech logos) —
	react: { source: 'iconify', id: 'simple-icons:react', label: 'React' },
	typescript: { source: 'iconify', id: 'simple-icons:typescript', label: 'TypeScript' },
	java: { source: 'svg', ...artwork.java, label: 'Java' },
	'spring-boot': { source: 'iconify', id: 'simple-icons:springboot', label: 'Spring Boot' },
	docker: { source: 'iconify', id: 'simple-icons:docker', label: 'Docker' },
	sql: { source: 'svg', ...artwork.database, label: 'SQL' },
	git: { source: 'iconify', id: 'simple-icons:git', label: 'Git' },
	tailwind: { source: 'iconify', id: 'simple-icons:tailwindcss', label: 'Tailwind CSS' },
	linux: { source: 'iconify', id: 'simple-icons:linux', label: 'Linux' },
	figma: { source: 'iconify', id: 'simple-icons:figma', label: 'Figma' }
} satisfies Record<string, IconDef>

export type IconName = keyof typeof icons
