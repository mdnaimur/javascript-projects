
// ── CONFIG ────────────────────────────────────────────
const CATEGORIES = {
    food: { label: 'Food', icon: '🍔', color: '#f59e0b' },
    transport: { label: 'Transport', icon: '🚗', color: '#3b82f6' },
    shopping: { label: 'Shopping', icon: '🛍', color: '#8b5cf6' },
    bills: { label: 'Bills', icon: '📋', color: '#ef4444' },
    health: { label: 'Health', icon: '💊', color: '#10b981' },
    entertainment: { label: 'Entertainment', icon: '🎮', color: '#f97316' },
    other: { label: 'Other', icon: '📦', color: '#6b7280' },
};

// ── STORAGE ───────────────────────────────────────────
const store = {
    get: (key, fb = null) => {
        try {
            const v = localStorage.getItem(key);
            return v ? JSON.parse(v) : fb;
        }
        catch { return fb; }
    },
    set: (key, val) => {
        try { localStorage.setItem(key, JSON.stringify(val)); } catch { }
    }
};

// ── STATE ─────────────────────────────────────────────
let expenses = store.get('expenses', []);

// Set today's date as default
document.getElementById('date').value = new Date().toISOString().split('T')[0];

// ── LOGIC ─────────────────────────────────────────────
function createExpense(desc, amount, category, date) {
    return { id: Date.now(), desc, amount: parseFloat(amount), category, date };
}

function getFiltered() {
    const cat = document.getElementById('filterCat').value;
    const sort = document.getElementById('sortExp').value;

    return [...expenses]
        .filter(e => !cat || e.category === cat)
        .sort((a, b) => {
            if (sort === 'oldest') return new Date(a.date) - new Date(b.date);
            if (sort === 'highest') return b.amount - a.amount;
            if (sort === 'lowest') return a.amount - b.amount;
            return new Date(b.date) - new Date(a.date);
        });
}

