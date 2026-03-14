// ===== SMOOTH SCROLLING & NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  
  // Parallax background effect
  document.querySelectorAll('[data-parallax]').forEach(element => {
    const parallaxValue = element.dataset.parallax;
    element.style.transform = `translateY(${scrollY * parallaxValue}px)`;
  });

 // Navbar background effect on scroll
  
  const navbar = document.querySelector('.navbar');
  if (scrollY > 50) {
    navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.5)';
  } else {
    navbar.style.background = 'rgba(15, 23, 42, 0.92)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
  }
}); 

// ===== ANIMATION ON SCROLL =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px 0px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const container = entry.target;
      const cards = container.querySelectorAll('.stat-card, .skill-card, .project-card, .certification-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate-in');
        }, index * 200);
      });
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.about-stats, .skills-grid, .projects-grid, .certifications-grid').forEach(container => {
  const cards = container.querySelectorAll('.stat-card, .skill-card, .project-card, .certification-card');
  cards.forEach(card => card.classList.add('animate-init'));
  observer.observe(container);
});

document.querySelectorAll('.info-card, .about-text p').forEach(el => {
  el.classList.add('animate-init');
  observer.observe(el);
});

// ===== FORM SUBMISSION =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    
    // Simple validation
    if (name.trim() === '' || email.trim() === '') {
      alert('Please fill in all fields');
      return;
    }
    
    // Show success message
    const button = contactForm.querySelector('button');
    const originalText = button.innerHTML;
    button.innerHTML = '<span>✓ Message Sent!</span>';
    button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.background = '';
    }, 3000);
  });
}

// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '60px';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.flexDirection = 'column';
    navLinks.style.background = 'rgba(15, 23, 42, 0.95)';
    navLinks.style.padding = '20px';
    navLinks.style.gap = '15px';
    navLinks.style.zIndex = '999';
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.style.display = 'none';
    });
  });
}

// ===== SCROLL REVEAL ANIMATIONS =====
window.addEventListener('load', () => {
  const revealElements = document.querySelectorAll('.section-title, .hero-title, .hero-subtitle, .hero-desc');
  revealElements.forEach((el, index) => {
    el.style.animation = `fadeInUp 0.8s ease ${index * 0.1}s both`;
  });
});

// ===== ENHANCED MOUSE FOLLOW EFFECT =====
document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  // Subtle background gradient shift
  document.body.style.setProperty('--mouse-x', x);
  document.body.style.setProperty('--mouse-y', y);
});

// ===== ACTIVE NAV LINK INDICATOR =====
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href').slice(1) === current) {
      link.style.color = '#38bdf8';
    }
  });
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent);
    const increment = target / 30;
    let current = 0;

    const updateCount = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : counter.textContent.includes('%') ? '%' : '');
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = counter.textContent;
      }
    };

    // Trigger animation when element is visible
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        updateCount();
        observer.unobserve(counter);
      }
    });
    
    observer.observe(counter);
  });
}

// Call counter animation
animateCounters();

// ===== TYPEWRITER HERO TEXT =====
const typedTextEl = document.getElementById('typed-text');
const typedPhrases = [
  'UI/UX Designer',
  'Web Developer',
  'Mobile App Creator',
  'Game Developer',
  'Creative Problem Solver'
];
let typedIndex = 0;
let charIndex = 0;
let typingForward = true;

function updateTypedText() {
  if (!typedTextEl) return;

  const currentPhrase = typedPhrases[typedIndex];
  if (typingForward) {
    charIndex++;
    typedTextEl.textContent = currentPhrase.slice(0, charIndex);
    if (charIndex === currentPhrase.length) {
      typingForward = false;
      setTimeout(updateTypedText, 900);
      return;
    }
  } else {
    charIndex--;
    typedTextEl.textContent = currentPhrase.slice(0, charIndex);
    if (charIndex === 0) {
      typingForward = true;
      typedIndex = (typedIndex + 1) % typedPhrases.length;
      setTimeout(updateTypedText, 200);
      return;
    }
  }

  setTimeout(updateTypedText, typingForward ? 100 : 60);
}

updateTypedText();

// ===== THEME TOGGLE =====
const themeToggleButton = document.querySelector('.theme-toggle');
const storedTheme = localStorage.getItem('portfolio-theme');

function applyTheme(theme) {
  document.body.classList.toggle('dark-theme', theme === 'dark');
  if (themeToggleButton) {
    themeToggleButton.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }
}

if (storedTheme) {
  applyTheme(storedTheme);
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
}

if (themeToggleButton) {
  themeToggleButton.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  });
}

// ===== SCROLL TO TOP BUTTON =====
const scrollBtn = document.querySelector('.scroll-to-top');
window.addEventListener('scroll', () => {
  if (!scrollBtn) return;
  if (window.scrollY > 400) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
});

if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== SKILL PROGRESS ANIMATION =====
const progressObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progress = entry.target;
      const value = progress.dataset.skill;
      progress.style.setProperty('--progress', `${value}%`);
      progressObserver.unobserve(progress);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-progress').forEach(el => {
  progressObserver.observe(el);
});

// ===== PARTICLE BACKGROUND =====
function initParticleBackground() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  const maxParticles = 90;

  const resize = () => {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  };

  const createParticle = () => {
    const size = 1 + Math.random() * 2.5;
    return {
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.2 - Math.random() * 0.2,
      radius: size,
      alpha: 0.2 + Math.random() * 0.5,
      da: (Math.random() - 0.5) * 0.005
    };
  };

  const initParticles = () => {
    particles = Array.from({ length: maxParticles }, createParticle);
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha = Math.min(0.8, Math.max(0.1, p.alpha + p.da));

      if (p.y < -10) {
        p.y = canvas.offsetHeight + 10;
        p.x = Math.random() * canvas.offsetWidth;
      }
      if (p.x < -20) p.x = canvas.offsetWidth + 20;
      if (p.x > canvas.offsetWidth + 20) p.x = -20;

      ctx.beginPath();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = '#ffffff';
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  };

  const animate = () => {
    draw();
    requestAnimationFrame(animate);
  };

  const onResize = () => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    resize();
    initParticles();
  };

  window.addEventListener('resize', onResize);
  onResize();
  animate();
}

initParticleBackground();

// Fallback: show all hidden elements after 5 seconds if not animated
setTimeout(() => {
  document.querySelectorAll('.animate-init:not(.animate-in)').forEach(el => {
    el.classList.add('animate-in');
  });
}, 5000);

console.log('Portfolio loaded successfully! 🚀');
