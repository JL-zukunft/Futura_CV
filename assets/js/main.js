import { initApp } from './core/state.js';
import { initNavigation, initCTAButtons } from './components/navigation.js';
import { initLanguageSwitcher } from './components/language.js';
import { initMobileMenu } from './components/mobileMenu.js';
import { initSkillTags } from './components/skillTags.js';
import { initCasesAccordion, initCaseTabs } from './components/cases.js';
import { initContactCopy } from './components/contact.js';
import { initLightbox } from './components/lightbox.js';

document.addEventListener('DOMContentLoaded', () =&gt; {
    initApp();
    initNavigation();
    initCTAButtons();
    initLanguageSwitcher();
    initMobileMenu();
    initSkillTags();
    initCasesAccordion();
    initCaseTabs();
    initContactCopy();
    initLightbox();
});
