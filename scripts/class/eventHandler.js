import { Lightbox } from './lightbox.js';

class eventHandler {
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

	static loadInLightbox(medias, currentId) {

        const lightbox = new Lightbox('#lightbox', medias, currentId);

        lightbox.debugMediasList();

		// const src = event.target.getAttribute('src');
		// const alt = event.target.getAttribute('alt');
		// const lightbox = document.querySelector('#lightbox');

		// if (event.target.tagName === 'VIDEO') {
		// 	console.log('video');
		// } else {
		// 	document.querySelector('.dialog-img-content').src = src;
		// 	document.querySelector('.dialog-img-content').alt = alt;
		// 	document.querySelector('.dialog-img-content').style.display =
		// 		'block';
		// }
		// lightbox.style.display = 'flex';
	}
}

export { eventHandler };
