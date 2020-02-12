export class ApiNews {
    constructor(url, tok) {
        this.tok = tok;
        this.url = url;
    }

    getNews(keyword, from, to, size) {
        return fetch(`${this.url}/everything?q=${keyword}&from=${from}&to=${to}&language=ru&pageSize=${size}&apiKey=${this.tok}`)
    }
}
