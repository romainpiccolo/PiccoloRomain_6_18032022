import { createCustomDOM, createParagraphWithSpans } from '../utils/helpers.js';

function photographerFactory(data) {
	const { id, name, city, country, portrait, price, tagline } = data;

	const picture = `assets/photographers/avatar/${portrait}`;
	const localisation = `${city}, ${country}`;

	async function getPhotographerMedias(sortType) {
		let medias = await fetch('../data/photographers.json')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Error HTTP');
				}
				return response.json();
			})
			.then((res) => {
				return res.media.filter((media) => media.photographerId === id);
			})
			.catch((error) => console.log(error));

		switch (sortType) {
			case 'popularity':
				medias = medias.sort((a, b) => a.likes - b.likes);
				break;

			case 'date':
				medias = medias.sort((a, b) => a.date < b.date);
				break;

			case 'title':
				medias = medias.sort((a, b) => a.title > b.title);
				break;

			default:
				medias = medias.sort((a, b) => a.likes - b.likes);
				break;
		}

		return medias;
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
			let mediaIsVideo = Object.prototype.hasOwnProperty.call(
				media,
				'video'
			);
			let p = createParagraphWithSpans(
				[media.title, media.likes],
				['gallery-img-infos']
			);

			const srcContent = mediaIsVideo
				? `assets/photographers/medias/${id}/${media.video}`
				: `assets/photographers/medias/${id}/${media.image}`;

			const content = createCustomDOM(
				mediaIsVideo ? 'video' : 'img',
				{ src: srcContent, alt: media.title },
				['gallery-img'],
				eventHandler.loadInLightbox
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
	};
}

export { photographerFactory };
