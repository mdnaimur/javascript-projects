import { API_URL, DEFAULT_CATEGORY } from './config.js';
import { getLoading, setLoading, setAllJobs, setDisplayJobs } from './state.js';
import { showSkeletons, renderError, renderJobs } from './render.js';




export async function loadJobs() {
    if (getLoading()) return;
    setLoading(true);

    showSkeletons();


    try {
        const jobs = await fetchJobs();

        setAllJobs(jobs);
        setDisplayJobs(jobs);

        renderJobs();
    } catch (err) {
        renderError(err.message);
    } finally {
        setLoading(false);
    }

}


async function fetchJobs() {
    const search =
        document.getElementById('searchQ').value.trim();

    const category =
        document.getElementById('catFilter').value ||
        DEFAULT_CATEGORY;

    const params = new URLSearchParams({
        category,
    });

    if (search) {
        params.append('search', search);
    }

    const res = await fetch(`${API_URL}?${params}`);


    if (!res.ok) {
        throw new Error(`API Error ${res.status}`);
    }

    const data = await res.json();


    return data.jobs ?? [];
}