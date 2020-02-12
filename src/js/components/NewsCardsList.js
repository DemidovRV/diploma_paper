export class NewsCardsList {
    constructor(container) {
        this._container = container;
    }

    addNewsCard(newsCard) {
        this._container.appendChild(newsCard);
    }

    deleteNewsCards() {
        [...this._container.children].forEach(newsCard => newsCard.remove());
    }
}
