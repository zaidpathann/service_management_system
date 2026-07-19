import { updateServiceStatus, deleteService } from '../api';
import { formatStatus, formatPriority, shortId } from '../utils';

function AllServices({ services, statusFilter, onDataChange, showMessage }) {
  const filteredServices = statusFilter === 'all'
    ? services
    : services.filter(s => s.status === statusFilter);

  async function handleStatusChange(id, newStatus) {
    try {
      await updateServiceStatus(id, newStatus);
      showMessage(`Service status updated to ${formatStatus(newStatus)}`, 'success');
      onDataChange();
    } catch (err) {
      showMessage('Error: ' + err.message, 'error');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await deleteService(id);
      showMessage('Service deleted successfully', 'success');
      onDataChange();
    } catch (err) {
      showMessage('Error: ' + err.message, 'error');
    }
  }

  return (
    <section className="content-section">
      <h2>All Service Requests{statusFilter !== 'all' ? ` — ${formatStatus(statusFilter)}` : ''}</h2>
      <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Service Type</th>
            <th>Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map(service => (
            <tr key={service._id}>
              <td>{shortId(service._id)}</td>
              <td>{service.customerName}</td>
              <td>{service.serviceType}</td>
              <td>{service.date}</td>
              <td>{formatPriority(service.priority)}</td>
              <td><span className={`status-${service.status}`}>{formatStatus(service.status)}</span></td>
              <td>
                <div className="action-buttons">
                  <button className="btn btn-success" onClick={() => handleStatusChange(service._id, 'in-progress')}>Start</button>
                  <button className="btn" onClick={() => handleStatusChange(service._id, 'completed')}>Complete</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(service._id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
          {filteredServices.length === 0 && (
            <tr><td colSpan="7">No services found</td></tr>
          )}
        </tbody>
      </table>
      </div>
    </section>
  );
}

export default AllServices;
