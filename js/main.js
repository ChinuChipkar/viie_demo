// Global State Management
let currentUser = null;
let currentPage = 'home';

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    checkAuthStatus();
    loadUniversities();
});

// Initialize Application
function initializeApp() {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateNavigationForAuthUser();
    }
    
    // Set initial page
    showPage('home');
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Auth tabs
    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        tab.addEventListener('click', handleAuthTab);
    });
    
    // Login form
    const loginForm = document.getElementById('loginFormSubmit');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Register form
    const registerForm = document.getElementById('registerFormSubmit');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Application form
    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        applicationForm.addEventListener('submit', handleApplicationSubmit);
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Dashboard navigation
    const dashboardNavItems = document.querySelectorAll('.dashboard-nav-item');
    dashboardNavItems.forEach(item => {
        item.addEventListener('click', handleDashboardNav);
    });
    
    // Chat functionality
    setupChatListeners();
    
    // Filters
    setupFilterListeners();
    
    // Hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page) {
                showPage(page);
            }
        });
    });
    
    // Footer links
    const footerLinks = document.querySelectorAll('.footer a[data-page]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            if (page) {
                showPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

// Navigation Handler
function handleNavigation(e) {
    e.preventDefault();
    const page = this.getAttribute('data-page');
    if (page) {
        showPage(page);
        
        // Update active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
        
        // Close mobile menu
        const navMenu = document.getElementById('navMenu');
        navMenu.classList.remove('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Show Page
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    let pageToShow = null;
    
    switch(pageName) {
        case 'home':
            pageToShow = document.getElementById('homePage');
            break;
        case 'admission':
            pageToShow = document.getElementById('admissionPage');
            break;
        case 'apply':
            pageToShow = document.getElementById('applyPage');
            break;
        case 'login':
            pageToShow = document.getElementById('loginPage');
            break;
        case 'dashboard':
            if (currentUser) {
                if (currentUser.role === 'admin') {
                    pageToShow = document.getElementById('adminDashboardPage');
                } else if (currentUser.role === 'university') {
                    pageToShow = document.getElementById('universityDashboardPage');
                } else {
                    pageToShow = document.getElementById('dashboardPage');
                    loadStudentDashboard();
                }
            } else {
                pageToShow = document.getElementById('loginPage');
                showNotification('Please login to access dashboard', 'warning');
            }
            break;
    }
    
    if (pageToShow) {
        pageToShow.classList.add('active');
        currentPage = pageName;
    }
}

// Auth Tab Handler
function handleAuthTab(e) {
    const tab = this.getAttribute('data-tab');
    
    // Update tab buttons
    document.querySelectorAll('.auth-tab').forEach(t => {
        t.classList.remove('active');
    });
    this.classList.add('active');
    
    // Show corresponding form
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    
    if (tab === 'login') {
        document.getElementById('loginForm').classList.add('active');
    } else {
        document.getElementById('registerForm').classList.add('active');
    }
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.querySelector('input[name="loginRole"]:checked').value;
    
    // Demo login - check against sample data
    const demoAccounts = JSON.parse(localStorage.getItem('demoAccounts') || '[]');
    const account = demoAccounts.find(acc => acc.email === email && acc.role === role);
    
    if (account || (email && password)) {
        // Create or use existing account
        const user = account || {
            id: 'USER' + Date.now(),
            email: email,
            role: role,
            name: email.split('@')[0]
        };
        
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        updateNavigationForAuthUser();
        showPage('dashboard');
        showNotification('Login successful!', 'success');
        
        // Reset form
        e.target.reset();
    } else {
        showNotification('Invalid credentials', 'error');
    }
}

// Handle Register
function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const role = document.querySelector('input[name="registerRole"]:checked').value;
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: 'USER' + Date.now(),
        name: name,
        email: email,
        role: role
    };
    
    // Save to demo accounts
    const demoAccounts = JSON.parse(localStorage.getItem('demoAccounts') || '[]');
    demoAccounts.push(newUser);
    localStorage.setItem('demoAccounts', JSON.stringify(demoAccounts));
    
    // Login the user
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    updateNavigationForAuthUser();
    showPage('dashboard');
    showNotification('Registration successful!', 'success');
    
    // Reset form
    e.target.reset();
}

// Handle Logout
function handleLogout(e) {
    e.preventDefault();
    
    currentUser = null;
    localStorage.removeItem('currentUser');
    
    updateNavigationForGuestUser();
    showPage('home');
    showNotification('Logged out successfully', 'success');
}

// Update Navigation for Authenticated User
function updateNavigationForAuthUser() {
    document.getElementById('navDashboard').style.display = 'block';
    document.getElementById('navLogout').style.display = 'block';
    
    // Update login link
    const loginLink = document.querySelector('[data-page="login"]');
    if (loginLink && loginLink.parentElement) {
        loginLink.parentElement.style.display = 'none';
    }
}

// Update Navigation for Guest User
function updateNavigationForGuestUser() {
    document.getElementById('navDashboard').style.display = 'none';
    document.getElementById('navLogout').style.display = 'none';
    
    const loginLink = document.querySelector('[data-page="login"]');
    if (loginLink && loginLink.parentElement) {
        loginLink.parentElement.style.display = 'block';
    }
}

// Check Auth Status
function checkAuthStatus() {
    if (currentUser) {
        updateNavigationForAuthUser();
    } else {
        updateNavigationForGuestUser();
    }
}

// Load Universities
function loadUniversities() {
    const universitiesData = JSON.parse(localStorage.getItem('universitiesData') || '[]');
    displayUniversities(universitiesData);
}

// Display Universities
function displayUniversities(universities) {
    const grid = document.getElementById('universitiesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (universities.length === 0) {
        grid.innerHTML = '<p class="text-center" style="grid-column: 1/-1;">No universities found</p>';
        return;
    }
    
    universities.forEach(uni => {
        const card = createUniversityCard(uni);
        grid.appendChild(card);
    });
}

// Create University Card
function createUniversityCard(uni) {
    const card = document.createElement('div');
    card.className = 'university-card';
    
    card.innerHTML = `
        <div class="university-image">
            <i class="fas fa-university"></i>
        </div>
        <div class="university-content">
            <div class="university-header">
                <div>
                    <h3 class="university-name">${uni.name}</h3>
                    <div class="university-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${uni.city}, ${uni.country}
                    </div>
                </div>
                <span class="university-badge">${uni.ranking}</span>
            </div>
            <div class="university-info">
                <div class="info-row">
                    <span class="info-label">Tuition Fee</span>
                    <span class="info-value highlight">${uni.tuitionFee}/year</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Living Expenses</span>
                    <span class="info-value">${uni.livingExpenses}/year</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Application Fee</span>
                    <span class="info-value">${uni.applicationFee}</span>
                </div>
            </div>
            <div class="university-programs">
                ${uni.programs.map(prog => `<span class="program-tag">${prog}</span>`).join('')}
            </div>
            <div class="university-actions">
                <button class="btn btn-apply" onclick="applyToUniversity('${uni.name}')">
                    <i class="fas fa-paper-plane"></i> Apply Now
                </button>
                <button class="btn btn-details" onclick="viewUniversityDetails(${uni.id})">
                    <i class="fas fa-info-circle"></i> Details
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Apply to University
function applyToUniversity(universityName) {
    if (!currentUser) {
        showPage('login');
        showNotification('Please login to apply', 'warning');
        return;
    }
    
    showPage('apply');
    showNotification(`Applying to ${universityName}`, 'info');
}

// View University Details
function viewUniversityDetails(universityId) {
    showNotification('University details coming soon!', 'info');
}

// Setup Filter Listeners
function setupFilterListeners() {
    const countryFilter = document.getElementById('countryFilter');
    const programFilter = document.getElementById('programFilter');
    const searchInput = document.getElementById('searchUniversity');
    
    if (countryFilter) {
        countryFilter.addEventListener('change', filterUniversities);
    }
    
    if (programFilter) {
        programFilter.addEventListener('change', filterUniversities);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filterUniversities);
    }
}

// Filter Universities
function filterUniversities() {
    const country = document.getElementById('countryFilter').value;
    const program = document.getElementById('programFilter').value;
    const search = document.getElementById('searchUniversity').value.toLowerCase();
    
    const universitiesData = JSON.parse(localStorage.getItem('universitiesData') || '[]');
    
    let filtered = universitiesData.filter(uni => {
        const matchCountry = country === 'all' || uni.country === country;
        const matchProgram = program === 'all' || uni.programs.some(p => p.toLowerCase().includes(program));
        const matchSearch = search === '' || 
            uni.name.toLowerCase().includes(search) || 
            uni.city.toLowerCase().includes(search) ||
            uni.country.toLowerCase().includes(search);
        
        return matchCountry && matchProgram && matchSearch;
    });
    
    displayUniversities(filtered);
}

// Handle Application Submit
function handleApplicationSubmit(e) {
    e.preventDefault();
    
    if (!currentUser) {
        showPage('login');
        showNotification('Please login to submit application', 'warning');
        return;
    }
    
    const formData = new FormData(e.target);
    const applicationData = {};
    
    for (let [key, value] of formData.entries()) {
        applicationData[key] = value;
    }
    
    // Save application
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    applications.push({
        ...applicationData,
        id: 'APP' + Date.now(),
        userId: currentUser.id,
        status: 'pending',
        submittedDate: new Date().toISOString().split('T')[0]
    });
    localStorage.setItem('applications', JSON.stringify(applications));
    
    showNotification('Application submitted successfully!', 'success');
    e.target.reset();
    
    // Redirect to dashboard
    setTimeout(() => {
        showPage('dashboard');
    }, 1500);
}

// Dashboard Navigation
function handleDashboardNav(e) {
    e.preventDefault();
    const section = this.getAttribute('data-section');
    
    // Update active nav item
    document.querySelectorAll('.dashboard-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    this.classList.add('active');
    
    // Show corresponding section
    document.querySelectorAll('.dashboard-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    const sectionToShow = document.getElementById(section + 'Section');
    if (sectionToShow) {
        sectionToShow.classList.add('active');
    }
}

// Load Student Dashboard
function loadStudentDashboard() {
    if (!currentUser || currentUser.role !== 'student') return;
    
    // Load sample data for demo
    const studentData = sampleStudentData;
    
    // Update user info
    document.getElementById('dashboardUserName').textContent = currentUser.name || studentData.name;
    document.getElementById('dashboardUserEmail').textContent = currentUser.email;
    
    // Update stats
    document.getElementById('totalApplications').textContent = studentData.applications.length;
    document.getElementById('acceptedApplications').textContent = 
        studentData.applications.filter(app => app.status === 'approved').length;
    document.getElementById('pendingApplications').textContent = 
        studentData.applications.filter(app => app.status === 'pending').length;
    document.getElementById('feesPaid').textContent = '28%';
    
    // Load recent activity
    loadRecentActivity(studentData);
    
    // Load applications
    loadApplicationsList(studentData.applications);
    
    // Load fees status
    loadFeesStatus(studentData.fees);
    
    // Load exams status
    loadExamsStatus(studentData.exams);
    
    // Load offer letters
    loadOfferLetters(studentData.offers);
    
    // Load academic reports
    loadAcademicReports(studentData.academic);
    
    // Load profile
    loadProfile(studentData.profile);
}

// Load Recent Activity
function loadRecentActivity(studentData) {
    const activityList = document.getElementById('recentActivityList');
    if (!activityList) return;
    
    const activities = [
        {
            title: 'Application Approved',
            description: `Your application to ${studentData.applications[2].university} has been approved`,
            time: '2 days ago'
        },
        {
            title: 'Offer Letter Received',
            description: `Offer letter from ${studentData.offers[0].university} is now available`,
            time: '1 week ago'
        },
        {
            title: 'Application Submitted',
            description: `Application to ${studentData.applications[1].university} submitted successfully`,
            time: '2 weeks ago'
        }
    ];
    
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <h4>${activity.title}</h4>
            <p>${activity.description}</p>
            <span class="activity-time">${activity.time}</span>
        </div>
    `).join('');
}

