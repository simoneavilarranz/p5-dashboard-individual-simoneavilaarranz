import { it, expect, beforeEach, vi } from 'vitest';

const localStorageMock = (() => {
    let store = {};
    return {
        getItem: vi.fn((key) => store[key] || null),
        setItem: vi.fn((key, value) => {
            store[key] = value.toString();
        }),
        removeItem: vi.fn((key) => {
            delete store[key];
        }),
        clear: vi.fn(() => {
            store = {};
        })
    };
})();

Object.defineProperty(global, 'localStorage', {
    value: localStorageMock
});

beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
});

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

function createUserSession(email) {
    const sessionData = {
        email: email,
        loginTime: new Date().toISOString()
    };
    localStorage.setItem('userSession', JSON.stringify(sessionData));
    return sessionData;
}

it('email espacios en blanco', () => {
    expect(validateEmail('usuario @email.com')).toBe(false);
});

it('email sin @', () => {
    expect(validateEmail('usuarioemail.com')).toBe(false);
});

it('email vacio', () => {
    expect(validateEmail('')).toBe(false);
});

it('email valido', () => {
    expect(validateEmail('usuario@email.com')).toBe(true);
});

it('contraseña menos 8 caracteres', () => {
    const resultado = validatePassword('abc1');
    expect(resultado).toBe('Password must be at least 8 characters long');
});

it('contraseña sin numero', () => {
    const resultado = validatePassword('abcdefgh');
    expect(resultado).toBe('Password must contain at least 1 number');
});

it('contraseña vacia', () => {
    const resultado = validatePassword('');
    expect(resultado).toBe('Password must be at least 8 characters long');
});

it('contraseña valida', () => {
    expect(validatePassword('password1')).toBe(null);
});

it('sesion en localStorage', () => {
    const email = 'usuario@test.com';
    createUserSession(email);
    
    expect(localStorage.setItem).toHaveBeenCalledWith(
        'userSession',
        expect.any(String)
    );
    
    const sessionData = JSON.parse(localStorage.setItem.mock.calls[0][1]);
    expect(sessionData.email).toBe(email);
    expect(sessionData).toHaveProperty('loginTime');
});