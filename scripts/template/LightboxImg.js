class LightboxImg {
    constructor(media) {
        this._media = media;
    }

    render() {
        const wrapper = Object.assign(document.createElement('div'), {id: 'content-wrapper'});

        const lightboxImg = `
                <img tabindex="0" src="${this._media.thumbnail}" alt="${this._media.title}" id="imgContent" />
                <p tabindex="0">${this._media.title}</p>
        `

        wrapper.innerHTML = lightboxImg;
        return wrapper;
    }
}

export { LightboxImg };