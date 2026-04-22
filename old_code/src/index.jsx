import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';
import Home from './pages/Home.jsx';
import AddKwan from './pages/AddKwan.jsx';
import KwanDetails from './pages/KwanDetails.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { initializeDatabase } from './services/databaseService';

initializeDatabase().catch((error) => {
  console.error('Failed to initialize the database:', error);
});

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddKwan />} />
          <Route path="/details" element={<KwanDetails />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

