

export function helperFlash(id, mesg) {

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



export function getMemoryUsage() {
    if (!performance.memory) {
        return null;
    }

    const formatBytes = (bytes) => {
        const units = ['B', 'KB', 'MB', 'GB'];
        let i = 0;

        while (bytes >= 1024 && i < units.length - 1) {
            bytes /= 1024;
            i++;
        }

        return `${bytes.toFixed(2)} ${units[i]}`;
    };

    const {
        usedJSHeapSize,
        totalJSHeapSize,
        jsHeapSizeLimit
    } = performance.memory;

    return {
        used: formatBytes(usedJSHeapSize),
        allocated: formatBytes(totalJSHeapSize),
        limit: formatBytes(jsHeapSizeLimit)
    };
}


export function darkMood() {

    let element = document.body;
    if(!element){
        throw new Error("Element not found");
    }

    element.classList.toggle('dark-mode');
    let dark_light = document.getElementById('dark_light');

     if (element.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark")
        dark_light.innerHTML = 'Day Mode';
    } else {
        localStorage.setItem("theme", "Light Mood")
        dark_light.innerHTML = 'Night Mode';
    }
}