// Load Applications List
function loadApplicationsList(applications) {
    const appList = document.getElementById('applicationsList');
    if (!appList) return;
    
    appList.innerHTML = applications.map(app => `
        <div class="application-card">
            <div class="card-header">
                <h3 class="card-title">${app.university}</h3>
                <span class="status-badge ${app.status}">${app.status.toUpperCase()}</span>
            </div>
            <div class="card-details">
                <div class="detail-item">
                    <span class="detail-label">Program</span>
                    <span class="detail-value">${app.program}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Country</span>
                    <span class="detail-value">${app.country}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Intake</span>
                    <span class="detail-value">${app.intake}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Submitted</span>
                    <span class="detail-value">${app.submittedDate}</span>
                </div>
            </div>
            <div class="card-actions">
                <button class="btn btn-small btn-primary">View Details</button>
                <button class="btn btn-small btn-secondary">Track Status</button>
            </div>
        </div>
    `).join('');
}

// Load Fees Status
function loadFeesStatus(fees) {
    const feesList = document.getElementById('feesStatusList');
    if (!feesList) return;
    
    feesList.innerHTML = fees.map(fee => {
        const paidAmount = parseFloat(fee.paidAmount.replace(/[^0-9.-]+/g, ''));
        const totalAmount = parseFloat(fee.totalFees.replace(/[^0-9.-]+/g, ''));
        const percentage = (paidAmount / totalAmount * 100).toFixed(0);
        
        return `
            <div class="fee-card">
                <div class="card-header">
                    <h3 class="card-title">${fee.university}</h3>
                    <span class="status-badge ${fee.status}">${fee.status.toUpperCase()}</span>
                </div>
                <div class="card-details">
                    <div class="detail-item">
                        <span class="detail-label">Total Fees</span>
                        <span class="detail-value">${fee.totalFees}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Paid Amount</span>
                        <span class="detail-value">${fee.paidAmount}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Remaining</span>
                        <span class="detail-value">${fee.remainingAmount}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Due Date</span>
                        <span class="detail-value">${fee.dueDate}</span>
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <p style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--gray-600);">
                    ${percentage}% paid
                </p>
                <div class="card-actions">
                    <button class="btn btn-small btn-primary">Make Payment</button>
                    <button class="btn btn-small btn-secondary">View Receipt</button>
                </div>
            </div>
        `;
    }).join('');
}

