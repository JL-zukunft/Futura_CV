
// 页面加载时的过渡动画
document.addEventListener('DOMContentLoaded', () =&gt; {
    document.body.classList.add('page-enter');
    
    // 检查是否从详情页返回
    const backToIndex = sessionStorage.getItem('backToIndex');
    if (backToIndex === 'true') {
        sessionStorage.removeItem('backToIndex');
    }
    
    // 初始化返回顶部按钮
    initBackToTop();
});

// 初始化返回顶部按钮
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    // 滚动时显示/隐藏按钮
    window.addEventListener('scroll', () =&gt; {
        if (window.pageYOffset &gt; 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // 点击返回顶部
    backToTopBtn.addEventListener('click', () =&gt; {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

let currentLang = 'zh';
let isScrolling = false;
let openCase = null;

const navLogo = document.getElementById('nav-logo');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const langBtns = document.querySelectorAll('.lang-btn');
const hamburger = document.getElementById('hamburger');
const mobileOverlay = document.getElementById('mobile-overlay');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');
const btnCases = document.getElementById('btn-cases');
const btnContact = document.getElementById('btn-contact');
const caseItems = document.querySelectorAll('.case-item');
const emailCopy = document.getElementById('email-copy');
const wechatCopy = document.getElementById('wechat-copy');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function smoothScroll(target, callback) {
    if (isScrolling) return;
    isScrolling = true;
    const targetEl = document.querySelector(target);
    if (!targetEl) { isScrolling = false; return; }
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
    const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    setTimeout(() =&gt; { isScrolling = false; if (callback) callback(); }, 600);
}

const sections = document.querySelectorAll('section[id]');
const navObserver = new IntersectionObserver((entries) =&gt; {
    entries.forEach(entry =&gt; {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link =&gt; link.classList.toggle('active', link.getAttribute('data-section') === id));
        }
    });
}, { root: null, rootMargin: '-40% 0px -60% 0px', threshold: 0 });
sections.forEach(section =&gt; navObserver.observe(section));

window.addEventListener('scroll', () =&gt; {
    if ((window.innerHeight + window.scrollY) &gt;= document.body.offsetHeight - 100) {
        navLinks.forEach(link =&gt; link.classList.remove('active'));
        document.querySelector('[data-section="contact"]')?.classList.add('active');
    }
});

navLogo.addEventListener('click', () =&gt; window.scrollTo({ top: 0, behavior: 'smooth' }));
navLinks.forEach(link =&gt; link.addEventListener('click', (e) =&gt; { e.preventDefault(); smoothScroll(link.getAttribute('href')); }));

function openMobileMenu() {
    mobileOverlay.style.display = 'block';
    requestAnimationFrame(() =&gt; { mobileOverlay.classList.add('open'); mobileMenu.classList.add('open'); });
    document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
    mobileOverlay.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() =&gt; mobileOverlay.style.display = 'none', 350);
}
hamburger.addEventListener('click', openMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);
mobileClose.addEventListener('click', closeMobileMenu);
mobileNavLinks.forEach(link =&gt; link.addEventListener('click', (e) =&gt; {
    e.preventDefault(); closeMobileMenu();
    setTimeout(() =&gt; smoothScroll(link.getAttribute('href')), 350);
}));

btnCases.addEventListener('click', () =&gt; smoothScroll('#cases'));
btnContact.addEventListener('click', () =&gt; smoothScroll('#contact'));

// Skill tag click
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
                        toggleCase(targetElement);
                    }, 600);
                }
            }
        }
    });
});

function updateLanguage(lang) {
    currentLang = lang;
    langBtns.forEach(btn =&gt; btn.classList.toggle('active', btn.getAttribute('data-lang') === lang));
    document.querySelectorAll('[data-zh]').forEach(el =&gt; {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            if (el.id === 'btn-cases') {
                const span = el.querySelector('span');
                if (span) span.textContent = text;
            } else {
                // 处理转义的HTML标签
                const decodedText = text.replace(/&lt;/g, '&lt;').replace(/&gt;/g, '&gt;');
                el.innerHTML = decodedText;
            }
        }
    });
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}
langBtns.forEach(btn =&gt; btn.addEventListener('click', () =&gt; updateLanguage(btn.getAttribute('data-lang'))));

