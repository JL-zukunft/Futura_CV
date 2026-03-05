import { smoothScroll } from '../utils/scroll.js';

export function initNavigation() {
    const navLogo = document.getElementById('nav-logo');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    navLogo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    navLinks.forEach(link => link.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScroll(link.getAttribute('href'));
    }));
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('data-section') === id));
            }
        });
    }, { root: null, rootMargin: '-40% 0px -60% 0px', threshold: 0 });
    
    sections.forEach(section => navObserver.observe(section));
    
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) &gt;= document.body.offsetHeight - 100) {
            navLinks.forEach(link =&gt; link.classList.remove('active'));
            document.querySelector('[data-section="contact"]')?.classList.add('active');
        }
    });
}

export function initCTAButtons() {
    const btnCases = document.getElementById('btn-cases');
    const btnContact = document.getElementById('btn-contact');
    
    btnCases.addEventListener('click', () =&gt; smoothScroll('#cases'));
    btnContact.addEventListener('click', () =&gt; smoothScroll('#contact'));
}
