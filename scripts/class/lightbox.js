class Lightbox {

    constructor(elementHTML, listMedias, currentId) {
        this.elementHTML = elementHTML;
        this.medias = listMedias;
        this.currentId = currentId;
    }

    debugMediasList() {
        console.log(this.medias);
        console.log(this.currentId);
    }

    loadContent(content) {
        // 
    }

    next() {

    }

    previous() {

    }
}

export { Lightbox };