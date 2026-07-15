import { store } from './Store.js';

const expenses = store.get("expenses", []);

export function getExpenses() {
    return expenses;
}


export function saveExpense(expenseData) {

    // data insert into array
    expenses.unshift(expenseData);

    // arra insert intor localstoreage
    store.set("expenses", expenses);
}