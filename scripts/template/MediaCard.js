class MediaCard {
    constructor(media, StatsPublisher) {
        this._media = media;
        this._totalLikes = media.likes;
        this._isLiked = false;
        this.StatsPublisher = StatsPublisher;

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('photograph-media-wrapper');
    }

    #handleLikeButton() {
        this.$wrapper.querySelector('#likeButton')
		.addEventListener('click', (e) => {
            if (this._isLiked) {
                this.StatsPublisher.notify('DEC');
                this._totalLikes -= 1; 
                this._isLiked = false;
            } else {
                this.StatsPublisher.notify('INC');
                this._totalLikes += 1; 
                this._isLiked = true;
            }
            
            e.target.textContent = this._totalLikes;
        });
    }

    render() {
        const media = `
            <a>
                <${this._media.mediaType} src="${this._media.thumbnail}" id="${this._media.id}" class="gallery-img"></${this._media.mediaType}>
                <p class="gallery-img-infos">
                <span>${this._media.title}</span>
                <span id="likeButton" data-id="${this._media.id}">${this._totalLikes}</span>
                </p>
            </a>
        `

        this.$wrapper.innerHTML = media;
        this.#handleLikeButton();
        return this.$wrapper;
    }
}

export { MediaCard };