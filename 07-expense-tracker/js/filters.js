import { getExpenses } from './state.js';


/**
 * 
 * getFiltered()

filterByDate()

filterByCategory()

searchExpenses()
 */


export function getFiltered() {
    const expenses = getExpenses()
    const cat = document.getElementById('filterCat').value;
    const sort = document.getElementById('sortExp').value;

    return [... expenses]
        .filter(e => !cat || e.category === cat)
        .sort((a, b) => { 
            if(sort === 'oldest') return new Date(a.date) - new Date(b.date);
            if(sort === 'highest') return b.amount - a.amount;
            if(sort === 'lowest') return a.amount - b.amount;
            return new Date(b.date) - new Date(a.date);
        }
        );
}