class PhotographHeader {
    constructor(photograph, contactModal) {
        this._photograph = photograph;
        this._contactModal = contactModal;

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('photograph-header-wrapper');
    }

    #handleContactButton() {
        this.$wrapper
            .querySelector('.contact_button')
            .addEventListener('click', () => {
                this._contactModal.show();
            })
    }

    render () {
        const photographHeader = `
             <div class="photograph-header-infos">
                <div>
                    <h1>${this._photograph.name}</h1>
                    <span>${this._photograph.city}, ${this._photograph.country}</span>
                    <span>${this._photograph.tagline}</span>
                </div>
             </div>
             <div class="photograph-header-contact">
                <button class="contact_button">Contactez-moi</button>
             </div>
             <div class="photograph-header-photo">
                <img src="${this._photograph.portrait}" alt="${this._photograph.name}" class="avatar-photo">
             </div>
        `

        this.$wrapper.innerHTML = photographHeader;
        this.#handleContactButton();
        return this.$wrapper;
    }
}

export { PhotographHeader };