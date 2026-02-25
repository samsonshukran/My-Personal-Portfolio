// App initialization
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMobileMenu();
    initSectionVisibility();
    initDownloadCV();
    initContactForm();
    loadContentFromJSON();
});

// Navigation handling
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            
            // Update active class on nav links
            document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(l => {
                l.classList.remove('active');
            });
            link.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
            
            // Close mobile menu if open
            const mobileNav = document.getElementById('mobileNav');
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
            }
            
            // Update URL hash without scrolling
            history.pushState(null, null, `#${targetId}`);
        });
    });
    
    // Handle initial hash
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetLink = document.querySelector(`[href="#${targetId}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
}

// Mobile menu handling
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            
            // Toggle icon
            const icon = menuToggle.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target) && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Section visibility animation
function initSectionVisibility() {
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Download CV functionality
function initDownloadCV() {
    const downloadBtn = document.getElementById('downloadCvBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Generate CV content from JSON data
            const cvContent = generateCVContent();
            
            // Create blob and download
            const blob = new Blob([cvContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Samkran_Yusuf_Kalume_CV.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        });
    }
}

// Generate CV content from data
function generateCVContent() {
    // This would normally pull from the JSON file
    // For now, we'll return a simple formatted CV
    return `
SAMKRAN (YUSUF SAMSON KALUME)
Environmental Health Professional | Public Health Practitioner | Digital Innovator
Kilifi County, Kenya
Email: example@gmail.com | Phone: +2547******** | GitHub: https://github.com/samsonshukran

PROFESSIONAL PROFILE
Environmental Health student at Kenyatta University with hands-on experience in sanitation inspection, 
vaccination campaigns, disease prevention, and environmental conservation. Currently serving as a 
Public Health Officer Intern at Mtondia Dispensary in Kilifi County.

PROFESSIONAL EXPERIENCE
Public Health Officer Intern | Mtondia Dispensary | 2025–Present
- Conduct environmental sanitation and hygiene inspections
- Monitor food safety compliance in food premises
- Participate in measles and typhoid vaccination campaigns
- Conduct school hygiene training and inspections
- Support disease surveillance and reporting

Coast Region Coordinator | NABU Organization | 2023–2024
- Coordinated tree planting activities
- Managed nursery bed seedling projects
- Led environmental awareness campaigns
- Mobilized youth and community groups

EDUCATION
BSc Environmental Health | Kenyatta University | 2023–Present
KCSE | Chavakali High School | 2019–2022
KCPE | Dzikunze Primary School | 2014–2018

CERTIFICATIONS
- NABU Champion Leadership Certificate (2023)
- Computer Literacy – Institute of Advanced Technology (2023)
- Certificate in Virtual Assistance – Adept Technologies Ltd
- EFAC Bridge to Success (B2S) Leadership Program

LANGUAGES
English: Fluent | Kiswahili: Fluent | Arabic: Beginner

SKILLS
Environmental Health Inspection, Disease Surveillance, Public Health Education, 
Food Safety Compliance, Risk Assessment, Community Mobilization, 
Web Development (HTML, CSS, JS), PWA Implementation, GitHub
`;
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Load content from JSON (for future dynamic content)
function loadContentFromJSON() {
    fetch('/data/portfolio-data.json')
        .then(response => response.json())
        .then(data => {
            console.log('Portfolio data loaded:', data);
            // Future: dynamically populate sections with JSON data
        })
        .catch(error => {
            console.log('Using static content (JSON not available)');
        });
}

// Service worker update handling
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New version available
                    if (confirm('New version available! Reload to update?')) {
                        window.location.reload();
                    }
                }
            });
        });
    });
}

// Handle offline/online events
window.addEventListener('online', () => {
    console.log('Back online');
    document.body.classList.remove('offline');
});

window.addEventListener('offline', () => {
    console.log('Offline mode');
    document.body.classList.add('offline');
});

// Check initial online status
if (!navigator.onLine) {
    document.body.classList.add('offline');
}