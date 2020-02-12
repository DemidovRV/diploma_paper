export class NewsCard {
    constructor() {}

    createNewsCard(data) {
        const resultSearchCard = document.createElement('div');
        const resultSearchCardImg = document.createElement('img');
        const resultSearchCardContent = document.createElement('div');
        const resultSearchCardData = document.createElement('p');
        const resultSearchCardTitle = document.createElement('h2');
        const resultSearchCardTitleLink = document.createElement('a');
        const resultSearchCardText = document.createElement('p');
        const resultSearchCardLink = document.createElement('a');

        resultSearchCard.classList.add('result-search__card');
        resultSearchCardImg.classList.add('result-search__img');
        resultSearchCardContent.classList.add('result-search__content');
        resultSearchCardData.classList.add('result-search__data');
        resultSearchCardTitle.classList.add('result-search__title-card');
        resultSearchCardTitleLink.classList.add('result-search__title-link');
        resultSearchCardText.classList.add('result-search__text');
        resultSearchCardLink.classList.add('result-search__link');
        resultSearchCardLink.classList.add('link-cursor');

        resultSearchCardImg.setAttribute('src', `${data.urlToImage}`);
        resultSearchCardImg.setAttribute('alt', `${data.title}`);
        resultSearchCardData.textContent = formattedDate(data.publishedAt);;
        resultSearchCardTitleLink.setAttribute('href', `${data.url}`);
        resultSearchCardTitleLink.setAttribute('target', '_blank');
        resultSearchCardTitleLink.textContent = data.title;
        resultSearchCardText.textContent = data.description;
        resultSearchCardLink.setAttribute('href', `${data.url}`);
        resultSearchCardLink.setAttribute('target', '_blank');
        resultSearchCardLink.textContent = data.source.name;

        resultSearchCard.appendChild(resultSearchCardImg);
        resultSearchCard.appendChild(resultSearchCardContent);
        resultSearchCardContent.appendChild(resultSearchCardData);
        resultSearchCardContent.appendChild(resultSearchCardTitle);
        resultSearchCardContent.appendChild(resultSearchCardText);
        resultSearchCardContent.appendChild(resultSearchCardLink);
        resultSearchCardTitle.appendChild(resultSearchCardTitleLink);

        return resultSearchCard;
    }
}
