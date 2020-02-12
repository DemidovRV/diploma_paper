export default class Validation {
    constructor(container) {
        this.container = container;
        this.input = container.querySelector('.search__input');
        this.button = container.querySelector('.search__button');
        this.inputValidation = this.inputValidation.bind(this);
        this.validation = this.validation.bind(this);
        this.input
            .addEventListener('click', this.inputValidation);
        this.input
            .addEventListener('input', this.inputValidation);
        this.diactivButton = this.diactivButton.bind(this);
        this.activButton = this.activButton.bind(this);
    }

    inputValidation(item) {
        this.validation(item.target);
    }

    validation(element) {
        const errorElement = this.container.querySelector('.search__error');
        if (element.validity.tooShort) {
            errorElement.textContent = 'Должно быть от 3 до 30 символов';
            this.diactivButton();
        } else if (element.validity.valueMissing) {
            errorElement.textContent = 'Нужно ввести ключевое слово';
            this.diactivButton();
        } else {
            errorElement.textContent = '';
            this.activButton();
        }
    }

    diactivButton() {
        this.button.setAttribute('disabled', true);
    }

    activButton() {
        this.button.removeAttribute('disabled');
    }
}
