import { setCurrentLang, getCurrentLang } from '../core/state.js';

export function updateLanguage(lang) {
    setCurrentLang(lang);
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-lang') === lang));
    
    document.querySelectorAll('[data-zh]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            if (el.id === 'btn-cases') {
                const span = el.querySelector('span');
                if (span) span.textContent = text;
            } else {
                const decodedText = text.replace(/&lt;/g, '&lt;').replace(/&gt;/g, '&gt;');
                el.innerHTML = decodedText;
            }
        }
    });
    
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}

export function initLanguageSwitcher() {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => btn.addEventListener('click', () => {
        updateLanguage(btn.getAttribute('data-lang'));
    }));
}
