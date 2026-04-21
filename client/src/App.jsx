import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Updates from './pages/Updates';
import Admin from './pages/Admin';
import useHashScroll from './hooks/useHashScroll';

export default function App() {
  useHashScroll();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Landing />} />
      </Routes>
      <Footer />
    </>
  );
}
