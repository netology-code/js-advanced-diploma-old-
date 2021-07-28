/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */

export function* characterGenerator(allowedTypes, maxLevel) {
  // eslint-disable-next-line no-plusplus

  for (const item of allowedTypes) {
    item.level = Math.floor(Math.random() * maxLevel) + 1;

    yield item;
  }
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const item = characterGenerator(allowedTypes, maxLevel);
  for (let i = 0; i < characterCount; i++) {
    console.log(item.next(), item.level);
    // item.next();
  }
}
