import './Sidebar.css';

const redirectToGmail = () => {
  window.open(
    "https://mail.google.com/mail/?view=cm&fs=1&to=achintya26022006@gmail.com",
    "_blank"
  );
};

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="branding">
        <div className="logo">Studio • A</div>
        <div className="status-badge">● Recording Now</div>
      </div>

      <nav className="side-nav">
        <a href="#projects" className="nav-link">
          <span className="num">01</span>
          <span className="text">Discography</span>
        </a>
        <a href="#skills" className="nav-link">
          <span className="num">02</span>
          <span className="text">Equipment</span>
        </a>
        <a href="#about" className="nav-link">
          <span className="num">03</span>
          <span className="text">Artist Bio</span>
        </a>
      </nav>

      <div className="contact-vignette">
        <h3>Contact the Artist</h3>
        <p>achintya26022006@gmail.com</p>
        <button onClick={redirectToGmail} className="contact-btn">Send Demo</button>
      </div>
    </aside>
  );
};

export default Sidebar;
