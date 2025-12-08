// --- Breaking News Ticker Smooth Scroll ---
function startTicker() {
    const tickerContainer = document.querySelector('.breaking-news .container');
    if (!tickerContainer) return;

    const originalContent = tickerContainer.innerHTML;
    tickerContainer.innerHTML = `<span class="ticker-content">${originalContent}</span>`;

    const tickerContent = tickerContainer.querySelector('.ticker-content');
    // Duplicate content for infinite scroll effect
    tickerContent.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;' + originalContent;

    let position = 0;
    const speed = 1; // Adjust speed here (higher = faster)

    function scroll() {
        position -= speed;
        // Reset position when scroll finished (half width because of duplicated content)
        if (position <= -tickerContent.scrollWidth / 2) {
            position = 0;
        }
        tickerContent.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(scroll);
    }

    scroll();
}

// --- Sticky Header for nav and breaking news ---
function handleStickyHeader() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const breakingNews = document.querySelector('.breaking-news');

    if (!header || !nav || !breakingNews) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > header.offsetHeight) {
            nav.classList.add('sticky-nav');
            breakingNews.classList.add('sticky-ticker');
        } else {
            nav.classList.remove('sticky-nav');
            breakingNews.classList.remove('sticky-ticker');
        }
    });
}

// Initialize when DOM loaded
window.addEventListener('DOMContentLoaded', () => {
    startTicker();
    handleStickyHeader();
});

