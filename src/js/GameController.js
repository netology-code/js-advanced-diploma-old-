import { characterGenerator, generateTeam } from './generators';
import Team from './Team';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    this.gamePlay.drawUi('prairie');
    const q = new Team();
    const maxLevel = 5;
    // const x = characterGenerator(q, maxLevel);
    // x.next();
    generateTeam(q.shuffle(), maxLevel, 10);

    //  this.gamePlay.redrawPositions(x.next());
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
