/* eslint-disable no-new */
import Character from '../Character';
import Bowman from '../Persons/Bowman';

test('Creation of the "Character" class - error', () => {
  function test() {
    new Character();
  }
  expect(test).toThrowError('You cannot use the "Character" class, inherit from it.');
});
test('Creation of the "Character" class - norm', () => {
  function test() {
    new Bowman();
  }
  expect(test).not.toThrowError('You cannot use the "Character" class, inherit from it.');
});
