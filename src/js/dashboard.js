import { isAuthenticated, clearUserSession } from './auth.js';

if (!isAuthenticated()) {
    window.location.href = '/index.html';
}

document.getElementById('logout-link').addEventListener('click', function(e) {
    e.preventDefault();
    clearUserSession();
    window.location.href = '/index.html';
});