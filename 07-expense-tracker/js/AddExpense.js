import { createExpense } from './createExpense.js';
import { saveExpense } from './state.js';
import { helperFlash } from './utils.js';

export function addExpense() {
    const desc = document.getElementById('desc').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const cat = document.getElementById('category').value.trim();
    const date = document.getElementById('date').value.trim();

    // data valdiation
    if (!desc) {
        return helperFlash('desc', 'Enter a description');
    }

    if (!amount || amount <= 0) {
        return helperFlash('amount', 'Enter a valid amount');
    }

    if (!date) {
        return helperFlash('date', 'Pick valid date');
    }

    const expenseData = createExpense(desc, amount, cat, date);
    console.log(expenseData);

    saveExpense(expenseData);
    document.getElementById('desc').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('desc').focus();


} 