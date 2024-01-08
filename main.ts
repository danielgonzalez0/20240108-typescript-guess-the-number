import './style.css';

const GAME_CONTAINER: HTMLElement | null =
  document.querySelector('#game-container');

class Game {
  static MIN_NUMBER: number = 0;
  static MAX_NUMBER: number = 500;

  startElement: GameStart;

  constructor(){
    this.startElement = new GameStart()
  }

    init() {
    this.startElement.initDisplayStart()
    }
}

class GameStart {
  element: HTMLElement | null;
  constructor() {
    this.element = document.createElement('div');
    this.element.setAttribute('id', 'game-start');
    GAME_CONTAINER?.appendChild(this.element);
  }

  initDisplayStart() {
    const paragraph: HTMLElement = document.createElement('p');
    paragraph.innerText =
      'The application will generate a random number, and your task is to find it in as few attempts as possible.';
    this.element?.appendChild(paragraph);
    const startButton = document.createElement('button');
    startButton.setAttribute('id', 'start');
    startButton.innerText = 'start';
    this.element?.appendChild(startButton);
  }
}

const game = new Game();
game.init();
