function photographerFactory(data) {
	const { id, name, city, country, portrait, price, tagline } = data;

	const picture = `assets/photographers/avatar/${portrait}`;
	const localisation = `${city}, ${country}`;

	function _createParagraphWithSpans(spansContent) {
		const p = document.createElement('p');

		spansContent.forEach((content) => {
			let span = document.createElement('span');
			span.textContent = content;
			p.appendChild(span);
		});

		return p;
	}

	async function getPhotographerMedias() {
		return await fetch('../data/photographers.json')
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
	}

	function getPhotographAvatarDOM() {
		const img = document.createElement('img');
		img.setAttribute('src', picture);
		img.setAttribute('alt', name);

		img.classList.add('avatar-photo');

		return img;
	}

	function getUserCardDOM() {
		const article = document.createElement('article');

		const a = document.createElement('a');
		a.href = `/photographer-page.html?id=${id}`;
		a.setAttribute('alt', name);

		const img = getPhotographAvatarDOM();

		const h2 = document.createElement('h2');
		h2.textContent = name;

		const p = _createParagraphWithSpans([
			localisation,
			`${tagline}`,
			`${price}€/jour`,
		]);

		a.appendChild(img);
		a.appendChild(h2);
		article.appendChild(a);
		article.appendChild(p);

		return article;
	}

	function getPhotographInfoDOM() {
		const h1 = document.createElement('h1');
		h1.textContent = name;

		const p = _createParagraphWithSpans([localisation, `${tagline}`]);
		p.prepend(h1);

		return p;
	}

	function getPhotographStatsDOM() {
		const p = document.createElement('p');

		const spanLikes = document.createElement('span');
		spanLikes.textContent = '297081 ';
		const icon = document.createElement('img');
		icon.setAttribute('src', 'assets/icons/heart.svg');
		icon.classList.add('heart-icon');
		spanLikes.append(icon);

		const spanPrice = document.createElement('span');
		spanPrice.textContent = `${price}€/jour`;

		p.appendChild(spanLikes);
		p.appendChild(spanPrice);

		return p;
	}

	function getPhotographGalleryDOM(medias) {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.classList.add('gallery-wrapper');

		medias.forEach((media) => {

			let a = document.createElement('a');
            let content = Object.prototype.hasOwnProperty.call(media, 'video') ? document.createElement('video') : document.createElement('img');
            let srcContent = `assets/photographers/medias/${id}/${media.image}`;
            let p = _createParagraphWithSpans([media.title, media.likes]);

            p.classList.add('gallery-img-infos');
            content.classList.add('gallery-img');

            if (Object.prototype.hasOwnProperty.call(media, 'video')){
                srcContent = `assets/photographers/medias/${id}/${media.video}`;
            }

            content.src = srcContent;
            content.alt = media.title;

            a.appendChild(content);
            a.appendChild(p);
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
