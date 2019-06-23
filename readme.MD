# Formatter

Formatter is a JS library to format json object  into a string base on pre-defined format.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install @ppeou/formatter.

```bash
npm install @ppeou/formatter
```

## Usage

ES6 Style:
```
<script type="module">
  import formatter from './formatter.esm.js'

  const mapper = {
    '%a1': 'address1', '%a2': 'address2',
    '%c': 'city', '%s': 'state', '%z': 'zip', '%p': 'phone'
  };
  const format = '%a1\n%a2\n%c, %s %z \n%p\n\nMail To:\n\t%a1, %c, %s %z';
  const fm = formatter({mapper, format});
  let [input, output] = [];
  input = {
    address1: '1234 Main St', address2: 'Apt #301',
    city: 'Houston', state: 'Texas', zip: '77001',
    phone: '800-123-4000'
  };
  output = fm(input);
  console.log(output); /* ouput:
                          1234 Main St
                          Apt #301
                          Houston, Texas 77001 
                          800-123-4000
  
                          Mail To:
                          1234 Main St, Houston, Texas 77001 */

  input = {city: 'Houston', state: 'Texas', phone: '800-123-4000'};
  output = fm(input);
  console.log(output);  /* output:
                          

                          Houston, Texas  
                          800-123-4000

                          Mail To:
                            , Houston, Texas */

</script>
```

CommonJS / Node
```
const formatter = require('./formatter');

const mapper = {
  '%a1': 'address1', '%a2': 'address2',
  '%c': 'city', '%s': 'state', '%z': 'zip', '%p': 'phone'
};
const format = '%a1\n%a2\n%c, %s %z \n%p\n\nMail To:\n\t%a1, %c, %s %z';
const fm = formatter({mapper, format});
let [input, output] = [];
input = {
  address1: '1234 Main St', address2: 'Apt #301',
  city: 'Houston', state: 'Texas', zip: '77001',
  phone: '800-123-4000'
};
output = fm(input);
console.log(output);

input = {city: 'Houston', state: 'Texas', phone: '800-123-4000'};
output = fm(input);
console.log(output);
```

ES5/Javascript
```
<script src="node_modules/@ppeou/dist/formatter.js" type="text/javascript"></script>
<script>
  const mapper = {
    '%a1': 'address1', '%a2': 'address2',
    '%c': 'city', '%s': 'state', '%z': 'zip', '%p': 'phone'
  };
  const format = '%a1\n%a2\n%c, %s %z \n%p\n\nMail To:\n\t%a1, %c, %s %z';
  const fm = formatter({mapper, format});
  let [input, output] = [];
  input = {
    address1: '1234 Main St', address2: 'Apt #301',
    city: 'Houston', state: 'Texas', zip: '77001',
    phone: '800-123-4000'
  };
  output = fm(input);
  console.log(output);

  input = {city: 'Houston', state: 'Texas', phone: '800-123-4000'};
  output = fm(input);
  console.log(output);
</script>
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
