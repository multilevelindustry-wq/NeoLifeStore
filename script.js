document.getElementById('register').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.email === email)) {
        alert("Email is already in use! LOGIN NOW 👇👇👇");
        return;
    }

    const newUser = { email, firstName, lastName, username, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Send registration details to email (simulated)
    console.log(`Registration details sent to neolife247store@gmail.com: ${JSON.stringify(newUser)}`);
    alert("Registration successful! Use the Login button Below 👇👇 to get in");
});

document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();

    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === loginEmail && user.password === loginPassword);

    if (user) {
        alert("Login successful!");
        localStorage.setItem('lastActivity', Date.now()); // Update last activity time
        window.location.href = 'index.html'; // Redirect to index.html
    } else {
        alert("Invalid email or password!");
    }
});

// Logout after 10 minutes of inactivity
setInterval(() => {
    const lastActivity = localStorage.getItem('lastActivity');
    if (lastActivity && (Date.now() - lastActivity) > 699999) { // 10 minutes
        alert("You have been logged out due to inactivity.");
        localStorage.removeItem('lastActivity');
        window.location.href = 'login.html'; // Redirect to login page
    }
}, 699999); // Check every minute

// Update last activity time on user interaction
document.addEventListener('click', () => {
    localStorage.setItem('lastActivity', Date.now());
});
document.addEventListener('keypress', () => {
    localStorage.setItem('lastActivity', Date.now());
});


 // Password recovery functionality
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('forgotPassword').addEventListener('click', function() {
                const email = prompt("Please enter your registered email address:");
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const user = users.find(user => user.email === email);

                if (user) {
                    alert(`Your password is: ${user.password}`); // In a real application, do not expose passwords like this
                } else {
                    alert("Email not found!");
                }
            });
        });
        
        