function computeSummary() {
    const now = new Date();
    const thisMonth = expenses.filter(e => {
        const d = new Date(e.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    const largest = expenses.reduce((max, e) => e.amount > (max?.amount ?? 0) ? e : max, null);
    const total = expenses.reduce((s, e) => s + e.amount, 0);

    return {
        total,
        count: expenses.length,
        monthTotal: thisMonth.reduce((s, e) => s + e.amount, 0),
        monthCount: thisMonth.length,
        largest,
    };
}

function computeBreakdown() {
    const totals = expenses.reduce((acc, e) => {
        acc[e.category] = (acc[e.category] ?? 0) + e.amount;
        return acc;
    }, {});
    const max = Math.max(...Object.values(totals), 1);
    return { totals, max };
}

function groupByMonth(list) {
    return list.reduce((groups, e) => {
        const key = new Date(e.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        (groups[key] ??= []).push(e);
        return groups;
    }, {});
}

const fmt = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ── UI ────────────────────────────────────────────────
function render() {
    renderSummary();
    renderBreakdown();
    renderList();
}

function renderSummary() {
    const s = computeSummary();
    document.getElementById('totalSpent').textContent = fmt(s.total);
    document.getElementById('totalCount').textContent = `${s.count} expense${s.count !== 1 ? 's' : ''}`;
    document.getElementById('monthSpent').textContent = fmt(s.monthTotal);
    document.getElementById('monthCount').textContent = `${s.monthCount} this month`;
    document.getElementById('largestAmt').textContent = s.largest ? fmt(s.largest.amount) : '$0';
    document.getElementById('largestDesc').textContent = s.largest?.desc ?? '—';
}

function renderBreakdown() {
    const { totals, max } = computeBreakdown();
    const total = Object.values(totals).reduce((a, b) => a + b, 0) || 1;

    document.getElementById('breakdown').innerHTML =
        Object.entries(CATEGORIES)
            .filter(([key]) => totals[key])
            .sort(([, a], [, b]) => (totals[b] ?? 0) - (totals[a] ?? 0))
            .map(([key, cat]) => {
                const amt = totals[key] ?? 0;
                const pct = (amt / total * 100).toFixed(0);
                const barW = (amt / max * 100).toFixed(1);
                return `
          <div class="cat-row">
            <div class="cat-dot" style="background:${cat.color}"></div>
            <div class="cat-name">${cat.label}</div>
            <div class="cat-bar-wrap">
              <div class="cat-bar" style="width:${barW}%;background:${cat.color}"></div>
            </div>
            <div class="cat-amount">${fmt(amt)}</div>
            <div class="cat-pct">${pct}%</div>
          </div>`;
            }).join('') || '<div style="color:#9ca3af;font-size:13px">No data yet.</div>';
}

// render function render list
function renderList() {
    const filtered = getFiltered();
    const el = document.getElementById('expenseList');

    if (filtered.length === 0) {
        el.innerHTML = `<div class="empty">No expenses yet.<br>Add your first one above.</div>`;
        return;
    }

    const groups = groupByMonth(filtered);

    el.innerHTML = Object.entries(groups)
        .map(([month, items]) =>

            `
          <div class="month-divider">
            ${month} — ${fmt(
                items.reduce((s, e) => s + e.amount, 0))}
                
                </div>
        ${items.map(e => {

                    const cat = CATEGORIES[e.category];

                    return `
                <div class="expense-item" data-id="${e.id}">

                <div class="expense-icon" style="background:${cat.color}22">
                    ${cat.icon}
                    </div>
                <div class="expense-info">
                    <div class="expense-desc">
                        ${escHtml(e.desc)}
                        </div>
                    <div class="expense-meta">
                        ${cat.label} · ${formatDate(e.date)}
                        </div>
                </div>
                <div class="expense-amount">${fmt(e.amount)}</div>
                <button 
                    class="btn-sm btn-danger" 
                    data-action="delete" 
                    data-id="${e.id}">
                    ✕
                </button>
                
                </div>`;

                }).join('')}
  `).join('');


}

// ── ACTIONS ───────────────────────────────────────────
function addExpense() {
    const desc = document.getElementById('desc').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const cat = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    if (!desc) return flash('desc', 'Enter a description');
    if (!amount || amount <= 0) return flash('amount', 'Enter a valid amount');
    if (!date) return flash('date', 'Pick a date');

    expenses.unshift(createExpense(desc, amount, cat, date));
    store.set('expenses', expenses);

    document.getElementById('desc').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('desc').focus();
    render();
}

function deleteExpense(id) {
    expenses = expenses.filter(e => e.id !== id);
    store.set('expenses', expenses);
    render();
}

function clearAll() {
    if (!confirm('Delete all expenses? This cannot be undone.')) return;
    expenses = [];
    store.set('expenses', expenses);
    render();
}

function exportCSV() {
    const header = 'Date,Description,Category,Amount';
    const rows = expenses.map(e =>
        `${e.date},"${e.desc}",${CATEGORIES[e.category].label},${e.amount.toFixed(2)}`
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), { href: url, download: 'expenses.csv' });
    a.click();
    URL.revokeObjectURL(url);
}

// ── HELPERS ───────────────────────────────────────────
function flash(id, msg) {
    const el = document.getElementById(id);
    el.style.borderColor = '#ef4444';
    el.placeholder = msg;
    el.focus();
    setTimeout(() => {
        el.style.borderColor = '';
        el.placeholder = el.id === 'amount' ? '0.00' : el.placeholder;
    }, 2000);
}

function formatDate(iso) {
    return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function escHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

// Event delegation for delete
document.getElementById('expenseList').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="delete"]');
    if (btn) deleteExpense(parseInt(btn.dataset.id));
});

// Enter to submit
document.getElementById('amount').addEventListener('keydown', e => {
    if (e.key === 'Enter') addExpense();
});

render();
