import { useState } from 'react';

function Reports({ services }) {
  const [reportType, setReportType] = useState('services-by-status');
  const [report, setReport] = useState(null);

  function generateReport() {
    if (reportType === 'services-by-status') {
      const counts = {
        'Pending': services.filter(s => s.status === 'pending').length,
        'In Progress': services.filter(s => s.status === 'in-progress').length,
        'Completed': services.filter(s => s.status === 'completed').length
      };
      setReport({
        title: 'Services by Status',
        headers: ['Status', 'Count', 'Percentage'],
        rows: Object.entries(counts).map(([label, count]) => [
          label,
          count,
          services.length > 0 ? ((count / services.length) * 100).toFixed(2) + '%' : '0%'
        ])
      });
    } else if (reportType === 'services-by-priority') {
      const counts = {
        'Low': services.filter(s => s.priority === 'low').length,
        'Medium': services.filter(s => s.priority === 'medium').length,
        'High': services.filter(s => s.priority === 'high').length
      };
      setReport({
        title: 'Services by Priority',
        headers: ['Priority', 'Count', 'Percentage'],
        rows: Object.entries(counts).map(([label, count]) => [
          label,
          count,
          services.length > 0 ? ((count / services.length) * 100).toFixed(2) + '%' : '0%'
        ])
      });
    } else if (reportType === 'services-by-month') {
      const monthlyCounts = {};
      services.forEach(service => {
        const month = service.date.substring(0, 7); // YYYY-MM
        monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
      });
      setReport({
        title: 'Services by Month',
        headers: ['Month', 'Count'],
        rows: Object.entries(monthlyCounts).sort().map(([month, count]) => [month, count])
      });
    }
  }

  return (
    <section className="content-section">
      <h2>Reports</h2>
      <div className="form-group">
        <label htmlFor="report-type">Report Type</label>
        <select
          className="form-control"
          id="report-type"
          value={reportType}
          onChange={e => setReportType(e.target.value)}
        >
          <option value="services-by-status">Services by Status</option>
          <option value="services-by-priority">Services by Priority</option>
          <option value="services-by-month">Services by Month</option>
        </select>
      </div>
      <button className="btn" onClick={generateReport}>Generate Report</button>

      {report && (
        <div style={{ marginTop: '20px' }}>
          <h3>{report.title}</h3>
          <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {report.headers.map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {report.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => <td key={j}>{cell}</td>)}
                </tr>
              ))}
              {report.rows.length === 0 && (
                <tr><td colSpan={report.headers.length}>No data</td></tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default Reports;
