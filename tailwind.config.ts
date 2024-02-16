import type { Config } from 'tailwindcss'

export default {
	content: ['./src/**/*.tsx'],
	theme: {
		extend: {
			colors: { brand: '#9EB1FF' }
		}
	},
	plugins: []
} satisfies Config
