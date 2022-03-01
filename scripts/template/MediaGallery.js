class MediaGallery {
    constructor(anchorDOM, medias, MediaCard, MediaFactory) {
        this._medias = medias;
        this.MediaCard = MediaCard;
        this.MediaFactory = MediaFactory;
        this._anchorDOM = anchorDOM;
    }
    
    update(medias) {
        this._medias = medias;
        this.render();
    }

    render() {
        let wrapper = document.querySelector('.photograph-gallery-wrapper');

        if (wrapper) {
            wrapper.remove();
        }

        wrapper = document.createElement('div');
        wrapper.classList.add('photograph-gallery-wrapper');

        this._medias.forEach(media => {
            const mediaType = Object.prototype.hasOwnProperty.call(media, 'video') ? 'video': 'img';
            const mediaObject = new this.MediaFactory(media, mediaType);
            const mediaCard = new this.MediaCard(mediaObject);

            wrapper.appendChild(mediaCard.render());

            // this.$wrapper.appendChild(mediaCard.render())
        });
        
        this._anchorDOM.appendChild(wrapper)
    }
}

export { MediaGallery };