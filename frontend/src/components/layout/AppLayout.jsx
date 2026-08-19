import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const AppLayout = () => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = window.localStorage.getItem('theme');

    if (
      storedTheme === 'light' ||
      storedTheme === 'dark' ||
      storedTheme === 'wedidthisonpurposelol'
    ) {
      return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);

    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href =
        theme === 'wedidthisonpurposelol'
          ? '/secret-logo.svg'
          : '/dark-logo.svg';
    }
  }, [theme]);

  const [isContactOpen, setIsContactOpen] = useState(false);

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
        <span></span>
        <div className="footer-links">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsContactOpen(true);
            }}
          >
            Contact
          </a>
          <a href="https://github.com/hannuverma/pyqhub-2.0" target="blank">
            GitHub
          </a>
        </div>
      </footer>

      {isContactOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsContactOpen(false)}
        >
          <div
            className="bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] p-8 rounded-2xl shadow-[var(--shadow)] max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
              onClick={() => setIsContactOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
            <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>

            <div className="flex flex-col gap-6">
              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-sm">
                <h3 className="text-xl font-bold text-[var(--accent)] mb-2">
                  Hannu Verma
                </h3>
                <div className="flex flex-col gap-2 text-[1.05rem]">
                  <a className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors">
                    <span>📞</span> 9416680146
                  </a>
                  <a
                    href="mailto:iamherehello76@gmail.com"
                    className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors"
                  >
                    <span>✉️</span> iamherehello76@gmail.com
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-sm">
                <h3 className="text-xl font-bold text-[var(--accent)] mb-2">
                  Shivanshu Mangal
                </h3>
                <div className="flex flex-col gap-2 text-[1.05rem]">
                  <a className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors">
                    <span>📞</span> 8439903370
                  </a>
                  <a
                    href="mailto:iamherehello76@gmail.com"
                    className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors"
                  >
                    <span>✉️</span> iamherehello76@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppLayout;
