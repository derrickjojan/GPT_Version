import MetricCard from '../components/MetricCard';

const AdminDashboard = () => (
  <main className="mx-auto max-w-6xl space-y-4 px-4 py-8">
    <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
    <div className="grid gap-4 md:grid-cols-4">
      <MetricCard label="Total revenue" value="₹12,40,320" />
      <MetricCard label="Active drivers" value="186" />
      <MetricCard label="Completed trips" value="12,804" />
      <MetricCard label="Cancellation rate" value="3.2%" />
    </div>
    <div className="card text-sm text-slate-600">
      Manage users/drivers, approve onboarding, monitor live bookings, and update pricing rules from a single
      place.
    </div>
  </main>
);

export default AdminDashboard;
