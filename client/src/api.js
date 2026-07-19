const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, options) {
  const res = await fetch(`${BASE_URL}/api${path}`, options);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export function getCustomers() {
  return request("/customers");
}

export function getServices() {
  return request("/services");
}

export function addCustomer(customer) {
  return request("/customers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
}

export function addService(service) {
  return request("/services", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(service),
  });
}

export function updateServiceStatus(id, status) {
  return request(`/services/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
}

export function deleteService(id) {
  return request(`/services/${id}`, {
    method: "DELETE",
  });
}