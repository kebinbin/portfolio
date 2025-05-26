import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
	i18n: {
		defaultLocale: 'en',
		locales: ['es', 'en']
		// routing: {
		//   prefixDefaultLocale: false,
		// },
	},
	integrations: [mdx()],
	vite: {
		plugins: [tailwindcss()]
	}
})
