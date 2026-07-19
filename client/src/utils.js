// Shared display helpers
export function formatStatus(status) {
  const statusMap = {
    'pending': 'Pending',
    'in-progress': 'In Progress',
    'completed': 'Completed'
  };
  return statusMap[status] || status;
}

export function formatPriority(priority) {
  const priorityMap = {
    'low': 'Low',
    'medium': 'Medium',
    'high': 'High'
  };
  return priorityMap[priority] || priority;
}

// MongoDB ObjectIds are long — show a short readable form in ID columns
export function shortId(id) {
  return id.slice(-6).toUpperCase();
}
