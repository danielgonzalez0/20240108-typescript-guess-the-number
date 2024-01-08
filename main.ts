import './style.css';

const GAME_CONTAINER: HTMLElement | null =
  document.querySelector('#game-container');

class Game {
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

class GameBoard {
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
class GameForm {
  min: number;
  max: number;
  playerInput: string | null;
  isInputTrue: boolean;
  form: HTMLFormElement;
  errorSpan: HTMLSpanElement;
  instructionSpan: HTMLElement;

  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
    this.playerInput = null;
    this.isInputTrue = true;
    this.form = document.createElement('form');
    this.errorSpan = document.createElement('span');
    this.errorSpan.id = 'error';
    this.errorSpan.classList.add('hidden');
  }

  initForm() {
    this.displayForm();
  }

  displayForm() {
    // Création du formulaire
    this.form.id = 'myForm';

    // Création du label
    const label: HTMLElement = document.createElement('label');
    label.setAttribute('for', 'number');
    label.textContent = 'Your guess :';

    // Création du conteneur flex
    const flexContainer: HTMLElement = document.createElement('div');
    flexContainer.classList.add('flex-container');

    // Création de l'input
    const input: HTMLInputElement = document.createElement('input');
    input.type = 'text';
    input.id = 'number';
    input.name = 'number';
    input.placeholder = '55';

    input.addEventListener('focus', () => {
      this.errorSpan.innerText = '';
      this.errorSpan.classList.add('hidden');

      this.instructionSpan.classList.remove('hidden');
    });

    // Création du bouton
    const button: HTMLButtonElement = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'submit';

    // Création du span
    this.instructionSpan = document.createElement('span');
    this.instructionSpan.id = 'instruction';
    this.instructionSpan.textContent = 'Enter your guessing number';

    // Ajout des éléments au DOM
    this.form.appendChild(label);
    this.form.appendChild(flexContainer);
    flexContainer.appendChild(input);
    flexContainer.appendChild(button);
    this.form.appendChild(this.instructionSpan);
    this.form.appendChild(this.errorSpan);
  }

  handleSubmitForm() {

    const formData = new FormData(this.form);
    const inputValue = formData.get('number');

    const convertInputValue = Number(inputValue);

    try {
      if (
        inputValue !== null &&
        (inputValue === '' ||
          Number.isNaN(Number(inputValue)) ||
          convertInputValue < this.min ||
          convertInputValue > this.max)
      ) {
        this.isInputTrue = false;
        throw new Error(
          `Please enter a number between ${this.min} and ${this.max}`
        );
      } else {
        this.isInputTrue = true;
        return (this.playerInput = `${inputValue}`);
      }
    } catch (error) {
      this.errorSpan.innerText = error.message;
      this.errorSpan.classList.remove('hidden');
      this.instructionSpan.classList.add('hidden');
    }
  }
}

class ChoicesBoard {
  min: number;
  max: number;
  currentChoice: number | null;
  element: HTMLElement;

  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
    this.currentChoice = null;
    this.element = document.createElement('div');
    this.element.setAttribute('id', 'choices-board');
  }

  initChoicesBoard() {
    const spanMin = document.createElement('span');
    const spanMax = document.createElement('span');
    spanMin.innerText = `${this.min}`;
    spanMax.innerText = `${this.max}`;
    this.element.appendChild(spanMin);
    this.element.appendChild(spanMax);
  }

  clearChoices() {
    while (this.element.children.length > 2) {
      const lastChild = this.element.lastChild;
      if (lastChild !== null) {
        this.element.removeChild(lastChild);
      }
    }
  }

  showChoices(result: number, choice: number) {
    //calcul left position
    const elementWidth = this.element.offsetWidth;
    const leftPosition = Math.floor(
      (choice / (this.max - this.min)) * elementWidth
    );

    //style
    const choicesStyle = {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%) translateX(-50%)',
      zIndex: 10,
      fontSize: '0.75rem', // Equivalent to text-xs in Tailwind
      left: `${leftPosition}px`,
    };

    //création span
    const span = document.createElement('span');
    span.classList.add('choices');
    span.classList.add('absolute');
    Object.assign(span.style, choicesStyle);
    if (result !== choice) {
      span.innerText = 'X';
    } else {
      span.innerText = '🟢';
    }
    this.element.appendChild(span);
  }
}

const game = new Game();
game.init();
