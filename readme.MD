# Formatter

Formatter is a JS library to format json object  into a string base on pre-defined format.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install @ppeou/formatter.

```bash
npm install @ppeou/formatter
```

## Usage

```ecma script level 4
<script type="module">
  import Formatter from '@ppeou/formatter';
  
  const mapper = {'%c': 'city', '%s': 'state', '%z': 'zipcode'};
  const format = '%c, %s %z';
  const formatter = Formatter({mapper, format});
  const input = {city: 'Houston', state: 'Texas', zipcode: '77001'};
  const output = formatter(input);
  console.log(output);

</script>
```
