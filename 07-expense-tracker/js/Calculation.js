/**
 * 
 * 
 * 

    
 */


export function groupByMonth(list) {

    return list.reduce((groups, e) => {
        const key = new Date(e.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        (groups[key] ??= []).push(e)
        return groups;

    }, {})

}


