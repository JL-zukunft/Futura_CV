export function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    
    if (!lightbox || !lightboxImg || !lightboxClose) return;
    
    document.querySelectorAll('.case-gallery-item').forEach(item =&gt; {
        const img = item.querySelector('img');
        if (img) {
            item.addEventListener('click', () =&gt; {
                lightboxImg.src = img.src;
                lightbox.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
        }
    });
    
    lightboxClose.addEventListener('click', () =&gt; {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    });
    
    lightbox.addEventListener('click', (e) =&gt; {
        if (e.target === lightbox) {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}
