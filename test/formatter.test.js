import assert from 'assert';
import Formatter from '../index.js';

console.clear();

describe('Test Formatter', () => {
  describe('1. Test Formatter', () => {
    it('1.1. Formatter() is returning function', () => {
      const formatter = Formatter();
      assert.strictEqual(typeof formatter, 'function');
    });
  });

  describe('2. Test Formatter return string when no format or/and mapper', () => {
    it('2.1. test Formatter without format and mapper', () => {
      const formatter = Formatter();
      const input = 'no formatter';
      const actual = formatter(input);
      assert.strictEqual(input, actual);
    });
    it('2.2. test Formatter with only format', () => {
      const formatter = Formatter({format: '%a [%b] %c'});
      const input = 'no formatter';
      const actual = formatter(input);
      assert.strictEqual(input, actual);
    });
    it('2.3. test Formatter with only mapper', () => {
      const formatter = Formatter({mapper: {'%a': 'city', '%b': 'state', '%c': 'zip'}});
      const input = 'no formatter';
      const actual = formatter(input);
      assert.strictEqual(input, actual);
    });
    it('2.4. test input as string', () => {
      const formatter = Formatter();
      const input = 'this is sample test';
      const actual = formatter(input);
      assert.strictEqual(input, actual);
    });
    it('2.5. test input as number', () => {
      const formatter = Formatter();
      const input = 0;
      const expected = '0';
      const actual = formatter(input);
      assert.strictEqual(expected, actual);
    });
    it('2.6. test input as json', () => {
      const formatter = Formatter();
      const input = {a: 1, b: 2};
      const expected = '[object Object]';
      const actual = formatter(input);
      assert.strictEqual(expected, actual);
    });
    it('2.7. test input as date', () => {
      const formatter = Formatter();
      const input = new Date(2001, 1, 20, 0, 0, 0, 0);
      const expected = input.toString();
      const actual = formatter(input);
      assert.strictEqual(expected, actual);
    });
    it('2.8. test input as null, undefined, NaN, Infinity, isFinite, isNaN, {}, []', () => {
      const formatter = Formatter();
      const pairs = [
        [null, ''],
        [undefined, ''],
        [NaN, 'NaN'],
        [Infinity, 'Infinity'],
        [isFinite, 'function isFinite() { [native code] }'],
        [isNaN, 'function isNaN() { [native code] }'],
        [{}, '[object Object]'],
        [new Object(), '[object Object]'],
        [[], '']];

      let actual;
      pairs.map(([input, expected]) => {
        actual = formatter(input);
        assert.strictEqual(expected, actual);
      });
    });
  });

  describe('3. Test Formatter with Format and Mapper', () => {
    it('3.1. Test Formatting City, State Zip', () => {
      const mapper = {'%c': 'city', '%s': 'state', '%z': 'zipcode'};
      const format = '%c, %s %z';
      const formatter = Formatter({mapper, format});
      const input = {city: 'Houston', state: 'Texas', zipcode: '77001'};
      const expected = `${input.city}, ${input.state} ${input.zipcode}`;
      const actual = formatter(input);
      assert.strictEqual(expected, actual);
    });

    it('3.2. Test Formatting Hyperlink Tag', () => {
      const mapper = {'%l': 'link', '%t': 'text'};
      const format = '<a href="%l">%t</a>';
      const formatter = Formatter({mapper, format});
      const input = {link: 'https://google.com', text: 'Google'};
      const expected = `<a href="${input.link}">${input.text}</a>`;
      const actual = formatter(input);
      assert.strictEqual(expected, actual);
    });

    it('3.3. Test Formatting Percentage', () => {
      const mapper = {'%v': 'pct', '%t': 'status'};
      const format = 'it is %v% %t';
      const formatter = Formatter({mapper, format});
      const input = {pct: 50, status: 'Completed'};
      const expected = `it is ${input.pct}% ${input.status}`;
      const actual = formatter(input);
      assert.strictEqual(expected, actual);
    });

    it('3.4. Test Formatting %%', () => {
      const mapper = {'%v': 'pct', '%t': 'status'};
      const format = 'it is %%v %%t';
      const formatter = Formatter({mapper, format});
      const input = {pct: 50, status: 'Completed'};
      const expected = `it is %${input.pct} %${input.status}`;
      const actual = formatter(input);
      assert.strictEqual(expected, actual);
    });
  });

  describe('4. Test Formatter with Missing JSON Field', () => {
    it('4.1. Test Formatting City, State Zip', () => {
      const mapper = {'%a': 'address', '%c': 'city', '%s': 'state', '%z': 'zipcode'};
      const format = '%a \n %c, %s %z';
      const formatter = Formatter({mapper, format});
      const input = {city: 'Houston', state: 'Texas', zipcode: '77001'};
      const expected = `${input.city}, ${input.state} ${input.zipcode}`;
      const actual = formatter(input);
      assert.strictEqual(expected, actual);
    });
  });
});

