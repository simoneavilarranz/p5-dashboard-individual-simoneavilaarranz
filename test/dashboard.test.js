import { it, expect } from 'vitest';

const mockEmployee = {
    name: 'Alice Johnson',
    username: 'alicej',
    email: 'alice@example.com',
    phone: '123-456-7890',
    website: 'alice.com',
    address: {
        street: 'Oak Street',
        suite: 'Suite 100',
        city: 'Boston',
        zipcode: '02101',
        geo: { lat: '42.3601', lng: '-71.0589' }
    },
    company: {
        name: 'Tech Inc',
        catchPhrase: 'We innovate',
        bs: 'tech solutions'
    }
};

function createEmployeeCard(employee) {
    return {
        className: 'employee-card',
        tagName: 'DIV',
        innerHTML: `<h3>${employee.name}</h3>`
    };
}

function displayEmployees(employees, gallery) {
    gallery.innerHTML = '';
    if (employees.length === 0) {
        gallery.innerHTML = 'No employees found';
        return;
    }
}

it('crear employee-card', () => {
    const card = createEmployeeCard(mockEmployee);
    expect(card.className).toBe('employee-card');
    expect(card.tagName).toBe('DIV');
});

it('array vacio', () => {
    const gallery = { innerHTML: '' };
    displayEmployees([], gallery);
    expect(gallery.innerHTML).toBe('No employees found');
});

it('filtrar por letra', () => {
    const employees = [
        { ...mockEmployee, name: 'Alice Johnson' },
        { ...mockEmployee, name: 'Anna White' },
        { ...mockEmployee, name: 'Bob Smith' }
    ];
    
    const filtered = employees.filter(e => e.name.charAt(0).toUpperCase() === 'A');
    
    expect(filtered.length).toBe(2);
    expect(filtered[0].name).toBe('Alice Johnson');
    expect(filtered[1].name).toBe('Anna White');
});