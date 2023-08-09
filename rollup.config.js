import terser from '@rollup/plugin-terser';

export default {
	input: 'src/define.js',
	output: {
		file: 'dist/flect.js',
		format: 'iife'
	},
    plugins: [terser({
		mangle: {
		  properties: {
			reserved: ['ref', 'refs', 'effect', 'filter', 'iterable', 'datas', 'component', 'custom', 'body'],
		  },
		},
	})]
};