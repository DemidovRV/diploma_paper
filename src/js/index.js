import '../styles/index.css'
import Validation from './utilits/validation'
import NewsCard from './components/NewsCard'
import NewsCardsList from './components/NewsCardsList'
import ApiNews from './modules/ApiNews'

const input = document.querySelector('.search__input');
const buttonSearch = document.querySelector('.search__button');
const preloader = document.querySelector('.type-news-loading');
const notFound = document.querySelector('.news-not-found');
const error = document.querySelector('.search__error');
const moreNews = document.querySelector('.result-search__button');

const valueInput = document.querySelector('.search__form');
const validate = new Validation(valueInput);
const result = document.querySelector('.result-search__cards');

const urlNews = 'https://newsapi.org/v2';
const tokNews = 'd473627e3cdd4c2e8ed438454c6cce31';

const apiNews = new ApiNews(urlNews, tokNews);
const newsCard = new NewsCard();
const newsCardsList = new NewsCardsList(result);
let storage;

const numCards = 3; // 3 новости

function render() {
    const dataNews = storage.splice(-numCards, numCards);
    dataNews.forEach(news => newsCardsList.addNewsCard(newsCard.createNewsCard(news)));
    if (storage.length) {
        moreNews.classList.remove('visually-hidden');
        moreNews.addEventListener('click', render);
    } else {
        moreNews.classList.add('visually-hidden');
        moreNews.removeEventListener('click', render);
    }
}

const millisecondsInDay = 24 * 60 * 60 * 1000; // для подсчета
function getDate(interval = 0) {
    const date = new Date(Date.now() - interval * millisecondsInDay);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const countDays = 6;
const numNews = 100;
const dateFrom = getDate(countDays);
const dateTo = getDate();
const resultSearch = document.querySelector('.result-search');

function searchNews() {
    input.setAttribute('disabled', true)
    buttonSearch.setAttribute('disabled', true);
    preloader.classList.remove('visually-hidden');

    if (input.value) {
        localStorage.clear();
        newsCardsList.deleteNewsCards();
        notFound.classList.add('visually-hidden');
        moreNews.classList.add('visually-hidden');
        moreNews.removeEventListener('click', render);
        apiNews.getNews(input.value, dateFrom, dateTo, numNews)
            .then(res => {
                if (res.ok) {
                    resultSearch.classList.add('visually-hidden');
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then(arrNews => {
                localStorage.setItem('news', JSON.stringify(arrNews));
                localStorage.setItem('keyword', input.value);
                localStorage.setItem('allItem', arrNews.totalResults);
                apiNews.addNewsLocalStorage(arrNews.articles);
                storage = arrNews.articles;
                if (storage.length > 0) {
                    render();
                    resultSearch.classList.remove('visually-hidden');
                } else {
                    notFound.classList.remove('visually-hidden');
                }
            })
            .catch(err => {
                error.textContent = (`${err}: ${err.status}`);
            })
            .finally(() => {
                preloader.classList.add('visually-hidden');
                input.removeAttribute('disabled')
                buttonSearch.removeAttribute('disabled');
            })
    }
}

buttonSearch.addEventListener('click', (e) => {
    e.preventDefault();
    searchNews();
});

if (localStorage.getItem('news')) {
    storage = JSON.parse(localStorage.getItem('news')).articles;
    input.value = localStorage.getItem('keyword');
    render();
    resultSearch.classList.remove('visually-hidden');

}
