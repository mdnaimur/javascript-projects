

export function helperFlash(id, mesg) {

    console.log("helper inside, id:", id);

    const el = document.getElementById(id);
    el.style.borderColor = '#ef4444';
    el.placeholder = mesg;
    el.focus();

    setTimeout(() => {
        el.style.borderColor = '';
        el.placeholder = el.id === 'amount' ? '0.00' : el.placeholder;

    }, 2000)
}



// format date
export function formatDate(iso) {

    return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}


export function escHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}



export const fmt = (n) => '$' + n?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });