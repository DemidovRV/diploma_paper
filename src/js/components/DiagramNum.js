export default class DiagramNum {
    constructor(container, keyword) {
        this.container = container;
        this.keyword = keyword;
        this.diagramNumItem = this.diagramNumItem.bind(this);
        this.diagramNumItem();
    }

    diagramNumItem() {
        const arrNews = [];
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.getItem(i)) {
                arrNews.push(JSON.parse(localStorage.getItem(i)));
            }
        }
        arrNews.forEach(itemNews => {
            itemNews.publishedAt = new Date(itemNews.publishedAt.substring(0, 10)).getDate();
        })
        for (let i = 0; i < 7; i++) {
            const today = new Date();
            today.setDate(today.getDate() - i);
            const arrDay = arrNews.filter(itemNews => {
                return itemNews.publishedAt % today.getDate() === 0;
            });
            let resultTitle = 0;
            for (let i = 0; i < arrDay.length; i++) {
                if (arrDay[i].title.toUpperCase().indexOf(`${localStorage.getItem('keyword')}`.toUpperCase()) > 0) {
                    resultTitle = resultTitle + 1;
                }
            }
            let resultDescription = 0;
            for (let i = 0; i < arrDay.length; i++) {
                if (arrDay[i].description.toUpperCase().indexOf(`${localStorage.getItem('keyword')}`.toUpperCase()) > 0) {
                    resultDescription = resultDescription + 1;
                }
            }
            const result = resultTitle + resultDescription;
            localStorage.setItem(`ResultColumn${i}`, result);

            this.container.querySelector(`.diagram__column-line-item_${7 - i}`).style.width = `${result}%`;
            this.container.querySelector(`.diagram__column-line-item_${7 - i}`).textContent = result;
        }
    }
}
