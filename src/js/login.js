if (localStorage.getItem('userSession')) {
    window.location.href = '/src/html/dashboard.html';
}

const emailInput = document.getElementById('login-email');
const passwordInput = document.getElementById('login-password');
const rememberCheckbox = document.getElementById('login-remember');
const errorMessage = document.getElementById('error-message');
const loginBtn = document.getElementById('login-btn');

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) {
        return 'Password must be at least 8 characters long';
    }
    if (!/\d/.test(password)) {
        return 'Password must contain at least 1 number';
    }
    return null;
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function hideError() {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
}

loginBtn.addEventListener('click', function() {
    hideError();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    if (!email) {
        showError('Please enter your email address');
        emailInput.focus();
        return;
    }
    
    if (!password) {
        showError('Please enter your password');
        passwordInput.focus();
        return;
    }
    
    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        emailInput.focus();
        return;
    }
    
    const passwordError = validatePassword(password);
    if (passwordError) {
        showError(passwordError);
        passwordInput.focus();
        return;
    }
    
    localStorage.setItem('userSession', JSON.stringify({
        email: email,
        loginTime: new Date().toISOString()
    }));
    
    if (rememberCheckbox.checked) {
        localStorage.setItem('rememberedEmail', email);
    }
    
    window.location.href = '/src/html/dashboard.html';
});

const rememberedEmail = localStorage.getItem('rememberedEmail');
if (rememberedEmail) {
    emailInput.value = rememberedEmail;
    rememberCheckbox.checked = true;
}