module.exports = {
	purge: [
		"./views/**/*",
		"./assets/**/*"
	],
	theme: {},
	variants: {},
	plugins: [
		require('@tailwindcss/typography'),
	],
	corePlugins: {},
};
