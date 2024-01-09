import { GameBoard } from './src/components/Game/GameBoard';
import { GameStart } from './src/components/Game/GameStart';
import './style.css';

export const GAME_CONTAINER: HTMLElement | null =
  document.querySelector('#game-container');

export class Game {
  static MIN_NUMBER: number = 0;
  static MAX_NUMBER: number = 500;

  startElement: GameStart;
  boardElement: GameBoard;

  constructor() {
    this.startElement = new GameStart();
    this.boardElement = new GameBoard(Game.MIN_NUMBER, Game.MAX_NUMBER);
  }

  init() {
    this.startElement.initDisplayStart();
    this.boardElement.initBoard();
    const startButton: HTMLElement | null = document.querySelector('#start');
    startButton?.addEventListener('click', () => {
      if (this.startElement.element)
        this.startElement.element.classList.add('hidden');
      if (this.boardElement.board)
        this.boardElement.board.classList.remove('hidden');
    });
  }
}





const game = new Game();
game.init();
