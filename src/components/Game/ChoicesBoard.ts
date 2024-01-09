export class ChoicesBoard {
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
