function showFilters() {
    const filtersList = document.querySelector('.filters-list');
    filtersList.style.display = 'block';
}

function hideFilters() {
    const filtersList = document.querySelector('.filters-list');
    filtersList.style.display = 'none';
}


export { showFilters, hideFilters };