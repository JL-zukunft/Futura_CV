import { setIsScrolling, getIsScrolling } from './state.js';

export function smoothScroll(target, callback) {
    if (getIsScrolling()) return;
    setIsScrolling(true);
    
    const targetEl = document.querySelector(target);
    if (!targetEl) {
        setIsScrolling(false);
        return;
    }
    
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
    const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
    
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    
    setTimeout(() => {
        setIsScrolling(false);
        if (callback) callback();
    }, 600);
}
