// Static content fallback (in case JSON fails to load)
const portfolioContent = {
    profile: {
        name: 'Yusuf "Samkran" Kalume',
        legalName: 'Samson Kalume',
        title: 'Environmental Health Professional | Public Health Practitioner | Digital Innovator',
        location: 'Kilifi County, Kenya',
        email: 'example@gmail.com',
        phone: '+2547********',
        github: 'https://github.com/samsonshukran'
    },
    about: {
        summary: 'Environmental Health student at Kenyatta University with hands-on experience in sanitation inspection, vaccination campaigns, disease prevention, and environmental conservation. Currently serving as a Public Health Officer Intern at Mtondia Dispensary in Kilifi County.',
        languages: [
            { name: 'English', level: 'Fluent', percentage: 95 },
            { name: 'Kiswahili', level: 'Fluent', percentage: 95 },
            { name: 'Arabic', level: 'Beginner', percentage: 30 }
        ],
        values: ['Community Health', 'Sustainability', 'Leadership', 'Innovation', 'Discipline', 'Integrity']
    },
    experience: [
        {
            title: 'Public Health Officer Intern',
            organization: 'Mtondia Dispensary – Kilifi County',
            date: '2025 – Present',
            responsibilities: [
                'Conduct environmental sanitation and hygiene inspections',
                'Monitor food safety compliance in food premises',
                'Participate in measles vaccination campaigns',
                'Participate in typhoid vaccination campaigns',
                'Conduct school hygiene training and inspections',
                'Support disease surveillance and reporting'
            ]
        },
        {
            title: 'Industrial Attachment',
            organization: 'Mtondia Dispensary – Kilifi County',
            date: 'May – Aug 2025',
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
            date: '2023 – 2024',
            responsibilities: [
                'Coordinated tree planting activities',
                'Managed nursery bed seedling projects',
                'Led environmental awareness campaigns',
                'Mobilized youth and community groups',
                'Strengthened stakeholder partnerships'
            ]
        },
        {
            title: 'Vaccination Campaign Participant',
            organization: 'Nationwide Campaigns',
            date: '2025',
            responsibilities: [
                'Measles vaccination campaign',
                'Typhoid vaccination campaign',
                'HPV vaccination support',
                'School-based immunization outreach'
            ]
        }
    ],
    projects: [
        {
            name: 'Samkran Digital Platform',
            description: 'Progressive Web App with offline capabilities, structured content management, and Islamic green & gold UI design.',
            features: [
                'PWA implementation with service workers',
                'Offline caching strategy',
                'JSON-based structured data system',
                'Educational content management',
                'GitHub version control'
            ],
            link: 'https://github.com/samsonshukran'
        },
        {
            name: 'Public Health Campaigns',
            description: 'Active participation in nationwide vaccination and health promotion initiatives.',
            features: [
                'Measles vaccination campaign',
                'Typhoid vaccination campaign',
                'HPV vaccination support',
                'School sanitation education',
                'Community disease awareness'
            ]
        },
        {
            name: 'Food Safety & Inspection',
            description: 'Comprehensive food premise inspections and hygiene compliance monitoring.',
            features: [
                'Supermarket inspections (Naivas)',
                'Hotel and restaurant inspections',
                'Food handler certification',
                'Meat inspection at slaughterhouse',
                'Food sampling and analysis'
            ]
        },
        {
            name: 'Environmental Conservation',
            description: 'Tree planting initiatives and environmental awareness programs.',
            features: [
                'Tree planting campaigns',
                'Nursery bed seedling management',
                'Community environmental training',
                'Waste management advocacy'
            ]
        }
    ],
    stats: {
        schoolsInspected: '10+',
        studentsTrained: '500+',
        vaccinationCampaigns: '3',
        treesPlanted: '200+'
    },
    certifications: [
        'NABU Champion Leadership (2023)',
        'Computer Literacy – IAT (2023)',
        'Virtual Assistance Certificate',
        'EFAC B2S Leadership Program'
    ]
};

// Export for use in app.js if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioContent;
}