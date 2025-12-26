// Sample University Data
const universitiesData = [
    {
        id: 1,
        name: "Harvard University",
        country: "USA",
        city: "Cambridge, MA",
        ranking: "Top 5",
        tuitionFee: "$54,002",
        livingExpenses: "$18,000",
        applicationFee: "$75",
        programs: ["Undergraduate", "Postgraduate", "PhD"],
        fields: ["Business", "Engineering", "Medicine", "Law"],
        intakes: ["Fall 2024", "Spring 2025"],
        scholarships: true
    },
    {
        id: 2,
        name: "University of Oxford",
        country: "UK",
        city: "Oxford",
        ranking: "Top 3",
        tuitionFee: "£28,950",
        livingExpenses: "£12,500",
        applicationFee: "£75",
        programs: ["Undergraduate", "Postgraduate", "PhD"],
        fields: ["Arts", "Sciences", "Medicine", "Business"],
        intakes: ["Fall 2024", "Spring 2025"],
        scholarships: true
    },
    {
        id: 3,
        name: "University of Toronto",
        country: "Canada",
        city: "Toronto, ON",
        ranking: "Top 20",
        tuitionFee: "CAD 58,160",
        livingExpenses: "CAD 15,000",
        applicationFee: "CAD 150",
        programs: ["Undergraduate", "Postgraduate", "PhD"],
        fields: ["Computer Science", "Engineering", "Business"],
        intakes: ["Fall 2024", "Spring 2025"],
        scholarships: true
    },
    {
        id: 4,
        name: "University of Melbourne",
        country: "Australia",
        city: "Melbourne",
        ranking: "Top 30",
        tuitionFee: "AUD 45,824",
        livingExpenses: "AUD 20,000",
        applicationFee: "AUD 100",
        programs: ["Undergraduate", "Postgraduate", "PhD"],
        fields: ["Engineering", "Business", "Medicine"],
        intakes: ["Fall 2024", "Spring 2025"],
        scholarships: true
    },
    {
        id: 5,
        name: "Technical University of Munich",
        country: "Germany",
        city: "Munich",
        ranking: "Top 50",
        tuitionFee: "€1,500",
        livingExpenses: "€10,000",
        applicationFee: "€75",
        programs: ["Undergraduate", "Postgraduate", "PhD"],
        fields: ["Engineering", "Computer Science", "Natural Sciences"],
        intakes: ["Fall 2024", "Spring 2025"],
        scholarships: true
    },
    {
        id: 6,
        name: "Stanford University",
        country: "USA",
        city: "Stanford, CA",
        ranking: "Top 5",
        tuitionFee: "$56,169",
        livingExpenses: "$20,000",
        applicationFee: "$90",
        programs: ["Undergraduate", "Postgraduate", "PhD"],
        fields: ["Computer Science", "Engineering", "Business"],
        intakes: ["Fall 2024", "Spring 2025"],
        scholarships: true
    },
    {
        id: 7,
        name: "University of Cambridge",
        country: "UK",
        city: "Cambridge",
        ranking: "Top 5",
        tuitionFee: "£25,734",
        livingExpenses: "£11,230",
        applicationFee: "£75",
        programs: ["Undergraduate", "Postgraduate", "PhD"],
        fields: ["Sciences", "Engineering", "Medicine", "Arts"],
        intakes: ["Fall 2024"],
        scholarships: true
    },
    {
        id: 8,
        name: "McGill University",
        country: "Canada",
        city: "Montreal, QC",
        ranking: "Top 40",
        tuitionFee: "CAD 42,530",
        livingExpenses: "CAD 14,000",
        applicationFee: "CAD 120",
        programs: ["Undergraduate", "Postgraduate", "PhD"],
        fields: ["Medicine", "Business", "Engineering"],
        intakes: ["Fall 2024", "Spring 2025"],
        scholarships: true
    },
    {
        id: 9,
        name: "Australian National University",
        country: "Australia",
        city: "Canberra",
        ranking: "Top 35",
        tuitionFee: "AUD 46,080",
        livingExpenses: "AUD 18,000",
        applicationFee: "AUD 100",
        programs: ["Undergraduate", "Postgraduate", "PhD"],
        fields: ["Sciences", "Engineering", "Social Sciences"],
        intakes: ["Fall 2024", "Spring 2025"],
        scholarships: true
    },
    {
        id: 10,
        name: "University of Amsterdam",
        country: "Netherlands",
        city: "Amsterdam",
        ranking: "Top 60",
        tuitionFee: "€12,500",
        livingExpenses: "€12,000",
        applicationFee: "€100",
        programs: ["Undergraduate", "Postgraduate", "PhD"],
        fields: ["Business", "Social Sciences", "Arts"],
        intakes: ["Fall 2024", "Spring 2025"],
        scholarships: true
    },
    {
        id: 11,
        name: "MIT",
        country: "USA",
        city: "Cambridge, MA",
        ranking: "Top 3",
        tuitionFee: "$55,878",
        livingExpenses: "$19,000",
        applicationFee: "$75",
        programs: ["Undergraduate", "Postgraduate", "PhD"],
        fields: ["Engineering", "Computer Science", "Sciences"],
        intakes: ["Fall 2024"],
        scholarships: true
    },
    {
        id: 12,
        name: "Imperial College London",
        country: "UK",
        city: "London",
        ranking: "Top 10",
        tuitionFee: "£33,750",
        livingExpenses: "£15,000",
        applicationFee: "£75",
        programs: ["Undergraduate", "Postgraduate", "PhD"],
        fields: ["Engineering", "Medicine", "Sciences"],
        intakes: ["Fall 2024", "Spring 2025"],
        scholarships: true
    }
];

