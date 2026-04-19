import React from 'react';

export default function Footer({ mode }) {
  const isCreator = mode === 'creators';
  
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <img src="/logo.png" alt="Rendr Studios" className="footer-logo" />
          <p className="footer-tagline">Organic short-form for consumer apps.</p>
        </div>
        <div className="footer-links">
          <a href="#work">{isCreator ? 'Creators' : 'Work'}</a>
          <a href={isCreator ? '#pay' : '#pricing'}>{isCreator ? 'Pay' : 'Pricing'}</a>
          <a href="mailto:hello@rendrstudios.com">Contact</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Rendr Studios. All rights reserved.</p>
      </div>

      <style>{`
        .site-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding: 3rem 2rem 2rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }
        .footer-logo {
          height: 32px;
          width: auto;
          margin-bottom: 0.5rem;
        }
        .footer-tagline {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.35);
        }
        .footer-links {
          display: flex;
          gap: 2rem;
        }
        .footer-links a {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-links a:hover {
          color: #fff;
          text-shadow: none;
        }
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          padding-top: 1.5rem;
        }
        .footer-bottom p {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.2);
        }
        @media (max-width: 768px) {
          .footer-inner {
            flex-direction: column;
            gap: 1.5rem;
          }
        }
      `}</style>
    </footer>
  );
}
