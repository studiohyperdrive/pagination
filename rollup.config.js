import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import size from 'rollup-plugin-bundle-size';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

export default {
	input: 'lib/index.ts',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
		},
		{
			file: pkg.module,
			format: 'es',
		},
		{
			file: pkg.browser,
			format: 'umd',
			name: 'SHD Pagination',
			globals: {
				'lodash.omit': 'omit',
				qs: 'qs',
			},
		},
	],
	external: [
		...Object.keys(pkg.dependencies || {}),
	],
	plugins: [
		json(),
		typescript({
			typescript: require('typescript'), // eslint-disable-line global-require
		}),
		terser(),
		size(),
	],
};
