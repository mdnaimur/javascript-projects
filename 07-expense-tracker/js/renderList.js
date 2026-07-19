import { groupByMonth } from './Calculation.js';
import { Categories } from './Categories.js';
import { getExpenses } from './state.js';
import { escHtml, fmt } from './utils.js';

export function renderList() {
    // console.log(Object.entries);
    // console.dir(Object);

    const expenseValue = getExpenses();
    const expenseEl = document.getElementById('expenseList');
    if (!expenseEl) { return; }

    if (expenseValue.length === 0) {
        expenseEl.innerHTML = `<div class="empty">No expenses yet.<br>Add your first one above.</div>`;
        return;
    }


    const groups = groupByMonth(expenseValue);

    expenseEl.innerHTML = Object.entries(groups)
        .map(([month, items]) =>
            `
             <div class="month-divider">
             ${month} — ${fmt
                (items.reduce((s, e) => s + e.amount, 0))}
                </div>

             ${items.map(item => {

                    const cat = Categories[item.category];
                    return `
             <div class="expense-item" data-id="${item.id}">
           
                  <div class="expense-icon" style="background:${cat.color}22">
                  ${cat.icon}
                  </div>

                    <div class="expense-info">
                      <div class="expense-desc">${escHtml(item.desc)}</div>
                       <div class="expense-meta">
                       ${cat.label}.
                       ${item.date}
                       </div>
                    </div>
                      <div class="expense-amount">${fmt(item.amount)}</div>
                     <button class="btn-sm btn-danger" data-action="delete" data-id="${item.id}">✕</button>
             </div>

            `

                }
                ).join('')}
        `
        ).join('');


}