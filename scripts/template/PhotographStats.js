class PhotographStats {
    constructor(photograph) {
        this._photograph = photograph
        this._totalLikes = this._photograph._medias.reduce((total, current) => total + parseInt(current.likes), 0);

        this.$wrapper = document.createElement('div')
        this.$wrapper.classList.add('photograph-stat-wrapper')
    }

    update(action) {
        if (action === 'INC') {
            this._totalLikes += 1;
        } else if (action === 'DEC') {
            this._totalLikes -= 1;
        }

        this.$wrapper.querySelector('#statsTotalLikes').textContent = this._totalLikes;
    }

    render() {
        const photographStats = `
            <p><span id="statsTotalLikes">${this._totalLikes}</span><span>${this._photograph.price}€ / jour</span></p>
        `

        this.$wrapper.innerHTML = photographStats;
        return this.$wrapper;
    }
}

export { PhotographStats };