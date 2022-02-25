import { createCustomDOM, createParagraphWithSpans, mediaIsAVideo } from '../utils/helpers.js';
import { fetchPhotographerMedias } from '../utils/old_fetchDatas.js';
import { Lightbox } from '../class/lightbox.js';
import { ContactModal } from '../class/old_contactModal.js';


function photographerFactory(data) {
	const { id, name, city, country, portrait, price, tagline } = data;

	const picture = `assets/photographers/avatar/${portrait}`;
	const localisation = `${city}, ${country}`;

    function initContactModal() {
        return new ContactModal().init();
    }


	async function getPhotographerMedias() {
		return fetchPhotographerMedias(id);
	}

	function getPhotographAvatarDOM() {
		return createCustomDOM('img', { src: picture, alt: name }, [
			'avatar-photo',
		]);
	}

	function getUserCardDOM() {
		const article = document.createElement('article');

		const a = createCustomDOM('a', {
			href: `/photographer-page.html?id=${id}`,
			alt: name,
		});

		const img = getPhotographAvatarDOM();

		const h2 = createCustomDOM('h2', { textContent: name });

        const p = createParagraphWithSpans([localisation, `${tagline}`, `${price}€/jour`])

		a.append(img, h2);
		article.append(a, p);

		return article;
	}

	function getPhotographInfoDOM() {
		const h1 = createCustomDOM('h1', { textContent: name });
		const p = createParagraphWithSpans([localisation, `${tagline}`]);

		p.prepend(h1);

		return p;
	}

	function getPhotographStatsDOM() {
		const p = document.createElement('p');
		const spanLikes = document.createElement('span');
		const spanPrice = createCustomDOM('span', {
			textContent: `${price}€/jour`,
		});

		p.append(spanLikes, spanPrice);

		return p;
	}

	function getPhotographGalleryDOM(medias, eventHandler) {
		const wrapperDiv = createCustomDOM('div', null, ['gallery-wrapper']);

		medias.forEach((media) => {
			let a = document.createElement('a');
			let mediaIsVideo = mediaIsAVideo(media);
			let p = createParagraphWithSpans(
				[media.title, media.likes],
				['gallery-img-infos']
			);

			const srcContent = mediaIsVideo
				? `assets/photographers/medias/${id}/${media.video}`
				: `assets/photographers/medias/${id}/${media.image}`;

			const content = createCustomDOM(
				mediaIsVideo ? 'video' : 'img',
				{ src: srcContent, alt: media.title, id: media.id },
				['gallery-img'],
				() => new Lightbox(medias, media.id).init()
			);

			p.lastChild.dataset.id = media.id;
			p.lastChild.addEventListener('click', (e) =>
				eventHandler.addLike(e)
			);

			a.append(content, p);
			wrapperDiv.appendChild(a);
		});

		return wrapperDiv;
	}

	return {
		getUserCardDOM,
		getPhotographInfoDOM,
		getPhotographAvatarDOM,
		getPhotographStatsDOM,
		getPhotographerMedias,
		getPhotographGalleryDOM,
        initContactModal
	};
}

export { photographerFactory };
