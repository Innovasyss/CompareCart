document.addEventListener('DOMContentLoaded', () => {
    const avatar = document.getElementById('avatar');
    const dropdown = document.getElementById('dropdown');

    // Function to get user data (replace with actual implementation)
    function getLoggedInUser() {
        // For demonstration, returning a mock user
        return { name: 'John Doe' }; 
    }

    // Set the avatar initial
    const user = getLoggedInUser();
    if (user && user.name) {
        avatar.textContent = user.name.charAt(0).toUpperCase();
    } else {
        avatar.textContent = 'G'; // Default letter
    }

    // Toggle dropdown on avatar click
    avatar.addEventListener('click', () => {
        dropdown.classList.toggle('show');
    });

    // Close dropdown if clicking outside
    window.addEventListener('click', (event) => {
        if (!avatar.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });

    // Logout functionality
    const logoutLink = Array.from(dropdown.getElementsByTagName('a')).find(a => a.textContent === 'Logout');
    
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof firebase !== 'undefined') {
                firebase.auth().signOut().then(() => {
                    window.location.href = 'index.html';
                }).catch((error) => {
                    console.error('Sign Out Error', error);
                });
            } else {
                window.location.href = 'index.html';
            }
        });
    }
});
