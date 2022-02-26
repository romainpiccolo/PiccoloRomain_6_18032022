class FilterSelect {
    constructor(medias) {
        this._medias = medias;
        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('filter-select-wrapper');
    }

    #showFilterList() {
        document.querySelector('.filters-list').style.display = 'block';
    }

    #hideFilterList() {
        document.querySelector('.filters-list').style.display = 'none';
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
                console.log(value);
                // sortContent();
                this.#hideFilterList();
            })
        })
    }

    render() {
        const select = `
        <div class="photograph-main">
            <label for="filters">Trier par</label>

            <div class="select-wrapper">
                <button
                    id="selectButton"
                    value="popularity"
                    class="select-button"
                >
                    Popularité
                </button>
                <ul class="filters-list">
                    <li class="filter-item" value="popularity">
                        Popularité
                    </li>
                    <li class="white-line"></li>
                    <li class="filter-item" value="date">Date</li>
                    <li class="white-line"></li>
                    <li class="filter-item" value="title">Titre</li>
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