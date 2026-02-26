import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import CustomerPanel from './pages/CustomerPanel';
import DriverPanel from './pages/DriverPanel';
import AdminDashboard from './pages/AdminDashboard';

const App = () => (
  <div className="min-h-screen bg-slate-50">
    <Navbar />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/customer" element={<CustomerPanel />} />
      <Route path="/driver" element={<DriverPanel />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  </div>
);

export default App;
