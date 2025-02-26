import { defineConfig } from 'astro/config'

// import tailwind from "@astrojs/tailwind";
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
	i18n: {
		defaultLocale: 'en',
		locales: ['es', 'en']
		// routing: {
		//   prefixDefaultLocale: false,
		// },
	},
	integrations: [],
	vite: {
		plugins: [tailwindcss()]
	}
})
