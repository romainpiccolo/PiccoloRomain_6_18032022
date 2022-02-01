function photographerFactory(data) {
	const { id, name, city, country, portrait, price, tagline } = data;

	const picture = `assets/photographers/${portrait}`;
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

    function getPhotographAvatarDOM(){
        const img = document.createElement('img');
		img.setAttribute('src', picture);
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

		const p = _createParagraphWithSpans([localisation, `${tagline}`, `${price}€/jour`])

		a.appendChild(img);
		a.appendChild(h2);
		article.appendChild(a);
		article.appendChild(p);

		return article;
	}

	function getPhotographInfoDOM() {
		const h2 = document.createElement('h2');
		h2.textContent = name;

		const p = _createParagraphWithSpans([localisation, `${tagline}`])
        p.prepend(h2);

		return p;
	}

	return { getUserCardDOM, getPhotographInfoDOM, getPhotographAvatarDOM };
}

export { photographerFactory };
