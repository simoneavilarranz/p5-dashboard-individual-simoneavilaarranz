import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('login tests', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <input id="login-email" value="" />
            <input id="login-password" value="" />
            <input type="checkbox" id="login-remember" />
            <div id="error-message" style="display: none"></div>
            <button id="login-btn">Login</button>
        `;
        
        const store = {};
        global.localStorage = {
            getItem: vi.fn((key) => store[key] || null),
            setItem: vi.fn((key, value) => {
                store[key] = value;
            }),
            removeItem: vi.fn((key) => {
                delete store[key];
            }),
            clear: vi.fn(() => {
                Object.keys(store).forEach(key => delete store[key]);
            })
        };
        
        delete window.location;
        window.location = { href: '' };
    });

    describe('validacion de email', () => {
        it('sin @', () => {
            const emailInput = document.getElementById('login-email');
            const loginBtn = document.getElementById('login-btn');
            const errorDiv = document.getElementById('error-message');
            
            emailInput.value = 'testexample.com'; 
            
            loginBtn.click();
            
            expect(errorDiv.textContent).toBe('Please enter a valid email address');
            expect(errorDiv.style.display).toBe('block');
        });

        it('con espacios', () => {
            const emailInput = document.getElementById('login-email');
            const loginBtn = document.getElementById('login-btn');
            const errorDiv = document.getElementById('error-message');
            
            emailInput.value = 'test @example.com'; 
            
            loginBtn.click();
            
            expect(errorDiv.textContent).toBe('Please enter a valid email address');
            expect(errorDiv.style.display).toBe('block');
        });

        it('email valido', () => {
            const emailInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');
            const loginBtn = document.getElementById('login-btn');
            const errorDiv = document.getElementById('error-message');
            
            emailInput.value = 'test@example.com';
            passwordInput.value = 'password1'; 
            
            loginBtn.click();
            
            expect(errorDiv.style.display).toBe('none');
            expect(localStorage.setItem).toHaveBeenCalledWith(
                'userSession',
                expect.any(String)
            );
        });
    });

    describe('valida', () => {
        it('contraseña valida', () => {
            const emailInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');
            const loginBtn = document.getElementById('login-btn');
            const errorDiv = document.getElementById('error-message');
            
            emailInput.value = 'test@example.com';
            passwordInput.value = 'securepass1'; 
            
            loginBtn.click();
            
            expect(errorDiv.style.display).toBe('none');
            expect(localStorage.setItem).toHaveBeenCalledWith(
                'userSession',
                expect.any(String)
            );
        });

        it('sin numero', () => {
            const emailInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');
            const loginBtn = document.getElementById('login-btn');
            const errorDiv = document.getElementById('error-message');
            
            emailInput.value = 'test@example.com';
            passwordInput.value = 'password';
            
            loginBtn.click();
            
            expect(errorDiv.textContent).toBe('Password must contain at least 1 number');
            expect(errorDiv.style.display).toBe('block');
        });

        it('menos de 8 caracteres', () => {
            const emailInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');
            const loginBtn = document.getElementById('login-btn');
            const errorDiv = document.getElementById('error-message');
            
            emailInput.value = 'test@example.com';
            passwordInput.value = 'pass1'; 
            
            loginBtn.click();
            
            expect(errorDiv.textContent).toBe('Password must be at least 8 characters long');
            expect(errorDiv.style.display).toBe('block');
        });
    });

    describe('localStorage', () => {
        it('deberia crear sesion en localStorage con login exitoso', () => {
            const emailInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');
            const loginBtn = document.getElementById('login-btn');
            
            const testEmail = 'test@example.com';
            emailInput.value = testEmail;
            passwordInput.value = 'password1';
            
            loginBtn.click();
            
            expect(localStorage.setItem).toHaveBeenCalledWith(
                'userSession',
                expect.any(String)
            );
            
            const sessionCall = localStorage.setItem.mock.calls.find(
                call => call[0] === 'userSession'
            );
            const sessionData = JSON.parse(sessionCall[1]);
            
            expect(sessionData.email).toBe(testEmail);
            expect(sessionData.loginTime).toBeDefined();
            expect(new Date(sessionData.loginTime)).toBeInstanceOf(Date);
        });
    });
});