// Sample Student Data
const sampleStudentData = {
    id: "STU001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "student",
    applications: [
        {
            id: "APP001",
            university: "Harvard University",
            program: "Master of Business Administration",
            country: "USA",
            status: "pending",
            submittedDate: "2024-01-15",
            intake: "Fall 2024"
        },
        {
            id: "APP002",
            university: "University of Oxford",
            program: "MSc Computer Science",
            country: "UK",
            status: "in-progress",
            submittedDate: "2024-01-20",
            intake: "Fall 2024"
        },
        {
            id: "APP003",
            university: "Stanford University",
            program: "MS Computer Science",
            country: "USA",
            status: "approved",
            submittedDate: "2024-01-10",
            intake: "Fall 2024"
        }
    ],
    fees: [
        {
            university: "Stanford University",
            totalFees: "$76,169",
            paidAmount: "$20,000",
            remainingAmount: "$56,169",
            dueDate: "2024-06-30",
            status: "partial"
        },
        {
            university: "Harvard University",
            totalFees: "$72,002",
            paidAmount: "$0",
            remainingAmount: "$72,002",
            dueDate: "2024-07-15",
            status: "pending"
        }
    ],
    exams: [
        {
            examName: "TOEFL",
            score: "108/120",
            date: "2023-11-15",
            status: "completed",
            validUntil: "2025-11-15"
        },
        {
            examName: "GRE",
            score: "325/340",
            date: "2023-12-10",
            status: "completed",
            validUntil: "2028-12-10"
        },
        {
            examName: "GMAT",
            score: "N/A",
            date: "Scheduled for 2024-03-15",
            status: "scheduled",
            validUntil: "N/A"
        }
    ],
    offers: [
        {
            id: "OFFER001",
            university: "Stanford University",
            program: "MS Computer Science",
            status: "accepted",
            receivedDate: "2024-02-20",
            responseDeadline: "2024-04-15",
            tuitionFee: "$56,169",
            scholarship: "$10,000"
        },
        {
            id: "OFFER002",
            university: "University of Toronto",
            program: "MASc Computer Engineering",
            status: "pending-response",
            receivedDate: "2024-02-25",
            responseDeadline: "2024-04-20",
            tuitionFee: "CAD 58,160",
            scholarship: "CAD 5,000"
        }
    ],
    academic: [
        {
            degree: "Bachelor of Technology",
            field: "Computer Science",
            institution: "State University",
            completionYear: "2023",
            gpa: "3.8/4.0",
            transcriptStatus: "verified"
        },
        {
            degree: "High School Diploma",
            field: "Science Stream",
            institution: "Central High School",
            completionYear: "2019",
            gpa: "95%",
            transcriptStatus: "verified"
        }
    ],
    profile: {
        personalInfo: {
            fullName: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            dateOfBirth: "1998-05-15",
            nationality: "American",
            address: "123 Main Street, New York, NY 10001"
        },
        education: {
            lastDegree: "Bachelor of Technology",
            institution: "State University",
            gpa: "3.8/4.0",
            yearOfGraduation: "2023"
        },
        testScores: {
            englishTest: "TOEFL",
            englishScore: "108/120",
            standardTest: "GRE",
            standardScore: "325/340"
        },
        preferences: {
            programLevel: "Postgraduate",
            fieldOfStudy: "Computer Science",
            preferredCountries: ["USA", "UK", "Canada"],
            intendedIntake: "Fall 2024"
        }
    },
    progressReport: {
        applicationProgress: 75,
        documentStatus: "complete",
        examStatus: "complete",
        offerLettersReceived: 2,
        visaStatus: "in-progress",
        nextSteps: [
            "Accept offer letter from Stanford University",
            "Begin visa application process",
            "Arrange accommodation",
            "Book flight tickets"
        ]
    }
};

// Sample Admin Data
const sampleAdminData = {
    id: "ADMIN001",
    name: "Admin User",
    email: "admin@globaledu.com",
    role: "admin"
};

// Sample University Data
const sampleUniversityData = {
    id: "UNI001",
    name: "Harvard University",
    email: "admissions@harvard.edu",
    role: "university"
};

// Chat Messages Sample
const chatMessages = [];

// Store sample data in localStorage
function initializeSampleData() {
    if (!localStorage.getItem('currentUser')) {
        // Initialize demo accounts
        const demoAccounts = [
            sampleStudentData,
            sampleAdminData,
            sampleUniversityData
        ];
        localStorage.setItem('demoAccounts', JSON.stringify(demoAccounts));
    }
    
    // Store universities data
    if (!localStorage.getItem('universitiesData')) {
        localStorage.setItem('universitiesData', JSON.stringify(universitiesData));
    }
    
    // Store chat messages
    if (!localStorage.getItem('chatMessages')) {
        localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
    }
}

// Initialize on load
initializeSampleData();