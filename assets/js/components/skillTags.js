import { smoothScroll } from '../utils/scroll.js';

export function initSkillTags() {
    document.querySelectorAll('.skill-tag').forEach(tag =&gt; {
        tag.style.cursor = 'pointer';
        tag.addEventListener('click', () =&gt; {
            const target = tag.getAttribute('data-target');
            if (target) {
                const targetElement = document.getElementById(target);
                if (targetElement) {
                    smoothScroll(`#${target}`);
                    if (!targetElement.classList.contains('open')) {
                        setTimeout(() =&gt; {
                            import('./cases.js').then(module =&gt; {
                                if (module.toggleCase) {
                                    module.toggleCase(targetElement);
                                }
                            });
                        }, 600);
                    }
                }
            }
        });
    });
}
