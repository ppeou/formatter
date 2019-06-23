import { terser } from 'rollup-plugin-terser';
export default {
  input: './index.js',
  plugins: [terser()],
  output: [{
    name: 'formatter',
    file: './dist/formatter.js',
    format: 'umd'
  },{
    name: 'formatter',
    file: './dist/formatter.esm.js',
    format: 'esm'
  }]
};
