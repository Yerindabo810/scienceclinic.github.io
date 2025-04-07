document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('.header')) {
        const navHTML = `
        <header class="header">
            <div class="container">
                <div class="logo-container">
                    <img src="logo.jpg" alt="Science Clinic Uganda Logo" class="logo">
                    <div class="logo-text">
                        <h1>SCIENCE CLINIC UGANDA</h1>
                        <p>Advancing Science Education for All</p>
                    </div>
                </div>
                <nav class="nav">
                    <ul class="nav-list">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="resources.html">Resources</a></li>
                        <li><a href="contact.html">Contact</a></li>
                        <li class="auth-buttons">
                            <a href="login.html" class="btn btn-login">Sign In</a>
                            <a href="register.html" class="btn btn-primary">Sign Up</a>
                        </li>
                        // Inside the navigation HTML
<li class="auth-buttons">
    ${Auth.isAuthenticated() ? `
        <span class="welcome">Welcome, ${Auth.currentUser?.email}</span>
        <button class="btn btn-logout" onclick="Auth.logout()">Logout</button>
    ` : `
        <a href="login.html" class="btn btn-login">Sign In</a>
        <a href="register.html" class="btn btn-primary">Sign Up</a>
    `}
</li>
                    </ul>
                    <div class="mobile-menu-btn">
                        <i class="fas fa-bars"></i>
                    </div>
                </nav>
            </div>
        </header>`;
        
        document.body.insertAdjacentHTML('afterbegin', navHTML);
    }

    // Set active page
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('.nav-list a').forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    mobileMenuBtn?.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileMenuBtn.innerHTML = navList.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
});
