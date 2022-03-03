class LightboxVideo {
    constructor(media) {
        this._media = media;
    }

    render() {
        const wrapper = Object.assign(document.createElement('div'), {id: 'content-wrapper'});

        const lightboxVideo = `
                <video src="${this._media.thumbnail}" alt="${this._media.title}" controls id="videoContent" />
        `

        wrapper.innerHTML = lightboxVideo;
        return wrapper;
    }
}

export { LightboxVideo };