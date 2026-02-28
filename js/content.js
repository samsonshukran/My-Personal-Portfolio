// ============================================
// STATIC CONTENT FALLBACK - Samkran Portfolio v2.0
// Used when JSON fails to load - Optimized for GitHub Pages
// ============================================

const portfolioContent = {
    // ===== PROFILE INFORMATION =====
    profile: {
        faithName: 'Yusuf',
        brandName: 'SAMKRAN',
        legalName: 'Samson Kalume',
        fullName: 'Yusuf "Samkran" Kalume',
        title: 'Environmental Health Professional | Public Health Practitioner | Digital Innovator',
        shortTitle: 'Environmental Health Professional',
        location: 'Kilifi County, Kenya',
        email: 'samsonkalume833@gmail.com',
        phone: '+254713819739',
        github: 'https://github.com/samsonshukran',
        githubUsername: 'samsonshukran',
        portfolioUrl: 'https://samsonshukran.github.io/My-Personal-Portfolio/',
        
        // Hero section summary
        summary: 'Environmental Health student at Kenyatta University with hands-on experience in sanitation inspection, vaccination campaigns, disease prevention, and environmental conservation. Currently serving as a Public Health Officer Intern at Mtondia Dispensary in Kilifi County. Passionate about community health, sustainability, and digital innovation.',
        
        // Quick facts for hero stats
        quickStats: {
            projects: '7+',
            experience: '2+ years',
            response: '24h',
            campaigns: '3'
        }
    },

    // ===== ABOUT SECTION =====
    about: {
        summary: 'Environmental Health student at Kenyatta University with hands-on experience in sanitation inspection, vaccination campaigns, disease prevention, and environmental conservation. Currently serving as a Public Health Officer Intern at Mtondia Dispensary in Kilifi County.',
        
        // Professional summary bullet points
        highlights: [
            'Public Health Officer Intern at Mtondia Dispensary',
            'Participant in nationwide measles vaccination campaign',
            'Participant in nationwide typhoid vaccination campaign',
            'Conducted school hygiene and sanitation inspections',
            'Coast Region Coordinator at NABU Organization',
            'Tree planting and nursery seedling management'
        ],
        
        // Languages with proficiency
        languages: [
            { name: 'English', level: 'Fluent', percentage: 95, description: 'Professional working proficiency' },
            { name: 'Kiswahili', level: 'Fluent', percentage: 95, description: 'Native speaker' },
            { name: 'Arabic', level: 'Beginner', percentage: 30, description: 'Basic communication' }
        ],
        
        // Core professional values
        values: ['Community Health', 'Sustainability', 'Leadership', 'Innovation', 'Discipline', 'Integrity'],
        
        // Education background
        education: [
            {
                degree: 'BSc Environmental Health',
                institution: 'Kenyatta University',
                period: '2023 – Present',
                details: 'Reg No: Q32/6226/2023',
                description: 'Focus on environmental health, sanitation, and public health policy'
            },
            {
                degree: 'KCSE',
                institution: 'Chavakali High School',
                period: '2019 – 2022',
                details: 'Kenya Certificate of Secondary Education',
                description: 'Science-focused curriculum with biology and chemistry'
            },
            {
                degree: 'KCPE',
                institution: 'Dzikunze Primary School',
                period: '2014 – 2018',
                details: 'Kenya Certificate of Primary Education'
            }
        ]
    },

    // ===== PROFESSIONAL EXPERIENCE =====
    experience: [
        {
            title: 'Public Health Officer Intern',
            organization: 'Mtondia Dispensary – Kilifi County',
            organization_short: 'Mtondia Dispensary',
            location: 'Kilifi County, Kenya',
            date: '2025 – Present',
            date_range: {
                start: '2025-01',
                end: null,
                current: true
            },
            responsibilities: [
                'Conduct environmental sanitation and hygiene inspections',
                'Monitor food safety compliance in food premises',
                'Participate in measles vaccination campaigns',
                'Participate in typhoid vaccination campaigns',
                'Conduct school hygiene training and inspections',
                'Support disease surveillance and reporting'
            ],
            achievements: [
                'Inspected 20+ food premises for compliance',
                'Trained 500+ students on hygiene practices',
                'Supported immunization of 1000+ community members'
            ]
        },
        {
            title: 'Industrial Attachment',
            organization: 'Mtondia Dispensary – Kilifi County',
            organization_short: 'Mtondia Dispensary',
            location: 'Kilifi County, Kenya',
            date: 'May – Aug 2025',
            date_range: {
                start: '2025-05',
                end: '2025-08',
                current: false
            },
            responsibilities: [
                'Assisted environmental health inspections',
                'Supported community health outreach',
                'Participated in data collection and reporting',
                'Conducted community diagnosis in Bofa village',
                'Participated in Mpox contact tracing'
            ]
        },
        {
            title: 'Coast Region Coordinator',
            organization: 'NABU Organization',
            organization_short: 'NABU',
            location: 'Coast Region, Kenya',
            date: '2023 – 2024',
            date_range: {
                start: '2023-01',
                end: '2024-12',
                current: false
            },
            responsibilities: [
                'Coordinated tree planting activities',
                'Managed nursery bed seedling projects',
                'Led environmental awareness campaigns',
                'Mobilized youth and community groups',
                'Strengthened stakeholder partnerships'
            ],
            achievements: [
                'Coordinated planting of 200+ trees',
                'Engaged 10+ schools in environmental education',
                'Trained 50+ youth volunteers'
            ]
        },
        {
            title: 'Vaccination Campaign Participant',
            organization: 'Nationwide Campaigns',
            organization_short: 'Ministry of Health',
            location: 'Kilifi County, Kenya',
            date: '2025',
            date_range: {
                start: '2025-01',
                end: '2025-12',
                current: false
            },
            responsibilities: [
                'Measles vaccination campaign',
                'Typhoid vaccination campaign',
                'HPV vaccination support',
                'School-based immunization outreach'
            ]
        }
    ],

    // ===== PROJECTS SHOWCASE =====
    projects: [
        {
            name: 'Samkran Digital Platform',
            slug: 'samkran-digital-platform',
            description: 'Progressive Web App with offline capabilities, structured content management, and Islamic green & gold UI design.',
            shortDescription: 'Personal portfolio PWA with offline support',
            features: [
                'PWA implementation with service workers',
                'Offline caching strategy',
                'JSON-based structured data system',
                'Educational content management',
                'GitHub version control'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'PWA', 'Service Workers'],
            link: 'https://github.com/samsonshukran',
            github: 'https://github.com/samsonshukran/My-Personal-Portfolio',
            icon: 'mobile-alt',
            status: 'live',
            year: 2025
        },
        {
            name: 'Public Health Campaigns',
            slug: 'public-health-campaigns',
            description: 'Active participation in nationwide vaccination and health promotion initiatives.',
            shortDescription: 'Community health outreach and immunization',
            features: [
                'Measles vaccination campaign',
                'Typhoid vaccination campaign',
                'HPV vaccination support',
                'School sanitation education',
                'Community disease awareness'
            ],
            technologies: ['Public Health', 'Immunization', 'Community Outreach'],
            icon: 'syringe',
            status: 'ongoing',
            year: 2025
        },
        {
            name: 'Food Safety & Inspection',
            slug: 'food-safety-inspection',
            description: 'Comprehensive food premise inspections and hygiene compliance monitoring.',
            shortDescription: 'Food safety and hygiene inspections',
            features: [
                'Supermarket inspections (Naivas)',
                'Hotel and restaurant inspections',
                'Food handler certification',
                'Meat inspection at slaughterhouse',
                'Food sampling and analysis'
            ],
            technologies: ['Food Safety', 'HACCP', 'Public Health Law'],
            icon: 'utensils',
            status: 'ongoing',
            year: 2025
        },
        {
            name: 'Environmental Conservation',
            slug: 'environmental-conservation',
            description: 'Tree planting initiatives and environmental awareness programs.',
            shortDescription: 'Environmental conservation and awareness',
            features: [
                'Tree planting campaigns',
                'Nursery bed seedling management',
                'Community environmental training',
                'Waste management advocacy'
            ],
            technologies: ['Environmental Science', 'Conservation', 'Community Mobilization'],
            icon: 'tree',
            status: 'completed',
            year: 2024
        }
    ],

    // ===== IMPACT STATISTICS =====
    stats: {
        schoolsInspected: '10+',
        studentsTrained: '500+',
        vaccinationCampaigns: '3',
        treesPlanted: '200+',
        foodPremises: '20+',
        communitiesReached: '5+'
    },

    // ===== IMPACT DETAILS BY CATEGORY =====
    impact: {
        publicHealth: [
            'Improved hygiene awareness in schools',
            'Supported immunization coverage expansion',
            'Promoted disease prevention practices',
            'Conducted community health needs assessment',
            'Participated in Mpox contact tracing',
            'Health education sessions for 500+ students'
        ],
        environmental: [
            'Tree planting initiatives with 200+ trees',
            'Seedling propagation programs',
            'Environmental education campaigns',
            'Waste management promotion',
            'Biodiversity awareness in schools'
        ],
        foodSafety: [
            'Inspected 20+ food premises including Naivas',
            'Food handler certification oversight',
            'Meat inspection at slaughterhouse',
            'Food sampling for laboratory analysis',
            'Hygiene compliance monitoring'
        ]
    },

    // ===== CERTIFICATIONS & TRAINING =====
    certifications: [
        {
            name: 'NABU Champion Leadership',
            issuer: 'NABU Organization',
            year: 2023,
            description: 'Leadership and community mobilization training'
        },
        {
            name: 'Computer Literacy',
            issuer: 'Institute of Advanced Technology (IAT)',
            year: 2023,
            description: 'Comprehensive computer skills including MS Office'
        },
        {
            name: 'Virtual Assistance Certificate',
            issuer: 'Adept Technologies Ltd',
            year: 2023,
            description: 'Professional virtual assistance and administrative support'
        },
        {
            name: 'EFAC B2S Leadership Program',
            issuer: 'EFAC',
            year: 2023,
            description: 'Bridge to Success leadership development'
        }
    ],


    // ===== HOBBIES & INTERESTS =====
// Structured to support category-based UI rendering
hobbies: {
    description: 'Personal interests aligned with professional growth, innovation, and faith-based development.',

    categories: [
        {
            id: 'professional',
            title: 'Professional Interests',
            icon: 'briefcase',
            summary: 'Activities that strengthen public health and environmental expertise.',
            items: [
                {
                    name: 'Community Volunteering',
                    icon: 'hands-helping',
                    description: 'Participating in health outreach programs, school hygiene education, and disease prevention initiatives.',
                    impact: 'Supported hygiene education for 500+ students',
                    tags: ['Vaccination', 'Outreach', 'Public Health']
                },
                {
                    name: 'Environmental Conservation',
                    icon: 'tree',
                    description: 'Tree planting initiatives, nursery bed management, and sustainability advocacy.',
                    impact: 'Coordinated 200+ trees planted',
                    tags: ['Sustainability', 'NABU', 'Climate Action']
                },
                {
                    name: 'Health Research & Reading',
                    icon: 'book-medical',
                    description: 'Reading public health journals, environmental policy reports, and disease surveillance publications.',
                    focusAreas: ['Epidemiology', 'Food Safety', 'Environmental Policy']
                }
            ]
        },

        {
            id: 'technology',
            title: 'Technology & Innovation',
            icon: 'microchip',
            summary: 'Digital skills and strategic thinking development.',
            items: [
                {
                    name: 'Web Development',
                    icon: 'laptop-code',
                    description: 'Building Progressive Web Apps with offline support and structured JSON content systems.',
                    stack: ['HTML5', 'CSS3', 'JavaScript', 'PWA'],
                    projectsLinked: ['Samkran Digital Platform']
                },
                {
                    name: 'Strategic Chess',
                    icon: 'chess-king',
                    description: 'Daily chess puzzles and competitive play to enhance analytical thinking and planning.',
                    skillsDeveloped: ['Decision Making', 'Critical Thinking', 'Risk Assessment']
                },
                {
                    name: 'Tech Exploration',
                    icon: 'code',
                    description: 'Exploring GitHub workflows, version control systems, and deployment optimization for GitHub Pages.'
                }
            ]
        },

        {
            id: 'faith-growth',
            title: 'Faith & Personal Growth',
            icon: 'heart',
            summary: 'Spiritual growth and mentorship-driven development.',
            items: [
                {
                    name: 'Islamic Learning',
                    icon: 'mosque',
                    description: 'Studying Quranic teachings, Arabic basics, and Islamic values for disciplined living.',
                    learningFocus: ['Quran', 'Arabic', 'Reflection']
                },
                {
                    name: 'Youth Mentorship',
                    icon: 'users',
                    description: 'Mentoring students, supporting literacy programs, and empowering youth leadership.',
                    communityImpact: 'Guided multiple student groups in hygiene and leadership'
                },
                {
                    name: 'Fitness & Outdoor Activities',
                    icon: 'walking',
                    description: 'Walking, light workouts, and outdoor exploration for mental and physical balance.',
                    healthFocus: ['Wellness', 'Balance', 'Consistency']
                }
            ]
        }
    ]
},

    // ===== CONTACT INFORMATION =====
    contact: {
        email: 'samsonkalume833@gmail.com',
        phone: '+254713819739',
        phone_formatted: '+254 713 819 739',
        location: 'Kilifi County, Kenya',
        currentResidence: 'Nairobi, Kenya',
        github: 'https://github.com/samsonshukran',
        githubDisplay: 'github.com/samsonshukran',
        social: {
            github: 'https://github.com/samsonshukran',
            linkedin: '#',
            twitter: '#',
            upwork: '#'
        }
    },

    // ===== SITE CONFIGURATION =====
    site: {
        title: 'Samkran | Yusuf Samson Kalume',
        description: 'Environmental Health Professional, Public Health Officer Intern, and Digital Innovator',
        baseUrl: 'https://samsonshukran.github.io/My-Personal-Portfolio/',
        repoName: 'My-Personal-Portfolio',
        githubPages: true,
        version: '2.0.0',
        lastUpdated: '2025-02-28',
        theme: {
            primary: '#00e5ff',
            secondary: '#2ecc71',
            dark: '#0a0c14'
        }
    },

    // ===== METADATA FOR SEO =====
    metadata: {
        keywords: [
            'Environmental Health',
            'Public Health',
            'Kilifi',
            'Kenya',
            'Samkran',
            'Yusuf Samson Kalume',
            'Vaccination',
            'Sanitation',
            'PWA',
            'Portfolio'
        ],
        categories: ['portfolio', 'professional', 'public health', 'environmental health'],
        language: 'en',
        direction: 'ltr'
    }
};

