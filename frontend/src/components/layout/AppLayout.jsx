import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const AppLayout = () => {
  return (
    <div className="app-root">
      <Navbar />
      <main className="page-root">
        <Outlet />
      </main>
      <footer className="page-footer">
        <span>2024 The Academic Curator. Editorial quality.</span>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">GitHub</a>
          <a href="#">Credits</a>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
