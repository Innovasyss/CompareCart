// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCTqKIqS_11BzwNQA-fJEIWYJnOz9kCaSc",
    authDomain: "comparecart-53ddf.firebaseapp.com",
    projectId: "comparecart-53ddf",
    storageBucket: "comparecart-53ddf.appspot.com",
    messagingSenderId: "28060506802",
    appId: "1:28060506802:web:6ff34560c34a2087c207ab"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Set up our register function
function register() {
    // Get all our input fields
    const email = document.getElementById('register_email').value;
    const password = document.getElementById('register_password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const fullName = document.getElementById('full_name').value;
    const age = document.getElementById('age').value;

    // Validate input fields
    if (validate_email(email) === false || validate_password(password) === false) {
        alert('Email or Password is Outta Line!!');
        return;
    }
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    if (validate_field(fullName) === false || validate_field(age) === false) {
        alert('One or More Extra Fields is Outta Line!!');
        return;
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser;

            // Add this user to Firebase Database
            var database_ref = database.ref();

            // Create User data
            var user_data = {
                email: email,
                full_name: fullName,
                age: age,
                last_login: Date.now()
            };

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data);

            // Done
            alert('User Created!!');

            // Redirect to main.html
            window.location.href = 'main.html';

        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code;
            var error_message = error.message;

            alert(error_message);
        });
}

// Set up our login function
function login() {
    // Get all our input fields
    const email = document.getElementById('login_email').value;
    const password = document.getElementById('login_password').value;

    // Validate input fields
    if (validate_email(email) === false || validate_password(password) === false) {
        alert('Email or Password is Outta Line!!');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser;

            // Update user last login time
            var database_ref = database.ref();
            var user_data = {
                last_login: Date.now()
            };

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).update(user_data);

            // Done
            alert('User Logged In!!');

            // Redirect to main.html
            window.location.href = 'main.html';

        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code;
            var error_message = error.message;

            alert(error_message);
        });
}

// Validate Functions
function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    return password.length >= 6;
}

function validate_field(field) {
    return field != null && field.length > 0;
}

// Toggle between forms
function showLogin() {
    document.getElementById('login_form').style.display = 'block';
    document.getElementById('register_form').style.display = 'none';
    document.getElementById('login_tab').classList.add('active');
    document.getElementById('register_tab').classList.remove('active');
}

function showRegister() {
    document.getElementById('login_form').style.display = 'none';
    document.getElementById('register_form').style.display = 'block';
    document.getElementById('login_tab').classList.remove('active');
    document.getElementById('register_tab').classList.add('active');
}

// Set default view to registration
document.addEventListener('DOMContentLoaded', () => {
    showRegister();
});
