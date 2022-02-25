async function fetchPhotographerDatas(id) {
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


async function fetchPhotographerMedias(photographerId) {
	return await fetch('../data/photographers.json')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Error HTTP');
				}
				return response.json();
			})
			.then((res) => {
				return res.media.filter((media) => media.photographerId === photographerId);
			})
			.catch((error) => console.log(error));
}


export { fetchPhotographerDatas, fetchPhotographerMedias };