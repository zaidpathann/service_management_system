import { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AddService from './components/AddService';
import AddCustomer from './components/AddCustomer';
import AllServices from './components/AllServices';
import AllCustomers from './components/AllCustomers';
import Reports from './components/Reports';
import { getCustomers, getServices } from './api';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [statusFilter, setStatusFilter] = useState('all');
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState(null);
  const messageTimer = useRef(null);

  const loadData = useCallback(async () => {
    try {
      const [customersData, servicesData] = await Promise.all([
        getCustomers(),
        getServices()
      ]);
      setCustomers(customersData);
      setServices(servicesData);
    } catch (err) {
      console.error('Error loading data:', err);
      showMessage('Error loading data. Is the server running?', 'error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function showMessage(text, type) {
    clearTimeout(messageTimer.current);
    setMessage({ text, type });
    messageTimer.current = setTimeout(() => setMessage(null), 4000);
  }

  function navigate(section) {
    setActiveSection(section);
    if (section === 'all-services') setStatusFilter('all');
  }

  function filterServices(status) {
    setStatusFilter(status);
    setActiveSection('all-services');
  }

  // After a successful add, go back to the dashboard (same flow as the original app)
  function handleAddSuccess() {
    loadData();
    setActiveSection('dashboard');
  }

  return (
    <>
      <Header onNavigate={navigate} />

      <div className="container">
        <div className="main-content">
          <Sidebar onNavigate={navigate} onFilter={filterServices} />

          <main className="content">
            {message && (
              <div className={`message-banner ${message.type}`}>{message.text}</div>
            )}

            {activeSection === 'dashboard' && (
              <Dashboard services={services} customers={customers} />
            )}
            {activeSection === 'add-service' && (
              <AddService
                customers={customers}
                onSuccess={handleAddSuccess}
                showMessage={showMessage}
              />
            )}
            {activeSection === 'add-customer' && (
              <AddCustomer onSuccess={handleAddSuccess} showMessage={showMessage} />
            )}
            {activeSection === 'all-services' && (
              <AllServices
                services={services}
                statusFilter={statusFilter}
                onDataChange={loadData}
                showMessage={showMessage}
              />
            )}
            {activeSection === 'all-customers' && (
              <AllCustomers customers={customers} services={services} />
            )}
            {activeSection === 'reports' && (
              <Reports services={services} />
            )}
          </main>
        </div>
      </div>

      <footer>
        <div className="container">
          <p>&copy; 2023 Service Management System | College Project</p>
        </div>
      </footer>
    </>
  );
}

export default App;
