import terser from '@rollup/plugin-terser';

export default {
	input: 'refactorv3/index.js',
	output: {
		file: 'dist/flect.js',
		format: 'iife',
		name: 'Flect'
	},
    plugins: [terser({
		mangle: {
		  properties: {
			reserved: ['connectedCallback', 'render', 'refs', 'effects', 'filters', 'datas', 'component', 'init', 'disconnect', 'context', 'use'],
		  },
		},
	})]
};