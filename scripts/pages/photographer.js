import { photographerFactory } from '../factories/photographer.js';
import * as Filters from '../utils/filters.js';
import * as ContactForm from '../utils/contactForm.js';

async function getPhotographerDatas(id) {
	return await fetch('../data/photographers.json')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Error HTTP');
			}
			return response.json();
		})
		.then((res) => {
			return res.photographers.find(
				(photographer) => photographer.id === id
			);
		})
		.catch((error) => console.log(error));
}

async function getPhotographerMedias(id) {
	return await fetch('../data/photographers.json')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Error HTTP');
			}
			return response.json();
		})
		.then((res) => {
			return res.media.filter((a) => a.photographerId === id);
		})
		.catch((error) => console.log(error));
}

async function sortContent(e) {
	const photographId = parseInt(
		new URL(document.location).searchParams.get('id')
	);
	const filterValue = e.target.attributes.value.value || null;
	const selectButton = document.querySelector('.select-button');

	Filters.hideFilters();
	selectButton.textContent = e.target.textContent;

	let medias = await getPhotographerMedias(photographId);

	switch (filterValue) {
		case 'popularity':
			medias =  medias.sort((a, b) => a.likes - b.likes);
			break;

        case 'date':
			medias =  medias.sort((a, b) => a.date < b.date);
			break;

        case 'title':
			medias =  medias.sort((a, b) => a.title > b.title);
            break;

		default:
			medias =  medias.sort((a, b) => a.likes - b.likes);
			break;
	}

    generatePhotographContent(medias);
}

function generatePhotographContent(medias) {
    console.log('generate content', medias);
}

function generatePhotographerHeader(photographerModel) {
	const photographInfoSection = document.querySelector('.photograph-infos');
	const photographPhotoSection = document.querySelector('.photograph-photo');

	const photographInfo = photographerModel.getPhotographInfoDOM();
	const photographAvatar = photographerModel.getPhotographAvatarDOM();

	photographInfoSection.appendChild(photographInfo);
	photographPhotoSection.appendChild(photographAvatar);
}

function generatePhotographerPriceSection(photographerModel) {
	const photographStatSection = document.querySelector('.photograph-stats');

	const photographStats = photographerModel.getPhotographStatsDOM();

	photographStatSection.appendChild(photographStats);
}

function _loadEventListener() {
	document
		.querySelector('#selectButton')
		.addEventListener('click', Filters.showFilters);
	window.sortContent = sortContent;
	window.displayModal = ContactForm.displayModal;
	window.closeModal = ContactForm.closeModal;
}

//Auto execute function to get photographer datas
(async () => {
	const id = parseInt(new URL(document.location).searchParams.get('id'));

	const photographer = await getPhotographerDatas(id);
	const photographerModel = photographerFactory(photographer);

	_loadEventListener();

	generatePhotographerHeader(photographerModel);
	generatePhotographerPriceSection(photographerModel);

	console.log(photographer);
})();
