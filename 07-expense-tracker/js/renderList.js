import { getExpenses } from './state.js';



export function renderList() {
    console.log('render list');

    const expenseValue = getExpenses();
    console.table(expenseValue);
    const expenseList = document.getElementById('expenseList');
    if (!expenseList) { return; }

    if (expenseValue.length === 0) {
        expenseList.innerHTML = `<div class="empty">No expenses yet.<br>Add your first one above.</div>`;
        return;
    }

}