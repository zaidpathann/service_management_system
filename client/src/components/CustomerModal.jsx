import { formatStatus } from '../utils';

function CustomerModal({ customer, services, onClose }) {
  if (!customer) return null;

  const customerServices = services.filter(s => s.customer === customer._id);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Phone:</strong> {customer.phone}</p>
        <p><strong>Address:</strong> {customer.address}</p>

        <h3>Service History ({customerServices.length})</h3>
        {customerServices.length > 0 ? (
          <ul style={{ paddingLeft: '20px' }}>
            {customerServices.map(service => (
              <li key={service._id}>
                {service.serviceType} ({formatStatus(service.status)}) — {service.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No services yet</p>
        )}

        <button className="btn modal-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default CustomerModal;
