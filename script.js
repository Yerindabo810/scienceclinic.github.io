document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    mobileMenuBtn.addEventListener('click', function() {
        navList.classList.toggle('active');
        mobileMenuBtn.innerHTML = navList.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Announcements Slider
    const announcementItems = document.querySelectorAll('.announcement-item');
    let currentAnnouncement = 0;
    
    function showAnnouncement(index) {
        announcementItems.forEach(item => item.classList.remove('active'));
        announcementItems[index].classList.add('active');
    }
    
    function nextAnnouncement() {
        currentAnnouncement = (currentAnnouncement + 1) % announcementItems.length;
        showAnnouncement(currentAnnouncement);
    }
    
    // Change announcement every 5 seconds
    showAnnouncement(0);
    setInterval(nextAnnouncement, 5000);
    
    // Hero Image Slider
    const slides = document.querySelectorAll('.slide');
    const sliderDots = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    // Create dots
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Button events
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide change every 7 seconds
    setInterval(nextSlide, 7000);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 90,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send the email to your server
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Sticky header on scroll
    const header = document.querySelector('.header');
    const headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > headerHeight) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
});
// Add to existing Auth object
const Auth = {
    // ... existing code ...
    
    register(email, password) {
        if (this.users.some(user => user.email === email)) {
            throw new Error('User already exists');
        }
        
        const newUser = {
            email: email.toLowerCase().trim(),
            password: password.trim(),
            joined: new Date().toISOString()
        };
        
        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        
        // Automatically log in after registration
        this.login(email, password);
        
        // Redirect to home page
        window.location.href = 'index.html';
    },

    // ... rest of existing Auth object ...
};

// Add form handling for registration
function handleRegistration(event) {
    event.preventDefault();
    
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    try {
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }
        
        Auth.register(email, password);
        alert('Registration successful! You are now logged in.');
    } catch (error) {
        alert(error.message);
    }
}
// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMobileMenu() {
    mobileNav.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

[mobileMenuBtn, closeMenuBtn, menuOverlay].forEach(element => {
    element.addEventListener('click', toggleMobileMenu);
});

// Close menu when clicking navigation links
document.querySelectorAll('.mobile-nav-content a').forEach(link => {
    link.addEventListener('click', toggleMobileMenu);
});

// Update auth buttons in both menus
function updateAuthUI() {
    const user = Auth.getCurrentUser();
    const desktopAuth = document.getElementById('desktopAuth');
    const mobileAuth = document.getElementById('mobileAuth');

    if (user) {
        desktopAuth.innerHTML = `
            <span class="welcome">Welcome, ${user.fullName}</span>
            <button class="btn btn-logout" onclick="Auth.logout(); window.location.reload()">Logout</button>
        `;
        mobileAuth.innerHTML = `
            <span class="welcome">Welcome, ${user.fullName}</span>
            <button class="btn btn-logout" onclick="Auth.logout(); window.location.reload()">Logout</button>
        `;
    } else {
        desktopAuth.innerHTML = `
            <a href="login.html" class="btn btn-login">Sign In</a>
            <a href="register.html" class="btn btn-primary">Sign Up</a>
        `;
        mobileAuth.innerHTML = `
            <a href="login.html" class="btn btn-login">Sign In</a>
            <a href="register.html" class="btn btn-primary">Sign Up</a>
        `;
    }
}

// Initialize
updateAuthUI();
