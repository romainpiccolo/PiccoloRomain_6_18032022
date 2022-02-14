import { showFilters, hideFilters } from '../utils/filters.js';


class eventHandler {

    static #selectButton = document.getElementById('#selectButton');
    static #filterItems = document.querySelectorAll('.filter-item');

    constructor() {
        eventHandler.#selectButton.addEventListener('click', showFilters);
        eventHandler.#filterItems.forEach(item => {
            item.addEventListener('click' , () => changeButtonValue(e))
        })
    }

	static addLike(event) {
		const currentLike = parseInt(event.target.textContent);
		event.target.textContent = currentLike + 1;
		eventHandler.refreshPhotograhStats();
	}

	static refreshPhotograhStats() {
		const spansLikes = document.querySelectorAll(
			'.gallery-wrapper span:last-child'
		);
		let totalLikes = 0;
		spansLikes.forEach((span) => {
			totalLikes += parseInt(span.textContent);
		});

		document.querySelector('.photograph-stats span').textContent =
			totalLikes;
	}

	static changeButtonValue(event) {
		const selectButton = document.querySelector('.select-button');

		selectButton.textContent = event.target.textContent;
		selectButton.value = event.target.getAttribute('value');
	}
}

export { eventHandler };
