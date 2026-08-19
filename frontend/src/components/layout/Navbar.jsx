import { NavLink } from 'react-router-dom';

const linkClassName = ({ isActive }) =>
  `nav-link ${isActive ? 'nav-link-active' : ''}`;

const Navbar = ({ theme, onToggleTheme }) => {
  const isDark = theme === 'dark' || theme === 'wedidthisonpurposelol';

  return (
    <header className="topbar">
      <div className="brand">
        <a href="/">
          {theme === 'wedidthisonpurposelol' ? (
            <img src="/secret-full-logo.png" alt="logo" className="w-32" />
          ) : isDark ? (
            <img src="/dark-full-logo.png" alt="logo" className="w-32" />
          ) : (
            <img src="/light-full-logo.png" alt="logo" className="w-32" />
          )}
        </a>
      </div>

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
            <span className="theme-icon theme-icon-sun">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            </span>
            <span className="theme-icon theme-icon-moon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            </span>
            <span className="theme-toggle-thumb" />
          </span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
