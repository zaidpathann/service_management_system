import { useState } from 'react';
import { addCustomer } from '../api';

function AddCustomer({ onSuccess, showMessage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addCustomer({ name, email, phone, address });
      showMessage('Customer added successfully!', 'success');
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      onSuccess();
    } catch (err) {
      showMessage('Error: ' + err.message, 'error');
    }
  }

  return (
    <section className="content-section">
      <h2>Add New Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            className="form-control"
            id="address"
            rows="3"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn">Add Customer</button>
      </form>
    </section>
  );
}

export default AddCustomer;
