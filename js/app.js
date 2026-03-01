// ============================================
// APP.JS - Samkran Portfolio PWA v2.0.2
// Optimized for GitHub Pages deployment
// ============================================

// Set base path for GitHub Pages (global)
window.BASE_PATH = '/My-Personal-Portfolio';

// App initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Samkran Portfolio initializing...');
    
    // Initialize all modules
    initNavigation();
    initMobileMenu();
    initSectionVisibility();
    initDownloadCV();
    initContactForm();
    loadContentFromJSON();
    initThemeColor();
    initSmoothScrolling();
    
    console.log('✅ App initialized successfully');
});

// ============================================
// NAVIGATION HANDLING
// ============================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Handle navigation clicks
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
                    // Trigger animation
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }, 50);
                }
            });
            
            // Close mobile menu if open
            closeMobileMenu();
            
            // Update URL hash without scrolling
            history.pushState(null, null, `#${targetId}`);
            
            // Update page title for better UX
            updatePageTitle(targetId);
        });
    });
    
    // Handle initial hash
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetLink = document.querySelector(`[href="#${targetId}"]`);
        if (targetLink) {
            setTimeout(() => targetLink.click(), 100);
        }
    } else {
        // Default to home
        const homeLink = document.querySelector('[href="#home"]');
        if (homeLink) homeLink.classList.add('active');
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const targetId = window.location.hash.substring(1) || 'home';
        const targetLink = document.querySelector(`[href="#${targetId}"]`);
        if (targetLink) targetLink.click();
    });
}

// Update page title based on section
function updatePageTitle(sectionId) {
    const titles = {
        home: 'Samkran | Home',
        academics: 'Samkran | Academics',
        profession: 'Samkran | Profession',
        hobbies: 'Samkran | Hobbies',
        impact: 'Samkran | Impact',
        contact: 'Samkran | Contact'
    };
    document.title = titles[sectionId] || 'Samkran | Yusuf Samson Kalume';
}

// ============================================
// MOBILE MENU HANDLING
// ============================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (!menuToggle || !mobileNav) return;
    
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close mobile menu when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuToggle = document.getElementById('menuToggle');
    const icon = menuToggle.querySelector('i');
    
    mobileNav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    if (mobileNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuToggle = document.getElementById('menuToggle');
    
    if (!mobileNav || !menuToggle) return;
    
    mobileNav.classList.remove('active');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
    
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
}

// ============================================
// SECTION VISIBILITY ANIMATION
// ============================================
function initSectionVisibility() {
    const sections = document.querySelectorAll('.section');
    
    // Set initial state
    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add a class for entrance animation
                entry.target.classList.add('section-visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// DOWNLOAD CV FUNCTIONALITY
// ============================================
function initDownloadCV() {
    const downloadBtn = document.getElementById('downloadCvBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            try {
                // Show loading state
                const originalText = downloadBtn.innerHTML;
                downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating CV...';
                downloadBtn.disabled = true;
                
                // Generate CV content
                const cvContent = await generateCVContent();
                
                // Create blob and download
                const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Samkran_Yusuf_Kalume_CV_${new Date().toISOString().split('T')[0]}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                
                // Show success message
                showNotification('CV downloaded successfully!', 'success');
                
                // Restore button
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
            } catch (error) {
                console.error('CV download failed:', error);
                showNotification('Failed to generate CV. Please try again.', 'error');
                downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download CV';
                downloadBtn.disabled = false;
            }
        });
    }
}

// ============================================
// GENERATE CV CONTENT (using static content)
// ============================================
async function generateCVContent() {
    // Try to use static content if available
    const content = window.portfolioContent || await getStaticContent();
    
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    return `
SAMKRAN (YUSUF SAMSON KALUME)
================================
Environmental Health Professional | Public Health Practitioner | Digital Innovator
Kilifi County, Kenya
Email: samsonkalume833@gmail.com | Phone: +254713819739
GitHub: https://github.com/samsonshukran
Portfolio: https://samsonshukran.github.io/My-Personal-Portfolio/

PROFESSIONAL PROFILE
================================
Environmental Health student at Kenyatta University with hands-on experience in 
sanitation inspection, vaccination campaigns, disease prevention, and environmental 
conservation. Currently serving as a Public Health Officer Intern at Mtondia Dispensary 
in Kilifi County.

PROFESSIONAL EXPERIENCE
================================
Public Health Officer Intern | Mtondia Dispensary | 2025–Present
• Conduct environmental sanitation and hygiene inspections
• Monitor food safety compliance in food premises
• Participate in measles and typhoid vaccination campaigns
• Conduct school hygiene training and inspections
• Support disease surveillance and reporting
• Inspected 20+ food premises for compliance

Industrial Attachment | Mtondia Dispensary | May–Aug 2025
• Assisted environmental health inspections
• Supported community health outreach
• Participated in data collection and reporting
• Conducted community diagnosis in Bofa village
• Participated in Mpox contact tracing

Coast Region Coordinator | NABU Organization | 2023–2024
• Coordinated tree planting activities (200+ trees)
• Managed nursery bed seedling projects
• Led environmental awareness campaigns
• Mobilized youth and community groups
• Engaged 10+ schools in environmental education

EDUCATION
================================
BSc Environmental Health          | Kenyatta University          | 2023–Present
KCSE                              | Chavakali High School        | 2019–2022
KCPE                              | Dzikunze Primary School      | 2014–2018

CERTIFICATIONS
================================
• NABU Champion Leadership Certificate (2023)
• Computer Literacy – Institute of Advanced Technology (2023)
• Certificate in Virtual Assistance – Adept Technologies Ltd
• EFAC Bridge to Success (B2S) Leadership Program

LANGUAGES
================================
• English:  Fluent (95%)
• Kiswahili: Fluent (95%)
• Arabic:   Beginner (30%)

SKILLS
================================
• Environmental Health Inspection    • Disease Surveillance
• Public Health Education            • Food Safety Compliance
• Risk Assessment                    • Community Mobilization
• Web Development (HTML, CSS, JS)    • PWA Implementation
• Data Entry & Analysis              • Microsoft Office Suite
• Project Management                 • Report Writing

ACHIEVEMENTS
================================
• Inspected 20+ food premises including Naivas supermarkets
• Trained 500+ students on hygiene practices
• Supported immunization of 1000+ community members
• Coordinated planting of 200+ trees
• Participated in 3 nationwide vaccination campaigns

REFERENCES
================================
Available upon request.

Generated: ${currentDate}
    `;
}

