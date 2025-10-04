// Example product data (you can expand with all products)
const products = [
  { name: "Short Sleeve T-shirts", link: "770605.html", image: "Screenshot_20250928-113441.png", price: "$15.69" },
  { name: "Men's New Racing", link: "770590.html", image: "Screenshot_20250928-113907.png", price: "$21.26" },
  { name: "$20 discount on women fashion", link: "womencloth.html"},
  { name: "Round Neck T-shirts", link: "770604.html", image: "Screenshot_20250928-120506.png", price: "$18.69" },
  { name: "Men's Casual T-shirts", link: "770603.html", image: "Screenshot_20250928-120532.png", price: "$17.99" },
  { name: "Round Neck Casual", link: "770602.html", image: "Screenshot_20250928-124029.png", price: "$18.79" },
  { name: "Men's Fashion T-shirts", link: "770601.html", image: "Screenshot_20250928-124430.png", price: "$14.89" },
  { name: "Party Ruffle Sleeve", link: "770636.html", image: "1758348599198.png", price: "$18.53" },
  { name: "Flower Patchwork Wears", link: "770649.html", image: "1758293484173.png", price: "$12.47" }
  // ➝ Keep adding all products from your site
];

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  searchResults.innerHTML = "";

  if (query.length > 0) {
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));

    if (filtered.length > 0) {
      filtered.forEach(p => {
        const item = document.createElement("a");
        item.href = p.link;
        item.innerHTML = `
          ${p.name} 
        `;
        searchResults.appendChild(item);
      });
    } else {
      searchResults.innerHTML = "<p style='padding:8px;'>No results found</p>";
    }

    searchResults.style.display = "block";
  } else {
    searchResults.style.display = "none";
  }
});





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
    if (lastActivity && (Date.now() - lastActivity) > 100000) { // 10 minutes
        alert("You have been logged out due to inactivity.");
        localStorage.removeItem('lastActivity');
        window.location.href = 'login.html'; // Redirect to login page
    }
}, 100000); // Check every minute

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
        


        function showAd(adId) {
        document.getElementById(adId).style.display = 'flex';
    }

    function closeAd(adId) {
        document.getElementById(adId).style.display = 'none';
    }

    window.onload = function() {
        setTimeout(() => showAd('ad1'), 3000);
        setTimeout(() => showAd('ad2'), 6000);
        setTimeout(() => showAd('ad3'), 9000);
    };




