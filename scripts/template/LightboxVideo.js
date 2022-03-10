class LightboxVideo {
    constructor(media) {
        this._media = media;
    }

    render() {
        const wrapper = Object.assign(document.createElement('div'), {id: 'content-wrapper'});

        const lightboxVideo = `
                <video tabindex="0" src="${this._media.thumbnail}" alt="${this._media.title}" controls id="videoContent" /></video>
                <p tabindex="0">${this._media.title}</p>
        `

        wrapper.innerHTML = lightboxVideo;
        return wrapper;
    }
}

export { LightboxVideo };