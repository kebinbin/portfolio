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
	integrations: [mdx(), icon()],
	vite: {
		plugins: [tailwindcss()]
	}
})
