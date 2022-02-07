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

export { createCustomDOM, createParagraphWithSpans };
