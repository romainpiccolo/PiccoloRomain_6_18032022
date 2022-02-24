class Api {
    constructor(url) {
        this._url = url
    }

    async get() {
        return fetch(this._url)
        .then(res => res.json())
        .catch(err => console.log('an error occurs', err))
    }
}

class PhotographApi extends Api {
    constructor(url) {
        super(url)
    }

    async getPhotographs() {
        const datas = await this.get();
        return datas.photographers;
    }

    async getPhotographWithMedias(photographId) {
        const datas = await this.get();

         //Include medias in photographers datas
        const photographer  = datas.photographers.find(photograph => photograph.id === photographId)
        photographer.medias = datas.media.filter(media => media.photographerId === photographId);

        return photographer;
    }
}

export { PhotographApi };