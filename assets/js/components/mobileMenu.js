import { smoothScroll } from '../utils/scroll.js';

export function openMobileMenu() {
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileOverlay.style.display = 'block';
    requestAnimationFrame(() => {
        mobileOverlay.classList.add('open');
        mobileMenu.classList.add('open');
    });
    document.body.style.overflow = 'hidden';
}

export function closeMobileMenu() {
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileOverlay.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => mobileOverlay.style.display = 'none', 350);
}

export function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileClose = document.getElementById('mobile-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    hamburger.addEventListener('click', openMobileMenu);
    mobileOverlay.addEventListener('click', closeMobileMenu);
    mobileClose.addEventListener('click', closeMobileMenu);
    
    mobileNavLinks.forEach(link => link.addEventListener('click', (e) => {
        e.preventDefault();
        closeMobileMenu();
        setTimeout(() => smoothScroll(link.getAttribute('href')), 350);
    }));
}
