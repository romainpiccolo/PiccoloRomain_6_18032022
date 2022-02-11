import { mediaIsAVideo, createCustomDOM } from '../utils/helpers.js'

class Lightbox {

    static #mediaIsAVideo = mediaIsAVideo;
    static #lightboxDOM = document.getElementById('lightbox');
    static #previousContentDOM = document.getElementById('lightbox-previous');
    static #nextContentDOM = document.getElementById('lightbox-next');
    static #closeLightbox = document.getElementById('lightbox-close');

    static #dialogContent = document.querySelector('.dialog-content');

    static #imgContentDOM =  document.querySelector('.dialog-img-content');
    static #videoContentDOM =  document.querySelector('.dialog-video-content');
    static #contentPATH = `assets/photographers/medias/`;

    constructor(listMedias, currentId) {
        this.medias = listMedias;
        this.currentId = currentId;
    }

    #openLightbox() {
        Lightbox.#lightboxDOM.style.display = 'flex';
    }

    #createImgContent(media) {
        const imgPATH = Lightbox.#contentPATH + `${media.photographerId}/${media.image}`;

        return createCustomDOM(
            'img',
            { src: imgPATH, alt: media.title, id: 'content' },
            ['dialog-img-content']
        );
    }

    #createVideoContent(media) {
        const videoPATH = Lightbox.#contentPATH + `${media.photographerId}/${media.video}`;

        return createCustomDOM(
            'video',
            { src: videoPATH, alt: media.alt, controls: true, id: 'content' },
            ['dialog-video-content']
        );
    }


    init() {
        Lightbox.#previousContentDOM.addEventListener('click', () => this.previous());
        Lightbox.#nextContentDOM.addEventListener('click', () => this.next());
        Lightbox.#closeLightbox.addEventListener('click', this.close);
        document.body.classList.add('stop-scrolling');

        this.loadContent();
        this.#openLightbox();
    }

    loadContent() {
        const media = this.medias.find(media => media.id === this.currentId);
        const mediaIsAVideo = Lightbox.#mediaIsAVideo(media);
        const currentContent = document.getElementById('content');

        if (currentContent) {
            currentContent.remove();
        }

        const content = mediaIsAVideo ? this.#createVideoContent(media) : this.#createImgContent(media);
        Lightbox.#dialogContent.append(content);
    }

    next() {
        const currentIndex = this.medias.findIndex(media => media.id === this.currentId)

        if (currentIndex < this.medias.length - 1) {
            this.currentId = this.medias[currentIndex + 1].id;
        } else {
            this.currentId = this.medias[0].id;
        }
        this.loadContent();
    }

    previous() {
        
        const currentIndex = this.medias.findIndex(media => media.id === this.currentId)

        if (currentIndex > 0) {
            this.currentId = this.medias[currentIndex - 1].id;
        } else {
            this.currentId = this.medias[this.medias.length - 1].id;
        }
        this.loadContent();
    }

    close() {
        document.body.classList.remove('stop-scrolling');
        Lightbox.#lightboxDOM.style.display = 'none';
    }
}

export { Lightbox };