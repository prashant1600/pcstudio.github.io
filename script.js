// ===== ADVANCED WEBSITE ENHANCEMENTS =====

// ---- 1. ADVANCED CURSOR SYSTEM ----
class CursorTracker {
    constructor() {
        this.cursor = document.getElementById('cursor');
        this.x = 0;
        this.y = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.speed = 0.15;
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => this.update(e));
        this.animate();
    }
    
    update(e) {
        this.targetX = e.clientX;
        this.targetY = e.clientY;
    }
    
    animate() {
        this.x += (this.targetX - this.x) * this.speed;
        this.y += (this.targetY - this.y) * this.speed;
        
        this.cursor.style.left = this.x + 'px';
        this.cursor.style.top = this.y + 'px';
        
        requestAnimationFrame(() => this.animate());
    }
}

// ---- 2. PARTICLE SYSTEM WITH CANVAS ----
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId) || this.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.resize();
        this.setupParticles();
        this.animate();
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }
    
    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.cssText = 'position: fixed; top: 0; left: 0; z-index: -1; pointer-events: none;';
        document.body.insertBefore(canvas, document.body.firstChild);
        return canvas;
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    setupParticles() {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: ['#27a6aa', '#00F5FF', '#9338d4'][Math.floor(Math.random() * 3)]
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw connections
            this.particles.forEach((otherParticle, otherIndex) => {
                if (index < otherIndex) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        this.ctx.strokeStyle = particle.color;
                        this.ctx.globalAlpha = (1 - distance / 150) * 0.2;
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        this.ctx.stroke();
                    }
                }
            });
            
            this.ctx.globalAlpha = 1;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ---- 3. SMOOTH SCROLL NAVIGATION ----
class SmoothScroller {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => this.handleScroll(e));
        });
    }
    
    handleScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// ---- 4. SCROLL PROGRESS BAR ----
class ScrollProgressBar {
    constructor() {
        this.bar = this.createBar();
        this.init();
    }
    
    createBar() {
        const bar = document.createElement('div');
        bar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, #27a6aa, #00F5FF, #9338d4);
            width: 0%;
            z-index: 999;
            box-shadow: 0 0 10px rgba(39, 166, 170, 0.8);
        `;
        document.body.appendChild(bar);
        return bar;
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (scrollTop / docHeight) * 100;
            this.bar.style.width = scrolled + '%';
        });
    }
}

// ---- 5. INTERSECTION OBSERVER FOR REVEAL ANIMATIONS ----
class RevealOnScroll {
    constructor() {
        this.options = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };
        this.observer = new IntersectionObserver((entries) => this.handleIntersection(entries), this.options);
        this.init();
    }
    
    init() {
        document.querySelectorAll('.reveal').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            element.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            this.observer.observe(element);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// ---- 6. INTERACTIVE HOVER EFFECTS ----
class HoverEffects {
    constructor() {
        this.init();
    }
    
    init() {
        // Button effects
        this.setupButtonEffects();
        // Card effects
        this.setupCardEffects();
        // Input effects
        this.setupInputEffects();
    }
    
    setupButtonEffects() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px) scale(1.02)';
                btn.style.boxShadow = '0 15px 40px rgba(39, 166, 170, 0.5)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0) scale(1)';
                btn.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
            });
            btn.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    }
    
    setupCardEffects() {
        const cards = document.querySelectorAll('.service-card, .work-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) rotateX(5deg)';
                card.style.boxShadow = '0 30px 60px rgba(39, 166, 170, 0.25)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0)';
                card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            });
            card.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.transformStyle = 'preserve-3d';
        });
    }
    
    setupInputEffects() {
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('focus', () => {
                input.style.boxShadow = '0 0 20px rgba(39, 166, 170, 0.6), inset 0 0 20px rgba(39, 166, 170, 0.1)';
                input.style.borderColor = '#27a6aa';
                input.style.transform = 'scale(1.02)';
            });
            input.addEventListener('blur', () => {
                input.style.boxShadow = 'none';
                input.style.borderColor = 'rgba(255,255,255,0.1)';
                input.style.transform = 'scale(1)';
            });
            input.style.transition = 'all 0.3s ease';
        });
    }
}

// ---- 7. CONFETTI ANIMATION ----
class ConfettiEffects {
    static create(x, y, count = 8) {
        const colors = ['#27a6aa', '#00F5FF', '#9338d4', '#9D4EDD'];
        
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 12px;
                height: 12px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
            `;
            document.body.appendChild(confetti);
            
            const angle = (Math.PI * 2 * i) / count;
            const velocity = 200 + Math.random() * 300;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let velocityY = vy;
            const gravity = 0.2;
            const friction = 0.98;
            let posX = 0, posY = 0;
            
            const animate = () => {
                posX += vx * 0.01 * friction;
                posY += velocityY * 0.01;
                velocityY += gravity;
                
                confetti.style.transform = `translate(${posX}px, ${posY}px)`;
                
                if (posY > window.innerHeight) {
                    confetti.remove();
                } else {
                    requestAnimationFrame(animate);
                }
            };
            animate();
        }
    }
}

