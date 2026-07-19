function Sidebar({ onNavigate, onFilter }) {
  return (
    <aside className="sidebar">
      <h3>Quick Actions</h3>
      <ul>
        <li><a onClick={() => onNavigate('add-service')}>Add New Service</a></li>
        <li><a onClick={() => onNavigate('add-customer')}>Add New Customer</a></li>
        <li><a onClick={() => onNavigate('all-services')}>View All Services</a></li>
        <li><a onClick={() => onNavigate('all-customers')}>View All Customers</a></li>
      </ul>

      <h3>Service Status</h3>
      <ul>
        <li><a onClick={() => onFilter('all')}>All Services</a></li>
        <li><a onClick={() => onFilter('pending')}>Pending</a></li>
        <li><a onClick={() => onFilter('in-progress')}>In Progress</a></li>
        <li><a onClick={() => onFilter('completed')}>Completed</a></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
