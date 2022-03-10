class ContactModal {
    constructor(photograph, validator, successModal) {
        this._photograph = photograph;
        this._validator = validator;
        this._successModal = successModal;

        this._formFields = [
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

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('contact-modal-wrapper');
    }

    show() {
        this.$wrapper.style.display = 'block';
        document.body.setAttribute('aria-hidden', true);
        this.$wrapper.querySelector('.modal').focus();
    }

    hide() {
        this.$wrapper.style.display = 'none';
        document.body.removeAttribute('aria-hidden');
        document.querySelector('.contact_button').focus();
    }

    #resetError(fieldId) {
        document.getElementById(fieldId).parentElement.setAttribute('data-error-visible', false);
        document.getElementById(fieldId).parentElement.removeAttribute('data-error');
    }

    #setError(fieldId, error) {
        document.getElementById(fieldId).parentElement.setAttribute('data-error', error);
        document.getElementById(fieldId).parentElement.setAttribute('data-error-visible', true);
    }

    #validateForm(event) {
        let isValid = true;
        event.preventDefault();

        for (const field of this._formFields) {
            this.#resetError(field.id);

            if (!this._validator.validate(field)) {
                this.#setError(field.id, field.errorMessage);
                isValid = false;
            }
            
        }

        return isValid;
    }

    #resetForm() {
        document.getElementById('contactForm').reset();

        for (const field of this._formFields) {
            this.#resetError(field.id);
        }
    }

    #handleKeyPress() {
        window.addEventListener('keydown', (event) => event.code === 'Escape' ? this.hide() : null)
    }

    #handleSendForm() {
        this.$wrapper
            .querySelector('#sendForm')
            .addEventListener('click', (e) => {

                const isValid = this.#validateForm(e);

                if (isValid) {
                    this._successModal.show();
                    setTimeout(() => this._successModal.hide(), 3000);
                    console.log('firstname', 'lastname', 'email', 'message');
                    this.#resetForm();
                    this.hide();
                }
            })
    }

    #handleCloseButton() {
        this.$wrapper
            .querySelector('.close-modal')
            .addEventListener('click', () => {
                 this.hide();
            })
    }

    render() {
        const contactModal = `
        <div tabindex="0" class="modal" role="dialog">
            <header>
                <div>
                    <h2 tabindex="0">Contactez-moi</h2>
                    <h2>${this._photograph.name}</h2>
                </div>
            </header>
            <form
                id="contactForm"
                method="post"
            >
                <div class="formData">
                    <label tabindex="0" for="firstname">Prénom</label>
                    <input type="text" class="text-control" id="firstname" />
                </div>

                <div class="formData">
                    <label tabindex="0" for="lastname">Nom</label>
                    <input type="text" class="text-control" id="lastname" />
                </div>

                <div class="formData">
                    <label tabindex="0" for="email">Email</label>
                    <input type="email" class="text-control" id="email" />
                </div>
                <div class="formData">
                    <label tabindex="0" for="message">Votre message</label>
                    <textarea class="text-control" id="message"></textarea>
                </div>
                <button id="sendForm" class="contact_button" type="submit">Envoyer</button>
            </form>
            <i tabindex="0" class="fas fa-times close-modal"></i>
        </div>
        `

        this.$wrapper.innerHTML = contactModal;
        this.#handleCloseButton();
        this.#handleSendForm();
        this.#handleKeyPress();
        return this.$wrapper;
    }
}

export { ContactModal };