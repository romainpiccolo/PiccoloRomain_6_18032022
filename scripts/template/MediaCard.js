class MediaCard {
    constructor(media, StatsPublisher) {
        this._media = media;
        this._likes = media.likes;
        this.StatsPublisher = StatsPublisher;

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('photograph-media-wrapper');
    }

    #handleLikeButton() {
        this.$wrapper.querySelector('#likeButton')
		.addEventListener('click', (e) => {

            if (this._media.isLiked) {
                this.StatsPublisher.notify('DEC');
                this._likes -= 1;
                this._media.subLike()
            } else {
                this.StatsPublisher.notify('INC');
                this._likes += 1;
                this._media.addLike()
            }
            
            e.target.textContent = this._likes;
        });
    }

    render() {
        const media = `
            <a>
                <${this._media.mediaType} src="${this._media.thumbnail}" id="${this._media.id}" class="gallery-img"></${this._media.mediaType}>
                <p class="gallery-img-infos">
                <span>${this._media.title}</span>
                <span id="likeButton" data-id="${this._media.id}">${this._likes}</span>
                </p>
            </a>
        `

        this.$wrapper.innerHTML = media;
        this.#handleLikeButton();
        return this.$wrapper;
    }
}

export { MediaCard };