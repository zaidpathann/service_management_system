// Base URL for PHP files
const BASE_URL = 'php/';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Show dashboard by default
    showSection('dashboard');
    
    // Set up form event listeners
    document.getElementById('service-form').addEventListener('submit', addService);
    document.getElementById('customer-form').addEventListener('submit', addCustomer);
});

// Show/hide sections
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
    
    // Update data if needed
    if (sectionId === 'dashboard') {
        updateDashboardCounts();
        loadRecentServices();
    } else if (sectionId === 'all-services') {
        loadAllServices();
    } else if (sectionId === 'all-customers') {
        loadAllCustomers();
    } else if (sectionId === 'add-service') {
        loadCustomersForDropdown();
    }
}

// Load customers for dropdown
function loadCustomersForDropdown() {
    fetch(BASE_URL + 'get_customers.php')
        .then(response => response.json())
        .then(data => {
            const customerDropdown = document.getElementById('customer');
            customerDropdown.innerHTML = '<option value="">Select Customer</option>';
            
            data.forEach(customer => {
                const option = document.createElement('option');
                option.value = customer.id;
                option.textContent = customer.name;
                customerDropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error loading customers:', error));
}

// Add new service
function addService(e) {
    e.preventDefault();
    
    const customerId = document.getElementById('customer').value;
    const serviceType = document.getElementById('service-type').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    
    const formData = new FormData();
    formData.append('customer_id', customerId);
    formData.append('service_type', serviceType);
    formData.append('description', description);
    formData.append('priority', priority);
    
    fetch(BASE_URL + 'add_service.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Service request added successfully!');
            document.getElementById('service-form').reset();
            showSection('dashboard');
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error adding service request');
    });
}

// Add new customer
function addCustomer(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    
    fetch(BASE_URL + 'add_customer.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Customer added successfully!');
            document.getElementById('customer-form').reset();
            showSection('dashboard');
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error adding customer');
    });
}

// Update dashboard counts
function updateDashboardCounts() {
    fetch(BASE_URL + 'get_services.php')
        .then(response => response.json())
        .then(services => {
            const pendingCount = services.filter(s => s.status === 'pending').length;
            const inProgressCount = services.filter(s => s.status === 'in-progress').length;
            const completedCount = services.filter(s => s.status === 'completed').length;
            
            document.getElementById('pending-count').textContent = pendingCount;
            document.getElementById('in-progress-count').textContent = inProgressCount;
            document.getElementById('completed-count').textContent = completedCount;
        })
        .catch(error => console.error('Error loading services:', error));
    
    fetch(BASE_URL + 'get_customers.php')
        .then(response => response.json())
        .then(customers => {
            document.getElementById('total-customers').textContent = customers.length;
        })
        .catch(error => console.error('Error loading customers:', error));
}

