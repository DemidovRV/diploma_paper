export default class ApiNews {
    constructor(url, tok) {
        this.tok = tok;
        this.url = url;
    }

    getNews(keyword, from, to, size) {
            return fetch(`${this.url}/everything?q=${keyword}&from=${from}&to=${to}&language=ru&pageSize=${size}&apiKey=${this.tok}`)
        }
        // преобразовываем
    addNewsLocalStorage(data) {
            for (let i = 0; i < data.length; i++) {
                localStorage.setItem([i], JSON.stringify(data[i]));
            }
        }
        // подсчитали общее колличество вхождений запроса в заголовок
    resultTitle(data) {
        let resultTitle = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].title.toUpperCase().indexOf(`${localStorage.getItem('keyword')}`.toUpperCase()) > 0) {
                resultTitle = resultTitle + 1;
            }
        }
        localStorage.setItem('resultTitle', resultTitle);
    }
}
