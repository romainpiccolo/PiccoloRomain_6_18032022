class ContactModal {
	static #contactButton = document.querySelector('.contact_button');
	static #contactModal = document.getElementById('contact_modal');
	static #closeModal = document.querySelector('.close-modal');

	constructor() {}

	init() {
		this.#loadEventListener();
	}

	displayModal() {
		ContactModal.#contactModal.style.display = 'block';
	}

	closeModal() {
		ContactModal.#contactModal.style.display = 'none';
	}

	#loadEventListener() {
		ContactModal.#contactButton.addEventListener(
			'click',
			this.displayModal
		);
		ContactModal.#closeModal.addEventListener('click', this.closeModal);
	}
}

export { ContactModal };
