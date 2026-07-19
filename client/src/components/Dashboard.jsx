import { formatStatus, shortId } from '../utils';

function Dashboard({ services, customers }) {
  const pendingCount = services.filter(s => s.status === 'pending').length;
  const inProgressCount = services.filter(s => s.status === 'in-progress').length;
  const completedCount = services.filter(s => s.status === 'completed').length;

  // Services arrive newest-first from the API, so the first 5 are the most recent
  const recentServices = services.slice(0, 5);

  return (
    <section className="content-section">
      <h2>Dashboard</h2>
      <div className="dashboard-cards">
        <div className="card pending">
          <h3>Pending Services</h3>
          <div className="count">{pendingCount}</div>
        </div>
        <div className="card in-progress">
          <h3>In Progress</h3>
          <div className="count">{inProgressCount}</div>
        </div>
        <div className="card completed">
          <h3>Completed</h3>
          <div className="count">{completedCount}</div>
        </div>
        <div className="card">
          <h3>Total Customers</h3>
          <div className="count">{customers.length}</div>
        </div>
      </div>

      <h3>Recent Service Requests</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Service Type</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {recentServices.map(service => (
            <tr key={service._id}>
              <td>{shortId(service._id)}</td>
              <td>{service.customerName}</td>
              <td>{service.serviceType}</td>
              <td>{service.date}</td>
              <td><span className={`status-${service.status}`}>{formatStatus(service.status)}</span></td>
            </tr>
          ))}
          {recentServices.length === 0 && (
            <tr><td colSpan="5">No service requests yet</td></tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default Dashboard;
