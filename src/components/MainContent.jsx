import { useState, useEffect } from 'react';
import './MainContent.css';

const softwareProjects = [
  {
    title: "Collaborative Workspace",
    tech: "Next.js • React • WebSockets",
    year: "'24",
    image: "/assets/workspace.png",
    color: "var(--accent-secondary)",
    url: "https://workspace-collaborative.vercel.app",
    github: "https://github.com/Tech-Achintya/collaborative-editor"
  },
  {
    title: "Eexchange",
    tech: "React • Spring Boot • JWT • MongoDB",
    year: "'24",
    image: "/assets/exchange.png",
    color: "var(--accent-secondary)",
    url: "https://eexchange.app.achinty.me",
    github: "https://github.com/Tech-Achintya/Eexchange"
  },
  {
    title: "Food Rescue",
    tech: "React • Node.js • PostgreSQL",
    year: "'24",
    image: "/assets/food_rescue.png",
    color: "var(--accent-secondary)",
    url: "https://food-rescue-frontend-fdqq.vercel.app",
    github: "https://github.com/Tech-Achintya/Food_rescue"
  },
  {
    title: "College-Finder",
    tech: "React • TypeScript • PostgreSQL",
    year: "'24",
    image: "/assets/college_finder.png",
    color: "var(--accent-secondary)",
    url: "https://college-f-inder-frontend.vercel.app",
    github: "https://github.com/Tech-Achintya/collegeFinder_backend"
  },
  {
    title: "Shopify UI/UX",
    tech: "React.js • JavaScript",
    year: "'25",
    image: "/assets/shopify_ux.png",
    color: "var(--accent-secondary)",
    url: "https://shopifywithme.netlify.app"
  },
  {
    title: "Voting Poll",
    tech: "React • Spring Boot",
    year: "'24",
    image: "/assets/voting_poll.png",
    color: "var(--accent-secondary)",
    github: "https://github.com/Tech-Achintya/voting-poll"
  },
  {
    title: "Real-Time Chat App",
    tech: "Spring Boot • WebSockets",
    year: "'24",
    image: "/assets/chat_app.png",
    color: "var(--accent-secondary)",
    github: "https://github.com/Tech-Achintya/real-time-chat-App"
  }
];




const languages = [
  { name: "Java" },
  { name: "JavaScript" },
  { name: "TypeScript" },
  { name: "Python" },
  { name: "C" },
  { name: "C++" },
  { name: "SQL" },
];

const tools = [
  { name: "React.js" },
  { name: "Next.js" },
  { name: "Node.js" },
  { name: "Spring Boot" },
  { name: "AWS S3" },
  { name: "MongoDB" },
  { name: "PostgreSQL" },
  { name: "MySQL" },
  { name: "WebSockets" },
  { name: "JWT" },
  { name: "Git & GitHub" },
  { name: "DSA" },
];

const pedalColors = ['#ff5f5f', '#4d96ff', '#ffb830', '#1DB954', '#b91d73', '#1db9b9'];

const PedalRack = ({ items }) => (
  <div className="pedal-rack">
    {items.map((item, i) => (
      <div key={i} className="pedal" style={{ '--pedal-color': pedalColors[i % pedalColors.length] }}>
        <div className="pedal-head">
          <span className="pedal-type">{i % 2 === 0 ? 'Fuzz' : 'Delay'}</span>
          <div className="status-light"></div>
        </div>
        <div className="pedal-body">
          <div className="pedal-knob-row">
            <div className="tiny-knob"></div>
            <div className="tiny-knob"></div>
          </div>
          <h3 className="pedal-name">{item.name}</h3>
        </div>
        <div className="pedal-foot">
          <div className="stomp-switch"></div>
        </div>
      </div>
    ))}
  </div>
);

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
    if (!activeNotes) return;

    // Match the file names in public/liner-notes (e.g. "College-Finder" ->
    // "college-finder", "Shopify UI/UX" -> "shopify-ui-ux"), and resolve them
    // from Vite's base URL so the fetch keeps working if the base ever changes.
    const fileName = activeNotes
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const notesUrl = `${import.meta.env.BASE_URL}liner-notes/${fileName}.txt`;
    let cancelled = false;

    fetch(notesUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Notes request failed: ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (cancelled) return;
        setNoteContent(text);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setNoteContent('Session notes are not available for this record yet.');
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [activeNotes]);

  const openNotes = (title) => {
    setNoteContent('');
    setLoading(true);
    setActiveNotes(title);
  };

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
                    <div className="unreleased-placeholder" style={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #1f1f1f, #0a0a0a)',
                      color: 'var(--text-primary)',
                      textAlign: 'center',
                      padding: '1rem',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <span style={{ fontSize: '3rem', marginBottom: '0.5rem', filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.1))' }}>📼</span>
                      <h4 style={{ margin: 0, fontFamily: 'monospace', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', color: proj.color }}>Studio Master</h4>
                      <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', opacity: 0.7 }}>{proj.title}</p>
                    </div>
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
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" className="action-btn">
                        <span className="action-icon">🐙</span> Repo
                      </a>
                    )}
                    <button
                      className="action-btn"
                      onClick={() => openNotes(proj.title)}
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

      <section id="languages" className="languages-section">
        <h2 className="section-title">Languages Known <small>(Programming Languages)</small></h2>
        <div className="language-grid">
          {languages.map((language, i) => (
            <div key={language.name} className="language-card">
              <span className="language-name">{language.name}</span>
              <span className="language-index">{String(i + 1).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="skills-patchbay">
        <h2 className="section-title">The Pedalboard <small>(Technical Tools)</small></h2>
        <PedalRack items={tools} />
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
