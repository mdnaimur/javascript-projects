// ── STATE ─────────────────────────────────────────────
let allJobs = [];
let displayJobs = [];
let isLoading = false;

// ── FETCH ─────────────────────────────────────────────
async function loadJobs() {
    if (isLoading) return;
    isLoading = true;

    const query = document.getElementById('searchQ').value.trim();
    const cat = document.getElementById('catFilter').value;

    showSkeletons(6);
    document.getElementById('resultsLabel').textContent = 'Fetching jobs...';

    try {
        // remotive.io — free, no API key needed, real job data
        const params = new URLSearchParams({ category: cat });
        if (query) params.append('search', query);

        const res = await fetch(`https://remotive.com/api/remote-jobs?${params}`);
        if (!res.ok) throw new Error(`API error ${res.status}`);

        const data = await res.json();
        allJobs = data.jobs ?? [];
        displayJobs = allJobs;

        document.getElementById('lastUpdated').textContent =
            `Updated ${new Date().toLocaleTimeString()}`;

        renderJobs(displayJobs);
    } catch (err) {
        document.getElementById('jobList').innerHTML = `
      <div class="error-box">
        ⚠️ ${err.message}<br>
        <small style="color:#9ca3af">Check your connection or try again.</small><br><br>
        <button class="btn btn-outline" onclick="loadJobs()">Retry</button>
      </div>`;
        document.getElementById('resultsLabel').textContent = 'Failed to load';
    } finally {
        isLoading = false;
    }
}

// ── RENDER ────────────────────────────────────────────
function renderJobs(jobs) {
    document.getElementById('resultsLabel').textContent =
        `${jobs.length} job${jobs.length !== 1 ? 's' : ''} found`;

    if (jobs.length === 0) {
        document.getElementById('jobList').innerHTML =
            `<div class="empty">No jobs match your search.<br>Try different keywords.</div>`;
        return;
    }

    document.getElementById('jobList').innerHTML = jobs.map((job, i) => `
    <div class="job-card" onclick="openDetail(${i})">
      <div class="job-logo">
        ${job.company_logo
            ? `<img src="${job.company_logo}" alt="${escHtml(job.company_name)}" onerror="this.parentNode.textContent='💼'" />`
            : '💼'}
      </div>
      <div class="job-info">
        <div class="job-title">${escHtml(job.title)}</div>
        <div class="job-company">${escHtml(job.company_name)}</div>
        <div class="job-meta">
          <span class="badge badge-blue">${escHtml(job.job_type ?? 'Remote')}</span>
          <span class="badge badge-gray">📍 ${escHtml(job.candidate_required_location || 'Worldwide')}</span>
          ${job.salary ? `<span class="job-salary">${escHtml(job.salary)}</span>` : ''}
        </div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div class="job-posted">${timeAgo(job.publication_date)}</div>
        <span class="badge badge-green" style="margin-top:6px;display:inline-block">${escHtml(job.category ?? '')}</span>
      </div>
    </div>
  `).join('');
}

function showSkeletons(n) {
    document.getElementById('jobList').innerHTML = Array.from({ length: n }, () => `
    <div class="sk-card">
      <div class="skeleton sk-logo"></div>
      <div class="sk-body">
        <div class="skeleton" style="height:16px;width:60%"></div>
        <div class="skeleton" style="height:13px;width:35%"></div>
        <div class="skeleton" style="height:11px;width:50%"></div>
      </div>
    </div>
  `).join('');
}

// ── DETAIL PANEL ──────────────────────────────────────
function openDetail(index) {
    const job = displayJobs[index];
    if (!job) return;

    document.getElementById('detailLogo').innerHTML = job.company_logo
        ? `<img src="${job.company_logo}" alt="" onerror="this.parentNode.textContent='💼'" />`
        : '💼';

    document.getElementById('detailTitle').textContent = job.title;
    document.getElementById('detailCompany').textContent = job.company_name;
    document.getElementById('detailMeta').innerHTML = `
    <span class="badge badge-blue">${job.job_type ?? 'Remote'}</span>
    <span class="badge badge-gray">📍 ${job.candidate_required_location || 'Worldwide'}</span>
    ${job.salary ? `<span class="job-salary">${escHtml(job.salary)}</span>` : ''}
  `;

    // Sanitize and display job description HTML
    const desc = document.getElementById('detailBody');
    desc.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.innerHTML = job.description ?? 'No description provided.';
    // Strip script tags for safety
    wrapper.querySelectorAll('script,style').forEach(el => el.remove());
    desc.appendChild(wrapper);

    document.getElementById('applyBtn').href = job.url ?? '#';
    document.getElementById('detailBackdrop').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeDetail() {
    document.getElementById('detailBackdrop').classList.remove('open');
    document.body.style.overflow = '';
}

document.getElementById('detailBackdrop').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeDetail();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDetail(); });

// ── HELPERS ───────────────────────────────────────────
function resetFilters() {
    document.getElementById('searchQ').value = '';
    document.getElementById('catFilter').value = 'software-dev';
    loadJobs();
}

function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr);
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    return `${Math.floor(days / 30)}mo ago`;
}

function escHtml(str = '') {
    const d = document.createElement('div');
    d.textContent = String(str);
    return d.innerHTML;
}

loadJobs();



const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

// Apply saved theme
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    themeToggle.textContent = isDark ? '☀️' : '🌙';
});