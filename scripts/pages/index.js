import { photographerFactory } from '../factories/photographer.js';

async function getPhotographers() {
	const datas = await fetch('../data/photographers.json')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Error HTTP');
			}
			return response.json();
		})
		.then((res) => res)
		.catch((error) => {
			console.log(error);
		});

	console.log(datas);

	return { photographers: datas.photographers };
}

async function displayData(photographers) {
	const photographersSection = document.querySelector(
		'.photographer_section'
	);

	photographers.forEach((photographer) => {
		const photographerModel = photographerFactory(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}

async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getPhotographers();
	displayData(photographers);
}

init();
