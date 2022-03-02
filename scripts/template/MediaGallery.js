import { MediaCard } from '../template/MediaCard.js';

class MediaGallery {
    constructor(anchorDOM, medias, StatsPublisher, LightboxPublisher) {
        this._medias = medias;
        this._anchorDOM = anchorDOM;
        this.StatsPublisher = StatsPublisher;
        this.LightboxPublisher = LightboxPublisher;
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
            const mediaCard = new MediaCard(media, this.StatsPublisher, this.LightboxPublisher);
            wrapper.appendChild(mediaCard.render());
        });
        
        this._anchorDOM.appendChild(wrapper)
    }
}

export { MediaGallery };