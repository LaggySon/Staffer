/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				JosefinSans: ['Josefin Sans', 'sans-serif'],
				Inter: ['Inter', 'sans-serif']
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
