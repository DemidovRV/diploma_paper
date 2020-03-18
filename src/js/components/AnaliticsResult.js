export default class AnaliticsResult {
    constructor(keyword, allItem, resultTitle) {
        this.keyword = keyword;
        this.allItem = allItem;
        this.resultTitle = resultTitle;

        this.spanTitle = document.querySelector('.requested-info__title-span');
        this.spanAllItem = document.getElementById('allItem');
        this.spanResultTitle = document.getElementById('resultTitle');
    }

    addContent() {
        this.spanTitle.textContent = this.keyword;
        this.spanAllItem.textContent = this.allItem;
        this.spanResultTitle.textContent = this.resultTitle;
    }
}
