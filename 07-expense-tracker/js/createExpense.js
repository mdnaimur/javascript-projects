

export function createExpense(desc, amount, category, date) {

    return {
        id: Date.now(),
        desc,
        amount: parseFloat(amount),
        category,
        date
    }
}