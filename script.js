document.addEventListener('DOMContentLoaded', function() {
    
    // 1. **स्वचालित तिथि और वर्ष अपडेट (Automatic Date and Year Update)**
    
    const currentDateDisplay = document.getElementById('currentDateDisplay');
    const currentYearSpan = document.getElementById('currentYear');

    const now = new Date();
    
    // ऊपरी पट्टी में तिथि को अपडेट करना
    if (currentDateDisplay) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateDisplay.textContent = now.toLocaleDateString('hi-IN', options);
    }

    // फुटर में वर्ष को अपडेट करना
    if (currentYearSpan) {
        currentYearSpan.textContent = now.getFullYear();
    }
    
    // -----------------------------------------------------

    // 2. **मोबाइल नेविगेशन टॉगल (Mobile Navigation Toggle)**
    
    const menuToggle = document.getElementById('menuToggle');
    const mainNavList = document.querySelector('.nav-list'); // UL element

    if (menuToggle && mainNavList) {
        // मेनू खोलने/बंद करने के लिए बटन पर क्लिक लिसनर
        menuToggle.addEventListener('click', function() {
            // 'active' क्लास जोड़ें या हटाएँ (जो CSS में मेनू को दिखाता है)
            mainNavList.classList.toggle('active'); 
            
            // एक्सेसिबिलिटी (पहुँच) के लिए aria-expanded को टॉगल करना
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // -----------------------------------------------------

    // 3. **ट्रेंडिंग न्यूज़ स्क्रोलर (Trending News Scroller)**
    
    const trendingScroll = document.querySelector('.trending-scroll');
    if (trendingScroll) {
        let scrollPosition = 0;
        const scrollSpeed = 0.5; // स्क्रॉल की गति (पिक्सेल प्रति फ्रेम)
        
        // सामग्री की वास्तविक चौड़ाई (content width)
        const contentWidth = trendingScroll.scrollWidth;
        // कंटेनर की चौड़ाई (container width)
        const containerWidth = trendingScroll.clientWidth;

        // स्क्रॉलिंग तभी करें जब सामग्री कंटेनर से बड़ी हो
        if (contentWidth > containerWidth) {
            
            function animateScroll() {
                // स्क्रॉल को आगे बढ़ाएँ
                scrollPosition += scrollSpeed;
                
                // अगर स्क्रॉल अंत तक पहुँच जाए, तो उसे वापस शुरुआत में सेट करें
                if (scrollPosition >= contentWidth - containerWidth) {
                    scrollPosition = 0; // या -containerWidth, कंटेंट को तुरंत वापस लाने के लिए
                }
                
                // स्क्रॉल को लागू करें
                trendingScroll.scrollLeft = scrollPosition;
                
                // अगले फ्रेम के लिए फिर से कॉल करें
                requestAnimationFrame(animateScroll);
            }
            
            // एनीमेशन शुरू करें
            requestAnimationFrame(animateScroll);

            // माउस ओवर होने पर स्क्रॉलिंग रोकना
            trendingScroll.addEventListener('mouseenter', () => {
                scrollSpeed = 0;
            });
            // माउस हटने पर स्क्रॉलिंग फिर से शुरू करना
            trendingScroll.addEventListener('mouseleave', () => {
                scrollSpeed = 0.5;
            });
        }
    }
});
