// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark theme
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-theme');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
});

// Typewriter Effect for Hero Section
const phrases = [
    'Creative Developer',
    'Content Creator',
    'AI Enthusiast',
    'Problem Solver',
    'Tech Innovator'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterSpeed = 100;

const typewriterElement = document.getElementById('typewriter');

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        // Remove characters
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typewriterSpeed = 50;
    } else {
        // Add characters
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typewriterSpeed = 100;
    }

    // Check if phrase is complete
    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of phrase
        typewriterSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typewriterSpeed = 500;
    }

    setTimeout(typeWriter, typewriterSpeed);
}

// Start typewriter effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
});

// Smooth Scrolling for Navigation Links
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

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe all elements with data-scroll attribute
document.querySelectorAll('[data-scroll]').forEach(element => {
    observer.observe(element);
});

// Project Modal Functionality
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.querySelector('.modal-overlay');

// Project data
const projectsData = {
    1: {
        title: 'Image Processing & Automation Using Gen-AI',
        description: 'An AI-powered document assistant that revolutionizes how we interact with image-based documents.',
        fullDescription: 'Built a comprehensive AI-powered document assistant that extracts, summarizes, translates, and reads text from images using advanced OCR and Generative AI technologies. The system combines multiple AI models to provide a seamless user experience for document processing.',
        features: [
            'Text extraction from images using OCR (Tesseract and TrOCR)',
            'Intelligent text summarization using BART/T5 transformers',
            'Multi-language translation powered by Google Translate API',
            'Text-to-speech conversion with natural-sounding voices',
            'Voice command recognition for hands-free operation',
            'User-friendly interface built with Flask and Tkinter',
            'Containerized deployment using Docker'
        ],
        technologies: [
            'Python',
            'OpenCV',
            'Tesseract OCR',
            'TrOCR',
            'Hugging Face Transformers',
            'BART/T5',
            'Google Gemini API',
            'gTTS',
            'Google Translate API',
            'SpeechRecognition',
            'Flask',
            'Tkinter',
            'Docker'
        ],
        impact: 'This project demonstrates the power of combining multiple AI technologies to solve real-world document processing challenges. It significantly reduces the time needed for document analysis and makes information more accessible across language barriers.'
    },
    2: {
        title: 'Property Tracker - 99Prop',
        description: 'A comprehensive property management web application for modern real estate needs.',
        fullDescription: 'Designed and developed a full-featured property management web application that enables users to efficiently list, view, and track real estate properties. The application features a clean, professional design with an intuitive user interface.',
        features: [
            'Property listing management system',
            'Advanced search and filtering capabilities',
            'Responsive design for all devices',
            'Interactive property cards with detailed information',
            'Property image gallery with lightbox view',
            'Location mapping integration',
            'User-friendly dashboard',
            'Custom CSS animations and transitions'
        ],
        technologies: [
            'HTML5',
            'CSS3',
            'JavaScript',
            'Responsive Design',
            'CSS Grid & Flexbox',
            'Local Storage API',
            'DOM Manipulation'
        ],
        impact: 'This project showcases modern web development practices and provides a practical solution for property management. The responsive design ensures accessibility across all devices, while the intuitive interface makes property tracking effortless.'
    },
    3: {
        title: 'Portfolio Website',
        description: 'A unique, visually striking personal portfolio website with modern design principles.',
        fullDescription: 'Created a custom portfolio website featuring glassmorphism design, smooth animations, and a unique color palette. The site showcases projects, skills, and professional journey in an engaging and interactive manner.',
        features: [
            'Glassmorphism card design with backdrop blur',
            'Animated gradient background with floating shapes',
            'Typewriter effect for dynamic text display',
            'Smooth scroll animations and transitions',
            'Interactive project modal system',
            'Dark/Light theme toggle',
            'Responsive design for all screen sizes',
            'Custom contact form with validation',
            'Timeline visualization of career journey'
        ],
        technologies: [
            'HTML5',
            'CSS3',
            'Vanilla JavaScript',
            'CSS Variables',
            'Intersection Observer API',
            'Local Storage',
            'CSS Animations',
            'Flexbox & Grid'
        ],
        impact: 'This portfolio demonstrates advanced CSS techniques and JavaScript functionality without relying on frameworks. It provides a memorable user experience while effectively showcasing technical skills and projects.'
    }
};

// Open modal with project details
document.querySelectorAll('.view-details-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const projectCard = e.target.closest('.project-card');
        const projectId = projectCard.getAttribute('data-project');
        const project = projectsData[projectId];

        if (project) {
            modalBody.innerHTML = `
                <h2>${project.title}</h2>
                <p><strong>${project.description}</strong></p>

                <h3>Overview</h3>
                <p>${project.fullDescription}</p>

                <h3>Key Features</h3>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>

                <h3>Technologies Used</h3>
                <div class="tech-stack">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>

                <h3>Impact</h3>
                <p>${project.impact}</p>
            `;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Contact Form Validation and Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
    });

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // Validate name
    if (name.length < 2) {
        showError('nameError', 'Name must be at least 2 characters long');
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate subject
    if (subject.length < 3) {
        showError('subjectError', 'Subject must be at least 3 characters long');
        isValid = false;
    }

    // Validate message
    if (message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters long');
        isValid = false;
    }

    if (isValid) {
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.classList.add('loading');

        // Simulate form submission (in real scenario, this would send to a server)
        setTimeout(() => {
            // Create mailto link
            const mailtoLink = `mailto:kishankpr2021@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            window.location.href = mailtoLink;

            // Reset form
            contactForm.reset();
            submitBtn.classList.remove('loading');

            // Show success message
            alert('Thank you for your message! Your email client will open to send the message.');
        }, 1500);
    }
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Parallax effect for floating shapes
let scrollY = 0;

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;

    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// Add hover effect to skill chips
document.querySelectorAll('.skill-chip').forEach(chip => {
    chip.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });

    chip.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll animations
const optimizedScroll = debounce(() => {
    // Additional scroll-based animations can be added here
}, 50);

window.addEventListener('scroll', optimizedScroll);

// Preload images for better performance
function preloadImages() {
    const images = ['/public/My photo.jpg'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// Add active state to navigation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll(`a[href="#${sectionId}"]`).forEach(link => {
                link.classList.add('active');
            });
        } else {
            document.querySelectorAll(`a[href="#${sectionId}"]`).forEach(link => {
                link.classList.remove('active');
            });
        }
    });
});

// Console message for developers
console.log('%cHey there! 👋', 'color: #5A31F4; font-size: 24px; font-weight: bold;');
console.log('%cInterested in how this was built? Feel free to reach out!', 'color: #00D4FF; font-size: 14px;');
console.log('%cEmail: kishankpr2021@gmail.com', 'color: #FFB800; font-size: 12px;');
