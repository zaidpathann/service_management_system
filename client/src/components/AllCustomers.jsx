import { useState } from 'react';
import CustomerModal from './CustomerModal';
import { shortId } from '../utils';

function AllCustomers({ customers, services }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  return (
    <section className="content-section">
      <h2>All Customers</h2>
      <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Services</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => {
            const serviceCount = services.filter(s => s.customer === customer._id).length;
            return (
              <tr key={customer._id}>
                <td>{shortId(customer._id)}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{serviceCount}</td>
                <td>
                  <button className="btn" onClick={() => setSelectedCustomer(customer)}>View</button>
                </td>
              </tr>
            );
          })}
          {customers.length === 0 && (
            <tr><td colSpan="6">No customers yet</td></tr>
          )}
        </tbody>
      </table>
      </div>

      {selectedCustomer && (
        <CustomerModal
          customer={selectedCustomer}
          services={services}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </section>
  );
}

export default AllCustomers;
