SERVICE MANAGEMENT SYSTEM - SETUP INSTRUCTIONS

1. REQUIREMENTS:
   - XAMPP or WAMP server
   - Web browser

2. INSTALLATION STEPS:

   a) Install XAMPP:
      - Download from https://www.apachefriends.org/
      - Install and start Apache and MySQL

   b) Setup Database:
      - Open http://localhost/phpmyadmin
      - Create database named "service_management"
      - Import the SQL from Step 2 or run the SQL commands

   c) Copy Project Files:
      - Copy all files to: C:\xampp\htdocs\service-management-system\
      - Or to your web server root directory

   d) Access the System:
      - Open browser and go to: http://localhost/service-management-system/

3. HOW TO USE:

   a) Add Customers:
      - Click "Add New Customer" from sidebar
      - Fill the form and submit

   b) Add Services:
      - Click "Add New Service" from sidebar
      - Select customer and fill service details

   c) Manage Services:
      - View all services and update their status
      - Use Start, Complete, or Delete buttons

   d) View Reports:
      - Generate various reports from Reports section

4. FEATURES:

   - Customer Management
   - Service Request Management
   - Status Tracking (Pending, In Progress, Completed)
   - Priority System (Low, Medium, High)
   - Reporting System
   - Responsive Design

5. TROUBLESHOOTING:

   - Check if Apache and MySQL are running in XAMPP
   - Verify database connection in php/config.php
   - Check browser console for JavaScript errors
   - Ensure all PHP files are in the php/ folder