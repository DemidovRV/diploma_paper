const monthsRu = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

function formattedDate(date) {
    date = new Date(date);
    return `${date.getDate()} ${monthsRu[date.getMonth()]}, ${date.getFullYear()}`;
}

export default class NewsCard {

    createNewsCard(data) {
        const resultSearchCard = document.createElement('a');
        const resultSearchCardImg = document.createElement('img');
        const resultSearchCardContent = document.createElement('div');
        const resultSearchCardData = document.createElement('p');
        const resultSearchCardTitle = document.createElement('h2');
        const resultSearchCardText = document.createElement('p');
        const resultSearchCardSource = document.createElement('p');

        resultSearchCard.setAttribute(`href`, `${data.url}`);
        resultSearchCard.setAttribute('target', '_blank');
        resultSearchCardImg.setAttribute('src', `${data.urlToImage}`);
        resultSearchCardImg.setAttribute('alt', `${data.title}`);
        resultSearchCardTitle.textContent = data.title;
        resultSearchCardData.textContent = formattedDate(data.publishedAt);
        resultSearchCardText.textContent = data.description;
        resultSearchCardSource.textContent = data.source.name;

        resultSearchCard.classList.add('result-search__card');
        resultSearchCard.classList.add('link-cursor');
        resultSearchCardImg.classList.add('result-search__img');
        resultSearchCardContent.classList.add('result-search__content');
        resultSearchCardData.classList.add('result-search__data');
        resultSearchCardTitle.classList.add('result-search__title-card');
        resultSearchCardText.classList.add('result-search__text');
        resultSearchCardSource.classList.add('result-search__link');

        resultSearchCard.appendChild(resultSearchCardImg);
        resultSearchCard.appendChild(resultSearchCardContent);
        resultSearchCardContent.appendChild(resultSearchCardData);
        resultSearchCardContent.appendChild(resultSearchCardTitle);
        resultSearchCardContent.appendChild(resultSearchCardText);
        resultSearchCardContent.appendChild(resultSearchCardSource);

        return resultSearchCard;
    }
}
