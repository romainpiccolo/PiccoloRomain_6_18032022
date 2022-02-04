function photographerFactory(data) {
	const { id, name, city, country, portrait, price, tagline } = data;

	const picture = `assets/photographers/avatar/${portrait}`;
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

	async function getPhotographerMedias(sortType) {
		let medias = await fetch('../data/photographers.json')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Error HTTP');
				}
				return response.json();
			})
			.then((res) => {
				return res.media.filter((media) => media.photographerId === id);
			})
			.catch((error) => console.log(error));

            switch (sortType) {
                case 'popularity':
                    medias = medias.sort((a, b) => a.likes - b.likes);
                    break;
        
                case 'date':
                    medias = medias.sort((a, b) => a.date < b.date);
                    break;
        
                case 'title':
                    medias = medias.sort((a, b) => a.title > b.title);
                    break;
        
                default:
                    medias = medias.sort((a, b) => a.likes - b.likes);
                    break;
            }

            return medias;
	}

	function getPhotographAvatarDOM() {
		const img = document.createElement('img');
		img.setAttribute('src', picture);
		img.setAttribute('alt', name);

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

		const p = _createParagraphWithSpans([
			localisation,
			`${tagline}`,
			`${price}€/jour`,
		]);

		a.appendChild(img);
		a.appendChild(h2);
		article.appendChild(a);
		article.appendChild(p);

		return article;
	}

	function getPhotographInfoDOM() {
		const h1 = document.createElement('h1');
		h1.textContent = name;

		const p = _createParagraphWithSpans([localisation, `${tagline}`]);
		p.prepend(h1);

		return p;
	}

	function getPhotographStatsDOM() {
		const p = document.createElement('p');
		const spanLikes = document.createElement('span');
		const spanPrice = document.createElement('span');

		spanPrice.textContent = `${price}€/jour`;

		p.appendChild(spanLikes);
		p.appendChild(spanPrice);

		return p;
	}

    function refreshPhotograhStatsLikesDOM() {
        const spansLikes = document.querySelectorAll('.gallery-wrapper span:last-child')
        let totalLikes = 0;
        spansLikes.forEach(span => {
            totalLikes += parseInt(span.textContent);
        })

        document.querySelector('.photograph-stats span').textContent = totalLikes;
    }

    function getLightBoxDOM() {
        // const lightbox = document.querySelector('#lightbox');
        // const leftArrow = document.createElement('i');
        // const rightArrow = document.createElement('i');
        // const close = document.createElement('i');
        // const imgContent = document.createElement('img');
        // const videoContent = document.createElement('video');
        // const sourceVideo = document.createElement('source');

        // let dialog = document.querySelector('.dialog');

        // if (dialog) {
        //     dialog.remove();
        // }
        // dialog = document.createElement('div');


        // dialog.classList.add('dialog');
        // leftArrow.classList.add('fas', 'fa-angle-left');
        // rightArrow.classList.add('fas', 'fa-angle-right');
        // close.classList.add('fas', 'fa-times');
        // imgContent.classList.add('dialog-content', 'dialog-img-content', 'display-none');
        // videoContent.classList.add('dialog-content', 'dialog-video-content', 'display-none');

        // close.addEventListener('click', () => {
        //     lightbox.style.display = 'none';
        // })

        // videoContent.appendChild(sourceVideo);
        // dialog.appendChild(close);
        // dialog.appendChild(leftArrow);
        // dialog.appendChild(imgContent);
        // dialog.appendChild(videoContent);
        // dialog.appendChild(rightArrow);

        // lightbox.append(dialog);

        // return lightbox;
    }

    function loadLightBoxContent(media) {
        // const dialog = document.querySelector('.dialog-content');


    }

	function getPhotographGalleryDOM(medias, eventHandler) {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.classList.add('gallery-wrapper');

		medias.forEach((media) => {

			let a = document.createElement('a');
            let mediaIsVideo = Object.prototype.hasOwnProperty.call(media, 'video');
            let content = mediaIsVideo ? document.createElement('video') : document.createElement('img');
            let srcContent = `assets/photographers/medias/${id}/${media.image}`;
            let p = _createParagraphWithSpans([media.title, media.likes]);

            p.classList.add('gallery-img-infos');
            content.classList.add('gallery-img');

            if (mediaIsVideo){
                srcContent = `assets/photographers/medias/${id}/${media.video}`;
            }

            content.src = srcContent;
            content.alt = media.title;

            content.addEventListener('click', (e) => {
                const src = e.target.getAttribute('src');
                const alt = e.target.getAttribute('alt');
                const lightbox = document.querySelector('#lightbox');

                if (mediaIsVideo) {
                    console.log('video');
                } else {
                    document.querySelector('.dialog-img-content').src = src;
                    document.querySelector('.dialog-img-content').alt = alt;
                    document.querySelector('.dialog-img-content').style.display = 'block';
                }
                lightbox.style.display = 'flex';
            })

            p.lastChild.dataset.id = media.id;
            p.lastChild.addEventListener('click', (e) => eventHandler.addLike(e));

            a.appendChild(content);
            a.appendChild(p);
            wrapperDiv.appendChild(a);
		});

        return wrapperDiv;
	}

	return {
		getUserCardDOM,
		getPhotographInfoDOM,
		getPhotographAvatarDOM,
		getPhotographStatsDOM,
		getPhotographerMedias,
		getPhotographGalleryDOM,
        refreshPhotograhStatsLikesDOM
	};
}

export { photographerFactory };
