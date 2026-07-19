import { groupByMonth } from './Calculation.js';
import { getExpenses } from './state.js';
import { fmt, escHtml,getMemoryUsage } from './utils.js';
import { Categories } from './Categories.js'
import {getFiltered} from './filters.js'

export function renderListModify() {

    const expenseValue = getFiltered();
    const expenseEl = document.getElementById('expenseList');
    if (!expenseEl) { return; }

    if (expenseValue.length === 0) {
        expenseEl.innerHTML = `<div class="empty">No expenses yet.<br>Add your first one above.</div>`;
        return;
    }

    const groups = groupByMonth(expenseValue);


    expenseEl.innerHTML = Object.entries(groups)
        .map(([month, items]) => renderMonth(month, items))
        .join("");


}


function renderMonth(month, items) {
    const total = items.reduce((sum, item) => sum + item.amount, 0);
    return `
        <div class="month-divider">
            ${month} - ${fmt(total)}
        </div>

        ${items.map(renderExpense).join("")}
    
    `;
}


function renderExpense(expense) {
    const category = Categories[expense.category];
    return `
        <div class="expense-item" data-id="${expense.id}">

            <div
                class="expense-icon"
                style="background:${category?.color}22">
                ${category?.icon}
            </div>

            <div class="expense-info">
                <div class="expense-desc">
                    ${escHtml(expense?.desc)}
                </div>

                <div class="expense-meta">
                    ${category?.label} · ${expense?.date}
                </div>
            </div>

            <div class="expense-amount">
                ${fmt(expense?.amount)}
            </div>

            <button
                class="btn-sm btn-danger"
                data-action="delete"
                data-id="${expense?.id}">
                ✕
            </button>

        </div>
    `;

}



export function exportCSV(){
    const header = 'Date,Description,Category,Amount';
    let expenses = getExpenses();

    const rows = expenses.map(e =>
    `${e.date},"${e.desc}",${Categories[e.category].label},${e.amount.toFixed(2)}`);

    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], {
    type: 'text/csv'
        });

    const url = URL.createObjectURL(blob);

    const a = Object.assign(
    document.createElement('a'),
        {
            href: url,
            download: 'expenses.csv'
        }
    );
    a.click();

    URL.revokeObjectURL(url);

}