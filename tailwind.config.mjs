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
				body: ['Helvetica Neue'],
				brand: ['Teko']
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
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
}
