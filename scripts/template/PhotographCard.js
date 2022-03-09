class PhotographCard {
    constructor(photograph) {
        this._photograph = photograph;
    }

    render () {
        const $wrapper = document.createElement('div')
        $wrapper.classList.add('photograph-card-wrapper')

        const photographCard = `
                <a href="/photographer-page.html?id=${this._photograph.id}" aria-label="${this._photograph.name}">
                <img src="${this._photograph.portrait}" alt="" class="avatar-photo">
                    <h2>${this._photograph.name}</h2>
                </a>
                <p>
                    <span>${this._photograph.city}, ${this._photograph.country}</span>
                    <span tabindex="0">${this._photograph.tagline}</span>
                    <span>${this._photograph.price}€/jour</span>
                </p>
        `

        $wrapper.innerHTML = photographCard;
        return $wrapper;
    }
}

export { PhotographCard };