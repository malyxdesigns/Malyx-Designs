document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll('.showcase-filter-btn');
    const items = document.querySelectorAll('.showcase-card');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');

    // 1. PORTFOLIO HUB TABS FILTER SYSTEM
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active ක්ලාස් එක මාරු කිරීම
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const match = btn.getAttribute('data-filter');

            // Categories අනුව පින්තූර Filter කිරීම
            items.forEach(item => {
                if(match === 'all' || item.getAttribute('data-category') === match) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.display = 'none';
                }
            });
        });
    });

    // 2. LIGHTBOX INTERACTION DISPLAY
    items.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            img.addEventListener('click', () => {
                lightbox.classList.add('show');
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                document.body.style.overflow = 'hidden'; // Scroll වෙන එක නවත්වනවා ලොකු වුණාම
            });
        }
    });

    // ලයිට්බොක්ස් එක වසා දැමීම
    const closeLightbox = () => {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
    };

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            closeLightbox();
        }
    });
});