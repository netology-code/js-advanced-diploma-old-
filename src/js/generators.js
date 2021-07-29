/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */

export function* characterGenerator(allowedTypes, maxLevel) {
  // eslint-disable-next-line no-plusplus

  while (true) {
    const item = allowedTypes[Math.floor(Math.random() * 6)];
    item.level = Math.floor(Math.random() * maxLevel) + 1;
    yield item;
  }
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const item = characterGenerator(allowedTypes, maxLevel);
  const arr = [];
  for (let i = 0; i < characterCount; i++) {
    arr[i] = item.next();
   
  }
  return arr;
}
