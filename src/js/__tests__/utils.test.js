import { calcTileType } from '../utils';

describe.each([
  { a: 0, b: 8, expected: 'top-left' },
  { a: 7, b: 8, expected: 'top-right' },
  { a: 5, b: 8, expected: 'top' },
  { a: 8, b: 8, expected: 'left' },
  { a: 15, b: 8, expected: 'right' },
  { a: 18, b: 8, expected: 'center' },
  { a: 56, b: 8, expected: 'bottom-left' },
  { a: 63, b: 8, expected: 'bottom-right' },
  { a: 60, b: 8, expected: 'bottom' },
])('.add($a, $b)', ({ a, b, expected }) => {
  test(`returns ${expected}`, () => {
    expect(calcTileType(a, b)).toBe(expected);
  });
});
