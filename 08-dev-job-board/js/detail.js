import { getDisplayJobs } from './state.js';
import { escHtml } from './helper.js'




export function openDetails(index) {
    const jobs = getDisplayJobs();
    const job = jobs[index];
    if (!job) return;

    const detailsLogo = document.getElementById('detailLogo');

    const logo = job.company_logo && job.company_logo !== "null"
        ? `
              <img 
                  src="${job.company_logo}" 
                  alt="${escHtml(job.company_name)}"
                  onerror="this.onerror=null; this.parentElement.innerHTML='💼';"
              >
            `
        : "💼";

    detailsLogo.innerHTML = logo;

    document.getElementById('detailTitle').textContent =
        job.title;

    document.getElementById('detailCompany').textContent =
        job.company_name;

    document.getElementById('detailMeta').innerHTML = `
        <span>${job.job_type ?? 'Remote'}</span>
        <span>${job.candidate_required_location ?? 'Worldwide'}</span>
        ${job.salary ?? ''}
    `;

    document.getElementById('detailBody').innerHTML =
        job.description ?? 'No description';

    document.getElementById('applyBtn').href =
        job.url ?? '#';

    document
        .getElementById('detailBackdrop')
        .classList.add('open');

    document.body.style.overflow = 'hidden';
}


export function closeDetail() {
    document
        .getElementById('detailBackdrop')
        .classList.remove('open');

    document.body.style.overflow = '';
}


export function initDetail() {
    const backdrop =
        document.getElementById('detailBackdrop');

    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
            closeDetail();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeDetail();
        }
    });
}