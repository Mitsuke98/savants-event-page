document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in or fade-up classes
    const animElements = document.querySelectorAll('.fade-in, .fade-up');
    animElements.forEach(el => observer.observe(el));

    // Handle Sticky Scroll Text Replacement
    const scrollTriggers = document.querySelectorAll('.scroll-trigger');
    const dynamicTexts = document.querySelectorAll('.reason-text');
    
    if (scrollTriggers.length > 0) {
        const stickyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Hide all texts
                    dynamicTexts.forEach(t => {
                        t.classList.remove('active');
                    });
                    // Show target text
                    const targetId = entry.target.getAttribute('data-target');
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) targetEl.classList.add('active');
                }
            });
        }, { threshold: 0.5 }); // Trigger when section is cleanly in view

        scrollTriggers.forEach(t => stickyObserver.observe(t));
    }

    // Handle form submission
    const form = document.getElementById('register-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('button[type="submit"]');
            const successMsg = form.querySelector('.success-msg');
            
            // Simulate network request
            const originalText = btn.textContent;
            btn.textContent = 'Processing...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                form.reset();
                successMsg.classList.remove('hidden');
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMsg.classList.add('hidden');
                }, 5000);
            }, 1000);
        });
    }

    // Add mouse float effect to blobs
    const blobs = document.querySelectorAll('.blob');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        blobs[0].style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        blobs[1].style.transform = `translate(${x * -30}px, ${y * -30}px)`;
    });
});