// Load Exams Status
function loadExamsStatus(exams) {
    const examsList = document.getElementById('examsStatusList');
    if (!examsList) return;
    
    examsList.innerHTML = exams.map(exam => `
        <div class="exam-card">
            <div class="card-header">
                <h3 class="card-title">${exam.examName}</h3>
                <span class="status-badge ${exam.status}">${exam.status.toUpperCase()}</span>
            </div>
            <div class="card-details">
                <div class="detail-item">
                    <span class="detail-label">Score</span>
                    <span class="detail-value">${exam.score}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Date</span>
                    <span class="detail-value">${exam.date}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Valid Until</span>
                    <span class="detail-value">${exam.validUntil}</span>
                </div>
            </div>
            <div class="card-actions">
                <button class="btn btn-small btn-primary">View Score Report</button>
                ${exam.status === 'scheduled' ? '<button class="btn btn-small btn-secondary">Reschedule</button>' : ''}
            </div>
        </div>
    `).join('');
}

// Load Offer Letters
function loadOfferLetters(offers) {
    const offersList = document.getElementById('offerLettersList');
    if (!offersList) return;
    
    offersList.innerHTML = offers.map(offer => `
        <div class="offer-card">
            <div class="card-header">
                <h3 class="card-title">${offer.university}</h3>
                <span class="status-badge ${offer.status}">${offer.status.replace('-', ' ').toUpperCase()}</span>
            </div>
            <div class="card-details">
                <div class="detail-item">
                    <span class="detail-label">Program</span>
                    <span class="detail-value">${offer.program}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Tuition Fee</span>
                    <span class="detail-value">${offer.tuitionFee}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Scholarship</span>
                    <span class="detail-value">${offer.scholarship}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Response Deadline</span>
                    <span class="detail-value">${offer.responseDeadline}</span>
                </div>
            </div>
            <div class="card-actions">
                <button class="btn btn-small btn-primary">
                    <i class="fas fa-download"></i> Download Letter
                </button>
                ${offer.status === 'pending-response' ? 
                    '<button class="btn btn-small" style="background: var(--success-color); color: white;">Accept Offer</button>' : 
                    ''
                }
            </div>
        </div>
    `).join('');
}

