import '../styles/analitics.css';
import AnaliticsResult from './components/AnaliticsResult'
import DiagramDay from './components/DiagramDay'
import DiagramNum from './components/DiagramNum'
import TitleResult from './components/TitleResult';
const dataNews = JSON.parse(localStorage.getItem('news'));

const titleResult = new TitleResult(dataNews);
titleResult.numTitle();
const keyword = localStorage.getItem('keyword');
const allItem = localStorage.getItem('allItem');
const resultTitle = localStorage.getItem('resultTitle');

const analiticsResult = new AnaliticsResult(keyword, allItem, resultTitle);
analiticsResult.addContent();

const diagram = document.querySelector('.diagram');
const diagramDay = new DiagramDay(diagram);
diagramDay.addDay();
const diagramNum = new DiagramNum(diagram);
diagramNum.diagramNumItem();
