import { useState } from 'react';
import { api } from '../services/api';

const FareEstimatorCard = () => {
  const [form, setForm] = useState({
    vehicleType: 'bike',
    pickupLat: 19.076,
    pickupLng: 72.8777,
    dropLat: 19.2183,
    dropLng: 72.9781
  });
  const [result, setResult] = useState(null);

  const estimateFare = async () => {
    // Demo token for static preview. Replace with real auth token after login.
    const { data } = await api.post('/bookings/estimate-fare', form, {
      headers: { Authorization: `Bearer demo_customer_jwt` }
    });
    setResult(data);
  };

  return (
    <div className="card space-y-3">
      <h3 className="text-lg font-semibold">Live fare estimator</h3>
      <select
        className="w-full rounded-xl border px-3 py-2"
        value={form.vehicleType}
        onChange={(event) => setForm({ ...form, vehicleType: event.target.value })}
      >
        <option value="bike">Bike</option>
        <option value="tempo">3-Wheeler / Tempo</option>
        <option value="mini_truck">Mini Truck</option>
        <option value="large_truck">Large Truck</option>
      </select>
      <button onClick={estimateFare} className="rounded-xl bg-brand-600 px-4 py-2 text-white">
        Estimate fare
      </button>
      {result && (
        <p className="text-sm text-slate-600">
          Distance: {result.distanceKm} km • Fare: ₹{result.totalFare} • Driver payout: ₹{result.driverPayout}
        </p>
      )}
    </div>
  );
};

export default FareEstimatorCard;
