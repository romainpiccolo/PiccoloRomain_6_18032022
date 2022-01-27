function photographerFactory(data) {
	const { name, portrait } = data;

	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
		const article = document.createElement('article');

		const a = document.createElement('a');
		a.href = `photographer-page/${data.id}`;
		a.setAttribute('alt', data.name);

		const img = document.createElement('img');
		img.setAttribute('src', picture);

		const h2 = document.createElement('h2');
		h2.textContent = name;

		const p = document.createElement('p');

		const spans = [
			{
				span: 'citySpan',
				textContent: `${data.city}, ${data.country}`,
			},
			{
				span: 'tagSpan',
				textContent: `${data.tagline}`,
			},
			{
				span: 'priceSpan',
				textContent: `${data.price}€/jour`,
			},
		];

		spans.forEach(el => {
			let span = document.createElement('span');
			span.textContent = el.textContent;
			p.appendChild(span);
		});

		a.appendChild(img);
		a.appendChild(h2);
		article.appendChild(a);
		article.appendChild(p);

		return article;
	}

	return { name, picture, getUserCardDOM };
}

export { photographerFactory };
