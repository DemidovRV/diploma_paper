export default class DiagramDay {
    constructor(container) {
        this.container = container;

        this.datecolumn1 = this.container.querySelector('.diagram__date_1');
        this.datecolumn2 = this.container.querySelector('.diagram__date_2');
        this.datecolumn3 = this.container.querySelector('.diagram__date_3');
        this.datecolumn4 = this.container.querySelector('.diagram__date_4');
        this.datecolumn5 = this.container.querySelector('.diagram__date_5');
        this.datecolumn6 = this.container.querySelector('.diagram__date_6');
        this.datecolumn7 = this.container.querySelector('.diagram__date_7');
        this.month = this.container.querySelector('.diagram__name-column-span');
        this.addDay();
    }

    addDay() {
        this.datecolumn1.textContent = localStorage.getItem('dateColumn0');
        this.datecolumn2.textContent = localStorage.getItem('dateColumn1');
        this.datecolumn3.textContent = localStorage.getItem('dateColumn2');
        this.datecolumn4.textContent = localStorage.getItem('dateColumn3');
        this.datecolumn5.textContent = localStorage.getItem('dateColumn4');
        this.datecolumn6.textContent = localStorage.getItem('dateColumn5');
        this.datecolumn7.textContent = localStorage.getItem('dateColumn6');
        this.month.textContent = localStorage.getItem('month');
        const dateColumn = new Date();
        const day = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
        const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'ноябрь', 'декабрь'];
        let dayWeek = day[dateColumn.getDay()];
        const month = months[dateColumn.getMonth() - 1];

        localStorage.setItem(`month`, `(${month})`);
        localStorage.setItem(`dateColumn0`, `${dateColumn.getDate()}, ${dayWeek}`);

        for (let i = 1; i < 7; i++) {
            dateColumn.setDate(dateColumn.getDate() - 1);
            dayWeek = day[dateColumn.getDay()];
            localStorage.setItem(`dateColumn${i}`, `${dateColumn.getDate()}, ${dayWeek}`);
        }
    }

}
