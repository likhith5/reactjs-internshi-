
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbars'; 
import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';
import UserProfile from './components/userprofile';
import Footer from './components/footer'; 
import ScrollToTop from './components/scrolltop'; 
import NotFound from './components/not found'; 
import './App.css'; 

const App = () => {
  return (
    <Router>
      <div className="app" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}> {/* Set background color */}
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Default route */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/:username" element={<UserProfile />} /> {/* Dynamic route */}
          <Route path="*" element={<NotFound />} /> {/* 404 Not Found */}
        </Routes>
        <Footer /> {/* Add Footer */}
      </div>
    </Router>
  );
};

export default App;



