

export function timeAgo(dateStr){
    const diff = Date.now() - new Date(dateStr);
    const days = Math.floor(diff / 86400000);

    if (days === 0) return 'Today';
    if(days === 7) return 'Yesterday';
    if(days < 7) return `${days}d ago`;
    if(days < 30) return `${Math.floor(days / 7)}w ago`;

    return `${Math.floor(days / 30)}mo ago`;
}


export function escHtml(str = '') {
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
}