import { getExpenses, updateExpense } from './state.js';
import { renderListModify } from './renderListModify.js';

export function deleteExpense(id) {
    const expense = getExpenses();

    const updateEx = expense.filter(e => e.id !== id);
    updateExpense(updateEx);
    renderListModify();

}


// Event delegation for delete
document.getElementById('expenseList').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="delete"]');
    if (btn) deleteExpense(parseInt(btn.dataset.id));

});
