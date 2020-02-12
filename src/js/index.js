import '../styles/index.css'

import Validation from './utilits/validation'
import NewsCard from './components/NewsCard'
import NewsCardsList from './components/NewsCardsList';
import ApiNews from './modules/ApiNews.js';









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

const monthsRu = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

function formattedDate(date) {
    date = new Date(date);
    return `${date.getDate()} ${monthsRu[date.getMonth()]}, ${date.getFullYear()}`;
}

function showMoreNews() {
    moreNews.classList.remove('visually-hidden');
    moreNews.addEventListener('click', render);
}

function hideMoreNews() {
    moreNews.classList.add('visually-hidden');
    moreNews.removeEventListener('click', render);
}

const numCards = 3; // 3 новости

function render() {
    const data = storage.splice(-numCards, numCards);
    data.forEach(news => newsCardsList.addNewsCard(newsCard.createNewsCard(news)));
    if (storage.length) {
        showMoreNews();
    } else {
        hideMoreNews();
    }
}

const millisecondsInDay = 24 * 60 * 60 * 1000; // для подсчета
function getDate(interval = 0) {
    const date = new Date(Date.now() - interval * millisecondsInDay);
    return getFormattedDateYMD(date);
};

function getFormattedDateYMD(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}


const countDays = 7;
const numNews = 100;
const dateFrom = getDate(countDays);
const dateTo = getDate();
const headerSearch = document.querySelector('.result-search__header');

function searchNews() {
    input.setAttribute('disabled', true)
    buttonSearch.setAttribute('disabled', true);
    preloader.classList.remove('visually-hidden');
    if (input.value) {
        newsCardsList.deleteNewsCards();
        notFound.classList.add('visually-hidden');
        hideMoreNews();
        localStorage.clear();
        apiNews.getNews(input.value, dateFrom, dateTo, numNews)
            .then(res => {
                if (res.ok) {
                    headerSearch.classList.remove('visually-hidden');
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then(newsArray => {
                localStorage.setItem('news', JSON.stringify(newsArray));
                localStorage.setItem('keyword', input.value.trim());
                storage = newsArray.articles;
                if (storage.length > 0) {
                    render();

                } else {
                    notFound.classList.remove('visually-hidden');
                }
            })
            .catch(() => {
                alert(`${err}: ${err.status}`);
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