// ===== HELPER FUNCTIONS =====

/**
 * Get experience by title or organization
 * @param {string} search - Search term
 * @returns {Array} Matching experiences
 */
portfolioContent.getExperience = function(search) {
    return this.experience.filter(exp => 
        exp.title.toLowerCase().includes(search.toLowerCase()) ||
        exp.organization.toLowerCase().includes(search.toLowerCase())
    );
};

/**
 * Get project by name or technology
 * @param {string} search - Search term
 * @returns {Array} Matching projects
 */
portfolioContent.getProjects = function(search) {
    return this.projects.filter(proj => 
        proj.name.toLowerCase().includes(search.toLowerCase()) ||
        proj.technologies.some(tech => tech.toLowerCase().includes(search.toLowerCase()))
    );
};

/**
 * Get formatted phone number
 * @returns {string} Formatted phone number
 */
portfolioContent.getFormattedPhone = function() {
    return this.contact.phone_formatted || this.contact.phone;
};

/**
 * Get full name with faith name
 * @returns {string} Complete name
 */
portfolioContent.getFullName = function() {
    return `${this.profile.faithName} "${this.profile.brandName}" ${this.profile.legalName}`;
};

/**
 * Check if currently at specific role
 * @param {string} roleTitle - Role title to check
 * @returns {boolean} Whether currently in that role
 */
portfolioContent.isCurrentRole = function(roleTitle) {
    const exp = this.experience.find(e => e.title === roleTitle);
    return exp ? exp.date_range?.current || false : false;
};

// ===== EXPORT =====
// For Node.js environment (if used in build tools)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioContent;
}

// For browser environment (make available globally)
if (typeof window !== 'undefined') {
    window.portfolioContent = portfolioContent;
}

// Log confirmation (only in development)
if (typeof console !== 'undefined' && console.log) {
    console.log('✅ Static portfolio content loaded successfully');
    console.log(`📋 Profile: ${portfolioContent.profile.fullName}`);
    console.log(`📍 Location: ${portfolioContent.profile.location}`);
}

// ===== END OF STATIC CONTENT =====