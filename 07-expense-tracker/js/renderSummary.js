import { fmt } from "./utils.js";
import { getExpenses } from './state.js';




export function renderSummary() {
    const s = computeSummary();

    const totalSpent = document.getElementById('totalSpent');
    const totalCount = document.getElementById('totalCount');
    const monthSpent = document.getElementById('monthSpent');
    const monthCount = document.getElementById('monthCount');
    const largestAmt = document.getElementById('largestAmt');
    const largestDesc = document.getElementById('largestDesc');

    if (!totalSpent || !totalCount || !monthSpent || !monthCount || !largestAmt || !largestDesc) {
        throw new Error("Element is missing !!")
    }

    totalSpent.textContent = fmt(s.total);
    totalCount.textContent = `${s.count} expense${s.count !== 1 ? 's' : ''}`;
    monthSpent.textContent = fmt(s.monthTotal);
    monthCount.textContent = `${s.monthCount} this month`;
    largestAmt.textContent = s.largest ? fmt(s.largest.amount) : '$0';
    largestDesc.textContent = s.largest?.desc ?? '—';

}


function computeSummary() {

    const expenses = getExpenses();
    const now = new Date();
    const thisMonth = expenses.filter(e => {
        const d = new Date(e.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() == now.getFullYear();
    });


    const largest = expenses.reduce((max, e) => e.amount > (max?.amount ?? 0) ? e : max, null);
    const total = expenses.reduce((s, e) => s + e.amount, 0);

    return {
        total,
        count: expenses.length,
        monthTotal: thisMonth.reduce((s, e) => s + e.amount, 0),
        monthCount: thisMonth.length,
        largest
    }

}