// Case accordion
caseItems.forEach(item =&gt; {
    const header = item.querySelector('.case-header');
    const detail = item.querySelector('.case-detail');
    header.addEventListener('click', () =&gt; toggleCase(item));
    header.addEventListener('keydown', (e) =&gt; {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCase(item); }
        if (e.key === 'Escape' &amp;&amp; item.classList.contains('open')) toggleCase(item);
    });
});

function toggleCase(item) {
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
            const containerRect = casesContainer.getBoundingClientRect();
            const centerOffset = (containerRect.height - caseItemRect.height) / 2 + containerRect.top;
            
            if (Math.abs(centerOffset - window.pageYOffset) &gt; 50) {
                const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
                window.scrollTo({ top: centerOffset - navHeight - 20, behavior: 'smooth' });
            }
        }, 400);
    }
}

// Case tabs
document.querySelectorAll('.case-tabs').forEach(tabsContainer =&gt; {
    const tabs = tabsContainer.querySelectorAll('.case-tab');
    const contents = tabsContainer.parentElement.querySelectorAll('.case-tab-content');
    tabs.forEach(tab =&gt; {
        tab.addEventListener('click', () =&gt; {
            tabs.forEach(t =&gt; t.classList.remove('active'));
            tab.classList.add('active');
            const tabName = tab.getAttribute('data-tab');
            contents.forEach(c =&gt; c.classList.toggle('active', c.getAttribute('data-content') === tabName));
            // Recalculate max-height
            const caseItem = tab.closest('.case-item');
            const detail = caseItem.querySelector('.case-detail');
            if (caseItem.classList.contains('open')) {
                detail.style.maxHeight = detail.scrollHeight + 'px';
            }
        });
    });
});

// Cases Accordion - Enhanced with Physics
const casesAccordion = document.querySelector('.cases-accordion');

