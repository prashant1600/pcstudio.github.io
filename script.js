// ===== SMOOTH & MOBILE-FRIENDLY ENHANCEMENTS =====

// 1. SMOOTH SCROLL NAVIGATION
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 2. SCROLL REVEAL ANIMATIONS
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.8s ease-out';
    observer.observe(element);
});

// 3. SMOOTH HOVER EFFECTS FOR CARDS AND BUTTONS
document.querySelectorAll('.btn, .service-card, .work-card').forEach(element => {
    element.style.transition = 'all 0.3s ease-out';
});

// 4. FORM HANDLING
const projectForm = document.getElementById('projectForm');
if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const projectType = document.getElementById('projectType').value;
        const message = document.getElementById('message').value;
        
        const submitBtn = projectForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show processing state
        submitBtn.textContent = '✨ Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            const waMessage = `Hello Prashant!\n\n*New Project Inquiry*\n\nName: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nIdea:\n${message}`;
            
            window.open(`https://wa.me/917498329228?text=${encodeURIComponent(waMessage)}`, '_blank');
            
            submitBtn.textContent = '✓ Message Sent!';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                projectForm.reset();
            }, 2000);
        }, 600);
    });
}

// 5. ACTIVE NAVIGATION HIGHLIGHT
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = 'var(--text)';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#27a6aa';
        }
    });
});

// 6. HANDLE IMAGE LOADING
document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
    img.onerror = function() {
        this.style.backgroundColor = 'rgba(39, 166, 170, 0.1)';
    };
});

console.log('🚀 Smooth & Mobile-Friendly Scripts Loaded!');
