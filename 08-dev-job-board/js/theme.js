
export function darkMode(){
    const themeToggle = document.getElementById('themeToggle');
    if(!themeToggle){
        throw new Error('Element not found');
    }

    const savedTheme = localStorage.getItem('theme');

    // Apply saved theme

    if(savedTheme === 'dark'){
        document.body.classList.add('dark');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () =>{
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('theme', isDark? 'dark':'light');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
    });
}