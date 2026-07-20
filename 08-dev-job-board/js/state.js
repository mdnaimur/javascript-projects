
let allJobs = [];
let displayJobs = [];
let isLoading = false;


export function getAllJobs(){
    return allJobs;
}

export function setAllJobs(jobs){
    allJobs = jobs
}


export function getDisplayJobs(){
    return displayJobs;
}

export function setDisplayJobs(jobs){
    displayJobs = jobs;
}


export function getLoading(){
    return isLoading;
}

export function setLoading(value){
    isLoading = value;
}