import React from 'react';
import './About.css';

export default function About() {
  return (
    <main className="about-container animate-fade-in">
      <section className="about-header text-center">
        <h1 className="about-title">The Masterminds Behind <span className="text-neon">Rendr Studios</span></h1>
        <p className="about-subtitle text-secondary">
          Bridging the gap between creative authenticity and scalable performance marketing.
        </p>
      </section>

      <section className="team-section">
        <div className="team-grid">
          
          <div className="team-card glass">
            <div className="image-container">
              <img src="/james_headshot.png" alt="James Maciuk" className="headshot" />
              <div className="image-glow"></div>
            </div>
            <h2 className="text-neon">James Maciuk</h2>
            <h3 className="role">Co-Founder</h3>
            <p className="bio text-secondary">
              James leverages his extensive network and analytical background to match the right brands with the perfect creators, ensuring every campaign is set up for maximum ROI.
            </p>
          </div>

          <div className="team-card glass">
            <div className="image-container">
              <img src="/ty_headshot.png" alt="Ty McGuire" className="headshot" />
              <div className="image-glow"></div>
            </div>
            <h2 className="text-neon">Ty McGuire</h2>
            <h3 className="role">Co-Founder</h3>
            <p className="bio text-secondary">
              With a deep understanding of content trends and viral mechanics, Ty spearheads the creative direction that makes Rendr Studios' content consistently stand out on social timelines.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
