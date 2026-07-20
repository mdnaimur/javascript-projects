import { getDisplayJobs } from './state.js';
import { escHtml, timeAgo } from './helper.js';




export function renderJobs() {
    const jobs = getDisplayJobs();

    const resultLabel = document.getElementById('resultsLabel');
    const jobList = document.getElementById('jobList');

    resultLabel.textContent =
        `${jobs.length} jobs ${jobs.length != 1 ? 's' : ''} found`;

    if (jobs.length === 0) {
        jobList.innerHTML = `
            <div class="empty"> No jobs found. </div>
        `;
        return;
    }

    jobList.innerHTML = jobs.map((job, index) => createJobCard(job, index)).join('');
}


function createJobCard(job, index) {



    const logo = job.company_logo && job.company_logo !== "null"
        ? `
            <img 
                src="${job.company_logo}" 
                alt="${escHtml(job.company_name)}"
                onerror="this.onerror=null; this.parentElement.innerHTML='💼';"
            >
          `
        : "💼";

    return `
        <div class="job-card" data-index="${index}">
            
            <div class="job-logo">
                ${logo}
            </div>

            <div class="job-info">

                <div class="job-title">
                    ${escHtml(job.title)}
                </div>

                <div class="job-company">
                    ${escHtml(job.company_name)}
                </div>

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
    `;
}



export function renderError(message) {
    document.getElementById('jobList').innerHTML = `
        <div class="error-box">
            ${message}
        </div>
    `;
}


import { SKELETON_COUNT } from './config.js';

export function showSkeletons() {
    const jobList = document.getElementById('jobList');

    jobList.innerHTML = Array.from(
        { length: SKELETON_COUNT },
        () => `
            <div class="sk-card">
                Loading...
            </div>
        `
    ).join('');
}