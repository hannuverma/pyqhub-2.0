import { NavLink } from "react-router-dom";

const linkClassName = ({ isActive }) =>
  `nav-link ${isActive ? "nav-link-active" : ""}`;

const Navbar = () => {
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
        <div className="search-wrap" role="search">
          <input
            type="search"
            className="search-input"
            placeholder="Search papers..."
            aria-label="Search papers"
          />
        </div>
        <button className="avatar-btn" type="button" aria-label="Account">
          <span className="avatar-dot" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
