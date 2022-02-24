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

    async getPhotographsWithMedias() {
        const datas = await this.get();

         //Include medias in photographers datas
         datas.photographers.map(photograph => {
            photograph.medias = datas.media.filter(media => media.photographerId === photograph.id);
        })

        return datas.photographers;
    }
}

export { PhotographApi };