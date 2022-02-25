class SuccessModal {
    constructor() {
        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('success-modal-wrapper');
    }

    show() {
        this.$wrapper.style.display = 'flex';
    }

    hide() {
        this.$wrapper.style.display = 'none';
    }

    render() {
        const successModal = `
            <div class="success-submit">
                <p>Merci ! Votre message a été envoyé.</p>
            </div>
        `

        this.$wrapper.innerHTML = successModal;
        return this.$wrapper;
    }
}

export { SuccessModal };