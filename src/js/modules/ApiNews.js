export default class ApiNews {
    constructor(url, token) {
        this.token = token;
        this.url = url;
    }

    getNews(keyword, from, to, size) {
        return fetch(`${this.url}/everything?q=${keyword}&from=${from}&to=${to}&language=ru&pageSize=${size}&apiKey=${this.token}`)
    }

    addNewsLocalStorage(data) {
        for (let i = 0; i < data.length; i++) {
            localStorage.setItem([i], JSON.stringify(data[i]));
        }
    }
}
