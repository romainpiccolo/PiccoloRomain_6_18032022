class MediaCard {
    constructor(media, StatsPublisher, LightboxPublisher) {
        this._media = media;
        this._likes = media.likes;
        this.StatsPublisher = StatsPublisher;
        this.LightboxPublisher = LightboxPublisher;

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
            
            e.target.previousSibling.textContent = this._likes;
        });
    }

    #handleClickOnImg() {
        this.$wrapper.querySelector('.gallery-img')
            .addEventListener('click', () => {
                this.LightboxPublisher.notify('OPEN', this._media.id);
            })
    }

    render() {
        const media = `
            <a>
                <${this._media.mediaType} tabindex="0" src="${this._media.thumbnail}" id="${this._media.id}" class="gallery-img" alt="${this._media.title}"></${this._media.mediaType}>
                <p class="gallery-img-infos">
                    <span tabindex="0">${this._media.title}</span>
                    <span>${this._likes}<i class="fas fa-heart" id="likeButton" tabindex="0"></i></span>
                    
                </p>
            </a>
        `

        this.$wrapper.innerHTML = media;
        this.#handleLikeButton();
        this.#handleClickOnImg();
        return this.$wrapper;
    }
}

export { MediaCard };