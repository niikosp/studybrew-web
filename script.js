// Change navbar background on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = '#fff';
        nav.style.padding = '10px 10%';
    } else {
        nav.style.padding = '20px 10%';
    }
});

// Basic tracking for clicks (Optional)
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', () => {
        console.log("Φοιτητής έκανε κλικ!");
    });
});