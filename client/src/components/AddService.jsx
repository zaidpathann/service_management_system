import { useState } from 'react';
import { addService } from '../api';

function AddService({ customers, onSuccess, showMessage }) {
  const [customerId, setCustomerId] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addService({ customerId, serviceType, description, priority });
      showMessage('Service request added successfully!', 'success');
      setCustomerId('');
      setServiceType('');
      setDescription('');
      setPriority('low');
      onSuccess();
    } catch (err) {
      showMessage('Error: ' + err.message, 'error');
    }
  }

  return (
    <section className="content-section">
      <h2>Add New Service Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customer">Customer</label>
          <select
            className="form-control"
            id="customer"
            value={customerId}
            onChange={e => setCustomerId(e.target.value)}
            required
          >
            <option value="">Select Customer</option>
            {customers.map(customer => (
              <option key={customer._id} value={customer._id}>{customer.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="service-type">Service Type</label>
          <input
            type="text"
            className="form-control"
            id="service-type"
            value={serviceType}
            onChange={e => setServiceType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="4"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            className="form-control"
            id="priority"
            value={priority}
            onChange={e => setPriority(e.target.value)}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit" className="btn">Submit Service Request</button>
      </form>
    </section>
  );
}

export default AddService;
