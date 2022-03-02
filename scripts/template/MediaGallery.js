import { MediaCard } from '../template/MediaCard.js';
import { MediaFactory } from '../factories/MediasFactory.js';

class MediaGallery {
    constructor(anchorDOM, medias, StatsPublisher) {
        this._medias = medias;
        this._anchorDOM = anchorDOM;
        this.StatsPublisher = StatsPublisher;
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
            const mediaCard = new MediaCard(media, this.StatsPublisher);
            wrapper.appendChild(mediaCard.render());
        });
        
        this._anchorDOM.appendChild(wrapper)
    }
}

export { MediaGallery };