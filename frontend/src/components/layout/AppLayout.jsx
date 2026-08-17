import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const AppLayout = () => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = window.localStorage.getItem('theme');

    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app-root">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main className="page-root">
        <Outlet />
      </main>
      <footer className="page-footer">
        <span>2025 The Academic Curator. Editorial quality.</span>
        <div className="footer-links">
          <a href="#">Contact</a>
          <a href="https://github.com/hannuverma/pyqhub-2.0" target='blank'>GitHub</a>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
