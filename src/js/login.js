import { authenticateUser, createUserSession, isAuthenticated } from './auth.js';

if (isAuthenticated()) {
    window.location.href = '/src/html/dashboard.html';
}

const emailInput = document.getElementById('login-email');
const passwordInput = document.getElementById('login-password');
const rememberCheckbox = document.getElementById('login-remember');
const errorMessage = document.getElementById('error-message');
const loginBtn = document.getElementById('login-btn');

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function hideError() {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
}

loginBtn.addEventListener('click', async function() {
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
    
    loginBtn.disabled = true;
    loginBtn.textContent = 'Logging in...';
    
    try {
        const authResult = await authenticateUser(email, password);
        
        if (authResult.success) {
            createUserSession(authResult.user);
            
            if (rememberCheckbox.checked) {
                localStorage.setItem('rememberedEmail', email);
            }
            
            window.location.href = '/src/html/dashboard.html';
        } else {
            showError(authResult.error);
        }
    } catch (error) {
        showError('An error occurred during authentication');
        console.error('Authentication error:', error);
    } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = 'Log in';
    }
});

const rememberedEmail = localStorage.getItem('rememberedEmail');
if (rememberedEmail) {
    emailInput.value = rememberedEmail;
    rememberCheckbox.checked = true;
}