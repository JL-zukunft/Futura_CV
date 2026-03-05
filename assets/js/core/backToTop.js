export function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () =&gt; {
        if (window.pageYOffset &gt; 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () =&gt; {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
