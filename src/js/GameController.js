/* eslint-disable max-len */
import Team from './Team';
import themes from './themes';
import cursors from './cursors';
import GameState from './GameState';
import GamePlay from './GamePlay';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    this.gamePlay.cellClickListeners = [];
    this.gamePlay.cellEnterListeners = [];
    this.gamePlay.cellLeaveListeners = [];
    GameState.from({
      char: new Team(5, 5).ranking(), level: 0, step: 'user', state: null,
    });

    this.gamePlay.drawUi(`${Object.values(themes)[GameState.level]}`);

    this.gamePlay.redrawPositions(GameState.char);
    this.gamePlay.addNewGameListener(this.init.bind(this));
    this.gamePlay.addLoadGameListener(this.onLoad.bind(this));
    this.gamePlay.addSaveGameListener(this.stateService.save.bind(this.stateService, GameState.save));
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
 
  }

  onLoad() {
    const charLoad = this.stateService.load();

    GameState.from({
      level: charLoad[0].level, char: charLoad[0].char, step: charLoad[0].step, state: charLoad[0].state,
    });
    this.gamePlay.redrawPositions(charLoad[0].char);
  }

  onCellClick(index) {
    function x(el) {
      if (el.position === index && (el.character.type === 'bowman' || el.character.type === 'magician' || el.character.type === 'swordsman')) {
        return true;
      } return false;
    }

    if (GameState.char.find(x)) {
      if (!GameState.state) {
        this.gamePlay.selectCell(index);
        GameState.state = index;
      } else {
        this.gamePlay.deselectCell(GameState.state);
        GameState.state = index;
        this.gamePlay.selectCell(index);
      }
    } else { GamePlay.showError('Не правильный выбор!'); }
  }

  onCellEnter(index) {
    GameState.char.forEach((el) => {
      if (el.position === index) {
        const message = `${String.fromCodePoint(0x1F396)} ${el.character.level} ${String.fromCodePoint(0x2694)} ${el.character.attack} ${String.fromCodePoint(0x1F6E1)} ${el.character.defence} ${String.fromCodePoint(0x2764)} ${el.character.health}`;
        this.gamePlay.showCellTooltip(message, index);
        if (el.character.type === 'bowman' || el.character.type === 'magician' || el.character.type === 'swordsman') {
          this.gamePlay.setCursor(cursors.pointer);
        }
      }
    });
    if (GameState.state) {
      const item = GameState.char.find((el) => el.position === GameState.state);
    }
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
    GameState.char.forEach((el) => {
      if (!(el.character.type === 'bowman' || el.character.type === 'magician' || el.character.type === 'swordsman')) {
        this.gamePlay.setCursor(cursors.auto);
      }
    });
  }

  possibleMove(stepAttack, index) {
    if ((index % 8) - stepAttack >= 0 && (index % 8) + stepAttack <= 8) {
      console.log(stepAttack);
    }
  }
}
