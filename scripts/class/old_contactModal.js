import { validator } from '../utils/old_fieldValidator.js';

const FORM_FIELDS = [
    {
        id: "firstname",
        verifType: "name",
        errorMessage: "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    },
    {
        id: "lastname",
        verifType: "name",
        errorMessage: "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    },
    {
        id: "email",
        verifType: "email",
        errorMessage: "Veuillez entrer un email valide."
    },
    {
        id: "message",
        verifType: "name",
        errorMessage: "Veuillez entrer 2 caractères ou plus pour le champ de message."
    }
]

class ContactModal {
	static #contactModal = document.getElementById('contact_modal');
	static #contactButton = document.querySelector('.contact_button');
	static #closeModal = document.querySelector('.close-modal');
    static #sendForm = document.getElementById('sendForm');

    static #contactForm = document.getElementById('contactForm')
    static #firstname = document.getElementById('firstname');
    static #lastname = document.getElementById('lastname');
    static #email = document.getElementById('email');
    static #message = document.getElementById('message');
    static #successSubmit = document.querySelector('.success-submit-container');

	constructor() {}

	init() {
		ContactModal.#contactButton.addEventListener(
			'click',
			this.displayModal.bind(this)
		);
		ContactModal.#closeModal.addEventListener('click', this.closeModal);
        ContactModal.#sendForm.addEventListener('click', this.validateForm.bind(this));
	}

	displayModal() {
		ContactModal.#contactModal.style.display = 'block';
        this.resetForm();
	}

	closeModal() {
		ContactModal.#contactModal.style.display = 'none';
	}

    toggleSuccessSubmit() {
        ContactModal.#successSubmit.classList.toggle("display-flex")
    }

    
    setError(fieldId, error) {
        document.getElementById(fieldId).parentElement.setAttribute('data-error', error);
        document.getElementById(fieldId).parentElement.setAttribute('data-error-visible', true);
    }

    resetError(fieldId) {
        document.getElementById(fieldId).parentElement.setAttribute('data-error-visible', false);
        document.getElementById(fieldId).parentElement.removeAttribute('data-error');
    }

    resetForm() {
        ContactModal.#contactForm.reset();

        for (const field of FORM_FIELDS) {
            this.resetError(field.id);
        }
    }

    validateForm(event) {
        let isValid = true;

        event.preventDefault();

        for (const field of FORM_FIELDS) {
            this.resetError(field.id);

            if (!validator(field)) {
                this.setError(field.id, field.errorMessage);
                isValid = false;
            }
            
        }

        if (isValid) {
            this.toggleSuccessSubmit();
            setTimeout(this.toggleSuccessSubmit, 3000);
            console.log(ContactModal.#firstname.value, ContactModal.#lastname.value, ContactModal.#email.value, ContactModal.#message.value);
            this.resetForm();
            this.closeModal();
        }

    }

}

export { ContactModal };
