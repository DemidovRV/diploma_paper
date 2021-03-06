export default class ApiGithub {
    constructor(url, username, repo, token, num) {
        this._url = url;
        this._username = username;
        this._repo = repo;
        this._token = token;
        this._numCommits = num;
    }

    getCommits() {
        return fetch(`${this._url}/repos/${this._username}/${this._repo}/commits?per_page=${this._numCommits}`, {
            headers: {
                authorization: `tok ${this._token}`,
            }
        })
    }
}