// Get static content from fallback
async function getStaticContent() {
    // Try to load the static content file
    try {
        const response = await fetch(`${window.BASE_PATH}/js/static-content.js`);
        if (response.ok) {
            // This will execute the script and make portfolioContent available
            await eval(await response.text());
        }
    } catch (error) {
        console.log('Using default static content');
    }
    return window.portfolioContent || null;
}

// ============================================
// CONTACT FORM HANDLING
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Validate form
            if (!validateForm(data)) return;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Check if online
                if (navigator.onLine) {
                    // Simulate API call (replace with actual endpoint)
                    await simulateApiCall(data);
                    showNotification('Thank you! Your message has been sent.', 'success');
                    contactForm.reset();
                } else {
                    // Store for later sync
                    await storeOfflineMessage(data);
                    showNotification('You are offline. Message saved for later.', 'info');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Form validation
function validateForm(data) {
    if (!data.name || data.name.trim().length < 2) {
        showNotification('Please enter a valid name (minimum 2 characters)', 'error');
        return false;
    }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    if (!data.message || data.message.trim().length < 10) {
        showNotification('Please enter a message (minimum 10 characters)', 'error');
        return false;
    }
    return true;
}

// Simulate API call
function simulateApiCall(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form submitted:', data);
            resolve();
        }, 1500);
    });
}

// Store offline messages in localStorage
async function storeOfflineMessage(data) {
    const offlineMessages = JSON.parse(localStorage.getItem('offlineMessages') || '[]');
    offlineMessages.push({
        ...data,
        timestamp: new Date().toISOString(),
        id: Date.now()
    });
    localStorage.setItem('offlineMessages', JSON.stringify(offlineMessages));
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#00e5ff'};
        color: ${type === 'info' ? '#0a0c14' : '#ffffff'};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ============================================
// THEME COLOR MANAGEMENT
// ============================================
function initThemeColor() {
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    
    window.addEventListener('scroll', () => {
        if (!metaTheme) return;
        
        if (window.scrollY > 300) {
            metaTheme.setAttribute('content', '#0a0c14');
        } else {
            metaTheme.setAttribute('content', '#00e5ff');
        }
    });
}

// ============================================
// LOAD CONTENT FROM JSON
// ============================================
async function loadContentFromJSON() {
    try {
        // Try to load from JSON file (adjust path for GitHub Pages)
        const response = await fetch(`${window.BASE_PATH}/data/portfolio-data.json`);
        if (response.ok) {
            const data = await response.json();
            console.log('📊 Portfolio data loaded from JSON:', data);
            window.portfolioData = data;
        } else {
            console.log('📋 Using static content (JSON not available)');
        }
    } catch (error) {
        console.log('📋 Using static content fallback');
    }
}

// ============================================
// OFFLINE/ONLINE HANDLING
// ============================================
window.addEventListener('online', () => {
    console.log('🌐 Back online');
    document.body.classList.remove('offline');
    showNotification('Back online!', 'success');
    
    // Try to send offline messages
    sendOfflineMessages();
});

window.addEventListener('offline', () => {
    console.log('📴 Offline mode');
    document.body.classList.add('offline');
    showNotification('You are offline. Some features may be limited.', 'info');
});

// Check initial online status
if (!navigator.onLine) {
    document.body.classList.add('offline');
}

// Send offline messages when back online
async function sendOfflineMessages() {
    const offlineMessages = JSON.parse(localStorage.getItem('offlineMessages') || '[]');
    if (offlineMessages.length === 0) return;
    
    console.log(`Sending ${offlineMessages.length} offline messages...`);
    
    for (const message of offlineMessages) {
        try {
            // Simulate sending (replace with actual API)
            await simulateApiCall(message);
            // Remove after successful send
            const updated = offlineMessages.filter(m => m.id !== message.id);
            localStorage.setItem('offlineMessages', JSON.stringify(updated));
        } catch (error) {
            console.log('Failed to send offline message:', error);
        }
    }
    
    if (offlineMessages.length > 0) {
        showNotification(`${offlineMessages.length} offline message(s) sent!`, 'success');
    }
}

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================
// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.loading = 'lazy';
    });
}

// Prefetch next section on hover
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        const sectionId = link.getAttribute('href').substring(1);
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = `#${sectionId}`;
        document.head.appendChild(prefetchLink);
    });
});

// ============================================
// EXPORT FOR MODULE USE (if needed)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initMobileMenu,
        initSectionVisibility,
        initDownloadCV,
        initContactForm,
        showNotification
    };
}

console.log('📱 App.js loaded successfully');