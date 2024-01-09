export class GameForm {
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
    this.instructionSpan = document.createElement('span');
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
      this.errorSpan.innerText = (error as Error).message;
      this.errorSpan.classList.remove('hidden');
      this.instructionSpan.classList.add('hidden');
    }
  }
}
