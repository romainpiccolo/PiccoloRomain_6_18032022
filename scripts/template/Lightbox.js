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

    #setCurrentMedia(mediaId) {
        this._currentMediaIndex = this._medias.findIndex(media => media.id === mediaId);
        this._currentMedia = this._medias[this._currentMediaIndex];
    }

    #handleCloseButton() {
        this.$wrapper.querySelector('#lightbox-close')
            .addEventListener('click', () => {
                this.#hideLightbox();
            })
    }

    #createImgContent(currentMedia) {
        const wrapper = document.querySelector('#content-wrapper');

        if (wrapper) {
            wrapper.remove();
        }

        const content = Object.assign(document.createElement('div'), {id: 'content-wrapper'})
        content.append(Object.assign(document.createElement('img'), { src: currentMedia.thumbnail, alt: 'alt', id: 'content'}))

        return content;
    }

    update(action, mediaId){
        switch (action) {
            case 'OPEN':
                this.#setCurrentMedia(mediaId);
                const imgContent = this.#createImgContent(this._currentMedia);
                document.querySelector('.dialog-content').appendChild(imgContent);
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
    return this.$wrapper;
    }
}

export { Lightbox };