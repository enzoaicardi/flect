import terser from '@rollup/plugin-terser';

export default {
	input: 'src/bundle.js',
	output: {
		file: 'dist/flect.js',
		format: 'iife'
	},
    plugins: [terser()]
};