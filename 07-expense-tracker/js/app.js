import { addExpense } from './AddExpense.js';
import { renderList } from './renderList.js';

import { renderListModify,exportCSV} from './renderListModify.js';
import { deleteExpense,clearAll } from './deleteExpense.js';
import { renderSummary } from './renderSummary.js';
import {renderBreakdown} from './renderBreakdown.js';
import {darkMood} from './utils.js';


window.addExpense = addExpense;
// window.renderList = renderList;

// renderList();

renderListModify();
deleteExpense();
renderBreakdown();

renderSummary();

window.render = renderListModify;
window.clearAll = clearAll;
window.exportCSV = exportCSV;

window.darkMood = darkMood;