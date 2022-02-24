import { PhotographApi } from '../api/api.js';
import { Photograph } from '../models/Photograph.js';
import { PhotographHeader } from '../template/PhotographHeader.js';
import { ContactModal } from '../template/ContactModal.js';

import { ContactModalSubject } from '../publishers/ContactModalSubject.js';

class PhotographerPage {
    constructor() {
        this.$photographHeader = document.querySelector('.photograph-header');
        this.$photographFilters = document.querySelector('.photograph-filters');
        this.$photographGallery = document.querySelector('.photograph-gallery');
        this.$photographStats = document.querySelector('.photograph-stats');
        this.photographAPI = new PhotographApi('/data/photographers.json');

        //Publishers - Subscribers
        this.ContactModalSubject = new ContactModalSubject();

    }

    async main() {

        const photographId = parseInt(new URL(document.location).searchParams.get('id'));

        if(!photographId) {
            document.location.href = '/';
        }

        const photographsData = await this.photographAPI.getPhotographWithMedias(photographId);
        const photograph = new Photograph(photographsData);

        console.log(photographsData);

        //Publishers - Subscribers
        const modal = new ContactModal(photograph);
        this.ContactModalSubject.subscribe(modal);
        

        //Generate Header
        const photographHeaderTemplate = new PhotographHeader(photograph, this.ContactModalSubject);
        this.$photographHeader.appendChild(photographHeaderTemplate.render());

      


        //Generate Filters

        

        //Generate Gallery
        //Generate Stats
    }
}

const photographerPage = new PhotographerPage();
photographerPage.main();