import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import del from 'rollup-plugin-delete';
import pkg from './package.json';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    input: pkg.source,
    output: [
        { file: pkg.main, format: 'cjs' },
        { file: pkg.module, format: 'esm' }
    ],
    plugins: [
        external(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**'
        }),
        del({ targets: ['dist/*'] }),
        postcss({
            plugins: []
          }),
        image(),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
};