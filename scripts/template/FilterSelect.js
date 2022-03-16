class FilterSelect {
    constructor(medias, FilterPublisher) {
        this._medias = medias;
        this.FilterPublisher = FilterPublisher;

        this._menuItems = [];
        this._currentMenuItem = null;

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('filter-select-wrapper');
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

    #showFilterList() {
        document.querySelector('.filters-list').style.display = 'block';
        document.getElementById('selectButton').setAttribute('aria-expanded', true);
        this._menuItems[0].focus();
        this._currentMenuItem = this._menuItems[0];
    }

    #hideFilterList() {
        document.querySelector('.filters-list').style.display = 'none';
        document.getElementById('selectButton').removeAttribute('aria-expanded');
        this.$wrapper.querySelector('label').focus();
        this._currentMenuItem = this._menuItems[0];
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

    //Focus on an item of the select listbox
    #focusMenuItem(action) {
        const index = this._menuItems.findIndex(menuItem => menuItem === this._currentMenuItem);

        if (action === 'NEXT') {
            this._currentMenuItem = (index === this._menuItems.length - 1) ? this._menuItems[0] : this._menuItems[index + 1];
        } else if (action === 'PREV') {
            this._currentMenuItem = (index === 0) ? this._menuItems[this._menuItems.length - 1] : this._menuItems[index - 1];
        }

        this._currentMenuItem.focus();
    }

    #handleKeyDown(event) {
        switch (event.key) {
            case 'Escape':
            case 'Esc':
            case 'Tab':
                this.#hideFilterList();
                break;

            case 'ArrowDown':
                this.#focusMenuItem('NEXT');
                break;

            case 'ArrowUp':
                this.#focusMenuItem('PREV');
                break;

            case 'Enter':
                this.#sortGallery(event)
                break;
        
            default:
                break;
        }
    }

    #sortGallery(e) {
        this.#changeButtonValue(e);
        const sortedMedias = this.#sortMediaByType(this._medias, e.target.getAttribute('value'));
        this.FilterPublisher.notify(sortedMedias);
        this.#hideFilterList();
    }

    #handleMenuItem() {
        this.$wrapper.querySelectorAll('[role="menuitem"]').forEach(menuItem => {
            this._menuItems.push(menuItem);

            menuItem.addEventListener('click', (e) => this.#sortGallery(e));
            menuItem.addEventListener('keydown', (event) => this.#handleKeyDown(event));
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
                    aria-haspopup="true"
                    aria-controls="menu2"
                    type="button"
                >
                    Popularité
                </button>

                <ul class="filters-list" role="menu" aria-labelledby="selectButton">
                    <li role="none">
                        <a role="menuitem" tabindex="0" class="filter-item" value="popularity">Popularité</a>
                    </li>
                    <li class="white-line"></li>
                    <li role="none">
                        <a role="menuitem" tabindex="0" class="filter-item" value="date">Date</a>
                    </li>
                    <li class="white-line"></li>
                    <li role="none">
                        <a role="menuitem" tabindex="0" class="filter-item" value="title">Titre</a>
                    </li>
                </ul>
            </div>
        </div>
        `

        this.$wrapper.innerHTML = select;
        this.#handleSelectButton();
        this.#handleMenuItem();
        return this.$wrapper;
    }
}

export { FilterSelect };