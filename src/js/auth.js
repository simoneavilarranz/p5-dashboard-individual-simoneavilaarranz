// auth.js

export async function loadCredentials() {
    try {
        const response = await fetch('/src/data/credentials.json');
        const credentials = await response.json();
        return credentials;
    } catch (error) {
        console.error('Error loading credentials:', error);
        return null;
    }
}

export function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export function validatePassword(password) {
    if (password.length < 8) {
        return 'Password must be at least 8 characters long';
    }
    if (!/\d/.test(password)) {
        return 'Password must contain at least 1 number';
    }
    return null;
}

export async function authenticateUser(email, password) {
    const credentials = await loadCredentials();
    
    if (!credentials) {
        return { success: false, error: 'Error loading credentials' };
    }
    
    if (!validateEmail(email)) {
        return { success: false, error: 'Please enter a valid email address' };
    }
    
    const passwordError = validatePassword(password);
    if (passwordError) {
        return { success: false, error: passwordError };
    }
    
    if (email === credentials.admin.email && password === credentials.admin.password) {
        return { success: true, user: { email: email, role: 'admin' } };
    }
    
    return { success: false, error: 'Invalid email or password' };
}

export function createUserSession(userData) {
    const sessionData = {
        ...userData,
        loginTime: new Date().toISOString()
    };
    localStorage.setItem('userSession', JSON.stringify(sessionData));
    return sessionData;
}

export function getUserSession() {
    const session = localStorage.getItem('userSession');
    return session ? JSON.parse(session) : null;
}

export function clearUserSession() {
    localStorage.removeItem('userSession');
}

export function isAuthenticated() {
    return !!getUserSession();
}