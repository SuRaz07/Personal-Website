// Generate random particles
function createParticles() {
    const bgAnimation = document.querySelector('.bg-animation');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = Math.random() * 10 + 10 + 's';
        bgAnimation.appendChild(particle);
    }
}

// Generate floating orbs
function createOrbs() {
    const bgAnimation = document.querySelector('.bg-animation');
    for (let i = 0; i < 3; i++) {
        const orb = document.createElement('div');
        orb.className = 'orb';
        bgAnimation.appendChild(orb);
    }
}

createParticles();
createOrbs();

// Enhanced 3D card tilt effect with parallax
const card = document.querySelector('.card');
card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    
    // Parallax effect for inner elements
    const avatar = document.querySelector('.avatar');
    const moveX = (x - centerX) / 30;
    const moveY = (y - centerY) / 30;
    avatar.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
});

card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1500px) rotateX(0) rotateY(0) translateZ(0)';
    document.querySelector('.avatar').style.transform = 'translate(0, 0) scale(1)';
});

// Parallax scrolling effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.cube');
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Mouse trail effect
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Smooth scroll reveal animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Typing effect for description
const description = document.querySelector('.description');
if (description) {
    const text = description.textContent;
    description.textContent = '';
    description.style.opacity = '1';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            description.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    }
    
    setTimeout(typeWriter, 1000);
}
