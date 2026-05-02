import React, { useState, useEffect } from 'react';
import './MainContent.css';

const softwareProjects = [
  {
    title: "Food Rescue",
    tech: "React • Node.js • PostgreSQL",
    year: "'24",
    image: "/assets/food_rescue.png",
    color: "var(--accent-secondary)",
    url: "https://food-rescue-frontend-fdqq.vercel.app"
  },
  {
    title: "Eexchange",
    tech: "React • Spring Boot • JWT • MongoDB",
    year: "'24",
    image: "/assets/exchange.png",
    color: "var(--accent-secondary)",
    url: "https://frontend-eexchange.vercel.app"
  },
  {
    title: "College-Finder",
    tech: "React • TypeScript • PostgreSQL",
    year: "'24",
    image: "/assets/college_finder.png",
    color: "var(--accent-secondary)",
    url: "https://college-f-inder-frontend.vercel.app"
  },
  {
    title: "Real-Time Chat App",
    tech: "Spring Boot • WebSockets",
    year: "'24",
    image: "/assets/chat_app.png",
    color: "var(--accent-secondary)"
  },
  {
    title: "Shopify UI/UX",
    tech: "React.js • JavaScript",
    year: "'25",
    image: "/assets/shopify_ux.png",
    color: "var(--accent-secondary)",
    url: "https://shopifywithme.netlify.app"
  }
];

const hardwareProjects = [
  {
    title: "Smart Extension Board",
    tech: "IoT • NodeMCU • ESP8266",
    year: "'23",
    image: "/assets/iot.png",
    color: "var(--accent-hardware)"
  }
];



const skills = [
  { name: "Java", level: "80%" },
  { name: "React.js", level: "90%" },
  { name: "Node.js", level: "85%" },
  { name: "Spring Boot", level: "75%" },
  { name: "MySQL", level: "80%" },
  { name: "DS & Algorithms", level: "95%" },
  { name: "C++ ", level: "75%" },
];

const venues = [
  { name: "GitHub Stadium", url: "https://github.com/Tech-Achintya", icon: "🐙", stats: "Open Source Residency" },
  { name: "LeetCode Arena", url: "https://leetcode.com/u/_YeahSure_/", icon: "⌨️", stats: "600+ Headliners" },
  { name: "LinkedIn Plaza", url: "https://www.linkedin.com/in/achintya-srivastava-9a5447326/", icon: "💼", stats: "Professional Circuit" },
  { name: "Codolio Theater", url: "https://codolio.com/profile/Yeah_Sure", icon: "📊", stats: "Performance Analytics" },
  { name: "Codeforces Club", url: "https://codeforces.com/profile/Achintya_2006", icon: "🏆", stats: "Competitive Set" }
];

