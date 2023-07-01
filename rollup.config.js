import terser from '@rollup/plugin-terser';

export default {
	input: 'src/bundle.js',
	output: {
		file: 'dist/composite.js',
		format: 'iife'
	},
    plugins: [terser()]
};