import Bowman from './Persons/Bowman';
import Daemon from './Persons/Daemon';
import Magician from './Persons/Magician';
import Swordsman from './Persons/Swordsman';
import Undead from './Persons/Undead';
import Vampire from './Persons/Vampire';

export default class Team {
  constructor() {
    // eslint-disable-next-line max-len
    this.allowedTypes = [new Bowman(), new Daemon(), new Magician(), new Swordsman(), new Undead(), new Vampire()];
  }

  shuffle() {
    for (let i = this.allowedTypes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // eslint-disable-next-line no-param-reassign
      [this.allowedTypes[i], this.allowedTypes[j]] = [this.allowedTypes[j], this.allowedTypes[i]];
    }
    return this.allowedTypes;
  }
}
