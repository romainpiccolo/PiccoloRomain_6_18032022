class MediaCard {
    constructor(media, StatsPublisher, LightboxPublisher) {
        this._media = media;
        this._likes = media.likes;
        this.StatsPublisher = StatsPublisher;
        this.LightboxPublisher = LightboxPublisher;

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('photograph-media-wrapper');
    }

    #handleLike(event) {
        if (this._media.isLiked) {
            this.StatsPublisher.notify('DEC');
            this._likes -= 1;
            this._media.subLike()
        } else {
            this.StatsPublisher.notify('INC');
            this._likes += 1;
            this._media.addLike()
        }

        event.target.previousSibling.textContent = this._likes;
    }

    #handleLikeButton() {
        this.$wrapper.querySelector('#likeButton')
		.addEventListener('click', (e) => {
            this.#handleLike(e);
        });
    }

    #handleClickOnImg() {
        this.$wrapper.querySelector('.gallery-img')
            .addEventListener('click', () => {
                this.LightboxPublisher.notify('OPEN', this._media.id);
            })
    }

    #handleEnterOnImg() {
        this.$wrapper.querySelector('.gallery-img')
            .addEventListener('keydown', (event) => {
                if (event.defaultPrevented || event.code !== 'Enter')
                    return;

                this.LightboxPublisher.notify('OPEN', this._media.id);
            });
    }

    #handleEnterOnLike() {
        this.$wrapper.querySelector('#likeButton')
            .addEventListener('keydown', (event) => {
                if (event.defaultPrevented || event.code !== 'Enter')
                    return;

                this.#handleLike(event);
            });
    }

    render() {
        const media = `
            <article>
                <${this._media.mediaType} tabindex="0" src="${this._media.thumbnail}" id="${this._media.id}" class="gallery-img" aria-label="${this._media.title}, closeup view" alt="${this._media.title}"></${this._media.mediaType}>
                <p class="gallery-img-infos">
                    <span tabindex="0">${this._media.title}</span>
                    <span>${this._likes}<a role="button" tabindex="0" id="likeButton" aria-label="${this._likes} likes"><i class="fas fa-heart"></i></a></span>
                </p>
            </article>
        `

        this.$wrapper.innerHTML = media;
        this.#handleLikeButton();
        this.#handleClickOnImg();
        this.#handleEnterOnImg();
        this.#handleEnterOnLike();
        return this.$wrapper;
    }
}

export { MediaCard };