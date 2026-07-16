import { store } from './Store.js';

let expenses = store.get("expenses", []);

export function getExpenses() {
    return expenses;
}


export function saveExpense(expenseData) {

    // check validate
    if (!expenseData || typeof expenseData !== "object") {
        throw new Error("Invalid Data")
    }

    // data insert into array
    expenses.unshift(expenseData);

    // arra insert intor localstoreage
    store.set("expenses", expenses);
}

export function updateExpense(updateExpenseData) {
    if (!Array.isArray(updateExpenseData)) {
        throw new Error("Expected an array of expenses.");
    }

    expenses = updateExpenseData;
    store.set("expenses", expenses);
}