// Load Academic Reports
function loadAcademicReports(academic) {
    const academicList = document.getElementById('academicReportsList');
    if (!academicList) return;
    
    academicList.innerHTML = academic.map(record => `
        <div class="academic-card">
            <div class="card-header">
                <h3 class="card-title">${record.degree}</h3>
                <span class="status-badge approved">${record.transcriptStatus.toUpperCase()}</span>
            </div>
            <div class="card-details">
                <div class="detail-item">
                    <span class="detail-label">Field of Study</span>
                    <span class="detail-value">${record.field}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Institution</span>
                    <span class="detail-value">${record.institution}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Completion Year</span>
                    <span class="detail-value">${record.completionYear}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">GPA</span>
                    <span class="detail-value">${record.gpa}</span>
                </div>
            </div>
            <div class="card-actions">
                <button class="btn btn-small btn-primary">
                    <i class="fas fa-download"></i> Download Transcript
                </button>
                <button class="btn btn-small btn-secondary">View Certificate</button>
            </div>
        </div>
    `).join('');
}

// Load Profile
function loadProfile(profile) {
    const profileDetails = document.getElementById('profileDetails');
    if (!profileDetails) return;
    
    profileDetails.innerHTML = `
        <div class="profile-section">
            <h3><i class="fas fa-user"></i> Personal Information</h3>
            <div class="profile-grid">
                <div class="detail-item">
                    <span class="detail-label">Full Name</span>
                    <span class="detail-value">${profile.personalInfo.fullName}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Email</span>
                    <span class="detail-value">${profile.personalInfo.email}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Phone</span>
                    <span class="detail-value">${profile.personalInfo.phone}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Date of Birth</span>
                    <span class="detail-value">${profile.personalInfo.dateOfBirth}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Nationality</span>
                    <span class="detail-value">${profile.personalInfo.nationality}</span>
                </div>
                <div class="detail-item" style="grid-column: 1 / -1;">
                    <span class="detail-label">Address</span>
                    <span class="detail-value">${profile.personalInfo.address}</span>
                </div>
            </div>
        </div>
        
        <div class="profile-section">
            <h3><i class="fas fa-graduation-cap"></i> Education</h3>
            <div class="profile-grid">
                <div class="detail-item">
                    <span class="detail-label">Last Degree</span>
                    <span class="detail-value">${profile.education.lastDegree}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Institution</span>
                    <span class="detail-value">${profile.education.institution}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">GPA</span>
                    <span class="detail-value">${profile.education.gpa}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Year of Graduation</span>
                    <span class="detail-value">${profile.education.yearOfGraduation}</span>
                </div>
            </div>
        </div>
        
        <div class="profile-section">
            <h3><i class="fas fa-chart-line"></i> Test Scores</h3>
            <div class="profile-grid">
                <div class="detail-item">
                    <span class="detail-label">English Test</span>
                    <span class="detail-value">${profile.testScores.englishTest}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">English Score</span>
                    <span class="detail-value">${profile.testScores.englishScore}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Standard Test</span>
                    <span class="detail-value">${profile.testScores.standardTest}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Standard Score</span>
                    <span class="detail-value">${profile.testScores.standardScore}</span>
                </div>
            </div>
        </div>
        
        <div class="profile-section">
            <h3><i class="fas fa-cog"></i> Preferences</h3>
            <div class="profile-grid">
                <div class="detail-item">
                    <span class="detail-label">Program Level</span>
                    <span class="detail-value">${profile.preferences.programLevel}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Field of Study</span>
                    <span class="detail-value">${profile.preferences.fieldOfStudy}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Intended Intake</span>
                    <span class="detail-value">${profile.preferences.intendedIntake}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Preferred Countries</span>
                    <span class="detail-value">${profile.preferences.preferredCountries.join(', ')}</span>
                </div>
            </div>
        </div>
        
        <div class="card-actions" style="margin-top: 2rem;">
            <button class="btn btn-primary">
                <i class="fas fa-edit"></i> Edit Profile
            </button>
            <button class="btn btn-secondary">
                <i class="fas fa-download"></i> Download CV
            </button>
        </div>
    `;
}

