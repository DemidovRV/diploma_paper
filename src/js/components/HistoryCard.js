const arr = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'ноября', 'декабря'];

function getDateFormatted(date) {
    date = new Date(date);
    return `${date.getDate()} ${arr[date.getMonth()]}, ${date.getFullYear()}`;
}
export class HistoryCard {
    createHistoryCard(data) {
        const glideSlide = document.createElement('li');
        const historyGitCard = document.createElement('div');
        const historyGitConteiner = document.createElement('div');
        const historyGitDate = document.createElement('p');
        const historyGitCardInfo = document.createElement('div')
        const historyGitCardAvatar = document.createElement('img');
        const historyGitCardInfoName = document.createElement('div');
        const historyGitCardTitle = document.createElement('h3');
        const historyGitCardMail = document.createElement('p');
        const historyGitCardContent = document.createElement('p');

        glideSlide.classList.add('glide__slide');
        historyGitCard.classList.add('history-git__card');
        historyGitConteiner.classList.add('history-git__card-container');
        historyGitDate.classList.add('history-git__date');
        historyGitCardInfo.classList.add('history-git__card-info');
        historyGitCardAvatar.classList.add('history-git__card-avatar');
        historyGitCardInfoName.classList.add('history-git__card-info-name');
        historyGitCardTitle.classList.add('history-git__card-title');
        historyGitCardMail.classList.add('history-git__card-mail');
        historyGitCardContent.classList.add('history-git__card-content');

        historyGitDate.textContent = getDateFormatted(data.commit.author.date);
        historyGitCardAvatar.setAttribute('src', `${data.author.avatar_url}`);
        historyGitCardAvatar.setAttribute('alt', `фото ${data.commit.author.name}`);
        historyGitCardTitle.textContent = data.commit.author.name;
        historyGitCardMail.textContent = data.commit.author.email;
        historyGitCardContent.textContent = data.commit.message;

        glideSlide.appendChild(historyGitCard);
        historyGitCard.appendChild(historyGitConteiner);
        historyGitConteiner.appendChild(historyGitDate);
        historyGitConteiner.appendChild(historyGitCardInfo);
        historyGitCardInfo.appendChild(historyGitCardAvatar);
        historyGitCardInfo.appendChild(historyGitCardInfoName);
        historyGitCardInfoName.appendChild(historyGitCardTitle);
        historyGitCardInfoName.appendChild(historyGitCardMail);
        historyGitConteiner.appendChild(historyGitCardContent);

        return glideSlide;
    }
}
