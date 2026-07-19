

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