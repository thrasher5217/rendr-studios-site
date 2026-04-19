import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ mode, setMode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const isBrands = mode === 'brands';

  return (
    <nav>
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="Rendr Studios" className="logo-image" />
        </Link>
        
        <div className="nav-right desktop-only">
          <div className="nav-links">
            <a href="#work">{isBrands ? 'Work' : 'Creators'}</a>
            <a href={isBrands ? '#pricing' : '#pay'}>{isBrands ? 'Pricing' : 'Pay'}</a>
            <a href="#about">About</a>
          </div>

          {/* Toggle */}
          <div className="mode-toggle">
            <span className={`toggle-label ${isBrands ? 'active' : ''}`}>Brands</span>
            <button 
              className={`toggle-switch ${!isBrands ? 'toggled' : ''}`}
              onClick={() => setMode(isBrands ? 'creators' : 'brands')}
              aria-label="Toggle between Brands and Creators"
            >
              <span className="toggle-knob" />
            </button>
            <span className={`toggle-label ${!isBrands ? 'active' : ''}`}>Creators</span>
          </div>

          {isBrands ? (
            <a href="https://cal.com/ty-mcguire-bfmkql/30min" target="_blank" rel="noopener noreferrer" className="nav-cta">Book a Call</a>
          ) : (
            <a href="mailto:hello@rendrstudios.com" className="nav-cta creator-cta">Apply to Create</a>
          )}
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X color="#fff" size={24} /> : <Menu color="#fff" size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          <a href="#work" onClick={() => setIsOpen(false)}>{isBrands ? 'Work' : 'Creators'}</a>
          <a href={isBrands ? '#pricing' : '#pay'} onClick={() => setIsOpen(false)}>{isBrands ? 'Pricing' : 'Pay'}</a>
          <a href="#about" onClick={() => setIsOpen(false)}>About</a>
          
          <div className="mode-toggle mobile-toggle">
            <span className={`toggle-label ${isBrands ? 'active' : ''}`}>Brands</span>
            <button 
              className={`toggle-switch ${!isBrands ? 'toggled' : ''}`}
              onClick={() => setMode(isBrands ? 'creators' : 'brands')}
            >
              <span className="toggle-knob" />
            </button>
            <span className={`toggle-label ${!isBrands ? 'active' : ''}`}>Creators</span>
          </div>

          {isBrands ? (
            <a href="https://cal.com/ty-mcguire-bfmkql/30min" target="_blank" rel="noopener noreferrer" className="nav-cta" onClick={() => setIsOpen(false)}>Book a Call</a>
          ) : (
            <a href="mailto:hello@rendrstudios.com" className="nav-cta creator-cta" onClick={() => setIsOpen(false)}>Apply to Create</a>
          )}
        </div>
      )}
    </nav>
  );
}
