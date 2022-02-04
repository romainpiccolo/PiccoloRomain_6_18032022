/**
 * Fonction permettant d'ajouter un element dans un autre
 * 
 * @param {string} parentId - Id de l'élément à appeler
 * @param {string} elem - tag de l'élément à créer
 * @param {string[]} classElem - tableau de chaine de classes à ajouter
 * @param {string} idElem - id de l'element à inserer
 * @param {onClickCallback} fonct - fonction executé sur clic souris
 */
 function jdeAttachElem(parentId, elem, classElem = [], idElem = "", fonct = "") {
    let elemACreer = document.createElement(elem)
    if (classElem.length > 0) {
        for (uneClasse in classElem) {
            elemACreer.classList.add(classElem[uneClasse])
        }

    }
    if (idElem != "") {
        elemACreer.id = idElem
    }
    if (fonct != "") {
        elemACreer.addEventListener('click', fonct);
    }
    document.getElementById(parentId).appendChild(elemACreer)

}