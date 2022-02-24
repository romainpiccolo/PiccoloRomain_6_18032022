class ContactModal {
    constructor(photograph) {
        this._photograph = photograph;

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('contact-modal-wrapper');
    }

    render() {
        const contactModal = `
             <div>test</div>
        `

        this.$wrapper.innerHTML = contactModal;
        return this.$wrapper;
    }

    update(action) {
        switch (action) {
            case 'SHOW':
                console.log('TRIGGER SHOW');
                break;
        
            default:
                break;
        }
    }
}

export { ContactModal };