// Load recent services
function loadRecentServices() {
    fetch(BASE_URL + 'get_services.php')
        .then(response => response.json())
        .then(services => {
            const recentServicesBody = document.getElementById('recent-services-body');
            recentServicesBody.innerHTML = '';
            
            // Get recent services (last 5)
            const recentServices = services.slice(-5).reverse();
            
            recentServices.forEach(service => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${service.id}</td>
                    <td>${service.customer_name}</td>
                    <td>${service.service_type}</td>
                    <td>${service.date}</td>
                    <td><span class="status-${service.status}">${formatStatus(service.status)}</span></td>
                `;
                
                recentServicesBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error loading services:', error));
}

// Load all services
function loadAllServices() {
    fetch(BASE_URL + 'get_services.php')
        .then(response => response.json())
        .then(services => {
            const servicesBody = document.getElementById('services-body');
            servicesBody.innerHTML = '';
            
            services.forEach(service => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${service.id}</td>
                    <td>${service.customer_name}</td>
                    <td>${service.service_type}</td>
                    <td>${service.date}</td>
                    <td>${formatPriority(service.priority)}</td>
                    <td><span class="status-${service.status}">${formatStatus(service.status)}</span></td>
                    <td>
                        <button class="btn btn-success" onclick="updateServiceStatus(${service.id}, 'in-progress')">Start</button>
                        <button class="btn" onclick="updateServiceStatus(${service.id}, 'completed')">Complete</button>
                        <button class="btn btn-danger" onclick="deleteService(${service.id})">Delete</button>
                    </td>
                `;
                
                servicesBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error loading services:', error));
}

// Load all customers
function loadAllCustomers() {
    Promise.all([
        fetch(BASE_URL + 'get_customers.php').then(r => r.json()),
        fetch(BASE_URL + 'get_services.php').then(r => r.json())
    ])
    .then(([customers, services]) => {
        const customersBody = document.getElementById('customers-body');
        customersBody.innerHTML = '';
        
        customers.forEach(customer => {
            const customerServices = services.filter(s => s.customer_id == customer.id);
            
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>${customerServices.length}</td>
                <td>
                    <button class="btn" onclick="viewCustomerDetails(${customer.id})">View</button>
                </td>
            `;
            
            customersBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error loading data:', error));
}

// Update service status
function updateServiceStatus(serviceId, newStatus) {
    const formData = new FormData();
    formData.append('service_id', serviceId);
    formData.append('status', newStatus);
    
    fetch(BASE_URL + 'update_service.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`Service status updated to ${formatStatus(newStatus)}`);
            loadAllServices();
            loadRecentServices();
            updateDashboardCounts();
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error updating service status');
    });
}

// Delete service
function deleteService(serviceId) {
    if (confirm('Are you sure you want to delete this service?')) {
        const formData = new FormData();
        formData.append('service_id', serviceId);
        
        fetch(BASE_URL + 'delete_service.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Service deleted successfully');
                loadAllServices();
                loadRecentServices();
                updateDashboardCounts();
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error deleting service');
        });
    }
}

// View customer details
function viewCustomerDetails(customerId) {
    Promise.all([
        fetch(BASE_URL + 'get_customers.php').then(r => r.json()),
        fetch(BASE_URL + 'get_services.php').then(r => r.json())
    ])
    .then(([customers, services]) => {
        const customer = customers.find(c => c.id == customerId);
        const customerServices = services.filter(s => s.customer_id == customerId);
        
        let details = `Customer Details:\n\n`;
        details += `Name: ${customer.name}\n`;
        details += `Email: ${customer.email}\n`;
        details += `Phone: ${customer.phone}\n`;
        details += `Address: ${customer.address}\n\n`;
        details += `Service History (${customerServices.length}):\n`;
        
        customerServices.forEach(service => {
            details += `- ${service.service_type} (${formatStatus(service.status)}) - ${service.date}\n`;
        });
        
        alert(details);
    })
    .catch(error => console.error('Error loading data:', error));
}

// Filter services by status
function filterServices(status) {
    showSection('all-services');
    
    fetch(BASE_URL + 'get_services.php')
        .then(response => response.json())
        .then(services => {
            const servicesBody = document.getElementById('services-body');
            servicesBody.innerHTML = '';
            
            let filteredServices = services;
            
            if (status !== 'all') {
                filteredServices = services.filter(s => s.status === status);
            }
            
            filteredServices.forEach(service => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${service.id}</td>
                    <td>${service.customer_name}</td>
                    <td>${service.service_type}</td>
                    <td>${service.date}</td>
                    <td>${formatPriority(service.priority)}</td>
                    <td><span class="status-${service.status}">${formatStatus(service.status)}</span></td>
                    <td>
                        <button class="btn btn-success" onclick="updateServiceStatus(${service.id}, 'in-progress')">Start</button>
                        <button class="btn" onclick="updateServiceStatus(${service.id}, 'completed')">Complete</button>
                        <button class="btn btn-danger" onclick="deleteService(${service.id})">Delete</button>
                    </td>
                `;
                
                servicesBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error loading services:', error));
}

// Generate reports
function generateReport() {
    const reportType = document.getElementById('report-type').value;
    const reportContent = document.getElementById('report-content');
    
    fetch(BASE_URL + 'get_services.php')
        .then(response => response.json())
        .then(services => {
            let reportHTML = '';
            
            if (reportType === 'services-by-status') {
                const statusCounts = {
                    'pending': services.filter(s => s.status === 'pending').length,
                    'in-progress': services.filter(s => s.status === 'in-progress').length,
                    'completed': services.filter(s => s.status === 'completed').length
                };
                
                reportHTML = `
                    <h3>Services by Status</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Count</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pending</td>
                                <td>${statusCounts.pending}</td>
                                <td>${services.length > 0 ? ((statusCounts.pending / services.length) * 100).toFixed(2) : 0}%</td>
                            </tr>
                            <tr>
                                <td>In Progress</td>
                                <td>${statusCounts['in-progress']}</td>
                                <td>${services.length > 0 ? ((statusCounts['in-progress'] / services.length) * 100).toFixed(2) : 0}%</td>
                            </tr>
                            <tr>
                                <td>Completed</td>
                                <td>${statusCounts.completed}</td>
                                <td>${services.length > 0 ? ((statusCounts.completed / services.length) * 100).toFixed(2) : 0}%</td>
                            </tr>
                        </tbody>
                    </table>
                `;
            } else if (reportType === 'services-by-priority') {
                const priorityCounts = {
                    'low': services.filter(s => s.priority === 'low').length,
                    'medium': services.filter(s => s.priority === 'medium').length,
                    'high': services.filter(s => s.priority === 'high').length
                };
                
                reportHTML = `
                    <h3>Services by Priority</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Priority</th>
                                <th>Count</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Low</td>
                                <td>${priorityCounts.low}</td>
                                <td>${services.length > 0 ? ((priorityCounts.low / services.length) * 100).toFixed(2) : 0}%</td>
                            </tr>
                            <tr>
                                <td>Medium</td>
                                <td>${priorityCounts.medium}</td>
                                <td>${services.length > 0 ? ((priorityCounts.medium / services.length) * 100).toFixed(2) : 0}%</td>
                            </tr>
                            <tr>
                                <td>High</td>
                                <td>${priorityCounts.high}</td>
                                <td>${services.length > 0 ? ((priorityCounts.high / services.length) * 100).toFixed(2) : 0}%</td>
                            </tr>
                        </tbody>
                    </table>
                `;
            } else if (reportType === 'services-by-month') {
                // Group services by month
                const monthlyCounts = {};
                
                services.forEach(service => {
                    const month = service.date.substring(0, 7); // YYYY-MM format
                    
                    if (!monthlyCounts[month]) {
                        monthlyCounts[month] = 0;
                    }
                    
                    monthlyCounts[month]++;
                });
                
                reportHTML = `
                    <h3>Services by Month</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                
                for (const month in monthlyCounts) {
                    reportHTML += `
                        <tr>
                            <td>${month}</td>
                            <td>${monthlyCounts[month]}</td>
                        </tr>
                    `;
                }
                
                reportHTML += `
                        </tbody>
                    </table>
                `;
            }
            
            reportContent.innerHTML = reportHTML;
        })
        .catch(error => {
            console.error('Error loading services:', error);
            reportContent.innerHTML = '<p>Error generating report</p>';
        });
}

// Helper functions
function formatStatus(status) {
    const statusMap = {
        'pending': 'Pending',
        'in-progress': 'In Progress',
        'completed': 'Completed'
    };
    
    return statusMap[status] || status;
}

function formatPriority(priority) {
    const priorityMap = {
        'low': 'Low',
        'medium': 'Medium',
        'high': 'High'
    };
    
    return priorityMap[priority] || priority;
}