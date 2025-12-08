// --- 1. Breaking News Ticker Functionality ---
function startTicker() {
    const tickerContainer = document.querySelector('.breaking-news .container');
    if (!tickerContainer) return;
    const newsItems = tickerContainer.innerHTML;
    
    // Wrap the content to prepare it for scrolling
    tickerContainer.innerHTML = `<span class="ticker-content">${newsItems}</span>`;
    const tickerContent = document.querySelector('.ticker-content');
    
    // Clone the content to ensure continuous loop
    tickerContent.innerHTML += ' \u00A0\u00A0\u00A0\u00A0 ' + tickerContent.innerHTML;

    let position = 0;
    const speed = 0.5; // Controls the scrolling speed (lower is slower)
    const frameRate = 30; // 30 updates per second

    function scrollTicker() {
        position -= speed;
        if (position <= -tickerContent.scrollWidth / 2) {
            position = 0;
        }
        tickerContent.style.transform = `translateX(${position}px)`;
    }

    setInterval(scrollTicker, 1000 / frameRate);
}

// --- 2. Sticky Header Functionality ---
function handleStickyHeader() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const breakingNews = document.querySelector('.breaking-news');

    if (!header || !nav || !breakingNews) return;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > header.offsetHeight) {
            nav.classList.add('sticky-nav');
            breakingNews.classList.add('sticky-ticker');
            nav.style.position = 'fixed';
            nav.style.top = '0';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.zIndex = '999';
        } else {
            nav.classList.remove('sticky-nav');
            breakingNews.classList.remove('sticky-ticker');
            nav.style.position = '';
            nav.style.top = '';
            nav.style.left = '';
            nav.style.right = '';
            nav.style.zIndex = '';
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    startTicker();
    handleStickyHeader();
});
