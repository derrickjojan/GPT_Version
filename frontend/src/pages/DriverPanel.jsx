import MetricCard from '../components/MetricCard';

const DriverPanel = () => (
  <main className="mx-auto max-w-6xl space-y-4 px-4 py-8">
    <h2 className="text-2xl font-semibold">Driver Partner Panel</h2>
    <div className="grid gap-4 md:grid-cols-4">
      <MetricCard label="Trips today" value="8" />
      <MetricCard label="Online status" value="Online" />
      <MetricCard label="Wallet balance" value="₹4,920" />
      <MetricCard label="Earnings (month)" value="₹52,400" />
    </div>
    <div className="card">
      <p className="text-sm text-slate-600">
        Includes registration with vehicle details, license upload placeholder, accept/reject jobs, and trip
        history.
      </p>
    </div>
  </main>
);

export default DriverPanel;
