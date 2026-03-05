export function initContactCopy() {
    const emailCopy = document.getElementById('email-copy');
    const wechatCopy = document.getElementById('wechat-copy');
    
    [emailCopy, wechatCopy].forEach(el =&gt; {
        if (el) {
            el.addEventListener('click', async () =&gt; {
                const text = el.getAttribute('data-copy');
                const tooltip = el.querySelector('.contact-tooltip');
                
                try {
                    await navigator.clipboard.writeText(text);
                    if (tooltip) {
                        tooltip.textContent = tooltip.getAttribute('data-zh') === '点击复制' ? '已复制!' : 'Copied!';
                        tooltip.classList.add('show');
                        setTimeout(() =&gt; {
                            tooltip.classList.remove('show');
                            tooltip.textContent = tooltip.getAttribute('data-zh') === '点击复制' ? '点击复制' : 'Click to copy';
                        }, 2000);
                    }
                } catch (err) {
                    console.error('Copy failed:', err);
                }
            });
        }
    });
}
