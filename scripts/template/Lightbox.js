import { LightboxFactory } from '../factories/LightboxFactory.js'

class Lightbox {
    constructor(medias) {
        this._medias = medias;
        this._currentMedia = null;
        this._currentMediaIndex = 0;

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('lightbox-wrapper');
    }

    #showLightbox() {
        this.$wrapper.style.display = 'flex';
        document.body.classList.add('stop-scrolling');
    }

    #hideLightbox() {
        this.$wrapper.style.display = 'none';
		document.body.classList.remove('stop-scrolling');
    }

    #appendNewContent(media) {
        const wrapper = document.querySelector('#content-wrapper');

        if (wrapper) {
            wrapper.remove();
        }

        document.querySelector('.dialog-content').appendChild(media.render());
    }

    #setCurrentMedia(mediaId) {
        this._currentMediaIndex = this._medias.findIndex(media => media.id === mediaId);
        this._currentMedia = this._medias[this._currentMediaIndex];
    }

    #loadCurrentMedia() {
        const media = new LightboxFactory(this._currentMedia, this._currentMedia.mediaType)
        this.#appendNewContent(media);
    }

    #changeMedia(action) {
        const currentIndex = this._medias.findIndex(media => media.id === this._currentMedia.id);

        switch (action) {
            case 'NEXT':
                this._currentMedia = currentIndex < this._medias.length - 1 ? this._medias[currentIndex + 1] : this._medias[0];
                this.#loadCurrentMedia();
                break;
            case 'PREVIOUS':
                this._currentMedia = currentIndex > 0 ? this._medias[currentIndex - 1] : this._medias[this._medias.length - 1];
                this.#loadCurrentMedia();
                break;
        }
    }

    #handleCloseButton() {
        this.$wrapper.querySelector('#lightbox-close')
            .addEventListener('click', () => {
                this.#hideLightbox();
            })
    }

    #handleNextButton() {
        this.$wrapper.querySelector('#lightbox-next')
            .addEventListener('click', () => {
                this.#changeMedia('NEXT');
            })
    }

    #handlePreviousButton() {
        this.$wrapper.querySelector('#lightbox-previous')
            .addEventListener('click', () => {
                this.#changeMedia('PREVIOUS');
            })
    }

    #handleKeyPress() {
        window.addEventListener('keydown', (event) => {
			if (event.defaultPrevented) {
				return;
			}

			switch (event.code) {
				case 'ArrowRight':
                    this.#changeMedia('NEXT');
					break;
				case 'ArrowLeft':
					this.#changeMedia('PREVIOUS');
					break;
				case 'Escape':
					this.#hideLightbox();
					break;

				default:
					break;
			}
		});
    }

    update(action, mediaId){
        switch (action) {
            case 'OPEN':
                this.#setCurrentMedia(mediaId);
                this.#loadCurrentMedia();
                this.#showLightbox();
                break;
        
            default:
                break;
        }
    }

    render() {
        const lightbox = `
        <a><i id="lightbox-previous" class="fas fa-angle-left"></i></a>
		    <div class="dialog-content"></div>
		<a><i id="lightbox-next" class="fas fa-angle-right"></i></a>
		<i id="lightbox-close" role="button" class="fas fa-times"></i>
    `

    this.$wrapper.innerHTML = lightbox;
    this.#handleCloseButton();
    this.#handleNextButton();
    this.#handlePreviousButton();
    this.#handleKeyPress();
    return this.$wrapper;
    }
}

export { Lightbox };