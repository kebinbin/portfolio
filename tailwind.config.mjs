/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'selector',
	theme: {
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
				160: '40rem',
				240: '60rem'
			},
			gridTemplateColumns: {
				nav: '4fr auto 1fr'
			},
			fontSize: {
				'10xl': '10rem',
				'11xl': '19.125rem'
			},
			lineHeight: {
				18: '4.5rem',
				20: '5rem',
				27: '6.75rem',
				32: '8rem'
			},
			letterSpacing: {
				tightest: '-.075em'
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('tailwindcss-opentype')]
}
