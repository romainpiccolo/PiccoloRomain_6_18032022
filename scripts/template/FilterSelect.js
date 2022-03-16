class FilterSelect {
    constructor(medias, FilterPublisher) {
        this._medias = medias;
        this.FilterPublisher = FilterPublisher;

        this._menuItems = [];
        this._currentMenuItem = null;

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('filter-select-wrapper');
    }

    #showFilterList() {
        document.querySelector('.filters-list').style.display = 'block';
        document.getElementById('selectButton').setAttribute('aria-expanded', true);
        this._menuItems[0].focus();
        this._currentMenuItem = this._menuItems[0];
    }

    #hideFilterList() {
        document.getElementById('selectButton').focus();
        document.querySelector('.filters-list').style.display = 'none';
        document.getElementById('selectButton').removeAttribute('aria-expanded');
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

    #focusNextMenuItem() {
        const index = this._menuItems.findIndex(menuItem => menuItem === this._currentMenuItem);

        this._currentMenuItem = (index === this._menuItems.length - 1) ? this._menuItems[0] : this._menuItems[index + 1];
        this._currentMenuItem.parentElement.focus();

    }

    #focusPreviousMenuItem() {
        const index = this._menuItems.findIndex(menuItem => menuItem === this._currentMenuItem);

        this._currentMenuItem = (index === 0) ? this._menuItems[this._menuItems.length - 1] : this._menuItems[index - 1];
        this._currentMenuItem.parentElement.focus();
    }

    #handleKeyDown(event) {
        console.log(event.key);
        switch (event.key) {
            case 'Escape':
            case 'Esc':
            case 'Tab':
                this.#hideFilterList();
                break;

            case 'Tab':
                this.#hideFilterList();
                break;

            case 'ArrowDown':
                this.#focusNextMenuItem();
                break;

            case 'ArrowUp':
                this.#focusPreviousMenuItem();
                break;

            case 'Enter':
                console.log(this._currentMenuItem);
                break;
        
            default:
                break;
        }
    }

    #handleMenuKeyDown() {
        this.$wrapper.querySelector('#selectButton').addEventListener('keydown', (event) => this.#handleKeyDown(event));
        this.$wrapper.querySelectorAll('[role="menuitem"]').forEach(menuItem => {
            this._menuItems.push(menuItem);
            menuItem.addEventListener('keydown', (event) => this.#handleKeyDown(event))
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
                >
                    Popularité
                </button>

                <ul class="filters-list" role="menu" aria-labelledby="selectButton">
                    <li role="none">
                        <a role="menuitem" class="filter-item" value="popularity">Popularité</a>
                    </li>
                    <li class="white-line"></li>
                    <li role="none">
                        <a role="menuitem" class="filter-item" value="date">Date</a>
                    </li>
                    <li class="white-line"></li>
                    <li role="none">
                        <a role="menuitem" class="filter-item" value="title">Titre</a>
                    </li>
                </ul>
            </div>
        </div>
        `

        this.$wrapper.innerHTML = select;
        this.#handleSelectButton();
        this.#handleSelectItem();
        this.#handleMenuKeyDown();
        return this.$wrapper;
    }
}

export { FilterSelect };