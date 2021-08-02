import Bowman from './Persons/Bowman';
import Daemon from './Persons/Daemon';
import Magician from './Persons/Magician';
import Swordsman from './Persons/Swordsman';
import Undead from './Persons/Undead';
import Vampire from './Persons/Vampire';
import { generateTeam } from './generators';

export default class Team {
  constructor(characterCount, maxLevel) {
    // eslint-disable-next-line max-len
    this.characterCount = characterCount;
    this.maxLevel = maxLevel;
    this.allowedTypesPlayer = [new Bowman(), new Magician(), new Swordsman()];
    this.allowedTypesCom = [new Daemon(), new Undead(), new Vampire()];
    this.allowedTypesPlayer.position = [0, 1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57];
    this.allowedTypesCom.position = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
  }

  // eslint-disable-next-line class-methods-use-this
  shuffle(allowedTypes) {
    // eslint-disable-next-line no-plusplus
    for (let i = allowedTypes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // eslint-disable-next-line no-param-reassign
      [allowedTypes[i], allowedTypes[j]] = [allowedTypes[j], allowedTypes[i]];
    }
    return allowedTypes;
  }

  // playerTeam() {
  //   return this.shuffle(this.allowedTypesPlayer);
  // }

  // comTeam() {
  //   return this.shuffle(this.allowedTypesCom);
  // }

  playerPos() {
    return this.shuffle(this.allowedTypesPlayer.position);
  }

  comPos() {
    return this.shuffle(this.allowedTypesCom.position);
  }

  ranking() {
    this.playerPos();
    // eslint-disable-next-line max-len
    const p = generateTeam(this.shuffle(this.allowedTypesPlayer), this.maxLevel, this.characterCount);

    this.comPos();
    const c = generateTeam(this.shuffle(this.allowedTypesCom), this.maxLevel, this.characterCount);

    return [...p, ...c];
  }
}
