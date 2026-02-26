import { Link } from 'react-router-dom';

const Navbar = () => (
  <header className="border-b border-slate-200 bg-white sticky top-0 z-10">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <Link to="/" className="text-xl font-bold text-brand-600">
        SwiftHaul
      </Link>
      <div className="flex gap-3 text-sm font-medium">
        <Link to="/customer" className="hover:text-brand-600">
          Customer
        </Link>
        <Link to="/driver" className="hover:text-brand-600">
          Driver
        </Link>
        <Link to="/admin" className="hover:text-brand-600">
          Admin
        </Link>
      </div>
    </nav>
  </header>
);

export default Navbar;
