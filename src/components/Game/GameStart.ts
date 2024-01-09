import { GAME_CONTAINER } from "../../../main";

export class GameStart {
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
