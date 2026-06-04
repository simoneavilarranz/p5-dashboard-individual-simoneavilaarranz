import { describe, it, expect, beforeEach, vi } from 'vitest';
import { validateEmail, validatePassword, createUserSession } from '/src/js/login.js';

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

describe('validacion email', () => {
        it('espacios', () => {
            expect(validateEmail('usuario @email.com')).toBe(false);
            expect(validateEmail(' usuario@email.com')).toBe(false);
            expect(validateEmail('usuario@email.com ')).toBe(false);
        });

        it('sin @', () => {
            expect(validateEmail('usuarioemail.com')).toBe(false);
            expect(validateEmail('usuario.email.com')).toBe(false);
        });

        it('vacio', () => {
            expect(validateEmail('')).toBe(false);
            expect(validateEmail(' ')).toBe(false);
        });
  
        it('email valido', () => {
            expect(validateEmail('usuario@email.com')).toBe(true);
            expect(validateEmail('usuario.nombre@email.com')).toBe(true);
            expect(validateEmail('usuario+test@email.co.uk')).toBe(true);
        });
    });

describe('validacion contraseña', () => {
        it('contraseña valida', () => {
            expect(validatePassword('abcd1234')).toBe(null);
            expect(validatePassword('12345678')).toBe(null);
            expect(validatePassword('password1')).toBe(null);
        });
        it('sin numeros', () => {
            const resultado = validatePassword('abcdefgh');
            expect(resultado).toBe('Password must contain at least 1 number');
            });
        });
        it('menos de 8', () => {
            const resultado = validatePassword('abcde12');
            expect(resultado).toBe('Password must be at least 8 characters long');
        });

        it('vacia', () => {
                const resultado = validatePassword('');
                expect(resultado).toBe('Password must be at least 8 characters long');
        });

describe('sesion en localStorage', () => {
    const testEmail = 'usuario@test.com';

    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('crear sesion', () => {
        createUserSession(testEmail);
        
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'userSession',
            expect.any(String)
        );
    });
});