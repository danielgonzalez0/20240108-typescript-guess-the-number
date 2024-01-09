import { GAME_CONTAINER, Game } from "../../../main";
import { ChoicesBoard } from "./ChoicesBoard";
import { GameForm } from "./GameForm";

export class GameBoard {
  min: number;
  max: number;
  score: number;
  _randomNumber: number | null;
  board: HTMLElement | null;
  form: GameForm;
  resultElement: HTMLElement;
  choicesBoard: ChoicesBoard;
  restartButton: HTMLButtonElement;
  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
    this.score = 0;
    this._randomNumber = null;
    this.form = new GameForm(this.min, this.max);
    this.choicesBoard = new ChoicesBoard(this.min, this.max);
    this.board = document.createElement('div');
    this.board.setAttribute('id', 'game-board');
    this.board.classList.add('hidden');
    this.resultElement = document.createElement('div');
    this.restartButton = document.createElement('button');
    GAME_CONTAINER?.appendChild(this.board);
  }

  get randomNumber() {
    return this._randomNumber;
  }

  restart() {
    this.setRandomNumber();
    this.score = 0;
    const score: HTMLElement | null = document.querySelector('#score');
    if (score) score.innerText = `${this.score}`;
    this.resultElement.classList.add('hidden');
    this.restartButton.classList.add('hidden');

    const numberInput: HTMLInputElement | null =
      document.querySelector('#number');
    if (numberInput) numberInput.value = '';
    this.choicesBoard.clearChoices();
  }

  setRandomNumber() {
    this._randomNumber =
      Math.floor(Math.random() * (Game.MAX_NUMBER - Game.MIN_NUMBER + 1)) +
      Game.MIN_NUMBER;
  }

  setCounter() {
    this.score++;
    const score: HTMLElement | null = document.querySelector('#score');
    if (score) {
      score.innerText = `score : ${this.score}`;
    }
  }

  displayResult(playerChoice: number) {
    if (playerChoice === this.randomNumber) {
      this.resultElement.innerText = `🟢 You found my guess, it's ${this.randomNumber}`;
      this.restartButton.classList.remove('hidden');
    }

    if (this.randomNumber !== null && playerChoice < this.randomNumber)
      this.resultElement.innerText = `🔴 My guess is above ${playerChoice}`;

    if (this.randomNumber !== null && playerChoice > this.randomNumber)
      this.resultElement.innerText = `🔴 My guess is below ${playerChoice}`;

    this.resultElement.classList.remove('hidden');
  }

  initBoard() {
    this.setRandomNumber();
    const title = document.createElement('p');
    const score = document.createElement('p');
    title.innerText = `I generated a number between ${this.min} and ${this.max}, try to find it 😆`;
    score.innerText = `score : ${this.score}`;
    score.id = 'score';
    score.classList.add('score');

    //form
    this.form.initForm();
    this.form.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.form.handleSubmitForm();
      if (this.form.isInputTrue) {
        this.setCounter();
        this.displayResult(Number(this.form.playerInput));
        if (this.randomNumber !== null) {
          this.choicesBoard.showChoices(
            this.randomNumber,
            Number(this.form.playerInput)
          );
        }
      }
    });

    //result
    this.resultElement = document.createElement('div');
    this.resultElement.id = 'game-result';
    this.resultElement.classList.add('hidden');

    //board
    this.choicesBoard.initChoicesBoard();

    //restart
    this.restartButton = document.createElement('button');
    this.restartButton.classList.add('hidden');
    this.restartButton.innerText = 'restart';
    this.restartButton.id = 'restart';
    this.restartButton.addEventListener('click', () => {
      this.restart();
    });

    //append element
    if (this.board) {
      this.board.appendChild(title);
      this.board.appendChild(score);
      this.board.appendChild(this.form.form);
      this.board.appendChild(this.resultElement);
      this.board.appendChild(this.choicesBoard.element);
      this.board.appendChild(this.restartButton);
    }
  }
}