if (casesAccordion) {
    const accordionItems = Array.from(casesAccordion.querySelectorAll('.case-accordion-item:not(.case-accordion-placeholder)'));
    const indicatorDots = document.querySelectorAll('.cases-indicator-dot');
    let currentIndex = 0;
    let isAnimating = false;
    
    // 自动轮播功能
    let autoPlayTimer = null;
    const AUTOPLAY_DELAY = 3000; // 3 秒自动轮播
    
    // 启动自动轮播
    function startAutoPlay() {
        if (autoPlayTimer) return;
        
        autoPlayTimer = setInterval(() =&gt; {
            if (!isAnimating) {
                const nextIndex = (currentIndex + 1) % accordionItems.length;
                switchCase(nextIndex);
            }
        }, AUTOPLAY_DELAY);
    }
    
    // 停止自动轮播
    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }
    
    // 重置自动轮播计时器
    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }
    
    // Preload images for next/prev cases
    function preloadImages(index) {
        const nextIndex = (index + 1) % accordionItems.length;
        const prevIndex = (index - 1 + accordionItems.length) % accordionItems.length;
        
        [nextIndex, prevIndex].forEach(i =&gt; {
            const item = accordionItems[i];
            const image = item.querySelector('.case-accordion-image');
            if (image &amp;&amp; image.style.backgroundImage) {
                const urlMatch = image.style.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
                if (urlMatch) {
                    const img = new Image();
                    img.src = urlMatch[1];
                }
            }
        });
    }
    
    // Update indicator
    function updateIndicator(index) {
        indicatorDots.forEach((dot, i) =&gt; {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Center the active card in the viewport
    function centerActiveCard(index) {
        const activeItem = accordionItems[index];
        if (!activeItem) return;
        
        const accordionRect = casesAccordion.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const wrapperRect = document.querySelector('.cases-accordion-wrapper').getBoundingClientRect();
        
        let offset;
        if (index === 0) {
            // 第一个卡片：向右平移4个未展开卡片位置
            const itemLeft = itemRect.left - accordionRect.left;
            // 4个未展开卡片宽度 + 20px偏移
            const collapsedCardWidth = 70;
            offset = (20 + collapsedCardWidth * 4) - itemLeft;
        } else {
            // 其他卡片：居中后再向右平移2个未展开卡片位置
            const itemCenter = itemRect.left + itemRect.width / 2 - accordionRect.left;
            const wrapperCenter = wrapperRect.width / 2;
            const collapsedCardWidth = 70;
            offset = wrapperCenter - itemCenter + collapsedCardWidth * 2;
        }
        
        casesAccordion.style.transform = `translateX(${offset}px)`;
    }
    
    
    // Switch to specific case with physics
    function switchCase(index, useBoundaryDamping = false) {
        if (isAnimating) return;
        if (index &lt; 0 || index &gt;= accordionItems.length) {
            if (useBoundaryDamping) {
                // Boundary damping effect
                const currentItem = accordionItems[currentIndex];
                currentItem.style.transition = 'transform 0.3s cubic-bezier(0.2, 0.7, 0.3, 1)';
                currentItem.style.transform = 'scale(1.02)';
                setTimeout(() =&gt; {
                    currentItem.style.transform = 'scale(1)';
                }, 150);
            }
            return;
        }
        
        isAnimating = true;
        
        accordionItems.forEach((item, i) =&gt; {
            if (i === currentIndex &amp;&amp; i !== index) {
                item.classList.add('collapsing');
            }
            if (i === index) {
                item.classList.remove('collapsing');
                item.classList.add('active');
                const detail = item.querySelector('.case-accordion-detail');
                if (detail) {
                    document.querySelectorAll('.case-accordion-detail').forEach(d =&gt; d.classList.remove('active'));
                    detail.classList.add('active');
                }
            } else {
                item.classList.remove('active');
            }
        });
        
        currentIndex = index;
        updateIndicator(index);
        preloadImages(index);
        
        // Center the card after a small delay to allow for width transition
        setTimeout(() =&gt; {
            centerActiveCard(index);
        }, 50);
        
        setTimeout(() =&gt; {
            accordionItems.forEach(item =&gt; item.classList.remove('collapsing'));
            isAnimating = false;
        }, 850);
    }
    
    // Handle indicator dot clicks
    indicatorDots.forEach((dot, index) =&gt; {
        dot.addEventListener('click', () =&gt; {
            resetAutoPlay(); // 重置自动轮播
            switchCase(index);
        });
    });

    // Handle navigation button clicks
    const navButtons = document.querySelectorAll('.cases-indicator-nav');
    navButtons.forEach(button =&gt; {
        button.addEventListener('click', () =&gt; {
            resetAutoPlay(); // 重置自动轮播
            const nav = button.getAttribute('data-nav');
            if (nav === 'first') {
                switchCase(0);
            } else if (nav === 'last') {
                switchCase(accordionItems.length - 1);
            }
        });
    });
    
    // Accordion item click
    accordionItems.forEach((item, index) =&gt; {
        item.addEventListener('click', (e) =&gt; {
            if (e.target.closest('.case-accordion-btn') || e.target.closest('.case-accordion-tag')) {
                return;
            }
            
            if (!item.classList.contains('active')) {
                resetAutoPlay(); // 重置自动轮播
                switchCase(index);
            }
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) =&gt; {
        if (e.key === 'ArrowLeft') {
            resetAutoPlay(); // 重置自动轮播
            switchCase(currentIndex - 1, true);
        } else if (e.key === 'ArrowRight') {
            resetAutoPlay(); // 重置自动轮播
            switchCase(currentIndex + 1, true);
        }
    });
    
    // Touch/Swipe gestures with inertia
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartTime = 0;
    let touchEndTime = 0;
    
    casesAccordion.addEventListener('touchstart', (e) =&gt; {
        stopAutoPlay(); // 停止自动轮播
        touchStartX = e.changedTouches[0].screenX;
        touchStartTime = Date.now();
    }, { passive: true });
    
    casesAccordion.addEventListener('touchend', (e) =&gt; {
        touchEndX = e.changedTouches[0].screenX;
        touchEndTime = Date.now();
        handleSwipe();
        startAutoPlay(); // 重新启动自动轮播
    }, { passive: true });
    
    // Mouse drag
    let isDragging = false;
    let dragStartX = 0;
    let dragStartTime = 0;
    
    casesAccordion.addEventListener('mousedown', (e) =&gt; {
        if (e.target.closest('.case-accordion-btn') || e.target.closest('.case-accordion-tag')) {
            return;
        }
        stopAutoPlay(); // 停止自动轮播
        isDragging = true;
        dragStartX = e.screenX;
        dragStartTime = Date.now();
    });
    
    document.addEventListener('mouseup', (e) =&gt; {
        if (isDragging) {
            isDragging = false;
            touchEndX = e.screenX;
            touchStartX = dragStartX;
            touchEndTime = Date.now();
            touchStartTime = dragStartTime;
            handleSwipe();
            startAutoPlay(); // 重新启动自动轮播
        }
    });
    
    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        const swipeTime = touchEndTime - touchStartTime;
        const swipeVelocity = Math.abs(swipeDistance) / swipeTime;
        
        const minSwipeDistance = 50;
        const velocityThreshold = 0.5;
        
        if (Math.abs(swipeDistance) &gt; minSwipeDistance || swipeVelocity &gt; velocityThreshold) {
            if (swipeDistance &lt; 0) {
                switchCase(currentIndex + 1, true);
            } else {
                switchCase(currentIndex - 1, true);
            }
        }
    }
    
    // View detail button - Navigate to case detail page with transition
    document.querySelectorAll('.case-accordion-btn').forEach((btn, index) =&gt; {
        btn.addEventListener('click', (e) =&gt; {
            e.stopPropagation();
            
            // 获取当前案例 ID
            const caseNumber = (index + 1).toString().padStart(2, '0');
            const caseId = `case-${caseNumber}`;
            const targetPage = `cases/${caseId}.html`;
            
            // 添加点击动画效果
            btn.style.transform = 'scale(0.95)';
            btn.style.transition = 'transform 0.2s ease';
            
            // 清除所有卡片的 flipped 状态
            document.querySelectorAll('.case-accordion-item').forEach(item =&gt; {
                item.classList.remove('flipped');
            });
            
            // 关闭浮动层（如果打开）
            const floatingLayer = document.getElementById('floatingLayer');
            if (floatingLayer &amp;&amp; floatingLayer.classList.contains('open')) {
                floatingLayer.classList.remove('open');
            }
            
            // 添加到 sessionStorage 用于页面过渡动画
            sessionStorage.setItem('navigateToCase', caseId);
            sessionStorage.setItem('fromPage', 'index');
            
            // 添加页面退出过渡动画
            document.body.classList.add('page-exit');
            
            setTimeout(() =&gt; {
                btn.style.transform = 'scale(1)';
                // 跳转到详情页
                window.location.href = targetPage;
            }, 300);
        });
    });
    
    // Close flip when clicking outside
    document.addEventListener('click', (e) =&gt; {
        if (!e.target.closest('.case-accordion-btn') &amp;&amp; !e.target.closest('.case-accordion-detail')) {
            document.querySelectorAll('.case-accordion-item').forEach(item =&gt; {
                item.classList.remove('flipped');
            });
        }
    });
    
    // Close flip when clicking detail content (except tabs)
    document.addEventListener('click', (e) =&gt; {
        if (e.target.closest('.case-accordion-detail') &amp;&amp; 
            !e.target.closest('.case-tab') &amp;&amp; 
            !e.target.closest('.case-block')) {
            const item = e.target.closest('.case-accordion-item');
            if (item &amp;&amp; item.classList.contains('flipped')) {
                item.classList.remove('flipped');
            }
        }
    });
    
    // Case tab switching
    document.querySelectorAll('.case-tab').forEach(tab =&gt; {
        tab.addEventListener('click', () =&gt; {
            const caseDetail = tab.closest('.case-accordion-detail');
            const tabName = tab.getAttribute('data-tab');
            
            caseDetail.querySelectorAll('.case-tab').forEach(t =&gt; t.classList.remove('active'));
            caseDetail.querySelectorAll('.case-tab-content').forEach(c =&gt; c.classList.remove('active'));
            
            tab.classList.add('active');
            caseDetail.querySelector(`[data-content="${tabName}"]`).classList.add('active');
        });
    });
    
    // Tag click - scroll to corresponding section
    document.querySelectorAll('.case-accordion-tag').forEach(tag =&gt; {
        tag.addEventListener('click', (e) =&gt; {
            e.stopPropagation();
            const tagText = tag.textContent.trim();
            
            const sections = {
                'Prompt工程': '#method',
                '工作流设计': '#method',
                '用户研究': '#about',
                '需求分析': '#about',
                '产品策略': '#about',
                '数据驱动': '#cases',
                '指标设计': '#cases'
            };
            
            const targetSection = sections[tagText];
            if (targetSection) {
                const target = document.querySelector(targetSection);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Initialize
    preloadImages(0);
    updateIndicator(0);
    
    // Center the initial active card
    setTimeout(() =&gt; {
        centerActiveCard(0);
        // 启动自动轮播
        startAutoPlay();
    }, 100);
    
    // Recenter on window resize
    window.addEventListener('resize', () =&gt; {
        centerActiveCard(currentIndex);
        resetAutoPlay(); // 重置自动轮播
    });
}

// WeChat copy
wechatCopy.addEventListener('click', async () =&gt; {
    const text = wechatCopy.getAttribute('data-copy');
    const tooltip = wechatCopy.querySelector('.contact-tooltip');
    try {
        await navigator.clipboard.writeText(text);
        tooltip.textContent = currentLang === 'zh' ? '已复制' : 'Copied!';
        tooltip.classList.add('show');
        setTimeout(() =&gt; { tooltip.classList.remove('show'); tooltip.textContent = currentLang === 'zh' ? '点击复制' : 'Click to copy'; }, 1500);
    } catch (err) {
        tooltip.textContent = currentLang === 'zh' ? '请手动复制' : 'Copy manually';
        tooltip.classList.add('show');
        setTimeout(() =&gt; { tooltip.classList.remove('show'); tooltip.textContent = currentLang === 'zh' ? '点击复制' : 'Click to copy'; }, 1500);
    }
});

// Email copy
emailCopy.addEventListener('click', async () =&gt; {
    const text = emailCopy.getAttribute('data-copy');
    const tooltip = emailCopy.querySelector('.contact-tooltip');
    try {
        await navigator.clipboard.writeText(text);
        tooltip.textContent = currentLang === 'zh' ? '已复制' : 'Copied!';
        tooltip.classList.add('show');
        setTimeout(() =&gt; { tooltip.classList.remove('show'); tooltip.textContent = currentLang === 'zh' ? '点击复制' : 'Click to copy'; }, 1500);
    } catch (err) {
        tooltip.textContent = currentLang === 'zh' ? '请手动复制' : 'Copy manually';
        tooltip.classList.add('show');
        setTimeout(() =&gt; { tooltip.classList.remove('show'); tooltip.textContent = currentLang === 'zh' ? '点击复制' : 'Click to copy'; }, 1500);
    }
});

// Lightbox
document.querySelectorAll('.case-gallery-item img').forEach(img =&gt; {
    img.addEventListener('click', () =&gt; {
        lightboxImg.src = img.src;
        lightbox.classList.add('open');
    });
});
lightboxClose.addEventListener('click', () =&gt; lightbox.classList.remove('open'));
lightbox.addEventListener('click', (e) =&gt; { if (e.target === lightbox) lightbox.classList.remove('open'); });

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) =&gt; {
    entries.forEach(entry =&gt; {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { root: null, rootMargin: '0px 0px -15% 0px', threshold: 0 });
document.querySelectorAll('.reveal').forEach(el =&gt; revealObserver.observe(el));

if (window.location.hash) setTimeout(() =&gt; smoothScroll(window.location.hash), 100);


// ============================================
// API 集成代码 - 腾讯云云开发版本
// ============================================

// API 基础 URL（部署时替换为实际的云函数 URL）
const API_BASE_URL = 'https://futura-html-0g1d9g7k775b46e6-1376607710.ap-shanghai.app.tcloudbase.com/api';

// 生成访客 ID
function generateVisitorId() {
    let visitorId = localStorage.getItem('futuracv_visitor_id');
    
    if (!visitorId) {
        visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('futuracv_visitor_id', visitorId);
    }
    return visitorId;
}

// 记录页面访问
async function trackVisit(page, duration = 0) {
    try {
        const visitorId = generateVisitorId();
        await fetch(`${API_BASE_URL}/api/track/visit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                visitorId,
                page,
                duration,
                userAgent: navigator.userAgent,
                referrer: document.referrer
            })
        });
    } catch (error) {
        console.log('Visit tracking error:', error);
    }
}

// 记录案例浏览
async function trackCaseView(caseId, duration = 0) {
    try {
        const visitorId = generateVisitorId();
        await fetch(`${API_BASE_URL}/api/track/case-view`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ visitorId, caseId, duration })
        });
    } catch (error) {
        console.log('Case view tracking error:', error);
    }
}

// 初始化访客追踪
const pageLoadTime = Date.now();
window.addEventListener('beforeunload', () =&gt; {
    const duration = Math.floor((Date.now() - pageLoadTime) / 1000);
    trackVisit(window.location.pathname, duration);
});

// 从 API 加载案例数据（如果 API 可用）
async function loadCasesFromAPI() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cases`);
        if (!response.ok) throw new Error('API not available');
        const result = await response.json();
        
        if (result.success &amp;&amp; result.data.length &gt; 0) {
            console.log('Cases loaded from Tencent Cloud API:', result.data.length);
            return result.data;
        }
    } catch (error) {
        console.log('Using static case data (API not available):', error.message);
    }
    return null;
}

// 页面加载时尝试从 API 加载案例
loadCasesFromAPI();

console.log('Tencent Cloud API integration initialized');


// Floating Layer Logic
const floatingLayer = document.getElementById('floatingLayer');
const floatingLayerDetail = document.getElementById('floatingLayerDetail');
const floatingLayerPrev = document.getElementById('floatingLayerPrev');
const floatingLayerNext = document.getElementById('floatingLayerNext');
const floatingLayerClose = document.getElementById('floatingLayerClose');
const floatingLayerZoneLeft = document.getElementById('floatingLayerZoneLeft');
const floatingLayerZoneRight = document.getElementById('floatingLayerZoneRight');
let floatingLayerIndex = -1;

// Open floating layer with current card's flipped state
document.querySelectorAll('.case-accordion-btn').forEach((btn, index) =&gt; {
    btn.addEventListener('click', (e) =&gt; {
        e.stopPropagation();
        const item = btn.closest('.case-accordion-item');
        
        if (item.classList.contains('active')) {
            floatingLayerIndex = index;
            openFloatingLayer(index);
        }
    });
});

function openFloatingLayer(index) {
    if (index &lt; 0 || index &gt;= document.querySelectorAll('.case-accordion-item').length) return;
    
    floatingLayerIndex = index;
    
    const card = document.querySelectorAll('.case-accordion-item')[index];
    const cardImage = card.querySelector('.case-accordion-image');
    
    // Set floating layer background to match card's background image
    const floatingLayerElement = document.getElementById('floatingLayer');
    if (cardImage) {
        const backgroundImage = cardImage.style.backgroundImage;
        if (backgroundImage) {
            floatingLayerElement.style.setProperty('--floating-bg', backgroundImage);
            floatingLayerElement.querySelector('::before')?.style.setProperty('background-image', backgroundImage);
        } else {
            floatingLayerElement.style.removeProperty('--floating-bg');
            if (floatingLayerElement.querySelector('::before')) {
                floatingLayerElement.querySelector('::before').style.removeProperty('background-image');
            }
        }
    }
    
    floatingLayerDetail.innerHTML = card.outerHTML;
    
    const floatingCard = floatingLayerDetail.querySelector('.case-accordion-item');
    if (floatingCard &amp;&amp; !floatingCard.classList.contains('case-accordion-placeholder')) {
        floatingCard.classList.add('flipped');
    }
    
    // Add event listeners for case tabs in floating layer
    floatingLayerDetail.querySelectorAll('.case-tab').forEach(tab =&gt; {
        tab.addEventListener('click', (e) =&gt; {
            e.stopPropagation();
            const tabName = tab.dataset.tab;
            const caseDetail = tab.closest('.case-accordion-detail');
            
            if (caseDetail) {
                caseDetail.querySelectorAll('.case-tab').forEach(t =&gt; t.classList.remove('active'));
                caseDetail.querySelectorAll('.case-tab-content').forEach(s =&gt; s.classList.remove('active'));
                
                tab.classList.add('active');
                const targetContent = caseDetail.querySelector(`[data-content="${tabName}"]`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            }
        });
    });
    
    floatingLayer.classList.add('open');
}

function closeFloatingLayer() {
    floatingLayer.classList.remove('open');
    setTimeout(() =&gt; {
        floatingLayerDetail.innerHTML = '';
        if (floatingLayerIndex &gt;= 0) {
            const card = document.querySelectorAll('.case-accordion-item')[floatingLayerIndex];
            card.classList.remove('flipped');
        }
        floatingLayerIndex = -1;
    }, 400);
}

floatingLayerPrev.addEventListener('click', (e) =&gt; {
    e.stopPropagation();
    const totalCards = document.querySelectorAll('.case-accordion-item').length;
    let prevIndex = floatingLayerIndex - 1;
    if (prevIndex &lt; 0) prevIndex = totalCards - 1;
    
    // Ensure the previous card is active (expanded) before opening floating layer
    const prevCard = document.querySelectorAll('.case-accordion-item')[prevIndex];
    
    // Remove active class from all cards
    document.querySelectorAll('.case-accordion-item').forEach(item =&gt; {
        item.classList.remove('active');
    });
    
    // Add active class to previous card
    prevCard.classList.add('active');
    
    // Update indicator and center the card
    updateIndicator(prevIndex);
    
    openFloatingLayer(prevIndex);
});

floatingLayerNext.addEventListener('click', (e) =&gt; {
    e.stopPropagation();
    const totalCards = document.querySelectorAll('.case-accordion-item').length;
    let nextIndex = floatingLayerIndex + 1;
    if (nextIndex &gt;= totalCards) nextIndex = 0;
    
    // Ensure the next card is active (expanded) before opening floating layer
    const nextCard = document.querySelectorAll('.case-accordion-item')[nextIndex];
    
    // Remove active class from all cards
    document.querySelectorAll('.case-accordion-item').forEach(item =&gt; {
        item.classList.remove('active');
    });
    
    // Add active class to next card
    nextCard.classList.add('active');
    
    // Update indicator and center the card
    updateIndicator(nextIndex);
    
    openFloatingLayer(nextIndex);
});

// Close button click handler
floatingLayerClose.addEventListener('click', (e) =&gt; {
    e.stopPropagation();
    closeFloatingLayer();
});

// Left zone click - switch to next project
floatingLayerZoneLeft.addEventListener('click', (e) =&gt; {
    e.stopPropagation();
    const totalCards = document.querySelectorAll('.case-accordion-item').length;
    let nextIndex = floatingLayerIndex + 1;
    if (nextIndex &gt;= totalCards) nextIndex = 0;
    
    const nextCard = document.querySelectorAll('.case-accordion-item')[nextIndex];
    
    document.querySelectorAll('.case-accordion-item').forEach(item =&gt; {
        item.classList.remove('active');
    });
    
    nextCard.classList.add('active');
    updateIndicator(nextIndex);
    openFloatingLayer(nextIndex);
});

// Right zone click - switch to previous project
floatingLayerZoneRight.addEventListener('click', (e) =&gt; {
    e.stopPropagation();
    const totalCards = document.querySelectorAll('.case-accordion-item').length;
    let prevIndex = floatingLayerIndex - 1;
    if (prevIndex &lt; 0) prevIndex = totalCards - 1;
    
    const prevCard = document.querySelectorAll('.case-accordion-item')[prevIndex];
    
    document.querySelectorAll('.case-accordion-item').forEach(item =&gt; {
        item.classList.remove('active');
    });
    
    prevCard.classList.add('active');
    updateIndicator(prevIndex);
    openFloatingLayer(prevIndex);
});

// Close floating layer when clicking outside the card
floatingLayer.addEventListener('click', (e) =&gt; {
    const card = floatingLayerDetail.querySelector('.case-accordion-item');
    const isClickOnZone = e.target === floatingLayerZoneLeft || e.target === floatingLayerZoneRight;
    const isClickOnClose = e.target === floatingLayerClose || floatingLayerClose.contains(e.target);
    
    if ((!card || !card.contains(e.target)) &amp;&amp; !isClickOnZone &amp;&amp; !isClickOnClose) {
        closeFloatingLayer();
    }
});

document.addEventListener('keydown', (e) =&gt; {
    if (floatingLayer.classList.contains('open')) {
        if (e.key === 'Escape') {
            closeFloatingLayer();
        } else if (e.key === 'ArrowRight') {
            const totalCards = document.querySelectorAll('.case-accordion-item').length;
            let nextIndex = floatingLayerIndex + 1;
            if (nextIndex &gt;= totalCards) nextIndex = 0;
            
            // Ensure the next card is active (expanded) before opening floating layer
            const nextCard = document.querySelectorAll('.case-accordion-item')[nextIndex];
            
            // Remove active class from all cards
            document.querySelectorAll('.case-accordion-item').forEach(item =&gt; {
                item.classList.remove('active');
            });
            
            // Add active class to next card
            nextCard.classList.add('active');
            
            // Update indicator and center the card
            updateIndicator(nextIndex);
            
            openFloatingLayer(nextIndex);
        } else if (e.key === 'ArrowLeft') {
            const totalCards = document.querySelectorAll('.case-accordion-item').length;
            let prevIndex = floatingLayerIndex - 1;
            if (prevIndex &lt; 0) prevIndex = totalCards - 1;
            
            // Ensure the previous card is active (expanded) before opening floating layer
            const prevCard = document.querySelectorAll('.case-accordion-item')[prevIndex];
            
            // Remove active class from all cards
            document.querySelectorAll('.case-accordion-item').forEach(item =&gt; {
                item.classList.remove('active');
            });
            
            // Add active class to previous card
            prevCard.classList.add('active');
            
            // Update indicator and center the card
            updateIndicator(prevIndex);
            
            openFloatingLayer(prevIndex);
        }
    }
});

