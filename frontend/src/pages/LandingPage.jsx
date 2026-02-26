import { Link } from 'react-router-dom';

const LandingPage = () => (
  <main className="mx-auto max-w-6xl px-4 py-12">
    <section className="grid gap-8 md:grid-cols-2 md:items-center">
      <div>
        <p className="inline rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-600">
          On-demand goods movement
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">Move anything in your city with SwiftHaul</h1>
        <p className="mt-4 text-slate-600">
          Book bikes to trucks, track every trip live, and manage transport operations in one SaaS-grade
          platform.
        </p>
        <div className="mt-6 flex gap-3">
          <Link to="/customer" className="rounded-xl bg-brand-600 px-4 py-2 text-white">
            Book a vehicle
          </Link>
          <Link to="/driver" className="rounded-xl border px-4 py-2">
            Become a partner
          </Link>
        </div>
      </div>
      <div className="card space-y-3">
        <h2 className="text-lg font-semibold">Why businesses choose SwiftHaul</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>Instant + scheduled delivery options</li>
          <li>Transparent distance-based pricing with surge controls</li>
          <li>Live order tracking and driver performance insights</li>
        </ul>
      </div>
    </section>
  </main>
);

export default LandingPage;
