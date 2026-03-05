let openCase = null;

export function toggleCase(item) {
    const isOpen = item.classList.contains('open');
    const detail = item.querySelector('.case-detail');
    const header = item.querySelector('.case-header');

    if (openCase &amp;&amp; openCase !== item) {
        const openDetail = openCase.querySelector('.case-detail');
        const openHeader = openCase.querySelector('.case-header');
        openCase.classList.remove('open');
        openDetail.style.maxHeight = '0';
        openHeader.setAttribute('aria-expanded', 'false');
    }

    if (isOpen) {
        item.classList.remove('open');
        detail.style.maxHeight = '0';
        header.setAttribute('aria-expanded', 'false');
        openCase = null;
    } else {
        item.classList.add('open');
        detail.style.maxHeight = detail.scrollHeight + 'px';
        header.setAttribute('aria-expanded', 'true');
        openCase = item;
        setTimeout(() =&gt; {
            const caseItemRect = item.getBoundingClientRect();
            const containerRect = document.querySelector('.cases-container')?.getBoundingClientRect();
            if (containerRect) {
                const centerOffset = (containerRect.height - caseItemRect.height) / 2 + containerRect.top;
                
                if (Math.abs(centerOffset - window.pageYOffset) &gt; 50) {
                    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
                    window.scrollTo({ top: centerOffset - navHeight - 20, behavior: 'smooth' });
                }
            }
        }, 400);
    }
}

export function initCasesAccordion() {
    const caseItems = document.querySelectorAll('.case-item');
    
    caseItems.forEach(item =&gt; {
        const header = item.querySelector('.case-header');
        const detail = item.querySelector('.case-detail');
        header.addEventListener('click', () =&gt; toggleCase(item));
        header.addEventListener('keydown', (e) =&gt; {
            if (e.key === 'Enter' || e.key === ' ') { 
                e.preventDefault(); 
                toggleCase(item); 
            }
            if (e.key === 'Escape' &amp;&amp; item.classList.contains('open')) {
                toggleCase(item);
            }
        });
    });
}

export function initCaseTabs() {
    document.querySelectorAll('.case-tabs').forEach(tabsContainer =&gt; {
        const tabs = tabsContainer.querySelectorAll('.case-tab');
        const contents = tabsContainer.parentElement.querySelectorAll('.case-tab-content');
        
        tabs.forEach(tab =&gt; {
            tab.addEventListener('click', () =&gt; {
                tabs.forEach(t =&gt; t.classList.remove('active'));
                tab.classList.add('active');
                const tabName = tab.getAttribute('data-tab');
                contents.forEach(c =&gt; c.classList.toggle('active', c.getAttribute('data-content') === tabName));
                
                const caseItem = tab.closest('.case-item');
                const detail = caseItem.querySelector('.case-detail');
                if (caseItem.classList.contains('open')) {
                    detail.style.maxHeight = detail.scrollHeight + 'px';
                }
            });
        });
    });
}
