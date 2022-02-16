function createCustomDOM(
	elemType,
	attributes = null,
	classElem = [],
	callback = null
) {
	const newElement = attributes
		? Object.assign(document.createElement(elemType), attributes)
		: document.createElement(elemType);

	classElem.forEach((customClass) => newElement.classList.add(customClass));

	if (callback) {
		newElement.addEventListener('click', callback);
	}
	return newElement;
}

function createParagraphWithSpans(spansContent, classList = []) {
	const p = document.createElement('p');
	classList.forEach((customClass) => p.classList.add(customClass));

	spansContent.forEach((content) =>
		p.appendChild(createCustomDOM('span', { textContent: content }))
	);

	return p;
}

function sortMediaByType(medias, type) {
	let sortedMedias = null;

	switch (type) {
		case 'popularity':
			sortedMedias = medias.sort((a, b) => b.likes - a.likes);
			break;

		case 'date':
			sortedMedias = medias.sort((a, b) => a.date < b.date);
			break;

		case 'title':
			sortedMedias = medias.sort((a, b) => a.title > b.title);
			break;

		default:
			sortedMedias = medias.sort((a, b) => a.likes - b.likes);
			break;
	}

	return sortedMedias;
}

function mediaIsAVideo(media) {
	return Object.prototype.hasOwnProperty.call(media, 'video');
}

export { createCustomDOM, createParagraphWithSpans, sortMediaByType, mediaIsAVideo };
