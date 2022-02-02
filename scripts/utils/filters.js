function showFilters() {
    const filtersList = document.querySelector('.filters-list');

    filtersList.style.display = 'block';
}

function hideFilters() {
    const filtersList = document.querySelector('.filters-list');

    filtersList.style.display = 'none';
}

function sortContent(e) {
    const filterValue = e.target.attributes.value.value;
    const selectButton = document.querySelector('.select-button');

    hideFilters();
    selectButton.textContent = e.target.textContent;

    console.log(filterValue);
}