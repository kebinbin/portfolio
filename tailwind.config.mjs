/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'selector',
	theme: {
		screens: {
			xs: '480px',
			...defaultTheme.screens
		},
		extend: {
			container: {
				center: true,
				padding: '1.5rem'
			},
			fontFamily: {
				body: ['neue-haas-unica', 'sans-serif'],
				brand: ['neue-haas-unica', 'sans-serif']
			},
			spacing: {
				160: '40rem' /* not used -> remove */,
				240: '60rem' /* not used -> remove */
			},
			gridTemplateColumns: {
				nav: '4fr auto 1fr'
			},
			fontSize: {
				'10xl': '10rem',
				'11xl': '19.125rem' /*not used -> remove */
			},
			lineHeight: {
				18: '4.5rem' /*use this one? It'not in tw dimensions*/,
				20: '5rem',
				27: '6.75rem' /*use this one? It'not in tw dimensions*/,
				32: '8rem'
			},
			letterSpacing: {
				tightest: '-.075em'
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('tailwindcss-opentype')]
}
