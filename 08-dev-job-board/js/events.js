import { loadJobs } from './api.js';
import { openDetails, closeDetail } from './detail.js';
import { DEFAULT_CATEGORY } from './config.js';


export function initEvents() {
    bindSearch();
    bindJobClick();
    bindModal();
}


function bindSearch() {


    document
        .getElementById('searchQ')
        .addEventListener('click', loadJobs);

    document
        .getElementById('searchQ')
        .addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                loadJobs();
            }
        });

    document
        .getElementById('catFilter')
        .addEventListener('change', loadJobs);
}

function bindJobClick() {
    document
        .getElementById('jobList')
        .addEventListener('click', (e) => {

            const card = e.target.closest('.job-card');

            if (!card) return;

            openDetails(card.dataset.index);
        });
}


function bindModal() {
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


    document
        .getElementById('closeBtn')
        .addEventListener('click', closeDetail);

    document
        .getElementById('closeFooterBtn')
        .addEventListener('click', closeDetail);

}


export function resetFilters() {
    document.getElementById('searchQ').value = '';

    document.getElementById('catFilter').value =
        DEFAULT_CATEGORY;

    loadJobs();
}