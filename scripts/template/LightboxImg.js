class LightboxImg {
    constructor(media) {
        this._media = media;
    }

    render() {
        const wrapper = Object.assign(document.createElement('div'), {id: 'content-wrapper'});

        const lightboxImg = `
                <img src="${this._media.thumbnail}" alt="${this._media.title}" id="imgContent" />
        `

        wrapper.innerHTML = lightboxImg;
        return wrapper;
    }
}

export { LightboxImg };