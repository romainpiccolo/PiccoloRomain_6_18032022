import { photographerFactory } from '../factories/photographer.js';
import { eventHandler } from '../class/eventHandler.js';
import { sortMediaByType } from '../utils/helpers.js';
import { fetchPhotographerDatas } from '../utils/fetchDatas.js';
import * as Filters from '../utils/filters.js';
import * as ContactForm from '../utils/contactForm.js';

async function sortContent() {
	const photographId = parseInt(
		new URL(document.location).searchParams.get('id')
	);
	const photographerModel = photographerFactory({ id: photographId });
	const sortType = document.querySelector('.select-button').value;

	Filters.hideFilters();

	let medias = await photographerModel.getPhotographerMedias();
	generatePhotographGallery(
		photographerModel,
		sortMediaByType(medias, sortType)
	);
}

function generatePhotographGallery(photographerModel, medias) {
	let wrapperDiv = document.querySelector('.gallery-wrapper');
	if (wrapperDiv) {
		wrapperDiv.remove();
	}
	wrapperDiv = photographerModel.getPhotographGalleryDOM(
		medias,
		eventHandler
	);

	const gallery = document.querySelector('.photograph-gallery');
	gallery.appendChild(wrapperDiv);
}

function generatePhotographerHeader(photographerModel) {
	const photographInfoSection = document.querySelector('.photograph-infos');
	const photographPhotoSection = document.querySelector('.photograph-photo');

	const photographInfo = photographerModel.getPhotographInfoDOM();
	const photographAvatar = photographerModel.getPhotographAvatarDOM();

	photographInfoSection.appendChild(photographInfo);
	photographPhotoSection.appendChild(photographAvatar);
}

function generatePhotographerStatSection(photographerModel) {
	const photographStatSection = document.querySelector('.photograph-stats');

	const photographStats = photographerModel.getPhotographStatsDOM();

	photographStatSection.appendChild(photographStats);
}

function _loadEventListener() {
	document
		.querySelector('#selectButton')
		.addEventListener('click', Filters.showFilters);
	document
		.querySelector('.contact_button')
		.addEventListener('click', ContactForm.displayModal);
	document
		.querySelector('.close-modal')
		.addEventListener('click', ContactForm.closeModal);
	document.querySelectorAll('.filter-item').forEach((item) =>
		item.addEventListener('click', (e) => {
			eventHandler.changeButtonValue(e);
			sortContent();
		})
	);
}

//Auto execute function to get photographer datas
(async () => {
	const id = parseInt(new URL(document.location).searchParams.get('id'));

	const photographer = await fetchPhotographerDatas(id);
	const photographerModel = photographerFactory(photographer);

	sessionStorage.setItem('currentPhotographerId', id);

	_loadEventListener();

	generatePhotographerHeader(photographerModel);
	generatePhotographerStatSection(photographerModel);
	await sortContent();
	eventHandler.refreshPhotograhStats();
})();
