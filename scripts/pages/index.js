import { PhotographApi } from '../api/api.js';
import { Photograph } from '../models/Photograph.js';
import { PhotographCard } from '../template/PhotographCard.js'

class IndexPage {
    constructor() {
        this.$photographWrapper = document.querySelector('.photographer_section');
        this.photographAPI = new PhotographApi('/data/photographers.json');
    }

    async main() {
        const photographsData = await this.photographAPI.getPhotographs();

        photographsData.map(photograph => new Photograph(photograph))
        .forEach(photograph => {
            const template = new PhotographCard(photograph);
            this.$photographWrapper.appendChild(template.render());
        })
    }
}

const indexPage = new IndexPage();
indexPage.main();