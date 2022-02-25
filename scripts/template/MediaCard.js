class MediaCard {
    constructor(media) {
        this._media = media;

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('photograph-media-wrapper');
    }

    render() {
        const media = `
            <a>
                <${this._media.mediaType} src="${this._media.thumbnail}" id="${this._media.id}" class="gallery-img"></${this._media.mediaType}>
                <p class="gallery-img-infos">
                <span>${this._media.title}</span>
                <span data-id="${this._media.id}">${this._media.likes}</span>
                </p>
            </a>
        `

        this.$wrapper.innerHTML = media;
        return this.$wrapper;
    }
}

export { MediaCard };