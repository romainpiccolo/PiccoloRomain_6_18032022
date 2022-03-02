import { PhotographApi } from '../api/api.js';
import { Photograph } from '../models/Photograph.js';
import { PhotographHeader } from '../template/PhotographHeader.js';
import { PhotographStats } from '../template/PhotographStats.js';
import { MediaGallery } from '../template/MediaGallery.js';
import { ContactModal } from '../template/ContactModal.js';
import { SuccessModal } from '../template/SuccessModal.js'
import { FilterSelect } from '../template/FilterSelect.js'

import { MediaFactory } from '../factories/MediasFactory.js';

import { FilterPublisher } from '../publishers/FilterPublisher.js';
import { StatsPublisher } from '../publishers/StatsPublisher.js';


import { Validator } from '../utils/Validator.js'

class PhotographerPage {
    constructor() {
        this.$photographHeader = document.querySelector('.photograph-header');
        this.$photographFilters = document.querySelector('.photograph-filters');
        this.$photographGallery = document.querySelector('.photograph-gallery');
        this.$photographStats = document.querySelector('.photograph-stats');

        this.$contactModal = document.getElementById('contactModal');
        this.$successModal = document.getElementById('successModal');

        this.photographAPI = new PhotographApi('/data/photographers.json');

        this.FilterPublisher = new FilterPublisher();
        this.StatsPublisher = new StatsPublisher();
    }

    #getPhotographMedias(photograph) {
        let photographMedias = [];

        photograph._medias.forEach(media => {
            const mediaType = Object.prototype.hasOwnProperty.call(media, 'video') ? 'video': 'img';
            photographMedias.push(new MediaFactory(media, mediaType));
        })

        return photographMedias;
    }

    async main() {

        const photographId = parseInt(new URL(document.location).searchParams.get('id'));

        if(!photographId) {
            document.location.href = '/';
        }

        //Fetch photograph datas and medias
        const photographsData = await this.photographAPI.getPhotographWithMedias(photographId);
        const photograph = new Photograph(photographsData);
        const photographMedias = this.#getPhotographMedias(photograph);

        //Generate Success Modal
        const successModal = new SuccessModal();
        this.$successModal.appendChild(successModal.render());

        //Generate Contact Modal
        const contactModal = new ContactModal(photograph, Validator, successModal);
        this.$contactModal.appendChild(contactModal.render());

        //Generate Header
        const photographHeader = new PhotographHeader(photograph, contactModal);
        this.$photographHeader.appendChild(photographHeader.render());

        //Generate Filters
        const filterSelect = new FilterSelect(photographMedias, this.FilterPublisher);
        this.$photographFilters.appendChild(filterSelect.render());

        //Generate Gallery
        const mediaGallery = new MediaGallery(this.$photographGallery, photographMedias, this.StatsPublisher);
        mediaGallery.render();
        this.FilterPublisher.subscribe(mediaGallery);

        //Generate Stats
        const photographStats = new PhotographStats(photograph);
        this.$photographStats.appendChild(photographStats.render());
        this.StatsPublisher.subscribe(photographStats);
    }
}

const photographerPage = new PhotographerPage();
photographerPage.main();