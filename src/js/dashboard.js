import { isAuthenticated, clearUserSession } from './auth.js';

if (!isAuthenticated()) {
    window.location.href = '/index.html';
}

document.getElementById('logout-link').addEventListener('click', function(e) {
    e.preventDefault();
    clearUserSession();
    window.location.href = '/index.html';
});

const dashboardGallery = document.querySelector('.dashboard-gallery');
const filterButtons = document.querySelectorAll('.filters-btn');

let allEmployees = [];

async function fetchEmployees() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        allEmployees = users;
        displayEmployees(users);
    } catch (error) {
        console.error('Error fetching employees:', error);
        dashboardGallery.innerHTML = '<p>Error loading employees</p>';
    }
}

function createEmployeeCard(employee) {
    const card = document.createElement('div');
    card.className = 'employee-card';
    
    card.innerHTML = `
        <h3>${employee.name}</h3>
        <div class="employee-info">
            <p><strong>Username:</strong> ${employee.username}</p>
            <p><strong>Email:</strong> ${employee.email}</p>
            <p><strong>Phone:</strong> ${employee.phone}</p>
            <p><strong>Website:</strong> ${employee.website}</p>
            <p><strong>Street:</strong> ${employee.address.street}</p>
            <p><strong>Suite:</strong> ${employee.address.suite}</p>
            <p><strong>City:</strong> ${employee.address.city}</p>
            <p><strong>Zipcode:</strong> ${employee.address.zipcode}</p>
            <p><strong>Lat:</strong> ${employee.address.geo.lat}</p>
            <p><strong>Lng:</strong> ${employee.address.geo.lng}</p>
            <p><strong>Company:</strong> ${employee.company.name}</p>
            <p><strong>Catch Phrase:</strong> ${employee.company.catchPhrase}</p>
            <p><strong>BS:</strong> ${employee.company.bs}</p>
        </div>
    `;
    
    return card;
}

function displayEmployees(employees) {
    dashboardGallery.innerHTML = '';
    
    if (employees.length === 0) {
        dashboardGallery.innerHTML = '<p class="no-results">No employees found</p>';
        return;
    }
    
    employees.forEach(employee => {
        const card = createEmployeeCard(employee);
        dashboardGallery.appendChild(card);
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.textContent;
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        if (filter === 'All employees') {
            displayEmployees(allEmployees);
        } else {
            const filteredEmployees = allEmployees.filter(employee => 
                employee.name.charAt(0).toUpperCase() === filter
            );
            displayEmployees(filteredEmployees);
        }
    });
});

fetchEmployees();