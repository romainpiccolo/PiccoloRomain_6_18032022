import { PhotographApi } from '../api/api.js';
import { Photograph } from '../models/Photograph.js';
import { PhotographHeader } from '../template/PhotographHeader.js';
import { ContactModal } from '../template/ContactModal.js';
import { SuccessModal } from '../template/SuccessModal.js'

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
    }

    async main() {

        const photographId = parseInt(new URL(document.location).searchParams.get('id'));

        if(!photographId) {
            document.location.href = '/';
        }

        const photographsData = await this.photographAPI.getPhotographWithMedias(photographId);
        const photograph = new Photograph(photographsData);

        console.log(photographsData);

        //Generate Success Modal
        const successModalTemplate = new SuccessModal();
        this.$successModal.appendChild(successModalTemplate.render());

        //Generate Contact Modal
        const contactModalTemplate = new ContactModal(photograph, Validator, successModalTemplate);
        this.$contactModal.appendChild(contactModalTemplate.render());

        //Generate Header
        const photographHeaderTemplate = new PhotographHeader(photograph, contactModalTemplate);
        this.$photographHeader.appendChild(photographHeaderTemplate.render());

      


        //Generate Filters

        

        //Generate Gallery
        //Generate Stats
    }
}

const photographerPage = new PhotographerPage();
photographerPage.main();