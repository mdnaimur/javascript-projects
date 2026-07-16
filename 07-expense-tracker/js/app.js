import { addExpense } from './AddExpense.js';
import { renderList } from './renderList.js';

import { renderListModify } from './renderListModify.js';
import { deleteExpense } from './deleteExpense.js';
import { renderSummary } from './renderSummary.js';


window.addExpense = addExpense;
// window.renderList = renderList;

// renderList();

renderListModify();
deleteExpense();

renderSummary();