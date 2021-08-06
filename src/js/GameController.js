/* eslint-disable no-plusplus */
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
      char: new Team(5, 5).ranking(), level: 0, step: 'user', state: null, scores: 0,
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
    this.gamePlay.drawUi(`${Object.values(themes)[GameState.level]}`);
    const charLoad = this.stateService.load();
    GameState.from({
      level: charLoad[0].level, char: charLoad[0].char, step: charLoad[0].step, state: charLoad[0].state,
    });
    this.gamePlay.redrawPositions(charLoad[0].char);
  }

  onCellClick(index) {
    function play(el) {
      if (el.position === index && (el.character.type === 'bowman' || el.character.type === 'magician' || el.character.type === 'swordsman')) {
        return true;
      } return false;
    }
    function com(el) {
      if (el.position === index && (el.character.type === 'vampire' || el.character.type === 'undead' || el.character.type === 'daemon')) {
        return true;
      } return false;
    }

    const itemComIndex = GameState.char.findIndex(com);
    const itemPlay = GameState.char.find(play);
    const itemCom = GameState.char.find(com);
    if (GameState.step === 'com') {
      const arrCom = [];
      const arrPlay = [];
      let arr = [];
      GameState.char.forEach((el) => {
        if (el.character.type === 'vampire' || el.character.type === 'undead' || el.character.type === 'daemon') {
          arrCom.push(el);
        }
      });
      GameState.char.forEach((el) => {
        if (el.character.type === 'bowman' || el.character.type === 'magician' || el.character.type === 'swordsman') {
          arrPlay.push(el);
        }
      });
      if (arrCom.length === 0) {
        arrPlay.forEach((el) => {
          GameState.scores += el.character.health;
        });
        GamePlay.showMessage(`Вы выиграли и набрали всего ${GameState.scores} очков!`);
      } if (arrPlay === 0) {
        GamePlay.showMessage('Вы проиграли!');
      }
      const chooseCom = Team.shuffle(arrCom);

      arrPlay.forEach((el) => {
        if (GameController.possible(chooseCom[0].character.stepAttack, chooseCom[0].position).find((i) => i === el.position)) {
          arr.push(el);
        }
      });
      if (arr.length > 0) {
        arr = Team.shuffle(arr);

        const damage = Math.max(chooseCom[0].character.attack - arr[0].character.defence, chooseCom[0].character.attack * 0.1);
        arr[0].character.health -= damage;
        this.gamePlay.showDamage(arr[0].position, damage).then(() => {
          if (arr[0].character.health <= 0) {
            GameState.char.splice(GameState.char.indexOf(arr[0]), 1);
          }
          this.gamePlay.redrawPositions(GameState.char);
        });
      } else {
        const moves = Team.shuffle(GameController.possible(chooseCom[0].character.stepMoves, chooseCom[0].position));
        // eslint-disable-next-line prefer-destructuring
        chooseCom[0].position = moves[0];
        this.gamePlay.redrawPositions(GameState.char);
      }

      GameState.step = 'user';
    } else if (itemPlay) {
      GameState.itemPlay = itemPlay;
      GameState.possibleAttack = GameController.possible(itemPlay.character.stepAttack, index);
      GameState.possibleMoves = GameController.possible(itemPlay.character.stepMoves, index);
      if (!GameState.state && GameState.state !== 0) {
        this.gamePlay.selectCell(index);
        GameState.state = index;
      } else {
        this.gamePlay.deselectCell(GameState.state);
        GameState.state = index;
        this.gamePlay.selectCell(index);
      }
    } else if (!itemPlay && !itemCom && GameState.possibleMoves && GameState.possibleMoves.includes(index)) {
      GameState.itemPlay.position = index;
      this.gamePlay.redrawPositions(GameState.char);
      this.gamePlay.deselectCell(GameState.state);
      this.gamePlay.deselectCell(index);
      GameState.state = null;
      GameState.itemPlay = null;
      GameState.possibleAttack = null;
      GameState.possibleMoves = null;
      GameState.step = 'com';
      this.onCellClick(index);
    } else if (itemCom && GameState.possibleAttack && GameState.possibleAttack.includes(index)) {
      const damage = Math.max(GameState.itemPlay.character.attack - itemCom.character.defence, GameState.itemPlay.character.attack * 0.1);
      GameState.itemCom = itemCom;
      GameState.itemCom.character.health -= damage;
      this.gamePlay.showDamage(index, damage).then(() => {
        this.gamePlay.deselectCell(GameState.state);
        this.gamePlay.deselectCell(index);
        if (GameState.itemCom.character.health <= 0) {
          GameState.char.splice(itemComIndex, 1);
        }
        this.gamePlay.redrawPositions(GameState.char);
        GameState.state = null;
        GameState.itemPlay = null;
        GameState.possibleAttack = null;
        GameState.possibleMoves = null;
        GameState.step = 'com';
        this.onCellClick(index);
      });
    } else {
      GamePlay.showError('Недопустимый ход!!!');
    }
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
    function com(el) {
      if (el.position === index && (el.character.type === 'vampire' || el.character.type === 'undead' || el.character.type === 'daemon')) {
        return true;
      } return false;
    }
    const itemCom = GameState.char.find(com);
    if (GameState.possibleMoves && GameState.possibleMoves.includes(index) && GameState.state !== index && !itemCom) {
      this.gamePlay.setCursor(cursors.pointer);
      this.gamePlay.selectCell(index, 'green');
    }
    if (itemCom && GameState.possibleAttack && GameState.possibleAttack.includes(index)) {
      this.gamePlay.setCursor(cursors.crosshair);
      this.gamePlay.selectCell(index, 'red');
    }
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
    this.gamePlay.setCursor(cursors.notallowed);
    this.gamePlay.deselectCell(index);
    if (GameState.state) {
      this.gamePlay.selectCell(GameState.state);
    }
  }

  static possible(stepAttack, index) {
    const arr = [];
    for (let i = 0; i <= stepAttack * 2; i++) {
      let n = index - stepAttack * 9 + i * 8;
      const x = index - stepAttack * 8 + i * 8;
      for (let y = 0; y <= stepAttack * 2; y++) {
        if (Math.trunc(n / 8) === Math.trunc(x / 8) && n >= 0 && n <= 63) {
          arr.push(n++);
        } else { n++; }
      }
    }
    return arr;
  }
}