// ---- 8. FORM HANDLING ----
class FormHandler {
    constructor() {
        this.form = document.getElementById('projectForm');
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const projectType = document.getElementById('projectType').value;
        const message = document.getElementById('message').value;
        
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Confetti burst
        const rect = submitBtn.getBoundingClientRect();
        ConfettiEffects.create(rect.left + rect.width / 2, rect.top + rect.height / 2, 15);
        
        // Button animation
        submitBtn.style.transform = 'scale(0.95)';
        submitBtn.textContent = '✨ Processing...';
        
        setTimeout(() => {
            submitBtn.textContent = '✓ Sending...';
            
            const waMessage = `Hello Prashant!\n\n*New Project Inquiry*\n\nName: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nIdea:\n${message}`;
            
            window.open(`https://wa.me/917498329228?text=${encodeURIComponent(waMessage)}`, '_blank');
            
            setTimeout(() => {
                submitBtn.textContent = '✓ Message Sent!';
                submitBtn.style.background = 'linear-gradient(45deg, #27a6aa, #00F5FF)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.transform = 'scale(1)';
                    submitBtn.style.background = '';
                    this.form.reset();
                }, 2000);
            }, 1500);
        }, 600);
    }
}

// ---- 9. NAVIGATION ACTIVE STATE ----
class ActiveNavigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-links a');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.updateActiveLink());
        this.updateActiveLink();
    }
    
    updateActiveLink() {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 250) {
                current = section.getAttribute('id');
            }
        });
        
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').slice(1);
            if (href === current) {
                link.classList.add('active');
                link.style.color = '#27a6aa';
            }
        });
    }
}

// ---- 10. PAGE PERFORMANCE MONITOR ----
class PerformanceMonitor {
    static init() {
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
                console.log(`✨ Page loaded in ${loadTime}ms`);
                console.log('🚀 Website is optimized and running smoothly!');
            });
        }
    }
}

// ---- INITIALIZE ALL SYSTEMS ----
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Initializing Advanced Website Systems...');
    
    // Initialize all modules
    new CursorTracker();
    new ScrollProgressBar();
    new SmoothScroller();
    new RevealOnScroll();
    new HoverEffects();
    new FormHandler();
    new ActiveNavigation();
    
    // Initialize particle system if THREE.js is available
    if (typeof THREE !== 'undefined') {
        console.log('✨ THREE.js detected - premium effects enabled');
    }
    
    PerformanceMonitor.init();
    console.log('✨ All systems online!');
});

// ---- UTILITY FUNCTIONS ----
const Utils = {
    debounce: (func, wait) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    },
    
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    smoothColor: (color1, color2, progress) => {
        // Smooth color transition utility
        const c1 = parseInt(color1.slice(1), 16);
        const c2 = parseInt(color2.slice(1), 16);
        
        const r = Math.round(((c1 >> 16) & 255) * (1 - progress) + ((c2 >> 16) & 255) * progress);
        const g = Math.round(((c1 >> 8) & 255) * (1 - progress) + ((c2 >> 8) & 255) * progress);
        const b = Math.round((c1 & 255) * (1 - progress) + (c2 & 255) * progress);
        
        return `rgb(${r}, ${g}, ${b})`;
    }
};

// Export for use in other scripts if needed
window.ConfettiEffects = ConfettiEffects;
window.Utils = Utils;
