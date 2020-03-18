export default class TitleResult {
    constructor(date) {
        this.date = date;
    }

    numTitle() {
        this.storage = this.date.articles;
        let resultTitle = 0;
        for (let i = 0; i < this.storage.length; i++) {
            if (this.storage[i].title.toUpperCase().indexOf(`${localStorage.getItem('keyword')}`.toUpperCase()) > 0) {
                resultTitle = resultTitle + 1;
            }
        }
        localStorage.setItem('resultTitle', resultTitle);
    }
}
