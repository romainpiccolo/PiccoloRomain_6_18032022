import { mediaIsAVideo, createCustomDOM } from '../utils/helpers.js';

class Lightbox {
	static #mediaIsAVideo = mediaIsAVideo;
	static #lightboxDOM = document.getElementById('lightbox');
	static #previousContentDOM = document.getElementById('lightbox-previous');
	static #nextContentDOM = document.getElementById('lightbox-next');
	static #closeLightbox = document.getElementById('lightbox-close');
	static #dialogContent = document.querySelector('.dialog-content');
	static #contentPATH = `assets/photographers/medias/`;

	constructor(listMedias, currentId) {
		this.medias = listMedias;
		this.currentId = currentId;
	}

	#openLightbox() {
		Lightbox.#lightboxDOM.style.display = 'flex';
	}

	#createImgContent(media) {
		const imgPATH =
			Lightbox.#contentPATH + `${media.photographerId}/${media.image}`;

		return createCustomDOM(
			'img',
			{ src: imgPATH, alt: media.title, id: 'content' },
			['dialog-img-content']
		);
	}

	#createVideoContent(media) {
		const videoPATH =
			Lightbox.#contentPATH + `${media.photographerId}/${media.video}`;

		return createCustomDOM(
			'video',
			{ src: videoPATH, alt: media.alt, controls: true, id: 'content' },
			['dialog-video-content']
		);
	}

	init() {
		Lightbox.#previousContentDOM.addEventListener('click', () =>
			this.prev()
		);

		Lightbox.#nextContentDOM.addEventListener('click', () => this.next());
		Lightbox.#closeLightbox.addEventListener('click', this.close);

		window.addEventListener('keydown', (event) => {
			if (event.defaultPrevented) {
				return;
			}

			switch (event.code) {
				case 'ArrowRight':
					Lightbox.#previousContentDOM.dispatchEvent(
						new Event('click')
					);
					break;
				case 'ArrowLeft':
					Lightbox.#previousContentDOM.dispatchEvent(
						new Event('click')
					);
					break;

				default:
					break;
			}
		});

		document.body.classList.add('stop-scrolling');

		this.loadContent();
		this.#openLightbox();
	}

	loadContent() {
		const media = this.medias.find((media) => media.id === this.currentId);
		const mediaIsAVideo = Lightbox.#mediaIsAVideo(media);
		const currentContent = document.getElementById('content');

		if (currentContent) {
			currentContent.remove();
		}

		const content = mediaIsAVideo
			? this.#createVideoContent(media)
			: this.#createImgContent(media);
		Lightbox.#dialogContent.append(content);
	}

	next() {
		const currentIndex = this.medias.findIndex(
			(media) => media.id === this.currentId
		);

		this.currentId =
			currentIndex < this.medias.length - 1
				? this.medias[currentIndex + 1].id
				: (this.currentId = this.medias[0].id);

		this.loadContent();
	}

	prev() {
		const currentIndex = this.medias.findIndex(
			(media) => media.id === this.currentId
		);

		this.currentId =
			currentIndex > 0
				? this.medias[currentIndex - 1].id
				: this.medias[this.medias.length - 1].id;

		this.loadContent();
	}

	close() {
		document.body.classList.remove('stop-scrolling');
		Lightbox.#lightboxDOM.style.display = 'none';
	}
}

export { Lightbox };
