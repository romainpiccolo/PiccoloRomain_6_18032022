import { photographerFactory } from '../factories/photographer.js';

async function getPhotographerDatas(id) {
	return await fetch('../data/photographers.json')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Error HTTP');
			}
			return response.json();
		})
		.then((res) => {
            return res.photographers.find((photographer) => (photographer.id === id))
        })
		.catch((error) => console.log(error));
}

//Auto execute function to get photographer datas
(async () => {
	const id = parseInt(new URL(document.location).searchParams.get('id'));

	const photographer = await getPhotographerDatas(id);
	const photographerModel = photographerFactory(photographer);

    const photographInfoSection = document.querySelector('.photograph-infos');
    const photographPhotoSection = document.querySelector('.photograph-photo');

    const photographInfo = photographerModel.getPhotographInfoDOM();
    const photographAvatar = photographerModel.getPhotographAvatarDOM();

    photographInfoSection.appendChild(photographInfo);
    photographPhotoSection.appendChild(photographAvatar);
    

    

    console.log(photographer);
    // console.log(photographerModel.picture);


})();
