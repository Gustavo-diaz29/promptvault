import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Pricing from './pages/Pricing';
import PromptDetail from './pages/PromptDetail';
import Sell from './pages/Sell';

function App() {
  return (
    <>
      {/* Animated Background Orbs */}
      <div className="bg-orb bg-orb--1" />
      <div className="bg-orb bg-orb--2" />
      <div className="bg-orb bg-orb--3" />

      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/prompt/:id" element={<PromptDetail />} />
        <Route path="/sell" element={<Sell />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
