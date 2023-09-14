import terser from '@rollup/plugin-terser';

export default {
	input: 'refactorv2/define.js',
	output: {
		file: 'dist/flect.js',
		format: 'iife',
		name: 'Flect'
	},
    plugins: [terser({
		mangle: {
		  properties: {
			reserved: ['ref', 'refs', 'effect', 'filter', 'iterable', 'datas', 'component', 'custom', 'body'],
		  },
		},
	})]
};