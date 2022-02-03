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

// async function getPhotographerMedias(id) {
// 	return await fetch('../data/photographers.json')
// 		.then((response) => {
// 			if (!response.ok) {
// 				throw new Error('Error HTTP');
// 			}
// 			return response.json();
// 		})
// 		.then((res) => {
// 			return res.media.filter((media) => media.photographerId === id);
// 		})
// 		.catch((error) => console.log(error));
// }

function changeButtonValue(e) {
    const selectButton = document.querySelector('.select-button');

    selectButton.textContent = e.target.textContent;
    selectButton.value = e.target.attributes.value.value;

    sortContent();
}

async function sortContent() {
	const photographId = parseInt(
		new URL(document.location).searchParams.get('id')
	);
    const photographerModel = photographerFactory({id: photographId});
	const selectButton = document.querySelector('.select-button');

	Filters.hideFilters();

	let medias = await photographerModel.getPhotographerMedias();

	switch (selectButton.value) {
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

    let wrapperDiv = document.querySelector('.gallery-wrapper');
    if (wrapperDiv) {
        wrapperDiv.remove();
    }
    wrapperDiv = photographerModel.getPhotographGalleryDOM(medias);

    const gallery = document.querySelector('.photograph-gallery');
    gallery.appendChild(wrapperDiv);

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
    window.changeButtonValue = changeButtonValue;
	window.displayModal = ContactForm.displayModal;
	window.closeModal = ContactForm.closeModal;
}

//Auto execute function to get photographer datas
(async () => {
	const id = parseInt(new URL(document.location).searchParams.get('id'));

	const photographer = await getPhotographerDatas(id);
	const photographerModel = photographerFactory(photographer);

    sessionStorage.setItem('currentPhotographerId', id);

	_loadEventListener();

	generatePhotographerHeader(photographerModel);
	generatePhotographerPriceSection(photographerModel);
    sortContent();
})();
