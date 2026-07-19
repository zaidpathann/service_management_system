function Header({ onNavigate }) {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">Service Management System</div>
          <nav>
            <ul>
              <li><a onClick={() => onNavigate('dashboard')}>Dashboard</a></li>
              <li><a onClick={() => onNavigate('all-services')}>Services</a></li>
              <li><a onClick={() => onNavigate('all-customers')}>Customers</a></li>
              <li><a onClick={() => onNavigate('reports')}>Reports</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
