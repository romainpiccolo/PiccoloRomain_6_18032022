class PhotographHeader {
    constructor(photograph, ContactModalSubject) {
        this._photograph = photograph;
        this.ContactModalSubject = ContactModalSubject;

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('photograph-header-wrapper');
    }

    handleContactButton() {
        this.$wrapper
            .querySelector('.contact_button')
            .addEventListener('click', () => {
                this.ContactModalSubject.fire('SHOW');
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
                <img src="assets/photographers/avatar/MimiKeel.jpg" alt="Mimi Keel" class="avatar-photo">
             </div>
        `

        this.$wrapper.innerHTML = photographHeader;
        this.handleContactButton();
        return this.$wrapper;
    }
}

export { PhotographHeader };