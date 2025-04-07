// auth.js
const Auth = {
    // Get all users from localStorage
    getUsers() {
        return JSON.parse(localStorage.getItem('users') || [];
    },

    // Register new user
    register(user) {
        const users = this.getUsers();
        if (users.some(u => u.email === user.email)) {
            throw new Error('User already exists');
        }
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    },

    // Login user
    login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => 
            u.email === email.toLowerCase().trim() && 
            u.password === password.trim()
        );
        if (!user) throw new Error('Invalid credentials');
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    },

    // Logout user
    logout() {
        sessionStorage.removeItem('currentUser');
    },

    // Get current user
    getCurrentUser() {
        return JSON.parse(sessionStorage.getItem('currentUser'));
    }
};

// Update authentication UI
function updateAuthUI() {
    const authButtons = document.getElementById('authButtons');
    if (!authButtons) return;

    const user = Auth.getCurrentUser();
    if (user) {
        authButtons.innerHTML = `
            <span class="welcome">Welcome, ${user.fullName}</span>
            <button class="btn btn-logout" onclick="Auth.logout(); window.location.reload()">Logout</button>
        `;
    } else {
        authButtons.innerHTML = `
            <a href="login.html" class="btn btn-login">Sign In</a>
            <a href="register.html" class="btn btn-primary">Sign Up</a>
        `;
    }
}