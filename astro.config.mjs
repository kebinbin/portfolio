import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
	i18n: {
		defaultLocale: 'en',
		locales: ['es', 'en']
		// routing: {
		//   prefixDefaultLocale: false,
		// },
	},
	markdown: {
		// Shiki runs at BUILD time — code ships as pre-highlighted static HTML,
		// zero client JS. Dual themes emit CSS vars (--shiki-light/--shiki-dark);
		// global.css swaps them on the `.dark` class. Token colors come from the
		// themes; the panel background is overridden to sit in the retro palette.
		shikiConfig: {
			themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
			wrap: false
		}
	},
	integrations: [mdx(), icon()],
	vite: {
		plugins: [tailwindcss()]
	}
})
