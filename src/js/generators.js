import PositionedCharacter from './PositionedCharacter';
/**
 *
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
export function* positionGenerator(positions) {
  for (const position of positions) {
    yield position;
  }
}
export function* characterGenerator(allowedTypes, maxLevel) {
  while (true) {
    const item = Object.create(allowedTypes[Math.floor(Math.random() * 3)]);
    item.level = Math.floor(Math.random() * maxLevel) + 1;

    yield item;
  }
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const item = characterGenerator(allowedTypes, maxLevel);
  const pos = positionGenerator(allowedTypes.position);
  const arr = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < characterCount; i++) {
    const char = new PositionedCharacter(item.next().value, pos.next().value);
    arr[i] = char;
  }
  return arr;
}
