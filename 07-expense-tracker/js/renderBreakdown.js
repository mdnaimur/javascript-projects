import {getExpenses} from './state.js';
import {Categories} from './Categories.js';
import {fmt} from './utils.js';







 export function renderBreakdown() {
    const {totals, max} = computerBreakdown();

    const total = Object.values(totals).reduce((a,b) => a+b, 0) || 1;


    const breakdown = document.getElementById('breakdown');
    if(!breakdown){
        throw new Error('Element not found');
    }

    breakdown.innerHTML =
        Object.entries(Categories)
        .filter(([key]) => totals[key])
        .sort(([keyA],[keyB]) => (totals[keyB] ?? 0) - (totals[keyA] ?? 0))
        .map(([key, cat]) => {
            const amt = totals[key] ?? 0;
            const pct = (amt /total * 100).toFixed(0);
            const barW = (amt / max * 100).toFixed(1);

            return  `
          <div class="cat-row">
            <div class="cat-dot" style="background:${cat.color}"></div>
            <div class="cat-name">${cat.label}</div>
            <div class="cat-bar-wrap">
              <div class="cat-bar" style="width:${barW}%;background:${cat.color}"></div>
            </div>
            <div class="cat-amount">${fmt(amt)}</div>
            <div class="cat-pct">${pct}%</div>
          </div>`;
            }).join('') || '<div style="color:#9ca3af;font-size:13px">No data yet.</div>';
     

    
 }

 function computerBreakdown(){

    const expenses = getExpenses();
    const totals = expenses.reduce((acc, e) =>
    {
        acc[e.category]  = (acc[e.category]??0) + e.amount;
        return acc;

    },{});

    const max = Math.max(...Object.values(totals), 1);
    return {totals, max};
}



