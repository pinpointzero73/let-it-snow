/**
 * Rollup Configuration for Festive Snow
 *
 * Builds UMD and ESM bundles with minified versions for production use.
 * CSS is extracted and bundled separately.
 */

import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-css-only';
import {readFileSync} from 'fs';

// Read version from package.json
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

const banner = `/**
 * Festive Snow Effect v${pkg.version}
 * Canvas-based festive snow with Santa, reindeer, and decorated trees
 *
 * @author ${pkg.author}
 * @license ${pkg.license}
 * @see ${pkg.repository?.url || 'https://github.com/yourusername/festive-snow'}
 */`;

export default [
  // ESM build (unminified)
  {
    input: 'src/index.js',
    output: {
      file: 'dist/festive-snow.esm.js',
      format: 'es',
      banner,
      sourcemap: true
    },
    plugins: [
      css({output: 'festive-snow.css'})
    ]
  },

  // ESM build (minified)
  {
    input: 'src/index.js',
    output: {
      file: 'dist/festive-snow.esm.min.js',
      format: 'es',
      banner,
      sourcemap: true
    },
    plugins: [
      css({output: false}), // CSS already output in unminified build
      terser({
        format: {
          comments: /^!/,
          preamble: banner
        }
      })
    ]
  },

  // UMD build (unminified) - for direct browser usage
  {
    input: 'src/index.js',
    output: {
      file: 'dist/festive-snow.js',
      format: 'umd',
      name: 'FestiveSnow',
      banner,
      sourcemap: true,
      exports: 'named'
    },
    plugins: [
      css({output: false}) // CSS already output in ESM build
    ]
  },

  // UMD build (minified) - for production browser usage
  {
    input: 'src/index.js',
    output: {
      file: 'dist/festive-snow.min.js',
      format: 'umd',
      name: 'FestiveSnow',
      banner,
      sourcemap: true,
      exports: 'named'
    },
    plugins: [
      css({output: false}), // CSS already output in ESM build
      terser({
        format: {
          comments: /^!/,
          preamble: banner
        }
      })
    ]
  }
];
