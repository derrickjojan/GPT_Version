import FareEstimatorCard from '../components/FareEstimatorCard';

const CustomerPanel = () => (
  <main className="mx-auto grid max-w-6xl gap-4 px-4 py-8 md:grid-cols-2">
    <div className="card">
      <h2 className="text-xl font-semibold">Customer panel</h2>
      <p className="mt-2 text-sm text-slate-600">
        Sign up/login, book vehicles, schedule deliveries, cancel orders, track statuses, and rate drivers.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
        <li>Pickup & drop location input</li>
        <li>Vehicle selection: Bike, Tempo, Mini Truck, Large Truck</li>
        <li>Booking history with cancellation</li>
        <li>Payment intent placeholder (Stripe-style)</li>
      </ul>
    </div>
    <FareEstimatorCard />
  </main>
);

export default CustomerPanel;
