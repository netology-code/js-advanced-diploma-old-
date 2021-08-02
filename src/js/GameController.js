import Team from './Team';
import themes from './themes';
import cursors from './cursors';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.char = [];
    this.state = {
      
    };
  }

  init() {
    this.gamePlay.cellClickListeners = [];
    this.gamePlay.cellEnterListeners = [];
    this.gamePlay.cellLeaveListeners = [];
   
    
    this.state = {
      level: 0,
      step: true,
    };
    this.gamePlay.drawUi(`${Object.values(themes)[this.state.level]}`);
    this.char = new Team(5, 5).ranking();

    this.gamePlay.redrawPositions(this.char);
    this.gamePlay.addNewGameListener(this.init.bind(this));
    this.gamePlay.addLoadGameListener(this.onLoad.bind(this));
    this.gamePlay.addSaveGameListener(this.stateService.save.bind(this.stateService, this.char));
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onLoad() {
    const charLoad = this.stateService.load();
    this.gamePlay.redrawPositions(charLoad);
    this.char = charLoad;
  }

  onCellClick(index) {
    function x(el) {
      if (el.position === index && (el.character.type === 'bowman' || el.character.type === 'magician' || el.character.type === 'swordsman')) {
        return true;
      } return false;
    }
    
    if (this.char.find(x)) {
      if (this.state.index === index) {
        this.gamePlay.deselectCell(index);
        this.state.index = null;
      } else if (this.state.index >= 0) {
        this.gamePlay.deselectCell(this.state.index);
        this.state.index = index;
        this.gamePlay.selectCell(index);
      } else {
        this.gamePlay.selectCell(index);
        this.state.index = index;
      }
    } else { this.gamePlay.showError('Не правильный выбор!'); }
  }

  onCellEnter(index) {
    this.char.forEach((el) => {
      if (el.position === index) {
        const message = `${String.fromCodePoint(0x1F396)} ${el.character.level} ${String.fromCodePoint(0x2694)} ${el.character.attack} ${String.fromCodePoint(0x1F6E1)} ${el.character.defence} ${String.fromCodePoint(0x2764)} ${el.character.health}`;
        this.gamePlay.showCellTooltip(message, index);
        if (this.state.index &&   (el.character.type === 'bowman' || el.character.type === 'magician' || el.character.type === 'swordsman')) {
          this.gamePlay.setCursor(cursors.pointer);
        }
      }
    });
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
    this.char.forEach((el) => {
      if (this.state.index &&   !(el.character.type === 'bowman' || el.character.type === 'magician' || el.character.type === 'swordsman')) {
        this.gamePlay.setCursor(cursors.auto);
      }
    });
  }
}
