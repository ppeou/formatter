import { terser } from 'rollup-plugin-terser';
export default {
  input: './index.js',
  plugins: [terser()],
  output: [{
    name: 'Formatter',
    file: './dist/formatter.js',
    format: 'umd'
  },{
    name: 'Formatter',
    file: './dist/formatter.umd.js',
    format: 'umd'
  },{
    name: 'Formatter',
    file: './dist/formatter.esm.js',
    format: 'esm'
  }]
};
