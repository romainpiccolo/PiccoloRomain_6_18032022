class FilterSelect {
    constructor(medias, FilterPublisher) {
        this._medias = medias;
        this.FilterPublisher = FilterPublisher;

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('filter-select-wrapper');
    }

    #showFilterList() {
        document.querySelector('.filters-list').style.display = 'block';
    }

    #hideFilterList() {
        document.querySelector('.filters-list').style.display = 'none';
    }

    #sortMediaByType(medias, type) {
        switch (type) {
            case 'popularity':
                return medias.sort((a, b) => b.likes - a.likes);
    
            case 'date':
                return medias.sort((a, b) => a.date < b.date ? 1 : -1);
    
            case 'title':
                return medias.sort((a, b) => {
                    return a.title > b.title ? 1 : (a.title === b.title ? 0 : -1);
                });
            default:
                return medias.sort((a, b) => a.likes - b.likes);
        }
    }

    #changeButtonValue(e) {
        const selectButton = this.$wrapper.querySelector('#selectButton');
        selectButton.textContent = e.target.textContent;
        selectButton.value = e.target.getAttribute('value');
    }

    #handleSelectButton() {
        this.$wrapper.querySelector('#selectButton')
		.addEventListener('click', () => this.#showFilterList());
    }

    #handleSelectItem() {

        this.$wrapper.querySelectorAll('.filter-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.#changeButtonValue(e);
                const value = e.target.getAttribute('value');
                const sortedMedias = this.#sortMediaByType(this._medias, value);
                this.FilterPublisher.notify(sortedMedias);
                this.#hideFilterList();
            })
        })
    }

    render() {
        const select = `
        <div class="photograph-main">
            <label for="filters" tabindex="0">Trier par</label>

            <div class="select-wrapper">
                <button
                    id="selectButton"
                    value="popularity"
                    class="select-button"
                    role="button"
                    aria-haspopup="listbox"
                >
                    Popularité
                </button>
                <ul class="filters-list" role="listbox">
                    <li tabindex="0" class="filter-item" value="popularity">
                        Popularité
                    </li>
                    <li class="white-line"></li>
                    <li tabindex="0" class="filter-item" value="date">Date</li>
                    <li class="white-line"></li>
                    <li tabindex="0" class="filter-item" value="title">Titre</li>
                </ul>
            </div>
        </div>
        `

        this.$wrapper.innerHTML = select;
        this.#handleSelectButton();
        this.#handleSelectItem();
        return this.$wrapper;
    }
}

export { FilterSelect };