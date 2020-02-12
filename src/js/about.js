import '../styles/about.css'
import ApiGithub from './modules/ApiGithub'
import { HistoryCard } from './components/HistoryCard'
import Glide from '@glidejs/glide'

const arr = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'ноября', 'декабря'];

function getDateFormatted(date) {
    date = new Date(date);
    return `${date.getDate()} ${arr[date.getMonth()]}, ${date.getFullYear()}`;
}

const githubUrl = 'https://api.github.com';
const githubUsername = 'DemidovRV';
const githubRepo = 'diploma_paper';
const githubTok = 'e661202249863c2c56568c63bbc3deee182e6b14';
const githubNum = '15';
const apiGithub = new ApiGithub(githubUrl, githubUsername, githubRepo, githubTok, githubNum);

const container = document.querySelector('.glide__slides');
const historyCard = new HistoryCard();
let bank;

apiGithub.getCommits()
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
    .then(commits => {
        bank = commits;
        bank.forEach(commit => container.appendChild(historyCard.createHistoryCard(commit)));
        const glide = new Glide('.glide', {
            type: "slider",
            perView: 3,
            startAt: 2,
            focusAt: 'center',
            peek: 15,
            breakpoints: {
                1440: {
                    type: "slider",
                    perView: 3,
                    startAt: 2,
                    focusAt: 'center',
                    peek: 15,
                },
                768: {
                    type: "slider",
                    perView: 2,
                    startAt: 1,
                    focusAt: 0,
                    peek: 15,
                },
                320: {
                    type: "slider",
                    perView: 0,
                    startAt: 0,
                    focusAt: 'center',
                    peek: 10
                }
            }
        })
        glide.mount();
    })
    .catch(err => {
        alert(`${err}: ${err.status}`);
        console.log(`${err}: ${res.status}`);
    });
