class Photograph {
    constructor(data) {
        this._city = data.city;
        this._country = data.country;
        this._id = data.id;
        this._name = data.name;
        this._portrait = data.portrait;
        this._price = data.price;
        this._tagline = data.tagline;
        this._medias = data.medias;
    }

    get city() {
        return this._city
    }

    get country() {
        return this._country
    }

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    get portrait() {
        return `assets/photographers/avatar/${this._portrait}`
    }

    get price() {
        return this._price
    }

    get tagline() {
        return this._tagline
    }

    get medias() {
        return this._medias
    }
}

export { Photograph };