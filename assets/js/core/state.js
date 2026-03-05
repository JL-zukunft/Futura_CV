let currentLang = 'zh';
let isScrolling = false;

export function setCurrentLang(lang) {
    currentLang = lang;
}

export function getCurrentLang() {
    return currentLang;
}

export function setIsScrolling(value) {
    isScrolling = value;
}

export function getIsScrolling() {
    return isScrolling;
}

export function initApp() {
    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('page-enter');
        
        const backToIndex = sessionStorage.getItem('backToIndex');
        if (backToIndex === 'true') {
            sessionStorage.removeItem('backToIndex');
        }
        
        import('./backToTop.js').then(module => {
            module.initBackToTop();
        });
    });
}