// Chat Functionality
function setupChatListeners() {
    const chatToggle = document.getElementById('chatToggle');
    const chatWidget = document.getElementById('chatWidget');
    const chatClose = document.getElementById('chatClose');
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');
    
    if (chatToggle) {
        chatToggle.addEventListener('click', () => {
            chatWidget.classList.toggle('active');
        });
    }
    
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatWidget.classList.remove('active');
        });
    }
    
    if (chatSend) {
        chatSend.addEventListener('click', sendChatMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
}

// Send Chat Message
function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const responses = [
            "Thank you for your message. An admin will respond shortly.",
            "I can help you with that. Let me check the information.",
            "That's a great question! Our team will get back to you soon.",
            "I understand your concern. We'll address this right away.",
            "Please hold on while I gather that information for you."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addChatMessage(randomResponse, 'bot');
    }, 1000);
}

// Add Chat Message
function addChatMessage(message, type) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
            <span class="message-time">${time}</span>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Save to localStorage
    const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    messages.push({
        message: message,
        type: type,
        time: now.toISOString(),
        userId: currentUser ? currentUser.id : 'guest'
    });
    localStorage.setItem('chatMessages', JSON.stringify(messages));
}

// Show Notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        border-left: 4px solid;
    `;
    
    // Set border color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#2563eb'
    };
    
    notification.style.borderLeftColor = colors[type] || colors.info;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}" 
               style="color: ${colors[type]}; font-size: 1.25rem;"></i>
            <span style="color: var(--gray-800); font-weight: 500;">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);