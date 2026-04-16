import { NavLink } from 'react-router-dom';

const linkClassName = ({ isActive }) =>
  `nav-link ${isActive ? 'nav-link-active' : ''}`;

const Navbar = ({ theme, onToggleTheme }) => {
  const isDark = theme === 'dark';

  return (
    <header className="topbar">
      <div className="brand">Academic Curator</div>

      <nav className="topnav" aria-label="Primary navigation">
        <NavLink to="/" end className={linkClassName}>
          Home
        </NavLink>
        <NavLink to="/papers" className={linkClassName}>
          See Papers
        </NavLink>
      </nav>

      <div className="topbar-tools">
        <button
          type="button"
          className={`theme-toggle ${isDark ? 'is-dark' : ''}`}
          onClick={onToggleTheme}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        >
          <span className="theme-toggle-track" aria-hidden="true">
            <span className="theme-icon theme-icon-sun">☀</span>
            <span className="theme-icon theme-icon-moon">☾</span>
            <span className="theme-toggle-thumb" />
          </span>
        </button>
        <button className="avatar-btn" type="button" aria-label="Account">
          <span className="avatar-dot" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