const MainContent = () => {
  const [activeNotes, setActiveNotes] = useState(null);
  const [noteContent, setNoteContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeNotes) {
      setLoading(true);
      const fileName = activeNotes.toLowerCase().replace(/\s+/g, '-');
      fetch(`/liner-notes/${fileName}.txt`)
        .then(res => res.text())
        .then(text => {
          setNoteContent(text);
          setLoading(false);
        })
        .catch(() => {
          setNoteContent('Error loading session notes.');
          setLoading(false);
        });
    }
  }, [activeNotes]);

  const closeNotes = () => setActiveNotes(null);


  return (
    <main className={`main-content ${activeNotes ? 'content-blur' : ''}`}>
      {activeNotes && (
        <div className="notepad-overlay" onClick={closeNotes}>
          <div className="notepad" onClick={(e) => e.stopPropagation()}>
            <div className="notepad-header">
              <span className="notepad-title">Session Notes: {activeNotes}</span>
              <button className="close-notepad" onClick={closeNotes}>×</button>
            </div>
            <div className="notepad-body">
              <div className="paper-lines">
                <p className="handwritten-text">
                  {loading ? "Decrypting studio logs..." : noteContent}
                </p>
              </div>
            </div>
            <div className="notepad-footer">
              <span className="recording-label">Studio A • Final Take</span>
            </div>
          </div>
        </div>
      )}

      <section className="intro">
        <span className="label-tag">Studio Headliner</span>
        <h1>Achintya Srivastava</h1>
        <p className="bio-text">
          Crafting digital symphonies and analog rhythms.
          Currently mastering Computer Science at Chandigarh University.
        </p>
      </section>

      <div id="projects" className="record-sections">
        <section className="project-group">
          <h2 className="section-title">The Digital Press <small>(Software Projects)</small></h2>
          <div className="vinyl-grid">
            {softwareProjects.map((proj, i) => (
              <div key={i} className="vinyl-card" style={{ '--accent': proj.color }}>
                <div className="vinyl-sleeve">
                  {proj.url ? (
                    <div className="iframe-wrapper">
                      <iframe 
                        src={proj.url} 
                        title={proj.title} 
                        className="site-preview"
                        scrolling="no"
                      />
                    </div>
                  ) : (
                    <img src={proj.image} alt={proj.title} />
                  )}
                </div>
                <div className="vinyl-record"></div>
                <div className="vinyl-info">
                  <h3>{proj.title}</h3>
                  <p>{proj.tech}</p>
                  <span className="year">{proj.year}</span>

                  <div className="project-actions">
                    {proj.url ? (
                      <a href={proj.url} target="_blank" rel="noopener noreferrer" className="action-link">
                        <span className="action-icon">▶</span> Stream Now
                      </a>
                    ) : (
                      <span className="action-link disabled">
                        <span className="action-icon">∅</span> Unreleased
                      </span>
                    )}
                    <button
                      className="action-btn"
                      onClick={() => setActiveNotes(proj.title)}
                    >
                      <span className="action-icon">📝</span> Liner Notes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="project-group hardware-group">
          <h2 className="section-title">The Analog Lab <small>(Hardware Projects)</small></h2>
          <div className="vinyl-grid">
            {hardwareProjects.map((proj, i) => (
              <div key={i} className="vinyl-card" style={{ '--accent': proj.color }}>
                <div className="vinyl-sleeve">
                  <img src={proj.image} alt={proj.title} />
                </div>
                <div className="vinyl-record"></div>
                <div className="vinyl-info">
                  <h3>{proj.title}</h3>
                  <p>{proj.tech}</p>
                  <span className="year">{proj.year}</span>

                  <div className="project-actions">
                    <span className="action-link disabled">
                      <span className="action-icon">🔌</span> Live Set
                    </span>
                    <button
                      className="action-btn"
                      onClick={() => setActiveNotes(proj.title)}
                    >
                      <span className="action-icon">📝</span> Liner Notes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="tour-dates">
        <h2 className="section-title">World Tour Venues <small>(Coding Profiles)</small></h2>
        <div className="venue-list">
          {venues.map((venue, i) => (
            <a key={i} href={venue.url} target="_blank" rel="noreferrer" className="venue-card">
              <span className="venue-icon">{venue.icon}</span>
              <div className="venue-details">
                <h3>{venue.name}</h3>
                <p>{venue.stats}</p>
              </div>
              <span className="venue-action">View Ticket →</span>
            </a>
          ))}
        </div>
      </section>

      <section id="skills" className="skills-patchbay">
        <h2 className="section-title">The Pedalboard <small>(Technical Tools)</small></h2>
        <div className="pedal-rack">
          {skills.map((skill, i) => (
            <div key={i} className="pedal" style={{ '--pedal-color': ['#ff5f5f', '#4d96ff', '#ffb830', '#1DB954', '#b91d73', '#1db9b9'][i % 6] }}>
              <div className="pedal-head">
                <span className="pedal-type">{i % 2 === 0 ? 'Fuzz' : 'Delay'}</span>
                <div className="status-light"></div>
              </div>
              <div className="pedal-body">
                <div className="pedal-knob-row">
                  <div className="tiny-knob"></div>
                  <div className="tiny-knob"></div>
                </div>
                <h3 className="pedal-name">{skill.name}</h3>
              </div>
              <div className="pedal-foot">
                <div className="stomp-switch"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="artist-bio">
        <h2 className="section-title">Artist Bio <small>(Liner Notes)</small></h2>
        <div className="bio-container">
          <div className="bio-content">
            <p>
              Currently a Computer Science and Engineering student, I orchestrate digital solutions with a deep-rooted foundation in programming and logic.
              My core set includes high-fidelity performance in C, C++, and Java, where I fine-tune complex data structures—mapping out the rhythms of Trees, Graphs, and Dynamic Programming.
            </p>
            <p>
              I’m currently in the studio mastering backend architecture with Java and Spring Boot, while producing full-stack hits with a modern technical range.
              My current rotation includes the Food Rescue platform for humanitarian logistics, the Eexchange platform for efficient asset sharing, and a real-time Chat application engineered with WebSockets.
              My mission is to develop scalable, high-efficiency systems and continuously sharpen my technical sound through relentless practice and production.
            </p>
          </div>
          <div className="bio-links">
            <h3>Connect & Follow</h3>
            <div className="link-grid">
              <a href="https://github.com/Tech-Achintya" target="_blank" rel="noreferrer" className="bio-link">GitHub</a>
              <a href="https://www.linkedin.com/in/achintya-srivastava-9a5447326/" target="_blank" rel="noreferrer" className="bio-link">LinkedIn</a>
              <a href="https://codolio.com/profile/Yeah_Sure" target="_blank" rel="noreferrer" className="bio-link">Codolio</a>
              <a href="https://codeforces.com/profile/YeahSure" target="_blank" rel="noreferrer" className="bio-link">Codeforces</a>
              <a href="https://leetcode.com/u/_YeahSure_/" target="_blank" rel="noreferrer" className="bio-link">LeetCode</a>
              <a href="mailto:achintya26022006@gmail.com" className="bio-link demo-link">Send a Demo</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainContent;
