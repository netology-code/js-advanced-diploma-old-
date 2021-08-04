export default class GameState {
  static from(object) {
    this.level = object.level;
    this.char = object.char;
    this.step = object.step;
    this.state = object.state;
    this.save = [{
      level: this.level, char: this.char, step: this.step, state: this.state,
    }];
    return null;
  }
}
